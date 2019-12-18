/**
 * ログインユーザー情報に関るStore
 * @module /store/modules/user.js
 * @author IBM
 */
import { removeToken } from '@/utils/auth'
import {
  removeSimpleSearchHistory,
  removeDetailSearchHistory
} from '@/utils/search-history'
import { logout } from '@/api/logout'
import { updateUserCustmizeInfo } from '@/api/update-user-custmize-info'
import * as UserInfo from '@/utils/user-info'
import Cookies from 'js-cookie'
const state = {
  userInfo: {} // ユーザ権限などの格納
}

const mutations = {}

const actions = {
  // ユーザログアウト
  async logout({ commit }, param) {
    try {
      await updateUserCustmizeInfo(param)

      // ログアウト リクエストする
      await logout()

      // 権限の情報をクリア
      removeToken()
      removeSimpleSearchHistory()
      removeDetailSearchHistory()
      Cookies.remove('idpf-token')
      UserInfo.remove()

      // ログアウト、ブラウザを閉じる
      let userAgent = navigator.userAgent
      if (
        userAgent.indexOf('Firefox') !== -1 ||
        userAgent.indexOf('Chrome') !== -1
      ) {
        window.location.href = 'about:blank'
        window.close()
      } else {
        window.opener = null
        window.open('', '_self')
        window.close()
      }
    } catch (error) {}
  },
  // session期限切れ
  async sessionExpared({ commit }, param) {
    try {
      // 権限の情報をクリア
      removeToken()
      removeSimpleSearchHistory()
      removeDetailSearchHistory()
      UserInfo.remove()

      // ログイン画面に戻る
    } catch (error) {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
