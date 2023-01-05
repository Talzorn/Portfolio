<template>
    <section
        id="services"
        class="services"
    >
        <div class="wrapper">
            <h2 class="anim anim-opacity">
                <round-star-icon /> {{ $t('t_services_h2') }}
            </h2>
        </div>

        <div
            class="services__cont anim anim-up"
        >
            <div
                class="services-slide__wrap"
                @mousemove="mouseMove($event, 1)"
                @mouseleave="mouseLeave"
            >
                <VueSlickCarousel
                    id="services-slide-1"
                    class="services-slide"
                    v-bind="settings"
                >
                    <div
                        v-for="item in services.listOne"
                        :key="item.id"
                        class="services-slide__box"
                    >
                        <span class="services-slide__text">{{ $t(item.name) }}</span>
                        <round-star-icon />
                    </div>
                </VueSlickCarousel>
            </div>

            <div
                class="services-slide__wrap"
                @mousemove="mouseMove($event, 2)"
                @mouseleave="mouseLeave"
            >
                <VueSlickCarousel
                    id="services-slide-2"
                    class="services-slide"
                    v-bind="settings"
                    :rtl="true"
                >
                    <div
                        v-for="item in services.listTwo"
                        :key="item.id"
                        class="services-slide__box"
                    >
                        <span class="services-slide__text">{{ $t(item.name) }}</span>
                        <round-star-icon />
                    </div>
                </VueSlickCarousel>
            </div>

            <div
                class="services-slide__wrap"
                @mousemove="mouseMove($event, 3)"
                @mouseleave="mouseLeave"
            >
                <VueSlickCarousel
                    id="services-slide-3"
                    class="services-slide"
                    v-bind="settings"
                >
                    <div
                        v-for="item in services.listThree"
                        :key="item.id"
                        class="services-slide__box"
                    >
                        <span class="services-slide__text">{{ $t(item.name) }}</span>
                        <round-star-icon />
                    </div>
                </VueSlickCarousel>
            </div>

            <div
                class="services-slide__wrap"
                @mousemove="mouseMove($event, 4)"
                @mouseleave="mouseLeave"
            >
                <VueSlickCarousel
                    id="services-slide-4"
                    class="services-slide"
                    v-bind="settings"
                    :rtl="true"
                >
                    <div
                        v-for="item in services.listFour"
                        :key="item.id"
                        class="services-slide__box"
                    >
                        <span class="services-slide__text">{{ $t(item.name) }}</span>
                        <round-star-icon />
                    </div>
                </VueSlickCarousel>
            </div>

            <div
                id="services-btn"
                class="services__btn"
                :style="{opacity: sliderHover ? 1 : 0}"
            >
                {{ $t(textButton) }}
            </div>
        </div>
    </section>
</template>

<script>
import RoundStarIcon from '~/assets/icons/round-star.svg?inline';

export default {
    name: 'ServicesSection',
    components: { RoundStarIcon },
    data() {
        return {
            sliderHover: null,
            settings: {
                centerMode: true,
                swipe: false,
                arrows: false,
                dots: false,
                infinite: true,
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 10000,
                autoplaySpeed: 0,
                cssEase: 'linear',
                pauseOnHover: false
            },
            services: {
                listOne: [
                    {
                        id: 1,
                        name: 't_services__list_one_1'
                    },
                    {
                        id: 2,
                        name: 't_services__list_one_2'
                    },
                    {
                        id: 3,
                        name: 't_services__list_one_3'
                    },
                    {
                        id: 4,
                        name: 't_services__list_one_4'
                    },
                    {
                        id: 5,
                        name: 't_services__list_one_5'
                    },
                    {
                        id: 6,
                        name: 't_services__list_one_6'
                    }
                ],
                listTwo: [
                    {
                        id: 1,
                        name: 't_services__list_two_1'
                    },
                    {
                        id: 2,
                        name: 't_services__list_two_2'
                    },
                    {
                        id: 3,
                        name: 't_services__list_two_3'
                    },
                    {
                        id: 4,
                        name: 't_services__list_two_4'
                    },
                    {
                        id: 5,
                        name: 't_services__list_two_5'
                    }
                ],
                listThree: [
                    {
                        id: 1,
                        name: 't_services__list_three_1'
                    },
                    {
                        id: 2,
                        name: 't_services__list_three_2'
                    },
                    {
                        id: 3,
                        name: 't_services__list_three_3'
                    },
                    {
                        id: 4,
                        name: 't_services__list_three_4'
                    }
                ],
                listFour: [
                    {
                        id: 1,
                        name: 't_services__list_four_1'
                    },
                    {
                        id: 2,
                        name: 't_services__list_four_2'
                    },
                    {
                        id: 3,
                        name: 't_services__list_four_3'
                    }
                ]
            }
        };
    },
    computed: {
        textButton() {
            switch (this.sliderHover) {
                case 1:
                    return 't_services__btn_1';
                case 2:
                    return 't_services__btn_2';
                case 3:
                    return 't_services__btn_3';
                case 4:
                    return 't_services__btn_4';
                default:
                    return '';
            }
        }
    },
    methods: {
        mouseMove(e, value) {
            const button = document.getElementById('services-btn');
            const buttonRect = button.getBoundingClientRect();

            this.sliderHover = value;

            this.$gsap.to(button, {
                x: `${e.layerX - buttonRect.width / 2}px`,
                y: `${e.layerY - buttonRect.height / 2}px`,
                opacity: 1,
                ease: 'power1',
                duration: 0
            });
        },
        mouseLeave() {
            const button = document.getElementById('services-btn');

            this.$gsap.to(button, {
                opacity: 0,
                ease: 'power3',
                duration: 0
            });
        }
    }
};
</script>
