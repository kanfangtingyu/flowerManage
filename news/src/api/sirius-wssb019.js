// SIRIUS呼び出し
import request from '@/utils/request'

export function siriusWssb019(siriusParam, option) {
  return request({
    url: '/sirius/wssb019-json',
    method: 'post',
    data: {
      SiriusParam: siriusParam,
      OptionAre: option
    }
  })
}
