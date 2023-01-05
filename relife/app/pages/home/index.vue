<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="base" href="/home/base">
                    <ion-icon :icon="require('@/assets/icons/category-menu.svg')"/>
                    <ion-label>
                        <span class="nav-text">{{ $t('nav_1') }}</span>
                        <span class="nav-circle"></span>
                    </ion-label>
                </ion-tab-button>

                <ion-tab-button tab="feed" href="/home/feed">
                    <ion-icon :icon="require('@/assets/icons/feed-menu.svg')"/>
                    <ion-label>
                        <span class="nav-text">{{ $t('nav_2') }}</span>
                        <span class="nav-circle"></span>
                    </ion-label>
                </ion-tab-button>

                <ion-tab-button tab="notifications" href="/home/notifications">
                    <ion-icon :icon="require('@/assets/icons/notification-menu.svg')"/>
                    <ion-label>
                        <span class="nav-text">{{ $t('nav_3') }}</span>
                        <span class="nav-circle"></span>
                    </ion-label>
                    <span class="badge" style="top: 16px;right: calc(50% - 10px);" v-if="hasUnreadNotices"></span>
                </ion-tab-button>

                <ion-tab-button tab="profile" href="/home/profile">
                    <ion-icon :icon="require('@/assets/icons/profile-menu.svg')"/>
                    <ion-label>
                        <span class="nav-text">{{ $t('nav_4') }}</span>
                        <span class="nav-circle"></span>
                    </ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { mapGetters } from "vuex";

export default ({
    name: 'MainIndex',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    computed: {
        ...mapGetters({
            hasUnreadNotices: 'common/GET_HAS_UNREAD_NOTICES'
        })
    }
});
</script>
