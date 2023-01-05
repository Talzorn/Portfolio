<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-class="'typical--fix-btn'"
        :page-title="$t('profile.community')"
    >
        <template v-slot:headerButton>
            <ion-button class="btn btn--head btn--icon" color="secondary" slot="start"
                @click="$router.back()"
            >
                <ion-icon :icon="require('@/assets/icons/arrow-left-icon.svg')" style="font-size: 16px"/>
            </ion-button>
        </template>

        <form action="#" method="post" class="form max-w-420" style="margin-top: 24px">
            <div class="form__box">
                <span class="form__label">{{ $t('auth.need') }}</span>
                <countryable-select
                    :is-load-data="isLoadData"
                    :class-box="['form__input--large', { error: v$.model.interests.$error }]"
                    :main-title="$t('auth.choose_needs')"
                    :placeholder="$t('auth.choose_needs')"
                    :error-text="v$.model.interests.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="interests"
                    v-model:value="model.interests"
                    :choice-max="5"
                    :choice-country-max="null"
                    property="interest"
                />
            </div>

            <div class="form__box">
                <span class="form__label">{{ $t('auth.can_be_useful') }}</span>
                <countryable-select
                    :is-load-data="isLoadData"
                    :class-box="['form__input--large', { error: v$.model.usefuls.$error }]"
                    :main-title="$t('auth.choose_usefuls')"
                    :placeholder="$t('auth.choose_usefuls')"
                    :error-text="v$.model.usefuls.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="usefuls"
                    v-model:value="model.usefuls"
                    :choice-max="5"
                    :choice-country-max="5"
                    property="useful"
                />
            </div>
        </form>

        <div class="fix-bottom">
            <ion-button class="btn" color="primary" size="large" expand="block"
                @click="save"
            >
                {{ $t('save') }}
            </ion-button>
        </div>
    </default-layout>
</template>

<script>
import { IonButton, IonIcon } from '@ionic/vue'
import CountryableSelect from '@/components/common/CountryableSelect'
import { required } from '@/helpers/i18n-validators'
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import toast from '@/helpers/toast'

export default {
    name: "SettingChangeCommunity",
    components: { IonIcon, IonButton, CountryableSelect },
    data() {
        return {
            model: {
                interests: [],
                usefuls: [],
            },
        }
    },
    validations: {
        model: {
            interests: { required },
            usefuls: { required },
        },
    },
    computed: {
        ...mapGetters({
            interests: 'reference/GET_INTERESTS',
            usefuls: 'reference/GET_USEFULS',
            isLoadData: 'common/GET_IS_LOAD_DATA',
            user: 'user/GET_USER',
        }),
    },
    setup() {
        return { v$: useVuelidate() }
    },
    mounted () {
        this.init();
    },
    methods: {
        ...mapActions({
            fetchInterests: 'reference/fetchInterests',
            fetchUsefuls: 'reference/fetchUsefuls',
            editProfile: 'user/editProfile',
            getUser: 'profile/getUser',
        }),
        updateModel() {
            if (this.user.interests) {
                this.model.interests = this.user.interests.map(({
                    countries: country_ids,
                    id: interest_id,
                    ...rest
                }) => ({
                    country_ids: country_ids.map((item) => item.id),
                    interest_id,
                    ...rest
                }));
            }
            if (this.user.usefuls) {
                this.model.usefuls = this.user.usefuls.map(({
                    countries: country_ids,
                    id: useful_id,
                    ...rest
                }) => ({
                    country_ids: country_ids.map((item) => item.id),
                    useful_id,
                    ...rest
                }));
            }
        },
        init() {
            if (!this.interests.length) {
                this.fetchInterests();
            }
            if (!this.usefuls.length) {
                this.fetchUsefuls();
            }

            this.updateModel();
        },
        async save() {
            const result = await this.v$.$validate()

            if (result) {
                await this.editProfile(this.model);
                await toast({
                    message: this.$t('notifications.success_update'),
                    class: 'success'
                })
                this.getUser(this.user.id);
            }
        }
    }
}
</script>
