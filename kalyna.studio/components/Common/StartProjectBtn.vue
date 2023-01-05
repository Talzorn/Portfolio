<template>
    <button
        type="button"
        class="btn-magnite"
        @click="routerPush('/contacts')"
    >
        <span
            :id="idBtn + '__content'"
            class="btn-magnite__content"
        >
            {{ $t('t_start_project') }}
        </span>
        <span
            :id="idBtn + '__area'"
            class="btn-magnite__area"
        />
    </button>
</template>

<script>
export default {
    name: 'StartProjectBtn',
    props: {
        idBtn: {
            type: String,
            default: ''
        }
    },
    mounted() {
        const mArea = document.querySelector(`#${this.idBtn}__area`);

        mArea.addEventListener('mousemove', this.mouseMove);
        mArea.addEventListener('mouseleave', () => {
            this.$gsap.to(`#${this.idBtn}__content`, {
                x: 0,
                y: 0,
                ease: 'power3',
                duration: 1
            });
        });
    },
    methods: {
        mouseMove(e) {
            const boundingRect = e.currentTarget.getBoundingClientRect();
            const content = document.querySelector(`#${this.idBtn}__content`);

            this.$gsap.to(content, {
                x: `${((e.offsetX / boundingRect.width) - 0.5) * (boundingRect.width / 2)}px`,
                y: `${((e.offsetY / boundingRect.height) - 0.5) * (boundingRect.height / 2)}px`,
                ease: 'power1',
                duration: 1
            });
        },
        routerPush(route) {
            this.$router.push(this.localeLocation(route));
        }
    }
};
</script>
