<template>
    <ion-app>
        <ion-router-outlet />

        <div
            class="loader-mini"
            :class="{active: loaderMini}"
        >
            <loader-item class="preloader--small" :stroke-width="5" />
        </div>

        <notification />

        <base-modals />
    </ion-app>
</template>

<script>
import LoaderItem from '@/components/common/Loader.vue';
import Notification from '@/components/modals/NotifiMain.vue';
import BaseModals from '@/components/modals/BaseModals';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { mapGetters } from "vuex";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { StatusBar, Style} from "@capacitor/status-bar";

export default ({
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
        Notification,
        LoaderItem,
        BaseModals
    },
    computed: {
        ...mapGetters({
            loaderMini: 'common/GET_LOADER_MINI',
            themeColor: 'common/GET_THEME_COLOR'
        })
    },
    created() {
        this.groupBar();
    },
    watch: {
        themeColor() {
            this.groupBar();
        }
    },
    methods: {
        groupBar() {
            StatusBar.setStyle({
                style: this.themeColor ? Style.Light : Style.Dark
            });
            StatusBar.setBackgroundColor({
                color: this.themeColor ? '#f3f5f6' : '#141629'
            });
            NavigationBar.setColor({
                color: this.themeColor ? '#FFFFFF' : '#282C4A',
                darkButtons: this.themeColor
            });
        }
    }
});
</script>