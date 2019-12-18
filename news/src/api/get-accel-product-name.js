// プロダクト名称取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getCodeName(requestCode, option) {
  let data = {
    RequestData: requestCode,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_GETACCELSERVICENAME, data)
}
