
const state = {
  user: null
}

const getters = {
  user: (state) => {
    return state.user
  }
}

const actions = {
  pushAddress: ({ commit }, address) => {
    commit('pushAddress', address)
  }
}

const mutations = {
  pushAddress(state, address) {
    state.address.push(address)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}