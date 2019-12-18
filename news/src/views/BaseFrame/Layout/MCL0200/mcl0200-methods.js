/**
 * mcl 0200の処理方法
 * @module /src/views/BaseFrame/Layout/MCL0200/mcl0200-method.js
 * @author IBM CIC
 */
import { getServiceList } from '@/api/get-service-list'
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as GlobalConstants from '@/constants/global-constants'
import * as MCL0200_CONSTANTS from './mcl0200-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as changeWidth from '@/utils/change-width'
import * as LoadingUtil from '@/utils/loading-util'
import * as DateConstants from '@/constants/date-constants'
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
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.customerInfo = JSON.parse(
          JSON.stringify(card.viewData.customerInfo)
        )
        this.dataList = JSON.parse(JSON.stringify(card.viewData.dataList))
        this.disusedServiceList = JSON.parse(
          JSON.stringify(card.viewData.disusedServiceList)
        )
        this.endPage = JSON.parse(JSON.stringify(card.viewData.endPage))
        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))
        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.serviceList = JSON.parse(JSON.stringify(card.viewData.serviceList))
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        return
      }
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let nowDate = moment().format(DateConstants.YYYYMMDD)
      let option = { optionId: OPTION_ID.MCL0200A, traceLog: true }
      // 役務一覧照会APIのparameter
      let ekimuListSrchReq = { ...MCL0200_CONSTANTS.SERVICE_LIST_PARAM }
      // 役務一覧照会.業務メッセージ域.照会対象年月日
      ekimuListSrchReq.srchObjectDate = nowDate
      // 役務一覧照会.業務メッセージ域.共通顧客ID
      if (this.customerInfo) {
        ekimuListSrchReq.commonCustId = this.customerInfo.commonCustId
      } else {
        ekimuListSrchReq.commonCustId = ''
      }
      let ekimuListSysMsg = {
        ekimuListSrchReq
      }
      // 廃止済役務一覧照会APIのparameter
      let endDidEkimuListSrchReq = {
        ...MCL0200_CONSTANTS.DISUSED_SERVICE_LIST_PARAM
      }
      // 廃止済役務一覧照会.業務メッセージ域.照会対象年月日
      endDidEkimuListSrchReq.srchObjectDate = nowDate
      // 廃止済役務一覧照会.業務メッセージ域.共通顧客ID
      if (this.customerInfo) {
        endDidEkimuListSrchReq.commonCustId = this.customerInfo.commonCustId
      } else {
        endDidEkimuListSrchReq.commonCustId = ''
      }
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
        this.onComError(OPTION_ID.MCL0200A, error)
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
        this.onComError(OPTION_ID.MCL0200A, error)
        return
      }
      LoadingUtil.hidden()
      if (
        disusedServiceListResponse.status === 200 &&
        disusedServiceListResponse.data.ComResHdrAre &&
        disusedServiceListResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        // 廃止済役務一覧照会APIの戻り値
        this.disusedServiceList =
          disusedServiceListResponse.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
      } else {
        this.disusedServiceList = null
      }

      if (this.disusedServiceList && this.serviceList) {
        this.serviceList.sort((a, b) => {
          return a.ekimuCode - b.ekimuCode
        })
        this.disusedServiceList.sort((a, b) => {
          return a.ekimuCode - b.ekimuCode
        })
        if (this.disusedServiceList.length > this.serviceList.length) {
          let disusedServiceListCopy = JSON.parse(
            JSON.stringify(this.disusedServiceList)
          )
          for (let i = 0; i < this.serviceList.length; i++) {
            let service = this.serviceList[i]
            for (let j = 0; j < disusedServiceListCopy.length; j++) {
              let disusedService = disusedServiceListCopy[j]
              if (
                service.ekimuCode === disusedService.ekimuCode &&
                service.srvcKindCode === disusedService.srvcKindCode
              ) {
                disusedServiceListCopy.splice(j, 1)
              }
            }
          }
          for (let i = 0; i < disusedServiceListCopy.length; i++) {
            disusedServiceListCopy[i].recRecNum = 0
          }
          this.serviceList = this.serviceList.concat(disusedServiceListCopy)
        }
        let disusedServiceListLen = this.disusedServiceList.length
        for (let j = 0; j < disusedServiceListLen; j++) {
          let disusedServiceList = this.disusedServiceList[j]
          let serviceListLen = this.serviceList.length
          for (let k = 0; k < serviceListLen; k++) {
            let serviceList = this.serviceList[k]
            if (
              serviceList.ekimuCode === disusedServiceList.ekimuCode &&
              serviceList.srvcKindCode === disusedServiceList.srvcKindCode
            ) {
              this.dataList.push({
                ekimuName: disusedServiceList.ekimuName,
                recRecNum: serviceList.recRecNum,
                invalidNum:
                  disusedServiceList.recRecNum - serviceList.recRecNum,
                ekimuCode: disusedServiceList.ekimuCode,
                srvcKindCode: disusedServiceList.srvcKindCode
              })
            }
          }
        }
        let array = []
        array = this.dataList.reduce((resp, obj) => {
          let dataList = resp.find(item => item.ekimuName === obj.ekimuName)
          if (dataList) {
            dataList.recRecNum += obj.recRecNum
            dataList.invalidNum += obj.invalidNum
          } else {
            resp.push(obj)
          }
          return resp
        }, [])
        this.dataList = [...array]
      }

      const tabsList = document.getElementsByClassName('tagsDiv')
      changeWidth.changeTagsWidth(tabsList, mainCardList)
    },
    /**
     *  契約一覧を開く
     *  先にこのカードが存在するかどうかを判定します
     *  存在するなら、他のカードを隠す
     *  存在しない場合、このカードを表示し、他のカードを隠す。
     */
    openMclList(val) {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedCard = {}
      for (let i = 0; i < componentList.length; i++) {
        let item = componentList[i]
        if (
          item.ekimuCode === val.ekimuCode &&
          item.componentName === 'サービス一覧'
        ) {
          if (item.srvcKindCode !== '  ') {
            selectedCard = item
            break
          } else {
            selectedCard = item
            break
          }
        } else if (
          item.ekimuCode === val.ekimuCode &&
          item.componentName === '契約一覧'
        ) {
          selectedCard = item
          break
        }
      }
      selectedCard.isActived = true
      this.moveTo(selectedCard)
    }
  }
}
