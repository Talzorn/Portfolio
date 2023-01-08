<template>
    <header>
        <div class="wrapper">
            <div
                class="logo"
                @click="$router.push(localeLocation('/'))"
            >
                <img
                    src="~/assets/images/logo.svg"
                    alt="logo"
                >
                <div class="logo__group">
                    <span class="logo__subtitle">Transfer</span>
                    <span class="logo__title">Done</span>
                </div>
            </div>
            <span class="beta">beta</span>

            <nav-item />
        </div>

        <div
            class="menu-btn__wrapper anim"
            @click="openMenu"
        >
            <div
                class="menu-btn"
                :class="{active: menuMobile}"
            >
                <span class="menu-btn__line before" />
                <span class="menu-btn__line main" />
                <span class="menu-btn__line after" />
            </div>
        </div>

        <transition name="menu-mobile">
            <div
                v-show="menuMobile"
                class="mob-menu"
            >
                <nav-item />

                <a
                    href="https://t.me/transfer_done_bot"
                    class="btn btn--bg btn--small"
                    target="_blank"
                >
                    {{ $t('t_btn__sign_in') }}
                </a>
            </div>
        </transition>

        <transition name="overlay">
            <div
                v-if="menuMobile"
                class="overlay"
                @click="openMenu"
            />
        </transition>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import NavItem from './NavItem.vue';

export default {
    name: 'HeaderItem',
    components: { NavItem },
    computed: {
        ...mapGetters({
            menuMobile: 'home/GET_MENU'
        })
    },
    mounted() {
        window.addEventListener('resize', this.resizeMenu);
    },
    methods: {
        openMenu() {
            if (this.menuMobile === false) {
                this.$store.commit('home/SET_MENU', true);
            } else {
                this.$store.commit('home/SET_MENU', false);
            }
            // eslint-disable-next-line no-undef
            scrollHidden();
        },
        resizeMenu() {
            if (window.innerWidth > 1024 && this.menuMobile === true) {
                this.$store.commit('home/SET_MENU', false);
                // eslint-disable-next-line no-undef
                scrollHidden();
            }
        }
    }
};
</script>
