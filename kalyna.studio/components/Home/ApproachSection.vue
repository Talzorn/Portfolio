<template>
    <section
        id="approach"
        class="approach"
    >
        <div class="approach__sticky">
            <div class="wrapper">
                <h2
                    id="approach__h2"
                    class="anim-opacity"
                >
                    <round-star-icon /> {{ $t('t_approach__h2') }}
                </h2>
                <div class="approach__cont anim">
                    <div
                        v-for="item in list"
                        :id="'approach__block-' + item.id"
                        :key="item.id"
                        class="approach__block"
                        :style="{transform: step > item.id ? 'translateY(-114%)' : 'translateY(0%)', 'z-index': item.z_index}"
                    >
                        <div class="approach__colum">
                            <div class="approach__group">
                                <h3 class="anim-up">
                                    <img
                                        :src="require('~/assets/images/' + item.icon_text)"
                                        alt="approach icon"
                                    >
                                    {{ $t(item.title) }}
                                </h3>
                                <span
                                    class="approach__text anim-up"
                                    v-html="$t(item.description)"
                                />
                            </div>
                            <span class="approach__pagination anim-opacity"><b>{{ item.id }} - {{ menu.length }}</b>{{ $t('t_approach__menu_' + item.id) }}</span>
                        </div>
                        <div class="approach__icon anim-opacity">
                            <img
                                :src="require('~/assets/images/' + item.icon)"
                                alt="approach icon"
                            >
                        </div>
                    </div>

                    <div
                        id="approach-menu"
                        class="approach-menu anim-up"
                    >
                        <div class="approach-menu__cont">
                            <div class="approach-menu__line">
                                <span :style="{height: step === 1 ? 1 + '%' : (100 / (menu.length - 1)) * (step - 1) - 1 + '%'}" />
                            </div>
                            <div class="approach-menu__box">
                                <span
                                    v-for="item in menu"
                                    :key="item.id"
                                    class="approach-menu__text"
                                    :class="{active: step === item.id}"
                                >{{ $t(item.name) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="approach-menu__mobile-pag"
                class="approach-menu__mobile-pag anim-opacity"
                :style="{width: step === 1 ? 0 + '%' : (100 / (menu.length - 1)) * (step - 1) - 1 + '%'}"
            />
        </div>
        <div
            v-for="item in menu"
            :id="'approach__step-' + item.id"
            :key="item.id"
        />
    </section>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import RoundStarIcon from '~/assets/icons/round-star.svg?inline';

export default {
    name: 'ApproachSection',
    components: { RoundStarIcon },
    data() {
        return {
            step: 1,
            menu: [
                {
                    id: 1,
                    name: 't_approach__menu_1'
                },
                {
                    id: 2,
                    name: 't_approach__menu_2'
                },
                {
                    id: 3,
                    name: 't_approach__menu_3'
                },
                {
                    id: 4,
                    name: 't_approach__menu_4'
                },
                {
                    id: 5,
                    name: 't_approach__menu_5'
                },
                {
                    id: 6,
                    name: 't_approach__menu_6'
                }
            ],
            list: [
                {
                    id: 1,
                    title: 't_approach__h3_1',
                    description: 't_approach__desc_1',
                    icon: 'approach-1.svg',
                    icon_text: 'approach-text-icon-1.svg',
                    z_index: 6
                },
                {
                    id: 2,
                    title: 't_approach__h3_2',
                    description: 't_approach__desc_2',
                    icon: 'approach-2.svg',
                    icon_text: 'approach-text-icon-2.svg',
                    z_index: 5
                },
                {
                    id: 3,
                    title: 't_approach__h3_3',
                    description: 't_approach__desc_3',
                    icon: 'approach-3.svg',
                    icon_text: 'approach-text-icon-3.svg',
                    z_index: 4
                },
                {
                    id: 4,
                    title: 't_approach__h3_4',
                    description: 't_approach__desc_4',
                    icon: 'light/values-2.svg',
                    icon_text: 'approach-text-icon-4.svg',
                    z_index: 3
                },
                {
                    id: 5,
                    title: 't_approach__h3_5',
                    description: 't_approach__desc_5',
                    icon: 'approach-5.svg',
                    icon_text: 'approach-text-icon-5.svg',
                    z_index: 2
                },
                {
                    id: 6,
                    title: 't_approach__h3_6',
                    description: 't_approach__desc_6',
                    icon: 'light/values-1.svg',
                    icon_text: 'approach-text-icon-6.svg',
                    z_index: 1
                }
            ]
        };
    },
    mounted() {
        setTimeout(() => {
            this.approachTrigger();
        }, 500);
    },
    methods: {
        approachTrigger() {
            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-1',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 1;
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-1',
                    scrub: true,
                    markers: false,
                    start: '+=300 bottom',
                    onEnter: () => {
                        document.getElementById('approach__block-1').classList.add('active');
                        document.getElementById('approach__h2').classList.add('fade-opacity');
                        document.getElementById('approach-menu__mobile-pag').classList.add('fade-opacity');
                        document.getElementById('approach-menu').classList.add('fade-up');
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-2',
                    scrub: true,
                    markers: false,
                    start: '+=400 bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 2;
                    },
                    onEnter: () => {
                        document.getElementById('approach__block-2').classList.add('active');
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-3',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 3;
                    },
                    onEnter: () => {
                        document.getElementById('approach__block-3').classList.add('active');
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-4',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 4;
                    },
                    onEnter: () => {
                        document.getElementById('approach__block-4').classList.add('active');
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-5',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 5;
                    },
                    onEnter: () => {
                        document.getElementById('approach__block-5').classList.add('active');
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#approach__step-6',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    onToggle: () => {
                        this.step = 6;
                    },
                    onEnter: () => {
                        document.getElementById('approach__block-6').classList.add('active');
                    }
                }
            });
        }
    }
};
</script>
