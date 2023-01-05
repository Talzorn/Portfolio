<template>
    <div class="feed__grid">
        <template v-if="!posts || (isLoadData && (postParams.page === 1 || postParams.search))">
            <div class="article-block"
                v-for="item in 2"
                :key="item"
            >
                <ion-skeleton-text animated style="height: 24px;margin-bottom: 10px;" />
                <ion-skeleton-text animated style="height: 148px;margin-bottom: 12px;" />
                <ion-skeleton-text animated style="height: 20px;margin-bottom: 6px;" />
                <ion-skeleton-text animated style="height: 54px;margin-bottom: 10px;" />
                <ion-skeleton-text animated style="height: 20px;margin-bottom: 10px;" />
            </div>
        </template>

        <template v-else>
            <template v-if="posts && posts.data.length">
                <ion-card class="article-block ion-activatable ripple-parent"
                    v-for="item in posts.data"
                    :key="item.id"
                >
                    <div class="article-block__top">
                        <div
                            @click="toProfile(item.author.id)"
                            class="article-block__human test">
                            <ion-button class="btn--no-style" fill="clear">
                                <div class="article-block__avatar">
                                    <ion-img v-if="item.author.profile.avatar" :src="item.author.profile.avatar"/>
                                    <ion-icon v-else :icon="require('@/assets/icons/avatar-icon.svg')"/>
                                </div>
                                <span class="article-block__name">{{ item.author.profile.nickname }}</span>
                            </ion-button>
                        </div>
                        <span class="article-block__date">{{ formatDate(item.created_at) }}</span>
                        <ion-button class="dots-more btn--no-style" fill="clear"
                            v-if="btnMenu"
                            @click="handleDots(item)"
                        >
                            <ion-icon :icon="require('@/assets/icons/more-icon.svg')"/>
                        </ion-button>
                    </div>
                    <div class="article-block__middle">
                        <ion-img class="article-block__img" :src="item.image"/>
                        <span class="article-block__title">{{ item.title }}</span>
                        <span class="article-block__description">{{ item.brief_description }}</span>
                    </div>
                    <div class="article-block__bottom">
                        <div class="article-block__category"
                            v-if="item.categories.length"
                        >
                            <div class="article-block__category-wrap">
                                <ion-button class="btn button-mini" color="secondary" expand="block"
                                    @click="handleCategoriesEvent(item)"
                                >
                                    <span>{{ item.categories[0].name }}</span>
                                </ion-button>
                                <ion-button class="btn button-mini article-block__category-number" color="secondary" expand="block"
                                    v-if="item.categories.length > 1"
                                    @click="handleCategoriesEvent(item)"
                                >
                                    <span>+{{ item.categories.length - 1}}</span>
                                </ion-button>
                            </div>
                        </div>
                        <template v-if="item.moderated_at">
                            <ion-button @click="toComments(item.id)" class="btn--no-style article-icon" fill="clear">
                                <ion-icon :icon="require('@/assets/icons/chat-icon.svg')"/>
                                {{ item.comments_count }}
                            </ion-button>
                            <ion-button class="btn--no-style article-icon" fill="clear" style="opacity: 1"
                                @click="handleFavoritePost(item)"
                                :class="{active: item.favorite}"
                            >
                                <ion-icon :icon="require('@/assets/icons/bookmark-icon.svg')" style="margin-right: 0"/>
                            </ion-button>
                            <div class="evaluation"
                                :class="{up: item.rating > 0, down: item.rating < 0}"
                            >
                                <ion-button class="evaluation__btn btn--no-style" fill="clear" style="opacity: 1"
                                    @click="handleRatePost(item, item.my_rating === -1 ? 0 : -1)"
                                    :style="{color: item.my_rating < 0 ? 'var(--ion-color-danger)' : ''}"
                                >
                                    <ion-icon :icon="require('@/assets/icons/down-arrow-icon.svg')"/>
                                </ion-button>
                                <span class="evaluation__number">{{ Math.abs(item.rating) }}</span>
                                <ion-button class="evaluation__btn btn--no-style" fill="clear" style="opacity: 1"
                                    @click="handleRatePost(item, item.my_rating === 1 ? 0 : 1)"
                                    :style="{color: item.my_rating > 0 ? 'var(--ion-color-success)' : ''}"
                                >
                                    <ion-icon :icon="require('@/assets/icons/down-arrow-icon.svg')" style="transform: scale(1,-1)"/>
                                </ion-button>
                            </div>
                        </template>
                        <template v-else>
                            <span class="text--small" style="color: var(--ion-color-danger);font-weight: 500;display: flex;align-items: center">
                                {{ $t('in_moderation') }}
                                <ion-icon :icon="require('@/assets/icons/info-circle-icon.svg')" style="font-size: 18px;margin-left: 4px"/>
                            </span>
                        </template>
                    </div>
                    <div class="article-block__link"
                        @click="setRouteBack(item.id)"
                    />
                    <ion-ripple-effect />
                </ion-card>
            </template>

            <template v-else>
                <div class="no-data">
                    <span>{{ $t(noDataTitle) }}</span>
                    <ion-button class="btn" size="small" color="primary" expand="block"
                        v-if="noDataBtn"
                        @click="routerCreateArticle"
                    >
                        {{ $t(noDataBtnText) }}
                    </ion-button>
                </div>
            </template>
        </template>

        <ion-modal
            class="modal-sheet modal-sheet--list"
            :style="{'--height': selectedPost?.categories?.length ? heightSheetArticle : '170px'}"
            :is-open="sheet"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]"
            @did-dismiss="sheet = false"
        >
            <ion-content class="wrapper-sheet" :fullscreen="true">
                <div class="select-list">
                    <template v-if="userType === 2 && selectedPost.categories.length">
                        <ion-accordion-group v-if="selectedPost.categories.length >= 2">
                            <ion-accordion value="first">
                                <ion-card class="select-list__item ion-activatable ripple-parent"
                                    slot="header"
                                >
                                    <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/hide-icon.svg')"/>
                                    {{ $t('dont_show_rubric') }}
                                    <div class="select-list__icon--arrow">
                                        <ion-icon :icon="require('@/assets/icons/up-arrow-icon.svg')"/>
                                    </div>
                                    <ion-ripple-effect />
                                </ion-card>
                                <div slot="content">
                                    <ion-card class="select-list__item ion-activatable ripple-parent"
                                        v-for="item in selectedPost.categories"
                                        :key="item"
                                        @click="handleDisableCategory(item.id)"
                                    >
                                        <span style="padding-left: 34px">{{ item.name }}</span>
                                        <ion-ripple-effect />
                                    </ion-card>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                        <ion-card class="select-list__item ion-activatable ripple-parent"
                            v-else
                            @click="handleDisableCategory(selectedPost.categories[0].id)"
                        >
                            <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/hide-icon.svg')"/>
                            {{ $t('dont_show_rubric') }}
                            <ion-ripple-effect />
                        </ion-card>
                    </template>
                    <ion-card class="select-list__item ion-activatable ripple-parent"
                        v-if="userType === 1 && btnEdit"
                        @click="toEditPost"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/edit-icon.svg')" style="font-size: 18px;"/>
                        {{ $t('edit') }}
                        <ion-ripple-effect />
                    </ion-card>
                    <ion-card
                        v-if="userType === 1"
                        :disabled="isLoading"
                        class="select-list__item ion-activatable ripple-parent"
                        @click="handleDeletePost"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/delete-icon.svg')" style="font-size: 22px;"/>
                        {{ $t('delete') }}
                        <ion-ripple-effect />
                    </ion-card>
                    <ion-card class="select-list__item ion-activatable ripple-parent"
                        v-if="userType === 2"
                        @click="handleDisableUser"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/hide-icon.svg')"/>
                        {{ $t('do_not_show_user') }}
                        <ion-ripple-effect />
                    </ion-card>
                    <ion-card class="select-list__item ion-activatable ripple-parent"
                        v-if="userType === 2"
                        @click="openReportModal()"
                    >
                        <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/report-icon--wrap.svg')"/>
                        {{ $t('report') }}
                        <ion-ripple-effect />
                    </ion-card>
                </div>
            </ion-content>
        </ion-modal>

        <ion-modal
            class="modal-sheet modal-sheet--list modal-sheet--categories"
            :is-open="sheetCategories"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]"
            @did-dismiss="sheetCategories = false"
        >
            <ion-content class="wrapper-sheet" :fullscreen="true">
                <div v-for="item in selectedCategories" :key="item.id" class="select-list">
                    <ion-card class="select-list__item ion-activatable ripple-parent">
                        <span style="padding-right: 10px">{{ item.name }}</span>
                        <ion-button class="btn button-mini" color="primary" expand="block"
                            :class="{following: item.following}"
                            @click="handleFollowCategory(item)"
                        >{{ $t(followCatText) }}</ion-button>
                        <div class="select-list__link"
                            @click="toCategory(item.id)"
                        />
                        <ion-ripple-effect />
                    </ion-card>
                </div>
            </ion-content>
        </ion-modal>

        <ion-infinite-scroll
            @ionInfinite="onIonInfinite"
            :disabled="isDisableInfiniteScroll"
        >
            <ion-infinite-scroll-content>
                <loader-item :stroke-width="5" />
            </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </div>
