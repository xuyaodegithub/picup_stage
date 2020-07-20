import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import '@/subCom'
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  data: {//事件派发调用$emit 方法 this.$root.eventHub.$emit('eventfunction', yourData)，this.$root.eventHub.$on('eventfunction', fun)
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount('#app')
