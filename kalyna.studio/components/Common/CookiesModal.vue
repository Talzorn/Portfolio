<template>
    <transition name="cookie-modal">
        <div
            v-if="show"
            class="cookie-modal"
        >
            <span class="cookie-modal__text">
                {{ $t('t_cookie_modal__text_1') }}
                <br>
                {{ $t('t_cookie_modal__text_2') }}
                <nuxt-link
                    :to="localeLocation('/cookie-policy')"
                    class="text-link"
                >
                    {{ $t('t_cookie_modal__text_3') }}
                </nuxt-link>
            </span>
            <button
                type="button"
                class="btn btn--medium btn--bg"
                @click="closeModal"
            >
                <span class="btn__text">
                    <span class="btn__text--top">{{ $t('t_cookie_modal__btn') }}</span>
                    <span class="btn__text--bottom">{{ $t('t_cookie_modal__btn') }}</span>
                </span>
            </button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'CookiesModal',
    data() {
        return {
            show: true
        };
    },
    created() {
        this.show = !this.$cookies.get('cookieModal');
    },
    methods: {
        closeModal() {
            this.show = false;
            this.$cookies.set('cookieModal', true);
        }
    }
};
</script>
