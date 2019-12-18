// NB基盤画面へ遷移
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function transformToNb(param, option) {
  let data = {
    RequestData: param,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.TRANSFORM_TO_NB, data)
}
