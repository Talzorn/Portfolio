<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="main" href="/home/main">
                    <ion-icon :icon="require('@/assets/icons/nav-category.svg')" />
                </ion-tab-button>

                <ion-tab-button tab="transfer" href="/home/transfer">
                    <ion-icon :icon="require('@/assets/icons/nav-swap.svg')" />
                </ion-tab-button>

                <ion-tab-button tab="order" href="/home/order">
                    <ion-icon :icon="require('@/assets/icons/nav-offer.svg')" />
                    <div class="badge"></div>
                </ion-tab-button>

                <ion-tab-button tab="profile" href="/home/profile">
                    <ion-icon :icon="require('@/assets/icons/nav-profile.svg')" />
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';

export default ({
    name: 'TabsPage',
    components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
});
</script>
