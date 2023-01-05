<template>
    <button
        type="button"
        class="scroll-top"
        :class="{active: offsetTop > screenHeight}"
        @click.prevent="scrollClick"
    >
        <arrow-icon />
    </button>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import ArrowIcon from '~/assets/icons/scroll-top.svg?inline';

export default {
    name: 'ScrollTop',
    components: { ArrowIcon },
    data() {
        return {
            screenHeight: null,
            offsetTop: null
        };
    },
    mounted() {
        window.addEventListener('scroll', this.ScrollTop);
        this.screenHeight = window.innerHeight;
    },
    methods: {
        ScrollTop() {
            this.offsetTop = window.pageYOffset;
        },
        scrollClick() {
            document.getElementById('default').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};
</script>
