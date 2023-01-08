<template>
    <home-layout page-class="home" content-class="wrapper-c" page-title="Заказы">
        <template v-slot:headerButton>
            <ion-button class="btn-icon" slot="end" router-link="/offer">
                <ion-icon slot="icon-only" :icon="require('@/assets/icons/plus-icon.svg')" style="font-size: 18px;"></ion-icon>
            </ion-button>
        </template>

        <template v-slot:tabsItem>
            <div class="c-tabs">
                <span class="c-tabs__tab"
                    @click="tabs = 1"
                    :class="{active: tabs === 1}"
                >Купить</span>
                <span class="c-tabs__tab"
                    @click="openToastDefault"
                >Продать</span>
                <div class="c-tabs__bg"></div>
            </div>
        </template>

        <buy-section />

        <template v-slot:scrollTop>
            <ion-button class="btn-icon">
                <ion-icon slot="icon-only" :icon="require('@/assets/icons/arrow-up-icon.svg')" style="font-size: 20px;"></ion-icon>
            </ion-button>
        </template>
    </home-layout>
</template>

<script>
import { toastController, IonIcon, IonButton} from '@ionic/vue';
import buySection from '@/pages/home/order/buy.vue';

export default {
    name: "HomeOffer",
    components: { buySection, IonIcon, IonButton },
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