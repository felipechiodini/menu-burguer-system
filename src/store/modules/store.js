import Api from "@/js/Api"
import Router from '@/router'

const state = {
  store: null,
  loading: null,
  error: null,
}

const getters = {
  store: (state) => {
    return state.store
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  }
}

const actions = {
  async loadStore({ commit }) {
    try {
      commit('setLoading', true)

      const { data } = await Api.get('/store')

      document.title = data.store.name
      commit('setStore', data.store)
      commit('setError', false)
      commit('setLoading', false)
    } catch (error) {
      commit('setStore', null)
      commit('setError', true)
      commit('setLoading', false)
    }
  },

  setDistance({ commit }, payload) {
    commit('setLoading', payload)
  }
}

const mutations = {
  setStore(state, store) {
    state.store = store
  },
  setDistance(state, distance) {
    state.store.distance = parseFloat(distance)

    console.log(state.store)
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}