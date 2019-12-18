// ACCEL_SO系請求情報照会(各種ID指定)
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelSoBillingByIds(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }

  return RestUtil.fetch(RestPath.BILLING_ACCEL_SO_BILLING_BY_IDS, data)
}
