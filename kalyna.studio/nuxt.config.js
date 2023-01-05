export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'kalyna.studio',
        htmlAttrs: {
            lang: 'ua'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'msapplication-TileColor', content: '#603cba' },
            { name: 'theme-color', content: '#ffffff' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            {
                rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'
            },
            {
                rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'
            },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fe4e00' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/scss/app.scss',
        'node_modules/vue-slick-carousel/dist/vue-slick-carousel.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/scroll-hidden.js', mode: 'client' },
        { src: '~/plugins/vue-slick-carousel.js', mode: 'client' },
        { src: '~/plugins/animate.js', mode: 'client' },
        { src: '~/plugins/click-outside.js', mode: 'client' },
        { src: '~/plugins/notification.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/svg',
        'nuxt-gsap-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/i18n',
        'cookie-universal-nuxt',
        '@nuxtjs/axios'
    ],

    i18n: {
        locales: [
            {
                code: 'ua',
                file: 'ua-UA.js'
            },
            {
                code: 'en',
                file: 'en-US.js'
            }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en'
    },

    mode: 'spa',

    generate: {
        fallback: true
    },

    gsap: {
        extraPlugins: {
            scrollTrigger: true
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        publicPath: 'assets/'
    }
};
