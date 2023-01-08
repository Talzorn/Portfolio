<template>
    <ion-page class="typical" :class="pageClass">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ pageTitle }}</ion-title>
                <slot name="headerButton" />
            </ion-toolbar>
            <div class="ion-header__bg"
                :style="{opacity}"
            ></div>
            <ion-toolbar
                class="toolbar-search"
            >
                <slot name="searchItem"/>
            </ion-toolbar>
        </ion-header>

        <ion-content
            :class="contentClass"
            :fullscreen="true"
            :scrollEvents="true"
            @ionScroll="handleScroll"
        >
            <slot />

            <div
                class="scroll-top"
                :class="{active: topActive}"
                @click="scrollToTop"
            >
                <slot name="scrollTop" />
            </div>

            <div class="d-circle d-circle--small d-circle--primary"></div>
            <div class="d-circle d-circle--large d-circle--secondary"></div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default {
    name: "HomeLayouts",
    props: [ 'pageTitle', 'contentClass', 'pageClass' ],
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    data() {
        return {
            opacity: 0,
            topActive: false
        }
    },
    methods: {
        handleScroll(e) {
            const maxVal = 28;
            const scrollTop = e.detail.scrollTop > maxVal ? maxVal : e.detail.scrollTop;

            this.opacity = (maxVal - (maxVal - scrollTop)) / maxVal;
            this.topActive = e.detail.scrollTop > 380;
        },
        scrollToTop() {
            document.querySelector('ion-content').scrollToTop(500);
        }
    }
}
</script>

<style scoped>

</style>