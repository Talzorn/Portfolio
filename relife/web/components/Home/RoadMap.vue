<template>
    <section
        id="road-map"
        class="road-map"
    >
        <div class="wrapper">
            <h2 class="anim anim-up">
                {{ $t('home.road_map_h2') }}
            </h2>
        </div>
        <div
            id="road-map-track"
            class="road-map__cont"
        >
            <div class="road-map__track">
                <div
                    v-for="item in roadMap"
                    :key="item.id"
                    class="road-map__box anim"
                    :class="{
                        reverse: item.reverse,
                        'anim-up': !item.reverse,
                        'anim-down': item.reverse
                    }"
                >
                    <div class="road-map__block">
                        <h3 class="road-map__title">
                            {{ $t(item.title) }}
                        </h3>
                        <span class="road-map__text">{{ $t(item.text) }}</span>
                        <span
                            class="road-map__coming"
                            :style="{color: item.coming ? 'var(--color-primary)' : 'var(--color-success)'}"
                        >{{ $t(statusText(item.coming)) }}</span>
                    </div>
                    <line-icon class="road-map__line anim-fade" />
                </div>
                <div class="road-map__wave">
                    <wave-icon />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import WaveIcon from '~/assets/images/roadmap-wave.svg?inline';
import LineIcon from '~/assets/images/roadmap-line.svg?inline';

export default {
    name: 'RoadMapSection',
    components: { WaveIcon, LineIcon },
    data() {
        return {
            roadMap: [
                {
                    id: 1,
                    title: 'home.road_map__title_1',
                    text: 'home.road_map__text_1',
                    reverse: false,
                    coming: false
                },
                {
                    id: 2,
                    title: 'home.road_map__title_2',
                    text: 'home.road_map__text_2',
                    reverse: true,
                    coming: false
                },
                {
                    id: 3,
                    title: 'home.road_map__title_3',
                    text: 'home.road_map__text_3',
                    reverse: false,
                    coming: false
                },
                {
                    id: 4,
                    title: 'home.road_map__title_4',
                    text: 'home.road_map__text_4',
                    reverse: true,
                    coming: true
                },
                {
                    id: 5,
                    title: 'home.road_map__title_5',
                    text: 'home.road_map__text_5',
                    reverse: false,
                    coming: true
                },
                {
                    id: 6,
                    title: 'home.road_map__title_6',
                    text: 'home.road_map__text_6',
                    reverse: true,
                    coming: true
                },
                {
                    id: 7,
                    title: 'home.road_map__title_7',
                    text: 'home.road_map__text_7',
                    reverse: false,
                    coming: true
                },
                {
                    id: 8,
                    title: 'home.road_map__title_8',
                    text: 'home.road_map__text_8',
                    reverse: true,
                    coming: true
                },
                {
                    id: 9,
                    title: 'home.road_map__title_9',
                    text: 'home.road_map__text_9',
                    reverse: false,
                    coming: true
                },
                {
                    id: 10,
                    title: 'home.road_map__title_10',
                    text: 'home.road_map__text_10',
                    reverse: true,
                    coming: true
                },
                {
                    id: 11,
                    title: 'home.road_map__title_11',
                    text: 'home.road_map__text_11',
                    reverse: false,
                    coming: true
                },
                {
                    id: 12,
                    title: 'home.road_map__title_12',
                    text: 'home.road_map__text_12',
                    reverse: true,
                    coming: true
                }
            ]
        };
    },
    mounted() {
        const ele = document.getElementById('road-map-track');
        ele.style.cursor = 'grab';

        let pos = {
            top: 0, left: 0, x: 0, y: 0
        };

        const mouseDownHandler = function (e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';

            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        ele.addEventListener('mousedown', mouseDownHandler);
    },
    methods: {
        statusText(value) {
            return value ? 'coming_soon' : 'done';
        }
    }
};
</script>
