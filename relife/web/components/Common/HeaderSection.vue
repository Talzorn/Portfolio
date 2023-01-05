<template>
    <header
        :class="{
            'fixed': offsetTop > halfScreen,
            'transition': transition,
            'animate': direction === 'up' && offsetTop > fullScreen
        }"
    >
        <div class="wrapper">
            <button
                type="button"
                class="menu-btn"
                @click="openMenu"
            >
                <menu-icon />
            </button>

            <NuxtLink
                :to="localeLocation('/')"
                class="logo"
            >
                <img
                    :src="require('~/assets/images/' + themeImage + '/logo.svg')"
                    alt="logo"
                >
            </NuxtLink>

            <nav-item />

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
import NavItem from '@/components/Common/NavItem.vue';
import MoonIcon from '~/assets/icons/moon.svg?inline';
import SunIcon from '~/assets/icons/sun.svg?inline';
import MenuIcon from '~/assets/icons/menu-icon.svg?inline';

export default {
    name: 'HeaderSection',
    components: {
        NavItem, MoonIcon, SunIcon, MenuIcon
    },
    data() {
        return {
            offsetTop: null,
            fullScreen: null,
            lastScrollTop: 0,
            halfScreen: null,
            direction: 'down',
            transition: false
        };
    },
    computed: {
        ...mapGetters({
            theme: 'common/GET_THEME',
            themDefault: 'common/GET_THEME_DEFAULT'
        }),
        themeImage() {
            let themNow = '';

            if (this.theme === 1) {
                themNow = 'dark';
            }
            if (this.theme === 2) {
                themNow = 'light';
            }
            if (this.theme === 3 && this.themDefault) {
                themNow = 'dark';
            }
            if (this.theme === 3 && !this.themDefault) {
                themNow = 'light';
            }
            return themNow;
        }
    },
    mounted() {
        this.fullScreen = window.innerHeight;
        this.halfScreen = this.fullScreen / 2;
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const offsetTop = window.pageYOffset || document.documentElement.scrollTop;

            this.offsetTop = offsetTop;
            this.direction = this.offsetTop > this.lastScrollTop ? 'down' : 'up';
            this.lastScrollTop = offsetTop;

            setTimeout(() => {
                this.transition = this.offsetTop > this.halfScreen;
            }, 500);
        },
        themeDark() {
            this.$store.commit('common/SET_THEME', 1);
        },
        themeLight() {
            this.$store.commit('common/SET_THEME', 2);
        },
        openMenu() {
            this.$store.commit('common/SET_MENU', true);
            // eslint-disable-next-line no-undef
            scrollHidden();
        }
    }
};
</script>
