/**
 * 契約詳細（電話）イベント処理
 * @module /src/views/BaseFrame/Layout/MCD0100/mcd0100-methods.js
 * @author IBM CIC
 */
import * as changeWidth from '@/utils/change-width'
import { getAccelLedger } from '@/api/get-accel-ledger'
import { getAccelContract } from '@/api/get-accel-contract'
import { getAccelBillingDetailByLine } from '@/api/get-accel-billing-detail-by-line'
import { getAccelDiscount } from '@/api/get-accel-discount'
import { getAccelSoBillingByIds } from '@/api/get-accel-so-billing-by-ids'
import { getAccelCallDetailSendingAddress } from '@/api/get-accel-call-detail-sending-address'
import { getAccelReceiptStatus } from '@/api/get-accel-receipt-status'
import { getAccelCustomerList } from '@/api/get-accel-customer-list'
import * as MCD0100CONS from './mcd0100-constants'
import * as CARDIDCONS from '@/constants/card-id-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import moment from 'moment'
import * as IDPFEvent from '@/constants/idpf-event'
import * as GlobalConstants from '@/constants/global-constants'
import * as DATE_CONS from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import * as userInfoUtil from '@/utils/user-info'
export default {
  methods: {
    /**
     * 初期化処理<br>
     * @param
     * @return
     */
    async initView() {
      let searchInfo = this.$store.getters.searchInfo
      if (searchInfo.searchKey && searchInfo.searchKey.alternateValue === 5) {
        this.nowDate = searchInfo.searchKey.alternateInputValue
      } else {
        this.nowDate = moment().format(DATE_CONS.YYYYMMDD)
      }
      // ACCEL候補顧客一覧照会API取得
      this.mcd0100Model.customerBusiness = this.$store.getters.accelCustomerInfo
      // viewDataがあるかを判断
      this.contractNoneFlg = false
      let card = this.getCurrentCard()

      if (card.viewData) {
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.mcd0100Model = JSON.parse(
          JSON.stringify(card.viewData.mcd0100Model)
        )
        this.searchInfo = JSON.parse(JSON.stringify(card.viewData.searchInfo))
        this.mainCardList = JSON.parse(
          JSON.stringify(card.viewData.mainCardList)
        )
        this.subCardList = JSON.parse(JSON.stringify(card.viewData.subCardList))
        this.activeNames = JSON.parse(JSON.stringify(card.viewData.activeNames))
        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))
        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))
        this.tabPosition = JSON.parse(JSON.stringify(card.viewData.tabPosition))
        /* eslint-disable */
        this.accelTableData = JSON.parse(
          JSON.stringify(card.viewData.accelTableData)
        )
        this.radio = JSON.parse(JSON.stringify(card.viewData.radio))
        this.storageData = JSON.parse(JSON.stringify(card.viewData.storageData))
        this.label = JSON.parse(JSON.stringify(card.viewData.label))
        this.productLabel = JSON.parse(
          JSON.stringify(card.viewData.productLabel)
        )
        this.detailIDLabel = JSON.parse(
          JSON.stringify(card.viewData.detailIDLabel)
        )
        this.productList = JSON.parse(JSON.stringify(card.viewData.productList))
        this.detailIDList = JSON.parse(
          JSON.stringify(card.viewData.detailIDList)
        )
        this.requestDateList = JSON.parse(
          JSON.stringify(card.viewData.requestDateList)
        )
        this.productInfo = JSON.parse(JSON.stringify(card.viewData.productInfo))
        this.accelDiscountInfo = JSON.parse(
          JSON.stringify(card.viewData.accelDiscountInfo)
        )
        this.variousIdListInfo = JSON.parse(
          JSON.stringify(card.viewData.variousIdListInfo)
        )
        this.inCityRecRec = JSON.parse(
          JSON.stringify(card.viewData.inCityRecRec)
        )
        this.ovrCityRecRec = JSON.parse(
          JSON.stringify(card.viewData.ovrCityRecRec)
        )
        this.outPrefctRecRec = JSON.parse(
          JSON.stringify(card.viewData.outPrefctRecRec)
        )
        this.internationalRecRec = JSON.parse(
          JSON.stringify(card.viewData.internationalRecRec)
        )
        this.historyLengthList = JSON.parse(
          JSON.stringify(card.viewData.historyLengthList)
        )
        this.inCityRecRecBlank = JSON.parse(
          JSON.stringify(card.viewData.inCityRecRecBlank)
        )
        this.ovrCityRecRecBlank = JSON.parse(
          JSON.stringify(card.viewData.ovrCityRecRecBlank)
        )
        this.outPrefctRecRecBlank = JSON.parse(
          JSON.stringify(card.viewData.outPrefctRecRecBlank)
        )
        this.internationalRecRecBlank = JSON.parse(
          JSON.stringify(card.viewData.internationalRecRecBlank)
        )
        this.maxLength = JSON.parse(JSON.stringify(card.viewData.maxLength))
        this.attr = JSON.parse(JSON.stringify(card.viewData.attr))
        this.srvcStopCodeDis = JSON.parse(
          JSON.stringify(card.viewData.srvcStopCodeDis)
        )
        this.unpaidCodeDis = JSON.parse(
          JSON.stringify(card.viewData.unpaidCodeDis)
        )
        this.orderStatusDis = JSON.parse(
          JSON.stringify(card.viewData.orderStatusDis)
        )
        this.spReportFlg = JSON.parse(JSON.stringify(card.viewData.spReportFlg))
        this.nowDate = JSON.parse(JSON.stringify(card.viewData.nowDate))
        this.srchDate = JSON.parse(JSON.stringify(card.viewData.srchDate))
        this.guiBillGrp = JSON.parse(JSON.stringify(card.viewData.guiBillGrp))
        this.accelReceiptStatusResNone = JSON.parse(
          JSON.stringify(card.viewData.accelReceiptStatusResNone)
        )
        this.widthRes = JSON.parse(JSON.stringify(card.viewData.widthRes))
        this.contractDisabled = JSON.parse(
          JSON.stringify(card.viewData.contractDisabled)
        )
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
        if (searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
          if (this.contractNoneFlg) {
            // 該当カードが検索結果がない場合
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
          }
        }
        return
      }

      // ユーザ権限取得
      let authority = userInfoUtil.get().AUTHORITY
      if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '0'
      ) {
        this.contractDisabled = false
        this.isSummaryShow = true
        this.tabPosition = '契約情報'
      } else if (
        authority.CONTRACT_TEL_OCN === '0' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
        this.tabPosition = '請求情報'
      } else if (
        authority.CONTRACT_TEL_OCN === '1' &&
        authority.BILLING_TEL_OCN === '1'
      ) {
        this.contractDisabled = false
        this.billDisabled = false
        this.receiptDisabled = false
        this.isSummaryShow = true
        this.tabPosition = '契約情報'
      }

      if (this.maincardName !== '') {
        if (
          this.mcd0100Model.customerBusiness &&
          this.mcd0100Model.customerBusiness.basicInfo
        ) {
          //  ACCEL契約番号情報照会
          await this.getAccelContract()
        } else {
          await this.getAccelCustomerList(this.maincardName)
        }
      }
    },
    /**
     * ACCEL候補顧客一覧照会API取得
     */
    async getAccelCustomerList() {
      let custSearchReq = {
        ...MCD0100CONS.ACCEL_CUSTOMER_LIST_PARAM
      }
      // 業務メッセージ域.顧客検索要求.検索区分コード
      custSearchReq.searchTypCode = '1'
      // 業務メッセージ域.顧客検索要求.サービス管理番号
      custSearchReq.custServiceId = this.maincardName
      custSearchReq.searchDate = this.nowDate
      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        custSearchReq
      }
      let accelCustomerBusinessResponse = null
      try {
        LoadingUtil.show()
        accelCustomerBusinessResponse = await getAccelCustomerList(
          sysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        await this.getAccelContract()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (accelCustomerBusinessResponse.data.SysMsgAre) {
        if (
          accelCustomerBusinessResponse.data.SysMsgAre
            .custInfoSrchCorpResIdpfWebNew
        ) {
          // 法人
          this.mcd0100Model.customerBusiness =
            accelCustomerBusinessResponse.data.SysMsgAre.custInfoSrchCorpResIdpfWebNew
        } else if (
          accelCustomerBusinessResponse.data.SysMsgAre
            .custInfoSrchPersResIdpfWebNew
        ) {
          // 個人
          this.mcd0100Model.customerBusiness =
            accelCustomerBusinessResponse.data.SysMsgAre.custInfoSrchPersResIdpfWebNew
        } else {
          this.mcd0100Model.customerBusiness = null
        }
      } else {
        this.mcd0100Model.customerBusiness = null
      }
      //  ACCEL契約番号情報照会
      await this.getAccelContract()
    },
    /**
     * ACCEL契約番号情報照会API取得
     */
    async getAccelContract() {
      let searchInfo = this.$store.getters.searchInfo
      let accSrvcIdInfoSrchReq = {
        ...MCD0100CONS.ACCEL_CONTRACT_PARAM
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL契約番号情報照会要求.電話番号
      accSrvcIdInfoSrchReq.telNo = telNo

      // 業務メッセージ域.ACCEL契約番号情報照会要求.基本要否フラグ
      accSrvcIdInfoSrchReq.basicReqrFlg = '1'

      // 業務メッセージ域.ACCEL契約番号情報照会要求.各種ID要否フラグ
      accSrvcIdInfoSrchReq.variousIdReqrFlg = '0'

      // 業務メッセージ域.ACCEL契約番号情報照会要求.掲載要否フラグ
      accSrvcIdInfoSrchReq.publishReqrFlg = '0'
      // 業務メッセージ域.ACCEL契約番号情報照会要求.照会年月日(指定不要)
      accSrvcIdInfoSrchReq.srchDate = this.nowDate

      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        accSrvcIdInfoSrchReq
      }
      let accelContractResponse = null
      try {
        LoadingUtil.show()
        accelContractResponse = await getAccelContract(sysMsg, option)
        this.mcd0100Model.accelContract = accelContractResponse.data.SysMsgAre
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()

      if (
        (accelContractResponse.data.ComResHdrAre &&
          accelContractResponse.data.ComResHdrAre.TmlHyjMsgId === 'WScs4001') ||
        accelContractResponse.data.errorCode === 'WScs4003'
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
        } else if (searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH) {
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
        let commonCustId = null
        // 共通顧客IDがあるかどうかの判断
        if (this.mcd0100Model.customerBusiness) {
          commonCustId = this.mcd0100Model.customerBusiness.basicInfo[0]
            .commonCustId
          this.gifFlgDis()
        } else {
          commonCustId = null
        }

        if (!commonCustId) {
          // 共通顧客IDがない場合、契約者名返る

          let contractCustName = null
          if (this.mcd0100Model.accelContract.accSrvcIdInfoSrchVer2) {
            contractCustName = this.mcd0100Model.accelContract
              .accSrvcIdInfoSrchVer2.srvcIdInfo[0].contractCustName
          } else {
            contractCustName = null
          }
          let obj = {
            commonCustId: '',
            contractCustName: contractCustName,
            srvcId: this.maincardName
          }
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_CUSTOMER_INFO, obj)
        } else {
          // 共通顧客IDがある場合、共通顧客ID返る
          let obj = {
            commonCustId: commonCustId,
            contractCustName: '',
            srvcId: ''
          }
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_CUSTOMER_INFO, obj)
        }
      }
      if (
        accelContractResponse.status === 200 &&
        accelContractResponse.data.ComResHdrAre &&
        accelContractResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0100Model.accelContract = accelContractResponse.data.SysMsgAre
        await this.getAccelDiscount()
        if (
          this.mcd0100Model.accelContract &&
          this.mcd0100Model.accelContract.accSrvcIdInfoSrchVer2
        ) {
          this.historyList()
        }
      } else {
        this.mcd0100Model.accelContract = {}
      }
      LoadingUtil.hidden()
    },
    /**
     * ACCEL割引情報照会API取得
     */
    async getAccelDiscount() {
      let accDiscntInfoSrchReq = {
        ...MCD0100CONS.ACCEL_DISCOUNT_PARAM
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL割引情報照会要求.電話番号
      accDiscntInfoSrchReq.telNo = telNo
      accDiscntInfoSrchReq.SrchDate = this.nowDate

      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        accDiscntInfoSrchReq
      }
      let accelDiscountResponse = null
      try {
        LoadingUtil.show()
        accelDiscountResponse = await getAccelDiscount(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (
        accelDiscountResponse.status === 200 &&
        accelDiscountResponse.data.ComResHdrAre &&
        accelDiscountResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0100Model.accelDiscount = accelDiscountResponse.data.SysMsgAre
        // 商品名(コード)
        this.productName()
      }
      await this.getAccelCallDetailSendingAddress()
    },
    /**
     * ACCEL通話明細送付先照会API取得
     */
    async getAccelCallDetailSendingAddress() {
      let accCallDetailSendtoSrchReq = {
        ...MCD0100CONS.ACCEL_CALL_DETAIL_SENDING_ADDRESS_PARAM
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL通話明細送付先照会要求.電話番号
      accCallDetailSendtoSrchReq.telNo = telNo
      // 業務メッセージ域.ACCEL通話明細送付先照会要求.照会年月日
      accCallDetailSendtoSrchReq.srchDate = this.nowDate
      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        accCallDetailSendtoSrchReq
      }
      let accelCallDetailSendingAddressResponse = null
      try {
        LoadingUtil.show()
        accelCallDetailSendingAddressResponse = await getAccelCallDetailSendingAddress(
          sysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (
        accelCallDetailSendingAddressResponse.status === 200 &&
        accelCallDetailSendingAddressResponse.data.ComResHdrAre &&
        accelCallDetailSendingAddressResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0100Model.accelCallDetailSendingAddress =
          accelCallDetailSendingAddressResponse.data.SysMsgAre
        // 明細送付ID
        this.detailID()
        this.variousIdListInfo = {}
        let variousIdListInfo = this.mcd0100Model.accelCallDetailSendingAddress
          .accCallDetailSendtoSrchRes.soEachDataArea[0].variousIdListInfo
        variousIdListInfo.forEach(item => {
          if (item.detailSendId === this.detailIDList[0].detailSendId) {
            this.variousIdListInfo = item
          }
        })
      } else {
        this.detailIDList = []
      }
      await this.getAccelLedger()
    },
    /**
     * ACCEL原簿照会API取得
     */
    async getAccelLedger() {
      let accCustListSrchReq = {
        ...MCD0100CONS.ACC_CUST_LIST_SRCH_REQ
      }
      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL原簿照会要求.リクエスト回数
      accCustListSrchReq.reqCnt = '001'
      // 業務メッセージ域.ACCEL原簿照会要求.抽出パターン
      accCustListSrchReq.extcPtn = '00001'
      // 業務メッセージ域.ACCEL原簿照会要求.searchKeyKind
      accCustListSrchReq.searchKeyKind = '02'
      // 業務メッセージ域.ACCEL原簿照会要求.検索キー
      accCustListSrchReq.searchKey = telNo
      /**
       * 業務メッセージ域.ACCEL原簿照会要求.searchDate
       *
       * ※1:「システム日付」 ＋ 「差分値」の日付(YYYYMMDD)を設定する。
       * 差分値:M:-4;システム日付からマイナス4ヶ月
       */
      let date = moment().subtract(4, 'month')
      accCustListSrchReq.searchDate = moment(date).format(DATE_CONS.YYYYMMDD)
      // 業務メッセージ域.ACCEL原簿照会要求.指定日時点照会フラグ
      accCustListSrchReq.spcfyDateTimePointSrchFlg = '0'
      let sysMsg = {
        accCustListSrchReq
      }
      let response = null
      try {
        LoadingUtil.show()
        response = await getAccelLedger(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (response.data.SysMsgAre) {
        let vbData =
          response.data.SysMsgAre.accCustListSrchReqRes.resInfo[0].vbData
        // 基本PD終了年月日：「エンティティ格納域」の66〜73桁目
        this.srchDate = vbData.slice(65, 73)
        // ACCEL_SO系請求情報照会(各種ID指定)
        this.getAccelSoBillingByIds()
      }
    },
    /**
     * ACCEL_SO系請求情報照会(各種ID指定)API取得
     */
    async getAccelSoBillingByIds() {
      let accSoKindBillInfoSrchDateReq = {
        ...MCD0100CONS.ACCEL_SO_BILLING_BY_IDS_PARAM
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).役務コード
      accSoKindBillInfoSrchDateReq.ekimuCode = '01'
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).サービスコード
      accSoKindBillInfoSrchDateReq.srvcKindCode = '  '
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).各種ID
      accSoKindBillInfoSrchDateReq.variousId = telNo
      /**
       * 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).照会年月日
       *
       * ACCEL原簿照会の応答項目「基本PD終了年月日」(YYYYMMDD)の値がALL9の場合、
       * 半角スペース8桁(WMB側でシステム日付(YYYYMMDD)に値を上書き)を設定する。
       * ALL9以外の場合、「基本PD終了年月日」- 1日の日付(YYYYMMDD)を設定する。
       */
      if (this.srchDate === '99999999') {
        accSoKindBillInfoSrchDateReq.srchDate = '        '
      } else {
        let date = new Date(
          moment(this.srchDate, 'YYYYMMDD').format('YYYY/MM/DD')
        )
        let newDate = moment(date).subtract(1, 'days')
        accSoKindBillInfoSrchDateReq.srchDate = moment(newDate).format(
          'YYYYMMDD'
        )
      }
      let option = {
        optionId: OPTION_ID.MCD0100A,
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
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (accelSoBillingByIdsResponse.data.SysMsgAre) {
        this.mcd0100Model.accelSoBillingByIds =
          accelSoBillingByIdsResponse.data.SysMsgAre

        this.initViewAfter()

        // ACCEL収納状況照会
        await this.getAccelReceiptStatus()
      }
    },
    /**
     * ACCEL収納状況照会API取得
     */
    async getAccelReceiptStatus(date) {
      let recptStatusSrchAccReq = {
        ...MCD0100CONS.RECPT_STATUS_SRCH_ACC_REQ
      }
      if (!date) {
        recptStatusSrchAccReq.billingId = this.mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
      } else {
        recptStatusSrchAccReq.billingId = date
      }
      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        recptStatusSrchAccReq
      }
      let accelReceiptStatusRes = null
      try {
        LoadingUtil.show()
        accelReceiptStatusRes = await getAccelReceiptStatus(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      this.mcd0100Model.accelReceiptStatusRes = {}
      if (
        accelReceiptStatusRes.status === 200 &&
        accelReceiptStatusRes.data.ComResHdrAre &&
        accelReceiptStatusRes.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0100Model.accelReceiptStatusRes =
          accelReceiptStatusRes.data.SysMsgAre
      } else {
        this.mcd0100Model.accelReceiptStatusRes = {}
      }
      this.label = ''
      this.requestDateList = []
      // 請求期別
      this.requestDate()
      if (
        accelReceiptStatusRes.status === 200 &&
        accelReceiptStatusRes.data.ComResHdrAre &&
        accelReceiptStatusRes.data.ComResHdrAre.Imp === 'I'
      ) {
        // ACCEL請求内訳照会（回線指定）
        await this.getAccelBillingDetailByLine(this.maincardName, '')
      }
    },
    /**
     * ACCEL請求内訳照会（回線指定）API取得
     */
    async getAccelBillingDetailByLine(param, count) {
      /**
       * 電番のパラメータ
       * 請求情報セグメントのラジオボタンと請求期別の請求パラメータ
       */
      let billDetailSrchAccReq = {
        ...MCD0100CONS.ACCEL_BILLING_DETAIL_BY_LINE_PARAM
      }
      if (param === this.maincardName) {
        /**
         * 画面初期表示時
         * 業務メッセージ域.ACCEL請求内訳照会要求.ビリングID
         */
        billDetailSrchAccReq.billingId = this.mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
        // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望年月
        billDetailSrchAccReq.srchRqstYearMonth = moment(
          this.requestDateList[0].date,
          DATE_CONS.YYYYMM
        ).format(DATE_CONS.YYYYMM)
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
        let billingId = this.mcd0100Model.accelSoBillingByIds
          .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
          this.radio
        ].billInfo[0].billingId
        // 選択されたラジオボタンのビリングIDをパラメータに設定すること。
        billDetailSrchAccReq.billingId = billingId
        // 請求タブ内の請求期別プルダウンで指定された年月（YYYYMM）
        billDetailSrchAccReq.srchRqstYearMonth = moment(
          param,
          DATE_CONS.YYYYMM
        ).format(DATE_CONS.YYYYMM)
        // 業務メッセージ域.ACCEL請求内訳照会要求.照会希望請求回数
        billDetailSrchAccReq.srchRqstBillCnt = count
      }
      // 050'、'070'、'080'、'090'で始まる11桁の電話番号
      let telNoTest = /^0[5|7|8|9][0]\d{8}$/
      let telNo = this.maincardName

      if (telNoTest.test(telNo)) {
        // 先頭'0'を除去した10桁を設定する。
        telNo = telNo.slice(1)
      }
      // 業務メッセージ域.ACCEL請求内訳照会要求.契約ID
      billDetailSrchAccReq.contractId = telNo

      // 業務メッセージ域.ACCEL請求内訳照会要求.バンドル種類コード
      billDetailSrchAccReq.bandleKindCode = '00'

      // 業務メッセージ域.ACCEL請求内訳照会要求.網種類
      billDetailSrchAccReq.lineKind = '01'

      // 業務メッセージ域.ACCEL請求内訳照会要求.照会パターン
      billDetailSrchAccReq.srchPtn = '0'

      // 業務メッセージ域.ACCEL請求内訳照会要求.請求種別
      // 請求タブ内のラジオボタンで指定された項目の請求種別
      /* eslint-disable */
      billDetailSrchAccReq.billClass = this.mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
        this.radio
      ].billInfo[0].billClass

      // 業務メッセージ域.ACCEL請求内訳照会要求.表示区分
      billDetailSrchAccReq.indicateTyp = '0'

      let option = {
        optionId: OPTION_ID.MCD0100A,
        traceLog: true
      }
      let sysMsg = {
        billDetailSrchAccReq
      }
      let accelBillingDetailByLineResponse = null
      this.mcd0100Model.accelBillingDetailByLine = {}
      try {
        if (param === this.maincardName) {
          LoadingUtil.show()
          accelBillingDetailByLineResponse = await getAccelBillingDetailByLine(
            sysMsg,
            option
          )
        } else {
          LoadingUtil.show()
          // 請求情報のデータ更新
          accelBillingDetailByLineResponse = await getAccelBillingDetailByLine(
            sysMsg,
            option
          )
        }
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(OPTION_ID.MCD0100A, error)
        return
      }
      LoadingUtil.hidden()
      if (
        accelBillingDetailByLineResponse.status === 200 &&
        accelBillingDetailByLineResponse.data.ComResHdrAre &&
        accelBillingDetailByLineResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0100Model.accelBillingDetailByLine =
          accelBillingDetailByLineResponse.data.SysMsgAre

        this.guiBillGrp = this.mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.guiBillGrp[0]
      } else {
        this.mcd0100Model.accelBillingDetailByLine = {}
        this.guiBillGrp = {}
      }
    },

    initViewAfter() {
      let accelList = []
      for (
        let i = 0;
        i <
        this.mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes
          .soEachDataArea.length;
        i++
      ) {
        const array = this.mcd0100Model.accelSoBillingByIds
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
      let attrData = this.mcd0100Model.accelSoBillingByIds
        .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].attr
    },
    // 履歴・[表]
    historyList() {
      let myline = this.mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.myline
      myline.forEach(item => {
        // 市内履歴
        item.inCityRecRec.forEach(el => {
          this.inCityRecRec.push(el)
        })

        // 市内履歴
        item.ovrCityRecRec.forEach(el => {
          this.ovrCityRecRec.push(el)
        })
        // 県間履歴
        item.outPrefctRecRec.forEach(el => {
          this.outPrefctRecRec.push(el)
        })
        // 国際履歴
        item.internationalRecRec.forEach(el => {
          this.internationalRecRec.push(el)
        })
      })
      if (this.inCityRecRec.length >= 20) {
        this.inCityRecRec = this.inCityRecRec.slice(0, 20)
      }
      if (this.ovrCityRecRec.length >= 20) {
        this.ovrCityRecRec = this.ovrCityRecRec.slice(0, 20)
      }
      if (this.outPrefctRecRec.length >= 20) {
        this.outPrefctRecRec = this.outPrefctRecRec.slice(0, 20)
      }
      if (this.internationalRecRec.length >= 20) {
        this.internationalRecRec = this.internationalRecRec.slice(0, 20)
      }
      let lengthList = []
      lengthList.push(this.inCityRecRec.length)
      lengthList.push(this.ovrCityRecRec.length)
      lengthList.push(this.outPrefctRecRec.length)
      lengthList.push(this.internationalRecRec.length)
      // データの最大lengthを表示すること。
      let length = Math.max.apply(null, lengthList)
      // 通番最大20件
      if (length <= '20') {
        this.maxLength = length
      } else {
        this.maxLength = '20'
      }
      this.historyLengthList = lengthList
      this.historyLengthList.length = this.maxLength
      this.inCityRecRecBlank.length = this.maxLength - this.inCityRecRec.length
      this.ovrCityRecRecBlank = this.maxLength - this.ovrCityRecRec.length
      this.outPrefctRecRecBlank = this.maxLength - this.outPrefctRecRec.length
      this.internationalRecRecBlank =
        this.maxLength - this.internationalRecRec.length
    },
    // 利用停止GIF、料金未納などのGIFの表示条件
    gifFlgDis() {
      if (this.mcd0100Model.customerBusiness.spReportInfo) {
        let spReportInfo = this.mcd0100Model.customerBusiness.spReportInfo
        spReportInfo.forEach(item => {
          item.indicator.forEach(el => {
            if (el.srvcStopCode === MCD0100CONS.CORP) {
              this.srvcStopCodeDis = true
            } else {
              this.srvcStopCodeDis = false
            }
            if (el.unpaidCode === MCD0100CONS.CORP) {
              this.unpaidCodeDis = true
            } else {
              this.unpaidCodeDis = false
            }
          })
        })
      }
      // 受注中GIF、特記GIFの表示条件
      let basicInfo = this.mcd0100Model.customerBusiness.basicInfo
      if (
        this.mcd0100Model.customerBusiness.basicInfo &&
        basicInfo.length > 0
      ) {
        basicInfo.forEach(item => {
          if (item.orderStatus === MCD0100CONS.CORP) {
            this.orderStatusDis = true
          } else {
            this.orderStatusDis = false
          }
          if (item.spReportFlg === MCD0100CONS.CORP) {
            this.spReportFlg = true
          } else {
            this.spReportFlg = false
          }
        })
      }
    },
    /**
     * 「ACCEL割引情報照会」をCALLした結果の商品コードと、
     * その前、MCD0100を表示するときに「ACCEL契約番号情報照会」をCALLした結果の商品コードを比較して
     * 「割引情報照会にあって契約番号情報照会にもある商品を、割引情報照会の順に表示」します。
     */
    productName() {
      // ACCEL割引情報照会
      let soEachDataArea = this.mcd0100Model.accelDiscount.accDiscntInfoSrchRes
        .soEachDataArea

      let srvcContractInfoRec = this.mcd0100Model.accelContract
        .accSrvcIdInfoSrchVer2.srvcContractInfoRec

      // ACCEL契約番号情報照会
      let list = []
      // ACCEL割引情報照会
      soEachDataArea.forEach(item => {
        item.variousIdListInfo.forEach(el => {
          list.push(el)
        })
      })
      // ACCEL割引情報
      let infoList = []
      let twoList = []
      srvcContractInfoRec.forEach((el, index) => {
        list.forEach(item => {
          if (
            item.prdctCode === el.srrecPrdctCode &&
            infoList.indexOf(el) === -1
          ) {
            infoList.push(el)
          } else if (
            item.prdctCode !== el.srrecPrdctCode &&
            twoList.indexOf(el) === -1 &&
            infoList.indexOf(el) === -1
          ) {
            twoList.push(el)
          }
        })
      })

      twoList.forEach(el => {
        if (infoList.indexOf(el) === -1) {
          infoList.push(el)
        }
      })
      infoList.forEach(el => {
        let item = {
          srrecPrdctName: el.srrecPrdctName,
          srrecPrdctCode: el.srrecPrdctCode
        }
        this.productList.push(item)
      })
      if (this.productList.length > 0) {
        this.productLabel =
          this.productList[0].srrecPrdctName +
          '(' +
          this.productList[0].srrecPrdctCode +
          ')'

        // 最大30件。
        this.productList = this.productList.slice(0, 30)
        // 商品情報タブのACCEL契約番号情報更新
        srvcContractInfoRec.forEach(item => {
          if (item.srrecPrdctCode === this.productList[0].srrecPrdctCode) {
            this.productInfo = item
          }
        })
        // 商品情報タブのACCEL割引情報更新
        soEachDataArea.forEach(item => {
          item.variousIdListInfo.forEach(el => {
            if (el.prdctCode === this.productList[0].srrecPrdctCode) {
              this.accelDiscountInfo = el
            }
          })
        })
      }
    },
    // 商品名(コード)
    productChange(prdctCode) {
      let srvcContractInfoRec = this.mcd0100Model.accelContract
        .accSrvcIdInfoSrchVer2.srvcContractInfoRec
      srvcContractInfoRec.forEach(el => {
        if (el.srrecPrdctCode === prdctCode) {
          this.productInfo = el
        }
      })
      let soEachDataArea = this.mcd0100Model.accelDiscount.accDiscntInfoSrchRes
        .soEachDataArea
      soEachDataArea.forEach(item => {
        item.variousIdListInfo.forEach(el => {
          if (el.prdctCode === prdctCode) {
            this.accelDiscountInfo = el
          }
        })
      })
    },
    // 明細送付ID
    detailID() {
      let soEachDataArea = this.mcd0100Model.accelCallDetailSendingAddress
        .accCallDetailSendtoSrchRes.soEachDataArea
      this.detailIDList = []
      soEachDataArea.forEach(item => {
        let arrList = []
        item.variousIdListInfo.forEach(el => {
          // "明細送付ID"+"("+"送付サービス区分名"+")"
          let ele = {
            detailSendId: el.detailSendId,
            sendSrvctypName: el.sendSrvctypName
          }
          arrList.push(ele)
        })
        this.detailIDList = arrList.slice(0)
      })
      this.detailIDLabel =
        this.detailIDList[0].detailSendId +
        '(' +
        this.detailIDList[0].sendSrvctypName +
        ')'
    },
    /**
     * 「"明細送付ID"+"("+"送付サービス区分名"+")"」形式で表示する。
     * 選択された明細送付IDに対する情報を項番3～38(明細情報タブの明細一括送付ID～住所)に表示する。
     */
    detailIDChange(event) {
      let soEachDataArea = this.mcd0100Model.accelCallDetailSendingAddress
        .accCallDetailSendtoSrchRes.soEachDataArea
      soEachDataArea.forEach(item => {
        item.variousIdListInfo.forEach(el => {
          if (el.detailSendId === event) {
            this.variousIdListInfo = el
          }
        })
      })
    },
    // 請求期別
    requestDate() {
      let soEachDataArea = this.mcd0100Model.accelSoBillingByIds
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
        if (this.mcd0100Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0100Model.accelReceiptStatusRes
            .recptStatusSrchAccRes.recptStatusInfo
          recptStatusInfo.forEach(item => {
            let obj = {}
            let billCnt = Number(item.billCnt) + 1
            if (billCnt > 9) {
              obj = {
                value: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM + ' - ' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM
                ),
                count: billCnt.toString()
              }
            } else {
              obj = {
                value: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM + ' - ' + '0' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM
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
    },
    async accelDate(data) {
      let billClass = this.accelTableData[this.radio].billInfo[0].billClass
      let date = moment(data, DATE_CONS.YYYYMM).format(DATE_CONS.YYYYMM)
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
      // 切换请求期别的时候，下面数据要重新请求
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
          DATE_CONS.YYYYMM
        ).format(DATE_CONS.YYYYMM)
        let count = this.requestDateList[0].count
        await this.getAccelBillingDetailByLine(date, count)
      } else {
        await this.getAccelReceiptStatus(data.billInfo[0].billingId)
        this.accelReceiptStatusResNone = false
        if (this.mcd0100Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0100Model.accelReceiptStatusRes
            .recptStatusSrchAccRes.recptStatusInfo
          this.requestDateList = []
          let arrList = []
          recptStatusInfo.forEach(item => {
            let obj = {}
            let billCnt = Number(item.billCnt) + 1
            if (billCnt > 9) {
              obj = {
                value: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM + ' - ' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM
                ),
                count: billCnt.toString()
              }
            } else {
              obj = {
                value: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM + ' - ' + '0' + billCnt.toString() + '回目'
                ),
                date: moment(item.chrgMonth, DATE_CONS.YYYYMM).format(
                  DATE_CONS.YYYY_MM
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
          let date = moment(reqDate, DATE_CONS.YYYYMM).format(DATE_CONS.YYYYMM)
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
          this.mcd0100Model.accelBillingDetailByLine = {}
        }
      }
    },
    calDiffMonths(startDate, endDate) {
      let strDate = moment(startDate, DATE_CONS.YYYYMM)
      let eDate = moment(endDate, DATE_CONS.YYYYMM)
      let diff = eDate.format('YM') - strDate.format('YM')
      diff = eDate.format('Y') !== strDate.format('Y') ? diff + 2 : diff

      return Array.apply([], new Array(diff + 1)).map((item, index) => {
        return strDate
          .clone()
          .add(index, 'months')
          .format('YYYY/MM')
      })
    },
    /**
     * この契約の一覧ページを返します。
     * MCL0400_契約番号一覧（電話）
     */
    toKeiyakuList() {
      let billingCard = {
        isActived: true,
        name: MCD0100CONS.MCD04NAME,
        componentName: '契約一覧',
        component: CARDIDCONS.MCL0400,
        ekimuCode: MCD0100CONS.EKIMUCODE,
        srvcKindCode: '  '
      }

      this.moveTo(billingCard)
    },
    // データの表示を設定する
    ifNoData(data) {
      if (data && data !== '') {
        return data
      } else {
        return '　'
      }
    },

    // 「999-9999」形式。
    iszipFormat(data) {
      if (data && data !== '') {
        return data.slice(0, 3) + '-' + data.slice(3)
      } else {
        return '　'
      }
    },
    // 「YYYY/MM/DD」形式。
    YMDFormat(date) {
      if (date && date !== '') {
        return moment(date, DATE_CONS.YYYYMMDD).format(DATE_CONS.YYYY_MM_DD)
      } else {
        return '　'
      }
    },
    // 「YYYY/MM」形式。
    YMFormat(date) {
      if (date && date !== '') {
        return moment(date, DATE_CONS.YYYYMM).format(DATE_CONS.YYYY_MM)
      } else {
        return '　'
      }
    },
    MDFormat(date) {
      if (date && date !== '') {
        return moment(date, DATE_CONS.MMDD).format(DATE_CONS.MM_DD)
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
    // Web表示要否
    hasFlg(data) {
      if (data && data === MCD0100CONS.CORP) {
        return '有'
      } else if (data && data === MCD0100CONS.ZERO) {
        return '否'
      } else {
        return '　'
      }
    },
    // ダイヤルイン発信番号表示要否、媒体(紙以外)、媒体(紙)
    daiyaruinnFlg(data) {
      if (data && data === MCD0100CONS.CORP) {
        return '有'
      } else if (data && data === MCD0100CONS.ZERO) {
        return '無'
      } else {
        return '　'
      }
    },
    // 請求書と同封
    billEncloseFlag(data) {
      if (data && data === MCD0100CONS.CORP) {
        return '同封'
      } else if (data && data === MCD0100CONS.PERS) {
        return '別送'
      } else {
        return '　'
      }
    },
    /**
     * アドレスのフォマード
     * 住所、番地、建物、様方の両端のスペースをトリムし全角スペースで連結
     */
    addrForDis(data) {
      if (data) {
        return this.addressFormat(
          data.addr,
          data.houseNo,
          '',
          '',
          data.bild,
          '',
          '',
          data.addrfor
        )
      } else {
        return '　'
      }
    },
    addrAttach(data) {
      let result = null
      if (
        data &&
        data[0].addr &&
        data[0].houseNo &&
        data[0].bild &&
        data[0].addrfor
      ) {
        /* eslint-disable */
        result =
          data[0].addr +
          '　' +
          data[0].houseNo +
          '　' +
          data[0].bild +
          '　' +
          data[0].addrfor
      } else {
        result = '　'
      }
      return result
    },
    /**
     * アドレスのフォマード
     * 住所、番地・号、方書の両端のスペースをトリムし全角スペースで連結。
     */
    soAddressFormat(data) {
      if (data) {
        /* eslint-disable */
        return data.addr + '　' + data.houseNo + '　' + data.addrfor
      } else {
        return '　'
      }
    },
    variousIdAddressFormat(data) {
      if (data) {
        /* eslint-disable */
        return data.addr + '　' + data.houseNo + '　' + data.addrFor
      } else {
        return '　'
      }
    },
    amountFormat(data) {
      if (data) {
        let amount = parseInt(data)
        return amount.toLocaleString() + '円'
      } else {
        return '　'
      }
    },
    // 画面に表示されたエラーメッセージ
    errorMsgDis() {
      if (this.errorMsg !== '') {
        return true
      } else {
        return false
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
        ekimuCode: '  ',
        srvcKindCode: '  '
      }
      let refreshView = this.updateMaincardList(billingCard)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }
    },
    /**
     * 上記以外の場合は、現在日を表示する。
     * 「YYYY/MM/DD」形式で赤字表示する。
     */
    getSearchDate() {
      let nowDate = moment().format(DATE_CONS.YYYY_MM_DD)
      return nowDate
    },
    /**
     * 共通顧客IDのフォマード
     * @param {String} data 共通顧客ID
     */
    commonIdFormat(data) {
      if (data && data !== '') {
        let commonCustIdLeft = data.slice(0, 3)
        let commonCustIdMid = data.slice(3, 7)
        let commonCustIdRight = data.slice(7, 11)
        return (
          commonCustIdLeft + '-' + commonCustIdMid + '-' + commonCustIdRight
        )
      } else {
        return '　'
      }
    },
    /**
     * tableのスタイル
     */
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "border-bottom: 2px solid #c1c1c1;border-right:1px solid #c1c1c1;text-align:center;background:#d8d8d8;border-top:1px solid #c1c1c1;font-family: 'Meiryo UI';font-size: 12px;font-weight: bold;color: #4a4a4a;"
      } else {
        return 'font-size:16px;color:#4a4a4a'
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
    billClassName(data) {
      if (data === '1') {
        return '独自請求'
      } else if (data === '2') {
        return '合算請求'
      } else if (data === '3') {
        return '譲渡請求'
      }
    },
    reqGroupDis(data) {
      // 請求群
      return data.substring(6, 8) + '群'
    },
    periodicDevide(data) {
      // 定期分割
      return data.substring(9, 12)
    },
    wanbillingFlg(guiBillGrp) {
      if (guiBillGrp.oneBillingDist) {
        if (guiBillGrp.oneBillingDist === '1') {
          return (
            guiBillGrp.oneBillingDistName +
            '－' +
            guiBillGrp.oneBillingParentChildDistName
          )
        } else {
          return '無'
        }
      } else {
        return '　'
      }
    },
    useDateFor(usePeriod) {
      let strDate = usePeriod.slice(0, 4)
      let endDate = usePeriod.slice(-4)
      return (
        moment(strDate, 'MMDD').format('MM/DD') +
        '~' +
        moment(endDate, 'MMDD').format('MM/DD')
      )
    },
    YYMMFormat(date) {
      let frontD = ''
      let endD = ''
      let forDate = ''
      if (date && date !== '') {
        frontD = date.toString().substring(0, 2)

        endD = date.toString().substring(2, 4)
        forDate = frontD + '/' + endD
        return forDate
      } else {
        return '　'
      }
    }
  }
}
