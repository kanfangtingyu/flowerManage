import * as IDPFEvent from '@/constants/idpf-event'
import * as GlobalConstants from '@/constants/global-constants'

export default {
  name: 'SubCardBase',
  data() {
    return {
      cardId: '',
      customerInfo: null,
      totalCount: 0,
      // 廃止済役務データと廃止済顧客ディレクトのデータ
      dataListInfo: [],
      noData: false
    }
  },
  props: {
    subcardItem: {
      type: Object
    },
    subcardName: {
      type: String
    },
    mainCardTop: {
      type: Number
    },
    subcardType: {
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
    // 廃止済役務データ
    // 廃止済顧客ディレクトデータ
    dataPerPage() {
      return this.dataListInfo.slice(0, 5)
    },
    //  顧客基本情報設定されるか
    isCutomInfoSet() {
      return this.customerInfo !== null
    }
  },
  mounted() {
    this.$idpfEventBus.$on(
      IDPFEvent.REFRESH_SUBCARD_VIEW,
      this.refreshSubCardView
    )
  },
  methods: {
    getSelectedCard(mainCardID, mainCardName) {
      let mainCardList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedCard = {}
      let cardIndex = mainCardList.findIndex(item => {
        return item.component === mainCardID && item.name === mainCardName
      })
      selectedCard = { ...mainCardList[cardIndex] }
      selectedCard.isActived = false
      return selectedCard
    },
    refreshSubCardView(customerInfo) {
      this.customerInfo = customerInfo
      this.initView()
    }
  },
  beforeDestroy() {
    this.$idpfEventBus.$off(IDPFEvent.REFRESH_SUBCARD_VIEW)
  }
}
