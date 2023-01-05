<template>
    <div class="multi-select">
        <div
            class="form__input form__select"
            :class="classBox"
            @click="handleModal"
        >
            <input
                :value="getLastText"
                :placeholder="placeholder"
                readonly
            />
            <ion-icon class="down-icon" :icon="require('@/assets/icons/down-arrow-icon.svg')"/>
            <span class="text--error"
                v-if="errorText.length"
            >
                {{ errorText }}
            </span>
        </div>

        <div class="multi-select-box">
            <div class="country-select-box"
                v-for="item in value"
                :key="item"
            >
                <span>{{ getText(item) }}</span>

                <div class="country"
                    @click="handleShowCountry(item[property + '_id'])"
                >
                    <ion-button class="btn btn--head btn--icon btn--plus" color="secondary" style="margin: 0 4px 0 0"
                        :style="{width: item.country_ids.length > 5 ? 'auto' : '20px'}"
                    >
                        <span
                            style="font-weight: 700;padding: 0 4px;font-size: 12px;line-height: 1;"
                            v-if="item.country_ids.length > 5"
                        >
                            +{{ item.country_ids.length - 5 }}
                        </span>
                        <ion-icon
                            v-else
                            :icon="require('@/assets/icons/plus-icon.svg')"
                        />
                    </ion-button>
                    <template v-if="!item.country_ids.length">
                        <div class="country__box small"
                            v-for="item in 1"
                            :key="item"
                        >
                            <ion-skeleton-text animated />
                        </div>
                    </template>
                    <template v-else>
                        <div
                            v-for="item in itemCountryId(item.country_ids)"
                            :key="item"
                            class="country__box small"
                        >
                            <ion-img v-if="getFlag(item)" :src="require('@/assets/icons/flags/' + getFlag(item) + '.jpg')"/>
                        </div>
                    </template>
                </div>

                <ion-button class="btn btn--icon country-select-box__close " color="primary" expand="block"
                    @click="deleteElement(item[property + '_id'])"
                >
                    <ion-icon :icon="require('@/assets/icons/close-icon.svg')"/>
                </ion-button>
            </div>
        </div>

        <ion-modal
            :is-open="show"
            :showBackdrop="false"
            @didDismiss="show = false"
        >
            <default-layout
                :page-class="'typical--fix-btn'"
                :content-id="'country-able-select-1'"
                :content-class="'wrapper-c'"
                :page-title="mainTitle"
                :toolbar-search="search"
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
                        @click="handleModal"
                    >
                        <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
                    </ion-button>
                </template>

                <ul
                    class="select-list"
                    v-if="isLoadData"
                >
                    <li
                        class="select-list__item"
                        v-for="(item, index) in 6"
                        :key="index"
                    >
                        <ion-skeleton-text animated style="line-height: 26px;" />
                    </li>
                </ul>
                <div
                    class="select-list multi-select"
                    v-else
                >
                    <template v-if="items.length">
                        <ion-card
                            class="select-list__item ion-activatable ripple-parent"
                            v-for="item in items"
                            :key="item.id"
                            @click="setElement(item.id)"
                            :class="{active: value.findIndex((findItem) => {
                                return findItem[property + '_id'] === item.id
                            }) !== -1}"
                        >
                            <ion-img v-if="item.code" class="select-list__flag" :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
                            {{ item.text ?? item.name }}
                            <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                            <ion-ripple-effect />
                        </ion-card>
                    </template>
                    <template v-else>
                        <no-data
                            :title="'search_not_found'"
                        />
                    </template>
                </div>

                <div class="fix-bottom">
                    <ion-button class="btn" color="primary" size="large" expand="block"
                        @click="handleModal"
                    >{{ $t('apply') }}</ion-button>
                </div>
            </default-layout>
        </ion-modal>

        <ion-modal
            :is-open="showCountry"
            :showBackdrop="false"
            @didDismiss="showCountry = false"
        >
            <default-layout
                :page-class="'typical--fix-btn'"
                :content-id="'country-able-select-2'"
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
                            v-model="searchInputCountry"
                            required
                        />
                        <ion-icon class="search__left" :icon="require('@/assets/icons/search-icon.svg')"/>
                        <ion-button @click="searchInputCountry = ''" class="btn btn--icon search__right" color="secondary" slot="start">
                            <ion-icon :icon="require('@/assets/icons/close-icon.svg')" style="font-size: 18px"/>
                        </ion-button>
                    </div>
                </template>
                <template v-slot:headerButton>
                    <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                        @click="showCountry = false"
                    >
                        <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
                    </ion-button>
                </template>

                <filter-country
                    :is-load-data="isLoadDataCountry"
                    :list="itemsCountry"
                    :selectedMax="choiceCountryMax"
                    v-model:selected="countrySelected"
                />

                <div class="fix-bottom">
                    <ion-button class="btn" color="primary" size="large" expand="block"
                        @click="handleApplyCountry"
                    >{{ $t('apply') }}</ion-button>
                </div>
            </default-layout>
        </ion-modal>
    </div>
</template>

<script>
import { IonButton, IonIcon, IonModal, IonSkeletonText, toastController, IonCard, IonRippleEffect, IonImg } from "@ionic/vue";
import FilterCountry from "@/components/common/FilterCountry";
import {mapActions, mapGetters} from "vuex";
import NoData from "@/components/common/NoData";

