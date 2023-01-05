<template>
    <div class="profile">
        <div class="wrapper-x">
            <div class="profile-box"
                v-if="!account"
            >
                <div class="profile-box__top profile-box--skeleton">
                    <div class="profile-avatar" style="background-color: var(--bg-primary-100);margin-left: -1px;margin-top: -43px;overflow: hidden">
                        <ion-skeleton-text animated style="--border-radius: 12px;" />
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat__box">
                            <ion-skeleton-text animated style="--border-radius: 6px;width: 50px;height: 28px" />
                        </div>
                        <div class="profile-stat__box">
                            <ion-skeleton-text animated style="--border-radius: 6px;width: 50px;height: 28px" />
                        </div>
                        <div class="profile-stat__box clickable">
                            <ion-skeleton-text animated style="--border-radius: 6px;width: 50px;height: 28px" />
                        </div>
                    </div>
                </div>
                <div class="profile-box__middle">
                    <h2><ion-skeleton-text animated style="line-height: 21px;width: 70%;max-width: 220px;" /></h2>
                    <span class="profile-box__text" style="margin-top: 6px"><ion-skeleton-text animated style="line-height: 36px;" /></span>
                </div>
                <div class="profile-box__bottom">
                    <ion-skeleton-text animated style="line-height: 32px;--border-radius: 8px;" />
                </div>
            </div>

            <div class="profile-box"
                v-else
            >
                <div class="profile-box__top">
                    <avatar-profile style="margin-left: -1px;margin-top: -43px;"
                        :style="{'pointer-events': isCurrentUser ? 'auto' : 'none'}"
                        :avatar="account.profile.avatar"
                        :country="account.profile.country.code"
                        :show-country="true"
                        :upload="isCurrentUser"
                        :show-upload-btn="!account.profile.avatar && isCurrentUser"
                    />
                    <div class="profile-stat">
                        <div class="profile-stat__box clickable"
                            @click="tabs.selected = 3"
                        >
                            <span>{{ bigNumberFormat(account.followers_count) }}</span>
                            <p>{{ $t('followers') }}</p>
                        </div>
                        <div class="profile-stat__box">
                            <span>{{ daysDuration(account.count_days_registration) }}</span>
                            <p>{{ $t('in_relife') }}</p>
                        </div>
                        <div class="profile-stat__box clickable" style="color: var(--ion-color-primary)"
                            @click="sheetCarma = true"
                        >
                            <span>{{ bigNumberFormat(account.common_rating) }}</span>
                            <p>{{ $t('carma') }}</p>
                        </div>
                    </div>
                </div>
                <div class="profile-box__middle">
                    <h2>{{ account.profile.first_name }} {{ account.profile.last_name }}</h2>
                    <span class="profile-box__text" style="margin-top: 6px"
                        v-if="account.profile.short_description"
                        v-html="textLinkFormatter(account.profile.short_description)" />
                </div>
                <div class="profile-box__bottom">
                    <template v-if="isCurrentUser">
                        <ion-button class="btn button-mini" color="secondary" expand="block" style="width: 100%;"
                            router-link="/profile/settings"
                        >
                            {{ $t('profile.edit_profile') }}
                        </ion-button>
                    </template>

                    <template v-else>
                        <ion-button @click="contactMe" class="btn button-mini" color="secondary" expand="block" style="width: 50%;">
                            {{ $t('contact_me') }}
                        </ion-button>
                        <ion-button class="btn button-mini" color="primary" expand="block" style="width: 50%;"
                            :class="{following: account.is_current_user_subscribed}"
                            :disabled="isLoadedMini"
                            @click="subscribe"
                        >
                            {{ $t(followText) }}
                        </ion-button>
                    </template>
                </div>

                <profile-sheet-carma
                    v-model:show="sheetCarma"
                    :post-carma="account.rating_posts"
                    :comment-carma="account.rating_comments"
                />
            </div>
        </div>

        <tabs-swipe style="margin: 24px 0"
            :list="tabs.list"
            v-model:selected="tabs.selected"
            v-model:carrWidth="tabs.carriage.width"
            v-model:carrPosition="tabs.carriage.positionX"
        />

        <div class="wrapper-x">
            <article-list
                v-if="tabs.selected === 1"
                :no-data-title="noDataArticle"
                :no-data-btn="isCurrentUser"
                :no-data-btn-text="'profile.no_data__articles_btn'"
            />

            <profile-about
                v-if="tabs.selected === 2"
                :is-load-data="isLoadGlobalData"
            />

            <template v-if="tabs.selected === 3">
                <div class="profile-following">
                    <div class="profile-following__box">
                        <people-list style="margin-top: 0"
                            :carma-show="false"
                            behavior="following"
                            :max-count="5"
                            :no-data-title="noDataFollowers"
                        />

                        <ion-button class="btn btn-more btn--text" fill="clear"
                            v-if="userSampleTotal > 5"
                            router-link="/profile/following-people"
                        >
                            {{ $t('see_all_v1') }}
                            <ion-icon slot="end" :icon="require('@/assets/icons/arrow-right-icon.svg')" style="font-size: 12px"/>
                        </ion-button>
                    </div>
                </div>
            </template>

            <div class="profile-following"
                v-if="tabs.selected === 4"
            >
                <div class="profile-following__box">
                    <span class="profile__title">{{ $t('profile.rubrics') }}</span>
                    <rubrics-list
                        behavior="following"
                        :max-count="5"
                        :no-data-title="noDataFollowingCat"
                        :no-data-btn="isCurrentUser"
                        :no-data-btn-text="'profile.no_data__following_category_btn'"
                        :no-data-btn-link="'/profile/settings-feed'"
                    />
                    <ion-button class="btn btn-more btn--text" fill="clear"
                        v-if="categoryItemsTotal > 5"
                        router-link="/profile/following-categories"
                    >
                        {{ $t('see_all') }}
                        <ion-icon slot="end" :icon="require('@/assets/icons/arrow-right-icon.svg')" style="font-size: 12px"/>
                    </ion-button>
                </div>
                <div class="profile-following__box">
                    <span class="profile__title">{{ $t('profile.users') }}</span>
                    <people-list
                        v-if="tabs.selected === 4"
                        :carma-show="false"
                        behavior="following"
                        :max-count="5"
                        :no-data-title="noDataFollowingPeople"
                        :no-data-btn="isCurrentUser"
                        :no-data-btn-text="'profile.no_data__following_people_btn'"
                        :no-data-btn-link="'/profile/settings-feed'"
                    />
                    <ion-button class="btn btn-more btn--text" fill="clear"
                        v-if="userSampleTotal > 5"
                        router-link="/profile/following-people"
                    >
                        {{ $t('see_all_v1') }}
                        <ion-icon slot="end" :icon="require('@/assets/icons/arrow-right-icon.svg')" style="font-size: 12px"/>
                    </ion-button>
                </div>
            </div>

            <coming-soon style="padding-top: 20px"
                v-if="tabs.selected === 5"
                :title="$t('comSoon.profile__comment__title')"
                :desc="$t('comSoon.profile__comment__text')"
                :btn-launch="true"
                :btn-launch-text="$t('comSoon.btn_launch')"
            />
        </div>

        <profile-sheet
            v-model:show="sheet"
        />

        <ion-modal
            class="modal-sheet modal-sheet--list modal-sheet--comment"
            :is-open="sheetPeople"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]"
            @did-dismiss="closeSheetPeople"
        >
            <ion-content class="wrapper-sheet" :fullscreen="true">
                <div class="select-list">
                    <ion-card class="select-list__item ion-activatable ripple-parent"
                        @click="handleDisableUser"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/hide-icon.svg')"/>
                        {{ $t('do_not_show_user') }}
                        <ion-ripple-effect />
                    </ion-card>
                    <ion-card class="select-list__item ion-activatable ripple-parent"
                        @click="openReportModal"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/report-icon--wrap.svg')"/>
                        {{ $t('report') }}
                        <ion-ripple-effect />
                    </ion-card>
                </div>
            </ion-content>
        </ion-modal>
    </div>
