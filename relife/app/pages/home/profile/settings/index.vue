<template>
    <default-layout
        :page-title="$t('profile.settings')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                @click="$router.back()"
            >
                <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
            </ion-button>
        </template>

        <div class="select-list select-list--full" style="margin-top: 14px">
            <ion-card class="select-list__item ion-activatable ripple-parent"
                v-for="item in list"
                :key="item.id"
                :router-link="item.link"
            >
                <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/' + item.icon)"/>
                {{ $t(item.name) }}
                <div class="select-list__icon--arrow">
                    <ion-icon :icon="require('@/assets/icons/arrow-right-icon.svg')"/>
                </div>
                <ion-ripple-effect />
            </ion-card>

            <ion-card class="select-list__item ion-activatable ripple-parent"
                @click="$router.push({name: 'tutorial', params: {type: 1}})"
            >
                <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/info-circle-icon.svg')"/>
                {{ $t('profile.tutorial') }}
                <div class="select-list__icon--arrow">
                    <ion-icon :icon="require('@/assets/icons/arrow-right-icon.svg')"/>
                </div>
                <ion-ripple-effect />
            </ion-card>

            <ion-card class="select-list__item ion-activatable ripple-parent"
                href="https://t.me/+o05jqEDAYXA5NGVi"
            >
                <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/danger-icon.svg')"/>
                {{ $t('profile.report_problem') }}
                <ion-ripple-effect />
            </ion-card>

            <ion-card @click="logout" class="select-list__item ion-activatable ripple-parent">
                <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/logout-icon.svg')"/>
                {{ $t('profile.exit') }}
                <ion-ripple-effect />
            </ion-card>
        </div>
    </default-layout>
</template>

<script>
import { IonCard, IonIcon, IonRippleEffect, IonButton } from "@ionic/vue";
import { mapActions } from 'vuex'

export default {
    name: "ProfileSettings",
    components: { IonRippleEffect, IonIcon, IonCard, IonButton },
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'profile.account',
                    icon: 'profile-menu.svg',
                    link: '/profile/settings/account'
                },
                /*{
                    id: 2,
                    name: 'profile.privacy',
                    icon: 'lock-icon.svg',
                    link: '/profile/settings/privacy'
                },*/
                {
                    id: 3,
                    name: 'profile.language',
                    icon: 'earth-icon.svg',
                    link: '/profile/settings/language'
                },
                {
                    id: 4,
                    name: 'profile.theme',
                    icon: 'sun-icon.svg',
                    link: '/profile/settings/theme'
                }
            ]
        }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        })
    },
}
</script>
