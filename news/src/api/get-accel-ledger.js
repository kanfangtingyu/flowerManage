// ACCEL原簿照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelLedger(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }

  return RestUtil.fetch(RestPath.BILLING_ACCEL_LEDGER, data)
}
