// DummyLogin
import * as RestUtil from './rest-util'
import * as RestPath from '@/constants/rest-path-constants'
export function getAuth(RequestData) {
  return RestUtil.fetch(RestPath.GET_AUTH, RequestData)
}
