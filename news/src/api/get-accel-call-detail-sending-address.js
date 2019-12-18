// ACCEL通話明細送付先照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelCallDetailSendingAddress(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(
    RestPath.CONTRACT_ACCEL_CALL_DETAIL_SENDING_ADDRESS,
    data
  )
}
