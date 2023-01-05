<template>
    <ion-modal
        class="modal-sheet modal-sheet--list modal-sheet--profile"
        :is-open="show"
        :initial-breakpoint="1"
        :breakpoints="[0, 1]"
        @did-dismiss="handleSheet"
    >
        <ion-content class="wrapper-sheet" :fullscreen="true">
            <div class="select-list">
                <ion-card class="select-list__item ion-activatable ripple-parent"
                    v-for="item in list"
                    :key="item.id"
                    @click="routerLink(item.link)"
                >
                    <ion-icon class="select-list__icon--start" :icon="require('@/assets/icons/' + item.icon)"/>
                    {{ $t(item.name) }}
                    <ion-ripple-effect />
                </ion-card>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonContent, IonIcon, IonModal, IonRippleEffect, IonCard } from "@ionic/vue";

export default {
    name: "ProfileSheet",
    components: { IonContent, IonModal, IonRippleEffect, IonIcon, IonCard },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'profile.settings',
                    icon: 'setting-icon.svg',
                    link: '/profile/settings'
                },
                {
                    id: 2,
                    name: 'profile.bookmarks',
                    icon: 'bookmark-icon--wrap.svg',
                    link: '/profile/bookmarks'
                },
                {
                    id: 3,
                    name: 'profile.referral_code',
                    icon: 'plus-icon--wrap.svg',
                    link: '/profile/referral-code'
                },
                {
                    id: 4,
                    name: 'profile.settings_feed',
                    icon: 'feed-menu.svg',
                    link: '/profile/settings-feed'
                }
            ]
        }
    },
    methods: {
        handleSheet() {
            this.$emit('update:show', false)
        },
        routerLink(value) {
            this.handleSheet();
            this.$router.push(value);
        }
    }
}
</script>