<template>
    <div class="base__container">
        <country-item
            :size="'large'"
            :choice="true"
        />

        <div class="swiper-box">
            <h3 class="wrapper-x" style="margin-top: 20px">{{ $t('top_about') }} {{ currentCountryName }}</h3>

            <swiper-primary
                v-if="isLoadGlobalData || posts?.data.length"
                :list="posts?.data"
                :is-load-data="isLoadGlobalData"
            />

            <template v-else>
                <div class="slider__no-data" style="height: 120px;padding-right: 20px;pointer-events: none">
                    <span>{{ $t('comSoon.swiper__no_data__article') }}</span>
                </div>
            </template>
        </div>

        <div class="wrapper-x" style="margin: 32px 0;">
            <div class="btn-two max-w-420">
                <!-- если нет наполнения чек листа мы его дизейблим и добавляем текст  Чек-лист - в разработке -->
                <ion-button class="btn" color="primary" size="small" expand="block" style="font-size: 14px"
                    @click="toCheckList"
                >
                    {{ $t('checklist_btn') + $t(textButton).toLowerCase() }}
                </ion-button>
                <!--
                <ion-button class="btn" color="primary" size="small" expand="block" style="font-size: 14px">
                    {{ $t('calculator') }}
                    <ion-icon slot="start" :icon="require('@/assets/icons/calculator-icon.svg')" style="margin-right: 8px;font-size: 18px;min-width: 18px;"/>
                </ion-button>
                -->
            </div>
        </div>

        <div class="slider">
            <h3 class="wrapper-x" style="margin: 0">{{ $t('people_of') }} {{ currentCountryName }}</h3>

            <slider-people
                :no-data="$t('comSoon.slider__no_data__people')"
            />

            <ion-button class="btn btn-more btn--text" fill="clear" style="align-self: flex-end;margin-bottom: -8px;"
                router-link="/people"
                v-if="userTotal >= 4"
            >
                {{ $t('see_all_v1') }}
                <ion-icon slot="end" :icon="require('@/assets/icons/arrow-right-icon.svg')" style="font-size: 12px"/>
            </ion-button>
        </div>

        <div class="slider" style="margin-bottom: 8px">
            <h3 class="wrapper-x" style="margin: 0 0 12px">{{ $t('rubrics') }}</h3>

            <slider-categories
                :list="categories"
                :is-load-data="isLoadData"
                :no-data="$t('comSoon.slider__no_data__categories')"
            />
        </div>

        <!--
        <div class="slider" style="margin-top: 32px">
            <h3 class="wrapper-x" style="margin: 0 0 12px">{{ $t('hotels') }}</h3>

            <slider-primary
                :list="sliderHotels"
                :is-load-data="false"
                :no-data="$t('comSoon.slider__no_data__hotel')"
            />

            <ion-button class="btn btn-more btn--text" fill="clear" style="align-self: flex-end;margin-bottom: -8px;"
                v-if="sliderHotels.length > 4"
            >
                {{ $t('see_all') }}
                <ion-icon slot="end" :icon="require('@/assets/icons/arrow-right-icon.svg')" style="font-size: 12px"/>
            </ion-button>
        </div>
        -->
    </div>
</template>

<script>
// import SliderPrimary from "@/components/common/SliderPrimary";
import SliderPeople from "@/components/common/SliderPeople";
import SliderCategories from "@/components/common/SliderCategories";
import SwiperPrimary from "@/components/common/SwiperPrimary";
import CountryItem from "@/components/home/CountryItem";
import {IonButton, IonIcon } from "@ionic/vue";
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "BaseResetSection",
    components: { SliderPeople, SliderCategories, SwiperPrimary, CountryItem, IonButton, IonIcon },
    props: {
        sliderHotels: {
            type: Array,
            default: () => []
        },
        tabsActive: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ...mapGetters({
            checkListParams: 'checkList/GET_CHECK_LIST_PARAMS',
            checkListCountry: 'checkList/GET_CHECK_LIST_PARAMS_COUNTRY',
            categories: 'reference/GET_CATEGORIES',
            isLoadData: 'common/GET_IS_LOAD_DATA',
            isLoadGlobalData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            posts: 'feed/GET_POSTS',
            countries: 'reference/GET_COUNTRIES',
            userTotal: 'user/GET_USER_SAMPLE_TOTAL',
        }),
        currentCountryName() {
            return this.countries.find((item) => item.id === this.checkListParams.country_id)?.name ?? '';
        },
        textButton() {
            return this.tabsActive === 1 ? 'rest_1' : 'relocation_1';
        }
    },
    watch: {
        $route(to) {
            if (to.path.includes('/home/base')) {
                this.init();
                this.getUsers();
            }
        },
        checkListCountry(val) {
            this.$store.commit('feed/SET_PARAM_COUNTRIES', [val]);
            this.getUsers();
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchCategories: 'reference/fetchCategories',
            fetchCountries: 'reference/fetchCountries',
            fetchPosts: 'feed/fetchPosts',
            getUserSample: 'user/getUserSample',
        }),
        init() {
            if (!this.categories.length) {
                this.fetchCategories()
            }

            if (!this.countries.length) {
                this.fetchCountries()
            }
        },
        toCheckList() {
            this.$router.push({
                name: 'check-list',
                params: {
                    countryId: this.checkListParams?.country_id
                }
            })
        },
        getUsers() {
            if (this.checkListParams?.country_id) {
                this.$store.commit('common/SET_IS_LOAD_GLOBAL_DATA', true);
                this.$store.commit('user/SET_USER_SAMPLE_RESOURCE', '/users');

                this.$store.commit('user/SET_USER_SAMPLE_PARAMS', {
                    countryIds: [this.checkListParams.country_id],
                    perPage: 10
                })

                this.getUserSample(true);
            }
        }
    }
}
</script>
