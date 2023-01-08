<template>
    <footer>
        <div class="wrapper anim anim-up">
            <div class="footer__cont">
                <div class="footer__colum">
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
                    <span class="footer__text">{{ $t('t_footer__desc') }}</span>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('t_footer__comp_title') }}</span>
                    <ul class="footer-menu">
                        <li
                            v-for="item in list"
                            :key="item.id"
                            class="footer-menu__item"
                        >
                            <a
                                :href="item.link"
                                class="footer-menu__link"
                            >{{ $t(item.text) }}</a>
                        </li>
                    </ul>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('t_footer__legal_title') }}</span>
                    <ul class="footer-menu">
                        <li class="footer-menu__item">
                            <NuxtLink
                                class="footer-menu__link"
                                :to="localeLocation('/terms-use')"
                            >{{ $t('t_footer__legal_text_1') }}</NuxtLink >
                        </li>
                        <li class="footer-menu__item">
                            <NuxtLink
                                class="footer-menu__link"
                                :to="localeLocation('/privacy-policy')"
                            >{{ $t('t_footer__legal_text_2') }}</NuxtLink >
                        </li>
                        <li class="footer-menu__item">
                            <NuxtLink
                                class="footer-menu__link"
                                :to="localeLocation('/cookie-policy')"
                            >{{ $t('t_footer__legal_text_3') }}</NuxtLink >
                        </li>
                    </ul>
                </div>

                <div class="footer__colum">
                    <span class="footer__title">{{ $t('t_footer__cont_title') }}</span>
                    <ul class="footer-menu">
                        <li class="footer-menu__item">
                            <a
                                href="https://t.me/+xCbAy7Yi1Co3OWFi"
                                class="footer-menu__link"
                                target="_blank"
                            >Telegram</a>
                        </li>
                    </ul>
                </div>
            </div>

            <span class="copyright">Done 2022 © All rights reserved</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterItem',
    computed: {
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
    }
};
</script>
