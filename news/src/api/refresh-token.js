// 市区町村取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function refreshToken(cityInfo, option) {
  let data = {}
  return RestUtil.fetch(RestPath.REFRESH_TOKEN, data)
}
