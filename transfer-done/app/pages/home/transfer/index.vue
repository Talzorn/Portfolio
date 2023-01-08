<template>
    <home-layout page-class="home" content-class="wrapper-c" page-title="Перевод">
        <template v-slot:headerButton>
            <ion-button class="btn-icon" slot="end" router-link="/search">
                <ion-icon slot="icon-only" :icon="require('@/assets/icons/search-icon.svg')" style="font-size: 20px;"></ion-icon>
            </ion-button>
        </template>

        <template v-slot:tabsItem>
            <div class="c-tabs">
                <span class="c-tabs__tab"
                    @click="tabs = 1"
                    :class="{active: tabs === 1}"
                >Обмен</span>
                <span class="c-tabs__tab"
                    @click="openToastDefault"
                >Купить</span>
                <div class="c-tabs__bg"></div>
            </div>
        </template>

        <exchange-section />

        <template v-slot:scrollTop>
            <ion-button class="btn-icon">
                <ion-icon slot="icon-only" :icon="require('@/assets/icons/arrow-up-icon.svg')" style="font-size: 20px;"></ion-icon>
            </ion-button>
        </template>
    </home-layout>
</template>

<script>
import { toastController, IonIcon, IonButton } from '@ionic/vue';
import exchangeSection from '@/pages/home/transfer/exchange.vue';

export default {
    name: "HomeTransfer",
    components: { exchangeSection, IonIcon, IonButton },
    data() {
        return {
            tabs: 1
        }
    },
    methods: {
        async openToastDefault() {
            const toast = await toastController
                .create({
                    header: 'Раздел в разработке!',
                    duration: 1500,
                    position: 'top',
                    cssClass: 'default'
                })
            return toast.present();
        },
    }
}
</script>