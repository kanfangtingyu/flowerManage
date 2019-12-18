// ユーザーカスタマイズ情報更新
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function updateUserCustmizeInfo(userCustmizeInfo, option) {
  let data = {
    RequestData: userCustmizeInfo,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_UPDATE_USERCUSTMIZEINFO, data)
}
