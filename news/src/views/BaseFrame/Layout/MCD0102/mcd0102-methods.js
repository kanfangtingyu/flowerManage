/**
 * 契約詳細（電話）イベント処理
 * @module /src/views/BaseFrame/Layout/MCD0102/mcd0102-methods.js
 * @author IBM CIC
 */
import { getServiceList } from '@/api/get-service-list'
import { getOcnBillingList } from '@/api/get-ocn-billing-list'
import { getOcnBillingDetail } from '@/api/get-ocn-billing-detail'
import { getOcnBillingCategory } from '@/api/get-ocn-billing-category'
import { getOcnOrderHistory } from '@/api/get-ocn-order-history'
import { transformToNb } from '@/api/transform-to-nb'
import { getAccelLedger } from '@/api/get-accel-ledger'
import { getAccelSoBillingByIds } from '@/api/get-accel-so-billing-by-ids'
import { getAccelBillingDetailByLine } from '@/api/get-accel-billing-detail-by-line'
import { getAccelReceiptStatus } from '@/api/get-accel-receipt-status'
import { getIdpfEkimuByAccelServiecekindCode } from '@/api/get-idpf-ekimu-by-accel-servicekind-code'
import { nbGenericIf } from '@/api/nb-generic-if'
import * as changeWidth from '@/utils/change-width'
import * as GlobalConstants from '@/constants/global-constants'
import * as MCD0102_CONSTANTS from './mcd0102-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as openUrlUtil from '@/utils/open-url-util'
import * as IDPFEvent from '@/constants/idpf-event'
import * as DateConstants from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import * as userInfoUtil from '@/utils/user-info'
import moment from 'moment'

