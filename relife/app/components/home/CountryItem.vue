<template>
    <div class="country"
        :class="{'country__btn--first': size === 'large' && country.selected.length > 5}"
    >
        <template v-if="isLoadData">
            <div class="country__box" style="border: unset;background-color: transparent;opacity: 1;box-shadow: unset;"
                v-for="item in 1"
                :class="[size]"
                :key="item"
            >
                <ion-skeleton-text animated />
            </div>
        </template>
        <template v-else>
            <template v-if="country.selected.length && countries.length">
                <div
                    class="country__box"
                    v-for="item in countrySelected"
                    :class="[size, {active: item === country.tab}]"
                    :style="{'pointer-events': isLoadData ? 'none' : 'auto'}"
                    :key="item"
                    @click="handleFlag(item)"
                >
                    <ion-img :src="require('@/assets/icons/flags/' + getFlag(item) + '.jpg')"/>
                </div>
            </template>
            <template v-else>
                <div class="country__box" style="align-items: center;justify-content: center;opacity: 1;border: unset"
                    :class="[size]"
                >
                    <ion-icon :icon="require('@/assets/icons/flag-icon.svg')"
                        :style="{'font-size': size === 'large' ? '24px' : '16px'}"
                    />
                </div>
            </template>
        </template>

        <ion-button class="btn btn--head btn--icon" color="secondary"
            :class="{'btn--plus' : size === 'small'}"
            :style="{
                'margin' : size === 'small' ? '10px 0 10px -10px' : '0 6px 12px',
                'pointer-events': isLoadData ? 'none' : 'auto',
                width: size === 'small' && country.selected.length > 7 ? 'auto' : '20px'
            }"
            @click="modal = true"
        >
            <span
                style="font-weight: 700;padding: 0 4px;font-size: 12px;"
                v-if="size === 'small' && country.selected.length > 7"
            >
                +{{ country.selected.length - 7 }}
            </span>
            <ion-icon
                v-else
                :icon="require('@/assets/icons/plus-icon.svg')"
            />
        </ion-button>

        <ion-modal
            :is-open="modal"
            :showBackdrop="false"
            @didDismiss="modal = false"
        >
            <default-layout
                :page-class="'typical--fix-btn'"
                :content-id="'country-item'"
                :content-class="'wrapper-c'"
                :page-title="$t('title.choice_country')"
                :toolbar-search="true"
                :scroll-btn-top="true"
            >
                <template v-slot:searchItem>
                    <div class="form__input form__input--medium search">
                        <input
                            type="search"
                            enterkeyhint="search"
                            :placeholder="$t('search')"
                            debounce="500"
                            v-model="searchInput"
                            required
                        />
                        <ion-icon class="search__left" :icon="require('@/assets/icons/search-icon.svg')"/>
                        <ion-button @click="searchInput = ''" class="btn btn--icon search__right" color="secondary" slot="start">
                            <ion-icon :icon="require('@/assets/icons/close-icon.svg')" style="font-size: 18px"/>
                        </ion-button>
                    </div>
                </template>
                <template v-slot:headerButton>
                    <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                        @click="modal = false"
                    >
                        <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
                    </ion-button>
                </template>

                <filter-country
                    :is-load-data="isLoadData"
                    :list="items"
                    v-model:selected="country.selected"
                />

                <div class="fix-bottom">
                    <ion-button class="btn" color="primary" size="large" expand="block"
                        @click="applyCountries"
                    >{{ $t('apply') }}</ion-button>
                </div>
            </default-layout>
        </ion-modal>
    </div>
</template>

