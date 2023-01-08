<template>
    <div class="tile-grid">
        <!-- Плитка под открытую сделку -->
        <div class="tile">
            <div class="tile__top">
                <span class="tile__name">Lord Commander</span>
                <div class="tile__network">
                    <ion-img :src="require('@/assets/icons/networks/BSC.svg')" />
                </div>
            </div>
            <div class="tile__middle">
                <div class="tile__price-group">
                    <span class="tile__text--small">Количество</span>
                    <p class="tile__price">8885<b>usdt</b></p>
                </div>
                <div class="tile__box">
                    <div class="tile__colum">
                        <div class="tile__group">
                            <span class="tile__text--small">Сумма</span>
                            <p class="tile__text">9977,85 USD</p>
                        </div>
                        <div class="tile__group">
                            <span class="tile__text--small">Время оплаты</span>
                            <p class="tile__text">00:14:19</p>
                        </div>
                    </div>
                    <div class="tile__colum">
                        <ion-button class="btn btn--primary" size="small" expand="block" router-link="/deal">Перейти</ion-button>
                    </div>
                </div>
            </div>
            <div class="tile__bottom">
                <span class="tile__bank yellow">AXA Banque</span>
            </div>
        </div>

        <template v-if="list">
            <div class="tile"
                v-for="item in list"
                :key="item.id"
            >
                <div class="tile__top">
                    <span class="tile__name">{{ item.name }}</span>
                    <span class="tile__text--small">{{ item.deals }} deals | {{ item.rating }}<ion-icon :icon="star"></ion-icon></span>
                </div>
                <div class="tile__middle">
                    <div class="tile__price-box">
                        <div class="tile__price-group">
                            <span class="tile__text--small">Цена</span>
                            <p class="tile__price">{{ item.price.number }}<b>{{ item.price.currency }}</b></p>
                        </div>
                        <div class="tile__network">
                            <ion-img
                                v-for="network in item.networks"
                                :key="network.id"
                                :src="require('@/assets/icons/networks/' + network.icon)" />
                        </div>
                    </div>
                    <div class="tile__box">
                        <div class="tile__colum">
                            <div class="tile__group">
                                <span class="tile__text--small">Доступно</span>
                                <p class="tile__text">{{ item.available }}</p>
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Лимиты</span>
                                <p class="tile__text">{{ item.limit }}</p>
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Срок оплаты</span>
                                <p class="tile__text">{{ item.time }} мин</p>
                            </div>
                        </div>
                        <div class="tile__colum">
                            <ion-button class="btn btn--success" size="small" expand="block" router-link="/exchange">Обмен</ion-button>
                        </div>
                    </div>
                </div>
                <div class="tile__bottom">
                    <span class="tile__bank"
                        v-for="bank in item.bank"
                        :key="bank.id"
                        :class="getColorsBank(bank.color)"
                    >{{ bank.name }}</span>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="tile"
                v-for="(item, index) in 10"
                :key="index"
            >
                <div class="tile__top">
                    <ion-skeleton-text animated style="width: 40%; margin-right: auto; line-height: 22px;" />
                    <ion-skeleton-text animated style="width: 30%; line-height: 16px; margin-top: 4px;" />
                </div>
                <div class="tile__middle">
                    <div class="tile__price-group">
                        <span class="tile__text--small">Цена</span>
                        <p class="tile__price"><ion-skeleton-text animated style="width: 50%; line-height: 28px" /></p>
                    </div>
                    <div class="tile__box">
                        <div class="tile__colum">
                            <div class="tile__group">
                                <span class="tile__text--small">Доступно</span>
                                <ion-skeleton-text animated style="width: 50%; line-height: 19px" />
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Лимиты</span>
                                <ion-skeleton-text animated style="width: 40%; line-height: 19px" />
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Срок оплаты</span>
                                <ion-skeleton-text animated style="width: 30%; line-height: 19px" />
                            </div>
                        </div>
                        <div class="tile__colum">
                            <ion-button class="btn btn--success" size="small" expand="block">Обмен</ion-button>
                        </div>
                    </div>
                </div>
                <div class="tile__bottom">
                    <ion-skeleton-text animated style="width: 60%; line-height: 12px; margin-bottom: 8px" />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import {IonButton, IonIcon, IonSkeletonText, IonImg } from '@ionic/vue';
import { star } from 'ionicons/icons';

export default {
    name: "TransferExchangePage",
    components: { IonButton, IonIcon, IonSkeletonText, IonImg },
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'GOODMEN',
                    price: {
                        number: '1,123',
                        currency: 'usd'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'BSC.svg'
                        },
                        {
                            id: 2,
                            icon: 'Solana.svg'
                        },
                        {
                            id: 3,
                            icon: 'Etherium.svg'
                        }
                    ],
                    available: '12,249.36 USDT',
                    limit: '$100 - $10.000',
                    time: '15',
                    deals: '176',
                    rating: '4.8',
                    bank: [
                        {
                            id: 1,
                            name: 'AXA Banque',
                            color: 1
                        },
                        {
                            id: 2,
                            name: 'BankTop',
                            color: 2
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'GOODMEN',
                    price: {
                        number: '1,123',
                        currency: 'usd'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'BSC.svg'
                        },
                        {
                            id: 2,
                            icon: 'Etherium.svg'
                        }
                    ],
                    available: '12,249.36 USDT',
                    limit: '$100 - $10.000',
                    time: '15',
                    deals: '176',
                    rating: '4.8',
                    bank: [
                        {
                            id: 1,
                            name: 'AXA Banque',
                            color: 1
                        },
                        {
                            id: 2,
                            name: 'BankTop',
                            color: 2
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'GOODMEN',
                    price: {
                        number: '1,123',
                        currency: 'usd'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'Polygon.svg'
                        }
                    ],
                    available: '12,249.36 USDT',
                    limit: '$100 - $10.000',
                    time: '15',
                    deals: '176',
                    rating: '4.8',
                    bank: [
                        {
                            id: 1,
                            name: 'AXA Banque',
                            color: 1
                        },
                        {
                            id: 2,
                            name: 'BankTop',
                            color: 2
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'GOODMEN',
                    price: {
                        number: '1,123',
                        currency: 'usd'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'BSC.svg'
                        },
                        {
                            id: 2,
                            icon: 'Solana.svg'
                        }
                    ],
                    available: '12,249.36 USDT',
                    limit: '$100 - $10.000',
                    time: '15',
                    deals: '176',
                    rating: '4.8',
                    bank: [
                        {
                            id: 1,
                            name: 'AXA Banque',
                            color: 4
                        },
                        {
                            id: 2,
                            name: 'BankTop',
                            color: 7
                        }
                    ]
                }
            ],
            star
        }
    },
    methods: {
        getColorsBank(value) {
            switch (value) {
                case 1:
                    return 'yellow'
                case 2:
                    return 'purple-2'
                case 3:
                    return 'green'
                case 4:
                    return 'pink'
                case 5:
                    return 'purple'
                case 6:
                    return 'orange'
                case 7:
                    return 'blue'
                case 8:
                    return 'red'
            }
        }
    }
}
</script>