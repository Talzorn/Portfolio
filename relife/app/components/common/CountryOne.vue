<template>
    <div class="country-one">
        <template v-if="isLoadData">
            <div class="country__box large" style="border: unset;background-color: transparent;opacity: 1;box-shadow: unset;">
                <ion-skeleton-text animated />
            </div>
            <ion-skeleton-text animated style="width: 20px;min-width: 20px;height: 20px;--border-radius: 6px;margin: 10px 0 10px -10px;" />
        </template>
        <template v-else>
            <template v-if="selected">
                <div class="country__box large"
                    @click="show = true"
                >
                    <ion-img :src="require('@/assets/icons/flags/' + getFlag() + '.jpg')" />
                </div>
                <ion-button class="btn btn--head btn--icon btn--plus" color="secondary" style="margin: 10px 0 10px -10px"
                    @click="show = true"
                >
                    <ion-icon :icon="require('@/assets/icons/plus-icon.svg')"/>
                </ion-button>
            </template>
            <template v-else>
                <div class="country__box large" style="align-items: center;justify-content: center;opacity: 1;border: unset">
                    <ion-icon :icon="require('@/assets/icons/flag-icon.svg')" style="font-size: 24px"/>
                </div>
                <ion-button class="btn btn--head btn--icon btn--plus" color="secondary" style="margin: 10px 0 10px -10px">
                    <ion-icon :icon="require('@/assets/icons/plus-icon.svg')"/>
                </ion-button>
            </template>
        </template>

        <ion-modal
            :is-open="show"
            :showBackdrop="false"
            @didDismiss="show = false"
        >
            <default-layout
                :content-id="'country-one-content'"
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
                    <ion-button class="btn btn--head btn--icon" color="secondary" slot="start" @click="show = false">
                        <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
                    </ion-button>
                </template>

                <ul
                    class="select-list"
                    v-if="isLoadData"
                >
                    <li
                        class="select-list__item"
                        v-for="(item, index) in 9"
                        :key="index"
                    >
                        <ion-skeleton-text animated style="line-height: 26px;" />
                    </li>
                </ul>

                <template v-else>
                    <div
                        class="select-list"
                        v-if="items.length"
                    >
                        <ion-card
                            class="select-list__item ion-activatable ripple-parent"
                            v-for="item in items"
                            :key="item.id"
                            @click="setElement(item.id)"
                            :class="{active: selected === item.id}"
                        >
                            <ion-img class="select-list__flag" :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
                            {{ item.text ?? item.name }}
                            <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                            <ion-ripple-effect />
                        </ion-card>
                    </div>
                    <template v-else>
                        <no-data
                            :title="'search_not_found'"
                        />
                    </template>
                </template>
            </default-layout>
        </ion-modal>
    </div>
</template>

<script>
import { IonImg, IonButton, IonIcon, IonModal, IonSkeletonText, IonRippleEffect, IonCard } from "@ionic/vue";
import { mapGetters } from 'vuex'
import NoData from "@/components/common/NoData";

export default {
    name: "CountryOne",
    components: {NoData, IonImg, IonButton, IonIcon, IonModal, IonSkeletonText, IonRippleEffect, IonCard },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            show: false,
            searchInput: '',
            dataList: []
        }
    },
    computed: {
        ...mapGetters({
            isLoadData: 'common/GET_IS_LOAD_DATA'
        }),
        items() {
            return this.dataList.length || this.searchInput !== '' ? this.dataList : this.list;
        }
    },
    watch: {
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
        this.dataList = JSON.parse(JSON.stringify(this.list));
    },
    methods: {
        getFlag() {
            const method = this.list.find((item) => item.id === this.selected);
            return method?.code
        },
        setElement(value) {
            this.$emit('update:selected', value);
            this.show = false;
        }
    }
}
</script>
