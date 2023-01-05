<template>
    <div class="profile-avatar"
        @click="handleAction"
        :class="{'ion-activatable': upload}"
    >
        <!--
        Логика компонента:
        1. Когда заходим в свой профиль, и у нас нет картинки, то мы показываем место страны кнопку с плюсиком и заглушку. После добавления картинки мы скрываем кнопку с плюсиком и выводим страну.
        2. Когда заходит пользователь на наш профиль, то он видит только картинку + страна или заглкушку + страна
        3. Когда мы заходим в редактор профиля, там мы никогда не показываем страну и место страны всегда кнопка с плоюсиком.
        -->
        <ion-img class="img" v-if="avatarImg" :src="avatarImg" />
        <ion-icon v-else :icon="require('@/assets/icons/avatar-icon.svg')"/>
        <ion-img v-if="showCountry && country" class="flag" :src="require('@/assets/icons/flags/' + country +'.jpg')" style="z-index: 3"/>
        <div class="profile-avatar__upload"
            v-if="showUploadBtn"
        >
            <ion-icon :icon="require('@/assets/icons/plus-icon--wrap.svg')"/>
        </div>
        <div class="ripple" style="border-radius: 14px;"
            v-if="upload"
        >
            <ion-ripple-effect />
        </div>
        <input @change="getFile" type="file" accept=".png, .jpg, .jpeg" ref="fileBtn" hidden />
    </div>
</template>

<script>
import { IonIcon, IonImg, IonRippleEffect } from "@ionic/vue";
import toast from '@/helpers/toast';
import resizer from '@/helpers/resizer';

export default {
    name: "AvatarProfile",
    components: { IonIcon, IonImg, IonRippleEffect },
    props: {
        avatar: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        upload: {
            type: Boolean,
            default: false
        },
        showUploadBtn: {
            type: Boolean,
            default: false
        },
        showCountry: {
            type: Boolean,
            default: false
        },
        isAvailableUpload: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            originalImg: null,
            avatarImg: null,
            error: null
        }
    },
    mounted() {
        this.avatarImg = this.avatar;
    },
    watch: {
        avatar() {
            this.avatarImg = this.avatar;
        }
    },
    methods: {
        handleAction() {
            if (this.isAvailableUpload) {
                this.$refs.fileBtn.click()
            } else {
                this.$router.push('/profile/settings/change-personal');
            }
        },
        async getFile(e) {
            let error = null;
            const file = e.target.files[0];
            const imageTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
            ]

            if (!imageTypes.includes(file.type)) {
                error = this.$t('validations.imageFile');
            }
            if (file.size > 1024 * 1024 * 10) {
                error = this.$t('validations.bigFile');
            }

            if (error) {
                await toast({
                    message: error,
                    class: 'error'
                })
                return;
            }

            const resizedImage = await resizer(file, 600);

            if (resizedImage) {
                this.$store.commit('user/SET_GET_UPLOADED_AVATAR', resizedImage)
                this.avatarImg = URL.createObjectURL(resizedImage);
            }
        },
    }
}
</script>
