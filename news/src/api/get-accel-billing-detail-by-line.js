// ACCEL請求内訳照会（回線指定）
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelBillingDetailByLine(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(
    RestPath.BILLING_ACCEL_BILLING_DETAIL_BY_LINE,
    data
  )
}
