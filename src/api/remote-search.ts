import request from '@/utils/request'

export function searchUser(name: string) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList() {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get'
  })
}
