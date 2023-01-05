<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-class="'typical--fix-btn'"
        :page-title="$t('profile.change_password')"
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
                <span class="form__label">{{ $t('auth.new_password') }}</span>
                <div
                    class="form__input form__password form__input--large"
                    :class="{ error: v$.model.password.$error }"
                >
                    <input
                        :type="typePasswordNew"
                        enterkeyhint="next"
                        :placeholder="$t('auth.enter', { field: $t('auth.password').toLowerCase() })"
                        v-model="model.password"
                        @keyup.enter="nextInput('input-2')"
                    />
                    <ion-button class="btn btn--icon" color="tertiary"
                        @click="showPass = !showPass"
                        :class="{active: showPass}"
                    >
                        <ion-icon :icon="require('@/assets/icons/eye-icon.svg')"/>
                    </ion-button>
                    <span class="text--error">{{ v$.model.password.$errors[0]?.$message }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.confirm', { field: $t('auth.password').toLowerCase() }) }}</span>
                <div
                    class="form__input form__password form__input--large"
                    :class="{ error: v$.model.confirm_password.$error }"
                >
                    <input
                        ref="input-2"
                        :type="typePasswordConfirm"
                        enterkeyhint="go"
                        :placeholder="$t('auth.enter', { field: $t('auth.password').toLowerCase() })"
                        v-model="model.confirm_password"
                    />
                    <ion-button class="btn btn--icon" color="tertiary"
                        @click="showConfirmPass = !showConfirmPass"
                        :class="{active: showConfirmPass}"
                    >
                        <ion-icon :icon="require('@/assets/icons/eye-icon.svg')"/>
                    </ion-button>
                    <span class="text--error">{{ v$.model.confirm_password.$errors[0]?.$message }}</span>
                </div>
            </div>
            <template v-if="confirm">
                <span class="text--default" style="text-align: center;margin: 8px auto 32px;color: var(--text-secondary);"
                >
                    {{ $t('auth.confirm_code_sent') }} <b style="font-weight: 600">Talzorn@gmail.com</b>
                </span>
                <div class="form__box">
                    <div
                        class="form__input form__input--large"
                        :class="{ error: v$.model.reset_pwd_code.$error }"
                    >
                        <input
                            type="number"
                            enterkeyhint="go"
                            :placeholder="$t('auth.enter', { field: $t('auth.confirm_code').toLowerCase() })"
                            v-model="model.reset_pwd_code"
                        />
                        <span class="text--error">{{ v$.model.reset_pwd_code.$errors[0]?.$message }}</span>
                    </div>
                </div>
            </template>
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
import { IonButton, IonIcon } from "@ionic/vue";
import { minLength, required } from "@/helpers/i18n-validators";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import i18n from "@/plugins/i18n";
import { mapActions } from "vuex";
import toast from "@/helpers/toast";

export default {
    name: "SettingChangePassword",
    components: { IonIcon, IonButton },
    data() {
        return {
            confirm: false,
            showPass: true,
            showConfirmPass: true,
            model: {
                password: '',
                confirm_password: '',
                reset_pwd_code: ''
            }
        }
    },
    validations: {
        model: {
            password: {
                required,
                minLength: minLength(6)
            },
            confirm_password: {
                required,
                theSamePassword: helpers.withMessage(i18n.global.t('validations.sameAsPassword'), {
                    $validator: (value, siblingState) => {
                        return siblingState.password === value;
                    }
                }),
            },
            /*reset_pwd_code: {
                customRequired: helpers.withMessage(i18n.global.t('validations.required'), {
                    $validator: (value) => {
                        return value.length;
                    }
                }),
                numeric,
            }*/
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    computed: {
        typePasswordNew() {
            return this.showPass ? 'password' : 'text';
        },
        typePasswordConfirm() {
            return this.showConfirmPass ? 'password' : 'text';
        }
    },
    methods: {
        ...mapActions({
            editProfile: 'user/editProfile',
        }),
        async save() {
            const result = await this.v$.$validate();

            console.log(result);

            // TODO: сделать подтверждение перед сменой пароля
            // TODO: сделать валидацию на сложный пароль
            if (result) {
                await this.editProfile({
                    password: this.model.password
                });

                await toast({
                    message: this.$t('notifications.success_update'),
                    class: 'success'
                })

                this.model.password = '';
                this.model.confirm_password = '';
            }
        },
        nextInput(value) {
            this.$refs[value].focus();
        }
    }
}
</script>
