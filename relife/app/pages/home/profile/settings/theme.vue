<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-title="$t('profile.theme')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                @click="$router.back()"
            >
                <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
            </ion-button>
        </template>

        <div class="select-list">
            <ion-card
                class="select-list__item ion-activatable ripple-parent"
                v-for="item in list"
                :key="item.id"
                @click="setElement(item.id)"
                :class="{active: theme === item.id}"
            >
                {{ $t(item.text) }}
                <ion-icon class="checkmark" :icon="require('@/assets/icons/checkmark-icon.svg')" style="padding-left: 6px;"/>
                <ion-ripple-effect />
            </ion-card>
        </div>
    </default-layout>
</template>

<script>
import { IonIcon, IonButton, IonCard, IonRippleEffect } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
    name: "SettingTheme",
    components: { IonIcon, IonButton, IonCard, IonRippleEffect },
    data() {
        return {
            list: [
                {
                    id: 1,
                    text: 'profile.theme_dark'
                },
                {
                    id: 2,
                    text: 'profile.theme_light'
                },
                {
                    id: 3,
                    text: 'profile.theme_default'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            theme: 'user/GET_THEME'
        })
    },
    watch: {
        theme() {
            this.theme === 1 ? document.body.classList.add('dark') : document.body.classList.remove('dark');
            this.theme === 2 ? document.body.classList.add('light') : document.body.classList.remove('light');
        }
    },
    methods: {
        setElement(id) {
            this.$store.commit('user/SET_THEME', id);
        }
    }
}
</script>