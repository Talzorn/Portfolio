<template>
    <div class="country">
        <template v-if="isLoadData">
            <div class="country__box small" style="border: unset;background-color: transparent;opacity: 1;box-shadow: unset;"
                v-for="item in 1"
                :key="item"
            >
                <ion-skeleton-text animated />
            </div>
        </template>
        <template v-else>
            <template
                v-if="country.selected.length
                    && countries.length
                    && !country.selected.includes(ALL_COUNTRIES)"
            >
                <div
                    class="country__box small"
                    v-for="item in country.selected.slice(0, 7)"
                    :style="{'pointer-events': isLoadData ? 'none' : 'auto'}"
                    @click="modal = true"
                    :key="item"
                >
                    <ion-img :src="require('@/assets/icons/flags/' + getFlag(item) + '.jpg')"/>
                </div>
            </template>
            <template v-else>
                <div class="country__box small" style="align-items: center;justify-content: center;opacity: 1;border: unset;margin-right: 5px;">
                    <ion-icon :icon="require('@/assets/icons/flag-icon.svg')" style="font-size: 16px"/>
                </div>
            </template>
        </template>

        <ion-button class="btn btn--head btn--icon btn--plus" color="secondary" style="margin: 10px 0 10px -10px"
            :style="{
                'pointer-events': isLoadData ? 'none' : 'auto',
                width: country.selected.length > 7 ? 'auto' : '20px'
            }"
            @click="modal = true"
        >
            <span
                style="font-weight: 700;padding: 0 4px;font-size: 12px;"
                v-if="country.selected.length > 7"
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

                <div class="create-article">
                    <div class="select-list filter-country" style="width: 100%;margin-bottom: 24px;"
                        v-if="isLoadData"
                    >
                        <span class="select-list__title">{{ $t('createArticle.single_choice') }}</span>
                        <div class="select-list__item">
                            <ion-skeleton-text animated style="width: 100%;line-height: 26px;" />
                        </div>
                    </div>
                    <template v-else>
                        <div class="select-list" style="width: 100%;"
                            v-if="isSingleSelect && !isLoadData && countries.length"
                        >
                            <span class="select-list__title">{{ $t('createArticle.single_choice') }}</span>
                            <ion-card class="select-list__item ion-activatable ripple-parent" style="pointer-events: auto;margin-bottom: 24px;"
                                @click="handleCountry"
                                :class="{active: countryAll}"
                            >
                                {{ $t('createArticle.all_countries') }}
                                <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                                <ion-ripple-effect />
                            </ion-card>
                        </div>
                    </template>

                    <filter-country
                        v-if="!countries.length ? true : isSingleSelect ? items.length : searchInput.length"
                        :is-load-data="isLoadData"
                        :list="items"
                        :min-delete="false"
                        v-model:selected="country.selected"
                    />
                </div>

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
import { mapActions, mapGetters } from 'vuex'
import { ALL_COUNTRIES } from '../../common/const'

export default {
    name: "CountryAll",
    components: {FilterCountry, IonButton, IonIcon, IonImg, IonModal, IonSkeletonText },
    data() {
        return {
            modal: false,
            country: {
                selected: []
            },
            searchInput: '',
            dataList: [],
            countryAll: false,
            isLoading: false,
            ALL_COUNTRIES
        }
    },
    computed: {
        ...mapGetters({
            countries: 'reference/GET_COUNTRIES',
            isLoadData: 'common/GET_IS_LOAD_DATA',
            commonCountryFilters: 'user/GET_COMMON_COUNTRY_FILTERS',
            user: 'user/GET_USER',
        }),
        items() {
            return this.dataList.length || this.searchInput !== '' ? this.dataList : this.countries;
        },
        isSingleSelect() {
            return this.$t('createArticle.all_countries').toLowerCase().includes(this.searchInput.toLowerCase());
        },
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
        'country.selected': {
            deep: true,
            handler(val) {
                if (val.includes(ALL_COUNTRIES) || !val.length) {
                    this.countryAll = true;
                } else if (val.length && this.countryAll) {
                    this.countryAll = !this.countryAll;
                }
            }
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchCountries: 'reference/fetchCountries',
        }),
        init() {
            if (!this.countries.length) {
                this.fetchCountries();
            }

            this.dataList = JSON.parse(JSON.stringify(this.countries));
            this.country.selected = JSON.parse(JSON.stringify(this.commonCountryFilters[this.user.id] ?? [ALL_COUNTRIES]));
        },
        getFlag(id) {
            const method = this.countries.find((item) => item.id === id);
            return method.code
        },
        applyCountries() {
            this.modal = false;
            const allUsersCountries = JSON.parse(JSON.stringify(this.commonCountryFilters));
            const updatedUsersCountries = {...allUsersCountries, [this.user.id]: this.country.selected.length ? this.country.selected : [ALL_COUNTRIES]}
            this.$store.commit('user/SET_COMMON_COUNTRY_FILTERS', updatedUsersCountries);
        },
        handleCountry() {
            if (this.country.selected.includes(ALL_COUNTRIES)) {
                this.country.selected = [];
            } else {
                this.country.selected = [ALL_COUNTRIES];
            }
            this.countryAll = !this.countryAll;
        },
    }
}
</script>
