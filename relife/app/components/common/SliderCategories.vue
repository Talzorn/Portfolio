<template>
    <div class="slider-category slider-default">
        <div class="slider-default__track">
            <template v-if="isLoadData">
                <div
                    class="slider-category__box ripple-parent" style="background-color: transparent;border: unset"
                    v-for="item in 5"
                    :key="item"
                >
                    <ion-skeleton-text animated />
                </div>
            </template>

            <template v-else>
                <template v-if="list.length">
                    <div
                        class="slider-category__box ion-activatable ripple-parent"
                        v-for="item in list"
                        :key="item.id"
                        @click="toCategory(item.id)"
                    >
                        <ion-icon :src="require('@/assets/icons/categories/' + item.slug + '.svg')"/>
                        <span class="slider-category__title"
                            :style="{'font-size': fontSize + 'px'}"
                        >
                            {{ item.name }}
                        </span>
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
import { IonIcon, IonRippleEffect, IonSkeletonText } from "@ionic/vue";

export default {
    name: "SliderCategories",
    components: { IonIcon, IonRippleEffect, IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: null
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
        toCategory(id) {
            this.sheetCategories = false;
            this.$router.push({ name: 'article-category-page', params: {
                id
            }});
        },
    }
}
</script>
