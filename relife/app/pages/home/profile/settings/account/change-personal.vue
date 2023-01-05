<template>
    <default-layout
        :content-class="'wrapper-c'"
        :page-class="'typical--fix-btn'"
        :page-title="$t('profile.personal_info')"
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
                <avatar-profile
                    v-model:avatar="model.avatar"
                    :show-country="false"
                    :upload="true"
                    :show-upload-btn="true"
                    :is-available-upload="true"
                />
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.nickname') }}</span>
                <div
                    class="form__input form__input--large"
                    :class="{ error: v$.model.nickname.$error }"
                >
                    <input
                        type="text"
                        :placeholder="$t('auth.enter', { field: $t('auth.nickname').toLowerCase() })"
                        enterkeyhint="next"
                        v-model="model.nickname"
                        @keyup.enter="nextInput('input-2')"
                    />
                    <span class="text--error">{{ v$.model.nickname.$errors[0]?.$message }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.first_name') }}</span>
                <div
                    class="form__input form__input--large"
                    :class="{ error: v$.model.first_name.$error }"
                >
                    <input
                        ref="input-2"
                        type="text"
                        :placeholder="$t('auth.enter', { field: $t('auth.first_name').toLowerCase() })"
                        enterkeyhint="next"
                        v-model="model.first_name"
                        @keyup.enter="nextInput('input-3')"
                    />
                    <span class="text--error">{{ v$.model.first_name.$errors[0]?.$message }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.last_name') }}</span>
                <div
                    class="form__input form__input--large"
                    :class="{ error: v$.model.last_name.$error }"
                >
                    <input
                        ref="input-3"
                        type="text"
                        :placeholder="$t('auth.enter', { field: $t('auth.last_name').toLowerCase() })"
                        enterkeyhint="go"
                        v-model="model.last_name"
                        @keyup.enter="hideKeyboard"
                    />
                    <span class="text--error">{{ v$.model.last_name.$errors[0]?.$message }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.dob') }}</span>
                <div class="form__group-select"
                    :class="{ error: v$.model.dmy.day.$error || v$.model.dmy.month.$error || v$.model.dmy.year.$error }"
                >
                    <select-item
                        class="form__input--large"
                        key="day"
                        :main-title="$t('auth.day')"
                        :placeholder="$t('auth.day')"
                        :is-required="true"
                        :search="false"
                        :list="dayList"
                        v-model:value="model.dmy.day"
                    />
                    <select-item
                        class="form__input--large"
                        key="month"
                        :main-title="$t('auth.month')"
                        :placeholder="$t('auth.month')"
                        :is-required="true"
                        :search="false"
                        :list="monthList"
                        v-model:value="model.dmy.month"
                    />
                    <select-item
                        class="form__input--large"
                        key="year"
                        :main-title="$t('auth.year')"
                        :placeholder="$t('auth.year')"
                        :is-required="true"
                        :search="false"
                        :list="yearList"
                        v-model:value="model.dmy.year"
                    />
                    <span class="text--error">{{
                        v$.model.dmy.day.$errors[0]?.$message ??
                            v$.model.dmy.month.$errors[0]?.$message ??
                            v$.model.dmy.year.$errors[0]?.$message
                    }}</span>
                </div>
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.gender') }}</span>
                <select-item
                    key="gender"
                    :is-load-data="isLoadData || !genders.length"
                    :class-box="['form__input--large', { error: v$.model.gender.$error }]"
                    :main-title="$t('auth.select', { field: $t('auth.gender').toLowerCase() })"
                    :placeholder="$t('auth.select', { field: $t('auth.gender').toLowerCase() })"
                    :error-text="v$.model.gender.$errors[0]?.$message"
                    :is-required="true"
                    :search="false"
                    :list="genders"
                    v-model:value="model.gender"
                />
            </div>
            <div class="form__box">
                <span class="form__label">{{ $t('auth.english_level') }}</span>
                <select-item
                    key="english_level"
                    :is-load-data="isLoadData || !englishLevels.length"
                    :class-box="['form__input--large', { error: v$.model.english_level.$error }]"
                    :main-title="$t('auth.select', { field: $t('auth.english_level').toLowerCase() })"
                    :placeholder="$t('auth.select', { field: $t('auth.english_level').toLowerCase() })"
                    :error-text="v$.model.english_level.$errors[0]?.$message"
                    :is-required="true"
                    :search="false"
                    :list="englishLevels"
                    v-model:value="model.english_level"
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
import { IonButton, IonIcon } from "@ionic/vue";
import SelectItem from "@/components/common/SelectItem";
import {minLength, required} from "@/helpers/i18n-validators";
import useVuelidate from "@vuelidate/core";
import {mapActions, mapGetters} from "vuex";
import AvatarProfile from "@/components/common/AvatarProfile";
import toast from "@/helpers/toast";
import { helpers } from '@vuelidate/validators'
import i18n from '../../../../../plugins/i18n'
import { format, parseISO } from 'date-fns';
import { yearList } from '@/helpers/date';
import {Keyboard} from "@capacitor/keyboard";

export default {
    name: "SettingChangePersonalInfo",
    components: { AvatarProfile, SelectItem, IonIcon, IonButton },
    data() {
        return {
            test: '',
            originalImg: '',
            resizedImg: '',
            model: {
                avatar: '',
                nickname: '',
                first_name: '',
                last_name: '',
                gender: '',
                english_level: '',
                dmy: {
                    day: '',
                    month: '',
                    year: ''
                }
            },
            daysCount: 31,
            dayList: [],
            monthList: [
                {
                    id: 1,
                    name: this.$t('auth.january')
                },
                {
                    id: 2,
                    name: this.$t('auth.february')
                },
                {
                    id: 3,
                    name: this.$t('auth.march')
                },
                {
                    id: 4,
                    name: this.$t('auth.april')
                },
                {
                    id: 5,
                    name: this.$t('auth.may')
                },
                {
                    id: 6,
                    name: this.$t('auth.june')
                },
                {
                    id: 7,
                    name: this.$t('auth.july')
                },
                {
                    id: 8,
                    name: this.$t('auth.august')
                },
                {
                    id: 9,
                    name: this.$t('auth.september')
                },
                {
                    id: 10,
                    name: this.$t('auth.october')
                },
                {
                    id: 11,
                    name: this.$t('auth.november')
                },
                {
                    id: 12,
                    name: this.$t('auth.december')
                }
            ]
        }
    },
    validations: {
        model: {
            nickname: {
                required,
                minLength: minLength(3),
                customNickname: helpers.withMessage(i18n.global.t('validations.nickname'), {
                    $validator: (value) => {
                        const regex = /^[a-zA-Z0-9_.-]*$/
                        return regex.test(value);
                    }
                }),
            },
            first_name: { required },
            last_name: { required },
            dmy: {
                day: { required },
                month: { required },
                year: { required },
            },
            gender: { required },
            english_level: { required }
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    mounted () {
        this.init();
    },
    watch: {
        'model.dmy.month' () {
            this.setDayList();
        },
    },
    computed: {
        ...mapGetters({
            genders: 'reference/GET_GENDERS',
            englishLevels: 'reference/GET_ENGLISH_LEVELS',
            isLoadData: 'common/GET_IS_LOAD_DATA',
            user: 'user/GET_USER',
            uploadedAvatar: 'user/GET_UPLOADED_AVATAR',
        }),
        yearList,
        dob() {
            const setNumber = function(n) {
                return (n < 10 ? '0' : '') + n;
            };

            return setNumber(this.model.dmy.day) + '.' + setNumber(this.model.dmy.month) + '.' + this.model.dmy.year;
        },
    },
    methods: {
        ...mapActions({
            fetchEnglishLevels: 'reference/fetchEnglishLevels',
            fetchGenders: 'reference/fetchGenders',
            editProfile: 'user/editProfile',
            getUser: 'profile/getUser',
        }),
        setDayList() {
            const thirtyMonths = [4, 6, 9, 11];
            this.daysCount = thirtyMonths.includes(this.model.dmy.month) ? 30 : this.model.dmy.month === 2 ? 29 : 31;

            if (this.model.dmy.day > this.daysCount) {
                this.model.dmy.day = this.daysCount;
            }

            const days = [];

            // eslint-disable-next-line for-direction
            for (let i = 1; i <= this.daysCount; i++) {
                days.push({
                    id: i,
                    name: i,
                });
            }
            this.dayList = days;
        },
        init() {
            if (this.user?.profile) {
                this.model.avatar = this.user.profile.avatar;
                this.model.nickname = this.user.profile.nickname;
                this.model.first_name = this.user.profile.first_name;
                this.model.last_name = this.user.profile.last_name;
                this.model.dmy.day = Number(format(parseISO(this.user.profile.dob), 'dd'));
                this.model.dmy.month = Number(format(parseISO(this.user.profile.dob), 'MM'));
                this.model.dmy.year = Number(format(parseISO(this.user.profile.dob), 'yyyy'));
                this.model.gender = Number(this.user.profile.gender);
                this.model.english_level = Number(this.user.profile.english_level);
            }

            if (!this.englishLevels.length) {
                this.fetchEnglishLevels();
            }
            if (!this.genders.length) {
                this.fetchGenders();
            }

            this.setDayList();
        },
        async save() {
            const result = await this.v$.$validate()

            if (result) {
                const formData = new FormData();

                console.log(this.uploadedAvatar, this.model.avatar);

                formData.append('file', this.uploadedAvatar ?? this.model.avatar);
                formData.append('nickname', this.model.nickname);
                formData.append('first_name', this.model.first_name);
                formData.append('last_name', this.model.last_name);
                formData.append('dob', this.dob);
                formData.append('gender', this.model.gender);
                formData.append('english_level', this.model.english_level);

                await this.editProfile(formData);
                await toast({
                    message: this.$t('notifications.success_update'),
                    class: 'success'
                })
                this.getUser(this.user.id);
            }
        },
        nextInput(value) {
            this.$refs[value].focus();
        },
        hideKeyboard() {
            Keyboard.hide();
        }
    }
}
</script>
