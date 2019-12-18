// nodejs内部API
import request from '@/utils/request'

export function fetch(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
