/**
 * scl0200の処理方法
 * @module /src/views/BaseFrame/Layout/SCL0200/scl0200-method.js
 * @author IBM CIC
 */
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as GlobalConstants from '@/constants/global-constants'
import * as CARDIDLIST from '@/constants/card-id-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as SCL02CONS from './scl0200-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as DATE_CONS from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import moment from 'moment'

export default {
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      // mainCard一覧取得
      this.mainCardList = this.$store.getters.mainCardList.slice(0)
      if (this.customerInfo) {
        let nowDate = null
        let searchInfo = this.$store.getters.searchInfo
        if (searchInfo.searchKey && searchInfo.searchKey.alternateValue === 5) {
          nowDate = searchInfo.searchKey.alternateInputValue
        } else {
          nowDate = moment().format(DATE_CONS.YYYYMMDD)
        }
        let endDidEkimuListSrchReq = { ...SCL02CONS.EKIMULIST_PARAM }
        endDidEkimuListSrchReq.srchObjectDate = nowDate
        endDidEkimuListSrchReq.commonCustId = this.customerInfo.commonCustId
        /**
         * 廃止済役務一覧照会要求API取得
         * @param {String} commonCustId 共通顧客ID
         * @param {String} srchObjectDate 照会対象年月日
         */
        let sysMsg = {
          endDidEkimuListSrchReq
        }
        let option = { optionId: OPTION_ID.SCL0200A, traceLog: false }
        let response = null
        try {
          LoadingUtil.show()
          response = await getDisusedServiceList(sysMsg, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(OPTION_ID.SCL0200A, error)
          return
        }
        LoadingUtil.hidden()
        if (response.data.SysMsgAre) {
          this.scl0200Model = response.data.SysMsgAre.ekimuListSrchRes
          this.scl0200Model.ekimuListInfo =
            response.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
          const ekimuListInfo = this.scl0200Model.ekimuListInfo
          const syouhinList = ekimuListInfo
          this.scl0200Model.totalCount = syouhinList.reduce(
            (sum, item) => sum + item.recRecNum,
            0
          )
          let prevEkimuListInfo = []
          this.scl0200Model.ekimuListInfo.forEach(item => {
            this.setEkimuListInfo(item, item.recRecNum, prevEkimuListInfo)
          })
          this.scl0200Model.ekimuListInfo = prevEkimuListInfo.slice(0)
        } else {
          this.scl0200Model.ekimuListInfo = {}
          this.nodata = true
        }
        this.scl0200Model.ekimuListInfo.sort((a, b) => {
          return b.recRecNum - a.recRecNum
        })
      }
    },
    /**
     * 同じ役務コードの場合、レコード件数の加算
     * @param {*} item
     * @param {*} recRecNum
     * @param {*} prevEkimuListInfo
     */
    setEkimuListInfo(item, recRecNum, prevEkimuListInfo) {
      // 新しい項目が追加するかどうかの判断
      let hasFlag = true
      for (let i = 0; i < prevEkimuListInfo.length; i++) {
        let prevItem = prevEkimuListInfo[i]
        if (item.ekimuCode === prevItem['ekimuCode']) {
          // 現在のレコード件数
          let havenNum = prevItem['recRecNum']

          // 新しいと古いレコード件数の総合
          let newNum = parseInt(recRecNum) + parseInt(havenNum)

          // レコード件数の更新
          prevItem['recRecNum'] = newNum

          hasFlag = false
          break
        }
      }

      // 未存如或结果数组为空
      if (hasFlag || prevEkimuListInfo.length === 0) {
        item.recRecNum = recRecNum
        prevEkimuListInfo.push(item)
      }
    },
    // データがあるかどうかのことによって、カードの高さを設定する
    isCardShow() {
      if (this.insrvChange || !this.isCutomInfoSet) {
        return 'scl0200-style no-data-height'
      } else {
        return 'scl0200-style card-height'
      }
    },
    // メインカード追加する時、上のフォーカスにする
    toMainCardTop() {
      if (this.mainCardTop === GlobalConstants.DISTANCE_TOP) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, this.mainCardTop - GlobalConstants.DISTANCE_TOP - 2)
      }
    },
    /**
     * 役務コードとサービスコードによって、
     * Maincard03 or Maincard04 に遷移する
     */
    onOpenMclList(cardInfo) {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      this.toMainCardTop()
      for (let i = 0; i < componentList.length; i++) {
        let item = componentList[i]
        if (
          item.ekimuCode === cardInfo.ekimuCode &&
          item.componentName === 'サービス一覧'
        ) {
          if (item.srvcKindCode !== '  ') {
            this.selectedComponent = item
            break
          } else {
            this.selectedComponent = item
            break
          }
        } else if (
          item.ekimuCode === cardInfo.ekimuCode &&
          item.componentName === '契約一覧'
        ) {
          this.selectedComponent = item
          break
        }
      }
      let refreshView = this.updateMaincardList(this.selectedComponent)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
    },
    /**
     * MCL0200_役務別契約件数一覧に遷移する
     */
    onOpenMcl0200() {
      if (this.customerInfo) {
        this.toMainCardTop()
        this.selectedComponent = {
          isActived: false,
          component: CARDIDLIST.MCL0200,
          componentName: GlobalConstants.EKIMU_CONTRACT_NUM_LIST,
          name: GlobalConstants.EKIMU_CONTRACT_NUM_LIST,
          ekimuCode: '',
          srvcKindCode: '  '
        }
        let refreshView = this.updateMaincardList(this.selectedComponent)
        if (refreshView) {
          // 画面レファレンス
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
        }
      }
    }
  }
}
