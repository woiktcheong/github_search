import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import moment from 'moment'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.component('paginate', Paginate)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('ddd MMM DD YYYY')
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
