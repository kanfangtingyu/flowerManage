// バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getIdpfEkimuByAccelServiecekindCode(requestData, option) {
  let data = {
    RequestData: requestData,
    OptionAre: option
  }
  return RestUtil.fetch(
    RestPath.IDPF_DBINFO_GETIDPFEKIMU_BY_ACCEL_SERVICEKINDCODE,
    data
  )
}
