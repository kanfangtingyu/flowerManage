// ACCEL収納状況照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelReceiptStatus(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }

  return RestUtil.fetch(RestPath.BILLING_ACCEL_RECEIPT_STATUS, data)
}