</template>

<script>
import {
    IonButton,
    IonIcon,
    IonSkeletonText,
    IonModal,
    IonContent,
    IonCard,
    IonRippleEffect
} from "@ionic/vue";
import TabsSwipe from "@/components/common/TabsSwipe";
import ProfileAbout from "@/components/home/profile/AboutMe";
import ProfileSheet from "@/components/home/profile/Sheet";
import ProfileSheetCarma from "@/components/home/profile/SheetCarma";
import AvatarProfile from "@/components/common/AvatarProfile";
import ArticleList from "@/components/common/ArticleList";
import RubricsList from "@/components/common/RubricsList";
import PeopleList from "@/components/common/PeopleList";
import ComingSoon from "@/components/common/ComingSoon";
import { bigNumberFormat } from "@/helpers/number";
import { daysDuration } from "@/helpers/date";
import { textLinkFormatter } from "@/helpers/common";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProfileMainSection",
    components: {
        ComingSoon,
        PeopleList,
        RubricsList,
        ArticleList,
        AvatarProfile,
        ProfileSheetCarma,
        ProfileSheet,
        ProfileAbout,
        TabsSwipe,
        IonButton,
        IonIcon,
        IonSkeletonText,
        IonModal,
        IonContent,
        IonCard,
        IonRippleEffect
    },
    props: {
        sheetMenu: {
            type: Boolean,
            default: false
        },
        sheetPeople: {
            type: Boolean,
            default: false
        },
        profileData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            userIdFromParam: null,
            userId: null,
            sheet: false,
            sheetCarma: false,
            tabs: {
                selected: 2,
                carriage: {
                    width: null,
                    positionX: null
                },
                list: [
                    {
                        id: 2,
                        text: 'tab.about_me'
                    },
                    {
                        id: 1,
                        text: 'tab.posts'
                    },
                    {
                        id: 3,
                        text: 'tab.followers'
                    },
                    {
                        id: 4,
                        text: 'tab.following'
                    },
                    {
                        id: 5,
                        text: 'tab.comments'
                    }
                ]
            }
        }
    },
    mounted() {
        this.userIdFromParam = this.$route.params?.user_id
            ? Number(this.$route.params.user_id)
            : null;

        this.init();
    },
    computed: {
        ...mapGetters({
            isLoadGlobalData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            isLoadedMini: 'common/GET_LOADER_MINI',
            currentUser: 'user/GET_USER',
            targetUser: 'profile/GET_USER',
            isCurrentUser: 'profile/GET_IS_CURRENT_USER',
            categoryItemsTotal: 'category/GET_CATEGORIES_TOTAL',
            userSampleTotal: 'user/GET_USER_SAMPLE_TOTAL',
        }),
        account() {
            const user = this.targetUser;

            if (user) {
                this.$emit('update:profileData', user.profile);
            }

            return user;
        },
        followText() {
            return this.account.is_current_user_subscribed ? 'unfollow' : 'follow';
        },
        noDataArticle() {
            return this.isCurrentUser ? 'profile.no_data__articles' : 'profile.no_data__articles_1';
        },
        noDataFollowingCat() {
            return this.isCurrentUser ? 'profile.no_data__following_category' : 'profile.no_data__following_category_1';
        },
        noDataFollowingPeople() {
            return this.isCurrentUser ? 'profile.no_data__following_people' : 'profile.no_data__following_people_1';
        },
        noDataFollowers() {
            return this.isCurrentUser ? 'profile.no_data__followers' : 'profile.no_data__followers_1';
        }
    },
    watch: {
        $route(to, from) {
            const toUserId = to.params?.user_id
                ? Number(to.params.user_id)
                : null;

            if (
                (
                    toUserId === this.userIdFromParam
                    && to.name?.includes('profile')
                    && (!from.path?.includes('profile') || from.name?.includes('user-profile') || from.path?.includes('settings-feed'))
                )
                ||
                (
                    to.path?.includes('profile')
                    && from.path?.includes('bookmarks')
                )
            ) {
                if (to.name?.includes('profile')) {
                    this.init();
                }
            }
        },
        sheetMenu() {
            this.sheet = this.sheetMenu;
        },
        sheet() {
            this.$emit('update:sheetMenu', this.sheet);
        },
        'tabs.selected'() {
            this.initUserSample();
        }
    },
    methods: {
        ...mapActions({
            getUser: 'profile/getUser',
            getUserSample: 'user/getUserSample',
            fetchPosts: 'feed/fetchPosts',
            subscribeAction: 'user/followUser',
            getCategories: 'category/getCategories',
            createOrGetChat: 'chat/createOrGetChat',
            disableUser: 'user/disabledAction',
            fetchProfile: 'user/getProfile',
        }),
        textLinkFormatter,
        bigNumberFormat,
        daysDuration,
        init() {
            this.userId = this.userIdFromParam ?? this.currentUser.id;
            this.$store.commit('profile/SET_IS_CURRENT_USER', this.userId === this.currentUser.id)

            this.$emit('update:profileData', null);
            this.getUser(this.userId);

            this.initPosts();
            this.initUserSample();
            this.initCategories();
        },
        initUserSample() {
            if (this.tabs.selected === 3) {
                this.$store.commit('user/SET_USER_SAMPLE_RESOURCE', '/users/' + this.userId + '/followers')
            } else if (this.tabs.selected === 4) {
                this.$store.commit('user/SET_USER_SAMPLE_RESOURCE', '/users/' + this.userId + '/followings')
            } else {
                return;
            }
            this.$store.commit('user/SET_USER_SAMPLE_PARAMS', {
                countryIds: null,
                perPage: 5
            })
            this.getUserSample(true);
        },
        initCategories() {
            this.$store.commit('category/SET_CATEGORIES_RESOURCE', '/users/' + this.userId + '/categories')
            this.$store.commit('category/SET_CATEGORIES_PARAMS', {
                perPage: 5
            })
            this.getCategories(true);
        },
        initPosts() {
            this.$store.commit('feed/SET_PARAM_IS_FAVORITE', 0);
            this.$store.commit('feed/SET_PARAM_IS_BEST', 0);
            this.$store.commit('feed/SET_PARAM_IS_HOME', 0);
            this.$store.commit('feed/SET_PARAM_USER_ID', this.userId);
            this.$store.commit('feed/SET_IS_PROFILE_POSTS', true);
            this.$store.commit('feed/SET_PARAM_COUNTRIES', null);
            this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);

            this.fetchPosts(true);
        },
        subscribe() {
            this.$store.commit('common/SET_LOADER_MINI', true);

            this.subscribeAction({
                user_id: this.account.id
            })
                .then(({ data }) => {
                    this.$store.commit('profile/SET_USER', data);
                    this.fetchProfile();
                })
                .finally(() => {
                    this.$store.commit('common/SET_LOADER_MINI', false);
                })
        },
        contactMe() {
            this.createOrGetChat(this.account)
        },
        closeSheetPeople() {
            this.$emit('update:sheetPeople',false)
        },
        openReportModal() {
            this.closeSheetPeople();
            this.$store.commit('common/SET_REPORT_MODAL', true);
            this.$store.commit('common/SET_REPORT_TARGET', {
                id: this.targetUser.id,
                tax: 'user'
            });
        },
        handleDisableUser() {
            this.disableUser({
                user_id: this.targetUser.id
            }).finally(() => {
                this.closeSheetPeople();
            });
        },
    }
}
</script>
