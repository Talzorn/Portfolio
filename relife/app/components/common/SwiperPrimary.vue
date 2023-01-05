<template>
    <swiper
        class="swiper-primary"
        :loop="list >= 3"
        :slides-per-view="'auto'"
        :space-between="20"
    >
        <template v-if="isLoadData">
            <swiper-slide
                class="swiper-primary__box"
                v-for="item in 4"
                :key="item"
            >
                <ion-skeleton-text animated style="border-radius: 16px;" />
            </swiper-slide>
        </template>

        <template v-else>
            <swiper-slide
                class="swiper-primary__box ion-activatable ripple-parent"
                v-for="item in list"
                :key="item.id"
                @click="toPost(item.id)"
            >
                <ion-img :src="item.image"/>
                <div class="swiper-primary__text">
                    <span>{{ item.title }}</span>
                </div>
                <ion-ripple-effect />
            </swiper-slide>
        </template>
    </swiper>
</template>

<script>
import { IonImg, IonRippleEffect, IonSkeletonText } from "@ionic/vue";
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
    name: "SliderPrimary",
    components: { Swiper, SwiperSlide, IonImg, IonRippleEffect, IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        isLoadData: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toPost(id) {
            this.$router.push({name: 'article', params: { id } });
        },
    }
}
</script>
