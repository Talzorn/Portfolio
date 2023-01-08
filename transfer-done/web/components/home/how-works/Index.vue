<template>
    <div class="how-works__cont">
        <div class="tabs anim anim-up">
            <div
                class="tabs__item"
                :class="{active: selectedTab === 1}"
                @click="selectedTab = 1"
            >
                <span>{{ $t('t_how_works__tab_1') }}</span>
            </div>
            <div
                class="tabs__item"
                :class="{active: selectedTab === 2}"
                @click="selectedTab = 2"
            >
                <span>{{ $t('t_how_works__tab_2') }}</span>
            </div>
            <div class="tabs__bg-active"></div>
        </div>

        <div class="hw-slider__cont anim anim-up">
            <slider-user v-if="selectedTab === 1"/>

            <slider-broker v-if="selectedTab === 2"/>
        </div>
    </div>
</template>

<script>
import SliderUser from './SliderUser.vue';
import SliderBroker from './SliderBroker.vue';

export default {
    name: 'HowWorksMain',
    components: { SliderUser, SliderBroker },
    data() {
        return {
            selectedTab: 1
        };
    }
};
</script>

<style scoped>

</style>
