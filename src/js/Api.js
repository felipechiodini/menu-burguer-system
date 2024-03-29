import Axios from 'axios'
import Router from '@/router'

const slug = (process.env.NODE_ENV === 'development') ? process.env.VUE_APP_DEVELOPMENT_STORE_SLUG : window.location.host.split('.')[0]

const Api = Axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/${slug}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 503) {
    Router.push({ name: 'maintenance' })
  }

  return Promise.reject(error)
})

export default Api
