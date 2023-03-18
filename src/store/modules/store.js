const state = {
  store: null,
}

const getters = {
  store: (state) => {
    return state.store
  },
  id: (state) => {
    return state.store?.id
  }
}

const actions = {
  setStore({ commit }, store) {
    commit('setStore', store)
  }
}

const mutations = {
  setStore(state, store) {
    state.store = store
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}