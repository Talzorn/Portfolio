<template>
    <div class="tile-grid">
        <template v-if="list">
            <div class="tile"
                v-for="item in list"
                :key="item.id"
            >
                <div class="tile__top">
                    <span class="tile__name">{{ item.name }}</span>
                    <div class="tile__network">
                        <ion-img
                            v-for="network in item.networks"
                            :key="network.id"
                            :src="require('@/assets/icons/networks/' + network.icon)" />
                    </div>
                </div>
                <div class="tile__middle">
                    <div class="tile__price-group">
                        <span class="tile__text--small">Количество</span>
                        <p class="tile__price">{{ item.price.number }}<b>{{ item.price.currency }}</b></p>
                    </div>
                    <div class="tile__box">
                        <div class="tile__colum">
                            <div class="tile__group">
                                <span class="tile__text--small">Сумма</span>
                                <p class="tile__text">{{ item.amount }}</p>
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Время оплаты</span>
                                <p class="tile__text">{{ item.time }}</p>
                            </div>
                        </div>
                        <div class="tile__colum">
                            <ion-button class="btn btn--success" size="small" expand="block">Купить</ion-button>
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
                v-for="(item, index) in 2"
                :key="index"
            >
                <div class="tile__top">
                    <ion-skeleton-text animated style="width: 60%; margin-right: auto; line-height: 22px;" />
                </div>
                <div class="tile__middle">
                    <div class="tile__price-group">
                        <span class="tile__text--small">Количество</span>
                        <p class="tile__price"><ion-skeleton-text animated style="width: 50%; line-height: 28px" /></p>
                    </div>
                    <div class="tile__box">
                        <div class="tile__colum">
                            <div class="tile__group">
                                <span class="tile__text--small">Сумма</span>
                                <ion-skeleton-text animated style="width: 60%; line-height: 19px" />
                            </div>
                            <div class="tile__group">
                                <span class="tile__text--small">Время оплаты</span>
                                <ion-skeleton-text animated style="width: 50%; line-height: 19px" />
                            </div>
                        </div>
                        <div class="tile__colum">
                            <ion-button class="btn btn--success" size="small" expand="block">Купить</ion-button>
                        </div>
                    </div>
                </div>
                <div class="tile__bottom">
                    <ion-skeleton-text animated style="width: 45%; line-height: 12px; margin-bottom: 8px" />
                </div>
            </div>
        </template>

        <!-- Выводим этот элемент когда нет ни 1 заказа -->
        <p class="no-elements tile-grid--full-w">У вас ещё нет ни одного заказа.</p>
    </div>
</template>

<script>
import {IonButton, IonSkeletonText, IonImg } from '@ionic/vue';

export default {
    name: "OrderBuyPage",
    components: { IonButton, IonSkeletonText, IonImg },
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'Lord Commander',
                    price: {
                        number: '8885',
                        currency: 'usdt'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'BSC.svg'
                        }
                    ],
                    amount: '9977,85 USD',
                    time: '00:14:19',
                    bank: [
                        {
                            id: 1,
                            name: 'AXA Banque',
                            color: 1
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Lord Commander',
                    price: {
                        number: '8885',
                        currency: 'usdt'
                    },
                    networks: [
                        {
                            id: 1,
                            icon: 'Solana.svg'
                        }
                    ],
                    amount: '9977,85 USD',
                    time: '00:14:19',
                    bank: [
                        {
                            id: 1,
                            name: 'Banque',
                            color: 3
                        }
                    ]
                },
            ]
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