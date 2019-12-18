/**
 * scl0400の処理方法
 * @module /src/views/BaseFrame/Layout/SCL0400/scl0400-method.js
 * @author IBM CIC
 */
import { getDisusedCustomerDirectory } from '@/api/get-disused-customer-directory'
import * as GlobalConstants from '@/constants/global-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as SCL0400_CONSTANTS from '../scl0400-constants'
import * as CARD_ID from '@/constants/card-id-constants'
import * as DateConstants from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import * as UserInfo from '@/utils/user-info'
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
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      this.dataListInfo = []
      if (this.customerInfo) {
        let nowDate = moment().format(DateConstants.YYYYMMDD)
        let option = { optionId: this.optionId, traceLog: true }
        let endDidCustDirSrchReq = JSON.parse(
          JSON.stringify(SCL0400_CONSTANTS.DISUSED_CUSTOMER_DIRECTORY_PARAM)
        )
        // 廃止済顧客ディレクト照会.業務メッセージ域.
        endDidCustDirSrchReq.srchObjectDate = nowDate
        // 廃止済顧客ディレクト照会.業務メッセージ域.役務一覧情報.共通顧客ID
        endDidCustDirSrchReq.ekimuListInfo[0].commonCustId = this.customerInfo.commonCustId
        // 廃止済顧客ディレクト照会.業務メッセージ域.役務一覧情報.役務コード
        endDidCustDirSrchReq.ekimuListInfo[0].ekimuCode = this.ekimuCode
        // 廃止済顧客ディレクト照会.業務メッセージ域.役務一覧情報.サービス種類コード
        endDidCustDirSrchReq.ekimuListInfo[0].srvcKindCode = this.srvcKindCode
        let sysMsg = {
          endDidCustDirSrchReq
        }
        // 廃止済顧客ディレクトリ照会API
        let response = null
        try {
          LoadingUtil.show()
          response = await getDisusedCustomerDirectory(sysMsg, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(this.optionId, error)
          return
        }
        LoadingUtil.hidden()
        if (response.data.SysMsgAre) {
          let dataList =
            response.data.SysMsgAre.custDirSrchRes.contractIdListInfo
          for (let i = 0; i < dataList.length; i++) {
            this.dataListInfo.push(dataList[i])
          }
        } else {
          this.dataListInfo = []
          this.noData = true
        }
        this.totalCount = this.dataListInfo.length
      }
    },
    /**
     *契約詳細画面を表示する
     */
    openMclsec(cardInfo) {
      let searchInfo = {
        keyType: '',
        searchKey: cardInfo.contractId,
        searchType: GlobalConstants.NUM_LIST_SEARCH
      }
      this.$store.commit('app/SET_SEARCH_INFO', searchInfo)
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      if (this.mainCardTop === GlobalConstants.DISTANCE_TOP) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, this.mainCardTop - GlobalConstants.DISTANCE_TOP - 2)
      }
      let selectedComponent = {}
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === cardInfo.ekimuCode &&
          item.componentName === GlobalConstants.CONTRACT_DETAIL
        )
      })
      if (cardIndex !== -1) {
        selectedComponent = { ...componentList[cardIndex] }
        selectedComponent.name = cardInfo.contractId
      }
      let refreshView = this.updateMaincardList(selectedComponent)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
    },
    isCardShow() {
      if (!this.isCutomInfoSet) {
        return 'scl04-size nodata-size'
      } else {
        return 'scl04-size data-size'
      }
    },
    /**
     *サービスの契約一覧画面を表示する
     */
    openMcl04List() {
      let mainCardID = ''
      let mainCardName = this.subcardName
      if (this.cardId === CARD_ID.SCL0400) {
        mainCardID = CARD_ID.MCL0400
      } else if (this.cardId === CARD_ID.SCL0401) {
        mainCardID = CARD_ID.MCL0401
      } else if (this.cardId === CARD_ID.SCL0402) {
        mainCardID = CARD_ID.MCL0402
      } else if (this.cardId === CARD_ID.SCL0403) {
        mainCardID = CARD_ID.MCL0403
      } else if (this.cardId === CARD_ID.SCL0404) {
        mainCardID = CARD_ID.MCL0404
      } else if (this.cardId === CARD_ID.SCL0405) {
        mainCardID = CARD_ID.MCL0405
      } else if (this.cardId === CARD_ID.SCL0406) {
        mainCardID = CARD_ID.MCL0406
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
    },
    judgeAuthorityStyle() {
      let authority = UserInfo.get().AUTHORITY
      if (
        authority.BILLING_TEL_OCN === '0' &&
        authority.CONTRACT_TEL_OCN === '0'
      ) {
        return 'user-no-authority'
      } else {
        return 'span-line'
      }
    }
  }
}
