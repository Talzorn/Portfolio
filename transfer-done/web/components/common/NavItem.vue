<template>
    <div class="nav">
        <a
            v-for="item in list"
            :key="item.id"
            class="nav__link"
            :href="item.link"
            @click="closeMenu"
        >{{ $t(item.text) }}</a>

        <div class="lang">
            <img
                src="~/assets/icons/earth--white.svg"
                alt="earth"
                class="lang__icon"
            >
            <span class="lang__title">{{ $i18n.locale }}</span>
            <ul class="lang__list">
                <li
                    v-for="item in select.list"
                    :key="item.id"
                    class="lang__item"
                    :class="{active: $i18n.locale === item.lang}"
                    @click.prevent.stop="selected(item.lang)"
                >
                    {{ item.lang }}
                </li>
            </ul>
        </div>

        <a
            href="https://t.me/transfer_done_bot"
            class="btn btn--bg btn--small"
            target="_blank"
        >
            {{ $t('t_btn__sign_in') }}
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NavItem',
    data() {
        return {
            select: {
                list: [
                    {
                        id: 1,
                        lang: 'en'
                    },
                    {
                        id: 2,
                        lang: 'ru'
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            menuMobile: 'home/GET_MENU'
        }),
        list() {
            const location = this.$i18n.locale === 'ru' ? '/' : `/${this.$i18n.locale}`;
            return [
                {
                    id: 1,
                    text: 't_nav__text_1',
                    link: `${location}#about`
                },
                {
                    id: 2,
                    text: 't_nav__text_2',
                    link: `${location}#advantage`
                },
                {
                    id: 3,
                    text: 't_nav__text_3',
                    link: `${location}#roadmap`
                },
                {
                    id: 4,
                    text: 't_nav__text_4',
                    link: `${location}#faq`
                }
            ];
        }
    },
    methods: {
        closeMenu() {
            if (window.innerWidth <= 1024) {
                this.$store.commit('home/SET_MENU', false);
                // eslint-disable-next-line no-undef
                scrollHidden();
            }
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

<style scoped>

</style>
