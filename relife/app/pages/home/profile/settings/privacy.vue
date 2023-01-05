<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-title="$t('profile.privacy')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                @click="$router.back()"
            >
                <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
            </ion-button>
        </template>

        <filter-toggle style="margin-top: 14px"
            :list="needed.list"
            v-model:selected="needed.selected"
        />
    </default-layout>
</template>

<script>
import { IonIcon, IonButton } from "@ionic/vue";
import FilterToggle from "@/components/common/FilterToggle";

export default {
    name: "SettingPrivacy",
    components: {FilterToggle, IonIcon, IonButton },
    data() {
        return {
            needed: {
                selected: [1],
                list: [
                    {
                        id: 1,
                        text: this.$t('profile.display_flag')
                    }
                ]
            }
        }
    }
}
</script>