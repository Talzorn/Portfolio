<template>
    <default-layout content-class="wrapper-c" page-title="Язык">
        <template v-slot:headerButton>
            <ion-button class="btn-icon" slot="start" router-link="/home/profile">
                <ion-icon slot="icon-only" :icon="require('@/assets/icons/back-arrow-icon.svg')"/>
            </ion-button>
        </template>
        <ul
            class="select-list"
            v-if="selectLang.list"
        >
            <li
                class="select-list__item"
                v-for="item in selectLang.list"
                :key="item.id"
                @click="handleLang(item.text)"
                :class="{active: selectLang.selected === item.text}"
            >{{ item.text }}</li>
        </ul>
    </default-layout>
</template>

<script>
import { IonButton, IonIcon } from '@ionic/vue';

export default {
    name: "LangPage",
    components: { IonButton, IonIcon },
    data() {
        return {
            selectLang: {
                selected: 'Русский',
                list: [
                    {
                        id: 1,
                        text: 'Русский'
                    },
                    {
                        id: 2,
                        text: 'Английский'
                    }
                ]
            },
        }
    },
    methods: {
        handleLang(value) {
            this.selectLang.selected = value;
        },
    }
}
</script>