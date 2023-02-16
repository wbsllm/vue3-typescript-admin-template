import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_APP_BASE_API
const service = axios.create({
  baseURL,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    const {
      status,
      data: { code, msg }
    } = err.response
    console.debug('error :', msg)
    if (status === 401 && code === 100051) {
    } else if (status === 500) {
      ElMessage.error(msg)
      return Promise.reject(err.response.data)
    } else {
      return Promise.reject(err.response.data)
    }
  }
)

export default {
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return service.get<T, T>(url, config)
  },

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return service.post<T, T, D>(url, data, config)
  },

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return service.put<T, T, D>(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return service.delete<T, T>(url, config)
  }
}
