<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HospitalVR from './page/webvr/HospitalVR.vue';
import Home from './page/home/Home.vue';
import Add_disease from './page/disease_viewer/Add_disease.vue';
import Case_list from './page/disease_viewer/Case_list.vue';
import Disease_view from './page/disease_viewer/Disease_view.vue';
import Edit_disease from './page/disease_viewer/Edit_disease.vue';
import Disease_group from './component/Disease_group.vue';
import Disease_list from './component/Disease_list.vue';
import Picture_editor from './component/Picture_editor.vue';
import Video_editor from './component/Video_editor.vue';
export default {
  name: 'App',
  components: {
    HospitalVR,Home,Add_disease,Case_list, Disease_view, Edit_disease, Disease_group, Disease_list, Picture_editor, Video_editor
  }
}
</script>

<style lang="less" scoped>
body,html {
  margin: 0;
  padding: 0;
}
</style>
