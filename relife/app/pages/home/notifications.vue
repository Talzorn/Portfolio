<template>
    <home-layout
        :content-id="'notifi-content'"
        :content-class="'wrapper-c'"
        :page-title="$t('title.notifications')"
        :scroll-btn-top="true"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                router-link="/search"
            >
                <ion-icon :icon="require('@/assets/icons/search-icon.svg')"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end"
                router-link="/chat"
            >
                <ion-icon :icon="require('@/assets/icons/chat-icon.svg')"/>
                <span v-if="hasNewMessages" class="badge" style="top: 8px;right: 9px;"></span>
            </ion-button>
        </template>

        <div class="notifications wrapper-x">
            <template v-if="isLoadNotice">
                <div class="people-box"
                    v-for="item in 5"
                    :key="item"
                >
                    <div class="people-box__img" style="background-color: transparent">
                        <ion-skeleton-text animated style="line-height: 20px;--border-radius: 10px" />
                    </div>

                    <div class="people-box__group">
                        <div class="people-box__name" style="margin-bottom: 4px">
                            <ion-skeleton-text animated style="height: 18px;width: 80%;" />
                        </div>
                        <span class="people-box__text">
                            <ion-skeleton-text animated style="line-height: 14px;width: 60%" />
                        </span>
                    </div>

                    <div class="notifications-icon">
                        <ion-skeleton-text animated style="line-height: 20px;--border-radius: 10px" />
                    </div>
                </div>
            </template>

            <template v-else>
                <template v-if="list.length">
                    <ion-card class="people-box ion-activatable ripple-parent"
                        v-for="item in list"
                        :key="item.id"
                        :class="{'notifications-box--text': item.slug === NOTICE_SYSTEM}"
                    >
                        <ion-button class="people-box__img btn--no-style" fill="clear"
                            v-if="item.slug !== NOTICE_SYSTEM"
                            :router-link="item.notice_links.profile"
                        >
                            <ion-img class="main-img"
                                v-if="item.user?.profile?.avatar"
                                :src="item.user.profile.avatar"
                            />
                            <ion-icon v-else class="icon" :icon="require('@/assets/icons/avatar-icon.svg')" />

                            <ion-img class="flag"
                                v-if="item.user?.profile?.country"
                                :src="require('@/assets/icons/flags/' + item.user.profile.country.code + '.jpg')"
                            />
                        </ion-button>

                        <div class="people-box__group">
                            <div class="people-box__name">
                                <ion-button  class="btn--no-style" fill="clear"
                                    :router-link="item.notice_links.profile"
                                >
                                    <span>{{ item.notice_title }}</span>
                                </ion-button >
                            </div>
                            <span class="people-box__text"
                                v-html="item.notice_text"
                            />
                        </div>

                        <div class="notifications-icon"
                            v-if="item.slug !== NOTICE_SYSTEM"
                            :class="[colorsBg(item.slug)]"
                        >
                            <ion-icon class="icon" :icon="require('@/assets/icons/' + icon(item.slug))"
                                :style="{
                                    'font-size': iconSize(item.slug),
                                    'transform': item.slug === NOTICE_POSITIVE_RATING_POST || item.slug === NOTICE_POSITIVE_RATING_COMMENT
                                        ? 'scale(1, -1)'
                                        : 'scale(1, 1)'
                                }"
                            />
                        </div>

                        <div class="people-box__link"
                            @click="$router.push( item.notice_links.other ?? item.notice_links.profile )"
                        />
                        <ion-ripple-effect />
                    </ion-card>
                </template>
                <template v-else>
                    <no-data
                        :title="'dont_have_noti'"
                    />
                </template>
            </template>
        </div>
    </home-layout>
</template>

