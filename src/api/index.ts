import http from '@/utils/request'

export const login = () => {
  return http.get('')
}

export const getInfo = (token: string) => {
  return http.get(token)
}
