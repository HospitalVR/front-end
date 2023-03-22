<template>
    <div class="hospital_main-container">
        <Hexagon x="170" y="240" slideLen="200"/>
        <Hexagon x="320" y="340" slideLen="200"/>
        <Hexagon x="470" y="240" slideLen="200"/>
        <Hexagon x="620" y="140" slideLen="200"/>
        <Hexagon x="770" y="240" slideLen="200"/>
    </div>
</template>

<script>
import Hexagon from '@/component/Hexagon.vue';
    export default {
        name: "Main",
        components: {
            Hexagon
        },
        data() {
            return {


            }
        }
    }
</script>

<style lang="less" scoped>
.hospital_main-container {
    height: calc(100vh - 60px);
    padding-top: 60px;
    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);

}
</style>