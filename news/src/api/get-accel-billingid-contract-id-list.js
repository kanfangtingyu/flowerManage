// ACCELビリング配下契約ID照会
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAccelBillingidContractIdList(sysMsg, option) {
  let data = {
    SysMsgAre: sysMsg,
    OptionAre: option
  }
  return RestUtil.fetch(
    RestPath.BILLING_ACCEL_BILLINGID_CONTRACT_ID_LIST,
    data
  )
}
