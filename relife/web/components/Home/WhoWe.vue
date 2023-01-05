<template>
    <section
        id="who-we"
        class="who-we"
    >
        <div class="wrapper">
            <h2 class="anim anim-up">
                {{ $t('home.who_we_h2') }}
            </h2>
            <div class="who-we__top">
                <div class="who-we__left anim anim-up">
                    <img
                        class="who-we__earth"
                        :src="require('~/assets/images/' + themeImage + '/earth-logo.svg')"
                        alt="earth logo"
                    >
                    <div class="who-we__stat">
                        <span>{{ $t('home.there_are_more') }}</span>
                        <span class="h2">{{ numberFormat(userCount, 2, ',', ' ') }}</span>
                    </div>
                </div>
                <div class="join anim anim-up">
                    <h3>{{ $t('join') }}</h3>
                    <btn-store-group
                        :stores="stores"
                    />
                </div>
            </div>
            <div class="who-we__middle anim anim-up">
                <div
                    v-for="item in list.popular"
                    :key="item.id"
                    class="who-we__box"
                >
                    <div class="who-we__avatar-group">
                        <div
                            v-for="item in item.users"
                            :key="item.id"
                            class="who-we__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people" crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                    </div>
                    <div class="who-we__group">
                        <span class="who-we__number">{{ numberFormat(item.users_count, 2, ',', ' ') }}</span>
                        <span class="who-we__position">{{ item.name }}</span>
                    </div>
                </div>

                <div class="who-we__box">
                    <div class="who-we__avatar-group">
                        <div
                            v-for="item in list.other.users"
                            :key="item.id"
                            class="who-we__people"
                        >
                            <img
                                v-if="item.profile.avatar"
                                :src="item.profile.avatar"
                                alt="people" crossorigin="anonymous"
                            >
                            <human-icon v-else />
                        </div>
                    </div>
                    <div class="who-we__group">
                        <span class="who-we__number">{{ numberFormat(list.other.users_count, 2, ',', ' ') }}</span>
                        <span class="who-we__position">{{ $t('other') }}</span>
                    </div>
                </div>
            </div>
            <div class="join anim anim-up">
                <h3>{{ $t('join') }}</h3>
                <btn-store-group
                    :stores="stores"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { numberFormat } from '@/helpers/number';
import BtnStoreGroup from '@/components/Common/BtnStoreGroup.vue';
import { mapGetters } from 'vuex';
import HumanIcon from '~/assets/icons/human-icon.svg?inline';

export default {
    name: 'WhoWeSection',
    components: { BtnStoreGroup, HumanIcon },
    props: {
        userCount: {
            type: Number,
            default: null
        },
        list: {
            type: Object,
            default() {}
        }
    },
    data() {
        return {
            stores: {
                current: null,
                android: 'https://play.google.com/store/apps/details?id=org.relifeglobal.app',
                ios: 'https://apps.apple.com/ua/app/relife/id1644586629'
            }
        };
    },
    computed: {
        ...mapGetters({
            theme: 'common/GET_THEME',
            themDefault: 'common/GET_THEME_DEFAULT'
        }),
        themeImage() {
            let themNow = '';

            if (this.theme === 1) {
                themNow = 'dark';
            }
            if (this.theme === 2) {
                themNow = 'light';
            }
            if (this.theme === 3 && this.themDefault) {
                themNow = 'dark';
            }
            if (this.theme === 3 && !this.themDefault) {
                themNow = 'light';
            }
            return themNow;
        }
    },
    methods: {
        numberFormat
    }
};
</script>
