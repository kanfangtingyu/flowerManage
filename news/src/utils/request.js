import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

const TokenKey = 'idpf-token'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
      let token = getToken()
      if (token) {
        config.headers[TokenKey] = token
      }
    } else {
      // ログインの場合、なにもしない
    }

    let comReqHdrAre = store.getters.comReqHdrAre
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        ComReqHdrAre: comReqHdrAre
      }
      config.data = qs.stringify(config.data)
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 登録の場合
    let expireTime = 0
    if (response.config.url.indexOf('/login/getUserInfo') !== -1) {
      expireTime = parseInt(response.data.IDD_SESSION_TIMEOUT)
      // ① クライアントのUserInfo.IDD_SESSION_TIMEOUTより、期限をリセット
      store.commit('app/SET_EXPIRE_TIME', expireTime)
      store.dispatch('app/createTimer')
    } else {
      // 登録以外のrest場合
      store.dispatch('app/resetTimer')
    }

    // ②ロカールtokenを更新
    setToken(response.headers[TokenKey])

    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // セクション期限切れ、token、検索履歴、権限情報をクリア
      store.dispatch('user/sessionExpared')
      store.dispatch('app/clearTimer')
      window.location.href = process.env.VUE_APP_BASE_API + '/login'
    }

    throw error
  }
)

export default service
