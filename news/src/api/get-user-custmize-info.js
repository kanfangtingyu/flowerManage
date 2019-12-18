// ユーザーカスタマイズ情報取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getUserCustmizeInfo(userId, option) {
  let data = {
    RequestData: userId,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_GET_USERCUSTMIZEINFO, data)
}
