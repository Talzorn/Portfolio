<template>
    <div class="coming-soon">
        <ion-icon :icon="require('@/assets/icons/coming-soon-icon.svg')"/>
        <h2 v-if="title">{{ title }}</h2>
        <span class="text--default" v-if="desc">{{ desc }}</span>

        <ion-button @click="handleNotifyMe" class="btn" color="primary" size="small" expand="block"
            v-if="btnLaunch"
        >{{ btnLaunchText }}</ion-button>

        <!-- @click="handlePartner(btnPartnerType)" -->
        <ion-button href="https://t.me/relife_support_bot" class="btn" color="primary" size="small" expand="block"
            v-if="btnPartner"
        >{{ btnPartnerText }}</ion-button>
    </div>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { mapActions, mapGetters } from 'vuex'
import toast from '../../helpers/toast'

export default {
    name: "ComingSoon",
    components: { IonButton, IonIcon },
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        btnLaunch: {
            type: Boolean,
            default: false
        },
        btnLaunchText: {
            type: String,
            default: ''
        },
        btnPartner: {
            type: Boolean,
            default: false
        },
        btnPartnerText: {
            type: String,
            default: ''
        },
        btnPartnerType: {
            type: Number,
            default: null
        }
    },
    computed: {
        ...mapGetters({
            user: 'user/GET_USER',
        }),
    },
    methods: {
        ...mapActions({
            notifyMe: 'user/notifyMe'
        }),
        handleNotifyMe() {
            if (!this.user.is_notify) {
                this.notifyMe();
            } else {
                toast({
                    message: this.$t('comSoon.we_will_notify'),
                    class: 'success'
                })
            }
        },
        // handlePartner(value) {
        //     this.$store.commit('common/SET_FORM_PARTNER', value);
        //     this.$router.push('/add-partner');
        // }
    }
}
</script>
