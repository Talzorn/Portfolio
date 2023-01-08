export default{
    namespaced: true,
    state: {
        notification: {
            show: false,
            status: null
        },
        loaderMini: false,
        baseModals: null,
        themeColor: false,
        tutorialBack: ''
    },
    getters: {
        GET_NOTIFICATION: (state) => state.notification,
        GET_LOADER_MINI: (state) => state.loaderMini,
        GET_BASE_MODALS: (state) => state.baseModals,
        GET_THEME_COLOR: (state) => state.themeColor,
        GET_TUTORIAL_BACK: (state) => state.tutorialBack
    },
    mutations: {
        SET_NOTIFICATION_SHOW(state, payload) {
            state.notification.show = payload;
        },
        SET_NOTIFICATION_STATUS(state, payload) {
            state.notification.status = payload;
        },
        SET_LOADER_MINI(state, payload) {
            state.loaderMini = payload;
        },
        SET_BASE_MODALS(state, payload) {
            state.baseModals = payload;
        },
        SET_THEME_COLOR(state, payload) {
            state.themeColor = payload;
        },
        SET_TUTORIAL_BACK(state, payload) {
            state.tutorialBack = payload;
        }
    },
    actions: {}
}