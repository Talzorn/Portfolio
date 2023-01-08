<template>
    <home-layout page-class="home profile-page" content-class="profile-wrapper" page-title="Профиль">
        <div class="profile">
            <div class="profile-card profile-card--purple">
                <h3 class="profile-card__text">Приглашайте людей и получайте бонусы!</h3>
                <ion-button class="btn btn--dark" size="small" expand="block"
                    router-link="/profile/invition"
                >Пригалисть</ion-button>
                <ion-img class="computer" :src="require('@/assets/images/computer--shadow.png')" alt="computer" />
            </div>
            <div class="profile__block">
                <ion-card
                    class="profile__box"
                    @click="themeToggle"
                    style="overflow: unset;opacity: 1;"
                >
                    <div class="scheme-anim">
                        <transition-group name="scheme" mode="out-in">
                            <ion-icon v-if="themeColor" class="icon main-purple-2" :icon="require('@/assets/icons/moon-icon-profile.svg')" :key="1"></ion-icon>
                            <ion-icon v-else class="icon main-yellow" :icon="require('@/assets/icons/sun-icon-profile.svg')" :key="2"></ion-icon>
                        </transition-group>
                    </div>
                    <span class="profile__title">{{ themeText }}</span>
                </ion-card>
                <ion-card
                    class="profile__box"
                    router-link="/lang"
                >
                    <ion-icon class="icon main-blue" :icon="require('@/assets/icons/earth-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Язык</span>
                    <ion-icon class="arrow" :icon="require('@/assets/icons/down-arrow-icon.svg')"></ion-icon>
                </ion-card>
                <ion-card
                    class="profile__box"
                    router-link="/setting"
                >
                    <ion-icon class="icon main-red" :icon="require('@/assets/icons/settings-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Настройки</span>
                    <ion-icon class="arrow" :icon="require('@/assets/icons/down-arrow-icon.svg')"></ion-icon>
                </ion-card>
                <ion-card
                    class="profile__box"
                    router-link="/bank-card"
                >
                    <ion-icon class="icon main-orange" :icon="require('@/assets/icons/bank-card-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Банковские карты</span>
                    <ion-icon class="arrow" :icon="require('@/assets/icons/down-arrow-icon.svg')"></ion-icon>
                </ion-card>
                <ion-card
                    class="profile__box"
                    router-link="/profile/invition"
                >
                    <ion-icon class="icon main-pink" :icon="require('@/assets/icons/plus-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Приглашение</span>
                    <ion-icon class="arrow" :icon="require('@/assets/icons/down-arrow-icon.svg')"></ion-icon>
                </ion-card>
                <ion-card
                    class="profile__box"
                    router-link="/profile/info"
                >
                    <ion-icon class="icon main-purple" :icon="require('@/assets/icons/info-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Информация</span>
                    <ion-icon class="arrow" :icon="require('@/assets/icons/down-arrow-icon.svg')"></ion-icon>
                </ion-card>
                <ion-card class="profile__box">
                    <ion-icon class="icon main-green" :icon="require('@/assets/icons/help-icon-profile.svg')"></ion-icon>
                    <span class="profile__title">Поддержка</span>
                </ion-card>
            </div>
        </div>
    </home-layout>
</template>

<script>
import { IonIcon, IonButton, IonCard, IonImg } from '@ionic/vue';
import { mapGetters } from "vuex";

export default {
    name: "HomeProfile",
    components: { IonIcon, IonButton, IonCard, IonImg },
    computed: {
        ...mapGetters({
            themeColor: 'common/GET_THEME_COLOR'
        }),
        themeText() {
            return this.themeColor ? 'Темная тема' : 'Светлая тема';
        }
    },
    methods: {
        themeToggle() {
            this.$store.commit('common/SET_THEME_COLOR', !this.themeColor)
            if (this.themeColor) {
                document.body.classList.add('light');
            } else {
                document.body.classList.remove('light');
            }

        }
    }
}
</script>