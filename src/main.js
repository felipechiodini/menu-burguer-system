import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/assets/css/custom.scss'
import '@/assets/css/reset.scss'

import VWave from 'v-wave'

Vue.use(VWave, {
  color: '#ccc',
  initialOpacity: 0.5,
  easing: 'ease-in',
  dissolveDuration: .5
})

import Mixins from '@/js/Mixins'
import VueCarousel from 'vue-carousel'
import store from './store'
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective)
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.mixin(Mixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
