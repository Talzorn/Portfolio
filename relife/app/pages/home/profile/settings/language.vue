<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-title="$t('profile.language')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                @click="$router.back()"
            >
                <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
            </ion-button>
        </template>

        <div class="select-list">
            <ion-card
                class="select-list__item ion-activatable ripple-parent"
                v-for="item in country"
                :key="item.id"
                @click="setElement(item.locale)"
                :class="{active: $i18n.locale === item.locale}"
            >
                <ion-img class="select-list__flag" :src="require('@/assets/icons/flags/' + item.flag)"/>
                {{ $t(item.text) }}
                <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')"/>
                <ion-ripple-effect />
            </ion-card>
        </div>
    </default-layout>
</template>

<script>
import { IonIcon, IonButton, IonCard, IonImg, IonRippleEffect } from "@ionic/vue";
import { Preferences } from '@capacitor/preferences'
import { mapActions } from 'vuex'

export default {
    name: "SettingLanguage",
    components: { IonIcon, IonButton, IonCard, IonImg, IonRippleEffect },
    data() {
        return {
            country: [
                {
                    id: 1,
                    flag: 'rus.jpg',
                    text: 'profile.lang_rus',
                    locale: 'ru'
                },
                {
                    id: 2,
                    flag: 'gbr.jpg',
                    text: 'profile.lang_eng',
                    locale: 'en'
                }
            ]
        }
    },
    methods: {
        ...mapActions({
            getProfile: 'user/getProfile'
        }),
        async setElement(value) {
            this.$i18n.locale = value;
            await Preferences.set({
                key: 'lang',
                value: value
            });
            this.$router.back();
            this.getProfile().then(() => {
                window.location.reload();
            });
        }
    }
}
</script>
