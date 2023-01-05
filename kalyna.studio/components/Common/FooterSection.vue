<template>
    <footer>
        <div class="wrapper anim">
            <div class="footer-top anim-up">
                <social-networks />
            </div>
            <div class="footer-middle anim-opacity">
                <nuxt-link
                    :to="localeLocation('/')"
                    class="logo"
                >
                    <logo-icon />
                </nuxt-link>
                <span class="copyright anim-opacity">Kalyna Studio © 2022 </span>
            </div>
            <div class="footer-bottom anim-up">
                <start-project-btn
                    class="anim-opacity"
                    :id-btn="'footer-circle'"
                />
                <div class="footer-bottom__colum">
                    <span class="footer-bottom__title">{{ $t('t_footer__col_title_1') }}</span>
                    <span class="footer-bottom__text">Grochowska 217/15<br>04-077 Warszawa<br>Poland</span>
                </div>
                <div class="footer-bottom__colum">
                    <span class="footer-bottom__title">{{ $t('t_footer__col_title_2') }}</span>
                    <nuxt-link
                        :to="localeLocation('/cookie-policy')"
                        class="footer-bottom__link"
                    >
                        {{ $t('t_footer__col_2__text_1') }}
                    </nuxt-link>
                    <nuxt-link
                        :to="localeLocation('/privacy-policy')"
                        class="footer-bottom__link"
                    >
                        {{ $t('t_footer__col_2__text_2') }}
                    </nuxt-link>
                </div>
                <div class="footer-bottom__colum">
                    <span class="footer-bottom__title">{{ $t('t_footer__col_title_3') }}</span>
                    <a
                        href="mailto:business@kalyna.studio"
                        class="footer-bottom__link"
                        target="_blank"
                    >business@kalyna.studio</a>
                    <a
                        href="https://t.me/n_kalyna"
                        class="footer-bottom__link"
                        target="_blank"
                    >Telegram</a>
                    <a
                        href="https://wa.me/+380663204540"
                        class="footer-bottom__link"
                        target="_blank"
                    >WhatsApp</a>
                </div>
            </div>
        </div>
        <div class="footer-bg anim anim-up" />
    </footer>
</template>

<script>
import StartProjectBtn from '@/components/Common/StartProjectBtn';
import SocialNetworks from '@/components/Common/SocialNetworks';
import LogoIcon from '~/assets/images/logo.svg?inline';

export default {
    name: 'FooterSection',
    components: {
        SocialNetworks,
        StartProjectBtn,
        LogoIcon
    }
};
</script>
