import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import i18n from './i18n'
import store from './store'
import '@/assets/js/websocket'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
