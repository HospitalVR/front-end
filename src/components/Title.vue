<template>
  <div class="vr_title-container" :style="iconStyle">
    <svg
      t="1678443167464"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="17925"
      width="24"
      height="24"
    >
      <path
        d="M577.4 792.5L296.9 512 577.4 231.5c11.7-11.7 11.7-30.7-1e-8-42.4s-30.7-11.7-42.39999999 0l-301.7 301.8c-5.9 5.9-8.8 13.5-8.8 21.2 0 7.70000001 2.90000001 15.4 8.8 21.2L535 835c11.7 11.7 30.7 11.7 42.4 0 11.7-11.8 11.7-30.8 0-42.5zM446.6 490.8c-5.9 5.9-8.8 13.5-8.79999999 21.2 0 7.70000001 2.90000001 15.4 8.79999999 21.2L748.3 835c11.7 11.7 30.7 11.7 42.4 0s11.7-30.7 0-42.4L510.19999999 512 790.7 231.5c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0l-301.7 301.7z"
        p-id="17926"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    rotate2d: {
      type: Number,
      default: 0,
    },
    rotate3d: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    iconStyle: {
      get() {
        return {
          transform: `rotate(${this.rotate2d}deg) rotateY(${this.rotate3d}deg) scale(${this.scale})`,
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
.vr_title-container {
  position: absolute;
}
</style>