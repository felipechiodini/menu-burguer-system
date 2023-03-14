import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/assets/css/custom.scss'
import '@/assets/css/reset.scss'

import Mixins from '@/js/Mixins'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.mixin(Mixins)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
