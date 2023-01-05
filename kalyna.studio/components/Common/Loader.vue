<template>
    <div
        class="loader"
        :class="[loaderClass]"
    >
        <svg
            class="loader__circular"
            viewBox="25 25 50 50"
        >
            <circle
                class="loader__path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                :stroke-width="strokeWidth"
                stroke-miterlimit="10"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'LoaderItem',
    props: {
        loaderClass: {
            type: String,
            default: ''
        },
        strokeWidth: {
            type: String,
            default: '2'
        }
    }
};
</script>
