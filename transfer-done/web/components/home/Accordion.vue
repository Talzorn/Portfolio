<template>
    <div class="accordion">
        <div
            v-for="item in list"
            :key="item.id"
            :class="{active: selected === item.id}"
            class="accordion__box"
        >
            <div
                class="accordion__top"
                :class="{active: selected === item.id}"
                @click="moveClick(item.id)"
            >
                <span class="accordion__title">{{ $t(item.title) }}</span>
                <img
                    src="~/assets/icons/down-arrow--white.svg"
                    alt="arrow"
                    class="accordion__arrow"
                >
            </div>
            <slide-up-down
                :active="selected === item.id"
                :duration="350"
                class="accordion__middle"
            >
                <p v-html="$t(item.desc)" />
            </slide-up-down>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccordionBlock',
    data() {
        return {
            selected: 1,
            list: [
                {
                    id: 1,
                    title: 't_faq__title_1',
                    desc: 't_faq__desc_1'
                },
                {
                    id: 2,
                    title: 't_faq__title_2',
                    desc: 't_faq__desc_2'
                },
                {
                    id: 3,
                    title: 't_faq__title_3',
                    desc: 't_faq__desc_3'
                },
                {
                    id: 4,
                    title: 't_faq__title_4',
                    desc: 't_faq__desc_4'
                },
                {
                    id: 5,
                    title: 't_faq__title_5',
                    desc: 't_faq__desc_5'
                },
                {
                    id: 6,
                    title: 't_faq__title_6',
                    desc: 't_faq__desc_6'
                },
                {
                    id: 7,
                    title: 't_faq__title_7',
                    desc: 't_faq__desc_7'
                },
                {
                    id: 8,
                    title: 't_faq__title_8',
                    desc: 't_faq__desc_8'
                }
            ]
        };
    },
    methods: {
        moveClick(number) {
            if (this.selected === number) {
                this.selected = null;
            } else {
                this.selected = number;
            }
        }
    }
};
</script>

<style scoped>

</style>
