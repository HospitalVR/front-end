<template>
  <div id="app">
    <Entry />
  </div>
</template>

<script>
import Entry from './page/webvr/Entry.vue';
export default {
  name: 'App',
  components: {
    Entry
  }
}
</script>

<style lang="less" scoped>
body,html {
  margin: 0;
  padding: 0;
}
</style>
