// 都道府県情報取得
// nodejs内部API
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getPrefectureInfo(prefectureInfo, option) {
  let data = {
    RequestData: prefectureInfo,
    OptionAre: option
  }
  return RestUtil.fetch(RestPath.IDPF_DBINFO_PREFECTUREINFO, data)
}
