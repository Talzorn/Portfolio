<template>
    <home-layout
        :content-id="'feed-content'"
        :page-class="'feed'"
        :country="true"
        :scroll-btn-top="true"
    >
        <template v-slot:country>
            <country-item
                v-if="tabs.selected === 2"
                :size="'small'"
                :choice="false"
            />
            <country-all
                v-else
            />
        </template>

        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                router-link="/search"
            >
                <ion-icon :icon="require('@/assets/icons/search-icon.svg')"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end"  style="margin-right: 12px"
                @click="routerCreateArticle"
            >
                <ion-icon :icon="require('@/assets/icons/edit-icon.svg')" style="font-size: 18px"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end"
                @click="filter = true"
            >
                <ion-icon :icon="require('@/assets/icons/filter-icon.svg')"/>
            </ion-button>
        </template>

        <ion-refresher slot="fixed" @ionRefresh="doRefresh">
            <ion-refresher-content />
        </ion-refresher>

        <tabs-swipe style="margin-top: 14px"
            :class="{disabled: isLoadData}"
            :list="tabs.list"
            v-model:selected="tabs.selected"
            v-model:carrWidth="tabs.carriage.width"
            v-model:carrPosition="tabs.carriage.positionX"
        />

        <!--<slider-stories style="margin-top: 24px"
            :list="sliderStories"
        />-->
        <article-list class="wrapper-x" style="margin-top: 24px"
            v-if="isArticleList"
            :no-data-title="'search_not_found'"
            :selected-tab="tabs.selected"
        />

        <template v-else>
            <no-data class="wrapper-x" style="max-width: 420px;margin-top: 24px"
                v-if="this.tabs.selected >= 0 && this.tabs.selected <= 3"
                :title="'comSoon.no_data__no_rubrics__title'"
                :btn-show="true"
                :btn-text="'profile.settings_feed'"
                :btn-router="'/profile/settings-feed'"
            />
        </template>

        <coming-soon style="padding: 64px 20px 48px;"
            v-if="tabs.selected === 4"
            :title="$t('comSoon.feed_services__title')"
            :desc="$t('comSoon.feed_services__text')"
        />

        <coming-soon style="padding: 64px 20px 48px;"
            v-if="tabs.selected === 5"
            :title="$t('comSoon.feed_jobs__title')"
            :desc="$t('comSoon.feed_jobs__text')"
            :btn-partner="true"
            :btn-partner-text="$t('comSoon.feed_jobs__btn')"
            :btn-partner-type="FORM_EMPLOYER"
        />

        <coming-soon style="padding: 64px 20px 48px;"
            v-if="tabs.selected === 6"
            :title="$t('comSoon.feed_event__title')"
            :desc="$t('comSoon.feed_event__text')"
            :btn-partner="true"
            :btn-partner-text="$t('comSoon.feed_event__btn')"
            :btn-partner-type="FORM_ORGANIZER"
        />

        <coming-soon style="padding: 64px 20px 48px;"
            v-if="tabs.selected === 7"
            :title="$t('comSoon.feed_training__title')"
            :desc="$t('comSoon.feed_training__text')"
            :btn-partner="true"
            :btn-partner-text="$t('comSoon.feed_training__btn')"
            :btn-partner-type="FORM_EDUCATOR"
        />

        <feed-filter
            v-model:selected-categories="selectedCategories"
            v-model:show="filter"
        />
    </home-layout>
</template>

