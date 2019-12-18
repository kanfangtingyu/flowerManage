// ユーザーログアウト
import request from '@/utils/request'

export function logout(param) {
  return request({
    url: '/logout',
    method: 'get',
    data: param
  })
}
