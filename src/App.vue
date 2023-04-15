<template>
  <div class="app">
    <router-view></router-view>
  </div>
  
</template>

<script>
import HospitalVR from './page/webvr/HospitalVR.vue';
import Home from './page/home/Home.vue';

export default {
  name: 'App',
  components: {
    HospitalVR,
    Home,
  }
}
</script>

<style lang="less" scoped>
body,html {
  margin: 0;
  padding: 0;
}
</style>
