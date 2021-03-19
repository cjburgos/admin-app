import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import auth from './auth';

import './../node_modules/bulma/css/bulma.css';

auth.checkAuth()

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    "authenticated":false
  },
  mutations: {
    isAuthenticated(){
      this.authenticated = true
    },
    isNotAuthenticated(){
      this.authenticated = false
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
