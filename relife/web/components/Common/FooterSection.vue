<template>
    <footer>
        <div class="wrapper anim anim-up">
            <div class="footer__cont">
                <div class="footer__colum">
                    <NuxtLink
                        :to="localeLocation('/')"
                        class="logo"
                    >
                        <img
                            :src="require('~/assets/images/' + themeImage + '/logo.svg')"
                            alt="logo"
                        >
                    </NuxtLink>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('footer__comp_title') }}</span>
                    <ul class="footer-menu">
                        <li
                            v-for="item in listCompany"
                            :key="item.id"
                            class="footer-menu__item"
                        >
                            <NuxtLink
                                class="footer-menu__link"
                                :to="item.link"
                            >
                                {{ $t(item.text) }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('footer__legal_title') }}</span>
                    <ul class="footer-menu">
                        <li
                            v-for="item in listLegal"
                            :key="item.id"
                            class="footer-menu__item"
                        >
                            <NuxtLink
                                class="footer-menu__link"
                                :to="localeLocation(item.link)"
                            >
                                {{ $t(item.text) }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('footer__network_title') }}</span>
                    <ul class="footer-menu">
                        <li
                            v-for="item in listNetwork"
                            :key="item.id"
                            class="footer-menu__item"
                        >
                            <a
                                :href="item.link"
                                class="footer-menu__link"
                                target="_blank"
                            >{{ $t(item.text) }}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <span class="copyright">ReLife 2022 © All rights reserved</span>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'FooterSection',
    data() {
        return {
            listLegal: [
                {
                    id: 1,
                    text: 'footer__legal_text_1',
                    link: '/privacy-policy'
                },
                {
                    id: 2,
                    text: 'footer__legal_text_2',
                    link: '/cookie-policy'
                },
                {
                    id: 3,
                    text: 'footer__legal_text_3',
                    link: '/application-policy'
                }
            ],
            listNetwork: [
                {
                    id: 1,
                    text: 'footer__network_text_1',
                    link: 'https://t.me/relifegeneral'
                },
                {
                    id: 2,
                    text: 'footer__network_text_2',
                    link: 'mailto:support@app.relifeglobal.org'
                }
            ]
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
        },
        listCompany() {
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
    }
};
</script>
