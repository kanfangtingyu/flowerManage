// ユーザーログイン
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'

export function getUserInfo(params) {
  let data = {
    RequestData: params
  }

  return RestUtil.fetch(RestPath.GET_USER_INFO, data)
}