<script>
import { IonButton, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/vue'
import FeedFilter from "@/components/home/feed/Filter";
import TabsSwipe from "@/components/common/TabsSwipe";
import { mapActions, mapGetters } from 'vuex';
import { FORM_EMPLOYER, FORM_ORGANIZER, FORM_EDUCATOR, SORT_TYPE_DATE, SORT_TYPE_MY_FEED, SORT_TYPE_POPULAR } from '@/common/const';
import ArticleList from '@/components/common/ArticleList'
import ComingSoon from "@/components/common/ComingSoon";
import NoData from "@/components/common/NoData";
import CountryItem from "@/components/home/CountryItem";
import CountryAll from "@/components/common/CountryAll";
import { ALL_COUNTRIES } from '../../common/const'

export default {
    name: "MainFeed",
    components: {
        CountryAll,
        CountryItem,
        NoData,
        ComingSoon,
        TabsSwipe,
        FeedFilter,
        IonButton,
        IonIcon,
        ArticleList,
        IonRefresher,
        IonRefresherContent
    },
    data() {
        return {
            filter: false,
            selectedCategories: [],
            tabs: {
                selected: 1,
                carriage: {
                    width: null,
                    positionX: null
                },
                list: [
                    {
                        id: SORT_TYPE_DATE,
                        text: 'tab.new'
                    },
                    {
                        id: SORT_TYPE_POPULAR,
                        text: 'tab.popular'
                    },
                    {
                        id: SORT_TYPE_MY_FEED,
                        text: 'tab.my_ribbon'
                    },
                    {
                        id: 4,
                        text: 'tab.services'
                    },
                    {
                        id: 5,
                        text: 'tab.jobs'
                    },
                    {
                        id: 6,
                        text: 'tab.event'
                    },
                    {
                        id: 7,
                        text: 'tab.training'
                    }
                ]
            },
            sliderStories: [
                {
                    id: 1,
                    title: 'Древний отель',
                    img: 'cyprus.jpg',
                    new: true
                },
                {
                    id: 2,
                    title: 'Лучший отель древности',
                    img: 'cyprus-1.jpg',
                    new: true
                },
                {
                    id: 3,
                    title: 'Лучший вид из отеля',
                    img: 'beach-cyprus.jpg',
                    new: false
                },
                {
                    id: 4,
                    title: 'Отель полумесяц',
                    img: 'Dubai.jpg',
                    new: false
                },
            ],
            FORM_EMPLOYER,
            FORM_ORGANIZER,
            FORM_EDUCATOR,
        }
    },
    mounted() {
        setTimeout(() => {
            this.init();
        }, 100);
    },
    computed: {
        ...mapGetters({
            countryFilters: 'user/GET_COUNTRY_FILTERS',
            isLoadData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            user: 'user/GET_USER',
            isProfilePosts: 'feed/GET_IS_PROFILE_POSTS',
            countries: 'reference/GET_COUNTRIES',
            commonCountryFilters: 'user/GET_COMMON_COUNTRY_FILTERS',
        }),
        newPopularCountryFilters() {
            const filters = this.commonCountryFilters[this.user.id] ?? [ALL_COUNTRIES];
            return filters.includes(ALL_COUNTRIES) ? null : this.commonCountryFilters[this.user.id];
        },
        isDisableInfiniteScroll() {
            return this.posts?.meta.current_page === this.posts?.meta.last_page
        },
        isArticleList() {
            if (this.tabs.selected >= 0 && this.tabs.selected <= 3) {
                if (this.tabs.selected === 2) {
                    return this.user.followings_count || this.user.following_categories_count;
                }
                return true;
            }
            return false;
        }
    },
    watch: {
        $route(to, from) {
            if (
                this.isProfilePosts && to.name !== 'article' ||
                to.name === 'feed' && from.name !== 'article'
            ) {
                this.$store.commit('feed/SET_PARAM_SORT_TYPE', this.tabs.selected);
                this.$store.commit('feed/SET_PARAM_PAGE', null);
                this.$store.commit('feed/SET_PARAM_IS_FAVORITE', 0);
                this.$store.commit('feed/SET_PARAM_IS_BEST', 0);
                this.$store.commit('feed/SET_PARAM_IS_HOME', 0);
                this.$store.commit('feed/SET_PARAM_USER_ID', null);
                this.$store.commit('feed/SET_PARAM_CATEGORIES', null);

                if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.tabs.selected)) {
                    this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                    this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
                }

                setTimeout(() => {
                    this.$store.commit('feed/SET_IS_PROFILE_POSTS', false);
                    this.fetchPosts();
                }, 100);
            }
        },
        'tabs.selected'(val) {
            this.$store.commit('feed/SET_PARAM_SORT_TYPE', val);
            this.$store.commit('feed/SET_PARAM_PAGE', null);

            if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(val)) {
                this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
            }

            setTimeout(() => {
                this.fetchPosts();
            }, 100);
        },
        'selectedCategories': {
            deep: true,
            handler(val) {
                this.$store.commit('feed/SET_PARAM_SORT_TYPE', this.tabs.selected);
                this.$store.commit('feed/SET_PARAM_PAGE', null);
                this.$store.commit('feed/SET_PARAM_CATEGORIES', val);

                if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.tabs.selected)) {
                    this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                    this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
                }

                setTimeout(() => {
                    if (!this.isLoadData) {
                        this.fetchPosts();
                    }
                }, 100);
            }
        },
        countryFilters: {
            deep: true,
            handler() {
                setTimeout(() => {
                    this.fetchPosts();
                }, 100);
            }
        },
        newPopularCountryFilters: {
            deep: true,
            handler(val) {
                if (this.$route.name === 'feed') {
                    setTimeout(() => {
                        if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.tabs.selected)) {
                            this.$store.commit('feed/SET_PARAM_COUNTRIES', val);
                            this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
                        }

                        this.fetchPosts();
                    }, 100);
                }
            }
        }
    },
    methods: {
        ...mapActions({
            fetchPosts: 'feed/fetchPosts',
        }),
        init(isReload = true) {
            this.$store.commit('feed/SET_PARAM_IS_FAVORITE', 0);
            this.$store.commit('feed/SET_PARAM_IS_BEST', 0);
            this.$store.commit('feed/SET_PARAM_IS_HOME', 0);
            this.$store.commit('feed/SET_PARAM_USER_ID', null);
            this.$store.commit('feed/SET_PARAM_CATEGORIES', null);

            if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.tabs.selected)) {
                this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
            }

            this.fetchPosts(isReload);
        },
        doRefresh(event) {
            this.$store.commit('feed/SET_PARAM_IS_FAVORITE', 0);
            this.$store.commit('feed/SET_PARAM_IS_BEST', 0);
            this.$store.commit('feed/SET_PARAM_IS_HOME', 0);
            this.$store.commit('feed/SET_PARAM_USER_ID', null);

            if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.tabs.selected)) {
                this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
            }

            this.fetchPosts().then(() => {
                event.target.complete();
            });
        },
        routerCreateArticle() {
            this.$store.commit('user/SET_CREATE_CATEGORY_ID', null);
            this.$router.push('/create-article');
        }
    }
}
</script>
