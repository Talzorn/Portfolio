<template>
    <section
        id="map"
        class="maps"
    >
        <div class="wrapper">
            <h2 class="anim anim-up">
                {{ $t('home.map__h1') }}
            </h2>
            <div class="tabs anim anim-up">
                <div
                    class="tabs__item"
                    :class="{active: tabs === 1}"
                    @click="tabs = 1"
                >
                    <span>{{ $t('home.map__tab_1') }}</span>
                </div>
                <div
                    class="tabs__item"
                    :class="{active: tabs === 2}"
                    @click="tabs = 2"
                >
                    <span>{{ $t('home.map__tab_2') }}</span>
                </div>
                <div class="tabs__bg-active" />
            </div>
            <div class="maps__map anim anim-up">
                <map-svg />
                <client-only>
                    <transition-group
                        v-for="item in mapList"
                        :key="item.id"
                        name="overlay"
                        tag="div"
                        :class="'maps__flag ' + item.code"
                    >
                        <div
                            v-if="item.users_count"
                            :key="item.id"
                            class="maps__flag-wrap"
                        >
                            <img
                                :src="require('~/assets/icons/flags/' + item.code + '.jpg')"
                                :alt="item.name"
                            >
                            <span>{{ bigNumberFormat(item.users_count, 1) }}</span>
                        </div>
                    </transition-group>
                </client-only>
                <div class="maps-circle balkans">
                    <div class="maps-circle__box">
                        <div class="maps-circle__wrap">
                            <div
                                v-for="item in balkansList"
                                :key="item.id"
                                class="maps-circle__row"
                            >
                                <div
                                    v-if="item.users_count"
                                    class="maps-circle__group"
                                >
                                    <img
                                        :src="require('~/assets/icons/flags/' + item.code + '.jpg')"
                                        :alt="item.name"
                                    >
                                    <span>{{ bigNumberFormat(item.users_count, 1) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="maps-circle south-europe">
                    <div class="maps-circle__box">
                        <div class="maps-circle__wrap">
                            <div
                                v-for="item in southEuropeList"
                                :key="item.id"
                                class="maps-circle__row"
                            >
                                <div
                                    v-if="item.users_count"
                                    class="maps-circle__group"
                                >
                                    <img
                                        :src="require('~/assets/icons/flags/' + item.code + '.jpg')"
                                        :alt="item.name"
                                    >
                                    <span>{{ bigNumberFormat(item.users_count, 1) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="maps-circle central-europe">
                    <div class="maps-circle__box">
                        <div class="maps-circle__wrap">
                            <div
                                v-for="item in centralEuropeList"
                                :key="item.id"
                                class="maps-circle__row"
                            >
                                <div
                                    v-if="item.users_count"
                                    class="maps-circle__group"
                                >
                                    <img
                                        :src="require('~/assets/icons/flags/' + item.code + '.jpg')"
                                        :alt="item.name"
                                    >
                                    <span>{{ bigNumberFormat(item.users_count, 1) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { bigNumberFormat } from '@/helpers/number';
import MapSvg from '~/assets/images/map.svg?inline';

export default {
    name: 'MapSection',
    components: { MapSvg },
    props: {
        interests: {
            type: Array,
            default: null
        },
        residences: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            tabs: 1,
            groupCountries: {
                balkans: [
                    'geo',
                    'arm',
                    'aze'
                ],
                southEurope: [
                    'bgr',
                    'svn',
                    'hrv',
                    'hun',
                    'rou',
                    'mda',
                    'srb',
                    'mne',
                    'alb',
                    'grc'
                ],
                centralEurope: [
                    'deu',
                    'pol',
                    'nld',
                    'bel',
                    'lux',
                    'che',
                    'svk',
                    'aut',
                    'cze',
                    'dnk'
                ]
            }
        };
    },
    computed: {
        allCountries() {
            return this.tabs === 1 ? this.residences : this.interests;
        },
        mapList() {
            const groupCountries = Object.values(this.groupCountries).flat();

            return this.allCountries.filter((item) => !groupCountries.includes(item.code));
        },
        balkansList() {
            return this.allCountries.filter((item) => this.groupCountries.balkans.includes(item.code));
        },
        southEuropeList() {
            return this.allCountries.filter((item) => this.groupCountries.southEurope.includes(item.code));
        },
        centralEuropeList() {
            return this.allCountries.filter((item) => this.groupCountries.centralEurope.includes(item.code));
        }
    },
    methods: {
        bigNumberFormat
    }
};
</script>
