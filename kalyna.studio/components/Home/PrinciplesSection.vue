<template>
    <section
        id="principles"
        class="principles"
    >
        <div class="wrapper">
            <h2 class="anim anim-opacity">
                <round-star-icon /> {{ $t('t_principles_h2') }}
            </h2>

            <div class="principles__cont anim anim-opacity">
                <div
                    id="principles-1"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">01</span>
                        <span class="principles__title">{{ $t('t_principles_title_1') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_1') }}</span>
                </div>

                <div
                    id="principles-2"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">02</span>
                        <span class="principles__title">{{ $t('t_principles_title_2') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_2') }}</span>
                </div>

                <div
                    id="principles-3"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">03</span>
                        <span class="principles__title">{{ $t('t_principles_title_3') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_3') }}</span>
                </div>

                <div
                    id="principles-4"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">04</span>
                        <span class="principles__title">{{ $t('t_principles_title_4') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_4') }}</span>
                </div>

                <div
                    id="principles-5"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">05</span>
                        <span class="principles__title">{{ $t('t_principles_title_5') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_5') }}</span>
                </div>

                <div
                    id="principles-6"
                    class="principles__box"
                >
                    <div class="principles__group">
                        <span class="principles__number">06</span>
                        <span class="principles__title">{{ $t('t_principles_title_6') }}</span>
                    </div>
                    <span class="principles__desc">{{ $t('t_principles_desc_6') }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import RoundStarIcon from '~/assets/icons/round-star.svg?inline';

export default {
    name: 'PrinciplesSection',
    components: { RoundStarIcon },
    data() {
        return {
            mainBg: false
        };
    },
    watch: {
        mainBg() {
            if (this.mainBg) {
                document.querySelector('main').classList.add('bg-green');
            } else {
                document.querySelector('main').classList.remove('bg-green');
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.principlesTrigger();
        }, 500);
    },
    methods: {
        principlesTrigger() {
            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles',
                    scrub: true,
                    markers: false,
                    start: '+=470 bottom',
                    end: 'bottom +=400',
                    onToggle: () => {
                        console.log(111);
                        this.mainBg = !this.mainBg;
                    }
                }
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-1',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-1', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-2',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-2', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-3',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-3', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-4',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-4', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-5',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-5', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });

            this.$gsap.timeline({
                scrollTrigger: {
                    trigger: '#principles-6',
                    scrub: true,
                    markers: false,
                    start: 'top bottom',
                    end: 'bottom +=300'
                }
            }).from('#principles-6', {
                x: 400,
                duration: 1,
                ease: 'power1'
            });
        }
    }
};
</script>
