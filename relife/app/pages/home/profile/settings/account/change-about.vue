<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-class="'typical--fix-btn'"
        :page-title="$t('profile.about_me')"
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
                <span class="form__label">{{ $t('auth.profession') }}</span>
                <select-item
                    :is-load-data="isLoadData || !professions"
                    :class-box="['form__input--large', { error: v$.model.profession_id.$error }]"
                    :main-title="$t('auth.choose_profession')"
                    :placeholder="$t('auth.choose_profession')"
                    :error-text="v$.model.profession_id.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="professions"
                    v-model:value="model.profession_id"
                />
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.birth_country') }}</span>
                <select-item
                    :is-load-data="isLoadData || !countries.length"
                    :class-box="['form__input--large', { error: v$.model.birth_country_id.$error }]"
                    :main-title="$t('auth.choose_birth_country')"
                    :placeholder="$t('auth.choose_birth_country')"
                    :error-text="v$.model.birth_country_id.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="countries"
                    v-model:value="model.birth_country_id"
                />
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.home_country') }}</span>
                <select-item
                    :is-load-data="isLoadData || !countries.length"
                    :class-box="['form__input--large', { error: v$.model.country_id.$error }]"
                    :main-title="$t('auth.choose_home_country')"
                    :placeholder="$t('auth.choose_home_country')"
                    :error-text="v$.model.country_id.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="countries"
                    v-model:value="model.country_id"
                />
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.wish_country') }}</span>
                <multi-select-item
                    :is-load-data="isLoadData || !countries.length"
                    :class-box="['form__input--large', { error: v$.model.wish_country_ids.$error }]"
                    :main-title="$t('auth.choose_wish_country')"
                    :placeholder="$t('auth.choose_wish_country')"
                    :error-text="v$.model.wish_country_ids.$errors[0]?.$message"
                    :is-required="true"
                    :search="true"
                    :list="countries"
                    v-model:value="model.wish_country_ids"
                />
            </div>
            <div class="form__box">
                <span class="form__label"
                    :class="{error: model.short_description.length > 140}"
                >
                    {{ $t('auth.brief_description') }} <b>{{ model.short_description.length }} / 140</b>
                </span>
                <div class="form__textarea"
                    :class="{ error: v$.model.short_description.$error }"
                >
                    <ion-textarea class="no-scroll"
                        :autoGrow="true"
                        :rows="1"
                        :placeholder="$t('auth.enter', { field: $t('auth.brief_description_1') })"
                        :enterkeyhint="'next'"
                        v-model="model.short_description"
                    />
                    <span class="text--error">{{ v$.model.short_description.$errors[0]?.$message }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label"
                    :class="{error: model.full_description.length > 2500}"
                >
                    {{ $t('auth.full_description') }} <b>{{ model.full_description.length }} / 2500</b>
                </span>
                <div class="form__textarea"
                    :class="{ error: v$.model.full_description.$error }"
                >
                    <ion-textarea
                        :autoGrow="true"
                        :rows="6"
                        :placeholder="$t('auth.enter', { field: $t('auth.full_description_1') })"
                        :enterkeyhint="'done'"
                        v-model="model.full_description"
                    />
                    <span class="text--error">{{ v$.model.full_description.$errors[0]?.$message }}</span>
                </div>
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
import { IonButton, IonIcon, IonTextarea } from "@ionic/vue";
import SelectItem from "@/components/common/SelectItem";
import MultiSelectItem from "@/components/common/MultiSelectItem";
import useVuelidate from "@vuelidate/core";
import {maxLength, required} from "@/helpers/i18n-validators";
import {mapActions, mapGetters} from "vuex";
import toast from "@/helpers/toast";

export default {
    name: "SettingChangeAbout",
    components: { MultiSelectItem, SelectItem, IonIcon, IonButton, IonTextarea },
    data() {
        return {
            model: {
                full_description: '',
                short_description: '',
                profession_id: null,
                birth_country_id: null,
                country_id: null,
                wish_country_ids: [],
            },
        }
    },
    validations: {
        model: {
            full_description: {
                maxLength: maxLength(2500)
            },
            short_description: {
                maxLength: maxLength(140)
            },
            profession_id: { required },
            birth_country_id: { required },
            country_id: { required },
            wish_country_ids: { required },
        },
    },
    computed: {
        ...mapGetters({
            professions: 'reference/GET_PROFESSIONS',
            countries: 'reference/GET_COUNTRIES',
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
            fetchProfessions: 'reference/fetchProfessions',
            fetchCountries: 'reference/fetchCountries',
            editProfile: 'user/editProfile',
            getUser: 'profile/getUser',
        }),
        init() {
            if (this.user?.profile) {
                this.model.full_description = this.user.profile.full_description || '';
                this.model.short_description = this.user.profile.short_description || '';
                this.model.profession_id = this.user.profile.profession.id;
                this.model.birth_country_id = this.user.profile.birth_country.id;
                this.model.country_id = this.user.profile.country.id;
                this.model.wish_country_ids = this.user.wish_countries.map((item) => item.id);
            }

            if (!this.professions.length) {
                this.fetchProfessions();
            }
            if (!this.countries.length) {
                this.fetchCountries();
            }
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
