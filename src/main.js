import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

window.axios = require('axios')

import swal from 'sweetalert';
window.Swal = swal;

window.axios = require('axios')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
