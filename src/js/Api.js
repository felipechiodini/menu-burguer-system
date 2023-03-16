import Axios from 'axios'
import Storage from '@/js/Storage'
import Router from '@/router'

const Api = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

Api.interceptors.request.use(function (config) {
  const id = Storage.get('store', 'id')
  if (id) {
    config.headers['x-store-uuid'] = id
    return config
  }
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