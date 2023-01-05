import { createRouter, createWebHistory } from '@ionic/vue-router';
import AuthPage from '@/pages/auth';
import MainPage from '@/pages/home';
import TutorialPage from '@/pages/tutorial.vue';
import TutorialUpdate from '@/pages/tutorial-update';
import FirstTutorialPage from '@/pages/first-tutorial';
import { Preferences }  from '@capacitor/preferences'
import i18n from '../plugins/i18n';
import Store from "@/store";

const routes = [
    {
        path: '/',
        name: 'auth',
        component: AuthPage,
        redirect: {
            name: 'login'
        },
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/pages/auth/login.vue')
            },
            {
                path: 'forgot',
                name: 'forgot',
                component: () => import('@/pages/auth/forgot/email.vue')
            },
            {
                path: 'forgot/reset',
                name: 'forgot-reset-section',
                component: () => import('@/pages/auth/forgot/reset.vue')
            },
            {
                path: 'sign-up',
                name: 'sign-up',
                component: () => import('@/pages/auth/sign-up/step-one.vue')
            },
            {
                path: 'sign-up/2',
                name: 'sign-up-two',
                component: () => import('@/pages/auth/sign-up/step-two.vue')
            },
            {
                path: 'sign-up/3',
                name: 'sign-up-three',
                component: () => import('@/pages/auth/sign-up/step-three.vue')
            },
            {
                path: 'sign-up/4',
                name: 'sign-up-four',
                component: () => import('@/pages/auth/sign-up/step-four.vue')
            },
            {
                path: 'sign-up/5',
                name: 'sign-up-five',
                component: () => import('@/pages/auth/sign-up/step-five.vue')
            }
        ]
    },
    {
        name: 'first-tutorial',
        path: '/first-tutorial',
        component: FirstTutorialPage
    },
    {
        name: 'tutorial',
        path: '/tutorial/:type?',
        component: TutorialPage
    },
    {
        name: 'tutorial-update',
        path: '/tutorial-update',
        component: TutorialUpdate
    },
    {
        path: '/test',
        component: () => import('@/pages/test.vue')
    },
    {
        path: '/home',
        component: MainPage,
        children: [
            {
                path: '',
                redirect: '/home/base'
            },
            {
                path: 'base',
                component: () => import('@/pages/home/base.vue')
            },
            {
                name: 'feed',
                path: 'feed',
                component: () => import('@/pages/home/feed.vue')
            },
            {
                name: 'notifications',
                path: 'notifications',
                component: () => import('@/pages/home/notifications.vue')
            },
            {
                name: 'main-profile',
                path: 'profile',
                component: () => import('@/pages/home/profile')
            }
        ]
    },
    {
        name: 'user-profile',
        path: '/profile/:user_id',
        component: () => import('@/pages/profile.vue'),
    },
    {
        path: '/people',
        component: () => import('@/pages/people.vue')
    },
    {
        name: 'article',
        path: '/article/:id',
        component: () => import('@/pages/article')
    },
    {
        name: 'article-category-page',
        path: '/article/categories/:id',
        component: () => import('@/pages/article/categories.vue')
    },
    {
        name: 'article-suggest-changes',
        path: '/article/suggest-changes/:postId?',
        component: () => import('@/pages/article/suggest-changes')
    },
    {
        name: 'check-list',
        path: '/check-list/:countryId',
        component: () => import('@/pages/check-list')
    },
    {
        name: 'check-list-plan',
        path: '/check-list/:countryId/check-plan',
        component: () => import('@/pages/check-list/check-plan.vue')
    },
    {
        path: '/add-partner',
        component: () => import('@/pages/add-partner.vue')
    },
    {
        path: '/profile/bookmarks',
        component: () => import('@/pages/home/profile/bookmarks.vue')
    },
    {
        path: '/profile/referral-code',
        component: () => import('@/pages/home/profile/referral-code.vue')
    },
    {
        path: '/profile/settings-feed',
        component: () => import('@/pages/home/profile/settings-feed.vue')
    },
    {
        name: 'profile-settings',
        path: '/profile/settings',
        component: () => import('@/pages/home/profile/settings')
    },
    {
        path: '/profile/settings/account',
        component: () => import('@/pages/home/profile/settings/account')
    },
    {
        path: '/profile/settings/change-email',
        component: () => import('@/pages/home/profile/settings/account/change-email.vue')
    },
    {
        path: '/profile/settings/change-password',
        component: () => import('@/pages/home/profile/settings/account/change-password.vue')
    },
    {
        path: '/profile/settings/change-community',
        component: () => import('@/pages/home/profile/settings/account/change-community.vue')
    },
    {
        path: '/profile/settings/change-about',
        component: () => import('@/pages/home/profile/settings/account/change-about.vue')
    },
    {
        path: '/profile/settings/change-personal',
        component: () => import('@/pages/home/profile/settings/account/change-personal.vue')
    },
    {
        path: '/profile/settings/privacy',
        component: () => import('@/pages/home/profile/settings/privacy.vue')
    },
    {
        path: '/profile/settings/language',
        component: () => import('@/pages/home/profile/settings/language.vue')
    },
    {
        path: '/profile/settings/theme',
        component: () => import('@/pages/home/profile/settings/theme.vue')
    },
    {
        path: '/profile/following-categories',
        component: () => import('@/pages/home/profile/following-categories.vue')
    },
    {
        path: '/profile/following-people',
        component: () => import('@/pages/home/profile/following-people.vue')
    },
    {
        path: '/search',
        component: () => import('@/pages/search.vue')
    },
    {
        name: 'create-article',
        path: '/create-article/:postId?',
        redirect: {
            name: 'article-general'
        },
        component: () => import('@/pages/create-article/index'),
        children: [
            {
                name: 'article-general',
                path: 'general',
                component: () => import('@/pages/create-article/general'),
            },
            {
                name: 'article-categories',
                path: 'categories',
                component: () => import('@/pages/create-article/categories')
            },
            {
                name: 'article-countries',
                path: 'countries',
                component: () => import('@/pages/create-article/countries')
            },
        ],
    },
    {
        name: 'chat',
        path: '/chat',
        component: () => import('@/pages/chat')
    },
    {
        name: 'user-chat',
        path: '/chat/:chatId',
        component: () => import('@/pages/chat/user-chat.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
    const lang = await Preferences.get({
        key: 'lang'
    });
    const token = await Preferences.get({
        key: 'token'
    });

    if (lang.value) {
        i18n.global.locale = lang.value;
    }

    if (
        Store.getters['user/GET_FIRST_TUTORIAL'] &&
        to.name !== 'first-tutorial'
    ) {
        return { name: 'first-tutorial' };
    }

    if (
        token.value &&
        !Store.getters['user/GET_USER']?.is_verified &&
        !Store.getters['user/GET_USER']?.is_complete &&
        !to.name?.includes('sign-up') &&
        from.name !== 'sign-up' &&
        from.name !== 'login'
    ) {
        return { name: 'sign-up-two' }
    }

    if (
        token.value &&
        Store.getters['user/GET_USER']?.is_verified &&
        !Store.getters['user/GET_USER']?.is_complete &&
        !to.name?.includes('sign-up') &&
        from.name !== 'sign-up' &&
        from.name !== 'login'
    ) {
        return { name: 'sign-up-three' }
    }

    if (
        !token.value &&
        to?.name !== 'login' &&
        !to.name?.includes('forgot') &&
        !to.name?.includes('sign-up') &&
        !Store.getters['user/GET_FIRST_TUTORIAL']
    ) {
        Store.commit('user/SET_USER', null);
        return { name: 'auth' }
    }
})

export default router
