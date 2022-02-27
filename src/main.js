import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueCountryCode from "vue-country-code-select";
import Vuex from 'vuex'
import store from './store'
import Router from 'vue-router'
import Routes from './routes'

Vue.use(VueCountryCode);
Vue.use(Router);
Vue.config.productionTip = false
Vue.use(Vuex)

const router = new Router({
  mode: 'history',
  routes: Routes
})

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

