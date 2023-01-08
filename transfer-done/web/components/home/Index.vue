<template>
    <main>
        <section class="hero">
            <div class="wrapper">
                <div class="hero__colum">
                    <h1 class="anim anim-up">
                        {{ $t('t_hero__h1') }}
                    </h1>
                    <span class="hero__desc anim anim-up">{{ $t('t_hero__desc') }}</span>
                    <a
                        href="https://t.me/transfer_done_bot"
                        class="btn btn--bg btn--large anim anim-up"
                        target="_blank"
                    >
                        {{ $t('t_btn__sign_in') }}
                    </a>
                    <span class="hero__text anim anim-up">{{ $t('t_hero__text') }}</span>
                </div>
                <picture class="hero__colum anim anim-fade">
                    <source
                        :srcset="require('~/assets/images/' + $i18n.locale + '/hero__phone-one--large.png')"
                        media="(max-width: 1024px)"
                    >
                    <source
                        :srcset="require('~/assets/images/' + $i18n.locale + '/hero__phone-two--small.png')"
                        media="(max-height: 680px) and (min-width: 1025px)"
                    >
                    <img
                        :src="require('~/assets/images/' + $i18n.locale + '/hero__phone-two--large.png')"
                        alt="phone mockup"
                        class="hero__phone-img"
                    >
                </picture>
            </div>
        </section>
        <section class="worldwide">
            <div class="wrapper">
                <div class="worldwide__colum">
                    <h2 class="anim anim-up">
                        {{ $t('t_worldwide__h2') }}
                    </h2>
                    <span class="worldwide__desc description anim anim-up">{{ $t('t_worldwide__desc') }}</span>
                    <div class="worldwide__box anim">
                        <div class="worldwide__group anim-up">
                            <span class="worldwide__number">{{ $t('t_worldwide__number_1') }}</span>
                            <span class="worldwide__text">{{ $t('t_worldwide__text_1') }}</span>
                        </div>
                        <div class="worldwide__group anim-up">
                            <span class="worldwide__number">{{ $t('t_worldwide__number_2') }}</span>
                            <span class="worldwide__text">{{ $t('t_worldwide__text_2') }}</span>
                        </div>
                    </div>
                </div>
                <div class="worldwide__map anim anim-fade">
                    <img
                        src="~/assets/images/world-map.svg"
                        alt="world map"
                    >
                </div>
            </div>
        </section>
        <section
            id="advantage"
            class="quality"
        >
            <div class="wrapper anim">
                <h2 class="anim anim-up">
                    {{ $t('t_quality__h2') }}
                </h2>
                <span class="quality__subtitle description anim anim-up">{{ $t('t_quality__subtitle') }}</span>
                <div class="quality__box anim">
                    <div class="quality__block anim-up">
                        <div class="quality__circle">
                            <img
                                src="~/assets/icons/security.svg"
                                alt="security"
                            >
                        </div>
                        <span class="quality__title">{{ $t('t_quality__title_1') }}</span>
                        <span class="quality__desc">{{ $t('t_quality__desc_1') }}</span>
                    </div>
                    <div class="quality__block anim-up">
                        <div class="quality__circle">
                            <img
                                src="~/assets/icons/easy-transfer.svg"
                                alt="security"
                            >
                        </div>
                        <span class="quality__title">{{ $t('t_quality__title_2') }}</span>
                        <span class="quality__desc">{{ $t('t_quality__desc_2') }}</span>
                    </div>
                    <div class="quality__block anim-up">
                        <div class="quality__circle">
                            <img
                                src="~/assets/icons/profitably.svg"
                                alt="security"
                            >
                        </div>
                        <span class="quality__title">{{ $t('t_quality__title_3') }}</span>
                        <span class="quality__desc">{{ $t('t_quality__desc_3') }}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="make-reg">
            <div class="wrapper">
                <h2 class="anim anim-up">
                    {{ $t('t_make_reg__h2') }}
                </h2>
                <span class="make-reg__desc description anim anim-up">{{ $t('t_make_reg__desc') }}</span>
                <a
                    href="https://t.me/transfer_done_bot"
                    class="btn btn--bg btn--large anim anim-up"
                    target="_blank"
                >
                    {{ $t('t_btn__sign_in') }}
                </a>
            </div>
        </section>
        <section
            id="about"
            class="how-works"
        >
            <div class="wrapper anim">
                <h2 class="anim anim-up">
                    {{ $t('t_how_works__h2') }}
                </h2>

                <how-works-cont />
            </div>
        </section>
        <section
            id="roadmap"
            class="roadmap"
        >
            <div class="wrapper">
                <h2 class="anim anim-up">{{ $t('t_roadmap__h2') }}</h2>
                <roadmap-slider />
            </div>
        </section>
        <section
            id="faq"
            class="faq"
        >
            <div class="wrapper anim">
                <h2 class="anim anim-up">
                    FAQ
                </h2>

                <accordion-block class="anim anim-up" />
            </div>
        </section>
        <section class="start-using">
            <div class="wrapper">
                <div class="start-using__colum">
                    <h2 class="anim anim-up">
                        {{ $t('t_start_using__h2') }}
                    </h2>
                    <span class="start-using__desc description anim anim-up">{{ $t('t_start_using__desc') }}</span>
                    <a
                        href="https://t.me/transfer_done_bot"
                        class="btn btn--bg btn--large anim anim-up"
                        target="_blank"
                    >
                        {{ $t('t_btn__sign_in') }}
                    </a>
                </div>
                <div class="start-using__colum anim anim-fade">
                    <img
                        :src="require('~/assets/images/' + $i18n.locale + '/start-using__phone-hand--large.png')"
                        alt="phone hand"
                        class="start-using__phone-img"
                    >
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import HowWorksCont from './how-works/Index.vue';
import AccordionBlock from './Accordion.vue';
import RoadmapSlider from './RoadmapSlider.vue';

export default {
    name: 'HomePage',
    components: { RoadmapSlider, AccordionBlock, HowWorksCont }
};
</script>

<style scoped>

</style>
