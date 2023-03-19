import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import store from './modules/store'
import products from './modules/products'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    store,
    products
  },
  plugins: [
    createPersistedState()
  ]
})
