import axios from "@/helpers/axios";

export default{
    namespaced: true,
    state: {
        currentVersionApp: process.env.VUE_APP_VERSION,
        isLoadData: false,
        isLoadGlobalData: false,
        notification: {
            show: false,
            status: null,
        },
        loaderMini: false,
        formPartner: null,
        themDefault: null,
        hasUnreadNotices: false,
        allCountUnreadNotices: null,
        userNotices: [],
        updateAppModal: false,
        reportModal: false,
        reportTarget: {
            id: null,
            tax: null
        },
        moderatorInfo: null,
    },
    getters: {
        GET_IS_LOAD_DATA: (state) => state.isLoadData,
        GET_IS_LOAD_GLOBAL_DATA: (state) => state.isLoadGlobalData,
        GET_NOTIFICATION: (state) => state.notification,
        GET_LOADER_MINI: (state) => state.loaderMini,
        GET_FORM_PARTNER: (state) => state.formPartner,
        GET_THEME_DEFAULT: (state) => state.themDefault,
        GET_HAS_UNREAD_NOTICES: (state) => state.hasUnreadNotices,
        GET_USER_NOTICES: (state) => state.userNotices,
        GET_UPDATE_APP_MODAL: (state) => state.updateAppModal,
        GET_CURRENT_VERSION_APP: (state) => state.currentVersionApp,
        GET_REPORT_MODAL: (state) => state.reportModal,
        GET_REPORT_TARGET: (state) => state.reportTarget,
        GET_ALL_COUNT_UNREAD_NOTICES: (state) => state.allCountUnreadNotices,
        GET_MODERATOR_INFO: (state) => state.moderatorInfo,
    },
    mutations: {
        SET_IS_LOAD_DATA(state, payload) {
            state.isLoadData = payload;
        },
        SET_IS_LOAD_GLOBAL_DATA(state, payload) {
            state.isLoadGlobalData = payload;
        },
        SET_NOTIFICATION_SHOW(state, payload) {
            state.notification.show = payload;
        },
        SET_NOTIFICATION_STATUS(state, payload) {
            state.notification.status = payload;
        },
        SET_LOADER_MINI(state, payload) {
            state.loaderMini = payload;
        },
        SET_FORM_PARTNER(state, payload) {
            state.formPartner = payload;
        },
        SET_THEME_DEFAULT(state, payload) {
            state.themDefault = payload;
        },
        SET_HAS_UNREAD_NOTICES(state, payload) {
            state.hasUnreadNotices = payload;
        },
        SET_USER_NOTICES(state, payload) {
            state.userNotices = payload;
        },
        SET_UPDATE_APP_MODAL(state, payload) {
            state.updateAppModal = payload;
        },
        SET_REPORT_MODAL(state, payload) {
            state.reportModal = payload;
        },
        SET_REPORT_TARGET(state, payload) {
            state.reportTarget = payload;
        },
        SET_ALL_COUNT_UNREAD_NOTICES(state, payload) {
            state.allCountUnreadNotices = payload;
        },
        SET_MODERATOR_INFO(state, payload) {
            state.moderatorInfo = payload;
        },
    },
    actions: {
        setReadNotifications({ commit }) {
            axios({
                method: 'put',
                url: '/user/read-notifications'
            })
                .then((data) => {
                    commit('SET_HAS_UNREAD_NOTICES', data.has_unread_notices);
                    commit('SET_ALL_COUNT_UNREAD_NOTICES', data.all_count_unread_notices);
                })
        },
    }
}
