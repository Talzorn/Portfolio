<template>
    <home-layout
        :content-id="'home-profile-content'"
        :page-class="'profile-page'"
        :page-title="profile?.nickname"
        :scroll-btn-top="true"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                router-link="/search"
            >
                <ion-icon :icon="require('@/assets/icons/search-icon.svg')"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end"
                v-if="profile"
                @click="$refs.share.show()"
            >
                <ion-icon :icon="require('@/assets/icons/share-icon.svg')" style="font-size: 22px"/>
            </ion-button>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="end" style="margin-left: 12px"
                @click="sheet = true"
            >
                <ion-icon :icon="require('@/assets/icons/more-icon.svg')" style="font-size: 22px"/>
            </ion-button>
        </template>

        <profile-main-section
            v-model:profile-data="profile"
            v-model:sheet-menu="sheet"
        />

        <share
            v-if="profile"
            ref="share"
            :title="profile.full_name + ' | @' + profile.nickname"
            :text="$t('title.from_app')
                + '\n\n' + $t('title.user') + profile.full_name + ' | @' + profile.nickname
                + '\n\n' + profile.short_description
                + '\n\n' + $t('title.more')"
            :link="'/users/'+ profile.nickname"
        />
    </home-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import ProfileMainSection from "@/components/home/profile";
import Share from "@/components/modals/Share";

export default {
    name: "ProfileMain",
    components: {ProfileMainSection, IonButton, IonIcon, Share },
    data() {
        return {
            sheet: false,
            profile: null
        }
    }
}
</script>
