/**
 * mcl0400の処理方法のミックスイン
 * @module src\views\BaseFrame\Layout\MCL04\mixin\mcl04-mixin.js
 * @author IBM CIC
 */
import { getDisusedCustomerDirectory } from '@/api/get-disused-customer-directory'
import { getCustomerDirectory } from '@/api/get-customer-directory'
import MCL04Model from '../mcl04-model'
import * as MCL04CONS from '../mcl04-constants'
import * as GlobalConstants from '@/constants/global-constants'
import * as CARDIDLIST from '@/constants/card-id-constants'
import * as changeWidth from '@/utils/change-width'
import * as UserInfo from '@/utils/user-info'
import MW05 from '@/views/popups/MW05/MW05'
import * as IDPFEvent from '@/constants/idpf-event'
import * as DATE_CONS from '@/constants/date-constants'
import * as LoadingUtil from '@/utils/loading-util'
import moment from 'moment'

export default {
  data() {
    return {
      pageID: '',
      mw05Visible: false,
      nowDate: null,
      mcl04Model: {},
      userAuthority: {},
      mainCardList: {},
      listSetNum: MCL04CONS.LIST_SET_NUM, //  画面に表示件数設定
      openNewCard: MCL04CONS.OPEN_NEW_CARD,
      openNewCardWin: MCL04CONS.OPEN_NEW_CARD_WIN,
      mw05InputData: 100,
      hasAuthority: false
    }
  },
  components: {
    MW05
  },
  created() {
    this.mcl04Model = new MCL04Model()
    this.mainCardList = this.$store.getters.mainCardList.slice(0)
    // 画面を初期化する
    this.initView()
    let searchInfo = this.$store.getters.searchInfo
    if (searchInfo.searchKey && searchInfo.searchKey.alternateValue === 5) {
      this.nowDate = searchInfo.searchKey.alternateInputValue
    } else {
      this.nowDate = moment().format(DATE_CONS.YYYYMMDD)
    }
  },
  watch: {
    srvcKindCode: {
      handler() {
        this.initView()
        this.mainCardList = this.$store.getters.mainCardList.slice(0)
      }
    }
  },
  computed: {
    dataDis() {
      return this.errorCode === ''
    }
  },
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      // 顧客基本情報取得
      this.customerInfo = this.$store.getters.customerInfo
      // viewDataがあるかを判断
      let card = this.getCurrentCard()
      if (card.viewData) {
        this.cardId = JSON.parse(JSON.stringify(card.viewData.cardId))
        this.currPage = JSON.parse(JSON.stringify(card.viewData.currPage))
        this.customerInfo = JSON.parse(
          JSON.stringify(card.viewData.customerInfo)
        )
        this.dataList = JSON.parse(JSON.stringify(card.viewData.dataList))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.pageID = JSON.parse(JSON.stringify(card.viewData.pageID))
        this.endPage = JSON.parse(JSON.stringify(card.viewData.endPage))
        this.userAuthority = JSON.parse(
          JSON.stringify(card.viewData.userAuthority)
        )
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        this.mw05InputData = JSON.parse(
          JSON.stringify(card.viewData.mw05InputData)
        )
        this.listSetNum = JSON.parse(JSON.stringify(card.viewData.listSetNum))
        this.mcl04Model = JSON.parse(JSON.stringify(card.viewData.mcl04Model))
        this.nowDate = JSON.parse(JSON.stringify(card.viewData.nowDate))
        this.hasAuthority = JSON.parse(
          JSON.stringify(card.viewData.hasAuthority)
        )
        return
      }

      // ユーザ権限取得
      let userInfo = UserInfo.get()
      this.userAuthority = userInfo.AUTHORITY
      if (
        this.userAuthority.CONTRACT_TEL_OCN === '0' &&
        this.userAuthority.BILLING_TEL_OCN === '0'
      ) {
        this.hasAuthority = false
      } else {
        this.hasAuthority = true
      }

      if (this.customerInfo.commonCustId) {
        this.getDisusedCustomerDirectory()
      }
    },
    /**
     * 廃止済顧客ディレクトリ照会API取得
     */
    async getDisusedCustomerDirectory(condition) {
      const tabsList = document.getElementsByClassName('tagsDiv')
      /**
       * 廃止済顧客ディレクトリ照会API取得
       */
      let endDidCustDirSrchReq = Object.assign(
        {},
        MCL04CONS.END_DID_CUST_DIR_SRCH_REQ
      )
      /**
       * サービスを指定する（法人サービスなどサービス種類コードを持つ役務）場合、
       * パラメータは共通顧客ID、役務コード、サービス種類コード、照会対象年月日<br>
       *
       * 役務を指定する（電話などサービス種類コードを持たない役務）場合、
       * パラメータは共通顧客ID、役務コード、照会対象年月日<br>
       */
      if (this.ekimuCode !== '  ' && this.srvcKindCode !== '  ') {
        endDidCustDirSrchReq.ekimuListInfo[0].srvcKindCode = this.srvcKindCode
      } else {
        endDidCustDirSrchReq.ekimuListInfo[0].srvcKindCode = '  '
      }
      // 廃止済顧客ディレクトリ照会.業務メッセージ域.照会対象年月日・システム日付
      let date = moment().format(DATE_CONS.YYYYMMDD)
      endDidCustDirSrchReq.srchObjectDate = date
      // 廃止済顧客ディレクトリ照会.業務メッセージ域.役務一覧情報.役務コード
      endDidCustDirSrchReq.ekimuListInfo[0].ekimuCode = this.ekimuCode
      // 廃止済顧客ディレクトリ照会.業務メッセージ域.役務一覧情報.共通顧客ID
      endDidCustDirSrchReq.ekimuListInfo[0].commonCustId = this.customerInfo.commonCustId
      let option = { optionId: this.pageID, traceLog: false }
      let sysMsg = {
        endDidCustDirSrchReq
      }
      let response = null
      try {
        LoadingUtil.show()
        response = await getDisusedCustomerDirectory(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(this.pageID, error)
        return
      }
      LoadingUtil.hidden()
      if (response.data.SysMsgAre) {
        if (!condition) {
          // 指定ない
          this.dataList =
            response.data.SysMsgAre.custDirSrchRes.contractIdListInfo
        } else {
          // 無効の場合
          let endUseList = []
          let custDirSrchList = response.data.SysMsgAre.custDirSrchRes

          for (let i = 0; i < custDirSrchList.contractIdListInfo.length; i++) {
            let item = custDirSrchList.contractIdListInfo[i]
            if (
              item.contractEndDate !== '99999999' &&
              item.contractEndDate !== '' &&
              item.contractEndDate
            ) {
              // 契約終了年月日
              let contractEndDate = moment(
                item.contractEndDate,
                DATE_CONS.YYYYMMDD
              ).format(DATE_CONS.YYYYMMDD)
              if (this.nowDate > contractEndDate) {
                endUseList.push(item)
              }
            }
          }
          this.dataList = endUseList.slice(0)
        }
        changeWidth.changeTagsWidth(tabsList, this.mainCardList)
      }
    },
    async getCustomerDirectory() {
      /**
       * 顧客ディレクトリ照会API取得
       */
      let custDirSrchReq = { ...MCL04CONS.CUST_DIR_SRCH_REQ }
      /**
       * サービスを指定する（法人サービスなどサービス種類コードを持つ役務）場合、
       * パラメータは共通顧客ID、役務コード、サービス種類コード、照会対象年月日<br>
       *
       * 役務を指定する（電話などサービス種類コードを持たない役務）場合、
       * パラメータは共通顧客ID、役務コード、照会対象年月日<br>
       */
      if (this.ekimuCode !== '  ' && this.srvcKindCode !== '  ') {
        custDirSrchReq.ekimuListInfo[0].srvcKindCode = this.srvcKindCode
      }
      // 顧客ディレクトリ照会.業務メッセージ域.役務一覧情報.役務コード
      custDirSrchReq.ekimuListInfo[0].ekimuCode = this.ekimuCode
      // 顧客ディレクトリ照会.業務メッセージ域.照会対象年月日・システム日付
      custDirSrchReq.srchObjectDate = this.nowDate
      // 顧客ディレクトリ照会.業務メッセージ域.役務一覧情報.共通顧客ID
      custDirSrchReq.ekimuListInfo[0].commonCustId = this.customerInfo.commonCustId
      let option = { optionId: this.pageID, traceLog: false }
      let sysMsg = {
        custDirSrchReq
      }
      let response = null

      try {
        LoadingUtil.show()
        response = await getCustomerDirectory(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError(this.pageID, error)
        return
      }
      LoadingUtil.hidden()
      if (response.data.SysMsgAre) {
        // 顧客ディレクトリ情報あり
        // 絞り込み（有効）の場合、改めて請求して、画面を更新する
        this.dataList = []
        let usingList = []
        let custDirSrchList = response.data.SysMsgAre.custDirSrchRes
        for (let i = 0; i < custDirSrchList.contractIdListInfo.length; i++) {
          let item = custDirSrchList.contractIdListInfo[i]
          // 契約開始年月日
          let contractStrtDate = moment(item.contractStrtDate).format(
            DATE_CONS.YYYY_MM_DD
          )
          // 契約終了年月日
          if (
            item.contractEndDate === '99999999' ||
            item.contractEndDate === '' ||
            !item.contractEndDate
          ) {
            usingList.push(item)
          } else {
            let contractEndDate = moment(item.contractEndDate).format(
              DATE_CONS.YYYY_MM_DD
            )
            if (
              this.nowDate <= contractEndDate &&
              this.nowDate > contractStrtDate
            ) {
              usingList.push(item)
            }
          }
        }
        this.dataList = usingList.slice(0)
      } else {
        // 顧客ディレクトリ情報なし
        this.dataList = []
      }
    },
    /**
     *   一覧絞り込みのフレーム展開
     */
    mainCardManage() {
      this.mw05Visible = true
    },
    // 画面の絞り込み条件
    handleFilter(condition) {
      this.mw05InputData = condition[0].id
      if (condition[0].id === 1) {
        // 廃止済顧客ディレクトリ照会API
        this.getDisusedCustomerDirectory(condition)
      } else if (condition[0].id === 0) {
        // 顧客ディレクトリ照会API
        this.getCustomerDirectory()
      } else if (condition[0].id === 100) {
        this.getDisusedCustomerDirectory(!condition)
      }
    },
    /**
     *  契約詳細を開く
     */
    onToContractInfor(contractIdInfo, openCardFlag) {
      let searchInfo = {
        keyType: '',
        searchKey: contractIdInfo.contractId,
        searchType: GlobalConstants.NUM_LIST_SEARCH
      }
      this.$store.commit('app/SET_SEARCH_INFO', searchInfo)
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      this.mainCardList = this.$store.getters.mainCardList.slice(0)
      if (openCardFlag === MCL04CONS.OPEN_NEW_CARD) {
        let selectedComponent = {}
        // 契約番号リンクをクリックする時
        let cardIndex = componentList.findIndex(item => {
          return (
            item.ekimuCode === contractIdInfo.ekimuCode &&
            item.componentName === MCL04CONS.CONTRACT_INFO
          )
        })
        if (cardIndex !== -1) {
          selectedComponent = { ...componentList[cardIndex] }
          selectedComponent.isActived = true
          // 050'、'070'、'080'、'090'で始まる11桁の電話番号
          let telNoTest = /^0[5|7|8|9][0]\d{8}$/
          let telNo = contractIdInfo.contractId
          if (telNoTest.test(telNo)) {
            // 先頭'0'を除去した10桁を設定する。
            telNo = telNo.slice(1)
          }
          selectedComponent.name = telNo
        } else {
          return
        }
        this.moveTo(selectedComponent)
      } else if (openCardFlag === MCL04CONS.OPEN_NEW_CARD_WIN) {
        // 契約番号後のアイコンをクリックする時
        let selectedCom = {}
        let cardIndex = componentList.findIndex(item => {
          return (
            item.ekimuCode === contractIdInfo.ekimuCode &&
            item.componentName === MCL04CONS.CONTRACT_INFO
          )
        })
        if (cardIndex !== -1) {
          selectedCom = { ...componentList[cardIndex] }
          selectedCom.name = contractIdInfo.contractId
        } else {
          return
        }
        let refreshView = this.updateMaincardList(selectedCom)
        if (refreshView) {
          // 画面レファレンス
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
        }
      }
    },
    /**
     *  役務一覧やサービス別契約件数一覧の画面に遷移する
     */
    onBackList() {
      // カードが本画面で役務一覧画面に変換する
      let cardLength = this.mainCardList.length
      let selectedComponent = {}
      for (let i = 0; i < cardLength; i++) {
        let el = this.mainCardList[i]
        if (el.isActived) {
          selectedComponent = {
            isActived: true,
            name: MCL04CONS.EKIMU_LIST,
            componentName: MCL04CONS.EKIMU_LIST,
            component: CARDIDLIST.MCL0200,
            ekimuCode: '',
            srvcKindCode: '  '
          }
        }
      }
      this.moveTo(selectedComponent)
    },
    onBackSrvcList() {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedComponent = {}
      this.mainCardList.forEach(item => {
        if (item.isActived) {
          this.ekimuCode = item.ekimuCode
          this.srvcKindCode = item.srvcKindCode
        }
      })
      let cardIndex = componentList.findIndex(item => {
        return item.ekimuCode === this.ekimuCode
      })
      if (cardIndex !== -1 && this.srvcKindCode !== '  ') {
        selectedComponent = { ...componentList[cardIndex] }
        selectedComponent.isActived = true
      } else {
        selectedComponent = {
          isActived: true,
          name: MCL04CONS.EKIMU_LIST,
          componentName: MCL04CONS.EKIMU_LIST,
          component: CARDIDLIST.MCL0200,
          ekimuCode: '',
          srvcKindCode: '  '
        }
      }
      this.moveTo(selectedComponent)
    },
    // タイブルの行のスタイル
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "font-family: 'Meiryo UI';font-weight:blod;font-size: 14px;color: #4A4A4A;letter-spacing: 0;line-height: 18px;padding:0px;padding-bottom:10px;"
      } else {
        return ''
      }
    },
    // タイブルの列のスタイル
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "font-family: 'Meiryo UI';font-size: 16px;color: #00438B;letter-spacing: 0;line-height: 20px;padding:0px;border-bottom:0px;padding-bottom:10px;"
      } else if (columnIndex === 1 || columnIndex === 2) {
        return "font-family: 'Meiryo UI';font-size: 16px;color: #4A4A4A;letter-spacing: 0;line-height: 20px;padding:0px;border-bottom:0px;padding-bottom:10px;"
      }
    },
    YMDFormat(date) {
      if (date && date !== '99999999') {
        return moment(date, DATE_CONS.YYYYMMDD).format(DATE_CONS.YYYY_MM_DD)
      } else if (date === '99999999' || date === '' || !date) {
        return '契約中'
      }
    }
  }
}