export default {
    name: "CountryableSelect",
    components: {
        NoData,
        FilterCountry, IonButton, IonIcon, IonModal, IonSkeletonText, IonCard, IonRippleEffect, IonImg },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        value: {
            type: Array,
            default() {
                return []
            }
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        classBox: {
            type: [String, Array]
        },
        placeholder: {
            type: String,
            default: ''
        },
        errorText: {
            type: String,
            default: ''
        },
        choiceMax: {
            type: Number,
            default: null
        },
        choiceCountryMax: {
            type: Number,
            default: null
        },
        mainTitle: {
            type: String,
            default: ''
        },
        search: {
            type: Boolean,
            default: false
        },
        isLoadData: {
            type: Boolean,
            default: false
        },
        property: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            selected: [],
            searchInput: '',
            dataList: [],
            searchInputCountry: '',
            dataListCountry: [],
            showCountry: false,
            show: false,
            selectedItem: null,
            countrySelected: [],
        }
    },
    computed: {
        ...mapGetters({
            countries: 'reference/GET_COUNTRIES',
            isLoadDataCountry: 'common/GET_IS_LOAD_DATA',
            registerModel: 'auth/GET_MODEL',
            user: 'user/GET_USER',
        }),
        getLastText() {
            const elementId = this.value[this.value.length - 1];
            if (elementId) {
                return this.getText(elementId);
            }
            return  null;
        },
        items() {
            return this.dataList.length || this.searchInput !== '' ? this.dataList : this.list;
        },
        itemsCountry() {
            return this.dataListCountry.length || this.searchInputCountry !== '' ? this.dataListCountry : this.countries;
        }
    },
    watch: {
        selected: {
            deep: true,
            handler() {
                this.$emit('update:value', this.selected);
            }
        },
        value: {
            deep: true,
            handler(val) {
                this.selected = val;
            }
        },
        searchInput(val) {
            if (val) {
                const foundItems = this.list.filter((item) => (item.text ?? item.name).toLowerCase().includes(val.toLowerCase()));

                if (foundItems.length) {
                    this.dataList = foundItems;
                } else {
                    this.dataList = [];
                }
            } else {
                this.dataList = JSON.parse(JSON.stringify(this.list));
            }
        },
        searchInputCountry(val) {
            if (val) {
                const foundItems = this.countries.filter((item) => (item.text ?? item.name).toLowerCase().includes(val.toLowerCase()));

                if (foundItems.length) {
                    this.dataListCountry = foundItems;
                } else {
                    this.dataListCountry = [];
                }
            } else {
                this.dataListCountry = JSON.parse(JSON.stringify(this.countries));
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchCountries: 'reference/fetchCountries'
        }),
        getFlag(id) {
            const method = this.countries.find((item) => item.id === id);
            return method?.code
        },
        init() {
            this.dataList = JSON.parse(JSON.stringify(this.list));
            this.dataListCountry = JSON.parse(JSON.stringify(this.countries));

            if (!this.countries.length) {
                this.fetchCountries();
            }

            if (this.registerModel[this.property + 's'] && this.registerModel[this.property + 's'].length) {
                this.selected = JSON.parse(JSON.stringify(this.registerModel[this.property + 's']));
            }
        },
        handleModal() {
            this.show = !this.show;
        },
        setElement(id) {
            const elementId = this.selected.find((item) => item[this.property + '_id'] === id);

            if (elementId) {
                const index = this.selected.findIndex((item) => {
                    return item[this.property + '_id'] === id;
                });
                this.selected.splice(index, 1);
            } else {
                if (this.selected.length < this.choiceMax) {
                    let country_ids = [];

                    if (this.property === 'interest') {
                        country_ids = Object.keys(this.registerModel).length
                            ? this.registerModel?.wish_country_ids
                            : this.user.wish_countries.map((item) => item.id);

                    } else {
                        country_ids = Object.keys(this.registerModel).length
                            ? [this.registerModel?.country_id]
                            : [this.user.profile.country.id]
                    }

                    this.selected.push({
                        [this.property + '_id']: id,
                        country_ids
                    });
                } else {
                    this.openToastDefault();
                }
            }
        },
        getText(item) {
            const method = this.list.find((listItem) => listItem.id === item[this.property + '_id'] ?? item);
            return method?.text ?? method?.name
        },
        deleteElement(id) {
            const index = this.selected.findIndex((item) => {
                return item[this.property + '_id'] === id;
            });
            this.selected.splice(index, 1);
        },
        itemCountryId(value) {
            return this.choiceCountryMax ? value : value.slice(0,5);
        },
        async openToastDefault() {
            const toast = await toastController
                .create({
                    message: this.$t('notifications.select_more_1') + this.choiceMax + this.$t('notifications.select_more_2'),
                    duration: 3000,
                    position: 'top',
                    cssClass: 'default overlay-hide',
                    buttons: [
                        {
                            role: 'cancel',
                            handler: () => {
                                toast.onDidDismiss()
                            }
                        }
                    ]
                })
            return toast.present();
        },
        handleShowCountry(id) {
            this.showCountry = true;
            this.selectedItem = id;
            const foundItemCountries = this.value.find((item) => item[this.property + '_id'] === this.selectedItem).country_ids ?? [];
            this.countrySelected = JSON.parse(JSON.stringify(foundItemCountries));
        },
        handleApplyCountry() {
            this.showCountry = false;
            this.value.find((item) => item[this.property + '_id'] === this.selectedItem).country_ids = this.countrySelected;
        }
    }
}
</script>
