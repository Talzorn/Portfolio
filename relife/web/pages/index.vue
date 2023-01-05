<template>
    <main>
        <hero-section
            :user-count="summary.users_count.all"
            :new-user="summary.new_user_per_day"
            :user-popular="summary.popular_users"
        />

        <know-base-section
            :list="summary.geography.countries"
        />

        <road-map-section />

        <can-found-section
            :interests="summary.community.interests"
            :usefuls="summary.community.usefuls"
        />

        <who-we-section
            :user-count="summary.users_count.round"
            :list="summary.community.professions"
        />

        <map-section
            :interests="summary.geography.interest_countries"
            :residences="summary.geography.residence_countries"
        />
    </main>
</template>

<script>
import HeroSection from '@/components/Home/HeroSection.vue';
import KnowBaseSection from '@/components/Home/KnowBase.vue';
import RoadMapSection from '@/components/Home/RoadMap.vue';
import CanFoundSection from '@/components/Home/CanFound.vue';
import WhoWeSection from '@/components/Home/WhoWe.vue';
import MapSection from '@/components/Home/MapSection.vue';

export default {
    name: 'IndexPage',
    components: {
        MapSection,
        WhoWeSection,
        CanFoundSection,
        RoadMapSection,
        KnowBaseSection,
        HeroSection
    },
    async asyncData({ $axios, $nuxt }) {
        try {
            const { response } = await $axios.get('/public/data');

            return {
                summary: response
            };
        } catch (e) {
            $nuxt.error({ statusCode: 404 });
        }

        return null;
    }
};
</script>
