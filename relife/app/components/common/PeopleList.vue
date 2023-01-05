<template>
    <div class="people-cont">
        <template v-if="users === null || isLoadData">
            <ion-card class="people-box"
                v-for="item in 5"
                :key="item"
                :class="{'people-box--follow': carmaShow === false}"
            >
                <div class="people-box__img" style="background-color: transparent;">
                    <ion-skeleton-text animated style="height: 42px;width: 42px;--border-radius: 10px;" />
                </div>
                <div class="people-box__group">
                    <span class="people-box__name" style="margin-bottom: 4px">
                        <ion-skeleton-text animated style="line-height: 18px;width: 92%" />
                    </span>
                    <div class="people-box__bottom">
                        <div class="people-box__position">
                            <ion-skeleton-text animated style="line-height: 18px;width: 72px" />
                        </div>
                    </div>
                </div>
                <ion-skeleton-text animated style="line-height: 24px;width: 90px;--border-radius: 6px;"
                    v-if="!carmaShow"
                />
                <span class="karma-square" style="background-color: transparent;"
                    v-else
                >
                    <ion-skeleton-text animated style="line-height: 18px;--border-radius: 10px" />
                </span>
            </ion-card>
        </template>

        <template v-else>
            <template v-if="users?.length">
                <ion-card class="people-box ion-activatable ripple-parent"
                    v-for="user in users"
                    :key="user.id"
                    :class="{'people-box--follow': !carmaShow && user.id !== loggedUser.id}"
                >
                    <div class="people-box__img">
                        <ion-img v-if="user.profile.avatar" class="main-img" :src="user.profile.avatar"/>
                        <ion-icon v-else class="icon" :icon="require('@/assets/icons/avatar-icon.svg')"/>

                        <ion-img class="flag"
                            v-if="user.profile.country"
                            :src="require('@/assets/icons/flags/' + user.profile.country.code + '.jpg')"
                        />
                    </div>

                    <div class="people-box__group">
                        <span class="people-box__name">{{ user.profile.nickname }}</span>
                        <div class="people-box__bottom">
                            <div class="people-box__position">
                                <span
                                    :style="{'background-color': '#944bba'}"
                                >
                                    {{ user.profile.profession.name }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <ion-button class="btn button-mini" color="primary" expand="block"
                        v-if="!carmaShow && user.id !== loggedUser.id"
                        :class="{following: behavior === 'following' && user.is_current_user_subscribed}"
                        :disabled="isLoading"
                        @click="setAction(user)"
                    >
                        {{ getText(user) }}
                    </ion-button>

                    <span class="karma-square"
                        v-else
                    >
                        {{ bigNumberFormat(user.ratings_count) }}
                        <b>{{ $t('carma') }}</b>
                    </span>

                    <div class="people-box__link"
                        @click="toProfile(user.id)"
                    />
                    <ion-ripple-effect />
                </ion-card>
            </template>

            <template v-else>
                <no-data
                    :title="noDataTitle"
                    :btn-show="noDataBtn"
                    :btn-text="noDataBtnText"
                    :btn-router="noDataBtnLink"
                />
            </template>
        </template>
        <template v-if="isLoadMore && users !== null">
            <ion-infinite-scroll
                @ionInfinite="onIonInfinite"
                :disabled="isLastPage"
            >
                <ion-infinite-scroll-content>
                    <loader-item :stroke-width="5" />
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </div>
</template>

<script>
import {
    IonButton,
    IonCard,
    IonIcon,
    IonImg,
    IonRippleEffect,
    IonSkeletonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/vue";
import NoData from "@/components/common/NoData";
import {mapActions, mapGetters} from "vuex";
import { bigNumberFormat } from "@/helpers/number";
import LoaderItem from "@/components/common/Loader";

export default {
    name: "PeopleList",
    components: {
        NoData,
        IonButton,
        IonIcon,
        IonCard,
        IonRippleEffect,
        IonImg,
        IonSkeletonText,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        LoaderItem
    },
    props: {
        carmaShow: {
            type: Boolean,
            default: false
        },
        isLoadMore: {
            type: Boolean,
            default: false
        },
        maxCount: {
            type: Number,
        },
        behavior: {
            required: true,
            type: String,
            default: ''
        },
        noDataTitle: {
            type: String,
            default: ''
        },
        noDataBtn: {
            type: Boolean,
            default: false
        },
        noDataBtnText: {
            type: String,
            default: ''
        },
        noDataBtnLink: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters({
            userItems: 'user/GET_USER_SAMPLE_ITEMS',
            isLoadData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            isLoading: 'common/GET_LOADER_MINI',
            isLastPage: 'user/GET_USER_SAMPLE_IS_LAST_PAGE',
            currentPage: 'user/GET_USER_SAMPLE_PAGE',
            loggedUser: 'user/GET_USER',
        }),
        users() {
            if (this.maxCount && this.userItems) {
                return this.userItems.slice(0, this.maxCount);
            }
            return this.userItems;
        }
    },
    methods: {
        ...mapActions({
            getUserSample: 'user/getUserSample',
            subscribeAction: 'user/followUser',
            disabledAction: 'user/disabledAction',
            fetchProfile: 'user/getProfile',
        }),
        bigNumberFormat,
        getText(user) {
            switch (this.behavior) {
                case 'following':
                    return user.is_current_user_subscribed ? this.$t('unfollow') : this.$t('follow');
                case 'blocked':
                    return this.$t('unblock');
            }
        },
        setAction(user) {
            switch (this.behavior) {
                case 'following':
                    this.subscribe(user);
                    break;
                case 'blocked':
                    this.unblock(user);
                    break;
            }
        },
        subscribe(user) {
            this.$store.commit('common/SET_LOADER_MINI', true);

            this.subscribeAction({
                user_id: user.id
            })
                .then(() => {
                    this.getUserSample();
                    this.fetchProfile();
                })
                .finally(() => {
                    this.$store.commit('common/SET_LOADER_MINI', false);
                })
        },
        unblock(user) {
            this.$store.commit('common/SET_LOADER_MINI', true);

            this.disabledAction({
                user_id: user.id
            })
                .then(() => {
                    this.getUserSample();
                })
                .finally(() => {
                    this.$store.commit('common/SET_LOADER_MINI', false);
                })
        },
        onIonInfinite(event) {
            this.$store.commit('user/SET_USER_SAMPLE_PARAMS', {
                page: this.currentPage + 1,
            })

            this.getUserSample();
            event.target.complete()
        },
        toProfile(user_id) {
            this.$router.push({ name: 'user-profile', params: { user_id } });
            /*
             * TODO: тут определяется переход на профиль обычного пользователя или авторизованного
             * отключено из-за проблем навигации, при переходе из другого layout
             */
            /* if (user_id === this.loggedUser.id) {
                this.$router.push('/home/profile');
            } else {
                this.$router.push({ name: 'user-profile', params: { user_id } });
            }*/
        },
    }
}
</script>
