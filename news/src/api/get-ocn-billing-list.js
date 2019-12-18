// OCN請求情報一覧照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getOcnBillingList(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.BILLING_OCN_BILLING_LIST, data)
}
