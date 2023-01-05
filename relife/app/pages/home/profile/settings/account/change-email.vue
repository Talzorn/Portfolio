<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-class="'typical--fix-btn'"
        :page-title="$t('profile.change_mail')"
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
                <span class="form__label">E-mail</span>
                <div
                    class="form__input form__input--large"
                    :class="{ error: v$.model.email.$error }"
                >
                    <input
                        type="email"
                        :placeholder="$t('auth.enter', { field: 'e-mail' })"
                        enterkeyhint="go"
                        v-model="model.email"
                    />
                    <span class="text--error">{{ v$.model.email.$errors[0]?.$message }}</span>
                </div>
            </div>
            <template v-if="confirm">
                <span class="text--default" style="text-align: center;margin: 8px auto 32px;color: var(--text-secondary);"
                >
                    {{ $t('profile.confirmation_code_email') }} <b style="font-weight: 600">Talzorn@gmail.com</b>
                </span>
                <div class="form__box">
                    <div
                        class="form__input form__input--large"
                        :class="{ error: v$.model.confirm_code.$error }"
                    >
                        <input
                            type="number"
                            enterkeyhint="go"
                            :placeholder="$t('auth.enter', { field: $t('auth.confirm_code').toLowerCase() })"
                            v-model="model.confirm_code"
                        />
                        <span class="text--error">{{ v$.model.confirm_code.$errors[0]?.$message }}</span>
                    </div>
                </div>
            </template>
        </form>

        <div class="fix-bottom">
            <ion-button class="btn" color="primary" size="large" expand="block"
                @click="confirm = !confirm"
            >{{ $t('save') }}</ion-button>
        </div>
    </default-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import {email, numeric, required} from "@/helpers/i18n-validators";
import useVuelidate from '@vuelidate/core'

export default {
    name: "SettingChangeEmail",
    components: { IonIcon, IonButton },
    data() {
        return {
            confirm: false,
            model: {
                email: '',
                confirm_code: ''
            }
        }
    },
    validations: {
        model: {
            email: { required, email },
            confirm_code: { numeric, required }
        }
    },
    setup() {
        return { v$: useVuelidate() }
    }
}
</script>
