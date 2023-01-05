<template>
    <home-layout
        :page-class="'base'"
        :country="false"
        :page-title="$t('title.home')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                router-link="/search"
            >
                <ion-icon :icon="require('@/assets/icons/search-icon.svg')"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end" style="margin-right: 12px"
                @click="openCreateBaseForm"
            >
                <ion-icon :icon="require('@/assets/icons/edit-icon.svg')" style="font-size: 18px"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end"
                router-link="/chat"
            >
                <ion-icon :icon="require('@/assets/icons/chat-icon.svg')"/>
                <span v-if="hasNewMessages" class="badge" style="top: 8px;right: 9px;"></span>
            </ion-button>
        </template>

        <ion-refresher slot="fixed" @ionRefresh="doRefresh">
            <ion-refresher-content />
        </ion-refresher>

        <div class="wrapper-x">
            <div class="tabs tabs--three">
                <span class="tabs__box"
                    @click="tabs = 1"
                    :class="{active: tabs === 1}"
                >{{ $t('tab.rest') }}</span>
                <span class="tabs__box"
                    @click="tabs = 2"
                    :class="{active: tabs === 2}"
                >{{ $t('tab.relocation') }}</span>
                <span class="tabs__box"
                    @click="tabs = 3"
                    :class="{active: tabs === 3}"
                >{{ $t('tab.business') }}</span>
                <span class="tabs__selected"></span>
            </div>
        </div>

        <coming-soon
            v-if="tabs === 3"
            :title="$t('comSoon.base__business__title')"
            :desc="$t('comSoon.base__business__desc')"
            :btn-launch="true"
            :btn-launch-text="$t('comSoon.btn_launch')"
        />

        <base-section
            v-else
            :slider-hotels="sliderHotels"
            :tabs-active="tabs"
        />

        <ion-modal
            :is-open="showCreateArticle"
            :showBackdrop="false"
            @didDismiss="showCreateArticle = false"
        >
            <create-base-article
                :is-home="true"
                :show-create-article="showCreateArticle"
                v-model:show="showCreateArticle"
            />
        </ion-modal>
    </home-layout>
</template>

<script>
import { IonButton, IonIcon, IonRefresher, IonRefresherContent, IonModal } from "@ionic/vue";
import BaseSection from "@/components/home/base";
import ComingSoon from "@/components/common/ComingSoon";
import CreateBaseArticle from '../create-base-article'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "MainBase",
    components: { ComingSoon, BaseSection, CreateBaseArticle, IonButton, IonIcon, IonRefresher, IonRefresherContent, IonModal },
    data() {
        return {
            tabs: null,
            restTab: process.env.VUE_APP_TARGET_REST_IS_CATEGORY,
            relocationTab: process.env.VUE_APP_TARGET_RELOCATION_IS_CATEGORY,
            businessTab: process.env.VUE_APP_TARGET_BUSINESS_IS_CATEGORY,
            currentCategory: this.restTab,
            sliderHotels: [
                {
                    id: 1,
                    title: 'Древний отель',
                    img: 'cyprus.jpg',
                    carma: '174'
                },
                {
                    id: 2,
                    title: 'Лучший отель древности',
                    img: 'cyprus-1.jpg',
                    carma: '274'
                },
                {
                    id: 3,
                    title: 'Лучший вид из отеля',
                    img: 'beach-cyprus.jpg',
                    carma: '894'
                },
                {
                    id: 4,
                    title: 'Отель полумесяц',
                    img: 'Dubai.jpg',
                    carma: '82'
                },
                {
                    id: 5,
                    title: 'Отель полумесяц',
                    img: 'Dubai.jpg',
                    carma: '82'
                }
            ],
            showCreateArticle: false,
        }
    },
    computed: {
        ...mapGetters({
            categories: 'reference/GET_CATEGORIES',
            checkListParams: 'checkList/GET_CHECK_LIST_PARAMS',
            params: 'feed/GET_POSTS_PARAMS',
            isLoadGlobalData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            hasNewMessages: 'chat/GET_HAS_NEW_MESSAGES'
        })
    },
    watch: {
        tabs(val) {
            if (val !== 3) {
                if (val === 1) {
                    this.currentCategory = this.restTab;
                }
                if (val === 2) {
                    this.currentCategory = this.relocationTab;
                }

                this.$store.commit('feed/SET_PARAM_COUNTRIES', [this.checkListParams.country_id]);
                this.$store.commit('feed/SET_PARAM_CATEGORIES', [this.currentCategory]);
                this.$store.commit('checkList/SET_PARAM_PURPOSE', val);

                if (!this.isLoadGlobalData) {
                    this.fetchPosts();
                }
            }
        },
        $route(to) {
            if (to.path.includes('home/base')) {
                this.init();
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchPosts: 'feed/fetchPosts',
            getUserSample: 'user/getUserSample',
            fetchModeratorInfo: 'user/fetchModeratorInfo',
        }),
        init(event = null) {
            this.tabs = this.checkListParams?.purpose_id ?? 1;

            this.$store.commit('feed/SET_PARAM_PAGE', null);
            this.$store.commit('feed/SET_PARAM_COUNTRIES', [this.checkListParams.country_id]);
            this.$store.commit('feed/SET_PARAM_CATEGORIES', [this.currentCategory]);
            this.$store.commit('feed/SET_PARAM_IS_FAVORITE', 0);
            this.$store.commit('feed/SET_PARAM_USER_ID', null);
            this.$store.commit('feed/SET_PARAM_IS_BEST', 1);
            this.$store.commit('feed/SET_PARAM_IS_HOME', 1);
            this.$store.commit('feed/SET_PARAM_SORT_TYPE', 1);

            this.fetchPosts().then(() => {
                if (event) {
                    event.target.complete();
                }
            });
        },
        getUsers() {
            this.$store.commit('common/SET_IS_LOAD_GLOBAL_DATA', true);
            this.$store.commit('user/SET_USER_SAMPLE_RESOURCE', '/users');

            this.$store.commit('user/SET_USER_SAMPLE_PARAMS', {
                countryIds: [this.checkListParams.country_id],
                perPage: 10
            })

            this.getUserSample(true);
        },
        doRefresh(event) {
            this.init(event);
            this.getUsers();
        },
        openCreateBaseForm() {
            this.$store.commit('common/SET_NOTIFICATION_SHOW', true);
            this.fetchModeratorInfo()
                .then((res) => {
                    if (res.is_moderator) {
                        this.showCreateArticle = true;
                    } else {
                        this.$store.commit('common/SET_MODERATOR_INFO', res);
                        this.moderatorInfoShow = true;
                    }
                })
                .finally(() => {
                    this.$store.commit('common/SET_NOTIFICATION_SHOW', false);
                })
        }
    }
}
</script>
