export default {
    namespaced: true,
    state() {
        return {
            menu: false,
            theme: 3,
            themeDefault: null
        };
    },
    getters: {
        GET_MENU: (state) => state.menu,
        GET_THEME: (state) => state.theme,
        GET_THEME_DEFAULT: (state) => state.themeDefault
    },
    mutations: {
        SET_MENU(state, payload) {
            state.menu = payload;
        },
        SET_THEME(state, payload) {
            state.theme = payload;
        },
        SET_THEME_DEFAULT(state, payload) {
            state.themeDefault = payload;
        }
    },
    actions: {}
};
