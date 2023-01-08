<template>
    <home-layout page-class="home" page-title="Главная">
        <swiper
            class="home-slider"
            :modules="modules"
            :pagination="true"
            :loop="true"
            :slides-per-view="'auto'"
            :space-between="20"
            :autoplay="{
                delay: 5000,
                disableOnInteraction: false,
            }"
        >
            <swiper-slide>
                <div class="profile-card profile-card--purple">
                    <h3 class="profile-card__text">Приглашайте людей и получайте бонусы!</h3>
                    <ion-button class="btn btn--dark" size="small" expand="block"
                        router-link="/profile/invition"
                    >Пригалисть</ion-button>
                    <ion-img class="computer" :src="require('@/assets/images/computer--shadow.png')" alt="computer" />
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="profile-card profile-card--orange">
                    <h3 class="profile-card__text">Попробуйте первый перевод</h3>
                    <ion-button class="btn btn--dark" size="small" expand="block"
                        router-link="/home/transfer"
                    >Попробывать</ion-button>
                    <ion-img class="mountains" :src="require('@/assets/images/mountains-desing.png')" alt="mountains" />
                    <ion-img class="eth" :src="require('@/assets/images/eth-design.png')" alt="eth" />
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="profile-card profile-card--pink">
                    <h3 class="profile-card__text">Информация которая вам поможет</h3>
                    <ion-button class="btn btn--dark" size="small" expand="block"
                        router-link="/profile/info"
                    >Подробнее</ion-button>
                    <ion-img class="square-group" :src="require('@/assets/images/square-group-design.png')" alt="square-group" />
                </div>
            </swiper-slide>
        </swiper>
        <div class="wrapper">
            <h2>Навигация</h2>
            <div class="home__grid">
                <ion-card
                    class="home__box ion-activatable"
                    router-link="/home/transfer"
                >
                    <div class="circle-img purple">
                        <ion-icon :icon="require('@/assets/icons/nav-swap.svg')"></ion-icon>
                    </div>
                    <p class="text--small">Перевод</p>
                    <ion-ripple-effect mode="ios"></ion-ripple-effect>
                </ion-card>
                <ion-card
                    class="home__box ion-activatable"
                    router-link="/profile/invition"
                >
                    <div class="circle-img red" style="font-size: 16px">
                        <ion-icon :icon="require('@/assets/icons/plus-icon.svg')"></ion-icon>
                    </div>
                    <p class="text--small">Приглашение</p>
                    <ion-ripple-effect mode="ios"></ion-ripple-effect>
                </ion-card>
                <ion-card
                    class="home__box home__box--big ion-activatable"
                    router-link="/home/order"
                >
                    <div class="circle-img green">
                        <ion-icon :icon="require('@/assets/icons/nav-offer.svg')"></ion-icon>
                    </div>
                    <p class="text--small">Панель агента</p>
                    <ion-ripple-effect mode="ios"></ion-ripple-effect>
                </ion-card>
                <ion-card
                    class="home__box ion-activatable"
                    router-link="/home/profile"
                >
                    <div class="circle-img blue">
                        <ion-icon :icon="require('@/assets/icons/user-icon.svg')"></ion-icon>
                    </div>
                    <p class="text--small">Профиль</p>
                    <ion-ripple-effect mode="ios"></ion-ripple-effect>
                </ion-card>
                <ion-card
                    class="home__box ion-activatable"
                    router-link="/bank-card"
                >
                    <div class="circle-img orange">
                        <ion-icon :icon="require('@/assets/icons/bank-card-icon.svg')"></ion-icon>
                    </div>
                    <p class="text--small">Банковская карта</p>
                    <ion-ripple-effect mode="ios"></ion-ripple-effect>
                </ion-card>
            </div>

            <ion-button class="btn btn--primary" size="large" expand="block" router-link="/all" style="margin-top: 24px">All Elements</ion-button>
        </div>
    </home-layout>
</template>

<script>
import { IonImg, IonRippleEffect, IonIcon, IonButton, IonCard } from '@ionic/vue';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
    name: "HomeMain",
    components: { Swiper, SwiperSlide, IonImg, IonRippleEffect, IonIcon, IonButton, IonCard },
    data() {
        return {
            modules: [ Pagination, Autoplay ],
        };
    }
}
</script>