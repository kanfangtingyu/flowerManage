// OCN請求科目情報照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getOcnBillingCategory(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.BILLING_OCN_BILLING_CATEGORY, data)
}
