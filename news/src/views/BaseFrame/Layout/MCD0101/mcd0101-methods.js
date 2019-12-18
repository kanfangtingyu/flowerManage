/**
 * 契約詳細（法人サービス）イベント処理
 * @module /src/views/BaseFrame/Layout/MCD0101/mcd0101-methods.js
 * @author IBM CIC
 */
import { getAccelLedger } from '@/api/get-accel-ledger'
import { getAccelReceiptStatus } from '@/api/get-accel-receipt-status'
import { getAccelBillingDetailByLine } from '@/api/get-accel-billing-detail-by-line'
import { siriusWssb019 } from '@/api/sirius-wssb019'
import { getOcnBillingList } from '@/api/get-ocn-billing-list'
import { getAccelSoBillingByIds } from '@/api/get-accel-so-billing-by-ids'
import { getOcnBillingDetail } from '@/api/get-ocn-billing-detail'
import { getOcnBillingCategory } from '@/api/get-ocn-billing-category'
import { getOcnOrderHistory } from '@/api/get-ocn-order-history'
import { getCodeName } from '@/api/get-code-name'
import { getIdpfEkimuByAccelServiecekindCode } from '@/api/get-idpf-ekimu-by-accel-servicekind-code'
import { getServiceList } from '@/api/get-service-list'
import * as MCD0101CONS from './mcd0101-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as GlobalConstants from '@/constants/global-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as DATE_CONS from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import * as userInfoUtil from '@/utils/user-info'
import moment from 'moment'
export default {
  methods: {
    /**
     * 初期化処理<br>
     * @param
     * @return
     */
    async initView() {
      this.customerInfo = this.$store.getters.customerInfo
      let searchInfo = this.$store.getters.searchInfo
      this.searchInfo = searchInfo
      let srchRangeTypeInfo = null
      if (searchInfo.searchType === 1) {
        // 詳細検索時、オーダ・マスタ区分を取得する。
        srchRangeTypeInfo = this.$store.getters.srchRangeTypeInfo
      }
      if (searchInfo.searchKey && searchInfo.searchKey.alternateValue === 5) {
        this.nowDate = searchInfo.searchKey.alternateInputValue
      } else {
        this.nowDate = moment().format(DATE_CONS.YYYYMMDD)
      }
      this.contractNoneFlg = false
      // viewDataがあるかを判断
      let card = this.getCurrentCard()

      if (card.viewData) {
        this.contractDetailInfo = JSON.parse(
          JSON.stringify(card.viewData.contractDetailInfo)
        )

        this.workProgressmanageInfo = JSON.parse(
          JSON.stringify(card.viewData.workProgressmanageInfo)
        )

        this.ekimuListSrchRes = JSON.parse(
          JSON.stringify(card.viewData.ekimuListSrchRes)
        )

        this.searchInfo = JSON.parse(JSON.stringify(card.viewData.searchInfo))

        this.errorMsg = JSON.parse(JSON.stringify(card.viewData.errorMsg))

        this.errorCode = JSON.parse(JSON.stringify(card.viewData.errorCode))

        this.monflgChrg = JSON.parse(JSON.stringify(card.viewData.monflgChrg))

        this.monflgReg = JSON.parse(JSON.stringify(card.viewData.monflgReg))

        this.contactRadio = JSON.parse(
          JSON.stringify(card.viewData.contactRadio)
        )

        this.storageRadio = JSON.parse(
          JSON.stringify(card.viewData.storageRadio)
        )

        this.accelRadio = JSON.parse(JSON.stringify(card.viewData.accelRadio))

        this.allCostomer = JSON.parse(JSON.stringify(card.viewData.allCostomer))

        this.mcd0101Model = JSON.parse(
          JSON.stringify(card.viewData.mcd0101Model)
        )

        this.tabPosition = JSON.parse(JSON.stringify(card.viewData.tabPosition))

        this.requestInfo = JSON.parse(JSON.stringify(card.viewData.requestInfo))

        this.contactInfo = JSON.parse(JSON.stringify(card.viewData.contactInfo))

        this.intakeInfo = JSON.parse(JSON.stringify(card.viewData.intakeInfo))

        this.seqStcSkyUwk = JSON.parse(
          JSON.stringify(card.viewData.seqStcSkyUwk)
        )

        this.contactTableData = JSON.parse(
          JSON.stringify(card.viewData.contactTableData)
        )

        this.space = JSON.parse(JSON.stringify(card.viewData.space))

        this.radio = JSON.parse(JSON.stringify(card.viewData.radio))

        this.storageData = JSON.parse(JSON.stringify(card.viewData.storageData))

        this.gifList = JSON.parse(JSON.stringify(card.viewData.gifList))

        this.haveAccelReq = JSON.parse(
          JSON.stringify(card.viewData.haveAccelReq)
        )

        this.kasAddress = JSON.parse(JSON.stringify(card.viewData.kasAddress))

        this.kysAddress = JSON.parse(JSON.stringify(card.viewData.kysAddress))

        this.sksAddress = JSON.parse(JSON.stringify(card.viewData.sksAddress))

        this.stbAddress = JSON.parse(JSON.stringify(card.viewData.stbAddress))

        this.kysAddrMsg = JSON.parse(JSON.stringify(card.viewData.kysAddrMsg))

        this.kasAddrMsg = JSON.parse(JSON.stringify(card.viewData.kasAddrMsg))

        this.stbAddrMsg = JSON.parse(JSON.stringify(card.viewData.stbAddrMsg))

        this.sksAddrMsg = JSON.parse(JSON.stringify(card.viewData.sksAddrMsg))

        this.orderType = JSON.parse(JSON.stringify(card.viewData.orderType))

        this.amountTypeV = JSON.parse(JSON.stringify(card.viewData.amountTypeV))

        this.prdctDetailDis = JSON.parse(
          JSON.stringify(card.viewData.prdctDetailDis)
        )
        // 事務担当者
        this.clerical = JSON.parse(JSON.stringify(card.viewData.clerical))
        // お客様対応部門
        this.customerSup = JSON.parse(JSON.stringify(card.viewData.customerSup))
        // お申込受付部門
        this.receiptSection = JSON.parse(
          JSON.stringify(card.viewData.receiptSection)
        )
        // 設備保守担当
        this.toolCharge = JSON.parse(JSON.stringify(card.viewData.toolCharge))

        this.storageInfo = JSON.parse(JSON.stringify(card.viewData.storageInfo))
        // 開案修正内容コード
        this.changeContCode = JSON.parse(
          JSON.stringify(card.viewData.changeContCode)
        )
        // 時間区分
        this.timeType = JSON.parse(JSON.stringify(card.viewData.timeType))

        this.handleTypeData = JSON.parse(
          JSON.stringify(card.viewData.handleTypeData)
        )

        this.nowDate = JSON.parse(JSON.stringify(card.viewData.nowDate))

        this.srchDate = JSON.parse(JSON.stringify(card.viewData.srchDate))

        this.accelTableData = JSON.parse(
          JSON.stringify(card.viewData.accelTableData)
        )

        this.reqAttr = JSON.parse(JSON.stringify(card.viewData.reqAttr))

        this.attr = JSON.parse(JSON.stringify(card.viewData.attr))

        this.label = JSON.parse(JSON.stringify(card.viewData.label))

        this.requestDateList = JSON.parse(
          JSON.stringify(card.viewData.requestDateList)
        )

        this.accelReceiptStatusResNone = JSON.parse(
          JSON.stringify(card.viewData.accelReceiptStatusResNone)
        )

        this.guiBillGrp = JSON.parse(JSON.stringify(card.viewData.guiBillGrp))

        this.billInfoBand = JSON.parse(
          JSON.stringify(card.viewData.billInfoBand)
        )
        // 開廃年月日
        this.workDate = JSON.parse(JSON.stringify(card.viewData.workDate))
        // ネットワーク起算日
        this.networkStartDate = JSON.parse(
          JSON.stringify(card.viewData.networkStartDate)
        )
        // アクセスライン起算日
        this.accellineStartCotDate = JSON.parse(
          JSON.stringify(card.viewData.accellineStartCotDate)
        )
        // サーバ工事予定年月日
        this.serverWorkDate = JSON.parse(
          JSON.stringify(card.viewData.serverWorkDate)
        )
        // サーバ工事開始時間
        this.serverStartDate = JSON.parse(
          JSON.stringify(card.viewData.serverStartDate)
        )
        // サーバ工事終了時間

        this.serverEndDate = JSON.parse(
          JSON.stringify(card.viewData.serverEndDate)
        )
        // ルータ工事予定年月日
        this.rootWorktDate = JSON.parse(
          JSON.stringify(card.viewData.rootWorktDate)
        )
        // ルータ工事開始時間
        this.rootStartDate = JSON.parse(
          JSON.stringify(card.viewData.rootStartDate)
        )
        // ルータ工事終了時間
        this.rootEndDate = JSON.parse(JSON.stringify(card.viewData.rootEndDate))
        // アクセスライン工事予定年月日
        this.accelLineWorkDate = JSON.parse(
          JSON.stringify(card.viewData.accelLineWorkDate)
        )
        // アクセスライン工事開始時間
        this.accelLineStartDate = JSON.parse(
          JSON.stringify(card.viewData.accelLineStartDate)
        )
        // アクセスライン工事終了時間
        this.accelLineEndDate = JSON.parse(
          JSON.stringify(card.viewData.accelLineEndDate)
        )
        // 工事完了年月日
        this.workEndDate = JSON.parse(JSON.stringify(card.viewData.workEndDate))

        this.workDateOld = JSON.parse(JSON.stringify(card.viewData.workDateOld))
        // ネットワーク起算日(旧)
        this.networkStartDateOld = JSON.parse(
          JSON.stringify(card.viewData.networkStartDateOld)
        )
        // アクセスライン起算日(旧)
        this.accellineStartCotDateOld = JSON.parse(
          JSON.stringify(card.viewData.accellineStartCotDateOld)
        )
        // サーバ工事予定年月日(旧)
        this.serverWorkDateOld = JSON.parse(
          JSON.stringify(card.viewData.serverWorkDateOld)
        )
        // サーバ工事開始時間(旧)
        this.serverStartDateOld = JSON.parse(
          JSON.stringify(card.viewData.serverStartDateOld)
        )
        // サーバ工事終了時間(旧)
        this.serverEndDateOld = JSON.parse(
          JSON.stringify(card.viewData.serverEndDateOld)
        )
        // ルータ工事予定年月日(旧)
        this.rootWorktDateOld = JSON.parse(
          JSON.stringify(card.viewData.rootWorktDateOld)
        )
        // ルータ工事開始時間(旧)
        this.rootStartDateOld = JSON.parse(
          JSON.stringify(card.viewData.rootStartDateOld)
        )
        // ルータ工事終了時間(旧)
        this.rootEndDateOld = JSON.parse(
          JSON.stringify(card.viewData.rootEndDateOld)
        )
        // アクセスライン工事予定年月日(旧)
        this.accelLineWorkDateOld = JSON.parse(
          JSON.stringify(card.viewData.accelLineWorkDateOld)
        )
        // アクセスライン工事開始時間(旧)
        this.accelLineStartDateOld = JSON.parse(
          JSON.stringify(card.viewData.accelLineStartDateOld)
        )
        // アクセスライン工事終了時間(旧)
        this.accelLineEndDateOld = JSON.parse(
          JSON.stringify(card.viewData.accelLineEndDateOld)
        )
        // 工事完了年月日(旧)
        this.workEndDateOld = JSON.parse(
          JSON.stringify(card.viewData.workEndDateOld)
        )
        // 譲渡・承継区分
        this.ranOrHasType = JSON.parse(
          JSON.stringify(card.viewData.ranOrHasType)
        )
        // 開通案内出力回数
        this.openOutCount = JSON.parse(
          JSON.stringify(card.viewData.openOutCount)
        )
        // 開案修正記事
        this.openChangeTex = JSON.parse(
          JSON.stringify(card.viewData.openChangeTex)
        )
        // お客様ご要望記事欄(支店記事)
        this.otherTex = JSON.parse(JSON.stringify(card.viewData.otherTex))
        // 工事内容
        this.workContent = JSON.parse(JSON.stringify(card.viewData.workContent))
        // 希望日時 年月日
        this.hopeDate = JSON.parse(JSON.stringify(card.viewData.hopeDate))
        // 希望日時 開始時間帯
        this.hopeStartDate = JSON.parse(
          JSON.stringify(card.viewData.hopeStartDate)
        )
        // 希望日時 終了時間帯
        this.hopeEndDate = JSON.parse(JSON.stringify(card.viewData.hopeEndDate))
        // 故障受付窓口部門
        this.errCompony = JSON.parse(JSON.stringify(card.viewData.errCompony))
        // 開通試験実施内容
        this.openTestContent = JSON.parse(
          JSON.stringify(card.viewData.openTestContent)
        )
        // 開通記事
        this.openText = JSON.parse(JSON.stringify(card.viewData.openText))

        this.prdctList = JSON.parse(JSON.stringify(card.viewData.prdctList))

        this.setAddZip = JSON.parse(JSON.stringify(card.viewData.setAddZip))

        this.setAddCode = JSON.parse(JSON.stringify(card.viewData.setAddCode))

        this.setAddAddr = JSON.parse(JSON.stringify(card.viewData.setAddAddr))

        this.widthRes = JSON.parse(JSON.stringify(card.viewData.widthRes))

        this.isSummaryShow = JSON.parse(
          JSON.stringify(card.viewData.isSummaryShow)
        )

        this.contractDisabled = JSON.parse(
          JSON.stringify(card.viewData.contractDisabled)
        )

        this.billDisabled = JSON.parse(
          JSON.stringify(card.viewData.billDisabled)
        )

        this.receiptDisabled = JSON.parse(
          JSON.stringify(card.viewData.receiptDisabled)
        )
        this.contractNoneFlg = JSON.parse(
          JSON.stringify(card.viewData.contractNoneFlg)
        )
        this.siriusErr = JSON.parse(JSON.stringify(card.viewData.siriusErr))
        this.accelLedgerErr = JSON.parse(
          JSON.stringify(card.viewData.accelLedgerErr)
        )
        this.accelDetailByLineErr = JSON.parse(
          JSON.stringify(card.viewData.accelDetailByLineErr)
        )
        this.accelReceiptStatusErr = JSON.parse(
          JSON.stringify(card.viewData.accelReceiptStatusErr)
        )
        this.ocnBillingListErr = JSON.parse(
          JSON.stringify(card.viewData.ocnBillingListErr)
        )
        this.ocnBillingDetailErr = JSON.parse(
          JSON.stringify(card.viewData.ocnBillingDetailErr)
        )
        this.ocnOrderHistoryErr = JSON.parse(
          JSON.stringify(card.viewData.ocnOrderHistoryErr)
        )
        this.ocnBillingCategoryErr = JSON.parse(
          JSON.stringify(card.viewData.ocnBillingCategoryErr)
        )
        this.accelSoBillingErr = JSON.parse(
          JSON.stringify(card.viewData.accelSoBillingErr)
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
        this.isSummaryShow = true
        this.contractDisabled = false
        this.billDisabled = false
        this.receiptDisabled = false
        this.tabPosition = '契約情報'
      }

      await this.getSirius(srchRangeTypeInfo)
    },
    /**
     * SIRIUS情報取得
     */
    async getSirius(srchRangeTypeInfo) {
      let SiriusParam = Object.assign({}, MCD0101CONS.SIRIUS_PARAM)
      SiriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.maincardName
      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let siriusResponse = null
      this.mcd0101Model.sirius = {}
      try {
        LoadingUtil.show()
        siriusResponse = await siriusWssb019(SiriusParam, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.siriusErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (
        siriusResponse &&
        siriusResponse.data.responseData.searchResultDetailList
      ) {
        if (srchRangeTypeInfo && srchRangeTypeInfo.searchRangeType) {
          // 詳細検索からの場合、オーダとマスタによって、レスポンスをフィルタする
          let searchResultDetailList =
            siriusResponse.data.responseData.searchResultDetailList
          for (const item of searchResultDetailList) {
            if (
              item.searchResultDetailInfo.searchRangeType ===
              srchRangeTypeInfo.searchRangeType
            ) {
              this.mcd0101Model.sirius = item
              break
            }
          }
        } else {
          // オーダとマスタ指定の検索して、マスタとオーダがそれぞれ応答が合った場合、マスタを画面表示する
          if (
            this.checkOrderMasterKbn(
              siriusResponse.data.responseData.searchResultDetailList
            )
          ) {
            // オーダとマスタ指定の検索して、マスタが複数件の応答が合った場合、先頭１件目のマスタを画面表示する。
            for (let detail of siriusResponse.data.responseData
              .searchResultDetailList) {
              if (detail.searchResultDetailInfo.searchRangeType === '02') {
                this.mcd0101Model.sirius = detail
                break
              }
            }
          } else {
            // オーダ指定の検索して、オーダが複数件の応答が有った場合、先頭１件目のオーダを画面表示する。
            this.mcd0101Model.sirius =
              siriusResponse.data.responseData.searchResultDetailList[0]
          }
        }

        /**
         * 注意喚起情報のGIF表示判断
         */
        let gifGroup = []
        let staticGuidanceList = this.mcd0101Model.sirius.searchResultDetailInfo
          .guidanceInfo.staticGuidanceList
        staticGuidanceList.forEach(el => {
          gifGroup.push(el.staticGuidanceInfo.staticGuidanceDisplayName)
        })
        let dynamicGuidanceList = this.mcd0101Model.sirius
          .searchResultDetailInfo.guidanceInfo.dynamicGuidanceList
        dynamicGuidanceList.forEach(el => {
          gifGroup.push(el.dynamicGuidanceInfo.dynamicGuidanceDisplayName)
        })
        this.haveAccelReq = false
        this.gifList = []
        gifGroup.forEach(item => {
          this.gifList.push(item)
          // ACCELバンドルの場合（「注意喚起情報」に「ACCEL請求」が有るかどうかの判断
          if (item === 'ACCEL請求') {
            this.haveAccelReq = true
          }
        })
        // 契約情報セグメント・商品情報・商品詳細リスト
        let prdctList = this.getProductList(
          this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
        )
        this.codeChangeDis()
        this.prdctListDis(prdctList)
        // アドレスのデータ判定
        this.addressTypeDis()
        if (this.orderDataDis()) {
          // 契約情報セグメント・工事情報
          this.workDetailID()
        }
        this.dataIdDetail()
        this.getcontactList()
        // ACCELバンドル判定
        if (this.haveAccelReq) {
          // ACCEL原簿照会API
          await this.getAccelLedger()
        } else {
          // OCN請求情報一覧照会
          await this.getOcnBillingList()
        }
      } else {
        this.mcd0101Model.sirius = {}
      }
      if (
        !this.customerInfo &&
        Object.keys(this.mcd0101Model.sirius).length <= 0
      ) {
        if (this.searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
          /**
           * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
           * カードを表示されない。
           */
          let cardList = this.$store.getters.mainCardList.slice(0)
          for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].name === this.searchInfo.searchKey) {
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
          this.searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH
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
      } else if (
        !this.customerInfo &&
        Object.keys(this.mcd0101Model.sirius).length > 0
      ) {
        // 顧客基本情報がない場合、契約者名返る
        let contractCustName = this.mcd0101Model.sirius.searchResultDetailInfo
          .applyInfo.contractCustomerInfo.contractCustomerName
        let obj = {
          commonCustId: '',
          contractCustName: contractCustName,
          srvcId: this.maincardName
        }
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_CUSTOMER_INFO, obj)
      } else if (Object.keys(this.mcd0101Model.sirius).length <= 0) {
        if (this.searchInfo.searchType === GlobalConstants.SIMPLE_SEARCH) {
          /**
           * データなしの場合、簡易検索のインプットの下にメッセージを表示する。
           * カードを表示されない。
           */
          let cardList = this.$store.getters.mainCardList.slice(0)
          for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].name === this.searchInfo.searchKey) {
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
          this.searchInfo.searchType === GlobalConstants.NUM_LIST_SEARCH
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
    },

    /**
     * 検索範囲識別の値からオーダマスタ区分を判別し、マスタがあれば Trueを戻す
     * 01:オーダ、02:マスタ
     * @param detailList （情報域）検索結果詳細リスト
     */
    checkOrderMasterKbn(detailList) {
      let existMaster = false
      for (let detail of detailList) {
        if (detail.searchResultDetailInfo.searchRangeType === '02') {
          // マスタがあれば優先的にマスタを取得する。
          existMaster = true
          break
        }
      }
      return existMaster
    },

    /**
     * ACCEL原簿照会API取得
     */
    async getAccelLedger() {
      let accCustListSrchReq = {
        ...MCD0101CONS.ACC_CUST_LIST_SRCH_REQ
      }
      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      // 業務メッセージ域.ACCEL原簿照会要求.リクエスト回数
      accCustListSrchReq.reqCnt = '001'
      // 業務メッセージ域.ACCEL原簿照会要求.抽出パターン
      accCustListSrchReq.extcPtn = '00001'
      // 業務メッセージ域.ACCEL原簿照会要求.検索キー種類
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
      accCustListSrchReq.searchDate = moment(date).format(DATE_CONS.YYYYMMDD)
      // 業務メッセージ域.ACCEL原簿照会要求.指定日時点照会フラグ
      accCustListSrchReq.spcfyDateTimePointSrchFlg = '0'
      let sysMsg = {
        accCustListSrchReq
      }
      let accelLedgerResponse = null
      try {
        LoadingUtil.show()
        accelLedgerResponse = await getAccelLedger(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.accelLedgerErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (
        accelLedgerResponse &&
        accelLedgerResponse.status === 200 &&
        accelLedgerResponse.data.ComResHdrAre &&
        accelLedgerResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        // ACCEL原簿照会の応答項目「エンティティ格納域」の276桁目〜277桁目から「サービス種類」を取得する。
        let vbData =
          accelLedgerResponse.data.SysMsgAre.accCustListSrchReqRes.resInfo[0]
            .vbData
        let ekimuCode = vbData.slice(275, 277)
        // 基本PD終了年月日：「エンティティ格納域」の66〜73桁目
        this.srchDate = vbData.slice(65, 73)
        // バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
        await this.getIdpfEkimuByAccelServiecekindCode(ekimuCode)
        // ACCEL_SO系請求情報照会(各種ID指定)
        await this.getAccelSoBillingByIds()
      } else {
        this.getOcnBillingList()
      }
    },
    // バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
    async getIdpfEkimuByAccelServiecekindCode(ekimuCode) {
      let accelEkimuReq = {
        ...MCD0101CONS.ACCEL_EKIMU_REQ
      }
      accelEkimuReq.accelServiceKindCode = ekimuCode
      let option = {
        optionId: OPTION_ID.MCD0101A,
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
      }
      LoadingUtil.hidden()
    },
    /**
     * ACCEL_SO系請求情報照会(各種ID指定)API取得
     */
    async getAccelSoBillingByIds() {
      this.accelSoBillingErr = false
      let accSoKindBillInfoSrchDateReq = {
        ...MCD0101CONS.ACCEL_SO_BILLING_BY_IDS_PARAM
      }
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).役務コード
      accSoKindBillInfoSrchDateReq.ekimuCode = this.ekimuListSrchRes.IDD_EKI_CODE
      accSoKindBillInfoSrchDateReq.srvcKindCode = this.ekimuListSrchRes.IDD_SRVC_KIND_CODE
      // 業務メッセージ域.ACCEL_SO系請求情報照会要求(各種ID指定).各種ID
      accSoKindBillInfoSrchDateReq.variousId = this.maincardName
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
        optionId: OPTION_ID.MCD0101A,
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
        this.accelSoBillingErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      this.billInfoBand = {}
      if (accelSoBillingByIdsResponse &&
        accelSoBillingByIdsResponse.status === 200 &&
        accelSoBillingByIdsResponse.data.ComResHdrAre &&
        accelSoBillingByIdsResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0101Model.accelSoBillingByIds =
          accelSoBillingByIdsResponse.data.SysMsgAre

        this.billInfoBand = this.mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0]

        // ACCEL収納状況照会
        await this.getAccelReceiptStatus()
      } else {
        await this.getOcnBillingList()
      }
      this.getAccelTabelDate()
    },
    /**
     * ACCEL収納状況照会API取得
     */
    async getAccelReceiptStatus(param) {
      this.accelReceiptStatusErr = false
      let recptStatusSrchAccReq = {
        ...MCD0101CONS.RECPT_STATUS_SRCH_ACC_REQ
      }
      if (!param) {
        // 業務メッセージ域.ACCEL収納状況照会要求.ビリングID
        recptStatusSrchAccReq.billingId = this.mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
      } else {
        recptStatusSrchAccReq.billingId = param
      }

      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        recptStatusSrchAccReq
      }
      let accelReceiptStatusResponse = null
      this.mcd0101Model.accelReceiptStatusRes = {}
      try {
        LoadingUtil.show()
        accelReceiptStatusResponse = await getAccelReceiptStatus(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.accelReceiptStatusErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (
        accelReceiptStatusResponse.status === 200 &&
        accelReceiptStatusResponse.data.ComResHdrAre &&
        accelReceiptStatusResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0101Model.accelReceiptStatusRes =
          accelReceiptStatusResponse.data.SysMsgAre
      }
      this.label = ''
      this.requestDateList = []
      // 請求期別
      await this.requestDate()
      if (
        (accelReceiptStatusResponse.data.ComResHdrAre &&
          accelReceiptStatusResponse.data.ComResHdrAre.TmlHyjMsgId ===
            'WScs4001') ||
        accelReceiptStatusResponse.data.errorCode === 'WScs4003'
      ) {
        await this.getOcnBillingList()
      } else {
        await this.getAccelBillingDetailByLine(this.maincardName, '')
      }
    },
    /**
     * ACCEL請求内訳照会（回線指定）API取得
     */
    async getAccelBillingDetailByLine(param, count) {
      this.accelDetailByLineErr = false
      /**
       * 電番のパラメータ
       * 請求情報セグメントのラジオボタンと請求期別の請求パラメータ
       */
      let billDetailSrchAccReq = {
        ...MCD0101CONS.ACCEL_BILLING_DETAIL_BY_LINE_PARAM
      }
      if (param === this.maincardName) {
        /**
         * 画面初期表示時
         * 業務メッセージ域.ACCEL請求内訳照会要求.ビリングID
         */
        billDetailSrchAccReq.billingId = this.mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billInfo[0].billingId
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
        let billingId = this.mcd0101Model.accelSoBillingByIds
          .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
          this.accelRadio
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
      billDetailSrchAccReq.billClass = this.mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[
        this.radio
      ].billInfo[0].billClass

      // 業務メッセージ域.ACCEL請求内訳照会要求.表示区分
      billDetailSrchAccReq.indicateTyp = '0'

      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        billDetailSrchAccReq
      }
      let accelBillingDetailByLineResponse = null
      this.mcd0101Model.accelBillingDetailByLine = {}
      try {
        LoadingUtil.show()
        accelBillingDetailByLineResponse = await getAccelBillingDetailByLine(
          sysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()
        this.accelDetailByLineErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (
        accelBillingDetailByLineResponse &&
        accelBillingDetailByLineResponse.status === 200 &&
        accelBillingDetailByLineResponse.data.ComResHdrAre &&
        accelBillingDetailByLineResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0101Model.accelBillingDetailByLine =
          accelBillingDetailByLineResponse.data.SysMsgAre
        this.guiBillGrp = this.mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.guiBillGrp[0]
      } else {
        this.mcd0101Model.accelBillingDetailByLine = {}
        this.guiBillGrp = {}
      }
      this.addressDisFor()
    },
    /**
     * OCN請求情報一覧照会API取得
     */
    async getOcnBillingList() {
      this.ocnBillingListErr = false
      let billInfoSrchOcnAlwaysRefrnceReq = {
        ...MCD0101CONS.OCN_BILLING_LIST_PARAM
      }
      billInfoSrchOcnAlwaysRefrnceReq.contractId = this.maincardName
      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        billInfoSrchOcnAlwaysRefrnceReq
      }
      let ocnBillingListResponse = null
      try {
        LoadingUtil.show()
        ocnBillingListResponse = await getOcnBillingList(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.ocnBillingListErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (
        ocnBillingListResponse &&
        ocnBillingListResponse.status === 200 &&
        ocnBillingListResponse.data.ComResHdrAre &&
        ocnBillingListResponse.data.ComResHdrAre.Imp === 'I'
      ) {
        this.mcd0101Model.ocnBillingList = ocnBillingListResponse.data.SysMsgAre
        this.mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData.forEach(
          item => {
            item.seqStcSynJky.forEach(el => {
              // 収納年月日
              // 初期値(設定値が全て"0")の場合、空白表示とする。
              if (el.strSynYmd === '00000000') {
                el.strSynYmd = ''
              }
            })
          }
        )
        // 画面中表のデータ設定
        this.getContractData()
        // OCN請求内訳照会API取得
        await this.getOcnBillingDetail()
      }
    },
    /**
     * OCN請求内訳照会API取得
     */
    async getOcnBillingDetail(rowData) {
      this.ocnBillingDetailErr = false
      let billDetailSrchOcnReq = { ...MCD0101CONS.OCN_BILLING_DETAIL_PARAM }
      // 業務メッセージ域.OCN請求内訳照会要求.契約番号
      billDetailSrchOcnReq.srvcId = this.maincardName
      if (!rowData) {
        // 業務メッセージ域.OCN請求内訳照会要求.請求年月
        billDetailSrchOcnReq.billMonth = this.contactTableData[0].strSkyYm
        // 業務メッセージ域.OCN請求内訳照会要求.分割番号
        billDetailSrchOcnReq.devideNo = this.contactTableData[0].strBktNum
        // 業務メッセージ域.OCN請求内訳照会要求.定期分割表示
        billDetailSrchOcnReq.periodicDevideIndicate = this.contactTableData[0].strTikBktNumHyj
        // 業務メッセージ域.OCN請求内訳照会要求.ビリングID
        billDetailSrchOcnReq.searchBillingId = this.contactTableData[0].strKskBilId
      } else {
        // 請求タブ内ラジオボタンで指定されたレコードの請求年月、分割番号、定期分割表示、ビリングID
        billDetailSrchOcnReq.billMonth = rowData.strSkyYm
        billDetailSrchOcnReq.devideNo = rowData.strBktNum
        billDetailSrchOcnReq.periodicDevideIndicate = rowData.strTikBktNumHyj
        billDetailSrchOcnReq.searchBillingId = rowData.strKskBilId
      }

      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        billDetailSrchOcnReq
      }
      let ocnBillingDetailResponse = null
      this.mcd0101Model.ocnBillingDetail = {}
      try {
        LoadingUtil.show()
        ocnBillingDetailResponse = await getOcnBillingDetail(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.ocnBillingDetailErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (ocnBillingDetailResponse.data.SysMsgAre) {
        if (Object.keys(this.mcd0101Model.ocnBillingDetail).length <= 0) {
          this.mcd0101Model.ocnBillingDetail =
            ocnBillingDetailResponse.data.SysMsgAre
          this.mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData.forEach(
            item => {
              // 住所コードが初期値の場合「直接入力」を表示する。
              item.strJsyCod = '直接入力'
              // 直接入力住所、住所コードが初期値の場合、「直接入力住所」を表示する。
              item.strNrkJsy = '直接入力住所'
            }
          )
        } else {
          this.mcd0101Model.ocnBillingDetail = {}
          // 住所コードが初期では場合「住所コード入力」を表示する
          this.mcd0101Model.ocnBillingDetail =
            ocnBillingDetailResponse.data.SysMsgAre
          this.mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData.forEach(
            item => {
              item.strJsyCod = '住所コード入力'
            }
          )
        }
        if (!rowData) {
          // OCN請求科目情報照会API取得
          await this.getOcnBillingCategory()
        } else {
          // OCN請求科目情報照会API取得
          await this.getOcnBillingCategory(rowData)
        }
      }
    },
    /**
     * OCN請求科目情報照会API取得
     *
     */
    async getOcnBillingCategory(rowData) {
      this.ocnBillingCategoryErr = false
      let ocnBillSubjectSrchReq = { ...MCD0101CONS.OCN_BILLING_CATEGORY_PARAM }
      // 業務メッセージ域.OCN請求科目情報照会要求.契約番号
      ocnBillSubjectSrchReq.contractId = this.maincardName
      if (!rowData) {
        // 業務メッセージ域.OCN請求科目情報照会要求.請求年月
        ocnBillSubjectSrchReq.billMonth = this.contactTableData[0].strSkyYm
        // 業務メッセージ域.OCN請求科目情報照会要求.分割番号
        ocnBillSubjectSrchReq.devideNo = this.contactTableData[0].strBktNum
        // 業務メッセージ域.OCN請求科目情報照会要求.定期分割表示
        ocnBillSubjectSrchReq.periodicDevideIndicate = this.contactTableData[0].strTikBktNumHyj
        // 業務メッセージ域.OCN請求科目情報照会要求.検索ビリングID
        ocnBillSubjectSrchReq.searchBillingId = this.contactTableData[0].strKskBilId
      } else {
        // 請求タブ内ラジオボタンで指定されたレコードの請求年月、分割番号、定期分割表示、ビリングID
        ocnBillSubjectSrchReq.billMonth = rowData.strSkyYm

        ocnBillSubjectSrchReq.devideNo = rowData.strBktNum

        ocnBillSubjectSrchReq.periodicDevideIndicate = rowData.strTikBktNumHyj

        ocnBillSubjectSrchReq.searchBillingId = rowData.strKskBilId
      }

      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        ocnBillSubjectSrchReq
      }
      let ocnBillingCategoryResponse = null
      this.mcd0101Model.ocnBillingCategory = {}
      try {
        LoadingUtil.show()
        ocnBillingCategoryResponse = await getOcnBillingCategory(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.ocnBillingCategoryErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      this.mcd0101Model.ocnBillingCategory = {}
      if (
        ocnBillingCategoryResponse &&
        ocnBillingCategoryResponse.data.SysMsgAre
      ) {
        this.mcd0101Model.ocnBillingCategory =
          ocnBillingCategoryResponse.data.SysMsgAre
      }
      if (!rowData) {
        // OCN投入履歴情報照会API取得
        await this.getOcnOrderHistory()
      } else {
        // OCN投入履歴情報照会API取得
        await this.getOcnOrderHistory(rowData)
      }
    },
    /**
     * OCN投入履歴情報照会API取得
     */
    async getOcnOrderHistory(rowData) {
      this.ocnOrderHistoryErr = false
      let ocnInjectRecInfoSrchReq = { ...MCD0101CONS.OCN_ORDER_HISTORY_PARAM }
      // 業務メッセージ域.OCN投入履歴情報照会要求.契約番号
      ocnInjectRecInfoSrchReq.contractId = this.maincardName
      if (!rowData) {
        // 業務メッセージ域.OCN投入履歴情報照会要求.定期分割表示
        ocnInjectRecInfoSrchReq.periodicDevideIndicate = this.contactTableData[0].strTikBktNumHyj
        // 業務メッセージ域.OCN投入履歴情報照会要求.検索ビリングID
        ocnInjectRecInfoSrchReq.searchBillingId = this.contactTableData[0].strKskBilId
      } else {
        // 業務メッセージ域.OCN投入履歴情報照会要求.定期分割表示
        ocnInjectRecInfoSrchReq.periodicDevideIndicate = rowData.strTikBktNumHyj
        // 業務メッセージ域.OCN投入履歴情報照会要求.検索ビリングID
        ocnInjectRecInfoSrchReq.searchBillingId = rowData.strKskBilId
      }
      let option = {
        optionId: OPTION_ID.MCD0101A,
        traceLog: true
      }
      let sysMsg = {
        ocnInjectRecInfoSrchReq
      }
      let ocnOrderHistoryResponse = null
      this.mcd0101Model.ocnOrderHistory = {}
      try {
        LoadingUtil.show()
        ocnOrderHistoryResponse = await getOcnOrderHistory(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.ocnOrderHistoryErr = true
        // this.onComError(OPTION_ID.MCD0101A, error)
        // return
      }
      LoadingUtil.hidden()
      if (ocnOrderHistoryResponse && ocnOrderHistoryResponse.data.SysMsgAre) {
        if (!rowData) {
          this.mcd0101Model.ocnOrderHistory =
            ocnOrderHistoryResponse.data.SysMsgAre
        } else {
          this.mcd0101Model.ocnOrderHistory =
            ocnOrderHistoryResponse.data.SysMsgAre
        }
        for (
          let i = 0;
          i <
          this.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB.sysData[0]
            .seqStcTnyRrk.length;
          i++
        ) {
          let row = this.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB
            .sysData[0].seqStcTnyRrk[i]
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

        this.addressDisFor()
      }
    },
    getcontactList() {
      let contactList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contactList
      if (this.mastDataDis()) {
        contactList.forEach(item => {
          if (item.contactInfo.contactCategoryId === '03') {
            // 事務担当者
            this.clerical = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '01') {
            // お客様対応部門
            this.customerSup = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '02') {
            // お申込受付部門
            this.receiptSection = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '04') {
            // ネットワーク技術部門１
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '05') {
            // ネットワーク技術部門２
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '06') {
            // ネットワーク技術部門３
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '07') {
            // 設備保守担当
            this.toolCharge = item.contactInfo
          }
        })
      } else if (this.orderDataDis()) {
        contactList.forEach(item => {
          if (item.contactInfo.contactCategoryId === '03') {
            // 事務担当者
            this.clerical = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '01') {
            // お客様対応部門
            this.customerSup = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '02') {
            // お申込受付部門
            this.receiptSection = item.contactInfo
          }
          if (item.contactInfo.contactCategoryId === '04') {
            // ネットワーク技術部門１
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '05') {
            // ネットワーク技術部門２
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '06') {
            // ネットワーク技術部門３
            this.allCostomer.push(item.contactInfo)
          }
          if (item.contactInfo.contactCategoryId === '07') {
            // 設備保守担当
            this.toolCharge = item.contactInfo
          }
        })
      }
    },
    getContractData() {
      // 請求情報 table
      for (
        let i = 0;
        i <
        this.mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData.length;
        i++
      ) {
        let list = []
        const array = this.mcd0101Model.ocnBillingList.billInfoListOcnResNB
          .sysData[i]
        for (let j = 0; j < array.seqStcSynJky.length; j++) {
          list.push(array.seqStcSynJky[j])
        }
        this.contactTableData = list.slice(0)

        this.contactTableData.sort(function(a, b) {
          return Number(b.strSkyYm) - Number(a.strSkyYm)
        })
      }
      this.storageData = this.mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].seqStcSynJky.slice(
        0
      )
      this.storageData.sort(function(a, b) {
        return Number(b.strSkyYm) - Number(a.strSkyYm)
      })
      this.storageInfo = this.storageData[0]
      // 工事情報
      let list = []
      for (
        let j = 0;
        j <
        this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractInfo
          .contractDetailList.length;
        j++
      ) {
        const arr = this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
          .contractInfo.contractDetailList[j]
        list.push(arr.contractDetailInfo)
      }
      this.contractDetailInfo = list
    },
    /**
     * この契約の一覧ページを返します。
     * @param
     * @return
     */
    async toKeiyakuList() {
      let ekimuListSrchRes = await this.getServiceList()
      let ekimuCode = ekimuListSrchRes.ekimuListInfo[0].ekimuCode
      let srvcKindCode = ekimuListSrchRes.ekimuListInfo[0].srvcKindCode
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedComponent = {}
      // 契約番号リンクをクリックする時
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === ekimuCode &&
          item.srvcKindCode === srvcKindCode &&
          item.componentName === '契約一覧'
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
    // 「999-9999」形式。
    iszipFormat(data) {
      if (data && data !== '' && data.length === 7) {
        return data.slice(0, 3) + '-' + data.slice(3)
      } else {
        return '　'
      }
    },
    // 「YYYY/MM/DD」形式。
    YMDFormat(date) {
      if (date && date !== '' && date.length === 8) {
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
    requestYMFormat(date) {
      let n = Number(date)
      if (!isNaN(n)) {
        if (date && date !== '') {
          return moment(date, DATE_CONS.YYYYMM).format(DATE_CONS.YYYY_MM)
        } else {
          return '　'
        }
      } else {
        return date
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
    // 申込基本情報、センタ識別
    centerSee(item) {
      if (
        this.orderDataDis() &&
        item.searchResultDetailInfo.applyInfo.orderInfo.centerTypeName !== '' &&
        item.searchResultDetailInfo.applyInfo.orderInfo.centerTypeCode !== ''
      ) {
        return (
          item.searchResultDetailInfo.applyInfo.orderInfo.centerTypeCode +
          ':' +
          item.searchResultDetailInfo.applyInfo.orderInfo.centerTypeName
        )
      } else if (
        this.mastDataDis() &&
        item.searchResultDetailInfo.applyInfo.contractInfo.centerTypeName !==
          '' &&
        item.searchResultDetailInfo.applyInfo.contractInfo.centerTypeCode !== ''
      ) {
        return (
          item.searchResultDetailInfo.applyInfo.contractInfo.centerTypeCode +
          ':' +
          item.searchResultDetailInfo.applyInfo.contractInfo.centerTypeName
        )
      } else {
        return '　'
      }
    },
    // 廃止側契約番号（切替元回線番号）
    contactNum(item) {
      if (item.searchResultDetailInfo) {
        if (
          item.searchResultDetailInfo.applyInfo.orderInfo
            .terminateContractNumber
        ) {
          return item.searchResultDetailInfo.applyInfo.orderInfo
            .terminateContractNumber
        } else if (
          item.searchResultDetailInfo.applyInfo.contractInfo
            .terminateContractNumber
        ) {
          return item.searchResultDetailInfo.applyInfo.contractInfo
            .terminateContractNumber
        } else {
          return '　'
        }
      } else {
        return '　'
      }
    },
    // 共通顧客ID有無
    hasOrNotCustomer(data) {
      if (data && data !== '') {
        return '有'
      } else {
        return '無'
      }
    },
    // 課金先契約番号
    classContractNum(item) {
      if (this.mcd0101Model.sirius.searchResultDetailList) {
        if (
          this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
            MCD0101CONS.ORDER &&
          item !== ''
        ) {
          // オーダ
          return item.searchResultDetailInfo.applyInfo.orderInfo
            .chargeContractNumber
        } else if (
          this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
            MCD0101CONS.MAST &&
          item !== ''
        ) {
          // マスタ
          return item.searchResultDetailInfo.applyInfo.contractInfo
            .chargeContractNumber
        } else {
          return '　'
        }
      } else {
        return '　'
      }
    },
    // オーダ/マスタ区分の表示
    orderOrMast(data) {
      if (data && data === MCD0101CONS.ORDER) {
        return 'オーダ'
      } else if (data && data === MCD0101CONS.MAST) {
        return 'マスタ'
      } else {
        return '　'
      }
    },
    // オーダ/マスタ区分がオーダの場合、表示する
    orderDataDis() {
      if (
        this.mcd0101Model.sirius &&
        this.mcd0101Model.sirius.searchResultDetailInfo &&
        this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
          MCD0101CONS.ORDER
      ) {
        return true
      } else {
        return false
      }
    },
    // オーダ/マスタ区分がマスタの場合、表示する
    mastDataDis() {
      if (
        this.mcd0101Model.sirius.searchResultDetailInfo &&
        this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
          MCD0101CONS.MAST
      ) {
        return true
      } else {
        return false
      }
    },
    // (情報域)契約者情報、ステータス_契約者
    statusUser(data) {
      if (
        data &&
        this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
          MCD0101CONS.ORDER
      ) {
        if (data === MCD0101CONS.USING) {
          return '利用中'
        } else if (data === MCD0101CONS.ENDUSE) {
          return '廃止済'
        }
      } else {
        return '　'
      }
    },
    // 「HH:MM」形式。
    timeFormat(date) {
      if (date !== '' && date) {
        let forDate = moment(date, DATE_CONS.HHMM).format(DATE_CONS.HH_MM)
        return forDate
      } else {
        return '　'
      }
    },
    /**
     * 端末工事希望年月日
     * (情報域)契約詳細情報、項目ＩＤ_契約詳細が"K0000023"の詳細項目値を表示する。
     * 8桁の場合「YYYY/MM/DD」形式。
     */
    hopeDateNew() {
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList
      let result = ''
      contractDetailList.forEach(el => {
        if (el.contractDetailInfo.itemIdContractDetail === 'K0000023') {
          result = this.YMDFormat(el.contractDetailInfo.detailItemValue)
        }
      })
      if (result) {
        return result
      } else {
        return (result = '　')
      }
    },
    /**
     * 端末工事希望年月日(旧)
     * (情報域)契約詳細情報、項目ＩＤ_契約詳細が"K0000024"の詳細項目値を表示する。
     * 8桁の場合「YYYY/MM/DD」形式。
     */
    hopeDateOld() {
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList
      let result = ''
      contractDetailList.forEach(el => {
        if (el.contractDetailInfo.itemIdContractDetail === 'K0000024') {
          result = this.YMDFormat(el.contractDetailInfo.detailItemValue)
        }
      })
      if (result) {
        return result
      } else {
        return (result = '　')
      }
    },

    // 開通案内再出力要否
    openLeadFlg() {
      let result = null
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList
      contractDetailList.forEach(el => {
        if (
          el.contractDetailInfo.itemIdContractDetail &&
          el.contractDetailInfo.itemIdContractDetail === 'K0000009'
        ) {
          if (el.contractDetailInfo.detailItemValue === '0') {
            result = el.contractDetailInfo.detailItemValue + ':' + '否'
          } else if (el.contractDetailInfo.detailItemValue === '1') {
            result = el.contractDetailInfo.detailItemValue + ':' + '要'
          }
        } else {
          result = '　'
        }
      })
      return result
    },

    dataAllHas(item, el) {
      if (item && el && item !== '' && el !== '') {
        return item + ':' + el
      } else {
        return '　'
      }
    },
    // 契約解除決裁番号
    contractCancel(item) {
      if (this.mcd0101Model.sirius.searchResultDetailList) {
        if (
          this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
            MCD0101CONS.ORDER &&
          item !== ''
        ) {
          // オーダ
          return item.searchResultDetailInfo.applyInfo.orderInfo
            .contractCancelNumber
        } else if (
          this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
            MCD0101CONS.MAST &&
          item !== ''
        ) {
          // マスタ
          return item.searchResultDetailInfo.applyInfo.contractInfo
            .contractCancelNumber
        } else {
          return '　'
        }
      } else {
        return '　'
      }
    },
    // 請求情報変更有無、口座番号非出力表示
    reqChangeHas(data) {
      if (data && data !== '') {
        if (data === '0') {
          return '0:無'
        } else if (data === '1') {
          return '1:有'
        }
      } else {
        return '　'
      }
    },
    /**
     * 支払区分と支払区分名の両方に値がある場合、
     * 「支払区分 + ":" + 支払区分名」形式。それ以外の場合はコロン編集なし。
     */
    payType(item) {
      if (item.searchResultDetailInfo) {
        // 支払区分
        let payType = item.searchResultDetailInfo.applyInfo.orderInfo.chargeType
        // 支払区分名
        let payTypeName =
          item.searchResultDetailInfo.applyInfo.orderInfo.chargeTypeName
        if (payType && payTypeName && payType !== '' && payTypeName !== '') {
          return payType + ':' + payTypeName
        } else {
          return '　'
        }
      } else {
        return '　'
      }
    },
    /**
     * 商品名
     * 商品コードと商品名の両方に値がある場合、「商品コード + ":" + 商品名」形式でラベルで表示する。それ以外の場合はコロン編集なし。
     * 商品名および通番管理配下商品識別に値がある場合、通番を「[#99999]」形式で商品名の後に半角空白で連結して表示する。
     */
    productName(item) {
      // 商品コード
      let productCode = item.productInfo.productCode
      // 商品名
      let productName = item.productInfo.productName
      // 通番管理配下商品識別
      let serialnoSubProductType = item.productInfo.serialnoSubProductType
      // 通番
      let serialno = item.productInfo.serialno
      if (
        productCode &&
        productName &&
        productCode !== '' &&
        productName !== ''
      ) {
        return productCode + ':' + productName
      } else if (
        productName &&
        productName !== '' &&
        serialnoSubProductType &&
        serialnoSubProductType !== ''
      ) {
        return productCode + ':' + productName + ' ' + '[#' + serialno + ']'
      } else {
        return '　'
      }
    },

    // 金額のフォマード
    amountFormat(data) {
      if (data) {
        let amount = parseInt(data)
        return amount.toLocaleString() + '円'
      } else {
        return '　'
      }
    },
    /**
     * 請求情報セグメントのOCN一覧情報[表]
     * 定期一括
     */
    reqDateAll(data) {
      let result = null
      if (this.mcd0101Model.ocnBillingList.billInfoListOcnResNB) {
        this.mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].seqStcSynJky.forEach(
          el => {
            if (
              el.strShrKbn === '地域回収代行' ||
              el.strShrKbn === 'アクセル'
            ) {
              result = '　'
            } else {
              result = data
            }
          }
        )
      } else {
        result = '　'
      }
      return result
    },
    /**
     *
     * 項目「支払区分」の値が「地域回収代行」の場合、空白表示
     * その以外、OCN請求内訳照会応答(KDCM0011)の項目を表示
     */
    sysDataDis(data) {
      let result = null
      if (this.mcd0101Model.ocnBillingList.billInfoListOcnResNB) {
        let sysData = this.mcd0101Model.ocnBillingList.billInfoListOcnResNB
          .sysData
        sysData.forEach(item => {
          item.seqStcSynJky.forEach(el => {
            if (el.strShrKbn === '地域回収代行') {
              result = '　'
            } else {
              result = data
            }
          })
        })
      } else {
        result = '　'
      }

      return result
    },
    /**
     *
     * 項目「支払区分」の値が「地域回収代行」の場合、OCN請求内訳照会応答(KDCM0011)の項目を表示
     * その以外、空白表示
     */
    sysAccelData(data, i) {
      let result = null

      if (this.mcd0101Model.ocnBillingList.billInfoListOcnResNB) {
        let sysData = this.mcd0101Model.ocnBillingList.billInfoListOcnResNB
          .sysData
        sysData.forEach(item => {
          item.seqStcSynJky.forEach(el => {
            if (el.strShrKbn === '地域回収代行') {
              if (i) {
                // OCN回収代行支払期限日
                result = this.YMDFormat(data)
              } else {
                // OCN回収代行課金状況・OCN回収代行課金先番号・定期回送/発行止
                result = data
              }
            } else {
              result = '　'
            }
          })
        })
      } else {
        result = '　'
      }

      return result
    },
    /**
     * 請求情報タブの支払区分
     * 支払区分が「地域回収代行」の場合、「OCN回収代行」に変換して表示する。
     */
    contactPayType(data) {
      if (data && data !== '' && data === '地域回収代行') {
        return 'OCN回収代行'
      } else {
        return '　'
      }
    },
    /**
     * コード番号「01-041」と、
     * 注文種類をキーとして、コード変換テーブル(IDPFINST.IDTDBS0014_00)を参照し、
     * 和名を取得できた場合、「注文種類 + ":" + 和名」形式で表示する。
     */
    async codeChangeReq() {
      let item = this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
        .orderInfo.orderType
      let param = {
        code: '01-041',
        key: item,
        flg: '1'
      }
      let codeName = await getCodeName(param)
      if (item && item !== '') {
        // flg:0 => codeName
        // flg:1 => key:codeName
        this.orderType = codeName.data.NAME
      } else {
        this.orderType = '　'
      }
    },
    // 預金種別
    async amountType() {
      let data = this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
        .orderInfo.depositType
      if (data && data !== '') {
        let param = {
          code: '01-043',
          key: data,
          flg: '1'
        }
        let codeName = await getCodeName(param)
        this.amountTypeV = codeName.data.NAME
      } else {
        this.amountTypeV = '　'
      }
    },
    // 支払情報変更フラグ
    payChangeFlg() {
      let result = null
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList
      contractDetailList.forEach(el => {
        if (
          el.contractDetailInfo.itemIdContractDetail &&
          el.contractDetailInfo.itemIdContractDetail === 'K0000026'
        ) {
          if (el.contractDetailInfo.detailItemValue === '0') {
            result = '無'
          } else if (el.contractDetailInfo.detailItemValue === '1') {
            result = '有'
          }
        } else {
          result = '　'
        }
      })
      return result
    },
    // 処理区分
    async handleType() {
      let list = this.prdctList.slice(0)

      let codeNameList = []
      for (let i = 0; i < list.length; i++) {
        let codeName
        if (list[i].productInfo.processType === '') {
          continue
        } else {
          let param = {
            code: '01-044',
            key: list[i].productInfo.processType,
            flg: '1'
          }

          try {
            LoadingUtil.show()
            codeName = await getCodeName(param)
            codeNameList.push({
              processType: codeName.data.NAME,
              productCode: list[i].productInfo.productCode
            })
          } catch (error) {
            LoadingUtil.hidden()
            this.onComError(OPTION_ID.MCD0101A, error)
            return
          }
          LoadingUtil.hidden()
        }
      }
      this.prdctList.forEach(item => {
        codeNameList.forEach(el => {
          if (item.productInfo.productCode === el.productCode) {
            if (el.processType) {
              item.productInfo.processType = el.processType
            } else {
              let statusContractCustomer = this.mcd0101Model.sirius
                .searchResultDetailInfo.applyInfo.contractCustomerInfo
                .statusContractCustomer
              if (statusContractCustomer === '20') {
                item.productInfo.processType = '04:契約中'
              } else if (statusContractCustomer === '50') {
                item.productInfo.processType = '06:廃止済'
              } else {
                item.productInfo.processType = ''
              }
            }
          }
        })
      })
    },
    // 項目ＩＤ_工事進捗管理詳細が"J0000xxx"の詳細項目値を表示する。
    workDetailID() {
      if (
        this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
          .workProgressmanageList
      ) {
        let workProgressmanageList = this.mcd0101Model.sirius
          .searchResultDetailInfo.applyInfo.workProgressmanageList
        workProgressmanageList.forEach(item => {
          if (item.workProgressmanageInfo.workProgressmanagedetailList) {
            item.workProgressmanageInfo.workProgressmanagedetailList.forEach(
              el => {
                let element = el.workProgressmanagedetailInfo
                // 開廃年月日
                if (element.itemIdWorkProgress === 'J0000301') {
                  this.workDate = element.detailItemValue
                }
                // ネットワーク起算日
                if (element.itemIdWorkProgress === 'J0000302') {
                  this.networkStartDate = element.detailItemValue
                }
                // アクセスライン起算日
                if (element.itemIdWorkProgress === 'J0000303') {
                  this.accellineStartCotDate = element.detailItemValue
                }
                // サーバ工事予定年月日
                if (element.itemIdWorkProgress === 'J0000101') {
                  this.serverWorkDate = element.detailItemValue
                }
                // サーバ工事開始時間
                if (element.itemIdWorkProgress === 'J0000102') {
                  this.serverStartDate = element.detailItemValue
                }
                // サーバ工事終了時間
                if (element.itemIdWorkProgress === 'J0000103') {
                  this.serverEndDate = element.detailItemValue
                }
                // ルータ工事予定年月日
                if (element.itemIdWorkProgress === 'J0000107') {
                  this.rootWorktDate = element.detailItemValue
                }
                // ルータ工事開始時間
                if (element.itemIdWorkProgress === 'J0000108') {
                  this.rootStartDate = element.detailItemValue
                }
                // ルータ工事終了時間
                if (element.itemIdWorkProgress === 'J0000109') {
                  this.rootEndDate = element.detailItemValue
                }
                // アクセスライン工事予定年月日
                if (element.itemIdWorkProgress === 'J0000104') {
                  this.accelLineWorkDate = element.detailItemValue
                }
                // アクセスライン工事開始時間
                if (element.itemIdWorkProgress === 'J0000105') {
                  this.accelLineStartDate = element.detailItemValue
                }
                // アクセスライン工事終了時間
                if (element.itemIdWorkProgress === 'J0000106') {
                  this.accelLineEndDate = element.detailItemValue
                }
                // 工事完了年月日
                if (element.itemIdWorkProgress === 'J0000201') {
                  this.workEndDate = element.detailItemValue
                }
                // 開廃年月日(旧)
                if (element.itemIdWorkProgress === 'J0000301') {
                  this.workDateOld = element.detailItemValue
                }
                // ネットワーク起算日(旧)
                if (element.itemIdWorkProgress === 'J0000302') {
                  this.networkStartDateOld = element.detailItemValue
                }
                // アクセスライン起算日(旧)
                if (element.itemIdWorkProgress === 'J0000303') {
                  this.accellineStartCotDateOld = element.detailItemValue
                }
                // サーバ工事予定年月日(旧)
                if (element.itemIdWorkProgress === 'J0000101') {
                  this.serverWorkDateOld = element.detailItemValue
                }
                // サーバ工事開始時間(旧)
                if (element.itemIdWorkProgress === 'J0000102') {
                  this.serverStartDateOld = element.detailItemValue
                }
                // サーバ工事終了時間(旧)
                if (element.itemIdWorkProgress === 'J0000103') {
                  this.serverEndDateOld = element.detailItemValue
                }
                // ルータ工事予定年月日(旧)
                if (element.itemIdWorkProgress === 'J0000108') {
                  this.rootWorktDateOld = element.detailItemValue
                }
                // ルータ工事開始時間(旧)
                if (element.itemIdWorkProgress === 'J0000108') {
                  this.rootStartDateOld = element.detailItemValue
                }
                // ルータ工事終了時間(旧)
                if (element.itemIdWorkProgress === 'J0000109') {
                  this.rootEndDateOld = element.detailItemValue
                }
                // アクセスライン工事予定年月日(旧)
                if (element.itemIdWorkProgress === 'J0000104') {
                  this.accelLineWorkDateOld = element.detailItemValue
                }
                // アクセスライン工事開始時間(旧)
                if (element.itemIdWorkProgress === 'J0000105') {
                  this.accelLineStartDateOld = element.detailItemValue
                }
                // アクセスライン工事終了時間(旧)
                if (element.itemIdWorkProgress === 'J0000106') {
                  this.accelLineEndDateOld = element.detailItemValue
                }
                // 工事完了年月日(旧)
                if (element.itemIdWorkProgress === 'J0000201') {
                  this.workEndDateOld = element.detailItemValue
                }
              }
            )
          }
        })
      } else {
        this.workDate = ''
        this.networkStartDate = ''
        this.accellineStartCotDate = ''
        this.serverWorkDate = ''
        this.serverStartDate = ''
        this.serverEndDate = ''
        this.rootWorktDate = ''
        this.rootStartDate = ''
        this.rootEndDate = ''
        this.accelLineWorkDate = ''
        this.accelLineStartDate = ''
        this.accelLineEndDate = ''
        this.workEndDate = ''
        this.workDateOld = ''
        this.networkStartDateOld = ''
        this.accellineStartCotDateOld = ''
        this.serverWorkDateOld = ''
        this.serverStartDateOld = ''
        this.serverEndDateOld = ''
        this.rootWorktDateOld = ''
        this.rootStartDateOld = ''
        this.rootEndDateOld = ''
        this.accelLineWorkDateOld = ''
        this.accelLineStartDateOld = ''
        this.accelLineEndDateOld = ''
        this.workEndDateOld = ''
      }
    },
    // 項目ＩＤ_契約詳細が"K0000xxx"の詳細項目値を表示する。
    dataIdDetail() {
      if (this.mcd0101Model.sirius.searchResultDetailInfo) {
        let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
          .applyInfo.contractInfo.contractDetailList
        contractDetailList.forEach(el => {
          // 譲渡・承継区分
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000003') {
            this.ranOrHasType = el.contractDetailInfo.detailItemValue
          }
          // 開通案内出力回数
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000010') {
            this.openOutCount = el.contractDetailInfo.detailItemValue
          }
          // 開案修正記事
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000008') {
            this.openChangeTex = el.contractDetailInfo.detailItemValue
          }
          // お客様ご要望記事欄(支店記事)
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000001') {
            this.otherTex = el.contractDetailInfo.detailItemValue
          }
          // 工事内容
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000019') {
            this.workContent = el.contractDetailInfo.detailItemValue
          }
          //希望日時 年月日
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000015') {
            this.hopeDate = el.contractDetailInfo.detailItemValue
          }
          //希望日時 開始時間帯
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000016') {
            this.hopeStartDate = el.contractDetailInfo.detailItemValue
          }
          // 希望日時 終了時間帯
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000017') {
            this.hopeEndDate = el.contractDetailInfo.detailItemValue
          }
          //故障受付窓口部門
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000021') {
            this.errCompony = el.contractDetailInfo.detailItemValue
          }
          //開通試験実施内容
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000012') {
            this.openTestContent = el.contractDetailInfo.detailItemValue
          }
          //開通記事
          if (el.contractDetailInfo.itemIdContractDetail === 'K0000011') {
            this.openText = el.contractDetailInfo.detailItemValue
          }
        })
      }
    },
    /**
     * 開案修正内容コード
     * コード番号と、項目ＩＤ_契約詳細が"K0000xxx"の詳細項目値をキーとして、
     * 和名を取得できた場合、「詳細項目値 + ":" + 和名」形式で表示する。
     */
    async changeContentsC() {
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList

      let detailItemValue
      contractDetailList.forEach(el => {
        if (el.contractDetailInfo.itemIdContractDetail === 'K0000007') {
          // 開案修正内容コード
          detailItemValue = el.contractDetailInfo.detailItemValue
        }
      })
      if (detailItemValue && detailItemValue !== '') {
        let param = {
          code: '01-045',
          key: detailItemValue,
          flg: '1'
        }
        let codeName = await getCodeName(param)
        this.changeContCode = codeName.data.NAME
      } else {
        this.changeContCode = ''
      }
    },
    // 時間区分
    async timeTypeCode() {
      let contractDetailList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.contractInfo.contractDetailList

      let detailItemValue
      contractDetailList.forEach(el => {
        if (el.contractDetailInfo.itemIdContractDetail === 'K0000018') {
          // 時間区分
          detailItemValue = el.contractDetailInfo.detailItemValue
        }
      })
      if (detailItemValue && detailItemValue !== '') {
        let param = {
          code: '01-046',
          key: detailItemValue,
          flg: '1'
        }
        let codeName = await getCodeName(param)
        this.timeType = codeName.data.NAME
      } else {
        this.timeType = ''
      }
    },
    // 商品名(連結)
    productConnect() {
      let pructName = ''
      if (this.mcd0101Model.sirius.searchResultDetailInfo) {
        let productList = this.mcd0101Model.sirius.searchResultDetailInfo
          .applyInfo.productList
        productList.forEach(item => {
          // 商品識別コードが"SG"または"ST"の商品名を、上階層から順に半角空白で連結して太字で表示する。
          if (
            item.productInfo.productIdentifierCode === 'SG' ||
            item.productInfo.productIdentifierCode === 'ST'
          ) {
            pructName += item.productInfo.productName + ' '
          }
        })
      } else {
        pructName = ''
      }

      return pructName
    },

    /**
     * （情報域）契約商品リストをツリー復元を実施する。
     * @param applyInfo （情報域）申込情報
     * @return 復元後の契約商品リスト
     */
    getProductList(applyInfo) {
      let proList = applyInfo.productList
      if (proList !== null && proList.length > 0) {
        // 処理区分
        let processType = ''
        // オーダの場合
        if (this.orderDataDis()) {
          //---------------------------------------------------------------
          // 1. 画面に優先表示する処理区分を取得する。
          //    「商品識別コード」が"ST"(提供商品)の商品が複数有る場合、
          //    その提供商品の中に「処理区分」="01"(申込)があれば優先する。
          //    "01"が無ければ、最後に返却されたSTの処理区分を優先する。（後勝ち）
          //---------------------------------------------------------------
          //"ST"提供商品の処理区分リスト
          let processTypeList = []

          // 商品最終変更年月日(YYYYMMDD)
          let productLastChangeDate = ''

          // 返却された処理区分の種類を保持するマップ
          let processType = []

          //(情報域)商品リストをループ
          for (let j = 0; j < proList.length; j++) {
            let info = proList[j]
            if ('ST' === info.productInfo.productIdentifierCode) {
              //STの処理区分をリストに格納
              processTypeList.push(info.productInfo.processType)
            }
            // 最新の商品最終変更年月日を取得するためループの中で探してます。
            productLastChangeDate = this.getNewerDate(
              productLastChangeDate,
              info.productInfo.productLastChangeDate
            )

            // 返却された処理区分の種類を保持する。
            processType.push(info.productInfo.processType)
          }

          // "ST"(提供商品)から優先表示する処理区分を取得する。
          processType = this.getProcessTypeFromST(processTypeList)

          // 商品最終変更年月日を設定
          this.mcd0101Model.productLastChangeDate = productLastChangeDate

          // 返却された処理区分の種類を確認して、画面に表示する注釈文言の表示フラグを設定する。
          this.setMessageDisplayFlg(processType)

          //---------------------------------------------------------------
          // 2. 優先表示するSTの処理区分に値がある場合、
          //    その処理区分と一致するカタログ終端情報の有る終端商品を取得してツリーを作成する。
          //---------------------------------------------------------------
          let firstProList = []
          //処理区分に値があれば以下の処理を実行
          if (!'' !== processType) {
            let endChildProList = []
            for (let k = 0; k < proList.length; k++) {
              let info = proList[k]
              if (processType === info.productInfo.processType) {
                if (info.productInfo.catalogEndingInfo !== '') {
                  // 終端商品を格納する。
                  endChildProList.push(info)
                }
              }
            }
            // 終端商品から親に向かって商品情報を並べたリストをfirstProListに格納する。
            this.createProductListOrder(
              proList,
              endChildProList,
              firstProList,
              processType
            )
          }

          //---------------------------------------------------------------
          //3.　優先表示するSTの処理区分に値がある場合、以下の条件で後勝ちマップを作成する。
          //     ・優先表示するSTの処理区分と一致する商品情報を除外する。
          //     ・商品パスと通番が重複している商品情報を除外する。
          //   優先表示するSTの処理区分に値がない場合、以下の条件で後勝ちマップを作成する。
          //     ・商品パスと通番が重複している商品情報を除外する。
          //---------------------------------------------------------------
          //商品情報の返却順を保持する
          let productInfoMapWinner = []
          //処理区分に値があれば
          if (processType !== '') {
            proList.forEach(info1 => {
              if (processType !== info1.productInfo.processType) {
                productInfoMapWinner.push(info1)
              }
            })
          } else {
            proList.forEach(info2 => {
              productInfoMapWinner.push(info2)
            })
          }
          //---------------------------------------------------------------
          //4.　後勝ちマップからツリーを作成する。
          //---------------------------------------------------------------
          //オリジナルの商品情報を削除して変数を再利用する
          proList = JSON.parse(JSON.stringify(productInfoMapWinner))
          let endChildProList2 = []
          proList.forEach(info => {
            if (info.productInfo.getCatalogEndingInfo != '') {
              // 終端商品を格納する。
              endChildProList2.push(info)
            }
          })

          let secondProList = []
          //終端商品から親に向かって商品情報を並べたリストをsecondProListに格納する。
          this.createProductList(proList, endChildProList2, secondProList)

          //---------------------------------------------------------------
          //5. 上記2と4で作成したツリーを結合する。（2のツリーが先頭に来るように結合）
          //---------------------------------------------------------------
          let newProList = [...firstProList, ...secondProList]

          return newProList
        } else {
          // マスタの場合
          let endProList = []

          // 商品最終変更年月日(YYYYMMDD)
          let productLastChangeDate = ''

          // １．　標準照会IF内で、ツリーの終端となる商品を探し出す。
          // IF内項目「カタログ終端情報」の有無を確認し、存在する商品が「終端商品」となる。
          // endProListに　「終端商品」の有る商品情報　が格納される。
          proList.forEach(productInfo => {
            if (productInfo.productInfo.catalogEndingInfo != '') {
              // 終端商品を格納する。
              endProList.push(productInfo)
            }
            // 最新の商品最終変更年月日を取得するためループの中で探してます。
            productLastChangeDate = this.getNewerDate(
              productLastChangeDate,
              productInfo.productInfo.productLastChangeDate
            )
          })

          // 商品最終変更年月日を設定
          this.mcd0101Model.productLastChangeDate = productLastChangeDate

          // ２．　終端商品の「親商品位置ID」を確認し、「商品位置ＩＤ」に一致する値を持つ商品（親商品）を探し出す。
          // ３．　親商品と判明した商品について、同様に「親商品位置ID」を確認し、「商品位置ＩＤ」に一致する値を持つ商品を探し出す。
          // ４．　手順３を、親商品位置IDに「################」が設定されている商品まで繰り返す。
          // ５．　手順１に戻り、再度カタログ終端情報の有無を確認する。
          // 終端商品から親に向かって商品情報を並べたリストをnewListに格納する。
          let newProList = []
          this.createProductList(proList, endProList, newProList)

          return newProList
        }
      }
    },

    /**
     * newListを、以下のようなリストに生成する。
     *
     * <pre>
     * List[
     *  List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・],
     *  List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・],
     *  ・・・,
     * ]
     * </pre>
     */
    createProductList(proList, endProList, newProList) {
      for (let i = 0; i < endProList.length; i++) {
        let list = []
        let child = endProList[i]
        //「終端商品」の有る商品情報を先頭に格納
        list.push(child)
        // 「終端商品」の有る商品情報
        this.addProductToList(proList, list, child)
        newProList.splice(i, 0, list)
      }
    },

    /**
     * 以下のようなリストを生成する。
     *
     * List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・]
     *
     * @param proList （情報域）契約商品リスト
     * @param list
     * @param child
     */
    addProductToList(proList, list, child) {
      //（情報域）契約商品リストをループする
      for (let j = 0; j < proList.length; j++) {
        let parent = proList[j]
        if (
          '02' === child.productInfo.serialnoSubProductType &&
          child.productInfo.serialnoSubProductType
        ) {
          // 通番管理配下商品識別が"02"(通番管理配下商品)の場合、親商品位置IDと通番が一致する商品を親商品とする。
          if (
            child.productInfo.parentProductPositionId ===
              parent.productInfo.productPathId &&
            child.productInfo.serialno === parent.productInfo.serialno
          ) {
            // 親がいたら商品情報をリストに格納する
            list.push(parent)
            // 上で見つけた親の親を探しに再帰的に同じメソッドを呼ぶ
            this.addProductToList(proList, list, parent)
            break
          }
        } else {
          if (
            child.productInfo.parentProductPositionId ===
            parent.productInfo.productPathId
          ) {
            // 親がいたら商品情報をリストに格納する
            list.push(parent)
            // 上で見つけた親の親を探しに再帰的に同じメソッドを呼ぶ
            this.addProductToList(proList, list, parent)
            break
          }
        }
      }
    },

    /**
     * "ST"(提供商品)から優先表示する処理区分を取得する。
     *
     * @param processTypeList
     * @return 処理区分
     */
    getProcessTypeFromST(processTypeList) {
      // 複数の場合
      if (processTypeList.length > 1) {
        // "01"(申込)が有る場合、返却順に関わらず"01"を優先表示する。
        if (processTypeList.includes('01')) {
          return '01'
        } else {
          // 最後に返却された処理区分を優先表示
          return processTypeList[processTypeList.length - 1]
        }
      } else {
        // 1件の場合
        return ''
      }
    },

    /**
     * newListを、以下のようなリストに生成する。<br>
     * 引数の処理区分を優先してツリーを作成する。
     *
     * <pre>
     * List[
     *  List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・],
     *  List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・],
     *  ・・・,
     * ]
     * </pre>
     *
     * @param proList 商品情報リスト
     * @param endChildlist 終端商品リスト
     * @param newList 上記で説明した新しく作るリスト
     * @param processType 処理区分
     */
    createProductListOrder(proList, endChildlist, newList, processType) {
      for (let i = 0; i < endChildlist.length; i++) {
        let list = []
        let child = endChildlist[i]

        //　「終端商品」の有る商品情報を先頭に格納
        list.push(child)
        // 「終端商品」の有る商品情報
        this.addProductToListOrder(proList, list, child, processType)

        newList.splice(i, 0, list)
      }
    },

    /**
     * 以下のようなリストを生成する。
     *
     * List[終端商品 , 親商品1 , 親商品2 , 親商品3 , ・・・]
     *
     * @param proList （情報域）契約商品リスト
     * @param list
     * @param child
     */
    addProductToListOrder(proList, list, child, processType) {
      let parentList = []
      //（情報域）契約商品リストをループする
      proList.forEach(parent => {
        if ('02' === child.productInfo.serialnoSubProductType) {
          // 通番管理配下商品識別が"02"(通番管理配下商品)の場合、親商品位置IDと通番が一致する商品を親商品とする。
          if (
            child.productInfo.parentProductPositionId ===
              parent.productInfo.productPathId &&
            child.productInfo.serialno === parent.productInfo.serialno
          ) {
            // 親がいたら一時親商品リストに格納する
            parentList.push(parent)
          }
        } else {
          if (
            child.productInfo.parentProductPositionId ===
            parent.productInfo.productPathId
          ) {
            // 親がいたら一時親商品リストに格納する
            parentList.push(parent)
          }
        }
      })

      //親の商品情報を発見できたら
      if (parentList.length > 0) {
        let insertFlg = false
        let insertedInfo = null
        for (let i = 0; i < parentList.length; i++) {
          let info = parentList[i]
          //優先度の高い処理区分と同じ商品情報を格納する。
          if (processType === info.productInfo.processType) {
            insertedInfo = JSON.parse(JSON.stringify(info))
            list.push(insertedInfo)
            insertFlg = true
            break
          }
        }
        //上記処理で格納できなかった場合、後勝ちの商品情報を格納する。
        if (!insertFlg) {
          insertedInfo = parentList[parentList.length - 1]
          list.push(insertedInfo)
        }
        // 上で見つけた親の親を探しに再帰的に同じメソッドを呼ぶ
        this.addProductToListOrder(proList, list, insertedInfo, processType)
      } else {
        //親が見つからなかったら処理停止
        return
      }
    },

    /**
     * 日付を比較して、新しい日付を返却する。
     *
     * @param productLastChangeDate
     *            商品最終変更年月日
     * @param productLastChangeDate2
     *            商品最終変更年月日
     * @return
     */
    getNewerDate(productLastChangeDate, productLastChangeDate2) {
      if (productLastChangeDate2 == null) {
        return productLastChangeDate
      }
      if (productLastChangeDate < productLastChangeDate2) {
        productLastChangeDate = productLastChangeDate2
      }
      return productLastChangeDate
    },

    /**
     * "01"(申込)、"02"(変更)、"03"(削除)のいずれかの処理区分が複数ある場合、フラグをtrueに設定する。
     *
     * @param processTypeMap
     */
    setMessageDisplayFlg(processType) {
      let processTypeArray = ['01', '02', '03']
      let processNumber = 0
      for (let pType of processTypeArray) {
        if (processType.includes(pType)) {
          processNumber = processNumber + 1
        }
      }
      if (processNumber >= 2) {
        // 2種類以上の処理区分がある場合、trueを設定
        this.mcd0101Model.messageDisplayFlg = true
      } else {
        this.mcd0101Model.messageDisplayFlg = false
      }
    },

    /**
     * 請求情報のtable下のradioをクリック
     * @param index
     */
    radioClick(data) {
      this.getOcnBillingDetail(data)
    },
    /**
     * 収納情報のtable下のradioをクリック
     * @param index
     */
    storageClick(data) {
      this.storageInfo = data
    },
    /**
     * 共通顧客IDのフォマード
     * @param {String} data 共通顧客ID
     */
    commonIdFormat(data) {
      /**
       * 有効な共通顧客IDが1件取得出来た場合は、「C99-9999-9999」形式で共通顧客IDを表示する。
       * それ以外の場合は、「不明」を表示する。
       */
      if (data && data !== '') {
        let commonCustIdLeft = data.slice(0, 3)
        let commonCustIdMid = data.slice(3, 7)
        let commonCustIdRight = data.slice(7, 11)
        return (
          commonCustIdLeft + '-' + commonCustIdMid + '-' + commonCustIdRight
        )
      } else {
        return '不明'
      }
    },
    /**
     * tableのスタイル
     */
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "border-bottom: 2px solid #c1c1c1;border-right:1px solid #c1c1c1;text-align:center;background:#d8d8d8;border-top:1px solid #c1c1c1;font-family: 'Meiryo UI';font-size: 12px;font-weight: bold;color: #4a4a4a;text-align: center;"
      } else {
        return 'font-size:16px;color:#4a4a4a'
      }
    },
    changeCellStyle(val) {
      if (
        val.row.strBktNum === '' &&
        val.row.strHyjBilId === '' &&
        val.row.strTnyCen === '' &&
        val.row.strTnySyaMei === '' &&
        val.row.strTnySyb === '' &&
        val.row.strTnyYmd === '' &&
        val.row.strKijRan === '' &&
        val.row.strSkyYm !== ''
      ) {
        return 'text-align:left !important;background:#f8f8f8;padding-left: 10px;'
      }
    },
    /**
     * 収納状況一覧[表]金額
     * 項目「支払区分」の値が「地域回収代行」「支払区分」の場合、OCN請求情報一覧応答の項目「請求金額」を表示
     * 項目「支払区分」の値が「アクセル」の場合、空白表示
     */
    strAmount(data) {
      if (data && this.mcd0101Model.ocnBillingList.billInfoListOcnResNB) {
        let sysData = this.mcd0101Model.ocnBillingList.billInfoListOcnResNB
          .sysData
        sysData.forEach(item => {
          item.seqStcSynJky.forEach(el => {
            if (el.strShrKbn === 'アクセル') {
              return '　'
            } else {
              return this.amountFormat(data)
            }
          })
        })
      } else {
        return '　'
      }
    },
    /**
     * 収納状況一覧[表]定期一括
     * 項目「支払区分」の値が「地域回収代行」「アクセル」の場合、空白表示
     * 項目「支払区分」の値が上記以外の場合、OCN請求情報一覧応答の項目「定期分割表示名」を表示
     */
    dateAll(data) {
      if (data.strShrKbn === '地域回収代行' || data.strShrKbn === 'アクセル') {
        return '　'
      } else {
        return data.strTikBktNumHyjMei
      }
    },
    /**
     * 収納状況タブ
     * OCN回収代行支払期限日
     */
    ocnPayDate(data) {
      if (data.strShrKbn === '地域回収代行') {
        return data.strKozNum
      } else {
        return '　'
      }
    },
    /**
     * 契約詳細（法人サービス）収納情報セグメント情報
     * 口座番号
     */
    strKozNum(data) {
      /**
       * 項目「支払区分」の値が「地域回収代行」の場合、空白表示
       * 項目「支払区分」の値が「アクセル」の場合、OCN請求情報一覧応答の項目「口座番号」を表示
       * 項目「支払区分」の値が上記以外の場合、OCN請求情報一覧応答の項目「口座番号」を表示
       */
      if (data.strShrKbn === '地域回収代行') {
        return '　'
      } else {
        return data.strKozNum
      }
    },
    // (情報域)契約商品リストにある複数の商品最終変更年月日のうち、最新日付の値を表示する。
    prodctChgDate(productList) {
      let dateList = []
      productList.forEach(item => {
        dateList.push(item.productInfo.productLastChangeDate)
      })
      let date = Math.max.apply(null, dateList)
      let productDate = moment(date, DATE_CONS.YYYYMMDD).format(
        DATE_CONS.YYYY_MM_DD
      )
      return productDate
    },
    /**
     * 契約者住所
     *
     * 番地等１～３、建物等１～３と様方等の半角数字を全角数字に変換。
     * 住所、番地等１～３、建物等１～３、様方等の両端のスペースをトリムし、全角スペースで連結。
     * ただし、番地等１～３内と建物等１～３内は、両端1文字が数字同士の場合のみ"－"で連結。
     */
    addressDisFor() {
      let addressList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.addressList
      let addrMsg = {}
      addressList.forEach(item => {
        if (item.addressInfo.addressType === 'KYS') {
          // 契約者住所
          addrMsg = item.addressInfo
          let banchi = this.addr(
            addrMsg.banchi1,
            addrMsg.banchi2,
            addrMsg.banchi3
          )
          let buliding = this.addr(
            addrMsg.buliding1,
            addrMsg.buliding2,
            addrMsg.buliding3
          )
          this.kysAddrMsg =
            addrMsg.address + banchi + buliding + addrMsg.samakata
        } else if (item.addressInfo.addressType === 'SKS') {
          // 請求書送付先住所
          addrMsg = item.addressInfo
          let banchi = this.addr(addrMsg.banchi1, '', '')
          let buliding = this.addr(addrMsg.buliding1, '', '')
          this.sksAddrMsg =
            addrMsg.address + banchi + buliding + addrMsg.samakata
        } else if (item.addressInfo.addressType === 'STB') {
          // 設置場所住所
          addrMsg = item.addressInfo
          let banchi = this.addr(
            addrMsg.banchi1,
            addrMsg.banchi2,
            addrMsg.banchi3
          )
          let buliding = this.addr(
            addrMsg.buliding1,
            addrMsg.buliding2,
            addrMsg.buliding3
          )
          this.stbAddrMsg =
            addrMsg.address + banchi + buliding + addrMsg.samakata
        } else if (item.addressInfo.addressType === 'KAS') {
          // 開通案内送付先住所
          addrMsg = item.addressInfo
          let banchi = this.addr(
            addrMsg.banchi1,
            addrMsg.banchi2,
            addrMsg.banchi3
          )
          let buliding = this.addr(
            addrMsg.buliding1,
            addrMsg.buliding2,
            addrMsg.buliding3
          )
          this.kasAddrMsg =
            addrMsg.address + banchi + buliding + addrMsg.samakata
        } else {
          this.kysAddrMsg = '　'
          this.sksAddrMsg = '　'
          this.stbAddrMsg = '　'
          this.kasAddrMsg = '　'
        }
      })
    },
    // アドレスのデータ判定
    addressTypeDis() {
      let addressList = this.mcd0101Model.sirius.searchResultDetailInfo
        .applyInfo.addressList
      addressList.forEach(item => {
        if (item.addressInfo.addressType === 'KAS') {
          // 開通案内送付先住所
          this.kasAddress = item
        } else if (item.addressInfo.addressType === 'KYS') {
          // 契約者住所
          this.kysAddress = item
        } else if (item.addressInfo.addressType === 'SKS') {
          // 請求書送付先住所
          this.sksAddress = item
        } else if (item.addressInfo.addressType === 'STB') {
          // 設置場所住所
          this.stbAddress = item
        } else {
          this.kasAddress = {}
          this.kysAddress = {}
          this.sksAddress = {}
          this.stbAddress = {}
        }
      })
    },
    reqAddrCode(item) {
      let toAddr = this.addr(item.strTdf, item.strSgc, item.strOat)
      let strAcm = this.addr(item.strAcm, '', '')
      let banchi = this.addr(item.strBnc1, item.strBnc2, item.strBnc3)
      let buliding = this.addr(item.strTtm1, item.strTtm2, item.strTtm3)
      return toAddr + strAcm + banchi + buliding + item.strSkt
    },
    codeChangeDis() {
      this.codeChangeReq()
      this.amountType()
      this.changeContentsC()
      this.timeTypeCode()
      this.handleType()
    },

    // 詳細項目値と詳細項目値名称の値が異なる場合、「詳細項目値 + ":" + 詳細項目値名称」形式で表示する。
    prdctDetailDisplay(productDetailInfo) {
      if (productDetailInfo.detailItemValue !== '') {
        if (
          productDetailInfo.detailItemValue !==
          productDetailInfo.detailItemValueName
        ) {
          return (
            productDetailInfo.detailItemValue +
            ':' +
            productDetailInfo.detailItemValueName
          )
        } else {
          return productDetailInfo.detailItemValue
        }
      } else {
        return '　'
      }
    },
    // 販売チャネルコード
    saleChanelCode() {
      if (this.mastDataDis()) {
        // (マスタの場合)(情報域)契約情報・販売チャネルコード
        let salesChannelCode = this.mcd0101Model.sirius.searchResultDetailInfo
          .applyInfo.contractInfo.salesChannelCode
        if (salesChannelCode) {
          return salesChannelCode
        } else {
          return '　'
        }
      } else if (this.orderDataDis()) {
        // (オーダの場合)(情報域)オーダ情報・販売チャネルコード
        let salesChannelCode = this.mcd0101Model.sirius.searchResultDetailInfo
          .applyInfo.orderInfo.salesChannelCode
        if (salesChannelCode) {
          return salesChannelCode
        } else {
          return '　'
        }
      } else {
        return '　'
      }
    },
    getAccelTabelDate() {
      let variousIdListInfo = this.mcd0101Model.accelSoBillingByIds
        .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo
      this.accelTableData = []
      let arrList = []
      variousIdListInfo.forEach(item => {
        arrList.push(item)
        this.accelTableData = arrList.slice(0)
      })
      // ビリングID(ACCEL)一覧・[表]
      let attrData = this.mcd0101Model.accelSoBillingByIds
        .accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].attr
      // 請求群
      this.reqAttr = attrData.substring(6, 8) + '群'
      // 定期分割
      this.attr = attrData.substring(9, 12)
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
    // 請求期別
    requestDate() {
      let soEachDataArea = this.mcd0101Model.accelSoBillingByIds
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
        // YYYY/MM - N回目
        dateArr.forEach(item => {
          let obj = {
            value: item,
            date: item,
            count: '00'
          }
          this.requestDateList.push(obj)
        })
        // 最新の年月日が一番です。
        this.requestDateList.sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
        this.label = this.requestDateList[0].date
      } else {
        this.accelReceiptStatusResNone = false
        if (this.mcd0101Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0101Model.accelReceiptStatusRes
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
     *請求情報のtable下のradioをクリック
     */
    async accelRadioClick(index, data) {
      this.requestDateList = []
      this.billInfoBand = {}
      this.billInfoBand = data
      this.accelRadio = index
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
        if (this.mcd0101Model.accelReceiptStatusRes.recptStatusSrchAccRes) {
          let recptStatusInfo = this.mcd0101Model.accelReceiptStatusRes
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
          this.mcd0101Model.accelBillingDetailByLine = {}
        }
      }
    },
    async accelDate(data) {
      let billClass = this.accelTableData[this.accelRadio].billInfo[0].billClass
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
    // 末尾に「群」を付けて表示。
    ifHasGroup(data) {
      if (data && data !== '') {
        return data + '群'
      } else {
        return '　'
      }
    },
    prdctListDis(prdctList) {
      let list = []
      prdctList.forEach(item => {
        item.forEach(el => {
          list.push(el)
        })
      })
      list.forEach(item => {
        if (item.productInfo.productDetailList) {
          item.productInfo.productDetailList.forEach(el => {
            el.productDetailInfo = Object.assign({}, el.productDetailInfo, {
              setAddZip: '',
              setAddCode: '',
              productSetAddr: ''
            })
          })
        }
      })
      /**
       * 商品詳細
       * 詳細項目値と詳細項目値名称の値が異なる場合、「詳細項目値 + ":" + 詳細項目値名称」形式で表示する。
       */
      this.$nextTick(() => {
        this.prdctList = list
        for (let i = 0; i < this.prdctList.length; i++) {
          let item = this.prdctList[i]
          if (item.productInfo.productDetailList) {
            for (
              let e = 0;
              e < item.productInfo.productDetailList.length;
              e++
            ) {
              let el = item.productInfo.productDetailList[e]
              if (el.productDetailInfo.itemIdProduct === 'S0000107') {
                let addrInfo = {}
                let addressList
                addressList = this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo.addressList.slice()
                for (let k = 0; k < addressList.length; k++) {
                  let addr = addressList[k]
                  if (
                    el.productDetailInfo.detailItemValue ===
                    addr.addressInfo.productPathId
                  ) {
                    addrInfo = addr
                    let addressInfo = addrInfo.addressInfo
                    // 「設置場所郵便番号」、「設置場所住所コード」、「設置場所住所」として商品位置ＩＤ＿設置場所の代わりに表示する。
                    let addrM = this.addressFormat(
                      addressInfo.address,
                      addressInfo.banchi1,
                      addressInfo.banchi2,
                      addressInfo.banchi3,
                      addressInfo.building1,
                      addressInfo.building2,
                      addressInfo.building3,
                      addressInfo.samakata
                    )
                    let addrMsg = addrM
                    el.productDetailInfo.setAddZip = addressInfo.postalNumber
                    el.productDetailInfo.setAddCode = addressInfo.addressCode
                    el.productDetailInfo.productSetAddr = addrMsg
                  } else if (
                    this.mastDataDis() &&
                    (addr.addressInfo.statusAddress === '20' ||
                      addr.addressInfo.statusAddress === '50')
                  ) {
                    addrInfo = addr
                    let addressInfo = addrInfo.addressInfo
                    let addrM = this.addressFormat(
                      addressInfo.address,
                      addressInfo.banchi1,
                      addressInfo.banchi2,
                      addressInfo.banchi3,
                      addressInfo.building1,
                      addressInfo.building2,
                      addressInfo.building3,
                      addressInfo.samakata
                    )
                    let addrMsg = addrM

                    el.productDetailInfo.setAddZip = addressInfo.postalNumber
                    el.productDetailInfo.setAddCode = addressInfo.addressCode
                    el.productDetailInfo.productSetAddr = addrMsg
                  } else if (this.orderDataDis()) {
                    // オーダの場合、ステータス_住所情報が"10"(オーダ中)、無ければ"20"(マスタ)の情報を表示する。
                    if (addr.addressInfo.statusAddress === '10') {
                      addrInfo = addr
                    } else if (addr.addressInfo.statusAddress === '20') {
                      addrInfo = addr
                    }
                    let addressInfo = addrInfo.addressInfo
                    let addrM = this.addressFormat(
                      addressInfo.address,
                      addressInfo.banchi1,
                      addressInfo.banchi2,
                      addressInfo.banchi3,
                      addressInfo.building1,
                      addressInfo.building2,
                      addressInfo.building3,
                      addressInfo.samakata
                    )
                    let addrMsg = addrM

                    el.productDetailInfo.setAddZip = addressInfo.postalNumber
                    el.productDetailInfo.setAddCode = addressInfo.addressCode
                    el.productDetailInfo.productSetAddr = addrMsg
                  }
                }
              }
            }
          }
        }
      })
    },
    /**
     * 役務一覧照会API
     */
    async getServiceList() {
      let ekimuListSrchReq = { ...MCD0101CONS.SERVICE_LIST_PARAM }
      ekimuListSrchReq.contractId = this.maincardName

      let sysMsg = {
        ekimuListSrchReq
      }
      let option = { optionId: OPTION_ID.MCD0101A, traceLog: false }
      let response = null
      try {
        response = await getServiceList(sysMsg, option)
      } catch (error) {
        this.onComError(OPTION_ID.MCD0101A, error)
        return
      }
      return response.data.SysMsgAre.ekimuListSrchRes
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
    }
  }
}
