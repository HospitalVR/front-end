<template>
  <div id="app">
    <HospitalVR />
    <!-- <Entry /> -->
  </div>
</template>

<script>
import Entry from './page/webvr/Entry.vue';
import HospitalVR from './page/webvr/HospitalVR.vue';
export default {
  name: 'App',
  components: {
    Entry,HospitalVR
  }
}
</script>

<style lang="less" scoped>
body,html {
  margin: 0;
  padding: 0;
}
</style>
