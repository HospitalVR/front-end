import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import {store} from "@/store"
import "@/style/global.less"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/style/tailwindcss.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  components: {
    App
  },
  router,store,
  render: h => h(App)
}).$mount('#app') //挂载节点
