/**
 * 重処理の防止のためなどに、アプリケーション全体を活性・非活性するためのユーティリティ。
 * @module src/utils/loading-util.js
 * @author IBM
 */

import { Loading } from 'element-ui'
import store from '@/store'

/**
 * アプリケーション全体を活性状態にする.<br>
 * loading状態により、制御する
 */
export function hidden() {
  let loadingNum = store.getters.loadingNum
  loadingNum = loadingNum - 1
  store.commit('app/SET_LOADING_NUM', loadingNum)
  if (store.getters.loadingNum === 0) {
    Loading.service().close()
  }
}

/**
 * アプリケーション全体を非活性状態にする.<br>
 * loading状態により、制御する
 */
export function show() {
  let loadingNum = store.getters.loadingNum
  loadingNum = loadingNum + 1
  store.commit('app/SET_LOADING_NUM', loadingNum)
  if (store.getters.loadingNum > 0) {
    Loading.service({
      fullscreen: true,
      lock: true,
      text: 'データ読み込み中',
      spinner: 'el-icon-loading',
      background: 'rgba(155, 155, 155, 0.5)'
    })
  }
}
