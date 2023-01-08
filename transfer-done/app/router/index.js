import { createRouter, createWebHistory } from '@ionic/vue-router';
import BottomMenuPage from '@/pages/home/index';
import AuthPage from '@/pages/auth';

const routes = [
    {
        path: '/',
        component: AuthPage,
    },
    {
        path: '/home',
        component: BottomMenuPage,
        children: [
            {
                path: '/home',
                redirect: '/home/main'
            },
            {
                path: 'main',
                component: () => import('@/pages/home/main.vue')
            },
            {
                path: 'order',
                component: () => import('@/pages/home/order'),
            },
            {
                path: 'transfer',
                component: () => import('@/pages/home/transfer')
            },
            {
                path: 'profile',
                component: () => import('@/pages/home/profile')
            }
        ]
    },
    {
        path: '/all',
        component: () => import('@/pages/all')
    },
    {
        path: '/search',
        component: () => import('@/pages/search')
    },
    {
        path: '/offer',
        component: () => import('@/pages/offer')
    },
    {
        path: '/bank-card',
        component: () => import('@/pages/home/profile/bank-card')
    },
    {
        path: '/create-card',
        component: () => import('@/pages/home/profile/bank-card/create-card')
    },
    {
        path: '/lang',
        component: () => import('@/pages/home/profile/lang')
    },
    {
        path: '/exchange',
        component: () => import('@/pages/exchange')
    },
    {
        path: '/transfer',
        component: () => import('@/pages/transfer')
    },
    {
        path: '/insufficient',
        component: () => import('@/pages/transfer/insufficient')
    },
    {
        path: '/return',
        component: () => import('@/pages/transfer/return')
    },
    {
        path: '/deal',
        component: () => import('@/pages/deal')
    },
    {
        path: '/create-offer',
        component: () => import('@/pages/offer/create-offer')
    },
    {
        path: '/setting',
        component: () => import('@/pages/home/profile/setting')
    },
    {
        path: '/setting/edit-profile',
        component: () => import('@/pages/home/profile/setting/edit-profile')
    },
    {
        path: '/setting/edit-password',
        component: () => import('@/pages/home/profile/setting/edit-password')
    },
    {
        path: '/setting/edit-email',
        component: () => import('@/pages/home/profile/setting/edit-email')
    },
    {
        path: '/profile/invition',
        component: () => import('@/pages/home/profile/invition')
    },
    {
        path: '/profile/info',
        component: () => import('@/pages/home/profile/information')
    },
    {
        path: '/profile/info/commission',
        component: () => import('@/pages/home/profile/information/article-commission')
    },
    {
        path: '/profile/info/price',
        component: () => import('@/pages/home/profile/information/article-price')
    },
    {
        path: '/tutorial',
        component: () => import('@/pages/tutorial')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
