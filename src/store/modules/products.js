import Api from "@/js/Api"

const state = {
  all: []
}

const getters = {
  allProducts(state) {
    return state.all
  }
}

const actions = {
  getAllProducts({ commit }) {
    Api.get('/products').then(({ data }) => {
      commit('setProducts', data.products)
    })
  }
}

const mutations = {
  setProducts (state, products) {
    state.all = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}