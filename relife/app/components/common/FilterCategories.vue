<template>
    <div class="filter-categories">
        <div class="select-list" style="margin-bottom: 32px;"
            v-if="selected.length && list.length && !selected.includes(0)"
        >
            <span class="select-list__title">{{ $t('title.selected_rubrics') }}</span>
            <ion-card class="select-list__item active ion-activatable ripple-parent" style="pointer-events: auto"
                v-for="item in selected"
                :key="item"
                @click="deleteElement(item)"
            >
                <ion-img class="rubric-box__img" :src="require('@/assets/icons/categories/' + getIcons(item) + '.svg')"/>
                {{ getText(item) }}
                <ion-icon class="close" :icon="require('@/assets/icons/close-icon--wrap.svg')"/>
                <ion-ripple-effect />
            </ion-card>
        </div>

        <div
            class="select-list"
            v-if="isLoadData"
        >
            <span class="select-list__title">{{ $t('title.all_rubrics') }}</span>
            <div
                class="select-list__item"
                v-for="(item, index) in 6"
                :key="index"
            >
                <ion-skeleton-text animated style="width: 100%;line-height: 26px;" />
            </div>
        </div>

        <div class="select-list"
            v-else
        >
            <template v-if="list.length">
                <span class="select-list__title">{{ $t('title.all_rubrics') }}</span>
                <ion-card class="select-list__item ion-activatable ripple-parent" style="pointer-events: auto"
                    v-for="item in list"
                    :key="item.id"
                    @click="setElement(item.id)"
                    :class="{active: choice.indexOf(item.id) !== -1}"
                >
                    <ion-img class="rubric-box__img" :src="require('@/assets/icons/categories/' + item.slug + '.svg')"/>
                    {{ item.name }}
                    <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                    <ion-ripple-effect />
                </ion-card>
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
import { IonRippleEffect, toastController, IonIcon, IonCard, IonSkeletonText, IonImg } from "@ionic/vue";
import NoData from "@/components/common/NoData";

export default {
    name: "FilterCategories",
    components: {NoData, IonRippleEffect, IonIcon, IonCard, IonSkeletonText, IonImg },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        },
        selectedMax: {
            type: Number,
            default: null
        },
        minDelete: {
            type: Boolean,
            default: true
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
    watch: {
        selected: {
            deep: true,
            handler(val) {
                this.choice = val;
            }
        }
    },
    mounted() {
        this.choice = this.selected;
    },
    methods: {
        setElement(id) {
            if (this.choice.includes(0)) {
                this.choice = [];
            }
            const elementId = this.choice.find((item) => item === id);

            if (elementId) {
                const index = this.choice.indexOf(id);
                this.choice.splice(index, 1);
            } else {
                if (this.choice.length < this.selectedMax) {
                    this.choice.push(id);
                } else {
                    this.openToastDefault();
                }
            }
            this.$emit('update:selected', this.choice);
        },
        getText(id) {
            const method = this.list.find((item) => item.id === id);
            return method.name;
        },
        getIcons(id) {
            const method = this.list.find((item) => item.id === id);
            return method.slug;
        },
        deleteElement(id) {
            if (this.minDelete) {
                if (this.choice.length > 1) {
                    const index = this.choice.indexOf(id);
                    this.choice.splice(index, 1);
                } else {
                    this.openToastMin();
                }
            } else {
                const index = this.choice.indexOf(id);
                this.choice.splice(index, 1);
            }
            this.$emit('update:selected', this.choice);
        },
        async openToastDefault() {
            const toast = await toastController
                .create({
                    message: this.$t('notifications.select_more_1') + this.selectedMax + this.$t('notifications.select_more_2'),
                    duration: 2000,
                    position: 'top',
                    cssClass: 'default overlay-hide',
                    buttons: [
                        {
                            role: 'cancel',
                            handler: () => {
                                toast.onDidDismiss()
                            }
                        }
                    ]
                })
            return toast.present();
        },
        async openToastMin() {
            const toast = await toastController
                .create({
                    message: this.$t('notifications.rubrics_selected'),
                    duration: 2000,
                    position: 'top',
                    cssClass: 'default overlay-hide',
                    buttons: [
                        {
                            role: 'cancel',
                            handler: () => {
                                toast.onDidDismiss()
                            }
                        }
                    ]
                })
            return toast.present();
        }
    }
}
</script>
