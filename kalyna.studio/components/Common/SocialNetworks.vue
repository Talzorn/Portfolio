<template>
    <div class="social-networks">
        <a
            href="https://www.linkedin.com/company/kalyna-studio/about/"
            class="social-networks__box"
            target="_blank"
        >
            <linkedin-logo class="social-networks__icon" />
            <span class="social-networks__text">
                <span class="text-top">{{ linkedinText }}</span>
                <span class="text-bottom">{{ linkedinText }}</span>
            </span>
            <arrow-up-right class="social-networks__arrow" />
        </a>

        <a
            href="https://www.facebook.com/KalynaStudio-101459049313039"
            class="social-networks__box"
            target="_blank"
        >
            <facebook-logo class="social-networks__icon" />
            <span class="social-networks__text">
                <span class="text-top">{{ facebookText }}</span>
                <span class="text-bottom">{{ facebookText }}</span>
            </span>
            <arrow-up-right class="social-networks__arrow" />
        </a>

        <a
            href="https://www.instagram.com/_kalyna_studio_/"
            class="social-networks__box"
            target="_blank"
        >
            <instagram-logo class="social-networks__icon" />
            <span class="social-networks__text">
                <span class="text-top">{{ instagramText }}</span>
                <span class="text-bottom">{{ instagramText }}</span>
            </span>
            <arrow-up-right class="social-networks__arrow" />
        </a>

        <a
            href="https://dribbble.com/kalyna_studio"
            class="social-networks__box"
            target="_blank"
        >
            <dribbble-logo class="social-networks__icon" />
            <span
                class="social-networks__text"
            >
                <span class="text-top">{{ dribbbleText }}</span>
                <span class="text-bottom">{{ dribbbleText }}</span>
            </span>
            <arrow-up-right class="social-networks__arrow" />
        </a>
    </div>
</template>

<script>
import LinkedinLogo from '~/assets/icons/LinkedinLogo.svg?inline';
import InstagramLogo from '~/assets/icons/InstagramLogo.svg?inline';
import FacebookLogo from '~/assets/icons/FacebookLogo.svg?inline';
import DribbbleLogo from '~/assets/icons/DribbbleLogo.svg?inline';
import ArrowUpRight from '~/assets/icons/ArrowUpRight.svg?inline';

export default {
    name: 'SocialNetworks',
    components: {
        LinkedinLogo,
        InstagramLogo,
        FacebookLogo,
        DribbbleLogo,
        ArrowUpRight
    },
    data() {
        return {
            fullName: true
        };
    },
    computed: {
        linkedinText() {
            return this.fullName ? 'Linkedin' : 'li';
        },
        facebookText() {
            return this.fullName ? 'Facebook' : 'Fb';
        },
        instagramText() {
            return this.fullName ? 'instagram' : 'ig';
        },
        dribbbleText() {
            return this.fullName ? 'dribbble' : 'dr';
        }
    },
    mounted() {
        this.resizeWidth();
        window.addEventListener('resize', this.resizeWidth);
    },
    methods: {
        resizeWidth() {
            this.fullName = !(window.innerWidth <= 767);
        }
    }
};
</script>
