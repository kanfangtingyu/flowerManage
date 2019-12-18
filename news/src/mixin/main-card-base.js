import * as IDPFEvent from '@/constants/idpf-event'

export default {
  name: 'MainCardBase',
  data() {
    return {
      cardId: '',
      optionId: '',
      customerInfo: null,
      dataList: [], // サーバから取得した全てデータ
      // ページ管理
      value: 10, // 表示件数毎ページ
      startPage: 0,
      endPage: 10,
      currPage: 1,
      pageSize: 10,
      // マインカードの1ページに、表示する件数
      optionList: [
        {
          value: 10
        },
        {
          value: 20
        },
        {
          value: 30
        },
        {
          value: 40
        },
        {
          value: 50
        }
      ]
    }
  },
  props: {
    maincardName: {
      type: String
    },
    maincardType: {
      type: String
    },
    ekimuCode: {
      type: String
    },
    srvcKindCode: {
      type: String
    }
  },
  created() {
    this.customerInfo = this.$store.getters.customerInfo
  },
  computed: {
    pageCntArea() {
      let dataLength = this.dataList.length
      if (dataLength === 0) {
        return '0-0/0件'
      } else {
        if (this.currPage * this.pageSize > dataLength) {
          return (
            (this.currPage - 1) * this.pageSize +
            1 +
            '-' +
            dataLength +
            '/' +
            dataLength +
            '件'
          )
        } else {
          return (
            (this.currPage - 1) * this.pageSize +
            1 +
            '-' +
            this.currPage * this.pageSize +
            '/' +
            dataLength +
            '件'
          )
        }
      }
    },
    //  顧客基本情報設定されるか
    isCutomInfoSet() {
      return this.customerInfo !== null
    }
  },
  methods: {
    /**
     * カード内各リンクをクリックして、遷移先画面を表示する
     */
    moveTo(card) {
      // 遷移先、すでにtagにある場合、活性する、該当カードを非活性にする
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let length = mainCardList.length
      let isExist = false
      let activedCardIndex = -1
      for (let i = 0; i < length; i++) {
        let item = mainCardList[i]
        if (
          item.name === card.name &&
          item.component === card.component &&
          item.ekimuCode === card.ekimuCode &&
          item.srvcKindCode === card.srvcKindCode
        ) {
          isExist = true
          item.isActived = true
          continue
        } else {
          if (item.isActived) {
            activedCardIndex = i
          }
          item.isActived = false
        }
      }

      if (!isExist) {
        // 遷移先、tagにない場合、該当カードを削除して、該当indexに遷移先のカードを入れる
        mainCardList[activedCardIndex] = card
      }

      // メインカードエリアをリフレッシュ
      this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
      this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
    },

    /**
     *  ページめくり設定
     */
    handleCurrentChange(cpage) {
      this.currPage = cpage
      this.startPage = (cpage - 1) * this.pageSize
      this.endPage = cpage * this.pageSize
      this.dataListPerPage()
    },
    handleSizeChange(psize) {
      this.currPage = 1
      this.pageSize = psize
      this.startPage = (this.currPage - 1) * psize
      this.endPage = this.currPage * psize
      this.dataListPerPage()
    },
    dataListPerPage() {
      return this.dataList.slice(this.startPage, this.endPage)
    },
    getCurrentCardIndex() {
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let cardIndex = mainCardList.findIndex(item => {
        return item.isActived === true
      })

      return cardIndex
    },
    getCurrentCard() {
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let cardIndex = this.getCurrentCardIndex()

      if (cardIndex !== -1) {
        return mainCardList[cardIndex]
      } else {
        return null
      }
    },
    // IEでpulldownを操作すると、Textboxのようにカーソル「｜」が表示されません。
    inputBlur(flag, refName) {
      this.$refs[refName].$children[0].blur()
    }
  },
  beforeDestroy() {
    let data = JSON.parse(JSON.stringify(this.$data))
    let mainCardList = this.$store.getters.mainCardList.slice(0)
    let cardIndex = mainCardList.findIndex(item => {
      return item.name === this.maincardName
    })

    if (cardIndex !== -1) {
      this.$set(mainCardList[cardIndex], 'viewData', data)
      this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
    }
  }
}
