<template>
    <ion-app>
        <ion-router-outlet/>

        <div
            class="loader-mini"
            :class="{active: loaderMini}"
        >
            <loader-item class="preloader--small" :stroke-width="5" />
        </div>

        <notification />

        <modal-update-app />

        <modal-report />

        <modal-moderator-info />
    </ion-app>
</template>

<script>
import { App } from '@capacitor/app';
import { mapActions, mapGetters } from 'vuex'
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import LoaderItem from '@/components/common/Loader.vue';
import Notification from '@/components/modals/NotifiMain.vue';
import ModalUpdateApp from '@/components/modals/UpdateApp.vue';
import ModalReport from '@/components/modals/Report.vue';
import ModalModeratorInfo from '@/components/modals/ModeratorInfo'
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { StatusBar, Style} from "@capacitor/status-bar";
import { PushNotifications } from '@capacitor/push-notifications';
import { Badge } from '@capawesome/capacitor-badge';
import NoticeMixin from '@/mixins/notice';
import {
    CREATED_MESSAGE_EVENT,
    DELETED_MESSAGE_EVENT,
    COMMON_NOTICE_TYPE,
} from './common/const';
import toast from '@/helpers/toast';
import axios from '@/helpers/axios';

export default ({
    name: 'App',
    components: { IonApp, IonRouterOutlet, LoaderItem, Notification, ModalUpdateApp, ModalReport, ModalModeratorInfo },
    mixins: [NoticeMixin],
    data() {
        return {
            isUserInitialized : false,
            launchUrl: null,
        }
    },
    mounted() {
        window.screen.orientation.lock('portrait');

        this.themeBar();

        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        this.$store.commit('common/SET_THEME_DEFAULT', mediaQueryList.matches);

        mediaQueryList.addListener((e) => {
            this.$store.commit('common/SET_THEME_DEFAULT', e.matches);
        });

        this.theme === 1 ? document.body.classList.add('dark') : document.body.classList.remove('dark');
        this.theme === 2 ? document.body.classList.add('light') : document.body.classList.remove('light');

        this.launch();
        this.init();
    },
    watch: {
        theme() {
            this.themeBar();
        },
        themDefault() {
            this.themeBar();
        },
        $route() {
            this.init();
        },
        allCountUnreadNotices() {
            this.updateBadgeCounter();
        },
        launchUrl() {
            if (this.isActiveUser) {
                this.initDeepLink();
            }
        }
    },
    computed: {
        ...mapGetters({
            loaderMini: 'common/GET_LOADER_MINI',
            theme: 'user/GET_THEME',
            themDefault: 'common/GET_THEME_DEFAULT',
            user: 'user/GET_USER',
            getChatMessages: 'chat/GET_MESSAGES',
            getChats: 'chat/GET_CHATS',
            isShowUpdateTutorial: 'user/GET_UPDATE_TUTORIAL',
            allCountUnreadNotices: 'common/GET_ALL_COUNT_UNREAD_NOTICES',
        }),
        isActiveUser() {
            return this.user && this.user.is_complete;
        }
    },
    methods: {
        ...mapActions({
            attachDevice: 'auth/attachDevice',
            fetchProfile: 'user/getProfile',
            checkMessages: 'chat/checkMessages',
            setReadMessages: 'chat/setRead',
        }),
        launch() {
            App.addListener('appUrlOpen', (event) => {
                this.launchUrl = event.url;
            });
        },
        init() {
            if (this.isActiveUser && !this.isUserInitialized) {
                this.noticeEvent();
                this.messageEvent();

                this.handleNavigation();

                this.initPush();

                this.initDeepLink();

                this.isUserInitialized = true;
            }
        },
        themDark() {
            StatusBar.setStyle({
                style: Style.Dark
            });
            StatusBar.setBackgroundColor({
                color: '#102341'
            });
            NavigationBar.setColor({
                color: '#102341',
                darkButtons: false
            });
        },
        themLight() {
            StatusBar.setStyle({
                style: Style.Light
            });
            StatusBar.setBackgroundColor({
                color: '#FFFFFF'
            });
            NavigationBar.setColor({
                color: '#FFFFFF',
                darkButtons: true
            });
        },
        themeBar() {
            if (this.theme === 1) {
                this.themDark();
            }
            if (this.theme === 2) {
                this.themLight();
            }
            if (this.theme === 3 && this.themDefault) {
                this.themDark();
            }
            if (this.theme === 3 && !this.themDefault) {
                this.themLight();
            }
        },
        noticeEvent() {
            this.checkNotice();

            this.$pusher
                .subscribe('notice.' + this.user.id)
                .bind('notice.updated', (event) => {
                    this.$store.commit('common/SET_HAS_UNREAD_NOTICES', event.has_unread_notices);
                    this.$store.commit('common/SET_ALL_COUNT_UNREAD_NOTICES', event.all_count_unread_notices);

                    if (this.$route.name === 'notifications') {
                        this.initNotice();
                    }
                });
        },
        messageEvent() {
            this.checkMessages();

            this.$pusher
                .subscribe('chats.' + this.user.id)
                .bind('chats.updated', (event) => {
                    this.$store.commit('chat/SET_HAS_NEW_MESSAGES', true);
                    this.$store.commit('common/SET_ALL_COUNT_UNREAD_NOTICES', event.all_count_unread_notices);

                    if (this.$route?.name === 'chat') {
                        let currentChats = this.getChats;

                        if (event.state === CREATED_MESSAGE_EVENT) {

                            currentChats.data.forEach((item) => {
                                if (item.chat.id === event.message.chat_id) {
                                    item.chat.message = event.message;
                                }
                            });

                            this.$store.commit('chat/SET_CHATS', currentChats);
                        }
                    }

                    if (this.$route?.name === 'user-chat') {
                        let currentMessages = this.getChatMessages;

                        if (event.state === CREATED_MESSAGE_EVENT) {
                            currentMessages.data.push(event.message);

                            this.$store.commit('chat/SET_MESSAGES', currentMessages);

                            document.getElementById('chat-content-' + event.message.chat_id).scrollToBottom(0);

                            this.setReadMessages(event.message.chat_id);
                        }
                        if (event.state === DELETED_MESSAGE_EVENT) {
                            currentMessages.data = currentMessages.data.filter((item) => item.id !== event.message.id);

                            this.$store.commit('chat/SET_MESSAGES', currentMessages);
                        }
                    }
                });
        },
        initDeepLink() {
            if (this.launchUrl) {
                const url = this.launchUrl;
                const urlItems = url.split('/');
                let slug = urlItems.pop();
                let request, callback;

                if (!slug) {
                    slug = urlItems.pop();
                }

                this.launchUrl = null;

                if (url.includes('users')) {
                    request = {
                        method: 'get',
                        url: '/public/users/' + slug
                    };
                    callback = (user) => {
                        this.$router.push({
                            name: 'user-profile',
                            params: { user_id: user.id }
                        });
                    };
                }
                if (url.includes('posts')) {
                    request = {
                        method: 'get',
                        url: '/public/posts/' + slug
                    };
                    callback = (post) => {
                        this.$router.push({
                            name: 'article',
                            params: { id: post.id },
                        });
                    };
                }

                if (request && callback) {
                    this.$store.commit('common/SET_NOTIFICATION_SHOW', true, { root: true })

                    axios(request)
                        .then((response) => {
                            callback(response.data);
                        })
                        .catch(() => {
                            toast({
                                message: this.$t('profile.failed_app_url_open'),
                                class: 'error'
                            })
                        })
                        .finally(() => {
                            this.$store.commit('common/SET_NOTIFICATION_SHOW', false, { root: true });
                        })
                } else {
                    toast({
                        message: this.$t('profile.failed_app_url_open'),
                        class: 'error'
                    })
                }
            }
        },
        initPush() {
            PushNotifications
                .checkPermissions()
                .then((res) => {
                    if (res.receive !== 'granted') {
                        PushNotifications.requestPermissions()
                            .then((res) => {
                                if (res.receive === 'denied') {
                                    toast({
                                        message: this.$t('profile.failed_device_token'),
                                        class: 'error'
                                    })
                                } else {
                                    this.pushRegister();
                                }
                            });
                    } else {
                        this.pushRegister();
                    }
                });
        },
        async pushRegister() {
            await PushNotifications.register();

            PushNotifications.addListener('registration',
                (token) => {
                    this.attachDevice(token.value);
                }
            );

            PushNotifications.addListener('registrationError',
                () => {
                    toast({
                        message: this.$t('profile.failed_device_token'),
                        class: 'error'
                    })
                }
            );

            PushNotifications.addListener('pushNotificationActionPerformed',
                ({ notification }) => {
                    setTimeout(() => {
                        if (notification.data.link) {
                            if (
                                notification.data.type === COMMON_NOTICE_TYPE
                                && Number(notification.data.count) === 1
                            ) {
                                this.setReadNotifications();
                            }

                            this.$router.push(notification.data.link);
                        }
                    }, 2000)
                }
            );
        },
        handleNavigation() {
            if (this.isShowUpdateTutorial) {
                this.$router.push('/tutorial-update')
            }
        },
        async updateBadgeCounter() {
            // const result = await Badge.requestPermissions();
            // const result = await Badge.checkPermissions();

            await Badge.set({
                count: this.allCountUnreadNotices
            });
        }
    }
});
</script>
