<template>
    <client-only>
        <VueSlickCarousel
            class="roadmap__slider anim anim-up"
            v-bind="settings"
        >
            <div
                v-for="item in list"
                :key="item.id"
                class="roadmap__box"
                :class="{reverse: item.reverse}"
            >
                <div class="roadmap__block">
                    <span class="roadmap__h3">{{ $t(item.title) }}</span>
                    <span class="roadmap__date">{{ $t(item.date) }}</span>
                    <div class="roadmap__line" />
                    <span class="roadmap__text" v-html="$t(item.text)" />
                </div>
                <div class="roadmap-circle">
                    <span class="roadmap-circle__small" />
                    <span class="roadmap-circle__medium" />
                    <span class="roadmap-circle__large" />
                    <span class="roadmap-circle__circle" />
                    <span class="roadmap-circle__line" />
                </div>
                <div class="roadmap__icon">
                    <img
                        :src="require('~/assets/icons/' + item.icon)"
                        alt="roadmap icon"
                    >
                </div>
            </div>

            <template #prevArrow>
                <div class="roadmap-arrow">
                    <button
                        type="button"
                        class="roadmap-arrow__box"
                    >
                        <img
                            src="~/assets/icons/arrow-left--white.svg"
                            alt="arrow"
                        >
                        <span class="roadmap-arrow__text">{{ $t('t_btn__prev') }}</span>
                    </button>
                </div>
            </template>
            <template #nextArrow>
                <div class="roadmap-arrow">
                    <button
                        type="button"
                        class="roadmap-arrow__box"
                    >
                        <span class="roadmap-arrow__text">{{ $t('t_btn__next') }}</span>
                        <img
                            src="~/assets/icons/arrow-right--white.svg"
                            alt="arrow"
                        >
                    </button>
                </div>
            </template>
        </VueSlickCarousel>
    </client-only>
</template>

<script>
export default {
    name: 'RoadmapSlider',
    data() {
        return {
            settings: {
                dots: false,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 680,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            },
            list: [
                {
                    id: 1,
                    date: 't_roadmap_stage_1__date',
                    title: 't_roadmap_stage_1__h3',
                    text: 't_roadmap_stage_1__text',
                    icon: 'logo-beta--white.svg',
                    reverse: false
                },
                {
                    id: 2,
                    date: 't_roadmap_stage_2__date',
                    title: 't_roadmap_stage_2__h3',
                    text: 't_roadmap_stage_2__text',
                    icon: 'people-two--whites.svg',
                    reverse: true
                },
                {
                    id: 3,
                    date: 't_roadmap_stage_3__date',
                    title: 't_roadmap_stage_3__h3',
                    text: 't_roadmap_stage_3__text',
                    icon: 'wallet--white.svg',
                    reverse: false
                },
                {
                    id: 4,
                    date: 't_roadmap_stage_4__date',
                    title: 't_roadmap_stage_4__h3',
                    text: 't_roadmap_stage_4__text',
                    icon: 'fiat-exchange--white.svg',
                    reverse: true
                },
                {
                    id: 5,
                    date: 't_roadmap_stage_5__date',
                    title: 't_roadmap_stage_5__h3',
                    text: 't_roadmap_stage_5__text',
                    icon: 'all-cryptocurrency--white.svg',
                    reverse: false
                }
            ]
        };
    }
};
</script>