<script>
import { IonButton, IonIcon, IonImg, IonModal, IonSkeletonText } from '@ionic/vue'
import FilterCountry from '@/components/common/FilterCountry'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: "CountryItem",
    components: {FilterCountry, IonButton, IonIcon, IonImg, IonModal, IonSkeletonText },
    props: {
        size: {
            type: String,
            default: ''
        },
        choice: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            modal: false,
            country: {
                tab: 1,
                selectedMax: 5,
                selected: []
            },
            searchInput: '',
            dataList: []
        }
    },
    computed: {
        ...mapGetters({
            countries: 'reference/GET_COUNTRIES',
            countryFilters: 'user/GET_COUNTRY_FILTERS',
            myCountryFilters: 'user/GET_MY_COUNTRY_FILTERS',
            user: 'user/GET_USER',
            isLoadData: 'common/GET_IS_LOAD_DATA',
            checkListParams: 'checkList/GET_CHECK_LIST_PARAMS',
            isLoadGlobalData: 'common/GET_IS_LOAD_GLOBAL_DATA',
        }),
        items() {
            return this.dataList.length || this.searchInput !== '' ? this.dataList : this.countries;
        },
        countrySelected() {
            return this.size === 'small' ? this.country.selected.slice(0, 7) : this.country.selected;
        }
    },
    watch: {
        searchInput(val) {
            if (val) {
                const foundItems = this.countries.filter((item) => (item.text ?? item.name).toLowerCase().includes(val.toLowerCase()));

                if (foundItems.length) {
                    this.dataList = foundItems;
                } else {
                    this.dataList = [];
                }
            } else {
                this.dataList = JSON.parse(JSON.stringify(this.countries));
            }
        },
        modal(val) {
            if (!val) {
                this.setCountrySelected();
            }
        },
        countryFilters: {
            deep: true,
            handler() {
                this.setCountrySelected();
            }
        },
        user: {
            deep: true,
            handler() {
                this.setCountrySelected();
            }
        },
        'country.selected': {
            deep: true,
            handler() {
                if (this.choice) {
                    this.setFirstCountryInArray();
                }
            }
        },
        'country.tab'(val) {
            if (this.choice) {
                this.setSelectedCountry(val);
                this.$store.commit('feed/SET_PARAM_COUNTRIES', [val]);

                if (!this.isLoadGlobalData) {
                    this.fetchPosts();
                }
            }
        },
        $route(to) {
            if (to.path.includes('/home/base') || this.country.selected.length) {
                this.setFirstCountryInArray();

                this.$store.commit('checkList/SET_PARAM_COUNTRY', this.country.tab);
            }
        }
    },
    mounted () {
        this.dataList = JSON.parse(JSON.stringify(this.countries));
        if (!this.countries.length) {
            this.fetchCountries();
        }
        if (this.user) {
            const wishCountries = this.user?.wish_countries.map((item) => item.id);
            const selectedCountries = this.myCountryFilters.length ? this.myCountryFilters : wishCountries;

            this.country.selected = JSON.parse(JSON.stringify(selectedCountries));
            this.$store.commit('checkList/SET_PARAM_COUNTRY', JSON.parse(JSON.stringify(selectedCountries[0])));
        }
    },
    methods: {
        ...mapActions({
            fetchCountries: 'reference/fetchCountries',
            fetchPosts: 'feed/fetchPosts',
        }),
        ...mapMutations({
            setCountryFilters: 'user/SET_COUNTRY_FILTERS',
            setSelectedCountry: 'checkList/SET_PARAM_COUNTRY',
        }),
        handleFlag(value) {
            this.choice ? this.country.tab = value : this.modal = !this.modal;
        },
        getFlag(id) {
            const method = this.countries.find((item) => item.id === id);
            return method.code
        },
        applyCountries() {
            this.modal = false;
            const allUsersCountries = JSON.parse(JSON.stringify(this.countryFilters));
            const updatedUsersCountries = {...allUsersCountries, [this.user.id]: this.country.selected}
            this.setCountryFilters(updatedUsersCountries);
        },
        setCountrySelected() {
            this.$store.commit('checkList/SET_STEPS', null);
            this.$store.commit('checkList/SET_STEPS_PARAMS', {
                page: 1
            });

            const selectedCountries = this.myCountryFilters.length ?
                this.myCountryFilters :
                this.user?.wish_countries.map((item) => item.id);

            this.country.selected = JSON.parse(JSON.stringify(selectedCountries));
        },
        setFirstCountryInArray() {
            if (!this.checkListParams.country_id
                || !this.myCountryFilters.includes(this.checkListParams.country_id)
            ) {
                this.country.tab = this.myCountryFilters[0] ?? this.user.wish_countries.map((item) => item.id)[0];
            } else {
                this.country.tab = this.checkListParams.country_id ?? this.myCountryFilters[0];
            }
        }
    }
}
</script>
