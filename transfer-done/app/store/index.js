import authModule from './modules/auth';
import commonModule from './modules/common';
import bankCardModule from './modules/bank-card';
import { createStore } from 'vuex';

const store = createStore({
    modules:{
        auth: authModule,
        common: commonModule,
        'bank-card': bankCardModule
    }
});

export default store;