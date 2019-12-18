// NB基盤照会(汎用IF)
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function nbGenericIf(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.BILLING_NB_GENERIC_IF, data)
}
