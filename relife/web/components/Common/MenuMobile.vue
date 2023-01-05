<template>
    <div class="menu-mobile">
        <button
            type="button"
            class="menu-btn"
            @click="closeMenu"
        >
            <close-icon />
        </button>
        <nav-item />
    </div>
</template>

<script>
import NavItem from '@/components/Common/NavItem.vue';
import CloseIcon from '~/assets/icons/close-icon.svg?inline';

export default {
    name: 'MenuMobile',
    components: { NavItem, CloseIcon },
    methods: {
        closeMenu() {
            this.$store.commit('common/SET_MENU', false);
            // eslint-disable-next-line no-undef
            scrollHidden();
        }
    }
};
</script>
