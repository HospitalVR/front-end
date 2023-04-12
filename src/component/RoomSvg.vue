<template>
    <svg class="roomsvg-container" :style="{left: x + 'px', top: y + 'px'}" :viewBox = '`0 0 ${width} ${height}`' :width="width" :height="height" @click="handleClick">
        <polygon :points="`0,0 ${width},0 ${width},${height} 0,${height} 0,0`" :style="{fill: backgroundColor}"></polygon>
        <text :x="width / 2 - 35" :y="height / 2" :style="{fill: '#000'}"><slot></slot></text>
    </svg>
</template>

<script>
    export default {
        name: "RoomSvg",
        data() {
            return {

            }
        },
        methods: {
            handleClick() {
                this.$emit("click", this.$slots.default[0].text);
            }
        },
        props: {
            room: {
                type: String,
                default: "手术室"
            },
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 100
            },
            width: {
                type: Number,
                default: 100
            },
            backgroundColor: {
                type: String,
                default: "#fff"
            }
        }
    }
</script>

<style lang="less" scoped>
.roomsvg-container {
    position: absolute;
    cursor: pointer;

    &:hover {
        border: 2px solid black;
    }
}
</style>