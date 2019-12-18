// 廃止済役務一覧照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getDisusedServiceList(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.CUSTOMER_DISUSED_SERVICE_LIST, data)
}
