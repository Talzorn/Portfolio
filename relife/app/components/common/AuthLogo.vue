<template>
    <div class="auth__logo">
        <ion-icon :icon="require('@/assets/images/' + themeImage + '/logo.svg')"/>
    </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
    name: "AuthLogo",
    components: { IonIcon },
    data() {
        return {
            themDefault: window.matchMedia('(prefers-color-scheme: dark)').matches
        }
    },
    computed: {
        ...mapGetters({
            theme: 'user/GET_THEME',
            themDefaultStore: 'common/GET_THEME_DEFAULT'
        }),
        themeImage() {
            let themNow = '';

            if (this.theme === 1) {
                themNow = 'dark';
            }
            if (this.theme === 2) {
                themNow = 'light';
            }
            if (this.theme === 3 && this.themDefault) {
                themNow = 'dark';
            }
            if (this.theme === 3 && !this.themDefault) {
                themNow = 'light';
            }
            return themNow
        }
    },
    watch: {
        themDefaultStore(e) {
            this.themDefault = e;
        }
    }
}
</script>
