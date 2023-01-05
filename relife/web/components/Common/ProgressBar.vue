<template>
    <div class="progress-bar">
        <div
            class="progress-bar__line"
            :class="{red: value <= 30, yellow: value > 30 && value < 60, green: value >= 60}"
            :style="{width: value + '%'}"
        />
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        value: {
            type: Number,
            default: 0
        }
    }
};
</script>
