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

        <div class="multi-select-box" v-if="!isLoadData">
            <ion-button class="btn" color="primary" expand="block"
                v-for="item in value"
                :key="item"
                @click="setValueElement(item)"
            >
                {{ getText(item) }}
                <ion-icon :icon="require('@/assets/icons/close-icon.svg')"/>
            </ion-button>
        </div>

        <ion-modal
            :is-open="show"
            :showBackdrop="false"
            @didDismiss="show = false"
        >
            <default-layout
                :page-class="'typical--fix-btn'"
                :content-id="'multi-select'"
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

                <div style="margin-bottom: 32px"
                    class="select-list"
                    v-if="selectedItems.length && list.length"
                >
                    <span class="select-list__title">{{ $t('selected_items') }}</span>
                    <ion-card class="select-list__item active ion-activatable ripple-parent" style="pointer-events: auto"
                        v-for="item in selectedItems"
                        :key="item"
                        @click="setElement(item.id)"
                    >
                        <ion-img class="select-list__flag" :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
                        {{ item.text ?? item.name }}
                        <ion-icon class="close" :icon="require('@/assets/icons/close-icon--wrap.svg')"/>
                        <ion-ripple-effect />
                    </ion-card>
                </div>

                <div class="filter__box"
                    v-if="isLoadData"
                >
                    <span class="select-list__title">{{ $t('all_items') }}</span>
                    <div class="select-list__item"
                        v-for="item in 6"
                        :key="item"
                    >
                        <ion-skeleton-text animated style="line-height: 26px;" />
                    </div>
                </div>
                <div
                    class="select-list multi-select"
                    v-else
                >
                    <template v-if="items.length">
                        <span class="select-list__title">{{ $t('all_items') }}</span>
                        <ion-card
                            class="select-list__item ion-activatable ripple-parent"
                            v-for="item in items"
                            :key="item.id"
                            @click="setElement(item.id)"
                            :class="{active: selected.indexOf(item.id) !== -1}"
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
    </div>
</template>

<script>
import { IonButton, IonIcon, IonModal, IonSkeletonText, toastController, IonCard, IonRippleEffect, IonImg } from "@ionic/vue";
import {mapActions, mapGetters} from "vuex";
import NoData from "@/components/common/NoData";

export default {
    name: "MultiSelectItem",
    components: {
        NoData, IonButton, IonIcon, IonModal, IonSkeletonText, IonCard, IonRippleEffect, IonImg },
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
        }
    },
    data() {
        return {
            selected: [],
            searchInput: '',
            dataList: [],
            showCountry: false,
            show: false,
            countrySelected: []
        }
    },
    computed: {
        ...mapGetters({
            countries: 'reference/GET_COUNTRIES',
            isLoadDataCountry: 'common/GET_IS_LOAD_DATA'
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
        selectedItems() {
            return this.items.filter((item) => this.selected.includes(item.id));
        }
    },
    watch: {
        value: {
            deep: true,
            handler(val) {
                this.selected = JSON.parse(JSON.stringify(val));
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
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchCountries: 'reference/fetchCountries'
        }),
        init() {
            this.dataList = JSON.parse(JSON.stringify(this.list));
            if (!this.countries.length) {
                this.fetchCountries();
            }
        },
        handleModal() {
            this.show = !this.show;
            this.$emit('update:value', this.selected);
        },
        setElement(id) {
            const elementId = this.selected.find((item) => item === id);

            if (elementId) {
                const index = this.selected.indexOf(id);
                this.selected.splice(index, 1);
            } else {
                if (this.choiceMax) {
                    if (this.selected.length < this.choiceMax) {
                        this.selected.push(id);
                    } else {
                        this.openToastDefault();
                    }
                } else {
                    this.selected.push(id);
                }
            }
        },
        setValueElement(id) {
            const elementId = this.value.find((item) => item === id);
            const tempArr = this.value;

            if (elementId) {
                const index = this.value.indexOf(id);
                tempArr.splice(index, 1);
                this.$emit('update:value', tempArr);
            } else {
                if (this.choiceMax) {
                    if (this.value.length < this.choiceMax) {
                        tempArr.push(id);
                        this.$emit('update:value', tempArr);
                    } else {
                        this.openToastDefault();
                    }
                } else {
                    tempArr.push(id);
                    this.$emit('update:value', tempArr);
                }
            }
        },
        getText(id) {
            const method = this.list.find((item) => item.id === id);
            return method?.text ?? method?.name ?? null;
        },
        deleteElement(id) {
            const index = this.selected.indexOf(id);
            this.selected.splice(index, 1);
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
        }
    }
}
</script>
