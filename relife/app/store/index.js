import commonModule from './modules/common';
import authModule from './modules/auth';
import userModule from './modules/user';
import profileModule from './modules/profile';
import referenceModule from './modules/reference';
import feedModule from './modules/feed';
import categoryModule from './modules/category';
import checkListModule from './modules/checkList';
import chatModule from './modules/chat';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    modules: {
        common: commonModule,
        auth: authModule,
        user: userModule,
        profile: profileModule,
        reference: referenceModule,
        feed: feedModule,
        category: categoryModule,
        checkList: checkListModule,
        chat: chatModule,
    },
    plugins: [
        createPersistedState({
            paths: ['user', 'checkList'],
        }),
    ],
});

export default store;
