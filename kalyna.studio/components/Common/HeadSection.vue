<template>
    <header
        :class="{
            'fixed': offsetTop > halfScreen,
            'animate': direction === 'up' && offsetTop > fullScreen
        }"
    >
        <div class="wrapper anim anim-down">
            <button
                type="button"
                class="menu-btn"
                @click="openMneu"
            >
                <span class="menu-btn__circle">
                    <span class="menu-btn__line" />
                    <span class="menu-btn__line" />
                </span>
                <span class="menu-btn__text">{{ $t('t_btn_menu') }}</span>
            </button>

            <nuxt-link
                :to="localeLocation('/')"
                class="logo"
            >
                <logo-icon />
            </nuxt-link>

            <button
                type="button"
                class="theme-btn"
            >
                <transition-group
                    name="theme-icon"
                    mode="out-in"
                >
                    <moon-icon
                        v-if="theme === 2 || theme === 3 && !themDefault"
                        key="1"
                        @click="themeDark"
                    />
                    <sun-icon
                        v-else
                        key="2"
                        @click="themeLight"
                    />
                </transition-group>
            </button>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import LogoIcon from '~/assets/images/logo.svg?inline';
import MoonIcon from '~/assets/icons/moon.svg?inline';
import SunIcon from '~/assets/icons/sun.svg?inline';

export default {
    name: 'HeadSection',
    components: {
        LogoIcon,
        MoonIcon,
        SunIcon
    },
    data() {
        return {
            offsetTop: null,
            fullScreen: null,
            lastScrollTop: 0,
            halfScreen: null,
            direction: 'down'
        };
    },
    computed: {
        ...mapGetters({
            theme: 'common/GET_THEME',
            themDefault: 'common/GET_THEME_DEFAULT'
        })
    },
    mounted() {
        this.fullScreen = window.innerHeight;
        this.halfScreen = this.fullScreen / 2;
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        openMneu() {
            this.$store.commit('common/SET_MENU', true);
            // eslint-disable-next-line no-undef
            scrollHidden();
        },
        themeDark() {
            this.$store.commit('common/SET_THEME', 1);
        },
        themeLight() {
            this.$store.commit('common/SET_THEME', 2);
        },
        handleScroll() {
            const offsetTop = window.pageYOffset || document.documentElement.scrollTop;

            this.offsetTop = offsetTop;
            this.direction = this.offsetTop > this.lastScrollTop ? 'down' : 'up';
            this.lastScrollTop = offsetTop;
        },
        buttonTheme() {
            this.$cookies.set('cookieModal', true);
        }
    }
};
</script>
