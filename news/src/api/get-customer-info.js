// 顧客基本情報照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getCustomerInfo(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.CUSTOMER_CUSTOMER_BUSINESS, data)
}
