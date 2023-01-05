<template>
    <div class="tab-swipe">
        <div
            ref="tabSwipe__track"
            class="tab-swipe__track"
        >
            <div
                class="tab-swipe__selected"
                :style="{
                    width: carriage.width + 'px',
                    transform: 'translateX(' + carriage.positionX + 'px)'
                }"
            />
            <button
                v-for="item in list"
                :key="item.id"
                :ref="'tabSwipe__' + item.id"
                :class="{active: selected === item.id}"
                type="button"
                class="tab-swipe__btn"
                @click="handleTab(item.id)"
            >
                <span
                    v-if="item.icon"
                    class="icon"
                    v-html="item.icon"
                />
                {{ item.name }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabSwipe',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
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
        };
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
            const element = this.$refs[`tabSwipe__${id}`][0];
            const elementRect = element.getBoundingClientRect();
            const trackRect = this.$refs.tabSwipe__track.getBoundingClientRect();

            this.$emit('update:selected', id);
            this.carriage.width = elementRect.width;
            this.carriage.positionX = Math.abs(trackRect.left - elementRect.left);
        }
    }
};
</script>
