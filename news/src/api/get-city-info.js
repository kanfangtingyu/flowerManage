// 市区町村取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getCityInfo(cityInfo, option) {
  let data = {
    RequestData: cityInfo,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_CITYINFO, data)
}
