<template>
    <div class="filter-country">
        <div style="margin-bottom: 32px"
            class="select-list"
            v-if="selected.length && list.length && !selected.includes(0)"
        >
            <span class="select-list__title">{{ $t('title.selected_countries') }}</span>
            <ion-card class="select-list__item active ion-activatable ripple-parent" style="pointer-events: auto"
                v-for="item in selectCountries"
                :key="item.id"
                @click="deleteElement(item.id)"
            >
                <ion-img class="select-list__flag" :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
                {{ item.name }}
                <ion-icon class="close" :icon="require('@/assets/icons/close-icon--wrap.svg')"/>
                <ion-ripple-effect />
            </ion-card>
        </div>

        <div
            class="select-list"
            v-if="isLoad"
        >
            <span class="select-list__title">{{ $t('title.all_countries') }}</span>
            <div
                class="select-list__item"
                v-for="(item, index) in 6"
                :key="index"
            >
                <ion-skeleton-text animated style="width: 100%;line-height: 26px;" />
            </div>
        </div>
        <div
            class="select-list multi-select"
            v-else
        >
            <template v-if="list.length">
                <span class="select-list__title">{{ $t('title.all_countries') }}</span>
                <ion-card
                    class="select-list__item ion-activatable ripple-parent"
                    v-for="item in list"
                    :key="item.id"
                    @click="setElement(item.id)"
                    :class="{active: choice.indexOf(item.id) !== -1}"
                >
                    <ion-img class="select-list__flag" :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
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
    </div>
</template>

<script>
import { IonCard, IonIcon, IonImg, IonRippleEffect, IonSkeletonText, toastController} from "@ionic/vue";
import NoData from "@/components/common/NoData";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "FilterCountryV2",
    components: {NoData, IonIcon, IonImg, IonCard, IonRippleEffect, IonSkeletonText },
    props: {
        search: {
            type: String,
            default: ''
        },
        selectedMax: {
            type: Number,
            default: null
        },
        minDelete: {
            type: Boolean,
            default: true
        },
        selected: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            isLoad: false,
            choice: []
        }
    },
    async mounted() {
        this.choice = this.selected;

        if (!this.countries.length) {
            this.isLoad = true;

            await this.fetchCountries();

            this.isLoad = false;
        }
    },
    computed: {
        ...mapGetters({
            countries: 'reference/GET_COUNTRIES',
        }),
        list() {
            const countries = this.countries;

            if (this.search) {
                return countries.filter((item) => item.name.toLocaleLowerCase()
                    .indexOf(this.search.toLocaleLowerCase()) !== -1
                )
            }

            return countries;
        },
        selectCountries() {
            return this.countries.filter((item) => this.choice.includes(item.id))
        }
    },
    methods: {
        ...mapActions({
            fetchCountries: 'reference/fetchCountries',
        }),
        setElement(id) {
            if (this.choice.includes(0)) {
                this.choice = [];
            }
            const elementId = this.choice.find((item) => item === id);

            if (elementId) {
                const index = this.choice.indexOf(id);
                this.choice.splice(index, 1);
            } else {
                if (this.choice.length < this.selectedMax) {
                    this.choice.push(id);
                } else {
                    this.openToastMax();
                }
            }
            this.$emit('update:selected', this.choice);
        },
        deleteElement(id) {
            if (this.choice.includes(0)) {
                this.choice = [];
            }
            if (this.minDelete) {
                if (this.choice.length > 1) {
                    const index = this.choice.indexOf(id);
                    this.choice.splice(index, 1);
                } else {
                    this.openToastMin();
                }
            } else {
                const index = this.choice.indexOf(id);
                this.choice.splice(index, 1);
            }
            this.$emit('update:selected', this.choice);
        },
        async openToastMax() {
            const toast = await toastController
                .create({
                    message: this.$t('notifications.select_more_1') + this.selectedMax + this.$t('notifications.select_more_2'),
                    duration: 2000,
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
        async openToastMin() {
            const toast = await toastController
                .create({
                    message: this.$t('notifications.country_selected'),
                    duration: 2000,
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
