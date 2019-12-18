// 字/丁目取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getStreetInfo(streetInfo, option) {
  let data = {
    RequestData: streetInfo,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_STREETINFO, data)
}
