import Axios from 'axios'
import Router from '@/router'
import store from '@/store'

const Api = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL + '/' + store.getters['store/store'].slug + '/delivery',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

Api.interceptors.request.use(function (config) {
  if (store.getters['store/store']) {
    config.headers['x-store-uuid'] = store.getters['store/store'].id
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    Storage.clear('user')
    Router.push({ name: 'PAINEL' })
  }

  if (error.response.status === 503) {
    Router.push({ name: 'maintenance' })
  }

  return Promise.reject(error)
})

export default Api