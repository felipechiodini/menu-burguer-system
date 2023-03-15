import Axios from 'axios'
import Storage from '@/js/Storage'
import Router from '@/router'

const Api = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-store-uuid': 'bdb04651-a3bc-3e9b-a2e7-16f2a6065732'
  }
})

Api.interceptors.request.use(function (config) {
  const token = Storage.get('user', 'token')
  if (token) config.headers.Authorization = 'Bearer ' + token
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