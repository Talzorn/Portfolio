import axios from '../../helpers/axios';
import { SORT_TYPE_DATE } from '@/common/const';
import toast from '../../helpers/toast'
import i18n from '../../plugins/i18n'

export default{
    namespaced: true,
    state: {
        posts: null,
        current_post: null,
        category_info: null,
        posts_params: {
            is_favorite: false,
            search: null,
            user_id: null,
            sort_type: SORT_TYPE_DATE,
            page: 1,
            countries: null,
            categories: null,
            is_best: false,
            is_home: false,
        },
        is_profile_posts: false,
        post_model: null,
        posts_comments: [],
        ignore_countries: false,
    },
    getters: {
        GET_POSTS: (state) => state.posts,
        GET_CURRENT_POST: (state) => state.current_post,
        GET_CATEGORY_INFO: (state) => state.category_info,
        GET_POSTS_PARAMS: (state) => state.posts_params,
        GET_POST_MODEL: (state) => state.post_model,
        GET_POSTS_COMMENTS: (state) => state.posts_comments,
        GET_IS_PROFILE_POSTS: (state) => state.is_profile_posts,
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload;
        },
        SET_CURRENT_POST(state, payload) {
            state.current_post = payload;
        },
        SET_CATEGORY_INFO(state, payload) {
            state.category_info = payload;
        },
        SET_PARAM_COUNTRIES(state, payload) {
            state.posts_params.countries = payload;
        },
        SET_PARAM_CATEGORIES(state, payload) {
            state.posts_params.categories = payload;
        },
        SET_PARAM_SORT_TYPE(state, payload) {
            state.posts_params.sort_type = payload || SORT_TYPE_DATE;
        },
        SET_PARAM_PAGE(state, payload) {
            if (payload) {
                state.posts_params.page += payload;
            } else {
                state.posts_params.page = 1;
            }
        },
        SET_PARAM_SEARCH(state, payload) {
            state.posts_params.search = payload;
        },
        SET_PARAM_IS_FAVORITE(state, payload) {
            state.posts_params.is_favorite = payload;
        },
        SET_PARAM_IS_BEST(state, payload) {
            state.posts_params.is_best = payload;
        },
        SET_PARAM_IS_HOME(state, payload) {
            state.posts_params.is_home = payload;
        },
        SET_PARAM_USER_ID(state, payload) {
            state.posts_params.user_id = payload;
        },
        SET_POST_MODEL(state, payload) {
            state.post_model = payload;
        },
        SET_COMMENTS_TO_POSTS(state, payload) {
            state.posts_comments = payload;
        },
        SET_IGNORE_COUNTRIES(state, payload) {
            state.ignore_countries = payload;
        },
        SET_IS_PROFILE_POSTS(state, payload) {
            state.is_profile_posts = payload;
        },
    },
    actions: {
        fetchPosts({ commit, getters, rootGetters, state }, isReloadParams = false) {
            const params = getters.GET_POSTS_PARAMS;

            commit('common/SET_IS_LOAD_GLOBAL_DATA', true, { root: true });

            if (isReloadParams) {
                commit('SET_POSTS', null);
                commit('SET_CURRENT_POST', null);
                commit('SET_PARAM_CATEGORIES', null);
                commit('SET_PARAM_SORT_TYPE', null);
                commit('SET_PARAM_PAGE', null);
                commit('SET_PARAM_SEARCH', null);
            }

            if (!params.is_home) {
                const countries = rootGetters['user/GET_MY_COUNTRY_FILTERS'].length
                    ? rootGetters['user/GET_MY_COUNTRY_FILTERS']
                    : rootGetters['user/GET_USER']?.wish_countries.map(item => item.id);

                // todo лютый костыль
                if (!state.ignore_countries) {
                    commit('SET_PARAM_COUNTRIES', countries);
                }
            }

            return axios({
                method: 'get',
                url: '/posts',
                params
            })
                .then((res) => {
                    if (params.page > 1) {
                        const currentPosts = getters.GET_POSTS;

                        currentPosts.data = [...currentPosts.data, ...res.data];
                        currentPosts.meta = res.meta;
                        currentPosts.links = res.links;

                        commit('SET_POSTS', currentPosts);
                    } else {
                        commit('SET_POSTS', res);
                    }
                })
                .finally(() => {
                    commit('common/SET_IS_LOAD_GLOBAL_DATA', false, { root: true });
                    commit('SET_IGNORE_COUNTRIES', false);
                })
        },
        fetchCurrentPost({commit, dispatch}, id) {
            return axios({
                method: 'get',
                url: '/posts/' + id
            }).then((res) => {
                commit('SET_CURRENT_POST', res.data);
                dispatch('fetchCommentsByPost');
            })
        },
        fetchCommentsByPost({commit, getters}, params) {
            const currentPost = getters.GET_CURRENT_POST;

            return axios({
                method: 'get',
                url: '/posts/' + currentPost.id + '/comments',
                params
            }).then((res) => {
                if (params?.page > 1) {
                    const currentPostsComments = getters.GET_POSTS_COMMENTS;

                    currentPostsComments.data = [...currentPostsComments.data, ...res.data];
                    currentPostsComments.meta = res.meta;
                    currentPostsComments.links = res.links;

                    commit('SET_COMMENTS_TO_POSTS', currentPostsComments);
                } else {
                    commit('SET_COMMENTS_TO_POSTS', res);
                }
            })
        },
        fetchCategoryInfo({commit}, id) {
            axios({
                method: 'get',
                url: '/posts/category/' + id
            }).then((res) => {
                commit('SET_CATEGORY_INFO', res.data);
            })
        },
        // eslint-disable-next-line no-empty-pattern
        createPost({ commit }, data) {
            commit('common/SET_NOTIFICATION_SHOW', true, {root: true})
            return axios({
                method: 'post',
                url: '/posts/single-lang',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).finally(() => {
                commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        },
        editPost({commit}, { id, data }) {
            commit('common/SET_NOTIFICATION_SHOW', true, {root: true})
            return axios({
                method: 'post',
                url: '/posts/' + id + '/single-lang',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).finally(() => {
                commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        },
        // eslint-disable-next-line no-empty-pattern
        createPostBase({ commit }, { data, checkListId }) {
            commit('common/SET_NOTIFICATION_SHOW', true, {root: true})
            return axios({
                method: 'post',
                url: '/posts/base/' + checkListId,
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).finally(() => {
                commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        },
        editPostBase({commit}, { id, data, checkListId }) {
            commit('common/SET_NOTIFICATION_SHOW', true, {root: true})
            return axios({
                method: 'post',
                url: '/posts/' + id + '/' + checkListId + '/base',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).finally(() => {
                commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        },
        deletePost({commit}, id) {
            commit('common/SET_NOTIFICATION_SHOW', true, {root: true})
            return axios({
                method: 'delete',
                url: '/posts/' + id
            }).finally(() => {
                commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        },
        // eslint-disable-next-line no-empty-pattern
        ratePost({}, { id, data }) {
            return axios({
                method: 'post',
                url: '/posts/' + id + '/rate',
                data
            })
        },
        // eslint-disable-next-line no-empty-pattern
        setFavoritePost({}, data) {
            return axios({
                method: 'post',
                url: '/posts/favorite',
                data
            })
        },
        // eslint-disable-next-line no-unused-vars
        sendComment({commit, getters}, data) {
            const currentPost = getters.GET_CURRENT_POST;
            return axios({
                method: 'post',
                url: '/posts/' + currentPost.id + '/comments',
                data
            })
        },
        // eslint-disable-next-line no-unused-vars
        editComment({commit, getters}, data) {
            const currentPost = getters.GET_CURRENT_POST;
            return axios({
                method: 'put',
                url: '/posts/' + currentPost.id + '/comments/' + data.id,
                data
            })
        },
        // eslint-disable-next-line no-unused-vars
        deleteComment({commit, getters}, commentId) {
            const currentPost = getters.GET_CURRENT_POST;
            return axios({
                method: 'delete',
                url: '/posts/' + currentPost.id + '/comments/' + commentId
            })
        },
        // eslint-disable-next-line no-unused-vars,no-empty-pattern
        rateComment({}, { id, data }) {
            return axios({
                method: 'post',
                url: '/comments/' + id + '/rate',
                data
            })
        },
        showComment({getters}, id) {
            const currentPost = getters.GET_CURRENT_POST;
            return axios({
                method: 'get',
                url: '/posts/' + currentPost.id + '/comments/' + id,
            })
        },
        // eslint-disable-next-line no-unused-vars,no-empty-pattern
        sendReport({}, { id, text }) {
            return axios({
                method: 'post',
                url: '/posts/' + id + '/report',
                data: {
                    text
                }
            }).then(() => {
                toast({
                    message: i18n.global.t('notifications.report_has_been_send'),
                    class: 'success',
                })
            })
        },
        // eslint-disable-next-line no-empty-pattern
        moderatePost({}, { id, data }) {
            return axios({
                method: 'post',
                url: '/posts/' + id + '/moderate',
                data
            }).then(() => {
                toast({
                    message: i18n.global.t('notifications.suggest_has_been_send'),
                    class: 'success',
                })
            })
        }
    }
}
