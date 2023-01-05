<template>
    <div class="filter">
        <div class="filter__box" style="margin-bottom: 24px"
            v-if="selected.length"
        >
            <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('selected_items') }}</span>
            <label class="checked ion-activatable ripple-parent"
                v-for="item in selectedList"
                :key="item.id"
            >
                <input type="checkbox"
                    v-model="choice"
                    :value="item.id"
                >
                <span class="checked__square">
                    <ion-icon :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                </span>
                <span class="checked__text">{{ item.name }}</span>
                <ion-ripple-effect />
            </label>
        </div>

        <div class="filter__box"
            v-if="isLoadData"
        >
            <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('all_items') }}</span>
            <div class="checked"
                v-for="item in 6"
                :key="item"
            >
                <ion-skeleton-text animated style="line-height: 26px;" />
            </div>
        </div>
        <div class="filter__box"
            v-else
        >
            <template v-if="items.length">
                <span class="checked__main-title" style="margin-bottom: 4px;">{{ $t('all_items') }}</span>
                <label class="checked ion-activatable ripple-parent"
                    v-for="item in items"
                    :key="item.id"
                >
                    <input type="checkbox"
                        v-model="choice"
                        :value="item.id"
                    >
                    <span class="checked__square">
                        <ion-icon :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                    </span>
                    <span class="checked__text">{{ item.name }}</span>
                    <ion-ripple-effect />
                </label>
            </template>
            <template v-else>
                <no-data
                    :title="'search_not_found'"
                />
            </template>
        </div>
    </div>
</template>

<script>
import { IonIcon, IonRippleEffect, IonSkeletonText} from "@ionic/vue";
import NoData from "@/components/common/NoData";

export default {
    name: "FilterChecked",
    components: {NoData, IonRippleEffect, IonIcon, IonSkeletonText },
    props: {
        search: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        },
        isLoadData: {
            type: Boolean,
            default: false
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
    },
    computed: {
        items() {
            const items = this.list;

            if (this.search) {
                return items.filter((item) => item.name.toLocaleLowerCase()
                    .indexOf(this.search.toLocaleLowerCase()) !== -1
                )
            }

            return items;
        },
        selectedList() {
            return this.list.filter((item) => this.choice.includes(item.id))
        }
    }
}
</script>