<script>
import { IonButton, IonIcon, IonCard, IonImg, IonRippleEffect, IonSkeletonText } from "@ionic/vue";
import {
    NOTICE_SUBSCRIBE,
    NOTICE_UNSUBSCRIBE,
    NOTICE_NEW_COMMENT,
    NOTICE_COMMENT_ANSWER,
    NOTICE_POSITIVE_RATING_POST,
    NOTICE_NEGATIVE_RATING_POST,
    NOTICE_POSITIVE_RATING_COMMENT,
    NOTICE_NEGATIVE_RATING_COMMENT,
    NOTICE_NEW_REGISTRATION,
    NOTICE_SYSTEM,
} from "@/common/const";
import NoData from "@/components/common/NoData";
import {mapGetters} from "vuex";
import NoticeMixin from '@/mixins/notice';

export default {
    name: "HomeNotifications",
    components: { NoData, IonButton, IonIcon, IonCard, IonImg, IonRippleEffect, IonSkeletonText },
    mixins: [NoticeMixin],
    data() {
        return {
            NOTICE_SYSTEM: NOTICE_SYSTEM,
            NOTICE_POSITIVE_RATING_POST: NOTICE_POSITIVE_RATING_POST,
            NOTICE_POSITIVE_RATING_COMMENT: NOTICE_POSITIVE_RATING_COMMENT,
        }
    },
    mounted() {
        this.initNotice();
    },
    computed: {
        ...mapGetters({
            list: 'common/GET_USER_NOTICES',
            hasNewMessages: 'chat/GET_HAS_NEW_MESSAGES'
        })
    },
    watch: {
        $route(to) {
            if (to.name === 'notifications') {
                this.initNotice();
            }
        },
    },
    methods: {
        colorsBg(value) {
            switch (value) {
                case NOTICE_SUBSCRIBE:
                    return 'subscribe';
                case NOTICE_UNSUBSCRIBE:
                    return 'unsubscribe';
                case NOTICE_POSITIVE_RATING_COMMENT:
                    return 'up';
                case NOTICE_NEGATIVE_RATING_COMMENT:
                    return 'down';
                case NOTICE_POSITIVE_RATING_POST:
                    return 'up';
                case NOTICE_NEGATIVE_RATING_POST:
                    return 'down';
                case NOTICE_NEW_COMMENT:
                case NOTICE_COMMENT_ANSWER:
                    return 'comment';
                case NOTICE_NEW_REGISTRATION:
                    return 'referral';
                default:
                    return '';
            }
        },
        icon(value) {
            switch (value) {
                case NOTICE_SUBSCRIBE:
                    return 'add-user-icon.svg';
                case NOTICE_UNSUBSCRIBE:
                    return 'remove-user-icon.svg';
                case NOTICE_POSITIVE_RATING_COMMENT:
                    return 'down-arrow-icon.svg';
                case NOTICE_NEGATIVE_RATING_COMMENT:
                    return 'down-arrow-icon.svg';
                case NOTICE_POSITIVE_RATING_POST:
                    return 'down-arrow-icon.svg';
                case NOTICE_NEGATIVE_RATING_POST:
                    return 'down-arrow-icon.svg';
                case NOTICE_NEW_COMMENT:
                case NOTICE_COMMENT_ANSWER:
                    return 'answer-icon.svg';
                case NOTICE_NEW_REGISTRATION:
                    return 'plus-icon--wrap.svg';
                default:
                    return '';
            }
        },
        iconSize(value) {
            switch (value) {
                case NOTICE_SUBSCRIBE:
                    return '20px';
                case NOTICE_UNSUBSCRIBE:
                    return '20px';
                case NOTICE_POSITIVE_RATING_COMMENT:
                    return '14px';
                case NOTICE_NEGATIVE_RATING_COMMENT:
                    return '14px';
                case NOTICE_POSITIVE_RATING_POST:
                    return '14px';
                case NOTICE_NEGATIVE_RATING_POST:
                    return '14px';
                case NOTICE_NEW_COMMENT:
                case NOTICE_COMMENT_ANSWER:
                    return '20px';
                case NOTICE_NEW_REGISTRATION:
                    return '20px';
                default:
                    return '';
            }
        },
    },
}
</script>
