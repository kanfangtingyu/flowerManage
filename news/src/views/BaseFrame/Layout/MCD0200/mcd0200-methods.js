/**
 * ビリング詳細（ACCEL請求）イベント処理
 * @module /src/views/BaseFrame/Layout/MCD0200/mcd0200-methods.js
 * @author IBM CIC
 */
import { getAccelReceiptStatus } from '@/api/get-accel-receipt-status'
import { getAccelBillingidContractIdList } from '@/api/get-accel-billingid-contract-id-list'
import { getAccelBillingDetailByBillingid } from '@/api/get-accel-billing-detail-by-billingid'
import { getCodeName } from '@/api/get-accel-product-name'
import * as MCD0200_CONSTANTS from './mcd0200-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as userInfoUtil from '@/utils/user-info'
import * as changeWidth from '@/utils/change-width'
import * as GlobalConstants from '@/constants/global-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as DateConstants from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import moment from 'moment'

export default {
  methods: {
    /**
     * 初期化処理<br>
     * @param
     * @return
     */
    async initView() {
      this.contractNoneFlg = false
      // viewDataがあるかを判断
      let card = this.getCurrentCard()

      if (card.viewData) {
        // データ取得済
        this.billingInfo = JSON.parse(JSON.stringify(card.viewData.billingInfo))
        this.breakDownInfo = JSON.parse(
          JSON.stringify(card.viewData.breakDownInfo)
        )
        this.cardId = JSON.parse(JSON.stringify(card.viewData.cardId))
        this.contractItem = JSON.parse(
          JSON.stringify(card.viewData.contractItem)
        )
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.customerInfo = JSON.parse(
          JSON.stringify(card.viewData.customerInfo)
        )
        this.dataList = JSON.parse(JSON.stringify(card.viewData.dataList))
        this.dataListCopy = JSON.parse(
          JSON.stringify(card.viewData.dataListCopy)
        )
        this.detailsInfo = JSON.parse(JSON.stringify(card.viewData.detailsInfo))
        this.endPage = JSON.parse(JSON.stringify(card.viewData.endPage))
        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))
        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))
        this.flag = JSON.parse(JSON.stringify(card.viewData.flag))
        this.guiBillGrp = JSON.parse(JSON.stringify(card.viewData.guiBillGrp))
        this.historyData = JSON.parse(JSON.stringify(card.viewData.historyData))
        this.mcd0200Model = JSON.parse(
          JSON.stringify(card.viewData.mcd0200Model)
        )
        this.multipleTable = JSON.parse(
          JSON.stringify(card.viewData.multipleTable)
        )
        this.mw05Visible = JSON.parse(JSON.stringify(card.viewData.mw05Visible))
        this.optionId = JSON.parse(JSON.stringify(card.viewData.optionId))
        this.optionList = JSON.parse(JSON.stringify(card.viewData.optionList))
        this.ownItem = JSON.parse(JSON.stringify(card.viewData.ownItem))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.payNoList = JSON.parse(JSON.stringify(card.viewData.payNoList))
        this.pdDetailClassCodeList = JSON.parse(
          JSON.stringify(card.viewData.pdDetailClassCodeList)
        )
        this.radio = JSON.parse(JSON.stringify(card.viewData.radio))
        this.recptStatusSrchAccRes = JSON.parse(
          JSON.stringify(card.viewData.recptStatusSrchAccRes)
        )
        this.requestDateList = JSON.parse(
          JSON.stringify(card.viewData.requestDateList)
        )
        this.requestItem = JSON.parse(JSON.stringify(card.viewData.requestItem))
        this.selectedData = JSON.parse(
          JSON.stringify(card.viewData.selectedData)
        )
        this.showBillingInfo = JSON.parse(
          JSON.stringify(card.viewData.showBillingInfo)
        )
        this.showBreakDownInfo = JSON.parse(
          JSON.stringify(card.viewData.showBreakDownInfo)
        )
        this.showDetailsInfo = JSON.parse(
          JSON.stringify(card.viewData.showDetailsInfo)
        )
        this.showRelatedContractsData = JSON.parse(
          JSON.stringify(card.viewData.showRelatedContractsData)
        )
        this.showRequestData = JSON.parse(
          JSON.stringify(card.viewData.showRequestData)
        )
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.storageData = JSON.parse(JSON.stringify(card.viewData.storageData))
        this.storageTable = JSON.parse(
          JSON.stringify(card.viewData.storageTable)
        )
        this.tabPosition = JSON.parse(JSON.stringify(card.viewData.tabPosition))
        this.tableData = JSON.parse(JSON.stringify(card.viewData.tableData))
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        this.tabFlag = JSON.parse(JSON.stringify(card.viewData.value))
        this.billDisabled = JSON.parse(
          JSON.stringify(card.viewData.billDisabled)
        )
        this.btnlabDisabled = JSON.parse(
          JSON.stringify(card.viewData.btnlabDisabled)
        )
        this.relateDisabled = JSON.parse(
          JSON.stringify(card.viewData.relateDisabled)
        )
        this.isSummaryShow = JSON.parse(
          JSON.stringify(card.viewData.isSummaryShow)
        )
        this.contractNoneFlg = JSON.parse(
          JSON.stringify(card.viewData.contractNoneFlg)
        )
        return
      }

      // ユーザ権限取得
      let authority = userInfoUtil.get().AUTHORITY
      // 客権限あり、契約権限あり、料金権限なし
      if (
        authority.BILLING_TEL_OCN === '1' &&
        authority.CONTRACT_TEL_OCN === '0'
      ) {
        this.billDisabled = false
        this.btnlabDisabled = false
        this.isSummaryShow = true
        this.tabPosition = '請求情報'
      } else if (
        authority.BILLING_TEL_OCN === '0' &&
        authority.CONTRACT_TEL_OCN === '1'
      ) {
        this.relateDisabled = false
        this.tabPosition = '関連契約一覧'
      } else if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.btnlabDisabled = false
        this.relateDisabled = false
        this.isSummaryShow = true
        this.tabPosition = '請求情報'
      }

      let option = { optionId: OPTION_ID.MCD0200A, traceLog: true }
      let recptStatusSrchAccReq = {
        ...MCD0200_CONSTANTS.ACCEL_RECEIPT_STATUS_PARAM
      }
      // ACCEL収納状況照会.業務メッセージ域.ACCEL収納状況照会要求.ビリングID
      recptStatusSrchAccReq.billingId = this.maincardName
      let recptStatusSrchAccSysMsg = {
        recptStatusSrchAccReq
      }
      let accelReceiptStatusResponse = null
      // ACCEL収納状況照会API
      try {
        LoadingUtil.show()
        accelReceiptStatusResponse = await getAccelReceiptStatus(
          recptStatusSrchAccSysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0200A, error)
        return
      }
      LoadingUtil.hidden()
      if (
        (accelReceiptStatusResponse.data.ComResHdrAre &&
          accelReceiptStatusResponse.data.ComResHdrAre.TmlHyjMsgId ===
            'WScs4001') ||
        accelReceiptStatusResponse.data.errorCode === 'WScs4003'
      ) {
        if (this.searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
          /**
           * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
           * カードを表示されない。
           */
          let mainCardList = this.$store.getters.mainCardList.slice(0)
          let delIndex = 0
          for (let i = 0; i < mainCardList.length; i++) {
            if (mainCardList[i].name === this.maincardName) {
              delIndex = i
            }
          }
          let length = mainCardList.length
          if (delIndex === mainCardList.length - 1) {
            // 最後の場合
            if (length > 1) {
              this.$set(mainCardList[delIndex - 1], 'isActived', true)
            }
          } else {
            if (length > 1) {
              this.$set(mainCardList[delIndex + 1], 'isActived', true)
            }
          }
          mainCardList.splice(delIndex, 1)
          this.$idpfEventBus.$emit(
            IDPFEvent.SEARCH_RESULT_VIEW,
            GlobalConstants.SEARCH_RESULT_NONE
          )
          this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
        } else if (
          this.searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH
        ) {
          this.contractNoneFlg = true
        }
      }
      this.mcd0200Model.accelReceiptStatus = accelReceiptStatusResponse.data
      this.recptStatusSrchAccRes = this.mcd0200Model.accelReceiptStatus.SysMsgAre.recptStatusSrchAccRes
      this.multipleTable = this.recptStatusSrchAccRes.recptStatusInfo
      this.multipleTable.sort(function(a, b) {
        if (a.chrgMonth === b.chrgMonth) {
          return b.billCnt - a.billCnt
        } else {
          return b.chrgMonth - a.chrgMonth
        }
      })
      this.storageTable = this.recptStatusSrchAccRes.recptStatusInfo
      // 請求期別
      this.requestDate()
      await this.getAccelBillingDetailByBillingid(0)
    },
    // ACCEL請求内訳照会（ビリングID指定）API
    async getAccelBillingDetailByBillingid(i) {
      let option = { optionId: OPTION_ID.MCD0200A, traceLog: true }
      // ACCEL請求内訳照会（ビリングID指定）APIのparameter
      let billDetailSrchAccReq = {
        ...MCD0200_CONSTANTS.ACCEL_BILLING_DETAIL_BY_BILLINGID_PARAM
      }
      billDetailSrchAccReq.billingId = this.recptStatusSrchAccRes.billingId
      billDetailSrchAccReq.srchRqstYearMonth = this.multipleTable[i].chrgMonth
      billDetailSrchAccReq.billGrp = this.multipleTable[i].billGrpDetail
      billDetailSrchAccReq.srchRqstBillCnt = this.multipleTable[i].billCnt
      billDetailSrchAccReq.billClass = this.multipleTable[i].billClassDetail
      let billDetailSrchAccSysMsg = {
        billDetailSrchAccReq
      }
      let accelBillingDetailByBillingidResponse = null
      try {
        LoadingUtil.show()
        accelBillingDetailByBillingidResponse = await getAccelBillingDetailByBillingid(
          billDetailSrchAccSysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0200A, error)
        return
      }
      LoadingUtil.hidden()
      if (accelBillingDetailByBillingidResponse.data.SysMsgAre) {
        this.mcd0200Model.accelBillingDetailByBillingid =
          accelBillingDetailByBillingidResponse.data.SysMsgAre
        this.billingInfo = this.mcd0200Model.accelBillingDetailByBillingid.billDetailSrchBillingIdAccRes.guiBillGrp
        if (this.billingInfo) {
          this.showBillingInfo = true
        } else {
          this.showBillingInfo = false
        }
        this.detailsInfo = this.mcd0200Model.accelBillingDetailByBillingid.billDetailSrchBillingIdAccRes.guiDetail
        if (this.detailsInfo) {
          this.showDetailsInfo = true
        } else {
          this.showDetailsInfo = false
        }
        this.breakDownInfo = this.mcd0200Model.accelBillingDetailByBillingid.billDetailSrchBillingIdAccRes.billDetail
        if (this.breakDownInfo) {
          this.showBreakDownInfo = true
        } else {
          this.showBreakDownInfo = false
        }
        this.showRequestData = true
      } else {
        this.showRequestData = false
      }
      if (this.flag === true) {
        this.getAccelBillingidContractIdList()
      }
    },
    // ACCELビリング配下契約ID照会API
    async getAccelBillingidContractIdList() {
      let option = { optionId: OPTION_ID.MCD0200A, traceLog: true }
      // ACCELビリング配下契約ID照会APIのparameter
      let accTelNoGetRequestSrchVer2Req = {
        ...MCD0200_CONSTANTS.ACCEL_BILLINGID_CONTRACT_ID_LIST_PARAM
      }
      // ACCELビリング配下契約ID照会.業務メッセージ域.ACCELビリング配下契約ID照会要求.各種ID
      accTelNoGetRequestSrchVer2Req.variousId = this.recptStatusSrchAccRes.billingId
      // ACCELビリング配下契約ID照会.業務メッセージ域.ACCELビリング配下契約ID照会要求.役務コード
      accTelNoGetRequestSrchVer2Req.ekimuCode = '  '
      // ACCELビリング配下契約ID照会.業務メッセージ域.ACCELビリング配下契約ID照会要求.サービス種類コード
      accTelNoGetRequestSrchVer2Req.srvcKindCode = '  '
      // ACCELビリング配下契約ID照会.業務メッセージ域.ACCELビリング配下契約ID照会要求.照会年月日
      accTelNoGetRequestSrchVer2Req.srchDate = moment().format(
        DateConstants.YYYYMMDD
      )
      accTelNoGetRequestSrchVer2Req.chrgMonth = moment(
        this.selectedData,
        DateConstants.YYYY_MM
      ).format(DateConstants.YYYYMM)
      let accTelNoGetRequestSrchVer2SysMsg = {
        accTelNoGetRequestSrchVer2Req
      }
      let accelBillingidContractIdListResponse = null
      try {
        LoadingUtil.show()
        accelBillingidContractIdListResponse = await getAccelBillingidContractIdList(
          accTelNoGetRequestSrchVer2SysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0200A, error)
        return
      }
      LoadingUtil.hidden()
      if (accelBillingidContractIdListResponse.data.SysMsgAre) {
        this.mcd0200Model.accelBillingidContractIdList =
          accelBillingidContractIdListResponse.data.SysMsgAre
        this.showRelatedContractsData = true
      } else {
        this.showRelatedContractsData = false
      }
      let soEachDataArea = this.mcd0200Model.accelBillingidContractIdList
        .accTelNoGetRequestSrchVer3Res.soEachDataArea
      this.dataListCopy = []
      for (let i = 0; i < soEachDataArea.length; i++) {
        let variousIdListInfo = soEachDataArea[i].variousIdListInfo
        for (let j = 0; j < variousIdListInfo.length; j++) {
          let subPdInfo = variousIdListInfo[j].subPdInfo
          for (let k = 0; k < subPdInfo.length; k++) {
            if (subPdInfo[k].payNo !== '') {
              this.dataListCopy.push(subPdInfo[k])
            }
          }
        }
      }
      this.dataList = this.dataListCopy
      await this.getCodeName(this.dataList)
    },
    isShowEkimuName(item, i) {
      let arr = this.dataListPerPage()
      if (i === 0) {
        return true
      } else if (arr[i - 1].titleName !== item.titleName) {
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
        if (this.dataList[this.startPage - 1].titleName === item.titleName) {
          return '（続き）'
        }
      }
      return ''
    },
    async getCodeName(data) {
      let option = { optionId: OPTION_ID.MCD0200A, traceLog: true }
      for (let i = 0; i < data.length; i++) {
        let ekimuCode = data[i].pdDetailClassCode.slice(0, 2)
        let srvcKindCode = data[i].pdDetailClassCode.slice(2, 4)
        if (ekimuCode === '01') {
          this.dataList[i]['titleName'] = '電話サービス'
        } else {
          let RequestData = { ...MCD0200_CONSTANTS.GET_CODE_NAME }
          RequestData.accelServiceClass = ekimuCode
          RequestData.accelServiceSubClass = srvcKindCode
          let res = null
          try {
            LoadingUtil.show()
            res = await getCodeName(RequestData, option)
          } catch (error) {
            LoadingUtil.hidden()
            this.onComError(OPTION_ID.MCD0200A, error)
            return
          }
          LoadingUtil.hidden()
          this.dataList[i]['titleName'] = res.data.NAME
        }
      }
      if (this.tabFlag) {
        this.tabPosition = '収納状况'
        this.tabPosition = '関連契約一覧'
      }
      this.tabFlag = false
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      const tabsList = document.getElementsByClassName('tagsDiv')
      changeWidth.changeTagsWidth(tabsList, mainCardList)
    },
    // 請求期別
    requestDate() {
      let recptStatusInfo = this.recptStatusSrchAccRes.recptStatusInfo
      this.requestDateList = []
      recptStatusInfo.forEach(item => {
        let chrgMonth = moment(item.chrgMonth, DateConstants.YYYYMM).format(
          DateConstants.YYYY_MM
        )
        this.requestDateList.push(chrgMonth)
      })
      this.requestDateList = [...new Set(this.requestDateList)]
      // 最新の年月日が一番です。
      this.requestDateList.sort((a, b) => {
        a = Number(moment(a, DateConstants.YYYYMM).format(DateConstants.YYYYMM))
        b = Number(moment(b, DateConstants.YYYYMM).format(DateConstants.YYYYMM))
        return b - a
      })
      this.selectedData = this.requestDateList[0]
    },
    // 請求期別を切り替えるときは、次のデータを再要求します
    selectDate() {
      this.dataList = []
      this.tabFlag = true
      this.getAccelBillingidContractIdList()
    },
    /**
     *tableのスタイル
     */
    tableCellStyle({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "border-bottom: 2px solid #c1c1c1;border-right:1px solid #c1c1c1;text-align:center;background:#d8d8d8;border-top:1px solid #c1c1c1;font-family: 'Meiryo UI';font-size: 12px;font-weight: bold;color: #4a4a4a;"
      } else if (columnIndex === 0) {
        return 'border-left:1px solid #c1c1c1;'
      } else {
        return 'font-size:16px;color:#4a4a4a'
      }
    },
    /**
     *請求情報のtable下のradioをクリック
     *@param param
     */
    async onRadioClick(index) {
      this.billingInfo = []
      this.detailsInfo = []
      this.breakDownInfo = []
      this.flag = false
      this.getAccelBillingDetailByBillingid(index)
    },
    // 送付先住所、番地・号の両端のスペースをトリムし、全角スペースで連結。
    destinationAddress(addr, houseNo) {
      if ((addr && addr !== '') || (houseNo && houseNo !== '')) {
        return addr + '　' + houseNo
      } else {
        return '　'
      }
    },
    // 末尾に"群"を付けて表示。
    requestGroup(data) {
      if (data && data !== '') {
        return data + '群'
      } else {
        return '　'
      }
    },
    // 「YYYY/MM/DD」形式。
    YMDFormat(date) {
      if (moment(date).isValid()) {
        return moment(date).format(DateConstants.YYYY_MM_DD)
      } else if (date === '' || !date) {
        return '　'
      } else {
        return (
          date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8)
        )
      }
    },
    // 「3桁カンマ区切り」形式。末尾に"円"を付けて表示。
    amountFormat(data) {
      if (data && data !== '') {
        return parseFloat(data).toLocaleString() + '円'
      } else {
        return '　'
      }
    },
    // 「YYYY/MM_XX」形式。
    YMXFormat(date, value) {
      if (moment(date, DateConstants.YYYYMM).isValid()) {
        return (
          moment(date, DateConstants.YYYYMM).format(DateConstants.YYYY_MM) +
          '-' +
          value +
          1
        )
      } else if (date === '' || !date) {
        return '　'
      } else {
        return date.slice(0, 4) + '/' + date.slice(4, 6) + '-' + value + 1
      }
    },
    // 「YYYY/MM」形式。
    YMFormat(date) {
      if (moment(date, DateConstants.YYYYMM).isValid()) {
        return moment(date, DateConstants.YYYYMM).format(DateConstants.YYYY_MM)
      } else if (date === '' || !date) {
        return '　'
      } else {
        return date.slice(0, 4) + '/' + date.slice(4, 6)
      }
    },
    // 「MM/DD」形式。
    payTermDate(date) {
      if (moment(date, DateConstants.MMDD).isValid()) {
        return moment(date, DateConstants.MMDD).format(DateConstants.MM_DD)
      } else if (date === '' || !date) {
        return '　'
      } else {
        return date.slice(0, 2) + '/' + date.slice(2, 4)
      }
    },
    // 「MM/DD」形式。
    MDFormat(date) {
      if (moment(date, DateConstants.MMDD).isValid()) {
        return moment(date, DateConstants.MMDD).format(DateConstants.MM_DD)
      } else if (date === '' || !date) {
        return '　'
      } else {
        return date.slice(0, 2) + '/' + date.slice(2, 4)
      }
    },
    // 「XX」形式。
    XXFormat(data) {
      if (data && data !== '') {
        let billCnt = Number(data) + 1
        if (billCnt > 9) {
          return billCnt.toString()
        } else {
          return '0' + billCnt.toString()
        }
      } else {
        return '　'
      }
    },
    // 下記の形式で表示。
    // 「有－親」
    // 「有－子」
    // 「無」
    // 設定値なしの場合スペース表示。
    recognition(oneBillingDistName, oneBillingParentChildDistName) {
      if (oneBillingDistName && oneBillingDistName === '無') {
        return '無'
      } else if (oneBillingDistName && oneBillingDistName === '有') {
        return '有-' + oneBillingParentChildDistName
      } else {
        return '　'
      }
    },
    // 「X群」形式。(X:A～F)
    XGroup(data) {
      if (data && data !== '') {
        return 'X:' + data
      } else {
        return '　'
      }
    },
    // 「999-9999」形式。
    isNumFormat(data) {
      if (data && data !== '') {
        return data.slice(0, 3) + '-' + data.slice(3)
      } else {
        return '　'
      }
    },
    // 延滞複数月表示の値が「0」、「1」の場合、半角スペース(0x20)を表示する。延滞複数月表示の値が「2」の場合、「≦」を表示する。
    delayMonth(data) {
      if (data === '0' || data === '1') {
        return ' '
      } else if (data === '2') {
        return '≦'
      } else {
        return ''
      }
    },
    // 期別止めの場合、"止"を表示する。期別止めでない場合、空白表示。
    isStpIndicate(data) {
      if (data === '1') {
        return '止'
      } else {
        return ' '
      }
    },
    // ポイント有無フラグが「無」の場合非表示。
    isPointFlg() {
      if (this.billingInfo.length > 0) {
        if (this.billingInfo[0].pointFlg === '無') {
          return false
        } else {
          return true
        }
      }
    },
    // ポイント有無フラグが「無」又は、ポイント有無フラグが「有」かつ消滅予定年月日が「00000000」の場合非表示。
    isDisappear() {
      if (this.billingInfo.length > 0) {
        if (
          this.billingInfo[0].pointFlg === '無' ||
          (this.billingInfo[0].pointFlg === '有' &&
            this.billingInfo[0].delScheduleDate === '00000000')
        ) {
          return false
        } else {
          return true
        }
      }
    },
    // 請求書/事前案内書要否コード有無フラグが"出力省略"の場合は非表示。
    isBillsendCodeFlg() {
      if (this.detailsInfo.length > 0) {
        if (this.detailsInfo[0].billsendCodeFlg === '出力省略') {
          return false
        } else {
          return true
        }
      }
    },
    // メール通知要否コード有無フラグが"出力省略"の場合は非表示。
    isEmlsendCodeFlg() {
      if (this.detailsInfo.length > 0) {
        if (this.detailsInfo[0].emlsendCodeFlg === '出力省略') {
          return false
        } else {
          return true
        }
      }
    },
    // 最大3件の回送条件を全角スペースで連結して表示。
    fwConditionFormat(item) {
      if (item.length === 1) {
        return item[0].fwCondition
      } else if (item.length === 2) {
        return item[0].fwCondition + '　' + item[1].fwCondition
      } else if (item.length === 3) {
        return (
          item[0].fwCondition +
          '　' +
          item[1].fwCondition +
          '　' +
          item[2].fwCondition
        )
      } else {
        return '　'
      }
    },
    // データの表示を設定する
    ifNoData(data) {
      if (data && data !== '') {
        return data
      } else {
        return '　'
      }
    },
    // 初期値(000000)の場合、空白表示とする。
    isAccessKey(data) {
      if (data === '000000' || data === '') {
        return '　'
      } else {
        return data
      }
    },
    // 独自請求以外の場合、ラベルごと非表示とする。
    isBillClass() {
      if (this.recptStatusSrchAccRes.billClass !== '1') {
        return false
      } else {
        return true
      }
    },
    /**
     *   一覧絞り込みのフレーム展開
     */
    mainCardManage() {
      this.mw05Visible = true
    },
    handleFilter(param) {
      // 指定なし
      if (param[0].id === 100 || Object.keys(param[0]).length === 0) {
        this.dataList = this.dataListCopy.slice()
      }
      // 役務コード
      if (param[0].ekimuCode) {
        this.dataList = this.dataListCopy.filter(
          item => item.pdDetailClassCode.slice(0, 2) === param[0].ekimuCode
        )
      }
      // サービス種類コード
      if (param[0].srvcKindCode && param[0].srvcKindCode !== '  ') {
        this.dataList = this.dataListCopy.filter(
          item => item.pdDetailClassCode.slice(2, 4) === param[0].srvcKindCode
        )
      }
    },
    isTableShow() {
      if (this.recptStatusSrchAccRes.billClass === 2) {
        return false
      } else {
        return true
      }
    },
    isDetailNameShow(item) {
      if (
        item.consmEql === '' &&
        item.dailyRate === '' &&
        item.delayObjectMonth === '' &&
        item.delayPluralMonthIndicate === '' &&
        item.detail === '' &&
        item.detailChrg === '' &&
        item.dmy === '' &&
        item.itemCode === '' &&
        item.premialableSrvsIndicate === '' &&
        item.taxTyp === ''
      ) {
        return true
      } else {
        return false
      }
    },
    // 11桁電話番号変換
    telNoFormat(item) {
      if (item && item !== '') {
        let telHeader = item.slice(0, 3)
        if (
          telHeader === '050' ||
          telHeader === '070' ||
          telHeader === '080' ||
          telHeader === '090'
        ) {
          return item.substr(1)
        } else {
          return item
        }
      } else {
        return '　'
      }
    },
    // 「YY/MM」形式。
    YYMMFormat(date) {
      if (moment(date, DateConstants.YYMM).isValid()) {
        return moment(date, DateConstants.YYMM).format(DateConstants.YY_MM)
      } else if (date === '' || !date) {
        return '　'
      } else {
        return date.slice(0, 2) + '/' + date.slice(2, 4)
      }
    },
    toMainCard(val) {
      let flg = this.checkSearchKeyType(val)
      let searchInfo = {
        searchKey: val,
        searchType: GlobalConstants,
        keyType: flg
      }
      this.$nextTick(() => {
        this.$idpfEventBus.$emit(IDPFEvent.ON_DETAIL_SEARCH, searchInfo)
      })
    },
    changeCellStyle(row) {
      if (row.column.label === '金額') {
        return 'padding-right: 10px'
      } else {
        return ''
      }
    }
  }
}
