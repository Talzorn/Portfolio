<template>
    <div class="filter">
        <template v-if="!list.length">
            <div class="toggle-box"
                v-for="item in 6"
                :key="item"
            >
                <ion-skeleton-text animated style="line-height: 26px;" />
            </div>
        </template>
        <template v-else>
            <div class="toggle-box"
                v-for="item in list"
                :key="item.id"
            >
                <span class="toggle-box__text">{{ item.text }}</span>
                <label class="toggle">
                    <input type="checkbox"
                        v-model="choice"
                        :value="item.id"
                    >
                    <span class="toggle__line"></span>
                </label>
            </div>
        </template>
    </div>
</template>

<script>
import { IonSkeletonText} from "@ionic/vue";

export default {
    name: "FilterToggle",
    components: { IonSkeletonText },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            choice: []
        }
    },
    mounted() {
        this.choice = this.selected;
    },
    watch: {
        choice: {
            deep: true,
            handler() {
                this.$emit('update:selected', this.choice);
            }
        }
    }
}
</script>