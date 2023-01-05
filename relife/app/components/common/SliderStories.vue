<template>
    <div class="slider-stories slider-default">
        <div class="slider-default__track">
            <template v-if="!list.length">
                <div
                    class="slider-stories__box"
                    v-for="item in 5"
                    :key="item"
                >
                    <ion-skeleton-text animated style="height: 100%;--border-radius: 10px;" />
                </div>
            </template>

            <template v-else>
                <div
                    class="slider-stories__box card--default ion-activatable ripple-parent"
                    v-for="item in list"
                    :key="item.id"
                    :class="{new: item.new}"
                >
                    <div class="slider-stories__title">
                        <span>{{ item.title }}</span>
                    </div>
                    <ion-img class="slider-stories__img" :src="require('@/assets/images/' + item.img)"/>
                    <ion-ripple-effect />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { IonImg, IonRippleEffect, IonSkeletonText } from "@ionic/vue";

export default {
    name: "SliderStories",
    components: { IonImg, IonRippleEffect, IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>