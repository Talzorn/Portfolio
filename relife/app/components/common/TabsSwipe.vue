<template>
    <div class="tab-swipe">
        <div class="tab-swipe__track"
            ref="tabSwipe__track"
        >
            <template v-if="!list.length">
                <div class="tab-swipe__btn" style="min-width: 92px;"
                    v-for="item in 5"
                    :key="item"
                >
                    <ion-skeleton-text animated />
                </div>
            </template>

            <template v-else>
                <span id="tab-selected" class="tab-swipe__selected"
                    :style="{
                        width: carrWidth + 'px',
                        transform: 'translateX(' + carrPosition + 'px)'
                    }"
                ></span>
                <span class="tab-swipe__btn"
                    v-for="item in list"
                    :key="item.id"
                    :ref="'tabSwipe__' + item.id"
                    @click="handleTab(item.id)"
                    :class="{active: selected === item.id}"
                >{{ $t(item.text) }}</span>
            </template>
        </div>
    </div>
</template>

<script>
import { IonSkeletonText } from "@ionic/vue";

export default {
    name: "TabsSwipe",
    components: { IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Number,
            default: null
        },
        carrWidth: {
            type: Number,
            default: null
        },
        carrPosition: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            carriage: {
                width: null,
                positionX: null
            }
        }
    },
    watch: {
        selected() {
            this.handleTab(this.selected);
        }
    },
    mounted() {
        setTimeout(() => {
            this.handleTab(this.selected);
        }, 100);
    },
    methods: {
        handleTab(id) {
            const element = this.$refs['tabSwipe__' + id][0];
            const elementRect = element.getBoundingClientRect();

            this.$emit('update:selected', id);
            this.$emit('update:carrWidth', elementRect.width);
            this.$emit('update:carrPosition', element.offsetLeft);
        }
    }
}
</script>
