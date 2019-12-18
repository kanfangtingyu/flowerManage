/**
 * mcl 0100の処理方法
 * @module /src/views/BaseFrame/Layout/MCL0100/mcl0100-method.js
 * @author IBM CIC
 */
import { getServiceList } from '@/api/get-service-list'
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as GlobalConstants from '@/constants/global-constants'
import * as MCL0100_CONSTANTS from './mcl0100-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as changeWidth from '@/utils/change-width'
import * as LoadingUtil from '@/utils/loading-util'
import moment from 'moment'

export default {
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      // viewDataがあるかを判断
      let card = this.getCurrentCard()

      if (card.viewData) {
        // データ取得済
        this.cardId = JSON.parse(JSON.stringify(card.viewData.cardId))
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.currentItem = JSON.parse(JSON.stringify(card.viewData.currentItem))
        this.customerInfo = JSON.parse(
          JSON.stringify(card.viewData.customerInfo)
        )
        this.dataList = JSON.parse(JSON.stringify(card.viewData.dataList))
        this.dataListPer = JSON.parse(JSON.stringify(card.viewData.dataListPer))
        this.disusedServiceList = JSON.parse(
          JSON.stringify(card.viewData.disusedServiceList)
        )
        this.endPage = JSON.parse(JSON.stringify(card.viewData.endPage))
        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))
        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))
        this.optionId = JSON.parse(JSON.stringify(card.viewData.optionId))
        this.optionList = JSON.parse(JSON.stringify(card.viewData.optionList))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.serviceList = JSON.parse(JSON.stringify(card.viewData.serviceList))
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        this.userNotSet = JSON.parse(JSON.stringify(card.viewData.userNotSet))
        return
      }
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let option = { optionId: OPTION_ID.MCL0100A, traceLog: true }
      if (this.customerInfo) {
        // 役務一覧照会APIのparameter
        let ekimuListSrchReq = { ...MCL0100_CONSTANTS.SERVICE_LIST_PARAM }
        // 業務メッセージ域.役務一覧照会要求.照会対象年月日
        ekimuListSrchReq.srchObjectDate = moment().format('YYYYMMDD')
        // 業務メッセージ域.役務一覧照会要求.共通顧客ID
        ekimuListSrchReq.commonCustId = this.customerInfo.commonCustId
        let ekimuListSysMsg = {
          ekimuListSrchReq
        }
        // 廃止済役務一覧照会APIのparameter
        let endDidEkimuListSrchReq = {
          ...MCL0100_CONSTANTS.DISUSED_SERVICE_LIST_PARAM
        }
        // 業務メッセージ域.廃止済役務一覧照会要求.照会対象年月日
        endDidEkimuListSrchReq.srchObjectDate = moment().format('YYYYMMDD')
        // 業務メッセージ域.廃止済役務一覧照会要求.共通顧客ID
        endDidEkimuListSrchReq.commonCustId = this.customerInfo.commonCustId
        let endDidEkimuListSysMsg = {
          endDidEkimuListSrchReq
        }
        // 役務一覧照会API
        let serviceListResponse = null
        try {
          LoadingUtil.show()
          serviceListResponse = await getServiceList(ekimuListSysMsg, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(OPTION_ID.MCL0100A, error)
          return
        }
        LoadingUtil.hidden()
        if (
          serviceListResponse.status === 200 &&
          serviceListResponse.data.ComResHdrAre &&
          serviceListResponse.data.ComResHdrAre.Imp === 'I'
        ) {
          // 役務一覧照会APIの戻り値
          this.serviceList =
            serviceListResponse.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
        } else {
          // 役務一覧照会APIの戻り値
          this.serviceList = null
        }
        // 廃止済役務一覧照会API
        let disusedServiceListResponse = null
        try {
          LoadingUtil.show()
          disusedServiceListResponse = await getDisusedServiceList(
            endDidEkimuListSysMsg,
            option
          )
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(OPTION_ID.MCL0100A, error)
          return
        }
        LoadingUtil.hidden()
        if (
          disusedServiceListResponse.data.ComResHdrAre &&
          disusedServiceListResponse.status === 200 &&
          disusedServiceListResponse.data.ComResHdrAre.Imp === 'I'
        ) {
          // 廃止済役務一覧照会APIの戻り値
          this.disusedServiceList =
            disusedServiceListResponse.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
        } else {
          // 廃止済役務一覧照会APIの戻り値
          this.disusedServiceList = null
        }
        if (this.disusedServiceList && this.serviceList) {
          this.serviceList.sort((a, b) => {
            return a.ekimuCode - b.ekimuCode
          })
          this.disusedServiceList.sort((a, b) => {
            return a.ekimuCode - b.ekimuCode
          })
          let disusedServiceListLen = this.disusedServiceList.length
          for (let i = 0; i < disusedServiceListLen; i++) {
            let disusedService = this.disusedServiceList[i]
            let obj = {
              ...disusedService,
              invalidNum: disusedService.recRecNum
            }
            if (obj.srvcKindName === '') {
              obj.srvcKindName = obj.ekimuName
            }
            let index = this.serviceList.findIndex(item => {
              return (
                item.ekimuCode === disusedService.ekimuCode &&
                item.srvcKindCode === disusedService.srvcKindCode
              )
            })
            if (index !== -1) {
              obj.invalidNum = obj.recRecNum - this.serviceList[index].recRecNum
              obj.recRecNum = this.serviceList[index].recRecNum
            } else {
              obj.recRecNum = 0
            }
            this.dataList.push(obj)
          }
        } else {
          this.userNotSet = true
        }
      }

      const tabsList = document.getElementsByClassName('tagsDiv')
      changeWidth.changeTagsWidth(tabsList, mainCardList)
    },
    isShowEkimuName(item, i) {
      let arr = this.dataListPerPage()
      if (i === 0) {
        return true
      } else if (arr[i - 1].ekimuName !== item.ekimuName) {
        return true
      } else {
        return false
      }
    },
    continueText(item, i) {
      if (this.startPage === 0) {
        return ''
      }
      if (i === 0) {
        if (this.dataList[this.startPage - 1].ekimuName === item.ekimuName) {
          return '（続き）'
        }
      }
      return ''
    },
    /**
     *  契約一覧を開く
     */
    openMclList(val) {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedCard = {}
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === val.ekimuCode &&
          item.srvcKindCode === val.srvcKindCode
        )
      })
      if (cardIndex !== -1) {
        selectedCard = { ...componentList[cardIndex] }
        selectedCard.isActived = true
        selectedCard.name = val.srvcKindName
      } else {
        return
      }
      this.moveTo(selectedCard)
    }
  }
}
