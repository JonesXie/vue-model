import Vue from 'vue'
import App from './App.vue'
import "./assets/css/reset.css" //重置样式
import router from "./config/RouterConfig" //引入路由配置
import store from '@/store/store.js' //引入vuex配置


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
