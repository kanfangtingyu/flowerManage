// 顧客名検索における大量検索防止チェック
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function customerinfoSearchLimitCheck(limitCheck, option) {
  let data = {
    RequestData: limitCheck,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_CUSTOMERINFO_SEARCH_LIMITCHECK, data)
}
