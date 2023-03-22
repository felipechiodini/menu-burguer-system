import Api from "@/js/Api"
import { requestPermission } from "@/js/Location"
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

      const { data } = await Api.get('/store', {
        params: {
          slug: Router.currentRoute.params.store_slug
        }
      })

      document.title = data.name

      commit('setStore', data)
    } catch (error) {
      commit('setError', true)
    }

    commit('setLoading', false)
  },
  loadDistance({ commit }) {
    requestPermission((position) => {
      Api.get('distance', {
        params: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }).then(({ data }) => {
        commit('setDistance', data.distance)
      })
    })
  }
}

const mutations = {
  setStore(state, store) {
    state.store = store
  },
  setDistance(state, distance) {
    state.store.distance = parseFloat(distance)
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