export default {
  methods: {
    /**
     * 初期化処理<br>
     */
    async initView() {
      this.contractNoneFlg = false
      // viewDataがあるかを判断
      let card = this.getCurrentCard()
      if (card.viewData) {
        // データ取得済
        this.accelReceiptStatusResNone = JSON.parse(
          JSON.stringify(card.viewData.accelReceiptStatusResNone)
        )
        this.accelTableData = JSON.parse(
          JSON.stringify(card.viewData.accelTableData)
        )
        this.address = JSON.parse(JSON.stringify(card.viewData.address))
        this.attr = JSON.parse(JSON.stringify(card.viewData.attr))
        this.breakdownIndex = JSON.parse(
          JSON.stringify(card.viewData.breakdownIndex)
        )
        this.cardId = JSON.parse(JSON.stringify(card.viewData.cardId))
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.customerInfo = JSON.parse(
          JSON.stringify(card.viewData.customerInfo)
        )
        this.dataList = JSON.parse(JSON.stringify(card.viewData.dataList))
        this.detailsData = JSON.parse(JSON.stringify(card.viewData.detailsData))
        this.ekimuListSrchRes = JSON.parse(
          JSON.stringify(card.viewData.ekimuListSrchRes)
        )
        this.endPage = JSON.parse(JSON.stringify(card.viewData.endPage))
        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))
        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))
        this.flag = JSON.parse(JSON.stringify(card.viewData.flag))
        this.guiBillGrp = JSON.parse(JSON.stringify(card.viewData.guiBillGrp))
        this.historyData = JSON.parse(JSON.stringify(card.viewData.historyData))
        this.invoiceInfo = JSON.parse(JSON.stringify(card.viewData.invoiceInfo))
        this.invoicePlanInfo = JSON.parse(
          JSON.stringify(card.viewData.invoicePlanInfo)
        )
        this.isBundle = JSON.parse(JSON.stringify(card.viewData.isBundle))
        this.isShow = JSON.parse(JSON.stringify(card.viewData.isShow))
        this.label = JSON.parse(JSON.stringify(card.viewData.label))
        this.mcd0102Model = JSON.parse(
          JSON.stringify(card.viewData.mcd0102Model)
        )
        this.multipleRadio = JSON.parse(
          JSON.stringify(card.viewData.multipleRadio)
        )
        this.multipleSituationInfo = JSON.parse(
          JSON.stringify(card.viewData.multipleSituationInfo)
        )
        this.optionId = JSON.parse(JSON.stringify(card.viewData.optionId))
        this.optionList = JSON.parse(JSON.stringify(card.viewData.optionList))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.pageWidth = JSON.parse(JSON.stringify(card.viewData.pageWidth))
        this.payment = JSON.parse(JSON.stringify(card.viewData.payment))
        this.radio = JSON.parse(JSON.stringify(card.viewData.radio))
        this.reqAttr = JSON.parse(JSON.stringify(card.viewData.reqAttr))
        this.requestDateList = JSON.parse(
          JSON.stringify(card.viewData.requestDateList)
        )
        this.showClick = JSON.parse(JSON.stringify(card.viewData.showClick))
        this.showSummaryDetailInfo = JSON.parse(
          JSON.stringify(card.viewData.showSummaryDetailInfo)
        )
        this.srchDate = JSON.parse(JSON.stringify(card.viewData.srchDate))
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.storageData = JSON.parse(JSON.stringify(card.viewData.storageData))
        this.storageRadio = JSON.parse(
          JSON.stringify(card.viewData.storageRadio)
        )
        this.storageSituationInfo = JSON.parse(
          JSON.stringify(card.viewData.storageSituationInfo)
        )
        this.summaryCategoryInfo = JSON.parse(
          JSON.stringify(card.viewData.summaryCategoryInfo)
        )
        this.summaryDetailInfo = JSON.parse(
          JSON.stringify(card.viewData.summaryDetailInfo)
        )
        this.summaryHistoryInfo = JSON.parse(
          JSON.stringify(card.viewData.summaryHistoryInfo)
        )
        this.summaryListInfo = JSON.parse(
          JSON.stringify(card.viewData.summaryListInfo)
        )
        this.tabPosition = JSON.parse(JSON.stringify(card.viewData.tabPosition))
        this.tableData = JSON.parse(JSON.stringify(card.viewData.tableData))
        this.userInfo = JSON.parse(JSON.stringify(card.viewData.userInfo))
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        this.widthRes = JSON.parse(JSON.stringify(card.viewData.widthRes))
        this.activeNames = JSON.parse(JSON.stringify(card.viewData.activeNames))
        this.billDisabled = JSON.parse(
          JSON.stringify(card.viewData.billDisabled)
        )
        this.receiptDisabled = JSON.parse(
          JSON.stringify(card.viewData.receiptDisabled)
        )
        this.isSummaryShow = JSON.parse(
          JSON.stringify(card.viewData.isSummaryShow)
        )
        this.contractNoneFlg = JSON.parse(
          JSON.stringify(card.viewData.contractNoneFlg)
        )
        this.accelBillingInfo = JSON.parse(
          JSON.stringify(card.viewData.accelBillingInfo)
        )
        this.strHyjBilId = JSON.parse(JSON.stringify(card.viewData.strHyjBilId))
        this.strSkyYm = JSON.parse(JSON.stringify(card.viewData.strSkyYm))
        this.billingListShow = JSON.parse(
          JSON.stringify(card.viewData.billingListShow)
        )
        this.billingDetailShow = JSON.parse(
          JSON.stringify(card.viewData.billingDetailShow)
        )
        this.billingCategoryShow = JSON.parse(
          JSON.stringify(card.viewData.billingCategoryShow)
        )
        this.orderHistoryShow = JSON.parse(
          JSON.stringify(card.viewData.orderHistoryShow)
        )
        this.accelSoBillingByIdsShow = JSON.parse(
          JSON.stringify(card.viewData.accelSoBillingByIdsShow)
        )
        this.accelBillingDetailByLineShow = JSON.parse(
          JSON.stringify(card.viewData.accelBillingDetailByLineShow)
        )
        return
      }

      // ユーザ権限取得
      let authority = userInfoUtil.get().AUTHORITY
      if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '0'
      ) {
        this.isSummaryShow = true
      } else if (
        authority.CONTRACT_TEL_OCN === '0' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
      } else if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
      }
      let searchInfo = this.$store.getters.searchInfo
      let option = { optionId: OPTION_ID.MCL0102A, traceLog: true }
      let nbGenericParam = { ...MCD0102_CONSTANTS.NB_GENERIC_PARAM }
      nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
        DateConstants.YYYYMMDDHHmmss
      )
      nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.maincardName
      let res = null
      try {
        LoadingUtil.show()
        res = await nbGenericIf(nbGenericParam, option)
        this.billingListShow = true
        this.billingDetailShow = true
        this.billingCategoryShow = true
        this.orderHistoryShow = true
        this.accelSoBillingByIdsShow = true
        this.accelBillingDetailByLineShow = true
        if (
          (res.data.ComResHdrAre &&
            res.data.ComResHdrAre.TmlHyjMsgId === 'WScs4001') ||
          res.data.errorCode === 'WScs4003'
        ) {
          if (searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
            /**
             * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
             * カードを表示されない。
             */
            let cardList = this.$store.getters.mainCardList.slice(0)
            for (let i = 0; i < cardList.length; i++) {
              if (cardList[i].name === this.maincardName) {
                cardList.splice(i--, 1)
              }
            }

            this.$idpfEventBus.$emit(
              IDPFEvent.SEARCH_RESULT_VIEW,
              GlobalConstants.SEARCH_RESULT_NONE
            )
            this.$store.commit('app/SET_MAINCARD_LIST', cardList)
            this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
          } else if (
            searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH
          ) {
            this.contractNoneFlg = true
            let contractNoneCard = {}
            contractNoneCard = {
              isActived: true,
              component: this.component,
              componentName: this.componentName,
              name: this.maincardName
            }
            this.$store.commit('app/SET_CONTRACT_NONE_CARD', contractNoneCard)
          }
        } else {
          let sSyb =
            res.data.SysMsgAre.contractInfoSrchResNB
              .reqInquireReqGenericIfResponse[0].return[0].inqResDto.cIDto
              .corDtoLst[0].cIfDto.cDtoLst[0].crrInfoDto.crrDtoLst[0].sSyb
          if (sSyb === '1') {
            this.accelBundle()
          } else {
            this.noAccelBundled()
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.billingListShow = false
        this.billingDetailShow = false
        this.billingCategoryShow = false
        this.orderHistoryShow = false
        this.accelSoBillingByIdsShow = false
        this.accelBillingDetailByLineShow = false
        this.noAccelBundled()
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
    },
    async accelBundle() {
      let searchInfo = this.$store.getters.searchInfo
      // ユーザ権限取得
      let authority = userInfoUtil.get().AUTHORITY
      if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '0'
      ) {
        this.isSummaryShow = true
      } else if (
        authority.CONTRACT_TEL_OCN === '0' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
      } else if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
      }
      this.isBundle = true
      let option = { optionId: OPTION_ID.MCD0102A, traceLog: true }
      // OCN請求情報一覧照会APIのparameter
      let billInfoSrchOcnAlwaysRefrnceReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_LIST_PARAM
      }
      // OCN請求情報一覧照会.業務メッセージ域.請求情報照会要求(OCN常時参照).契約ID
      billInfoSrchOcnAlwaysRefrnceReq.contractId = this.maincardName
      let billInfoSrchOcnAlwaysRefrnceSysMsg = {
        billInfoSrchOcnAlwaysRefrnceReq
      }
      // OCN請求情報一覧照会API
      let ocnBillingListResponse = null
      try {
        LoadingUtil.show()
        ocnBillingListResponse = await getOcnBillingList(
          billInfoSrchOcnAlwaysRefrnceSysMsg,
          option
        )
        this.billingListShow = true
        if (
          (ocnBillingListResponse.data.ComResHdrAre &&
            ocnBillingListResponse.data.ComResHdrAre.TmlHyjMsgId ===
              'WScs4001') ||
          ocnBillingListResponse.data.errorCode === 'WScs4003'
        ) {
          if (searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
            /**
             * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
             * カードを表示されない。
             */
            let cardList = this.$store.getters.mainCardList.slice(0)
            for (let i = 0; i < cardList.length; i++) {
              if (cardList[i].name === this.maincardName) {
                cardList.splice(i--, 1)
              }
            }

            this.$idpfEventBus.$emit(
              IDPFEvent.SEARCH_RESULT_VIEW,
              GlobalConstants.SEARCH_RESULT_NONE
            )
            this.$store.commit('app/SET_MAINCARD_LIST', cardList)
            this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
          } else if (
            searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH
          ) {
            this.contractNoneFlg = true
            let contractNoneCard = {}
            contractNoneCard = {
              isActived: true,
              component: this.component,
              componentName: this.componentName,
              name: this.maincardName
            }
            this.$store.commit('app/SET_CONTRACT_NONE_CARD', contractNoneCard)
          }
        }
        this.mcd0102Model.ocnBillingList = ocnBillingListResponse.data
        this.summaryListInfo = this.mcd0102Model.ocnBillingList.SysMsgAre.billInfoListOcnResNB.sysData
      } catch (error) {
        LoadingUtil.hidden()
        this.billingListShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      await this.getAccelLedger()
    },
    async getAccelLedger(item) {
      let option = { optionId: OPTION_ID.MCD0102A, traceLog: true }
      let accCustListSrchReq = {
        ...MCD0102_CONSTANTS.ACC_CUST_LIST_SRCH_REQ
      }
      // let option = { optionId: OPTION_ID.MCD0102A, traceLog: true }
      // 業務メッセージ域.ACCEL原簿照会要求.リクエスト回数
      accCustListSrchReq.reqCnt = '001'
      // 業務メッセージ域.ACCEL原簿照会要求.抽出パターン
      accCustListSrchReq.extcPtn = '00001'
      // 業務メッセージ域.ACCEL原簿照会要求.searchKeyKind
      accCustListSrchReq.searchKeyKind = '02'
      // 業務メッセージ域.ACCEL原簿照会要求.検索キー
      accCustListSrchReq.searchKey = this.maincardName
      /**
       * 業務メッセージ域.ACCEL原簿照会要求.searchDate
       *
       * ※1:「システム日付」 ＋ 「差分値」の日付(YYYYMMDD)を設定する。
       * 差分値:M:-4;システム日付からマイナス4ヶ月
       */
      let date = moment().subtract(4, 'month')
      accCustListSrchReq.searchDate = moment(date).format(
        DateConstants.YYYYMMDD
      )
      // 業務メッセージ域.ACCEL原簿照会要求.指定日時点照会フラグ
      accCustListSrchReq.spcfyDateTimePointSrchFlg = '0'
      let sysMsg = {
        accCustListSrchReq
      }
      let response = null
      try {
        LoadingUtil.show()
        response = await getAccelLedger(sysMsg, option)
        if (
          response.status === 200 &&
          response.data.ComResHdrAre &&
          response.data.ComResHdrAre.Imp === 'I'
        ) {
          let vbData =
            response.data.SysMsgAre.accCustListSrchReqRes.resInfo[0].vbData
          this.srchDate = vbData.slice(65, 73)
          let ekimuCode = vbData.slice(275, 277)
          await this.getIdpfEkimuByAccelServiecekindCode(ekimuCode)
          await this.getAccelSoBillingByIds(item)
        } else {
          this.noAccelBundled()
        }
      } catch (error) {
        LoadingUtil.hidden()
        await this.getAccelSoBillingByIds(item)
        // if (error.response.status !== 200) {
        //   this.onComError(OPTION_ID.MCD0102A, error)
        //   return
        // }
      }
      LoadingUtil.hidden()
    },
    // バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
    async getIdpfEkimuByAccelServiecekindCode(ekimuCode) {
      let accelEkimuReq = {
        ...MCD0102_CONSTANTS.ACCEL_EKIMU_REQ
      }
      accelEkimuReq.accelServiceKindCode = ekimuCode
      let option = {
        optionId: OPTION_ID.MCD0102A,
        traceLog: true
      }
      let accelKindCodeRes = null
      this.ekimuListSrchRes = {}
      try {
        LoadingUtil.show()
        accelKindCodeRes = await getIdpfEkimuByAccelServiecekindCode(
          accelEkimuReq,
          option
        )
        this.ekimuListSrchRes = accelKindCodeRes.data
      } catch (error) {
        LoadingUtil.hidden()
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
    },
    /**
     * ACCEL_SO系請求情報照会(各種ID指定)API取得
     */
    async getAccelSoBillingByIds(item) {
      let accSoKindBillInfoSrchDateReq = {
        ...MCD0102_CONSTANTS.ACCEL_SO_BILLING_BY_IDS_PARAM
      }
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).役務コード
      accSoKindBillInfoSrchDateReq.ekimuCode = this.ekimuListSrchRes.IDD_EKI_CODE
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).サービス種類コード
      accSoKindBillInfoSrchDateReq.srvcKindCode = this.ekimuListSrchRes.IDD_SRVC_KIND_CODE
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).各種ID
      accSoKindBillInfoSrchDateReq.variousId = this.maincardName
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).照会年月日
      if (this.srchDate === '99999999') {
        accSoKindBillInfoSrchDateReq.srchDate = '        '
      } else {
        accSoKindBillInfoSrchDateReq.srchDate = moment(this.srchDate).subtract(
          1,
          'd'
        )
      }
      let option = {
        optionId: OPTION_ID.MCD0102A,
        traceLog: true
      }
      let sysMsg = {
        accSoKindBillInfoSrchDateReq
      }
      let accelSoBillingByIdsResponse = null
      try {
        LoadingUtil.show()
        accelSoBillingByIdsResponse = await getAccelSoBillingByIds(
          sysMsg,
          option
        )
        this.accelSoBillingByIdsShow = true
        if (
          accelSoBillingByIdsResponse.status === 200 &&
          ((accelSoBillingByIdsResponse.data.ComResHdrAre &&
            accelSoBillingByIdsResponse.data.ComResHdrAre.TmlHyjMsgId ===
              'WScs4001') ||
            accelSoBillingByIdsResponse.data.errorCode === 'WScs4003')
        ) {
          this.noAccelBundled()
        } else {
          this.mcd0102Model.accelSoBillingByIds =
            accelSoBillingByIdsResponse.data.SysMsgAre
          this.initViewAfter()
          // ACCEL収納状況照会
          await this.getAccelReceiptStatus(item)
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.accelSoBillingByIdsShow = false
        await this.getAccelReceiptStatus(item)
        // if (error.response.status !== 200) {
        //   this.onComError(OPTION_ID.MCD0102A, error)
        //   return
        // }
      }
      LoadingUtil.hidden()
    },
    /**
     * ACCEL収納状況照会API取得
     */
    async getAccelReceiptStatus(date) {
      let recptStatusSrchAccReq = {
        ...MCD0102_CONSTANTS.RECPT_STATUS_SRCH_ACC_REQ
      }
      if (!date) {
        recptStatusSrchAccReq.billingId = this.mcd0102Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
      } else {
        recptStatusSrchAccReq.billingId = date
      }
      let option = {
        optionId: OPTION_ID.MCD0102A,
        traceLog: true
      }
      let sysMsg = {
        recptStatusSrchAccReq
      }
      let accelReceiptStatusRes = null
      try {
        LoadingUtil.show()
        accelReceiptStatusRes = await getAccelReceiptStatus(sysMsg, option)
        this.mcd0102Model.accelReceiptStatusRes = {}
        if (
          accelReceiptStatusRes.status === 200 &&
          accelReceiptStatusRes.data.ComResHdrAre &&
          accelReceiptStatusRes.data.ComResHdrAre.Imp === 'I'
        ) {
          this.mcd0102Model.accelReceiptStatusRes =
            accelReceiptStatusRes.data.SysMsgAre
          // 請求期別
          this.label = ''
          this.requestDateList = []
          this.requestDate()
          // ACCEL請求内訳照会（回線指定）
          if (this.flag === true) {
            await this.getAccelBillingDetailByLine(this.maincardName, '')
          }
          this.flag = true
        } else {
          this.mcd0102Model.accelReceiptStatusRes = {}
          this.noAccelBundled()
        }
      } catch (error) {
        LoadingUtil.hidden()
        await this.getAccelBillingDetailByLine(this.maincardName, '')
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
    },
    /**
     * ACCEL請求内訳照会（回線指定）API
     */
    async getAccelBillingDetailByLine(param, count) {
      let billDetailSrchAccReq = {
        ...MCD0102_CONSTANTS.ACCEL_BILLING_DETAIL_BY_LINE_PARAM
      }
      if (param === this.maincardName) {
        /**
         * 画面初期表示時
         */
        if (this.strHyjBilId !== '' && this.strSkyYm !== '') {
          // 業務メッセージ域.ACCEL請求内訳照会要求.ビリングID
          billDetailSrchAccReq.billingId = this.strHyjBilId
          // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望年月
          billDetailSrchAccReq.srchRqstYearMonth = moment(
            this.strSkyYm,
            DateConstants.YYYY_MM
          ).format(DateConstants.YYYYMM)
        } else {
          // 業務メッセージ域.ACCEL請求内訳照会要求.ビリングID
          billDetailSrchAccReq.billingId = this.mcd0102Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
          // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望年月
          billDetailSrchAccReq.srchRqstYearMonth = moment(
            this.requestDateList[0].date,
            DateConstants.YYYY_MM
          ).format(DateConstants.YYYYMM)
        }
        // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望請求回数
        let count = null
        if (this.requestDateList[0].count !== '00') {
          let billCnt = Number(this.requestDateList[0].count) - 1
          if (billCnt > 9) {
            count = billCnt.toString()
          } else {
            count = '0' + billCnt.toString()
          }
        }
        billDetailSrchAccReq.srchRqstBillCnt = count
      } else {
        /* eslint-disable */
        let billingId = this.mcd0102Model.accelSoBillingByIds
          .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
          this.radio
        ].billInfo[0].billingId
        // 選択されたラジオボタンのビリングIDをパラメータに設定すること。
        billDetailSrchAccReq.billingId = billingId
        // 請求タブ内の請求期別プルダウンで指定された年月（YYYYMM）
        billDetailSrchAccReq.srchRqstYearMonth = moment(
          param,
          DateConstants.YYYYMM
        ).format(DateConstants.YYYYMM)
        // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望請求回数
        billDetailSrchAccReq.srchRqstBillCnt = count
      }
      // 業務メッセージ域.ACCEL請求内訳照会要求.契約ID
      billDetailSrchAccReq.contractId = this.maincardName
      // 業務メッセージ域.ACCEL請求内訳照会要求.バンドル種類コード
      billDetailSrchAccReq.bandleKindCode = '00'
      // 業務メッセージ域.ACCEL請求内訳照会要求.網種類
      billDetailSrchAccReq.lineKind = '01'
      // 業務メッセージ域.ACCEL請求内訳照会要求.照会パターン
      billDetailSrchAccReq.srchPtn = '0'
      // 業務メッセージ域.ACCEL請求内訳照会要求.請求種別
      // 請求タブ内のラジオボタンで指定された項目の請求種別
      /* eslint-disable */
      billDetailSrchAccReq.billClass = this.mcd0102Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
        this.radio
      ].billInfo[0].billClass
      // 業務メッセージ域.ACCEL請求内訳照会要求.表示区分
      billDetailSrchAccReq.indicateTyp = '0'
      let option = {
        optionId: OPTION_ID.MCD0102A,
        traceLog: true
      }
      let sysMsg = {
        billDetailSrchAccReq
      }
      let accelBillingDetailByLineResponse = null
      this.mcd0102Model.accelBillingDetailByLine = {}
      this.strHyjBilId = ''
      this.strSkyYm = ''
      try {
        if (param === this.maincardName) {
          LoadingUtil.show()
          accelBillingDetailByLineResponse = await getAccelBillingDetailByLine(
            sysMsg,
            option
          )
        } else {
          // 請求情報のデータ更新
          let option = {
            optionId: OPTION_ID.MCD0102C,
            traceLog: true
          }
          accelBillingDetailByLineResponse = await getAccelBillingDetailByLine(
            sysMsg,
            option
          )
        }
        this.accelBillingDetailByLineShow = true
        if (
          accelBillingDetailByLineResponse.status === 200 &&
          accelBillingDetailByLineResponse.data.ComResHdrAre &&
          accelBillingDetailByLineResponse.data.ComResHdrAre.Imp === 'I'
        ) {
          this.mcd0102Model.accelBillingDetailByLine =
            accelBillingDetailByLineResponse.data.SysMsgAre
          this.guiBillGrp = this.mcd0102Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.guiBillGrp[0]
        } else {
          this.mcd0102Model.accelBillingDetailByLine = {}
          this.guiBillGrp = {}
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.accelBillingDetailByLineShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
    },
    initViewAfter() {
      let accelList = []
      for (
        let i = 0;
        i <
        this.mcd0102Model.accelSoBillingByIds.accSoKindBillInfoSrchRes
          .soEachDataArea.length;
        i++
      ) {
        const array = this.mcd0102Model.accelSoBillingByIds
          .accSoKindBillInfoSrchRes.soEachDataArea[i]
        for (let j = 0; j < array.variousIdListInfo.length; j++) {
          const arr = array.variousIdListInfo[j]
          accelList.push(arr)
        }
        this.accelTableData = accelList.slice(0)
        this.storageData = accelList.slice(0)
      }

      let mainCardList = this.$store.getters.mainCardList.slice(0)

      const tabsList = document.getElementsByClassName('tagsDiv')
      changeWidth.changeTagsWidth(tabsList, mainCardList)
      // ビリングID(ACCEL)一覧・[表]
      let attrData = this.mcd0102Model.accelSoBillingByIds
        .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].attr
      // 請求群
      this.reqAttr = attrData.substring(6, 8) + '群'
      // 定期分割
      this.attr = attrData.substring(9, 12)
    },
    // 請求期別
    requestDate() {
      this.requestDateList = []
      let soEachDataArea = this.mcd0102Model.accelSoBillingByIds
        .accSoKindBillInfoSrchRes.soEachDataArea
      if (
        soEachDataArea[0].variousIdListInfo[0].billInfo[0].billClass === '2'
      ) {
        // 合算請求開始期別
        let addupBillStrtChrgMonth =
          soEachDataArea[0].variousIdListInfo[0].billInfo[0]
            .addupBillStrtChrgMonth
        // 合算請求終了期別
        let addupBillEndChrgMonth =
          soEachDataArea[0].variousIdListInfo[0].billInfo[0]
            .addupBillEndChrgMonth
        /**
         * ACCEL_SO系請求情報照会(各種ID指定)APIのレスポンスに含まれる
         * 合算請求開始期別〜合算請求終了期別を1ヶ月単位で刻み、
         * プルダウンにセットする。
         */
        let dateArr = this.calDiffMonths(
          addupBillStrtChrgMonth,
          addupBillEndChrgMonth
        )
        // 最新の年月日が一番です。
        dateArr.sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
        // YYYY/MM - N回目
        dateArr.forEach(item => {
          let obj = {
            value: item,
            date: item,
            count: '00'
          }
          this.requestDateList.push(obj)
        })
        this.label = this.requestDateList[0].date
      } else {
        this.accelReceiptStatusResNone = false
        if (this.mcd0102Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0102Model.accelReceiptStatusRes
            .recptStatusSrchAccRes.recptStatusInfo
          recptStatusInfo.forEach(item => {
            let obj = {}
            let billCnt = Number(item.billCnt) + 1
            if (billCnt > 9) {
              obj = {
                value: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM + ' - ' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM
                ),
                count: billCnt.toString()
              }
            } else {
              obj = {
                value: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM +
                    ' - ' +
                    '0' +
                    billCnt.toString() +
                    '回目'
                ),
                date: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM
                ),
                count: '0' + billCnt.toString()
              }
            }
            this.requestDateList.push(obj)
          })
          // 最新の年月日が一番です。
          this.requestDateList.sort((a, b) => {
            if (a.date === b.date) {
              return Number(b.count) - Number(a.count)
            } else {
              return Date.parse(b.date) - Date.parse(a.date)
            }
          })
          this.label =
            this.requestDateList[0].date +
            ' - ' +
            this.requestDateList[0].count +
            '回目'
        } else {
          this.accelReceiptStatusResNone = true
        }
      }
      // 最新の年月日が一番です。
      this.requestDateList.sort((a, b) => {
        return b - a
      })
      this.label =
        this.requestDateList[0].date +
        ' - ' +
        this.requestDateList[0].count +
        '回目'
    },
    async accelDate(data) {
      let billClass = this.accelTableData[this.radio].billInfo[0].billClass
      let date = moment(data).format(DateConstants.YYYYMM)
      let count = null
      if (billClass === '2') {
        count = '00'
      } else {
        this.requestDateList.forEach(item => {
          if (item.value === data) {
            let billCnt = Number(item.count) - 1
            if (billCnt > 9) {
              count = billCnt.toString()
            } else {
              count = '0' + billCnt.toString()
            }
          }
        })
      }
      await this.getAccelBillingDetailByLine(date, count)
    },
    /**
     *請求情報のtable下のradioをクリック
     */
    async radioClick(index, data) {
      this.radio = index
      if (data.billInfo[0].billClass === '2') {
        // 合算請求開始期別
        let addupBillStrtChrgMonth = data.billInfo[0].addupBillStrtChrgMonth
        // 合算請求終了期別
        let addupBillEndChrgMonth = data.billInfo[0].addupBillEndChrgMonth

        /**
         * ACCEL_SO系請求情報照会(各種ID指定)APIのレスポンスに含まれる
         * 合算請求開始期別〜合算請求終了期別を1ヶ月単位で刻み、
         * プルダウンにセットする。
         */
        let dateArr = this.calDiffMonths(
          addupBillStrtChrgMonth,
          addupBillEndChrgMonth
        )
        this.requestDateList = []
        let arrList = []
        // YYYY/MM - N回目
        dateArr.forEach(item => {
          let obj = {
            value: item,
            date: item,
            count: '00'
          }
          arrList.push(obj)
          this.requestDateList = arrList.slice(0)
        })
        // 最新の年月日が一番です。
        this.requestDateList.sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
        this.label = ''
        this.label = this.requestDateList[0].date
        let date = moment(
          this.requestDateList[0].date,
          DateConstants.YYYYMM
        ).format(DateConstants.YYYYMM)
        let billCnt = Number(this.requestDateList[0].count) - 1
        let count = null
        if (billCnt > 9) {
          count = billCnt.toString()
        } else {
          count = '0' + billCnt.toString()
        }
        await this.getAccelBillingDetailByLine(date, count)
      } else {
        await this.getAccelReceiptStatus(data.billInfo[0].billingId)
        this.accelReceiptStatusResNone = false
        if (this.mcd0102Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0102Model.accelReceiptStatusRes
            .recptStatusSrchAccRes.recptStatusInfo
          this.requestDateList = []
          let arrList = []
          recptStatusInfo.forEach(item => {
            let obj = {}
            let billCnt = Number(item.billCnt) + 1
            if (billCnt > 9) {
              obj = {
                value: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM + ' - ' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM
                ),
                count: billCnt.toString()
              }
            } else {
              obj = {
                value: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM +
                    ' - ' +
                    '0' +
                    billCnt.toString() +
                    '回目'
                ),
                date: moment(item.chrgMonth, DateConstants.YYYYMM).format(
                  DateConstants.YYYY_MM
                ),
                count: '0' + billCnt.toString()
              }
            }
            arrList.push(obj)
            this.requestDateList = arrList.slice(0)
          })
          // 最新の年月日が一番です。
          this.requestDateList.sort((a, b) => {
            if (a.date === b.date) {
              return Number(b.count) - Number(a.count)
            } else {
              return Date.parse(b.date) - Date.parse(a.date)
            }
          })
          this.label = ''
          this.label =
            this.requestDateList[0].date +
            ' - ' +
            this.requestDateList[0].count +
            '回目'
          let reqDate = this.requestDateList[0].date
          let date = moment(reqDate, DateConstants.YYYYMM).format(
            DateConstants.YYYYMM
          )
          let billCnt = Number(this.requestDateList[0].count) - 1
          let count = null
          if (billCnt > 9) {
            count = billCnt.toString()
          } else {
            count = '0' + billCnt.toString()
          }
          await this.getAccelBillingDetailByLine(date, count)
        } else {
          this.accelReceiptStatusResNone = true
          this.mcd0102Model.accelBillingDetailByLine = {}
        }
      }
    },
    calDiffMonths(startDate, endDate) {
      let strDate = moment(startDate, DateConstants.YYYYMM)
      let eDate = moment(endDate, DateConstants.YYYYMM)
      let diff = eDate.format('YM') - strDate.format('YM')
      diff = eDate.format('Y') !== strDate.format('Y') ? diff + 2 : diff

      return Array.apply([], new Array(diff + 1)).map((item, index) => {
        return strDate
          .clone()
          .add(index, 'months')
          .format(DateConstants.YYYY_MM)
      })
    },
    async noAccelBundled() {
      this.isBundle = false
      let option = { optionId: OPTION_ID.MCD0102A, traceLog: true }
      // OCN請求情報一覧照会APIのparameter
      let billInfoSrchOcnAlwaysRefrnceReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_LIST_PARAM
      }
      // OCN請求情報一覧照会.業務メッセージ域.請求情報照会要求(OCN常時参照).契約ID
      billInfoSrchOcnAlwaysRefrnceReq.contractId = this.maincardName
      let billInfoSrchOcnAlwaysRefrnceSysMsg = {
        billInfoSrchOcnAlwaysRefrnceReq
      }
      // OCN請求情報一覧照会API
      let ocnBillingListResponse = null
      try {
        LoadingUtil.show()
        ocnBillingListResponse = await getOcnBillingList(
          billInfoSrchOcnAlwaysRefrnceSysMsg,
          option
        )
        this.billingListShow = true
        if (
          (ocnBillingListResponse.data.ComResHdrAre &&
            ocnBillingListResponse.data.ComResHdrAre.TmlHyjMsgId ===
              'WScs4001') ||
          ocnBillingListResponse.data.errorCode === 'WScs4003'
        ) {
          /**
           * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
           * カードを表示されない。
           */
          let cardList = this.$store.getters.mainCardList.slice(0)
          for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].name === this.maincardName) {
              cardList.splice(i--, 1)
            }
          }

          this.$idpfEventBus.$emit(
            IDPFEvent.SEARCH_RESULT_VIEW,
            GlobalConstants.SEARCH_RESULT_NONE
          )
          this.$store.commit('app/SET_MAINCARD_LIST', cardList)
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
          return
        }
        this.mcd0102Model.ocnBillingList = ocnBillingListResponse.data
        this.summaryListInfo = this.mcd0102Model.ocnBillingList.SysMsgAre.billInfoListOcnResNB.sysData
        let summaryListInfoLength = this.summaryListInfo.length
        this.tableData = []
        this.storageData = []
        for (let i = 0; i < summaryListInfoLength; i++) {
          let seqStcSynJkyLength = this.summaryListInfo[i].seqStcSynJky.length
          for (let j = 0; j < seqStcSynJkyLength; j++) {
            let seqStcSynJky = this.summaryListInfo[i].seqStcSynJky[j]
            this.tableData.push(seqStcSynJky)
            this.storageData.push(seqStcSynJky)
          }
        }
        this.tableData.sort(function(a, b) {
          return Number(b.strSkyYm) - Number(a.strSkyYm)
        })
        this.storageData.sort(function(a, b) {
          return Number(b.strSkyYm) - Number(a.strSkyYm)
        })
        this.storageSituationInfo.push(this.storageData[0])
      } catch (error) {
        LoadingUtil.hidden()
        this.billingListShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      await this.getOcnBillingDetail()
    },
    async getOcnBillingDetail() {
      let option = { optionId: OPTION_ID.MCL0102A, traceLog: true }
      // OCN請求内訳照会APIのparameter
      let billDetailSrchOcnReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_DETAIL_PARAM
      }
      if (this.summaryListInfo.length > 0) {
        // OCN請求内訳照会.業務メッセージ域.OCN請求内訳照会要求.契約番号
        billDetailSrchOcnReq.srvcId = this.summaryListInfo[0].strKykNum
        // OCN請求内訳照会.業務メッセージ域.OCN請求内訳照会要求.請求年月
        billDetailSrchOcnReq.billMonth = this.tableData[0].strSkyYm
        // billDetailSrchOcnReq.billMonth = '202004'
        // OCN請求内訳照会.業務メッセージ域.OCN請求内訳照会要求.分割番号
        billDetailSrchOcnReq.devideNo = this.tableData[0].strBktNum
        // OCN請求内訳照会.業務メッセージ域.OCN請求内訳照会要求.定期分割表示
        billDetailSrchOcnReq.periodicDevideIndicate = this.tableData[0].strTikBktNumHyj
      }
      let billDetailSrchOcnSysMsg = {
        billDetailSrchOcnReq
      }
      // OCN請求内訳照会API
      let ocnBillingDetailResponse = null
      try {
        LoadingUtil.show()
        ocnBillingDetailResponse = await getOcnBillingDetail(
          billDetailSrchOcnSysMsg,
          option
        )
        this.billingDetailShow = true
        if (
          !(
            (ocnBillingDetailResponse.data.ComResHdrAre &&
              ocnBillingDetailResponse.data.ComResHdrAre.TmlHyjMsgId ===
                'WScs4001') ||
            ocnBillingDetailResponse.data.errorCode === 'WScs4003'
          )
        ) {
          this.mcd0102Model.ocnBillingDetail =
            ocnBillingDetailResponse.data.SysMsgAre
          this.summaryDetailInfo = this.mcd0102Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData
          if (this.summaryDetailInfo) {
            this.showSummaryDetailInfo = true
          } else {
            this.showSummaryDetailInfo = false
          }
          let summaryDetailInfoLength = this.summaryDetailInfo.length
          this.address = []
          this.detailsData = []
          for (let i = 0; i < summaryDetailInfoLength; i++) {
            let stcSksSfsMeiLen = this.summaryDetailInfo[i].stcSksSfsMei.length
            let seqStcSkyUwkLen = this.summaryDetailInfo[i].seqStcSkyUwk.length
            for (let j = 0; j < stcSksSfsMeiLen; j++) {
              let stcSksSfsMei = this.summaryDetailInfo[i].stcSksSfsMei[j]
              this.address.push(stcSksSfsMei)
            }
            for (let j = 0; j < seqStcSkyUwkLen; j++) {
              let seqStcSkyUwk = this.summaryDetailInfo[i].seqStcSkyUwk[j]
              this.detailsData.push(seqStcSkyUwk)
            }
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.billingDetailShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      await this.getOcnBillingCategory()
    },
    async getOcnBillingCategory() {
      let option = { optionId: OPTION_ID.MCL0102A, traceLog: true }
      // OCN請求科目情報照会APIのparameter
      let ocnBillSubjectSrchReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_CATEGORY_PARAM
      }
      if (this.summaryListInfo.length > 0) {
        // OCN請求科目情報照会.業務メッセージ域.OCN請求科目情報照会要求.契約番号
        ocnBillSubjectSrchReq.contractId = this.summaryListInfo[0].strKykNum
        // OCN請求科目情報照会.業務メッセージ域.OCN請求科目情報照会要求.請求年月
        ocnBillSubjectSrchReq.billMonth = this.tableData[0].strSkyYm
        // ocnBillSubjectSrchReq.billMonth = '202004'
        // OCN請求科目情報照会.業務メッセージ域.OCN請求科目情報照会要求.分割番号
        ocnBillSubjectSrchReq.devideNo = this.tableData[0].strBktNum
        // OCN請求科目情報照会.業務メッセージ域.OCN請求科目情報照会要求.定期分割表示
        ocnBillSubjectSrchReq.periodicDevideIndicate = this.tableData[0].strTikBktNumHyj
        // OCN請求科目情報照会.業務メッセージ域.OCN請求科目情報照会要求.検索ビリングID
        ocnBillSubjectSrchReq.searchBillingId = this.tableData[0].strKskBilId
      }
      let ocnBillingCategorySysMsg = {
        ocnBillSubjectSrchReq
      }
      // OCN請求科目情報照会API
      let ocnBillingCategoryResponse = null
      try {
        LoadingUtil.show()
        ocnBillingCategoryResponse = await getOcnBillingCategory(
          ocnBillingCategorySysMsg,
          option
        )
        this.billingCategoryShow = true
        if (
          !(
            (ocnBillingCategoryResponse.data.ComResHdrAre &&
              ocnBillingCategoryResponse.data.ComResHdrAre.TmlHyjMsgId ===
                'WScs4001') ||
            ocnBillingCategoryResponse.data.errorCode === 'WScs4003'
          )
        ) {
          this.mcd0102Model.ocnBillingCategory = ocnBillingCategoryResponse.data
          this.summaryCategoryInfo = this.mcd0102Model.ocnBillingCategory.SysMsgAre.ocnBillSubjectSrchNB.sysData
          let summaryCategoryInfoLength = this.summaryCategoryInfo.length
          this.invoicePlanInfo = []
          this.invoiceInfo = []
          for (let i = 0; i < summaryCategoryInfoLength; i++) {
            let seqStcSkyKmkLength = this.summaryCategoryInfo[i].seqStcSkyKmk
              .length
            let stcLblJyoLength = this.summaryCategoryInfo[i].stcLblJyo.length
            for (let j = 0; j < seqStcSkyKmkLength; j++) {
              let seqStcSkyKmk = this.summaryCategoryInfo[i].seqStcSkyKmk[j]
              this.invoicePlanInfo.push(seqStcSkyKmk)
            }
            for (let j = 0; j < stcLblJyoLength; j++) {
              let stcLblJyo = this.summaryCategoryInfo[i].stcLblJyo[j]
              this.invoiceInfo.push(stcLblJyo)
            }
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.billingCategoryShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      await this.getOcnOrderHistory()
    },
    async getOcnOrderHistory() {
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let option = { optionId: OPTION_ID.MCL0102A, traceLog: true }
      // OCN投入履歴情報照会APIのparameter
      let ocnInjectRecInfoSrchReq = {
        ...MCD0102_CONSTANTS.OCN_ORDER_HISTORY_PARAM
      }
      if (this.summaryListInfo.length > 0) {
        // OCN投入履歴情報照会.業務メッセージ域.OCN投入履歴情報照会要求.契約番号
        ocnInjectRecInfoSrchReq.contractId = this.summaryListInfo[0].strKykNum
        // OCN投入履歴情報照会.業務メッセージ域.OCN投入履歴情報照会要求.定期分割表示
        ocnInjectRecInfoSrchReq.periodicDevideIndicate = this.tableData[0].strTikBktNumHyj
        // OCN投入履歴情報照会.業務メッセージ域.OCN投入履歴情報照会要求.検索ビリングID
        ocnInjectRecInfoSrchReq.searchBillingId = this.tableData[0].strKskBilId
      }
      let ocnOrderHistorySysMsg = {
        ocnInjectRecInfoSrchReq
      }
      // OCN投入履歴情報照会API
      let ocnOrderHistoryResponse = null
      try {
        LoadingUtil.show()
        ocnOrderHistoryResponse = await getOcnOrderHistory(
          ocnOrderHistorySysMsg,
          option
        )
        this.orderHistoryShow = true
        if (
          !(
            (ocnBillingCategoryResponse.data.ComResHdrAre &&
              ocnBillingCategoryResponse.data.ComResHdrAre.TmlHyjMsgId ===
                'WScs4001') ||
            ocnBillingCategoryResponse.data.errorCode === 'WScs4003'
          )
        ) {
          this.mcd0102Model.ocnOrderHistory = ocnOrderHistoryResponse.data
          this.summaryHistoryInfo = this.mcd0102Model.ocnOrderHistory.SysMsgAre.ocnChrgSrchCommonResNB.sysData
          let summaryHistoryInfoLength = this.summaryHistoryInfo.length
          this.historyData = []
          for (let i = 0; i < summaryHistoryInfoLength; i++) {
            let seqStcTnyRrkLength = this.summaryHistoryInfo[i].seqStcTnyRrk
              .length
            for (let j = 0; j < seqStcTnyRrkLength; j++) {
              let seqStcTnyRrk = this.summaryHistoryInfo[i].seqStcTnyRrk[j]
              this.historyData.push(seqStcTnyRrk)
            }
          }
          for (let i = 0; i < this.historyData.length; i++) {
            let row = this.historyData[i]
            if (
              row.strBktNum === '' &&
              row.strHyjBilId === '' &&
              row.strSkyYm === '' &&
              row.strTnyCen === '' &&
              row.strTnySyaMei === '' &&
              row.strTnySyb === '' &&
              row.strTnyYmd === '' &&
              row.strKijRan !== ''
            ) {
              row.strSkyYm = row.strKijRan
              row.strKijRan = ''
            }
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.orderHistoryShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      const tabsList = document.getElementsByClassName('tagsDiv')
      changeWidth.changeTagsWidth(tabsList, mainCardList)
    },
    /**
     * この契約の一覧ページを返します。
     */
    async onBackView() {
      let ekimuListSrchRes = await this.getServiceList()
      let ekimuCode = ekimuListSrchRes.ekimuListInfo[0].ekimuCode
      let srvcKindCode = ekimuListSrchRes.ekimuListInfo[0].srvcKindCode
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedComponent = {}
      // 契約番号リンクをクリックする時
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === ekimuCode && item.srvcKindCode === srvcKindCode
        )
      })
      if (cardIndex !== -1) {
        selectedComponent = { ...componentList[cardIndex] }
        selectedComponent.isActived = true
      } else {
        return
      }
      this.moveTo(selectedComponent)
    },
    /**
     *請求情報のtable下のradioをクリック
     */
    onMultipleRadioClick(index, param) {
      this.accelBillingInfo = false
      this.detailsData = []
      this.invoiceInfo = []
      this.invoicePlanInfo = []
      this.historyData = []
      this.summaryDetailInfo = []
      this.address = []
      this.onInvoiceInfoChange(param)
    },
    /**
     *収納情報のtable下のradioをクリック
     */
    onStorageRadioClick(index) {
      this.storageSituationInfo = []
      this.storageSituationInfo.push(this.storageData[index])
    },
    async onInvoiceInfoChange(param) {
      let option = { optionId: OPTION_ID.MCD0102B, traceLog: true }
      // OCN請求内訳照会APIのparameter
      let billDetailSrchOcnReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_DETAIL_PARAM
      }
      billDetailSrchOcnReq.srvcId = this.maincardName
      billDetailSrchOcnReq.billMonth = param.strSkyYm
      billDetailSrchOcnReq.devideNo = param.strBktNum
      billDetailSrchOcnReq.periodicDevideIndicate = param.strTikBktNumHyj

      let billDetailSrchOcnSysMsg = {
        billDetailSrchOcnReq
      }
      // OCN請求内訳照会API
      let ocnBillingDetailResponse = null
      try {
        LoadingUtil.show()
        ocnBillingDetailResponse = await getOcnBillingDetail(
          billDetailSrchOcnSysMsg,
          option
        )
        this.billingDetailShow = true
        if (
          !(
            (ocnBillingDetailResponse.data.ComResHdrAre &&
              ocnBillingDetailResponse.data.ComResHdrAre.TmlHyjMsgId ===
                'WScs4001') ||
            ocnBillingDetailResponse.data.errorCode === 'WScs4003'
          )
        ) {
          this.mcd0102Model.ocnBillingDetail = ocnBillingDetailResponse.data
          this.summaryDetailInfo = this.mcd0102Model.ocnBillingDetail.SysMsgAre.billDetailSrchOcnResNB.sysData
          let summaryDetailInfoLength = this.summaryDetailInfo.length
          this.address = []
          this.detailsData = []
          for (let i = 0; i < summaryDetailInfoLength; i++) {
            let stcSksSfsMeiLength = this.summaryDetailInfo[i].stcSksSfsMei.length
            for (let j = 0; j < stcSksSfsMeiLength; j++) {
              let stcSksSfsMei = this.summaryDetailInfo[i].stcSksSfsMei[j]
              this.address.push(stcSksSfsMei)
            }
            let seqStcSkyUwkLength = this.summaryDetailInfo[i].seqStcSkyUwk.length
            for (let j = 0; j < seqStcSkyUwkLength; j++) {
              let seqStcSkyUwk = this.summaryDetailInfo[i].seqStcSkyUwk[j]
              this.detailsData.push(seqStcSkyUwk)
            }
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.billingDetailShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      // OCN請求科目情報照会APIのparameter
      let ocnBillSubjectSrchReq = {
        ...MCD0102_CONSTANTS.OCN_BILLING_CATEGORY_PARAM
      }
      ocnBillSubjectSrchReq.contractId = this.maincardName
      ocnBillSubjectSrchReq.billMonth = param.strSkyYm
      ocnBillSubjectSrchReq.devideNo = param.strBktNum
      ocnBillSubjectSrchReq.periodicDevideIndicate = param.strTikBktNumHyj
      ocnBillSubjectSrchReq.searchBillingId = param.strKskBilId
      let ocnBillingCategorySysMsg = {
        ocnBillSubjectSrchReq
      }
      // OCN請求科目情報照会API
      let ocnBillingCategoryResponse = null
      try {
        LoadingUtil.show()
        ocnBillingCategoryResponse = await getOcnBillingCategory(
          ocnBillingCategorySysMsg,
          option
        )
        this.billingCategoryShow = true
        if (
          !(
            (ocnBillingCategoryResponse.data.ComResHdrAre &&
              ocnBillingCategoryResponse.data.ComResHdrAre.TmlHyjMsgId ===
                'WScs4001') ||
            ocnBillingCategoryResponse.data.errorCode === 'WScs4003'
          )
        ) {
          this.mcd0102Model.ocnBillingCategory = ocnBillingCategoryResponse.data
          this.summaryCategoryInfo = this.mcd0102Model.ocnBillingCategory.SysMsgAre.ocnBillSubjectSrchNB.sysData
          let summaryCategoryInfoLength = this.summaryCategoryInfo.length
          this.invoicePlanInfo = []
          this.invoiceInfo = []
          for (let i = 0; i < summaryCategoryInfoLength; i++) {
            let seqStcSkyKmkLength = this.summaryCategoryInfo[i].seqStcSkyKmk
              .length
            let stcLblJyoLength = this.summaryCategoryInfo[i].stcLblJyo.length
            for (let j = 0; j < seqStcSkyKmkLength; j++) {
              let seqStcSkyKmk = this.summaryCategoryInfo[i].seqStcSkyKmk[j]
              this.invoicePlanInfo.push(seqStcSkyKmk)
            }
            for (let j = 0; j < stcLblJyoLength; j++) {
              let stcLblJyo = this.summaryCategoryInfo[i].stcLblJyo[j]
              this.invoiceInfo.push(stcLblJyo)
            }
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.billingCategoryShow = false
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
      // OCN投入履歴情報照会APIのparameter
      let ocnInjectRecInfoSrchReq = {
        ...MCD0102_CONSTANTS.OCN_ORDER_HISTORY_PARAM
      }
      ocnInjectRecInfoSrchReq.contractId = this.maincardName
      ocnInjectRecInfoSrchReq.periodicDevideIndicate = param.strTikBktNumHyj
      ocnInjectRecInfoSrchReq.searchBillingId = param.strKskBilId
      let ocnOrderHistorySysMsg = {
        ocnInjectRecInfoSrchReq
      }
      // OCN投入履歴情報照会API
      let ocnOrderHistoryResponse = null
      try {
        LoadingUtil.show()
        ocnOrderHistoryResponse = await getOcnOrderHistory(
          ocnOrderHistorySysMsg,
          option
        )
        this.orderHistoryShow = true
        this.mcd0102Model.ocnOrderHistory = ocnOrderHistoryResponse.data
        this.summaryHistoryInfo = this.mcd0102Model.ocnOrderHistory.SysMsgAre.ocnChrgSrchCommonResNB.sysData
        let summaryHistoryInfoLength = this.summaryHistoryInfo.length
        this.historyData = []
        for (let i = 0; i < summaryHistoryInfoLength; i++) {
          let seqStcTnyRrkLength = this.summaryHistoryInfo[i].seqStcTnyRrk.length
          for (let j = 0; j < seqStcTnyRrkLength; j++) {
            let seqStcTnyRrk = this.summaryHistoryInfo[i].seqStcTnyRrk[j]
            this.historyData.push(seqStcTnyRrk)
          }
        }
        for (let i = 0; i < this.historyData.length; i++) {
          let row = this.historyData[i]
          if (
            row.strBktNum === '' &&
            row.strHyjBilId === '' &&
            row.strSkyYm === '' &&
            row.strTnyCen === '' &&
            row.strTnySyaMei === '' &&
            row.strTnySyb === '' &&
            row.strTnyYmd === '' &&
            row.strKijRan !== ''
          ) {
            row.strSkyYm = row.strKijRan
            row.strKijRan = ''
          }
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.orderHistoryShow = true
        // this.onComError(OPTION_ID.MCD0102A, error)
        // return
      }
      LoadingUtil.hidden()
    },
    // データの表示を設定する
    ifNoData(data) {
      if (data && data !== '' && data !== ' ') {
        return data
      } else if (data === ' ') {
        return '　'
      } else {
        return '　'
      }
    },
    // TODO
    addrFormat(item) {
      if (item) {
        let add = item.strTdf + item.strSgc + item.strOat + item.strAcm
        return this.addressFormat(
          add,
          item.strBnc1,
          item.strBnc2,
          item.strBnc3,
          item.strTtm1,
          item.strTtm2,
          item.strTtm3,
          item.strSkt
        )
      } else {
        return '　'
      }
    },
    // 「YYYY/MM/DD」形式。
    YMDFormat(date) {
      if (date && date !== '') {
        return moment(date).format(DateConstants.YYYY_MM_DD)
      } else {
        return '　'
      }
    },
    // 「YYYY/MM/DD」形式。
    storageDate(date) {
      if (date && date !== '' && date !== '00000000') {
        return moment(date).format(DateConstants.YYYY_MM_DD)
      } else if (date === '00000000') {
        return '　'
      } else {
        return '　'
      }
    },
    // 「YYYY/MM」形式。
    billingDateFormat(row) {
      if (
        row.strBktNum === '' &&
        row.strHyjBilId === '' &&
        row.strSkyYm !== '' &&
        row.strTnyCen === '' &&
        row.strTnySyaMei === '' &&
        row.strTnySyb === '' &&
        row.strTnyYmd === '' &&
        row.strKijRan === ''
      ) {
        return row.strSkyYm
      } else if (row.strSkyYm && row.strSkyYm !== '') {
        return moment(row.strSkyYm, DateConstants.YYYYMM).format(
          DateConstants.YYYY_MM
        )
      } else {
        return '　'
      }
    },
    // 「YYYY/MM」形式。
    YMFormat(date) {
      if (date && date !== '') {
        return moment(date, DateConstants.YYYYMM).format(DateConstants.YYYY_MM)
      } else {
        return '　'
      }
    },
    // 末尾に「群」を付けて表示。
    ifHasGroup(data) {
      if (data && data !== '') {
        return data + '群'
      } else {
        return '　'
      }
    },
    // 「3桁カンマ区切り+ '円'」形式。
    amountFormat(data) {
      if (data && data !== '') {
        return parseFloat(data).toLocaleString() + '円'
      } else {
        return '　'
      }
    },
    // 「3桁カンマ区切り」形式。
    claimAmountFormat(data) {
      if (data && data !== '') {
        return parseFloat(data).toLocaleString()
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
    // 支払区分が「地域回収代行」の場合、「OCN回収代行」に変換して表示する。
    payType(data) {
      if (data === '地域回収代行') {
        return 'OCN回収代行'
      } else if (data) {
        return data
      } else {
        return '　'
      }
    },
    // 住所コードが初期値の場合「直接入力」を表示する。上記以外の場合「住所コード入力」を表示する。
    addrInputType(data) {
      if (data && data !== '') {
        return '住所コード入力'
      } else {
        return '直接入力'
      }
    },
    // 表示する値とその条件は、支払い区分の値による表示値の制御
    payReAccelType(item) {
      if (
        item.strShrKbn === '地域回収代行' ||
        item.strShrKbn === 'アクセル' ||
        item.strTikBktNumHyjMei === ''
      ) {
        return '　'
      } else {
        return item.strTikBktNumHyjMei
      }
    },
    payReType(item, data) {
      if (data.strShrKbn === '地域回収代行' || item === '') {
        return '　'
      } else {
        return item
      }
    },
    payAccelType(item, data) {
      if (data.strShrKbn === '地域回収代行') {
        return item
      } else {
        return '　'
      }
    },
    payAccelYMDType(item, data) {
      if (data.strShrKbn === '地域回収代行') {
        return moment(item).format(DateConstants.YYYY_MM_DD)
      } else {
        return '　'
      }
    },
    payAmountType(item) {
      if (item.strShrKbn === 'アクセル' || item === '') {
        return '　'
      } else {
        return parseFloat(item.strSkyKgk).toLocaleString() + '円'
      }
    },
    // 初期値(設定値が全て"0")の場合、空白表示とする。
    storageYMD(data) {
      if (Number(data) === 0 || data === '') {
        return '　'
      } else {
        return moment(data).format(DateConstants.YYYY_MM_DD)
      }
    },
    // NB基盤の画面を表示する
    async transformToNb() {
      let option = { optionId: OPTION_ID.MCD0102A, traceLog: true }
      let RequestData = { ...MCD0102_CONSTANTS.TRANSFORM_TO_NB_PARAM }
      RequestData.screenId = 'NGA0011'
      RequestData.contractId = this.summaryListInfo[0].strKykNum
      let transformToNbResponse = null
      try {
        LoadingUtil.show()
        transformToNbResponse = await transformToNb(RequestData, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0102A, error)
        return
      }
      LoadingUtil.hidden()
      let urlReq = []
      urlReq.url = transformToNbResponse.data.uri
      urlReq.data = transformToNbResponse.data.parameters
      openUrlUtil.openUrl(urlReq)
    },
    /**
     * tableのスタイル
     */
    tableCellStyle({ row, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "border-bottom: 2px solid #c1c1c1;border-right:1px solid #c1c1c1;text-align:center;background:#d8d8d8;border-top:1px solid #c1c1c1;font-family: 'Meiryo UI';font-size: 12px;font-weight: bold;color: #4a4a4a;"
      } else if (columnIndex === 0) {
        return 'border-left:1px solid #c1c1c1;'
      } else {
        return 'font-size:16px;color:#4a4a4a;'
      }
    },
    changeCellStyle(row) {
      if (row.column.label === '金額') {
        return 'padding-right: 10px'
      } else {
        return ''
      }
    },
    billDetaCellStyle(val) {
      if (
        val.row.detail === '' &&
        val.row.dmy === '' &&
        val.row.usePeriod === '' &&
        val.row.itemCode === '' &&
        val.row.dailyRate === '' &&
        val.row.detailChrg === '' &&
        val.row.consmEql === '' &&
        val.row.taxTyp === ''
      ) {
        return 'text-align:left !important;background:#f8f8f8'
      } else if (val.column.label === '金額') {
        return 'padding-right: 10px'
      } else {
        return ''
      }
    },
    historyCellStyle({ row }) {
      if (
        row.strBktNum === '' &&
        row.strHyjBilId === '' &&
        row.strSkyYm !== '' &&
        row.strTnyCen === '' &&
        row.strTnySyaMei === '' &&
        row.strTnySyb === '' &&
        row.strTnyYmd === '' &&
        row.strKijRan === ''
      ) {
        return 'text-align:left;'
      }
    },
    historyRowStyle({ row }) {
      if (row.index) {
        return 'background:#ffffff'
      } else {
        return 'background:#f8f8f8'
      }
    },
    // 請求情報と収納情報セグメントのビリングIDリンクのクリック
    billingIdClick(item) {
      if (this.customerInfo) {
        this.tobillingCard(item)
      }
    },
    tobillingCard(item) {
      let billingCard = {
        isActived: true,
        component: 'MCD0200',
        componentName: '契約詳細',
        name: item.billInfo[0].billingId,
        ekimuCode: '',
        srvcKindCode: '  '
      }
      let refreshView = this.updateMaincardList(billingCard)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
    },
    billClassName(data) {
      if (data === '1') {
        return '独自請求'
      } else if (data === '2') {
        return '合算請求'
      } else if (data === '3') {
        return '譲渡請求'
      }
    },
    /**
     * 請求種別が譲渡請求の場合、ワンビリング親子識別を基に下記の形式で表示。
     * "1" ：「有－親」
     * "2" ：「有－子」
     * 空白：「無」
     * 請求種別が譲渡請求以外の場合、スペース表示。
     */
    wabillingFlg(data) {
      if (data.billInfo[0].billClass === '3') {
        if (data.billInfo[0].oneBillingParentChildDist === '1') {
          return '有－親'
        } else if (data.billInfo[0].oneBillingParentChildDist === '2') {
          return '有－子'
        } else {
          return '無'
        }
      } else {
        return '　'
      }
    },
    payCategory(item) {
      if (item === '地域回収代行') {
        return 'OCN回収代行'
      } else {
        return item
      }
    },
    isShowAxel() {
      let index = this.tableData.findIndex(item => {
        return item.strShrKbn === 'アクセル'
      })
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    onPayment(item) {
      this.accelBillingInfo = true
      this.strHyjBilId = item.strHyjBilId
      this.strSkyYm = item.strSkyYm
      this.getAccelLedger(item.strHyjBilId)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        row.strBktNum === '' &&
        row.strHyjBilId === '' &&
        row.strSkyYm !== '' &&
        row.strTnyCen === '' &&
        row.strTnySyaMei === '' &&
        row.strTnySyb === '' &&
        row.strTnyYmd === '' &&
        row.strKijRan === ''
      ) {
        if (columnIndex === 1) {
          return [1, 8]
        } else if (
          columnIndex === 2 ||
          columnIndex === 3 ||
          columnIndex === 4 ||
          columnIndex === 5 ||
          columnIndex === 6 ||
          columnIndex === 7 ||
          columnIndex === 8
        ) {
          return [0, 0]
        }
      }
    },
    detailSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        row.detail === '' &&
        row.dmy === '' &&
        row.usePeriod === '' &&
        row.itemCode === '' &&
        row.dailyRate === '' &&
        row.detailChrg === '' &&
        row.consmEql === '' &&
        row.taxTyp === ''
      ) {
        if (columnIndex === 0) {
          return [1, 12]
        } else {
          return [0, 0]
        }
      }
    },
    showBreakdown(item) {
      if (
        item.strUwkSyb === '' &&
        item.strUwkMei === '' &&
        item.strHwrKbn === '' &&
        item.strUwkSyb === '' &&
        item.strZeiKbn === ''
      ) {
        return false
      } else {
        return true
      }
    },
    /**
     * 役務一覧照会API
     */
    async getServiceList() {
      let ekimuListSrchReq = { ...MCD0102_CONSTANTS.SERVICE_LIST_PARAM }
      ekimuListSrchReq.contractId = this.maincardName

      let sysMsg = {
        ekimuListSrchReq
      }
      let option = { optionId: OPTION_ID.MCD0101A, traceLog: false }
      let response = null
      try {
        response = await getServiceList(sysMsg, option)
      } catch (error) {
        this.onComError(OPTION_ID.MCD0102A, error)
        return
      }
      return response.data.SysMsgAre.ekimuListSrchRes
    }
  }
}
