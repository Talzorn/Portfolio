<template>
    <default-layout
        :page-title="$t('profile.account')"
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
                {{ $t(item.name) }}
                <div class="select-list__icon--arrow">
                    <ion-icon :icon="require('@/assets/icons/arrow-right-icon.svg')"/>
                </div>
                <ion-ripple-effect />
            </ion-card>
            <ion-card class="select-list__item ion-activatable ripple-parent"
                @click="handleDeleteAccount"
            >
                {{ $t('profile.delete_account') }}
                <ion-ripple-effect />
            </ion-card>
        </div>
    </default-layout>
</template>

<script>
import { IonCard, IonIcon, IonRippleEffect, IonButton, alertController } from "@ionic/vue";
import { mapActions } from "vuex";
import axios from '@/helpers/axios';

export default {
    name: "SettingAccount",
    components: { IonRippleEffect, IonIcon, IonCard, IonButton },
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'profile.personal_info',
                    link: '/profile/settings/change-personal'
                },
                {
                    id: 2,
                    name: 'profile.about_me',
                    link: '/profile/settings/change-about'
                },
                {
                    id: 3,
                    name: 'profile.community',
                    link: '/profile/settings/change-community'
                },
                {
                    id: 4,
                    name: 'profile.change_password',
                    link: '/profile/settings/change-password'
                },
                /*{
                    id: 5,
                    name: 'profile.change_mail',
                    link: '/profile/settings/change-email'
                }*/
            ]
        }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        async handleDeleteAccount() {
            const alert = await alertController.create({
                header: this.$t('delete_account__title'),
                message: this.$t('delete_account__text'),
                cssClass: 'с-alert',
                buttons: [
                    {
                        text: this.$t('cancel'),
                        cssClass: 'с-alert__btn-confirm'
                    },
                    {
                        text: this.$t('delete'),
                        cssClass: 'с-alert__btn-cancel',
                        handler: () => {
                            this.deleteAccount()
                        }
                    },
                ],
            });

            await alert.present();
        },
        deleteAccount() {
            this.$store.commit('common/SET_NOTIFICATION_SHOW', true, {root: true})

            axios({
                method: 'delete',
                url: '/user',
            }).then(() => {
                this.logout();
            }).catch(() => {
                this.$store.commit('common/SET_NOTIFICATION_SHOW', false, {root: true})
            })
        }
    }
}
</script>
