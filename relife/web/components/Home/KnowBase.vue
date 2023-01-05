<template>
    <section
        id="know-base"
        class="know-base"
    >
        <div class="wrapper">
            <h2
                class="anim anim-up"
            >
                {{ $t('home.know_base_h2') }}
            </h2>
            <tab-swipe
                class="anim anim-up"
                :selected.sync="tabs.selected"
                :list="tabs.list"
            />
            <div
                v-click-outside="tileInfoHidden"
                class="tile-grid anim anim-up"
            >
                <div
                    v-for="item in listCountries"
                    :key="item.id"
                    :class="['tile', {hover: tileHover === item.id}]"
                    @touchstart="tileInfoToggle(item.id)"
                >
                    <img
                        :src="require('~/assets/images/countries/' + item.code + '.jpg')"
                        :alt="item.code"
                        class="tile__img"
                    >
                    <div class="tile__box">
                        <span class="tile__rating tile__text">{{ item.rating }}</span>
                        <span class="tile__title">
                            {{ item.name }}
                        </span>
                        <span class="tile__text tile__coast">€{{ item.info.cost_of_living_amount }} / M</span>
                    </div>
                    <div class="tile__info">
                        <div class="tile__stat">
                            <div class="tile__stat-text">
                                <span>{{ $t('users') }}</span>
                                <p><b>{{ bigNumberFormat(item.users_count) }}</b></p>
                            </div>
                            <div class="tile__people">
                                <div
                                    v-for="item in item.users"
                                    :key="item.id"
                                    class="img"
                                >
                                    <img
                                        v-if="item.profile.avatar"
                                        :src="item.profile.avatar"
                                        alt="people"
                                        crossorigin="anonymous"
                                    >
                                    <human-icon v-else />
                                </div>
                            </div>
                        </div>
                        <div class="tile__stat">
                            <div class="tile__stat-text">
                                <p>{{ $t('costs_month') }}</p>
                            </div>
                            <progress-bar
                                style="width: 92px;height: 24px;border-radius: 8px;"
                                :value="item.info.cost_of_living_percent"
                            />
                        </div>
                        <div class="tile__stat">
                            <div class="tile__stat-text">
                                <p>{{ $t('security') }}</p>
                            </div>
                            <progress-bar
                                style="width: 92px;height: 24px;border-radius: 8px;"
                                :value="item.info.safety"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!--<loader-item
                class="preloader--small"
                :stroke-width="5"
            />
            <div class="btn-wrapper anim anim-fade">
                <button
                    type="button"
                    class="btn btn--large btn--primary"
                >
                    {{ $t('show_more') }}
                </button>
            </div>-->
        </div>
    </section>
</template>

<script>
import { bigNumberFormat } from '@/helpers/number';
import TabSwipe from '@/components/Common/TabSwipe.vue';
import ProgressBar from '@/components/Common/ProgressBar';
// import LoaderItem from '@/components/Common/Loader';
import EarthAll from '~/assets/icons/earth-all.svg?raw';
import EarthEurope from '~/assets/icons/earth-europe.svg?raw';
import EarthAsia from '~/assets/icons/earth-asia.svg?raw';
import EarthNorthAmerica from '~/assets/icons/earth-north-america.svg?raw';
import EarthSouthAmerica from '~/assets/icons/earth-south-america.svg?raw';
import EarthAustralia from '~/assets/icons/earth-australia.svg?raw';
// import EarthAfrica from '~/assets/icons/earth-africa.svg?raw';
import HumanIcon from '~/assets/icons/human-icon.svg?inline';

export default {
    name: 'KnowBaseSection',
    components: {
        ProgressBar, TabSwipe, HumanIcon
    },
    props: {
        list: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            tileHover: null,
            tabs: {
                selected: 1,
                list: [
                    {
                        id: 1,
                        icon: EarthAll,
                        name: this.$t('all_countries')
                    },
                    {
                        id: 2,
                        icon: EarthEurope,
                        name: this.$t('europe')
                    },
                    {
                        id: 3,
                        icon: EarthAsia,
                        name: this.$t('asia')
                    },
                    {
                        id: 4,
                        icon: EarthNorthAmerica,
                        name: this.$t('north_america')
                    },
                    {
                        id: 5,
                        icon: EarthSouthAmerica,
                        name: this.$t('south_america')
                    },
                    {
                        id: 6,
                        icon: EarthAustralia,
                        name: this.$t('australia')
                    }
                    // {
                    //     id: 7,
                    //     icon: EarthAfrica,
                    //     name: this.$t('africa')
                    // }
                ]
            }
        };
    },
    computed: {
        listCountries() {
            if (this.tabs.selected === 1) {
                return this.list;
            }
            return this.list.filter((item) => item.continent_ids.indexOf(this.tabs.selected - 1) !== -1);
        }
    },
    mounted() {
        window.addEventListener('resize', this.noTouch);
    },
    methods: {
        bigNumberFormat,
        tileInfoToggle(id) {
            this.tileHover = this.tileHover === id ? null : id;
        },
        tileInfoHidden() {
            if (this.tileHover !== null) {
                this.tileHover = null;
            }
        },
        noTouch() {
            const touch = window.matchMedia('(hover: hover)');
            if (touch.matches === true) {
                this.tileHover = null;
            }
        }
    }
};
</script>
