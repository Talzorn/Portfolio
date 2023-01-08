<template>
    <div class="hw-slider">
        <div class="hw-slider__colum-text">
            <client-only>
                <div class="hw-slider-text">
                    <div
                        v-for="(item, index) in items"
                        :key="index"
                        class="hw-slider-text__box"
                        :class="{active: index === selectedItem}"
                        @click="selectedItem = index"
                    >
                        <p class="hw-slider-text__title">
                            {{ $t(item.title) }}
                        </p>
                        <span class="hw-slider-text__text">{{ $t(item.text) }}</span>
                    </div>
                </div>
            </client-only>
        </div>

        <div class="hw-slider__colum-img">
            <div
                class="hw-slider-img"
                @mouseover="slideFocus = true"
                @mouseout="slideFocus = false"
            >
                <transition name="hw-slider">
                    <div
                        :key="selectedItem"
                        class="hw-slider-img__box"
                    >
                        <img
                            alt="phone image"
                            class="hw-slider-img__img"
                            :src="require('~/assets/images/' + $i18n.locale + '/' + getSlide.img)"
                        >
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
let timeID;

export default {
    name: 'HowWorksSlider',
    data() {
        return {
            slideFocus: false,
            selectedItem: 0,
            items: [
                {
                    title: 't_how_works__broker_title_1',
                    text: 't_how_works__broker_desc_1',
                    img: 'hw-phone-agent__step-1.png'
                },
                {
                    title: 't_how_works__broker_title_2',
                    text: 't_how_works__broker_desc_2',
                    img: 'hw-phone-agent__step-2.png'
                },
                {
                    title: 't_how_works__broker_title_3',
                    text: 't_how_works__broker_desc_3',
                    img: 'hw-phone-agent__step-3.png'
                },
                {
                    title: 't_how_works__broker_title_4',
                    text: 't_how_works__broker_desc_4',
                    img: 'hw-phone-agent__step-4.png'
                }
            ]
        };
    },
    computed: {
        getSlide() {
            return this.items[this.selectedItem];
        }
    },
    watch: {
        selectedItem() {
            clearInterval(timeID);
            // this.moveSlide();
        }
    },
    mounted() {
        // this.moveSlide();
    },
    methods: {
        moveSlide() {
            timeID = setInterval(() => {
                let newIndex = this.selectedItem + 1;

                if (newIndex >= this.items.length) {
                    newIndex = 0;
                }

                if (!this.slideFocus) {
                    this.selectedItem = newIndex;
                }
            }, 4000);
        }
    }
};
</script>
