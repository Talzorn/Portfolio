<template>
    <nav class="nav">
        <NuxtLink
            v-for="item in list"
            :key="item.id"
            class="nav__link"
            :to="item.link"
            @click.native="closeMenu"
        >
            {{ $t(item.text) }}
        </NuxtLink>

        <div class="lang">
            <EarthSvg class="lang__icon" />
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
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import EarthSvg from '~/assets/icons/earth-icon.svg?inline';

export default {
    name: 'NavItem',
    components: { EarthSvg },
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
            menuMobile: 'common/GET_MENU'
        }),
        list() {
            const location = this.$i18n.locale === 'ru' ? '/' : `/${this.$i18n.locale}`;
            return [
                {
                    id: 1,
                    text: 'nav__text_1',
                    link: `${location}#know-base`
                },
                {
                    id: 2,
                    text: 'nav__text_2',
                    link: `${location}#road-map`
                },
                {
                    id: 3,
                    text: 'nav__text_3',
                    link: `${location}#can-found`
                },
                {
                    id: 4,
                    text: 'nav__text_4',
                    link: `${location}#who-we`
                },
                {
                    id: 5,
                    text: 'nav__text_5',
                    link: `${location}#map`
                }
            ];
        }
    },
    methods: {
        closeMenu() {
            if (window.innerWidth <= 1024) {
                this.$store.commit('common/SET_MENU', false);
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
