/**
 * scl0100の処理方法
 * @module /src/views/BaseFrame/Layout/SCL0100/scl0100-method.js
 * @author IBM CIC
 */
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as GLOBALCONS from '@/constants/global-constants'
import * as CARDIDLIST from '@/constants/card-id-constants'
import * as SCL0100CONS from './scl0100-constants'
import * as IDPFEvent from '@/constants/idpf-event'
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
      // 顧客基本情報取得
      if (this.customerInfo) {
        let nowDate = null
        let searchInfo = this.$store.getters.searchInfo
        if (searchInfo.searchKey && searchInfo.searchKey.alternateValue === 5) {
          nowDate = searchInfo.searchKey.alternateInputValue
        } else {
          nowDate = moment().format(DATE_CONS.YYYYMMDD)
        }

        let endDidEkimuListSrchReq = { ...SCL0100CONS.SERVICE_LIST_PARAM }
        endDidEkimuListSrchReq.srchObjectDate = nowDate
        endDidEkimuListSrchReq.commonCustId = this.customerInfo.commonCustId
        /**
         * 廃止済役務一覧照会API取得
         * @param {String} customerInfo.commonCustId 共通顧客ID
         * @param {String} srchObjectDate 照会対象年月日
         */
        let sysMsg = {
          endDidEkimuListSrchReq
        }
        let option = { optionId: OPTION_ID.SCL0100A, traceLog: false }
        let response
        try {
          LoadingUtil.show()
          response = await getDisusedServiceList(sysMsg, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(OPTION_ID.SCL0100A, error)
          return
        }
        LoadingUtil.hidden()
        if (
          response.status === 200 &&
          response.data.ComResHdrAre &&
          response.data.ComResHdrAre.Imp === 'I'
        ) {
          this.scl0100Model = response.data.SysMsgAre.ekimuListSrchRes
          this.scl0100Model.ekimuListInfo =
            response.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
          this.scl0100Model.totalCount = this.scl0100Model.ekimuListInfo.reduce(
            (sum, item) => sum + item.recRecNum,
            0
          )
        } else if (
          response.status === 200 &&
          ((response.data.ComResHdrAre &&
            response.data.ComResHdrAre.TmlHyjMsgId === 'WScs4001') ||
            response.data.errorCode === 'WScs4003')
        ) {
          this.scl0100Model.ekimuListInfo = {}
          this.nodata = true
        }
        this.scl0100Model.ekimuListInfo.sort((a, b) => {
          return b.recRecNum - a.recRecNum
        })
      }
    },
    // データがあるかどうかのことによって、カードの高さを設定する
    isCardShow() {
      if (this.insrvChange || !this.isCutomInfoSet) {
        return 'scl0100-style no-data-height'
      } else {
        return 'scl0100-style card-height'
      }
    },
    // メインカード追加する時、上のフォーカスにする
    toMainCardTop() {
      if (this.mainCardTop === GLOBALCONS.DISTANCE_TOP) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, this.mainCardTop - GLOBALCONS.DISTANCE_TOP - 2)
      }
    },
    /**
     * 役務コードによって、
     * Maincard03 or Maincard04 に遷移する
     */
    onOpenMclsec(cardInfo) {
      let componentList = GLOBALCONS.MAIN_CARD_LIST.slice(0)
      this.selectedComponent = {}
      for (let i = 0; i < componentList.length; i++) {
        let item = componentList[i]
        if (
          item.srvcKindCode === cardInfo.srvcKindCode &&
          item.ekimuCode === cardInfo.ekimuCode &&
          item.componentName === '契約一覧'
        ) {
          this.selectedComponent = item
          if (cardInfo.srvcKindName !== '') {
            this.selectedComponent.name = cardInfo.srvcKindName
          } else {
            this.selectedComponent.name = cardInfo.ekimuName
          }
        }
      }
      let refreshView = this.updateMaincardList(this.selectedComponent)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
      this.toMainCardTop()
    },
    /**
     * MCL0100_契約中サービス別契約件数一覧画面に遷移する
     */
    onOpenMcl0100() {
      if (this.customerInfo) {
        let selectedComponent = {
          isActived: false,
          component: CARDIDLIST.MCL0100,
          componentName: SCL0100CONS.CONTRACTING_COM_NAME,
          name: SCL0100CONS.CONTRACTING_LIST,
          ekimuCode: '',
          srvcKindCode: '  '
        }
        this.toMainCardTop()
        let refreshView = this.updateMaincardList(selectedComponent)
        if (refreshView) {
          // 画面レファレンス
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
        }
      }
    }
  }
}
