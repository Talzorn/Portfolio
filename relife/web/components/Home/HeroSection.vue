<template>
    <section class="hero">
        <div class="wrapper">
            <div class="hero__colum">
                <h1 class="anim anim-up">
                    {{ $t('home.hero_h1_1') }}
                    <number
                        :from="fromUserCount"
                        :to="userCount"
                        :duration="90"
                        :delay="5"
                        easing="Power1.easeOut"
                    />
                    {{ $t('home.hero_h1_2') }}
                </h1>
                <div class="hero__people anim">
                    <div
                        v-for="item in userPopular"
                        :key="item.id"
                        class="hero__avatar anim-fade"
                    >
                        <img
                            v-if="item.profile.avatar"
                            :src="item.profile.avatar"
                            alt="people"
                            crossorigin="anonymous"
                        >
                        <human-icon v-else />
                    </div>
                </div>
                <h3 class="anim anim-up">
                    {{ $t('home.hero_subtitle') }}
                </h3>
                <div class="join join--desktop anim anim-up">
                    <h2>{{ $t('join') }}</h2>
                    <btn-store-group
                        :stores="stores"
                    />
                    <span class="join__text">
                        +
                        <number
                            :from="newUserCount.from"
                            :to="newUserCount.to"
                            :duration="90"
                            :delay="5"
                            easing="Power1.easeOut"
                        />
                        {{ $t('for_today') }}
                    </span>
                </div>
            </div>
            <div class="hero__colum">
                <div class="phone anim anim-fade">
                    <img
                        src="~/assets/images/iPhone-no-fill.png"
                        alt="iphone"
                    >
                    <img
                        src="~/assets/images/mobile-splash-screen.jpg"
                        alt="iphone"
                        class="poster"
                    >
                    <video
                        playsinline
                        autoplay
                        muted
                        loop
                        :src="require('~/assets/video/' + themeImage + '/' + $i18n.locale + '/home-video.mp4')"
                        :controls="false"
                        type="video/mp4"
                    />
                </div>
            </div>
            <div class="join join--mobile">
                <h2>{{ $t('join') }}:</h2>
                <btn-store-group
                    :stores="stores"
                />
                <span class="join__text">
                    +
                    <number
                        :from="newUserCount.from"
                        :to="newUserCount.to"
                        :duration="90"
                        :delay="5"
                        easing="Power1.easeOut"
                    />
                    {{ $t('for_today') }}
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import BtnStoreGroup from '@/components/Common/BtnStoreGroup.vue';
import { mapGetters } from 'vuex';
import HumanIcon from '~/assets/icons/human-icon.svg?inline';

export default {
    name: 'HeroSection',
    components: { BtnStoreGroup, HumanIcon },
    props: {
        userCount: {
            type: Number,
            default: null
        },
        newUser: {
            type: Number,
            default: null
        },
        userPopular: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            fromUserCount: null,
            newUserCount: {
                from: null,
                to: null
            },
            stores: {
                current: null,
                android: 'https://play.google.com/store/apps/details?id=org.relifeglobal.app',
                ios: 'https://apps.apple.com/ua/app/relife/id1644586629'
            }
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
    created() {
        if (this.$cookies.get('new_user_per_day')) {
            this.fromUserCount = this.userCount;
            this.newUserCount.from = this.newUser + this.$cookies.get('new_user_per_day');
            this.newUserCount.to = this.newUser + this.$cookies.get('new_user_per_day');
        } else {
            const random = this.getRndInteger(2, 6);

            this.fromUserCount = this.userCount - random;
            this.newUserCount.from = this.newUser;
            this.newUserCount.to = this.newUser + random;
            this.$cookies.set('new_user_per_day', random);
        }
    },
    methods: {
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};
</script>
