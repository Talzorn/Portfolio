<template>
    <div class="slider-primary slider-default">
        <div class="slider-default__track">
            <template v-if="isLoadData">
                <div class="slider-primary__box" style="background-color: transparent;border: unset"
                    v-for="item in 5"
                    :key="item"
                >
                    <ion-skeleton-text animated />
                </div>
            </template>

            <template v-else>
                <template v-if="list.length">
                    <div
                        class="slider-primary__box ion-activatable ripple-parent"
                        v-for="item in list"
                        :key="item.id"
                    >
                        <div class="slider-primary__title">
                            <span>{{ item.title }}</span>
                        </div>
                        <ion-img class="slider-primary__img" :src="require('@/assets/images/' + item.img)"/>
                        <span class="karma-square">{{ bigNumberFormat(item.carma) }}<b>{{ $t('carma') }}</b></span>
                        <ion-ripple-effect />
                    </div>
                </template>
                <template v-else>
                    <div class="slider__no-data" style="height: 120px;width: 100vw;padding: 0 20px;">
                        <span>{{ noData }}</span>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import { IonImg, IonRippleEffect, IonSkeletonText } from "@ionic/vue";
import { bigNumberFormat } from "@/helpers/number";

export default {
    name: "SliderPrimary",
    components: { IonImg, IonRippleEffect, IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        isLoadData: {
            type: Boolean,
            default: false
        },
        noData: {
            type: String,
            default: ''
        }
    },
    methods: {
        bigNumberFormat
    }
}
</script>
