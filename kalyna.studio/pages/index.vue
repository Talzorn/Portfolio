<template>
    <main>
        <section class="hero">
            <div class="wrapper">
                <div class="hero__cont">
                    <h1 class="anim anim-up">
                        {{ $t('t_hero__h1_1') }} <img
                            src="~/assets/images/hero-1.webp"
                            alt="design icon"
                        >{{ $t('t_hero__h1_2') }} <img
                            src="~/assets/images/hero-2.webp"
                            alt="build icon"
                        >{{ $t('t_hero__h1_3') }} <img
                            src="~/assets/images/hero-3.webp"
                            alt="launch icon"
                        >{{ $t('t_hero__h1_4') }} <img
                            src="~/assets/images/hero-4.webp"
                            alt="people icon"
                        >{{ $t('t_hero__h1_5') }} <img
                            src="~/assets/images/hero-5.webp"
                            alt="business icon"
                        >
                    </h1>
                    <start-project-btn
                        class="anim-opacity"
                        :id-btn="'hero-circle'"
                    />
                    <div class="hero__bg anim anim-opacity" />
                </div>
            </div>
        </section>

        <section
            id="values"
            class="values"
        >
            <div class="wrapper">
                <h2 class="anim anim-opacity">
                    <round-star-icon /> {{ $t('t_values__h2') }}
                </h2>
                <div class="values__grid anim">
                    <div class="values__box values__box--horizont anim-up">
                        <div class="values__group">
                            <h3>{{ $t('t_values__title_1') }}</h3>
                            <span class="values__desc">{{ $t('t_values__desc_1') }}</span>
                        </div>
                        <img
                            class="values__icon"
                            :src="require('~/assets/images/' + themeImage + '/values-1.svg')"
                            alt="values icon"
                        >
                    </div>
                    <div class="values__box values__box--vertical values__box--right anim-up">
                        <div class="values__group">
                            <h3>{{ $t('t_values__title_2') }}</h3>
                            <span class="values__desc">{{ $t('t_values__desc_2') }}</span>
                        </div>
                        <img
                            class="values__icon"
                            :src="require('~/assets/images/' + themeImage + '/values-2.svg')"
                            alt="values icon"
                        >
                    </div>
                    <div class="values__box values__box--horizont anim-up">
                        <div class="values__group">
                            <h3>{{ $t('t_values__title_3') }}</h3>
                            <span class="values__desc">{{ $t('t_values__desc_3') }}</span>
                        </div>
                        <img
                            class="values__icon"
                            :src="require('~/assets/images/' + themeImage + '/values-3.svg')"
                            alt="values icon"
                        >
                    </div>
                </div>
            </div>
        </section>

        <section
            id="works"
            class="works"
        >
            <div class="wrapper">
                <h2 class="anim anim-opacity">
                    <round-star-icon /> {{ $t('t_works_h2') }}
                </h2>
                <div class="works-tile works-tile--left anim">
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-coffe-1--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-coffe-1--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-coffe-1--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                    <div class="works-tile__colum">
                        <nuxt-link
                            to="/"
                            class="works-tile__box works-tile__box--logo anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-coffe-2--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-coffe-2--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-coffe-2--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                            <img
                                class="works-tile__logo"
                                src="~/assets/images/works-coffe-logo.svg"
                                alt="digital coffee images"
                            >
                        </nuxt-link>
                        <nuxt-link
                            to="/"
                            class="works-tile__box anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-coffe-3--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-coffe-3--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-coffe-3--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                        </nuxt-link>
                    </div>
                </div>

                <div class="works-tile works-tile--middle anim">
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-delsy-1--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-delsy-1--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-delsy-1--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-coffe-4--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-coffe-4--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-coffe-4--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                </div>

                <div class="works-tile works-tile--right anim">
                    <div class="works-tile__colum">
                        <nuxt-link
                            to="/"
                            class="works-tile__box anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-coffe-5--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-coffe-5--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-coffe-5--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                        </nuxt-link>
                        <nuxt-link
                            to="/"
                            class="works-tile__box works-tile__box--logo anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-inwear-1--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-inwear-1--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-inwear-1--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                            <img
                                class="works-tile__logo"
                                src="~/assets/images/works-inwear-logo.svg"
                                alt="digital coffee images"
                            >
                        </nuxt-link>
                    </div>
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-inwear-2--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-inwear-2--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-inwear-2--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                </div>

                <div class="works-tile works-tile--middle anim">
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-delsy-2--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-delsy-2--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-delsy-2--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-hr-1--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-hr-1--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-hr-1--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                        <img
                            class="works-tile__logo"
                            src="~/assets/images/works-hr-logo.svg"
                            alt="hr school images"
                        >
                    </nuxt-link>
                </div>

                <div class="works-tile works-tile--left anim">
                    <nuxt-link
                        to="/"
                        class="works-tile__box anim-up"
                    >
                        <picture>
                            <source srcset="~/assets/images/works-hr-2--l.webp"  media="(min-width: 1501px)">
                            <source srcset="~/assets/images/works-hr-2--m.webp"  media="(min-width: 812px)">
                            <img
                                class="works-tile__images large"
                                src="~/assets/images/works-hr-2--s.webp"
                                alt="digital coffee images"
                            >
                        </picture>
                    </nuxt-link>
                    <div class="works-tile__colum">
                        <nuxt-link
                            to="/"
                            class="works-tile__box anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-inwear-3--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-inwear-3--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-inwear-3--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                        </nuxt-link>
                        <nuxt-link
                            to="/"
                            class="works-tile__box works-tile__box--logo anim-up"
                        >
                            <picture>
                                <source srcset="~/assets/images/works-delsy-3--l.webp"  media="(min-width: 1501px)">
                                <source srcset="~/assets/images/works-delsy-3--m.webp"  media="(min-width: 812px)">
                                <img
                                    class="works-tile__images large"
                                    src="~/assets/images/works-delsy-3--s.webp"
                                    alt="digital coffee images"
                                >
                            </picture>
                            <img
                                class="works-tile__logo"
                                src="~/assets/images/works-delsy-logo.svg"
                                alt="delsy images"
                            >
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>

        <principles-section />

        <services-section />

        <approach-section />
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
import StartProjectBtn from '@/components/Common/StartProjectBtn.vue';
import ServicesSection from '@/components/Home/ServicesSection.vue';
import ApproachSection from '@/components/Home/ApproachSection.vue';
import PrinciplesSection from '@/components/Home/PrinciplesSection.vue';
import RoundStarIcon from '~/assets/icons/round-star.svg?inline';

export default {
    name: 'HomePage',
    components: {
        PrinciplesSection,
        ApproachSection,
        ServicesSection,
        StartProjectBtn,
        RoundStarIcon
    },
    layout: 'main',
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
    }
};
</script>
