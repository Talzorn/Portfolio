<template>
    <div class="slider-people slider-default">
        <div class="slider-default__track">
            <template v-if="list === null">
                <div class="slider-people__box" style="background-color: transparent; border: unset"
                    v-for="item in 5"
                    :key="item"
                >
                    <ion-skeleton-text animated />
                </div>
            </template>

            <template v-else>
                <template v-if="!list.length && !addPartners">
                    <div class="slider__no-data" style="height: 134px;width: 100vw;padding: 0 20px;">
                        <span>{{ noData }}</span>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="slider-people__box ion-activatable"
                        v-for="item in list"
                        :key="item.id"
                        @click="$router.push('/profile/' + item.id)"
                    >
                        <div class="slider-people__name">
                            <span>{{ item.profile.nickname }}</span>
                        </div>
                        <div class="slider-people__img">
                            <ion-img class="main-img"
                                v-if="item.profile?.avatar"
                                :src="item.profile.avatar"
                            />
                            <ion-icon v-else class="icon" :icon="require('@/assets/icons/avatar-icon.svg')" />

                            <ion-img class="flag" :src="require('@/assets/icons/flags/' + item.profile.country.code + '.jpg')"/>
                        </div>
                        <span class="slider-people__position"
                            :style="{'background-color': '#944bba'}"
                        >
                            {{ item.profile.profession.name }}
                        </span>

                        <span class="karma-square">
                            {{ bigNumberFormat(item.ratings_count) }}
                            <b>{{ $t('carma') }}</b>
                        </span>
                        <div class="ripple">
                            <ion-ripple-effect />
                        </div>
                    </div>

                    <template v-if="isPartnerSlider">
                        <!-- @click="handlePartner" -->
                        <a href="https://t.me/relife_support_bot" class="c-btn c-btn--primary ripple-parent ion-activatable"
                            v-if="addPartners"
                        >
                            <ion-icon :icon="require('@/assets/icons/plus-icon--wrap.svg')"/>
                            {{ $t('checkList.partner_up') }}
                            <ion-ripple-effect />
                        </a>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import { IonImg, IonRippleEffect, IonSkeletonText, IonIcon } from "@ionic/vue";
// import {FORM_PARTNER} from "@/common/const";
import {mapGetters, mapMutations} from 'vuex'
import { bigNumberFormat } from "@/helpers/number";

export default {
    name: "SliderPeople",
    components: { IonImg, IonRippleEffect, IonSkeletonText, IonIcon },
    props: {
        addPartners: {
            type: Boolean,
            default: false
        },
        noData: {
            type: String,
            default: ''
        },
        isPartnerSlider: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            userSample: 'user/GET_USER_SAMPLE_ITEMS',
            partners: 'user/GET_PARTNERS',
        }),
        list() {
            return this.isPartnerSlider ? this.partners : this.userSample;
        }
    },
    methods: {
        bigNumberFormat,
        ...mapMutations({
            setFormPartner: 'common/SET_FORM_PARTNER'
        }),
        // handlePartner() {
        //     this.setFormPartner(FORM_PARTNER);
        //     this.$router.push('/add-partner');
        // }
    }
}
</script>
