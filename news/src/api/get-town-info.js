// 大字/町名取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getTownInfo(townInfo, option) {
  let data = {
    RequestData: townInfo,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_TOWNINFO, data)
}
