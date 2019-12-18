/**
 * 基本フレームイベント処理
 * @module /src/views/BaseFrame/baseframe-methods.js
 * @author IBM CIC
 */

import { getUserCustmizeInfo } from '@/api/get-user-custmize-info'
import { getAccelCustomerList } from '@/api/get-accel-customer-list'
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as SearchHistoryUtil from '@/utils/search-history'
import * as BaseFrameConstants from './baseframe-constants'
import * as GlobalConstants from '@/constants/global-constants'
import * as UserInfo from '@/utils/user-info'
import * as COMPONENT_CONSTANTS from '@/constants/component-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as openUrlUtil from '@/utils/open-url-util'
import { getCustomerInfo } from '@/api/get-customer-info'
import { transformToNb } from '@/api/transform-to-nb'
import * as IDPFEvent from '@/constants/idpf-event'
import { nbGenericIf } from '@/api/nb-generic-if'
import moment from 'moment'
import IdpfNoopError from '@/errors/idpf-noop-error'
import { E_WEB1002, IDPF_MESSAGE } from '@/constants/idpf-message.js'
import * as DateConstants from '@/constants/date-constants.js'
import * as LoadingUtil from '@/utils/loading-util'
import { removeToken } from '@/utils/auth'
import { logout } from '@/api/logout'
import Cookies from 'js-cookie'
export default {
  methods: {
    /**
     * 初期化処理<br>
     * ユーザ情報を取得する<br>
     * ユーザカスタマイズ設定を取得する<br>
     * ユーザ名前を設定する<br>
     * @param {String} userId ユーザID
     * @return ユーザ情報(ユーザ名前、ユーザ権限、ユーザカスタマイズ設定)
     */
    initView() {
      // ユーザ名前を設定する
      let userInfo = UserInfo.get()
      this.userName = userInfo.IDD_FMLY_NAME + ' ' + userInfo.IDD_FRST_NAME
      let param = { userId: userInfo.IDD_USER_ID }
      // ユーザ検索権限取得
      this.userAuthority = userInfo.AUTHORITY
      if (this.userAuthority.CUSTOMER === '1') {
        // ユーザカスタマイズ設定、サブカードとツールアイコン
        LoadingUtil.show()
        getUserCustmizeInfo(param)
          .then(response => {
            LoadingUtil.hidden()
            // ユーザカスタマイズ設定取得し、サブカードの表示を設定する
            if (response.data.USER_CUSTMIZE_INFO) {
              let arr = response.data.USER_CUSTMIZE_INFO.subcardinfo
              if (arr) {
                this.subCardList = arr.slice(0)
              }
            } else {
              this.subCardList = [{ ...COMPONENT_CONSTANTS.SUB_CARD_LIST[0] }]
            }

            // storeのデータを同期
            this.$store.dispatch('app/setSubCardList', this.subCardList)
          })
          .catch(error => {
            LoadingUtil.hidden()

            if (error.code === GlobalConstants.ECONNABORTED) {
              throw new IdpfNoopError(E_WEB1002, '-', '-')
            } else {
              throw new IdpfNoopError(
                error.response.data.errorMessage,
                '-',
                error.response.data.errorCode
              )
            }
          })
      } else {
        // 顧客権限を持たないアカウントでログインされた場合は、PW01（汎用ポップアップ）のメッセージにてその旨を伝える。
        const title = '権限エラー'
        const btnTittle = '画面を閉じる'
        const message =
          'ご利用のアカウントには当システムの閲覧権限がありません。権限を持つ別のアカウントでログインするか、システム管理者にお問い合わせください。'
        this.$alert(message, title, {
          confirmButtonText: btnTittle,
          callback: action => {
            logout()
            // 権限の情報をクリア
            removeToken()
            SearchHistoryUtil.removeSimpleSearchHistory()
            SearchHistoryUtil.removeDetailSearchHistory()
            Cookies.remove('idpf-token')
            UserInfo.remove()
            if (
              navigator.userAgent.indexOf('Firefox') !== -1 ||
              navigator.userAgent.indexOf('Chrome') !== -1
            ) {
              window.location.href = 'about:blank'
              window.close()
            } else {
              window.opener = null
              window.open('', '_self')
              window.close()
            }
          }
        })
      }
    },
    /**
     * mainCard画面のレファレンス
     */
    refreshMainCardListView() {
      // mainCard一覧取得
      this.mainCardList = this.$store.getters.mainCardList.slice(0)
      this.$nextTick(() => {
        this.updateTabCardListList()

        // 表示中mainCardエリアの内容を更新
        this.updateActiveCardInfo()
      })
    },
    /**
     * mainCard画面のレファレンス
     */
    refreshSubCardListView() {
      // subCard一覧取得
      this.subCardList = this.$store.getters.subCardList.slice(0)
    },
    /**
     * mainCard画面のレファレンス
     */
    refreshCustomerInfo(contractInfo) {
      this.contractInfo = contractInfo
    },
    /**
     * 検索入力エリアのメッセージ表示
     */
    refreshSearchResultView(result) {
      if (result === GlobalConstants.SEARCH_RESULT_NONE) {
        this.resultTips = true
        this.roleTips = false
        this.inputTips = false
      }
    },
    /**
     * mainCard画面のレファレンス
     */
    updateTabCardListList() {
      this.mainCardList = this.$store.getters.mainCardList.slice(0)

      let activedItem = {}

      if (this.mainCardList.length > GlobalConstants.MAX_TAB_COUNT) {
        for (let i = 0; i < this.mainCardList.length; i++) {
          if (this.mainCardList[i].isActived) {
            activedItem = this.mainCardList[i]
          }
        }
        let cardIndex = this.tabCardList.findIndex(item => {
          return item.name === activedItem.name
        })
        if (cardIndex !== -1) {
          for (let i = 0; i < this.tabCardList.length; i++) {
            this.tabCardList[i].isActived = false
            if (activedItem.name === this.tabCardList[i].name) {
              this.tabCardList[i].isActived = true
            }
          }
        } else {
          this.tabCardList = this.mainCardList.slice(
            0 - GlobalConstants.MAX_TAB_COUNT
          )
        }
        let tabIndex = this.mainCardList.findIndex(item => {
          return item.name === activedItem.name
        })
        this.tabCardIndex = tabIndex
      } else {
        this.tabCardList = this.mainCardList.slice(0)
      }
    },
    /**
     * 表示中カード情報を更新
     */
    updateActiveCardInfo() {
      this.activedCardInfo = {}
      let len = this.mainCardList.length
      for (let index = 0; index < len; index++) {
        const cardInfo = this.mainCardList[index]
        if (cardInfo.isActived) {
          this.activedCardInfo = cardInfo
          break
        }
      }

      if (!this.activedCardInfo.isActived) {
        this.mainCardList = this.$store.getters.mainCardList.slice(0)
        let cardListLength = this.mainCardList.length
        for (let i = 0; i < cardListLength; i++) {
          let item = this.mainCardList[i]
          if (item.name === this.preMainCardName) {
            this.mainCardList[i].isActived = true
          }
        }
        this.activedCardInfo = JSON.parse(JSON.stringify(this.preActivedCard))
      }
    },
    /**
     * メインカードの切り替え
     */
    changeView(selectedCard) {
      // maincard表示
      let card = { ...selectedCard }
      let refreshView = this.updateMaincardList(card)
      if (refreshView) {
        // 画面レファレンス
        this.refreshMainCardListView()
      }
    },
    async onSimpleSearch() {
      let oldSearchValue = this.searchValue
      this.searchValue = this.searchKey
      this.searchType = GlobalConstants.SIMPLE_SEARCH
      this.resultTips = false
      this.detailSearchInfo = {
        searchKey: '',
        searchType: '',
        keyType: ''
      }
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let contractNoneCard = this.$store.getters.contractNoneCard
      if (Object.keys(contractNoneCard).length > 0) {
        let cardIndex = mainCardList.findIndex(item => {
          return item.name === contractNoneCard.name && item.isActived
        })
        let length = mainCardList.length
        if (cardIndex !== -1) {
          this.resultTips = true
          if (cardIndex === length - 1) {
            // 最後の場合
            if (length > 1) {
              this.$set(mainCardList[cardIndex - 1], 'isActived', true)
            }
          } else {
            if (length > 1) {
              this.$set(mainCardList[cardIndex + 1], 'isActived', true)
            }
          }
          mainCardList.splice(cardIndex, 1)
          this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
          this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)

          return
        }
      }

      this.clearErrorMsg()
      // 顧客基本情報取得
      this.keyType = this.checkSearchKeyType(this.searchKey)
      let searchInfo = {
        searchKey: this.searchKey,
        searchType: GlobalConstants.SIMPLE_SEARCH,
        keyType: this.keyType
      }
      this.inputTips = false
      if (this.keyType === GlobalConstants.ERROR_SEARCH) {
        this.inputTips = true
        // 検索入力エラー
        return
      }

      // 権限チェック
      if (
        (this.keyType === GlobalConstants.N_SEARCH ||
          this.keyType === GlobalConstants.H_SEARCH ||
          this.keyType === GlobalConstants.C_SEARCH ||
          this.keyType === GlobalConstants.D_SEARCH) &&
        this.userAuthority.CUSTOMER !== '1'
      ) {
        // 顧客基本情報取得権限なし
        this.roleTips = true
        return
      }

      if (
        this.keyType === GlobalConstants.B_SEARCH &&
        this.userAuthority.BILLING_TEL_OCN !== '1'
      ) {
        // 検索履歴保存
        SearchHistoryUtil.addSimpleSearchHistory(this.searchKey)
        // 料金・電話OCN権限がなったら、この前、画面にメインカードがあるかどうかを判断して
        if (
          ((this.showPW02Flg &&
            !this.customerInfo &&
            this.mainCardList.length > 0) ||
            this.customerInfo ||
            (!this.customerInfo && this.contractInfo.contractCustName) ||
            this.customerInfoError.code) &&
          oldSearchValue !== this.searchKey
        ) {
          let authorityBFlg = '1'
          this.messageBoxPW3(authorityBFlg)
        } else {
          // 初めてB番を検索したら、権限がない場合、直接的にMCD0200を開く
          let param = GlobalConstants.MAIN_CARD_LIST[58]
          param.name = this.searchValue
          this.$nextTick(() => {
            this.changeView(param)
          })
        }

        return
      }

      // 権限あり、検索keyなどの情報を保存する
      this.$store.commit('app/SET_SEARCH_INFO', searchInfo)

      // N番 H番 C番検索の場合
      if (
        this.keyType === GlobalConstants.N_SEARCH ||
        this.keyType === GlobalConstants.H_SEARCH ||
        this.keyType === GlobalConstants.C_SEARCH
      ) {
        // 顧客基本情報取得
        await this.getCustomerInfo(this.searchValue)
      }
      // D番検索の場合
      if (this.keyType === GlobalConstants.D_SEARCH) {
        this.execDSearch()
      }

      if (this.keyType === GlobalConstants.B_SEARCH) {
        // B番検索
        this.doSimpleSearch()
      }
    },
    /**
     * 検索を実行
     */
    async doSimpleSearch(bSearchFlg) {
      this.clearErrorMsg()
      /**
       * 簡易検索の検索キーのチェック
       * N番: 初めの文字が半角Nであること。 続く文字列は数字（0〜9）の半角9文字であること。
       * C番:初めの文字が半角Cであること。 続く文字列は数字（0〜9）の半角10文字であること。
       * B番:初めの文字が半角Bであること。 続く文字列は数字（0〜9）の半角10文字であること。
       * 電番:10〜11桁の数値(0〜9)であること。(ハイフンを許容しない)
       */
      if (this.searchType === GlobalConstants.SIMPLE_SEARCH) {
        // 検索履歴保存
        SearchHistoryUtil.addSimpleSearchHistory(this.searchKey)
      }

      if (
        this.keyType === GlobalConstants.N_SEARCH ||
        this.keyType === GlobalConstants.H_SEARCH
      ) {
        /**
         * N番検索する時、権限判定
         * 「契約_COCN」「契約_BOCN」
         */
        // NB基盤照会(汎用IF)、成功したら
        // コンシューマ向けOCN（MCD0102）へ遷移
        let reqNbGenericRes = null
        reqNbGenericRes = await this.requestNbGeneric()
        if (reqNbGenericRes) {
          this.$nextTick(() => {
            let param = { ...GlobalConstants.MAIN_CARD_LIST[57] }
            param.name = this.searchValue
            // 契約_電話OCN、料金_電話OCNのどちらかの権限を保持
            if (
              this.userAuthority.CONTRACT_TEL_OCN === '1' ||
              this.userAuthority.BILLING_TEL_OCN === '1'
            ) {
              this.changeView(param)
            }
          })
        } else {
          let param = { ...GlobalConstants.MAIN_CARD_LIST[56] }
          param.name = this.searchValue
          this.$nextTick(() => {
            // 契約_電話OCN、料金_電話OCNのどちらかの権限を保持
            if (
              this.userAuthority.CONTRACT_TEL_OCN === '1' ||
              this.userAuthority.BILLING_TEL_OCN === '1'
            ) {
              this.changeView(param)
            }
          })
        }
      } else if (this.keyType === GlobalConstants.B_SEARCH) {
        /**
         * 簡易検索の検索キーがB番の場合
         * MCD0200_ビリング詳細（ACCEL請求）画面が表示される
         */
        if (!bSearchFlg) {
          await this.getDisusedServiceList()
        }
      } else if (this.keyType === GlobalConstants.C_SEARCH) {
        /**
         * C番検索する時、権限判定
         * 「顧客」
         */
        this.$nextTick(() => {
          this.changeView(COMPONENT_CONSTANTS.MAIN_CARD_LIST[0])
        })
      } else if (this.keyType === GlobalConstants.D_SEARCH) {
        /**
         * 簡易検索の検索キーが電番の場合
         * MCD0100_契約詳細（電話）画面が表示される
         */
        let param = COMPONENT_CONSTANTS.MAIN_CARD_LIST[13]
        param.name = this.searchValue

        this.$nextTick(() => {
          // 契約_電話OCN、料金_電話OCNのどちらかの権限を保持
          if (
            this.userAuthority.CONTRACT_TEL_OCN === '1' ||
            this.userAuthority.BILLING_TEL_OCN === '1'
          ) {
            this.changeView(param)
          }
        })
      }
    },
    /**
     * 簡易検索の検索キーがB番の場合
     * PW03_顧客を特定できない情報の閲覧
     */
    messageBoxPW3(endDidEkimuErrFlg) {
      let that = this
      // 検索実施前にインフォメーションエリアに顧客情報が設定されている、または、メインカードが表示されている場合に実施
      const title = '顧客を特定できない情報の閲覧'
      const message =
        '閲覧しようとしているデータは顧客を特定できません。現在開いているカードはすべて閉じられますがよろしいですか？'
      this.$Message.confirm(title, message, function(result) {
        if (result) {
          // インフォメーションエリアの顧客情報をクリアし、開いている全てのカードを閉じる。
          that.customerInfo = null
          that.contractInfo.contractCustName = ''
          that.contractInfo.srvcId = ''
          that.mainCardList = []
          that.tabCardList = []
          that.activedCardInfo = {}
          that.$store.dispatch('app/setMainCardList', that.mainCardList)
          that.$store.dispatch('app/setCustomerInfo', that.customerInfo)
          that.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_INFOMATION_VIEW,
            that.customerInfo,
            that.customerInfoError
          )
          that.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_SUBCARD_VIEW,
            that.customerInfo
          )
          if (endDidEkimuErrFlg) {
            // 画面にもうメインカードがあったら、MCD0200を直接的に開く
            let param = GlobalConstants.MAIN_CARD_LIST[58]
            param.name = that.searchValue
            that.$nextTick(() => {
              that.changeView(param)
            })
          } else {
            // 初めてB番を検索したら、廃止済役務一覧照会を呼び出すこと
            that.getDisusedServiceList()
          }
        }
      })
    },
    /**
     * PW04_顧客情報閲覧の終了
     */
    messageBoxPW4() {
      let that = this
      const title = '顧客情報閲覧の終了'
      const message =
        '顧客の閲覧を終了しようとしています。現在開いているカードはすべて閉じられますがよろしいですか？'
      this.$Message.confirm(title, message, function(result) {
        if (result) {
          if (that.openCustomerInfo) {
            that.openCustomerInfo = false
          } else if (that.detailSearchShow) {
            that.detailSearchShow = false
          }
          that.customerInfo = null
          that.mainCardList = []
          that.tabCardList = []
          that.isCollapse = false
          that.customerInfoError = {
            code: '',
            message: ''
          }
          that.$store.dispatch('app/setMainCardList', that.mainCardList)
          that.$store.dispatch('app/setSubCardList', that.subCardList)
          that.$store.dispatch('app/setCustomerInfo', that.customerInfo)
          that.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_INFOMATION_VIEW,
            that.customerInfo,
            that.customerInfoError
          )
          that.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_SUBCARD_VIEW,
            that.customerInfo
          )
        }
      })
    },
    /**
     * ユーザログアウト
     * ログイン画面に戻る
     */
    doLogout() {
      let that = this
      const title = IDPF_MESSAGE.HA01['06'].title
      const message = IDPF_MESSAGE.HA01['06'].contant
      this.$Message.confirm(title, message, function(result) {
        if (result) {
          that.$store.dispatch('app/clearTimer')
          // ユーザカスタマイズ設定を保存する
          let param = {
            userId: UserInfo.get().IDD_USER_ID,
            custmizeInfo: {
              subcardinfo: that.$store.getters.subCardList,
              toolInfo: ['xxx', 'eeeee']
            }
          }
          that.$store.dispatch('user/logout', param)
        } else {
          document.body.style.overflow = ''
        }
      })
    },
    /**
     * 検索履歴
     * @param {String} queryString
     * @param {String} cb
     */
    querySearch(queryString, cb) {
      const searchHistory = SearchHistoryUtil.getSimpleSearchHistory()
      const newArr = searchHistory.map(item => ({ value: item }))
      const results = queryString
        ? newArr.filter(this.createSearchFilter(queryString))
        : newArr
      cb(results)
    },
    createSearchFilter(queryString) {
      return searchHistory => {
        return (
          searchHistory.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    /**
     * 詳細検索ボタン
     * 詳細検索条件入力画面が表示される
     */
    doDetailSearch() {
      if (this.detailSearchShow === false) {
        window.scrollTo(0, 0)
      }
      this.detailSearchShow = !this.detailSearchShow
      this.searchBarFixed = false
    },
    /**
     * Windowsのスクロールバー
     * headerとnavのエリアが固定
     */
    handleScroll() {
      this.mainCardTop = document.getElementById('main-content-box').offsetTop
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      if (
        this.inputTips === false &&
        this.resultTips === false &&
        this.roleTips === false
      ) {
        var navOffsetTop =
          document.getElementById('scroll-handler').offsetTop < 65
            ? 0
            : document.getElementById('scroll-handler').offsetTop - 65
      } else {
        navOffsetTop =
          document.getElementById('scroll-handler').offsetTop < 75
            ? 0
            : document.getElementById('scroll-handler').offsetTop - 75
      }
      if (scrollTop > navOffsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
      if (scrollTop > 0) {
        this.headerBarFixed = true
      } else {
        this.headerBarFixed = false
      }
      if (scrollTop > 30) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    },
    /**
     * パラメータを取得し
     * フォーカスの位置を判断する
     */
    onSimpleSearchFocus() {
      this.searchType = GlobalConstants.SIMPLE_SEARCH
    },
    /**
     * パラメータを取得し
     * フォーカスの位置を判断する
     */
    onSimpleSearchBlur() {
      this.searchType = GlobalConstants.SIMPLE_SEARCH
    },
    /**
     * MW01_メインカード追加の表示
     * スクロール位置が頂点になる
     */
    showInformation() {
      if (this.isCollapse === false) {
        window.scrollTo(0, 0)
      }
      this.isCollapse = !this.isCollapse
    },
    /**
     * MW01_メインカード追加もダルの表示
     */
    showMW01() {
      this.mw01Visible = true
    },
    /**
     * MW02_サブカード追加・削除もダルの表示
     */
    showMW02() {
      this.mw02Visible = true
    },
    /**
     * クリックされたタグのメインカードを閉じる
     */
    onCloseTag(tag) {
      let cardIndex = -1
      if (tag.isActived) {
        cardIndex = this.mainCardList.findIndex(item => {
          return (
            item.component === tag.component &&
            item.name === tag.name &&
            item.ekimuCode === tag.ekimuCode &&
            item.srvcKindCode === tag.srvcKindCode
          )
        })

        if (cardIndex === -1) {
          return
        }

        let length = this.mainCardList.length
        if (cardIndex === this.mainCardList.length - 1) {
          // 最後の場合
          if (length > 1) {
            this.$set(this.mainCardList[cardIndex - 1], 'isActived', true)
          }
        } else {
          if (length > 1) {
            this.$set(this.mainCardList[cardIndex + 1], 'isActived', true)
          }
        }
        this.mainCardList.splice(cardIndex, 1)
        this.$store.dispatch('app/setMainCardList', this.mainCardList)
      } else {
        cardIndex = this.mainCardList.findIndex(item => {
          return item.component === tag.component
        })

        if (cardIndex === -1) {
          return
        }
        this.mainCardList.splice(cardIndex, 1)
        this.$store.dispatch('app/setMainCardList', this.mainCardList)
      }

      this.updateTabCardListList()

      // 表示中mainCardエリアの内容を更新
      this.updateActiveCardInfo()
    },
    /**
     * カードリストの中でのカード変換
     */
    changeSelectedTagInList(tag) {
      let index = this.tabCardList.findIndex(item => {
        return item.name === tag.name
      })
      for (let i = 0; i < this.mainCardList.length; i++) {
        if (this.mainCardList[i].name === tag.name && index === -1) {
          this.mainCardList[i].isActived = true
          if (i !== 0 && this.mainCardList.length - i >= 6) {
            this.tabCardList = this.mainCardList.slice(i, i + 6)
            this.tabCardIndex = i
          } else if (this.mainCardList.length - i < 6) {
            this.tabCardList = this.mainCardList.slice(-6)
            let tabIndex = this.mainCardList.findIndex(item => {
              return item.name === this.tabCardList[0].name
            })
            this.tabCardIndex = tabIndex
          } else if (i === 0 && this.mainCardList.length >= 6) {
            this.tabCardList = this.mainCardList.slice(0, 6)
            this.tabCardIndex = 0
          } else if (
            i === this.mainCardList.length - 1 &&
            this.mainCardList.length >= 6
          ) {
            this.tabCardList = this.mainCardList.slice(-6)
            let tabIndex = this.mainCardList.findIndex(item => {
              return item.name === this.tabCardList[0].name
            })
            this.tabCardIndex = tabIndex
          }
        } else {
          this.mainCardList[i].isActived = false
        }

        this.updateMaincardList(tag)
      }

      this.popoverVisible = false
      this.$nextTick(() => {
        // 表示中mainCardエリアの内容を更新
        this.updateActiveCardInfo()
      })
    },
    /**
     * サブカードなし
     */
    noSubcard() {
      return this.subCardList && this.subCardList.length === 0
    },
    /**
     * ACCEL候補顧客一覧照会API取得
     */
    async getAccelCustomerList(searchKey) {
      let custSearchReq = {
        ...BaseFrameConstants.ACCEL_CUSTOMER_LIST_PARAM
      }
      // 業務メッセージ域.顧客検索要求.検索区分コード
      custSearchReq.searchTypCode = '1'
      // 業務メッセージ域.顧客検索要求.サービス管理番号
      custSearchReq.custServiceId = searchKey
      custSearchReq.searchDate = moment().format(DateConstants.YYYYMMDD)
      let option = {
        optionId: OPTION_ID.IA01,
        traceLog: true
      }
      let sysMsg = {
        custSearchReq
      }
      let accelCustomerBusinessResponse = null
      this.customerInfoError.code = ''
      this.customerInfoError.message = ''
      try {
        LoadingUtil.show()
        accelCustomerBusinessResponse = await getAccelCustomerList(
          sysMsg,
          option
        )
      } catch (error) {
        LoadingUtil.hidden()

        if (error.response.status === 400 || error.response.status === 500) {
          this.accelCustomerInfo = null
          // 表示中の顧客基本情報画面を更新
          this.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_INFOMATION_VIEW,
            this.customerInfo
          )
          if (
            (this.showPW02Flg || this.customerInfo) &&
            this.mainCardList.length > 0
          ) {
            this.showPW02()
          } else {
            let param = GlobalConstants.MAIN_CARD_LIST[55]
            param.name = this.searchValue
            this.$nextTick(() => {
              this.changeView(param)
            })
          }
        }
        return
      }
      LoadingUtil.hidden()
      let response = accelCustomerBusinessResponse.data
      if (accelCustomerBusinessResponse.status === 200) {
        let sysMsgAre = response.SysMsgAre
        if (sysMsgAre && sysMsgAre.custInfoSrchCorpResIdpfWebNew) {
          // 法人
          this.accelCustomerInfo = sysMsgAre.custInfoSrchCorpResIdpfWebNew
        } else if (sysMsgAre && sysMsgAre.custInfoSrchPersResIdpfWebNew) {
          // 個人
          this.accelCustomerInfo = sysMsgAre.custInfoSrchPersResIdpfWebNew
        } else {
          this.getAccelCustomerFlg = true
          this.accelCustomerInfo = null
        }
        this.$store.commit(
          'app/SET_ACCEL_CUSTOMER_INFO',
          this.accelCustomerInfo
        )

        // 表示中の顧客基本情報画面を更新
        this.$idpfEventBus.$emit(
          IDPFEvent.REFRESH_INFOMATION_VIEW,
          this.customerInfo
        )
      }
    },
    /**
     * 顧客基本情報照会API取得
     */
    async getCustomerInfo(searchKey) {
      if (this.searchType === GlobalConstants.SIMPLE_SEARCH) {
        // 検索履歴保存
        SearchHistoryUtil.addSimpleSearchHistory(this.searchKey)
      }
      let custSearchReq = { ...BaseFrameConstants.CUSTOMER_INFO_PARAM }
      let keyType = ''
      if (searchKey) {
        keyType = this.checkSearchKeyType(searchKey)
      } else {
        keyType = this.checkSearchKeyType(this.searchKey)
      }
      if (
        keyType === GlobalConstants.N_SEARCH ||
        keyType === GlobalConstants.H_SEARCH
      ) {
        custSearchReq.srvcId = searchKey
        custSearchReq.searchTypCode = '4'
      } else if (
        keyType === GlobalConstants.C_SEARCH ||
        keyType === GlobalConstants.B_SEARCH ||
        keyType === GlobalConstants.D_SEARCH
      ) {
        custSearchReq.commonCustId = searchKey
        custSearchReq.searchTypCode = '1'
      } else {
        return
      }

      let option = { optionId: OPTION_ID.IA01, traceLog: true }
      let sysMsg = {
        custSearchReq
      }
      this.customerInfo = this.$store.getters.customerInfo
      let response = null
      this.customerInfoError.code = ''
      this.customerInfoError.message = ''
      try {
        LoadingUtil.show()
        response = await getCustomerInfo(sysMsg, option)
        this.customerInfoError.errorMsg = ''
        this.customerInfoError.errorCode = ''
      } catch (error) {
        LoadingUtil.hidden()
        if (error.code === GlobalConstants.ECONNABORTED) {
          this.customerInfoError.errorMsg = E_WEB1002
          this.customerInfoError.errorCode = '-'
        } else {
          this.customerInfoError.code = error.response.data.errorCode
          this.customerInfoError.message = error.response.data.errorMessage
        }
        if (error.response.status === 400 || error.response.status === 500) {
          // 表示中の顧客基本情報画面を更新
          this.$idpfEventBus.$emit(
            IDPFEvent.REFRESH_INFOMATION_VIEW,
            this.customerInfo,
            this.customerInfoError
          )
          if (
            (this.showPW02Flg || this.customerInfo) &&
            this.mainCardList.length > 0
          ) {
            if (this.keyType !== GlobalConstants.B_SEARCH) {
              this.showPW02()
            } else {
              let customerErrFlg = '1'
              this.messageBoxPW3(customerErrFlg)
            }
          } else {
            if (this.keyType === GlobalConstants.C_SEARCH) {
              this.$nextTick(() => {
                this.changeView(COMPONENT_CONSTANTS.MAIN_CARD_LIST[0])
              })
            } else if (
              this.keyType === GlobalConstants.N_SEARCH ||
              this.keyType === GlobalConstants.H_SEARCH
            ) {
              let param = { ...GlobalConstants.MAIN_CARD_LIST[57] }
              param.name = this.searchValue
              this.$nextTick(() => {
                this.changeView(param)
              })
            } else if (this.keyType === GlobalConstants.D_SEARCH) {
              let param = COMPONENT_CONSTANTS.MAIN_CARD_LIST[55]
              param.name = this.searchValue
              this.$nextTick(() => {
                this.changeView(param)
              })
            } else if (this.keyType === GlobalConstants.B_SEARCH) {
              let param = GlobalConstants.MAIN_CARD_LIST[58]
              param.name = this.searchValue
              this.$nextTick(() => {
                this.changeView(param)
              })
            }
          }

          throw new IdpfNoopError(
            error.response.data.errorMessage,
            OPTION_ID.IA01,
            error.response.data.errorCode
          )
        }
      }
      LoadingUtil.hidden()
      // 検索結果なし、かつC番検索の場合
      if (
        !response.data.SysMsgAre &&
        this.keyType === GlobalConstants.C_SEARCH
      ) {
        this.roleTips = false
        this.resultTips = true
        this.inputTips = false
        return
      }

      // 顧客未設定
      if (!this.customerInfo && this.mainCardList.length <= 0) {
        // 顧客未設定場合、顧客基本情報照会API取得
        if (response.data.SysMsgAre) {
          this.customerInfo = response.data.SysMsgAre.custBasicInfoSrchRes
        } else {
          // 顧客情報なし
          this.customerInfo = null
        }

        // N,H番の場合、結果なし
        if (
          this.keyType === GlobalConstants.N_SEARCH ||
          this.keyType === GlobalConstants.H_SEARCH
        ) {
          if (
            (response.data.ComResHdrAre &&
              response.data.ComResHdrAre.TmlHyjMsgId === 'WScs4001') ||
            response.data.errorCode === 'WScs4003'
          ) {
            // warning情報あり
            this.customerInfo = null
            this.$store.commit('app/SET_CUSTOMER_INFO', this.customerInfo)
          }
        }

        if (this.keyType === GlobalConstants.B_SEARCH) {
          let param = GlobalConstants.MAIN_CARD_LIST[58]
          param.name = this.searchValue
          this.$nextTick(() => {
            this.changeView(param)
          })
        } else {
          this.$nextTick(() => {
            this.doSimpleSearch()
          })
        }
        this.$store.commit('app/SET_CUSTOMER_INFO', this.customerInfo)

        // 表示中のサブカード画面を更新
        this.$idpfEventBus.$emit(
          IDPFEvent.REFRESH_SUBCARD_VIEW,
          this.customerInfo
        )

        // 表示中の顧客基本情報画面を更新
        this.$idpfEventBus.$emit(
          IDPFEvent.REFRESH_INFOMATION_VIEW,
          this.customerInfo
        )
      } else {
        /**
         * インフォメーションエリアに顧客情報がもう設定された場合、
         * インフォメーションエリアに設定されている共通顧客IDと新しい取得された顧客基本情報の共通顧客IDを比較
         */
        let newCommonCustId = null
        let commonCustId = ''
        if (this.customerInfo) {
          commonCustId = this.customerInfo.commonCustId
        }

        if (
          response.status === 200 &&
          response.data.ComResHdrAre &&
          response.data.ComResHdrAre.Imp === 'I'
        ) {
          newCommonCustId =
            response.data.SysMsgAre.custBasicInfoSrchRes.commonCustId
        } else {
          newCommonCustId = null
        }

        if (
          commonCustId !== newCommonCustId &&
          this.keyType !== GlobalConstants.B_SEARCH
        ) {
          this.showPW02(response)
        } else if (
          commonCustId !== newCommonCustId &&
          this.keyType === GlobalConstants.B_SEARCH
        ) {
          this.messageBoxPW3()
        } else if (
          commonCustId === newCommonCustId &&
          this.keyType === GlobalConstants.B_SEARCH
        ) {
          let param = GlobalConstants.MAIN_CARD_LIST[58]
          param.name = this.searchValue
          this.$nextTick(() => {
            this.changeView(param)
          })
        } else {
          let bSearchFlg = '1'
          this.doSimpleSearch(bSearchFlg)
        }
        // 表示中の顧客基本情報画面を更新
        this.$idpfEventBus.$emit(
          IDPFEvent.REFRESH_INFOMATION_VIEW,
          this.customerInfo
        )
      }
    },
    // NB基盤の画面を表示する
    async transformToNb() {
      let option = { optionId: '', traceLog: true }
      let RequestData = { ...BaseFrameConstants.TRANSFORM_TO_NB_PARAM }
      RequestData.screenId = 'NGA0010'

      let transformToNbResponse = null
      try {
        LoadingUtil.show()
        transformToNbResponse = await transformToNb(RequestData, option)
      } catch (error) {
        LoadingUtil.hidden()
        this.onComError('', error)
        return
      }

      LoadingUtil.hidden()
      let urlReq = []
      urlReq.url = transformToNbResponse.data.uri
      urlReq.data = transformToNbResponse.data.parameters
      openUrlUtil.openUrl(urlReq)
    },
    /**
     * 顧客切替ダイアログ表示
     *
     */
    showPW02(response) {
      let that = this
      // 共通顧客IDが一致しない場合、PW02_顧客情報リセットメッセージ(顧客切替時)を表示する。
      this.$Message.confirm(
        BaseFrameConstants.TITLE_PW2,
        BaseFrameConstants.MESSAGE_PW2,
        function(result) {
          if (result) {
            that.contractInfo.contractCustName = ''
            that.contractInfo.srvcId = ''
            // 顧客切替確認
            if (
              response &&
              response.status === 200 &&
              response.data.ComResHdrAre &&
              response.data.ComResHdrAre.Imp === 'I'
            ) {
              that.customerInfo = response.data.SysMsgAre.custBasicInfoSrchRes
            } else {
              // 顧客情報なし
              that.customerInfo = null
            }
            that.$store.commit('app/SET_CUSTOMER_INFO', that.customerInfo)
            that.mainCardList = []
            that.$store.dispatch('app/setMainCardList', that.mainCardList)

            // baseframe画面をリフレッシュ
            that.updateTabCardListList()

            // 表示中mainCardエリアの内容を更新
            that.updateActiveCardInfo()
            // 表示中のサブカード画面を更新
            that.$idpfEventBus.$emit(
              IDPFEvent.REFRESH_SUBCARD_VIEW,
              that.customerInfo
            )

            // 表示中の顧客基本情報画面を更新
            that.$idpfEventBus.$emit(
              IDPFEvent.REFRESH_INFOMATION_VIEW,
              that.customerInfo
            )
            that.$nextTick(() => {
              that.doSimpleSearch()
            })
          }
        }
      )
    },
    /**
     * nbGeneric API
     *
     */
    async requestNbGeneric(params) {
      let nbGenericParam = { ...BaseFrameConstants.NB_GENERIC_PARAM }

      nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
        DateConstants.YYYYMMDDHHmmss
      )
      nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.searchValue

      let option = { optionId: '-', traceLog: false }
      let res
      try {
        LoadingUtil.show()
        res = await nbGenericIf(nbGenericParam, option)
        LoadingUtil.hidden()
      } catch (error) {
        LoadingUtil.hidden()
        this.$store.commit('app/SET_CONTRACT_INFO_SRCH_RES_NB', null)
        return null
      }
      LoadingUtil.hidden()
      if (
        res.status === 200 &&
        res.data.ComResHdrAre &&
        res.data.ComResHdrAre.Imp === 'I'
      ) {
        this.$store.commit(
          'app/SET_CONTRACT_INFO_SRCH_RES_NB',
          res.data.SysMsgAre.contractInfoSrchResNB
        )
        return res.data.SysMsgAre.contractInfoSrchResNB
      } else {
        this.$store.commit('app/SET_CONTRACT_INFO_SRCH_RES_NB', null)
        return null
      }
    },
    /**
     * D番の検索を実施
     *
     */
    async execDSearch() {
      if (this.userAuthority.CUSTOMER === '1') {
        this.getAccelCustomerFlg = false
        // 検索履歴保存
        SearchHistoryUtil.addSimpleSearchHistory(this.searchKey)
        // ACCEL候補顧客一覧照会API取得
        await this.getAccelCustomerList(this.searchValue)
        if (this.accelCustomerInfo) {
          let commonCustId = this.accelCustomerInfo.basicInfo[0].commonCustId

          if (commonCustId) {
            // 共通顧客IDあり、共通顧客IDより顧客基本情報情報取得
            // 顧客基本情報取得
            await this.getCustomerInfo(commonCustId)
          } else {
            // 共通顧客IDなし、該当なし
            if (
              (this.customerInfo || this.showPW02Flg) &&
              this.mainCardList.length > 0
            ) {
              this.showPW02()
            } else {
              this.doSimpleSearch()
            }
          }
        } else if (this.getAccelCustomerFlg) {
          // ACCEL候補顧客一覧照会は200 Wの場合
          if (this.mainCardList.length <= 0) {
            this.doSimpleSearch()
          } else {
            // 共通顧客IDがなったら、該当なしのように表示する。
            this.showPW02()
          }
        }
      }
    },
    /**
     * エラー情報をクリア
     *
     */
    async onDetailSearch(searchInfo) {
      this.searchType = GlobalConstants.DETAIL_SEARCH
      this.searchValue = searchInfo.searchKey
      this.keyType = searchInfo.keyType
      this.detailSearchInfo = { ...searchInfo }

      this.clearErrorMsg()
      // N番 H番 C番検索の場合
      if (
        this.keyType === GlobalConstants.N_SEARCH ||
        this.keyType === GlobalConstants.H_SEARCH ||
        this.keyType === GlobalConstants.C_SEARCH
      ) {
        // 顧客基本情報取得
        await this.getCustomerInfo(this.searchValue)
      }
      // D番検索の場合
      if (this.keyType === GlobalConstants.D_SEARCH) {
        this.execDSearch()
      }

      if (this.keyType === GlobalConstants.B_SEARCH) {
        // B番検索
        this.doSimpleSearch()
      }
    },
    /**
     * エラー情報をクリア
     *
     */
    clearErrorMsg() {
      this.isError = false
      this.roleTips = false
      this.resultTips = false
      this.inputTips = false

      this.customerInfoError = {
        code: '',
        message: ''
      }
    },
    onMoveTag() {
      let oldMain = this.mainCardList
      let bigenSize = 0
      for (let i = 0; i < oldMain.length; i++) {
        let sizeFlag = false
        for (let j = 0; j < this.tabCardList.length; j++) {
          if (oldMain[i].name === this.tabCardList[j].name) {
            bigenSize = i
            sizeFlag = true
            break
          }
        }
        if (sizeFlag) {
          break
        }
      }

      for (let j = 0; j < this.tabCardList.length; j++) {
        oldMain[bigenSize] = this.tabCardList[j]
        bigenSize++
      }
      this.mainCardList = oldMain

      this.$store.commit('app/SET_MAINCARD_LIST', this.mainCardList)
    },
    toPageTop() {
      const currentY =
        document.documentElement.scrollTop || document.body.scrollTop
      this.scrollAnimation(currentY, 0)
    },
    scrollAnimation(currentY, targetY) {
      // 移動の距離を計算する
      let needScrollTop = targetY - currentY
      let curY = currentY
      setTimeout(() => {
        // スクロール毎回の距離
        const dist = Math.ceil(needScrollTop / 10)
        curY += dist
        window.scrollTo(curY, currentY)
        // 移動の距離が小さい過ぎる時、アニメーションがない
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(curY, targetY)
        } else {
          window.scrollTo(curY, targetY)
        }
      }, 1)
    },
    onMoveSubcard() {
      this.$store.commit('app/SET_SUBCARD_LIST', this.subCardList)
    },
    // 廃止済役務一覧照会API取得
    async getDisusedServiceList() {
      /**
       * 廃止済役務一覧照会API取得
       * @param {String} billingId ビリングID
       * @param {String} srchObjectDate 照会対象年月日
       */
      let endDidEkimuListSrchReq = {
        ...BaseFrameConstants.DISUSED_SERVICE_LIST
      }
      endDidEkimuListSrchReq.billingId = this.searchValue
      endDidEkimuListSrchReq.srchObjectDate = moment().format(
        DateConstants.YYYYMMDD
      )
      let sysMsg = {
        endDidEkimuListSrchReq
      }
      let option = { optionId: '-', traceLog: false }
      let response
      try {
        LoadingUtil.show()
        response = await getDisusedServiceList(sysMsg, option)
      } catch (error) {
        LoadingUtil.hidden()
        if (error.response.status === 400 || error.response.status === 500) {
          let endDidEkimuErrFlg = '1'
          if (
            (this.mainCardList.length <= 0 || !this.customerInfo) &&
            !this.showPW02Flg
          ) {
            let param = GlobalConstants.MAIN_CARD_LIST[58]
            param.name = this.searchValue
            this.$nextTick(() => {
              this.changeView(param)
            })
          } else {
            this.messageBoxPW3(endDidEkimuErrFlg)
          }
        }

        throw new IdpfNoopError(
          error.response.data.errorMessage,
          OPTION_ID.IA01,
          error.response.data.errorCode
        )
      }
      LoadingUtil.hidden()
      if (
        response.status === 200 &&
        response.data.ComResHdrAre &&
        response.data.ComResHdrAre.Imp === 'I'
      ) {
        let commonCustId =
          response.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo[0].commonCustId
        this.getCustomerInfo(commonCustId)
      } else {
        let param = GlobalConstants.MAIN_CARD_LIST[58]
        param.name = this.searchValue
        this.$nextTick(() => {
          this.changeView(param)
        })
      }
    }
  }
}