</template>

<script>
import {
    alertController,
    IonButton,
    IonCard,
    IonIcon,
    IonImg,
    IonRippleEffect,
    IonSkeletonText,
    IonAccordion,
    IonAccordionGroup,
    IonModal,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/vue";
import { formatDate } from '@/helpers/date';
import { mapActions, mapGetters } from 'vuex'
import LoaderItem from "@/components/common/Loader";
import { SORT_TYPE_DATE, SORT_TYPE_POPULAR } from '@/common/const';
import { ALL_COUNTRIES } from '../../common/const'

export default {
    name: "ArticleList",
    components: {
        IonImg,
        IonRippleEffect,
        IonSkeletonText,
        IonCard,
        IonButton,
        IonIcon,
        IonAccordion,
        IonAccordionGroup,
        IonModal,
        IonContent,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        LoaderItem,
    },
    props: {
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
        sheetHeight: {
            type: String,
            default: null
        },
        btnEdit: {
            type: Boolean,
            default: true
        },
        btnMenu: {
            type: Boolean,
            default: true
        },
        selectedTab: {
            type: Number,
            default: 1
        },
    },
    data() {
        return {
            sheet: false,
            sheetCategories: false,
            selectedCategories: [],
            followingCat: false,
            selectedPost: null,
            isLoading: false,
            isInfiniteLoad: false,
        }
    },
    computed: {
        ...mapGetters({
            posts: 'feed/GET_POSTS',
            postParams: 'feed/GET_POSTS_PARAMS',
            user: 'user/GET_USER',
            isLoadData: 'common/GET_IS_LOAD_GLOBAL_DATA',
            countries: 'reference/GET_COUNTRIES',
            commonCountryFilters: 'user/GET_COMMON_COUNTRY_FILTERS',
        }),
        followCatText() {
            return this.followingCat ? 'following' : 'follow';
        },
        userType() {
            return this.selectedPost?.author?.id === this.user?.id ? 1 : 2;
        },
        isDisableInfiniteScroll() {
            return this.posts?.meta.current_page === this.posts?.meta.last_page
        },
        heightSheetArticle() {
            return this.sheetHeight !== null ? this.sheetHeight : this.userType === 1 ? '170px' : '216px';
        },
        newPopularCountryFilters() {
            const filters = this.commonCountryFilters[this.user.id] ?? [ALL_COUNTRIES];
            return filters.includes(ALL_COUNTRIES) ? null : this.commonCountryFilters[this.user.id];
        },
    },
    methods: {
        formatDate,
        ...mapActions({
            ratePost: 'feed/ratePost',
            setFavoritePost: 'feed/setFavoritePost',
            followCategory: 'user/followCategory',
            fetchPosts: 'feed/fetchPosts',
            deletePost: 'feed/deletePost',
            fetchProfile: 'user/getProfile',
            disableUser: 'user/disabledAction',
            disableCategory: 'category/disabledAction',
        }),
        toCategory(id) {
            this.sheetCategories = false;
            this.$router.push({ name: 'article-category-page', params: {
                id
            }});
        },
        handleCategoriesEvent(item) {
            if (item.categories.length > 1) {
                this.sheetCategories = true;
                this.selectedCategories = item.categories;
            } else {
                this.toCategory(item.categories[0].id);
            }
        },
        handleRatePost(item, value) {
            const currentPost = JSON.parse(JSON.stringify(item));
            item.rating += value !== 0 ? (value + item.my_rating) : value;
            item.my_rating = value;
            this.ratePost({
                id: item.id,
                data: {
                    rating: value
                }
            }).then((res) => {
                item.rating = res.data.rating;
                item.my_rating = res.data.my_rating;
            }).catch(() => {
                item.rating = currentPost.rating;
                item.my_rating = currentPost.my_rating;
            });
        },
        handleFavoritePost(item) {
            const currentPost = JSON.parse(JSON.stringify(item));
            item.favorite = !currentPost.favorite;
            this.setFavoritePost({
                post_id: item.id
            }).catch(() => {
                item.favorite = currentPost.favorite;
            })
        },
        toComments(id) {
            this.$router.push({name: 'article', params: { id }, hash: '#comment'});
        },
        handleFollowCategory(item) {
            const currentPost = JSON.parse(JSON.stringify(item));
            item.following = !currentPost.following
            this.followCategory({
                category_id: item.id
            }).then(() => {
                this.fetchProfile();
            }).catch(() => {
                item.following = currentPost.following
            });
        },
        handleDots(item) {
            this.sheet = true;
            this.selectedPost = item;
        },
        onIonInfinite(event) {
            if (!this.isLoadData) {
                this.$store.commit('feed/SET_PARAM_PAGE', 1);

                if ([SORT_TYPE_DATE, SORT_TYPE_POPULAR].includes(this.selectedTab)) {
                    this.$store.commit('feed/SET_PARAM_COUNTRIES', this.newPopularCountryFilters);
                    this.$store.commit('feed/SET_IGNORE_COUNTRIES', true);
                }

                this.fetchPosts();
                event.target.complete();
            }
        },
        toEditPost() {
            this.sheet = false;
            this.$router.push({ name: 'create-article', params: { postId: this.selectedPost.id } });
        },
        async handleDeletePost() {
            const alert = await alertController.create({
                header: this.$t('delete_post__title'),
                message: this.$t('delete_post__text'),
                cssClass: 'с-alert',
                buttons: [
                    {
                        text: this.$t('cancel'),
                        cssClass: 'с-alert__btn-confirm'
                    },
                    {
                        text: this.$t('delete'),
                        cssClass: 'с-alert__btn-cancel',
                        handler: () => {
                            this.isLoading = true;
                            this.deletePost(this.selectedPost.id).then(() => {
                                this.fetchPosts();
                            }).finally(() => {
                                this.sheet = false;
                                this.isLoading = false;
                            });
                        }
                    },
                ],
            });

            await alert.present();
        },
        handleDisableUser() {
            this.disableUser({
                user_id: this.selectedPost.author.id
            }).finally(() => {
                this.sheet = false;
            });
        },
        handleDisableCategory(id) {
            this.disableCategory({
                category_id: id
            }).finally(() => {
                this.sheet = false;
            });
        },
        openReportModal() {
            this.sheet = false;
            this.$store.commit('common/SET_REPORT_MODAL', true);
            this.$store.commit('common/SET_REPORT_TARGET', {
                id: this.selectedPost?.id,
                tax: 'post'
            });
        },
        toProfile(user_id) {
            this.$router.push({ name: 'user-profile', params: { user_id } });
            /*
             * TODO: тут определяется переход на профиль обычного пользователя или авторизованного
             * отключено из-за проблем навигации, при переходе из другого layout
             */
            /* if (user_id === this.user.id) {
                this.$router.push('/home/profile');
            } else {
                this.$router.push({ name: 'user-profile', params: { user_id } });
            }*/
        },
        setRouteBack(id) {
            this.$router.push({ name: 'article', params: { id: id } });
        },
        routerCreateArticle() {
            this.$router.push('/create-article');
        }
    }
}
</script>
