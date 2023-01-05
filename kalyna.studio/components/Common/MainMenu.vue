<template>
    <transition name="menu">
        <div
            v-if="menu"
            class="menu"
            :class="{animate}"
        >
            <div class="wrapper">
                <div class="menu-top">
                    <button
                        type="button"
                        class="menu-btn menu-btn--close"
                        @click="menuClose"
                    >
                        <span class="menu-btn__circle">
                            <span class="menu-btn__line" />
                            <span class="menu-btn__line" />
                        </span>
                        <span class="menu-btn__text">{{ $t('t_btn_close') }}</span>
                    </button>

                    <div class="lang">
                        <span
                            v-for="item in lang"
                            :key="item.id"
                            class="lang__item"
                            :class="{active: $i18n.locale === item.lang}"
                            @click.prevent.stop="selected(item.lang)"
                        >{{ item.text }}</span>
                        <span class="lang__carriage" />
                    </div>
                </div>
                <nav class="nav">
                    <div class="nav__cont">
                        <a
                            v-for="item in list"
                            :key="item.id"
                            :href="item.link"
                            class="menu-link"
                            @click="menuClose"
                        >
                            <span class="text-top">{{ $t(item.text) }}</span>
                            <span class="text-bottom">{{ $t(item.text) }}</span>
                        </a>
                        <!-- @click.native="menuClose" -->
                        <nuxt-link
                            :to="localeLocation('/contacts')"
                            class="menu-link"
                            @click.native="menuClose"
                        >
                            <span class="text-top">{{ $t('t_menu_6') }}</span>
                            <span class="text-bottom">{{ $t('t_menu_6') }}</span>
                        </nuxt-link>
                    </div>
                    <div class="menu__btn-wrap">
                        <div class="menu__btn" @click="menuClose">
                            <start-project-btn
                                :id-btn="'menu-circle'"
                            />
                        </div>
                    </div>
                </nav>
                <div class="menu-bottom">
                    <social-networks />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import SocialNetworks from '@/components/Common/SocialNetworks.vue';
import StartProjectBtn from '@/components/Common/StartProjectBtn.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'MainMenu',
    components: { StartProjectBtn, SocialNetworks },
    data() {
        return {
            animate: false,
            lang: [
                {
                    id: 1,
                    lang: 'en',
                    text: 'ENG'
                },
                {
                    id: 2,
                    lang: 'ua',
                    text: 'УКР'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            menu: 'common/GET_MENU'
        }),
        list() {
            const location = this.$i18n.locale === 'en' ? '/' : `/${this.$i18n.locale}`;
            return [
                {
                    id: 1,
                    text: 't_menu_1',
                    link: `${location}#values`
                },
                {
                    id: 2,
                    text: 't_menu_2',
                    link: `${location}#works`
                },
                {
                    id: 3,
                    text: 't_menu_3',
                    link: `${location}#principles`
                },
                {
                    id: 4,
                    text: 't_menu_4',
                    link: `${location}#services`
                },
                {
                    id: 5,
                    text: 't_menu_5',
                    link: `${location}#approach`
                }
            ];
        }
    },
    watch: {
        menu() {
            if (this.animate === false) {
                this.animate = this.menu;
            }
        }
    },
    methods: {
        menuClose() {
            setTimeout(() => {
                this.$store.commit('common/SET_MENU', false);
                // eslint-disable-next-line no-undef
                scrollHidden();
            }, 400);
            this.animate = false;
        },
        selected(value) {
            window.location.hash = '';

            setTimeout(() => {
                this.$i18n.setLocale(value);
            }, 100);
        }
    }
};
</script>
