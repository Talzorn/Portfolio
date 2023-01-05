<template>
    <ion-modal
        class="modal-sheet modal-sheet--carma"
        :is-open="show"
        :initial-breakpoint="1"
        :breakpoints="[0, 1]"
        @did-dismiss="handleSheet"
    >
        <ion-content class="wrapper-sheet" :fullscreen="true">
            <div class="sheet-carma">
                <span>{{ $t('profile.posts') }}</span>
                <span>{{ numberFormat(postCarma, 2, ',', ' ') }}</span>
            </div>
            <div class="sheet-carma">
                <span>{{ $t('profile.comments') }}</span>
                <span>{{ numberFormat(commentCarma, 2, ',', ' ') }}</span>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonContent, IonModal } from "@ionic/vue";
import { numberFormat } from "@/helpers/number";

export default {
    name: "ProfileSheetCarma",
    components: { IonContent, IonModal },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        postCarma: {
            type: Number,
            default: null
        },
        commentCarma: {
            type: Number,
            default: null
        }
    },
    methods: {
        numberFormat,
        handleSheet() {
            this.$emit('update:show', false)
        }
    }
}
</script>
