/**
 * scl03の処理方法
 * @module /src/views/BaseFrame/Layout/SCL0300/scl0300-method.js
 * @author IBM CIC
 */
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as GlobalConstants from '@/constants/global-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as SCL03_CONSTANTS from '../scl03-constants'
import * as CARD_ID from '@/constants/card-id-constants'
import * as DateConstants from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import moment from 'moment'

export default {
  data() {
    return {
      userNotDefined: GlobalConstants.USER_NOT_DEFINED
    }
  },
  created() {
    // 画面を初期化する
    this.initView()
  },
  watch: {
    srvcKindCode: {
      handler() {
        this.initView()
      }
    }
  },
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      this.dataListInfo = []
      if (this.customerInfo) {
        let nowDate = moment().format(DateConstants.YYYYMMDD)
        let option = { optionId: this.optionId, traceLog: true }
        let endDidEkimuListSrchReq = JSON.parse(
          JSON.stringify(SCL03_CONSTANTS.DISUSED_SERVICE_LIST_PARAM)
        )
        // 廃止済役務一覧照会.業務メッセージ域.照会対象年月日
        endDidEkimuListSrchReq.srchObjectDate = nowDate
        // 廃止済役務一覧照会.業務メッセージ域.共通顧客ID
        endDidEkimuListSrchReq.commonCustId = this.customerInfo.commonCustId
        let sysMsg = {
          endDidEkimuListSrchReq
        }
        let response = null
        try {
          LoadingUtil.show()
          response = await getDisusedServiceList(sysMsg, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(this.optionId, error)
          return
        }
        LoadingUtil.hidden()
        if (response.data.SysMsgAre) {
          let dataList = response.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
          if (this.cardId === CARD_ID.SCL0300) {
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].ekimuCode === '26') {
                this.dataListInfo.push(dataList[i])
              }
            }
          } else if (this.cardId === CARD_ID.SCL0301) {
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].ekimuCode === '50') {
                this.dataListInfo.push(dataList[i])
              }
            }
          } else if (this.cardId === CARD_ID.SCL0302) {
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].ekimuCode === '53') {
                this.dataListInfo.push(dataList[i])
              }
            }
          } else if (this.cardId === CARD_ID.SCL0303) {
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].ekimuCode === '74') {
                this.dataListInfo.push(dataList[i])
              }
            }
          }
        } else {
          this.dataListInfo = []
        }
        this.totalCount = this.dataListInfo.reduce(
          (sum, item) => sum + item.recRecNum,
          0
        )
      }
    },
    /**
     * 役務コードによって、
     * Maincard03 or Maincard04 に遷移する
     */
    openMclsec(val) {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      if (this.mainCardTop === GlobalConstants.DISTANCE_TOP) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, this.mainCardTop - GlobalConstants.DISTANCE_TOP - 2)
      }
      let selectedComponent = {}
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === val.ekimuCode &&
          item.srvcKindCode === val.srvcKindCode
        )
      })
      if (cardIndex !== -1) {
        selectedComponent = { ...componentList[cardIndex] }
        selectedComponent.name = val.srvcKindName
      }
      let refreshView = this.updateMaincardList(selectedComponent)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
    },
    isCardShow() {
      if (!this.isCutomInfoSet) {
        return 'scl03-size nodata-size'
      } else {
        return 'scl03-size data-size'
      }
    },
    /**
     *   契約番号一覧を展開
     */
    openMcl03List() {
      let mainCardID = ''
      let mainCardName = this.subcardName
      if (this.cardId === CARD_ID.SCL0300) {
        mainCardID = CARD_ID.MCL0300
      } else if (this.cardId === CARD_ID.SCL0301) {
        mainCardID = CARD_ID.MCL0301
      } else if (this.cardId === CARD_ID.SCL0302) {
        mainCardID = CARD_ID.MCL0302
      } else if (this.cardId === CARD_ID.SCL0303) {
        mainCardID = CARD_ID.MCL0303
      }

      if (this.customerInfo) {
        if (this.mainCardTop === GlobalConstants.DISTANCE_TOP) {
          window.scrollTo(0, 0)
        } else {
          window.scrollTo(
            0,
            this.mainCardTop - GlobalConstants.DISTANCE_TOP - 2
          )
        }
        let refreshView = this.updateMaincardList(
          this.getSelectedCard(mainCardID, mainCardName)
        )
        if (refreshView) {
          // 画面レファレンス
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
        }
      }
    }
  }
}
