// ACCEL候補顧客一覧照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelCustomerList(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }

  return RestUtil.fetch(RestPath.CUSTOMER_ACCEL_CUSTOMER_LIST, data)
}
