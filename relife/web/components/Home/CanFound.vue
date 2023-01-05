<template>
    <section
        id="can-found"
        class="can-found"
    >
        <div class="wrapper">
            <h2 class="anim anim-up">
                {{ $t('home.can_found_h2') }}
            </h2>
            <div class="can-found__cont">
                <div class="can-found__box anim anim-up">
                    <h3>{{ $t('home.can_help') }}</h3>
                    <div
                        v-for="item in usefuls.popular"
                        :key="item.id"
                        class="can-found__group"
                    >
                        <div
                            v-for="item in item.users"
                            :key="item.id"
                            class="can-found__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people"
                                crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                        <span class="can-found__number">{{ bigNumberFormat(item.users_count) }}</span>
                        <span class="can-found__text">{{ item.name }}</span>
                    </div>
                    <div class="can-found__group">
                        <div
                            v-for="item in usefuls.other.users"
                            :key="item.id"
                            class="can-found__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people"
                                crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                        <span class="can-found__number">{{ bigNumberFormat(usefuls.other.users_count) }}</span>
                        <span class="can-found__text">{{ $t('other') }}</span>
                    </div>
                </div>
                <div class="can-found__box anim anim-up">
                    <h3>{{ $t('home.needs') }}</h3>
                    <div
                        v-for="item in interests.popular"
                        :key="item.id"
                        class="can-found__group"
                    >
                        <div
                            v-for="item in item.users"
                            :key="item.id"
                            class="can-found__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people"
                                crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                        <span class="can-found__number">{{ bigNumberFormat(item.users_count) }}</span>
                        <span class="can-found__text">{{ item.name }}</span>
                    </div>
                    <div class="can-found__group">
                        <div
                            v-for="item in interests.other.users"
                            :key="item.id"
                            class="can-found__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people"
                                crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                        <span class="can-found__number">{{ bigNumberFormat(interests.other.users_count) }}</span>
                        <span class="can-found__text">{{ $t('other') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { bigNumberFormat } from '@/helpers/number';
import HumanIcon from '~/assets/icons/human-icon.svg?inline';

export default {
    name: 'CanFoundSection',
    components: { HumanIcon },
    props: {
        interests: {
            type: Object,
            default() {}
        },
        usefuls: {
            type: Object,
            default() {}
        }
    },
    methods: {
        bigNumberFormat
    }
};
</script>
