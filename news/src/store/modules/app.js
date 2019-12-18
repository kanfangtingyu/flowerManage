/**
 * アプリケーション全体の状態・データ情報管理用（クライアント情報管理）
 * @module /store/modules/app
 * @author IBM
 */

/**
 * アプリケーション全体の状態格納.
 */
import Vue from 'vue'
import { IDPF_MESSAGE } from '@/constants/idpf-message.js'
import * as UserInfo from '@/utils/user-info'
import moment from 'moment'
import store from '@/store'
import * as DateConstants from '@/constants/date-constants.js'
import { refreshToken } from '@/api/refresh-token'

const REMINDER_TIME = 5 * 60 * 1000 // 五分前、タイムアウト可能を提示

function isTimeOut(state) {
  let times = state.currentTimes + 10 * 1000 // 10秒毎に、監視する
  Vue.set(state, 'currentTimes', times)

  if (
    times > state.expireTime * 60 * 1000 - REMINDER_TIME &&
    !state.isSessionAlertShow
  ) {
    Vue.set(state, 'isSessionAlertShow', true)
    Vue.prototype.$Message.alert(IDPF_MESSAGE.HA01['07'].contant, function() {
      Vue.set(state, 'isSessionAlertShow', false)
      // tokenを更新
      refreshToken()
    })
  }

  // session切れ
  if (times > state.expireTime * 60 * 1000) {
    clearInterval(state.timer)
    Vue.prototype.$Message.alert(IDPF_MESSAGE.HA01['08'].contant, function() {
      store.dispatch('user/sessionExpared')
      window.location.href = process.env.VUE_APP_BASE_API + '/login'
    })
  }
}

const state = {
  comReqHdrAre: {
    TmlMei: 'IF',
    UsrMei: (UserInfo.get() && UserInfo.get().IDD_USER_ID) || '',
    TimeSt: moment().format(DateConstants.YYYYMMDDHHmmss),
    TrcFlg: '0',
    UsrAre: ''
  },
  timer: null,
  expireTime: 0,
  currentTimes: 0,
  // 表示されたmainCard一覧
  mainCardList: [],
  // 表示されたsubCard一覧
  subCardList: [],
  customerInfo: null,
  accelCustomerInfo: null,
  searchInfo: {},
  isSessionAlertShow: false,
  contractInfoSrchResNB: null, // NB基盤からのレスポンスデータ
  loadingNum: 0,
  srchRangeTypeInfo: {},
  contractNoneCard: {}
}

const mutations = {
  SET_ORDER_MASTER(state, data) {
    state.srchRangeTypeInfo = JSON.parse(JSON.stringify(data))
  },
  SET_CONTRACT_NONE_CARD(state, data) {
    state.contractNoneCard = JSON.parse(JSON.stringify(data))
  },
  SET_COMREQHDRARE(state, data) {
    state.comReqHdrAre = JSON.parse(JSON.stringify(data))
  },
  SET_EXPIRE_TIME(state, data) {
    state.expireTime = data
  },
  SET_MAINCARD_LIST(state, data) {
    state.mainCardList = data
  },
  SET_SUBCARD_LIST(state, data) {
    state.subCardList = data
  },
  ADD_MAINCARD(state, data) {
    state.mainCardList.push(data)
  },
  ADD_SUBCARD(state, data) {
    state.subCardList.push(data)
  },
  SET_CUSTOMER_INFO(state, data) {
    state.customerInfo = data
  },
  SET_ACCEL_CUSTOMER_INFO(state, data) {
    state.accelCustomerInfo = data
  },
  SET_SEARCH_INFO(state, data) {
    state.searchInfo = data
  },
  CREATE_TIMER(state, data) {
    let afterFunction = () => {
      isTimeOut(state)
    }
    state.timer = window.setInterval(afterFunction, 10000)
  },
  CLEAR_TIMER(state, data) {
    clearInterval(state.timer)
  },
  RESET_TIMER(state, data) {
    state.currentTimes = 0
  },
  SET_CONTRACT_INFO_SRCH_RES_NB(state, data) {
    state.contractInfoSrchResNB = data
  },
  SET_LOADING_NUM(state, data) {
    state.loadingNum = data
  }
}
const actions = {
  setSrchRangeTypeInfo({ commit }, data) {
    commit('SET_ORDER_MASTER', data)
  },
  setExpireTime({ commit }, expireTime) {
    commit('SET_EXPIRE_TIME', expireTime)
  },
  setMainCardList({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_MAINCARD_LIST', data)
      resolve()
    })
  },
  setSubCardList({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_SUBCARD_LIST', data)
      resolve()
    })
  },
  setCustomerInfo({ commit }, data) {
    commit('SET_CUSTOMER_INFO', data)
  },
  setAccelCustomerInfo({ commit }, data) {
    commit('SET_ACCEL_CUSTOMER_INFO', data)
  },
  setSearchInfo({ commit }, data) {
    commit('SET_SEARCH_INFO', data)
  },
  createTimer({ commit }, data) {
    commit('CREATE_TIMER', data)
  },
  clearTimer({ commit }, data) {
    commit('CLEAR_TIMER', data)
  },
  resetTimer({ commit }, data) {
    commit('RESET_TIMER', data)
  },
  setContractInfoSrchResNB({ commit }, data) {
    commit('SET_CONTRACT_INFO_SRCH_RES_NB', data)
  },
  setContractNoneCard({ commit }, data) {
    commit('SET_CONTRACT_NONE_CARD', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
