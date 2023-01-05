<template>
    <div class="join__cont">
        <a
            v-if="!stores.current || stores.current === 'android'"
            :href="stores.android"
            class="btn-app"
            target="_blank"
        >
            <img
                src="~/assets/icons/google-play.svg"
                alt="icon"
                class="btn-app__icon"
            >
            <span class="btn-app__text">Google play</span>
        </a>
        <a
            v-if="!stores.current || stores.current === 'ios'"
            :href="stores.ios"
            class="btn-app"
            target="_blank"
        >
            <img
                src="~/assets/icons/apple-stroe.svg"
                alt="icon"
                class="btn-app__icon"
            >
            <span class="btn-app__text">App store</span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'BtnStoreGroup',
    props: {
        stores: {
            type: Object,
            default() {
                return {
                    current: null,
                    android: null,
                    ios: null
                };
            }
        }
    }
};
</script>

<style scoped>

</style>
