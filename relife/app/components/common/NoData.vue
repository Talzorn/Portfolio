<template>
    <div class="no-data">
        <span>{{ $t(title) }}</span>
        <ion-button class="btn" size="small" color="primary" expand="block"
            v-if="btnShow"
            :router-link="btnRouter"
        >
            {{ $t(btnText) }}
        </ion-button>
    </div>
</template>

<script>
import { IonButton } from "@ionic/vue";

export default {
    name: "NoData",
    components: { IonButton },
    props: {
        title: {
            type: String,
            default: ''
        },
        btnShow: {
            type: Boolean,
            default: false
        },
        btnText: {
            type: String,
            default: ''
        },
        btnRouter: {
            type: String,
            default: ''
        }
    }
}
</script>