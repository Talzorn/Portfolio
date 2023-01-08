<template>
    <ion-page :class="pageClass">
        <ion-header class="home-header">
            <ion-toolbar>
                <ion-title>{{ pageTitle }}</ion-title>
                <slot name="headerButton" />
            </ion-toolbar>
            <div class="ion-header__bg"
                :style="{opacity}"
            ></div>
        </ion-header>

        <ion-content
            id="ion-cont-home"
            :class="contentClass"
            :fullscreen="true"
            :scrollEvents="true"
            @ionScroll="handleScroll"
        >
            <slot name="tabsItem" />

            <!-- loader на обновления списков -->
            <div
                class="refresher"
                style="display: none"
            >
                <loader-item
                    :stroke-width="5"
                />
            </div>

            <slot />

            <!-- loader на подгрузку списков -->
            <ion-infinite-scroll style="display: none">
                <ion-infinite-scroll-content>
                    <loader-item :stroke-width="5" />
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>

            <div
                class="scroll-top"
                :class="{active: topActive}"
                @click="scrollToTop"
            >
                <slot name="scrollTop" />
            </div>

            <div class="d-circle d-circle--large d-circle--primary"></div>
            <div class="d-circle d-circle--small d-circle--secondary"></div>
            <div class="d-circle d-circle--medium d-circle--primary"></div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/vue';
import LoaderItem from "@/components/common/Loader";

export default {
    name: "HomeLayouts",
    props: [ 'pageTitle', 'contentClass', 'pageClass' ],
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, LoaderItem, IonInfiniteScroll, IonInfiniteScrollContent },
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
            const content = document.querySelector('ion-content');
            content.scrollToTop(500);
        }
    }
}
</script>

<style scoped>

</style>