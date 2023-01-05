<template>
    <div class="preloader">
        <svg class="preloader__circular" viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" :stroke-width="strokeWidth" stroke-miterlimit="10"/>
        </svg>
        <svg class="preloader__bg" viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" :stroke-width="strokeWidth" stroke-miterlimit="10"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: "LoaderItem",
    props: [ 'strokeWidth' ]
}
</script>