<template>
    <div
        class="form__input form__select"
        :class="classBox"
        @click="handleModal"
    >
        <input
            :value="getText"
            :placeholder="placeholder"
            readonly
        />
        <ion-icon class="down-icon" :icon="require('@/assets/icons/down-arrow-icon.svg')"/>
        <span class="text--error"
            v-if="errorText.length"
        >{{ errorText }}</span>

        <ion-modal
            :is-open="show"
            :showBackdrop="false"
            @didDismiss="show = false"
        >
            <default-layout
                :content-id="'select-item'"
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
                    <ion-button class="btn btn--head btn--icon" color="secondary" slot="start" @click="handleModal">
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
                    class="select-list"
                    v-else
                >
                    <template v-if="items.length">
                        <ion-card
                            class="select-list__item ion-activatable ripple-parent"
                            v-for="item in items"
                            :key="item.id"
                            @click="setElement(item.id)"
                            :class="{active: value === item.id}"
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
            </default-layout>
        </ion-modal>
    </div>
</template>

<script>
import { IonButton, IonIcon, IonModal, IonSkeletonText, IonCard, IonRippleEffect, IonImg } from "@ionic/vue";
import NoData from "@/components/common/NoData";

export default {
    name: "SelectItem",
    components: {NoData, IonButton, IonIcon, IonModal, IonSkeletonText, IonCard, IonRippleEffect, IonImg },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        value: {
            type: [Number, String, Array, Object]
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        classBox: {
            type: [String, Array],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        errorText: {
            type: String,
            default: ''
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
            show: false,
            searchInput: '',
            dataList: []
        }
    },
    computed: {
        getText() {
            const method = this.list.find((item) => item.id === this.value);
            return this.value ? method?.text ?? method?.name : null;
        },
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
        handleModal() {
            this.show = !this.show;
        },
        setElement(value) {
            this.$emit('update:value', value);
            this.show = false
        },
    }
}
</script>
