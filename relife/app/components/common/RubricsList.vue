<template>
    <div class="rubric-cont">
        <template v-if="categories === null || isLoadData">
            <div class="rubric-box"
                v-for="item in 5"
                :key="item"
            >
                <div class="rubric-box__group">
                    <span class="rubric-box__title">
                        <ion-skeleton-text animated style="line-height: 24px;width: 72%" />
                    </span>
                    <ion-skeleton-text animated style="line-height: 24px;width: 90px;--border-radius: 6px;" />
                </div>
            </div>
        </template>

        <template v-else>
            <template v-if="categories && categories.length">
                <div class="rubric-box ion-activatable ripple-parent"
                    v-for="item in categories"
                    :key="item.id"
                >
                    <div class="rubric-box__group">
                        <ion-img class="rubric-box__img" :src="require('@/assets/icons/categories/' + item.slug + '.svg')"/>
                        <span class="rubric-box__title">{{ item.name }}</span>
                        <ion-button class="btn button-mini" color="primary" expand="block"
                            :class="{following: behavior === 'following' && item.is_current_user_subscribed}"
                            :disabled="isLoading"
                            @click="setAction(item)"
                        >
                            {{ getText(item) }}
                        </ion-button>
                    </div>
                    <div class="rubric-box__link"
                        @click="$router.push({ name: 'article-category-page', params: { id: item.id } })"
                    />
                    <ion-ripple-effect />
                </div>
            </template>

            <template v-else>
                <no-data
                    :title="noDataTitle"
                    :btn-show="noDataBtn"
                    :btn-text="noDataBtnText"
                    :btn-router="noDataBtnLink"
                />
            </template>
        </template>
        <template v-if="isLoadMore && categories !== null">
            <ion-infinite-scroll
                @ionInfinite="onIonInfinite"
                :disabled="isLastPage"
            >
                <ion-infinite-scroll-content>
                    <loader-item :stroke-width="5" />
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </div>
</template>

<script>
import {
    IonButton,
    IonRippleEffect,
    IonSkeletonText,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/vue";
import NoData from "@/components/common/NoData";
import { mapActions, mapGetters } from "vuex";
import LoaderItem from "@/components/common/Loader";

export default {
    name: "RubricsList",
    components: {
        NoData,
        IonButton,
        IonRippleEffect,
        IonSkeletonText,
        IonImg,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        LoaderItem
    },
    props: {
        behavior: {
            required: true,
            type: String,
            default: ''
        },
        isLoadMore: {
            type: Boolean,
            default: false
        },
        maxCount: {
            type: Number,
        },
        noDataTitle: {
            type: String,
            default: ''
        },
        noDataBtn: {
            type: Boolean,
            default: false
        },
        noDataBtnText: {
            type: String,
            default: ''
        },
        noDataBtnLink: {
            type: String,
            default: ''
        },
        showBtnDelete: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            categoryItems: 'category/GET_CATEGORIES_ITEMS',
            isLoadData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            isLoading: 'common/GET_LOADER_MINI',
            isLastPage: 'category/GET_IS_LAST_PAGE',
            currentPage: 'category/GET_CATEGORIES_PAGE'
        }),
        categories() {
            if (this.maxCount && this.categoryItems) {
                return this.categoryItems.slice(0, this.maxCount);
            }
            return this.categoryItems;
        }
    },
    methods: {
        ...mapActions({
            followCategory: 'user/followCategory',
            getCategories: 'category/getCategories',
            disabledAction: 'category/disabledAction',
            fetchProfile: 'user/getProfile',
        }),
        getText(category) {
            switch (this.behavior) {
                case 'following':
                    return category.is_current_user_subscribed ? this.$t('unfollow') : this.$t('follow');
                case 'blocked':
                    return this.$t('unblock');
            }
        },
        setAction(category) {
            switch (this.behavior) {
                case 'following':
                    this.subscribe(category);
                    break;
                case 'blocked':
                    this.unblock(category);
                    break;
            }
        },
        subscribe(category) {
            this.$store.commit('common/SET_LOADER_MINI', true);

            this.followCategory({
                category_id: category.id
            })
                .then(() => {
                    this.getCategories();
                    this.fetchProfile();
                })
                .finally(() => {
                    this.$store.commit('common/SET_LOADER_MINI', false);
                })
        },
        unblock(category) {
            this.$store.commit('common/SET_LOADER_MINI', true);

            this.disabledAction({
                category_id: category.id
            })
                .then(() => {
                    this.getCategories();
                })
                .finally(() => {
                    this.$store.commit('common/SET_LOADER_MINI', false);
                })
        },
        onIonInfinite(event) {
            this.$store.commit('category/SET_CATEGORIES_PARAMS', {
                page: this.currentPage + 1,
            })

            this.getCategories();
            event.target.complete()
        },
    }
}
</script>
