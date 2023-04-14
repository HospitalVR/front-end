<template>
    <div class="hex-container">
        <svg :width="slideLen" :height="slideLen" viewBox = '0 0 115.44 100' :style="{left: x + 'px', top: y + 'px'}">
            <polygon points="28.86,0 86.58,0 115.44,50 86.58,100 28.86,100 0 50 28.86,0"
                style="stroke:#fff;stroke-width:2; fill: transparent" />
            <text x="28.86" y="55"><slot></slot></text>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Hexagon",
        props: {
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            slideLen: {
                type: Number,
                default: 100
            },
        },
        data() {
            return {

            }
        },
        methods:{

        },
        mounted() {
            console.log(this.$slots.default)
        }
    }
</script>

<style lang="less" scoped>
.hex-container {
    cursor: pointer;
    svg {
        position: absolute;
        cursor: pointer;
    }
}
</style>