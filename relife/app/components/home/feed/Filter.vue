<template>
    <ion-modal
        :is-open="show"
        :showBackdrop="false"
        @didDismiss="$emit('update:show', false)"
    >
        <default-layout
            :content-id="'feed-filter'"
            :page-class="'typical--fix-btn'"
            :page-title="$t('title.rubric_filter')"
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
                    @click="$emit('update:show', !this.show)"
                >
                    <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
                </ion-button>
            </template>

            <div style="margin-top: 22px" class="filter">
                <div class="filter__box" style="margin-bottom: 24px"
                    v-if="selected.length"
                >
                    <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('selected_items') }}</span>
                    <label class="checked ion-activatable ripple-parent"
                        v-for="item in selectedList"
                        :key="item.id"
                    >
                        <input type="checkbox"
                            v-model="selected"
                            :value="item.id"
                        >
                        <span class="checked__square">
                            <ion-icon :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                        </span>
                        <span class="checked__text">{{ item.name }}</span>
                        <ion-ripple-effect />
                    </label>
                </div>

                <div class="filter__box"
                    v-if="isLoadData"
                >
                    <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('all_items') }}</span>
                    <div class="checked"
                        v-for="item in 6"
                        :key="item"
                    >
                        <ion-skeleton-text animated style="line-height: 26px;" />
                    </div>
                </div>
                <div class="filter__box"
                    v-else
                >
                    <template v-if="items.length">
                        <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('all_items') }}</span>
                        <label class="checked ion-activatable ripple-parent"
                            v-for="item in items"
                            :key="item.id"
                        >
                            <input type="checkbox"
                                v-model="selected"
                                :value="item.id"
                            >
                            <span class="checked__square">
                                <ion-icon :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                            </span>
                            <span class="checked__text">{{ item.name }}</span>
                            <ion-ripple-effect />
                        </label>
                    </template>
                    <template v-else>
                        <no-data
                            :title="'search_not_found'"
                        />
                    </template>
                </div>
            </div>

            <div class="fix-bottom">
                <ion-button class="btn" color="primary" size="large" expand="block"
                    @click="handleFilter"
                >{{ $t('apply') }}</ion-button>
            </div>
        </default-layout>
    </ion-modal>
</template>

<script>
import { IonButton, IonModal, IonIcon, IonRippleEffect, IonSkeletonText } from "@ionic/vue";
import { mapActions, mapGetters } from 'vuex'
import NoData from "@/components/common/NoData";

export default {
    name: "FeedFilter",
    components: {IonButton, IonModal, IonIcon, IonRippleEffect, IonSkeletonText, NoData },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        selectedCategories: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            searchInput: '',
            selected: [],
            dataList: []
        }
    },
    computed: {
        ...mapGetters({
            categories: 'reference/GET_CATEGORIES',
            isLoadData: 'common/GET_IS_LOAD_DATA'
        }),
        items() {
            return this.dataList.length || this.searchInput !== '' ? this.dataList : this.categories;
        },
        selectedList() {
            return this.items.filter((item) => this.selected.includes(item.id))
        },
    },
    watch: {
        selectedCategories: {
            deep: true,
            handler(val) {
                this.selected = JSON.parse(JSON.stringify(val));
            }
        },
        show(val) {
            this.selected = JSON.parse(JSON.stringify(this.selectedCategories));

            if (!this.categories.length && val) {
                this.fetchCategories()
            }
        },
        searchInput(val) {
            if (val) {
                const foundItems = this.categories.filter((item) => (item.text ?? item.name).toLowerCase().includes(val.toLowerCase()));

                if (foundItems.length) {
                    this.dataList = foundItems;
                } else {
                    this.dataList = [];
                }
            } else {
                this.dataList = JSON.parse(JSON.stringify(this.categories));
            }
        }
    },
    mounted() {
        this.dataList = JSON.parse(JSON.stringify(this.categories));
    },
    methods: {
        ...mapActions({
            fetchCategories: 'reference/fetchCategories',
            fetchPosts: 'feed/fetchPosts',
        }),
        handleFilter() {
            this.$emit('update:show', !this.show);
            this.$emit('update:selectedCategories', this.selected);
        },
    }
}
</script>
