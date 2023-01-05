<template>
    <div class="profile-about">
        <template v-if="isLoadData || !user">
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 90%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 60%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 70%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 8px;width: 40%"></ion-skeleton-text>
            <ion-skeleton-text animated style="line-height: 18px;margin-bottom: 24px;width: 60%"></ion-skeleton-text>
        </template>
        <template v-else>
            <span class="profile-about__text"
                v-if="user.profile.full_description"
                v-html="textLinkFormatter(user.profile.full_description)"
            />
        </template>

        <div class="profile-about__box">
            <span class="profile__title">{{ $t('auth.profession') }}</span>
            <div class="categories-link">
                <template v-if="!user">
                    <ion-skeleton-text animated style="min-width: 90px;height: 24px;margin: 10px 10px 0 0;--border-radius: 8px;"
                        :style="{width: '90' * 1 / 2.5 + 'px'}"
                    />
                </template>
                <template v-else>
                    <ion-button class="profession-link" expand="block"
                        :style="{'--background': '#944bba'}"
                        @click="goToFilter({
                            countryIds: null,
                            wishCountryIds: null,
                            interestIds: null,
                            usefulIds: null,
                            professionIds: [user.profile.profession.id],
                            englishLevelIds: null
                        })"
                    >
                        <span>{{ user.profile.profession.name }}</span>
                    </ion-button>
                </template>
            </div>
        </div>

        <div class="profile-about__box">
            <span class="profile__title">{{ $t('auth.english_level') }}</span>
            <div class="categories-link">
                <template v-if="!selectedEnglishLevel">
                    <ion-skeleton-text animated style="min-width: 90px;height: 24px;margin: 10px 10px 0 0;--border-radius: 8px;"
                        :style="{width: '140' + 'px'}"
                    />
                </template>
                <template v-else>
                    <ion-button class="btn button-mini" color="secondary" expand="block"
                        @click="goToFilter({
                            countryIds: null,
                            wishCountryIds: null,
                            interestIds: null,
                            usefulIds: null,
                            professionIds: null,
                            englishLevelIds: [user.profile.english_level]
                        })"
                    >
                        <span>{{ selectedEnglishLevel.name }}</span>
                    </ion-button>
                </template>
            </div>
        </div>

        <div class="profile-about__box">
            <span class="profile__title">{{ $t('tab.want_move') }}</span>
            <div class="categories-link">
                <template v-if="!user">
                    <ion-skeleton-text animated style="min-width: 90px;height: 24px;margin: 10px 10px 0 0;--border-radius: 8px;"
                        v-for="item in 4"
                        :key="item"
                        :style="{width: '90' * item / 2.5 + 'px'}"
                    />
                </template>
                <template v-else>
                    <ion-button class="btn button-mini" color="secondary" expand="block"
                        v-for="item in user.wish_countries"
                        :key="item.id"
                        @click="goToFilter({
                            countryIds: null,
                            wishCountryIds: [item.id],
                            interestIds: null,
                            usefulIds: null,
                            professionIds: null,
                            englishLevelIds: null
                        })"
                    >
                        {{ item.name }}
                        <div class="button-mini__flags">
                            <ion-img :src="require('@/assets/icons/flags/' + item.code + '.jpg')"/>
                        </div>
                    </ion-button>
                </template>
            </div>
        </div>

        <div class="profile-about__box">
            <span class="profile__title">{{ $t('tab.in_need') }}</span>
            <div class="categories-link">
                <template v-if="!user">
                    <ion-skeleton-text animated style="min-width: 90px;height: 24px;margin: 10px 10px 0 0;--border-radius: 8px;"
                        v-for="item in 4"
                        :key="item"
                        :style="{width: '90' * item / 2.5 + 'px'}"
                    />
                </template>
                <template v-else>
                    <ion-button class="btn button-mini" color="secondary" expand="block"
                        v-for="item in user.interests"
                        :key="item.id"
                        @click="goToFilter({
                            interestIds: [item.id],
                            countryIds: item.countries.map((country) => country.id),
                            usefulIds: null,
                            professionIds: null,
                            englishLevelIds: null,
                            wishCountryIds: null
                        })"
                    >
                        {{ item.name }}
                        <div class="button-mini__flags">
                            <ion-img
                                v-for="item in itemCountry(item.countries)"
                                :key="item.id"
                                :src="require('@/assets/icons/flags/' + item.code + '.jpg')"
                            />
                            <span
                                v-if="item.countries.length > 5"
                            >+{{ item.countries.length - 5 }}</span>
                        </div>
                    </ion-button>
                </template>
            </div>
        </div>

        <div class="profile-about__box">
            <span class="profile__title">{{ $t('tab.i_can_useful') }}</span>
            <div class="categories-link">
                <template v-if="!user">
                    <ion-skeleton-text animated style="min-width: 90px;height: 24px;margin: 10px 10px 0 0;--border-radius: 8px;"
                        v-for="item in 4"
                        :key="item"
                        :style="{width: '90' * item / 2.5 + 'px'}"
                    />
                </template>
                <template v-else>
                    <ion-button class="btn button-mini" color="secondary" expand="block"
                        v-for="item in user.usefuls"
                        :key="item.id"
                        @click="goToFilter({
                            usefulIds: [item.id],
                            countryIds: item.countries.map((country) => country.id),
                            interestIds: null,
                            professionIds: null,
                            englishLevelIds: null,
                            wishCountryIds: null
                        })"
                    >
                        {{ item.name }}
                        <div class="button-mini__flags">
                            <ion-img
                                v-for="item in itemCountry(item.countries)"
                                :key="item.id"
                                :src="require('@/assets/icons/flags/' + item.code + '.jpg')"
                            />
                            <span
                                v-if="item.countries.length > 5"
                            >+{{ item.countries.length - 5 }}</span>
                        </div>
                    </ion-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { IonButton, IonSkeletonText, IonImg } from "@ionic/vue";
import { mapActions, mapGetters } from "vuex";
import { textLinkFormatter } from '@/helpers/common';

export default {
    name: "ProfileAbout",
    components: { IonButton, IonSkeletonText, IonImg },
    props: {
        isLoadData: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (!this.englishLevels.length) {
            this.fetchEnglishLevels();
        }
    },
    computed: {
        ...mapGetters({
            englishLevels: 'reference/GET_ENGLISH_LEVELS',
            user: 'profile/GET_USER',
        }),
        selectedEnglishLevel() {
            if (this.englishLevels?.length && this.user) {
                return this.englishLevels.find((item) => item.id === this.user.profile.english_level)
            }
            return null;
        }
    },
    methods: {
        textLinkFormatter,
        ...mapActions({
            fetchEnglishLevels: 'reference/fetchEnglishLevels',
        }),
        goToFilter(param) {
            this.$store.commit('user/SET_USER_SAMPLE_PARAMS', param);

            this.$router.push('/people');
        },
        itemCountry(value) {
            return value.length > 5 ? value.slice(0,5) : value;
        }
    }
}
</script>
