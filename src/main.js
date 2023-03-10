import Vue from 'vue'
import App from './App.vue'
import "@/style/global.less"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app') //挂载节点
