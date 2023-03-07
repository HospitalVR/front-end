import Vue from 'vue'
import App from './App.vue'
import "@/style/global.less"

Vue.config.productionTip = false

new Vue({
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app') //挂载节点
