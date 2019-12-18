// 廃止済顧客ディレクトリ照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getDisusedCustomerDirectory(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.CUSTOMER_DISUSED_CUSTOMER_DIRECTORY, data)
}
