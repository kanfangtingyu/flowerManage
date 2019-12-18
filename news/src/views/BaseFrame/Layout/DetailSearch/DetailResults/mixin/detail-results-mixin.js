import MW05 from '@/views/popups/MW05/MW05'
import { USE_DISCONT_END_DATE } from './detail-results-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import { DETAIL_SEARCH } from '@/constants/global-constants'
export default {
  components: {
    MW05
  },
  computed: {
    overMax() {
      return this.dateList.length <= this.maxSize
    },
    initNoData() {
      let initflag = false
      for (var a in this.viewParam) {
        if (
          this.viewParam[a] &&
          this.viewParam[a].constructor &&
          this.viewParam[a].constructor === Array &&
          this.viewParam[a].length > 0
        ) {
          initflag = true
        }
      }
      return initflag
    }
  },
  data() {
    return {
      orderFlg: '',
      pageName: '',
      noData: true,
      hasDetailError: false,
      errorCode: '',
      errorMsg: '',
      filterData: [], // ページャ後データ（表示中データ）
      dateList: [], // 絞り込み後のデータ
      mw05Visible: false,
      kennsuhyoujiList: [
        {
          value: 10,
          lable: '10'
        },
        {
          value: 20,
          lable: '20'
        },
        {
          value: 30,
          lable: '30'
        },
        {
          value: 40,
          lable: '40'
        },
        {
          value: 50,
          lable: '50'
        }
      ],
      kennsuhyoujiValue: '10',
      resultDataList: [],
      resultShowCheck: true,
      detailSearchHyoujiResult: true,
      currpage: 1,
      pagesize: 10
    }
  },
  props: {
    viewParam: [Object, Array],
    default: () => {
      return null
    },
    masterRadioCheck: Boolean
  },
  methods: {
    showMW05() {
      this.mw05Visible = true
    },
    inputBlur(flag, refName) {
      this.$refs[refName].$children[0].blur()
    },
    /* ページ数 */
    handleSizeChange(val) {
      this.pagesize = val
      this.currpage = 1
      this.pageData()
    },
    /* ページネーション */
    handleCurrentChange(val) {
      this.currpage = val
      this.pageData()
    },
    pageCntArea() {
      if (this.filterData.length === 0) {
        return '0-0/0件'
      } else {
        return (
          (this.currpage - 1) * this.pagesize +
          1 +
          '-' +
          ((this.currpage - 1) * this.pagesize + this.filterData.length) +
          '/' +
          this.dateList.length +
          '件'
        )
      }
    },
    pageNameNom() {
      return (
        (this.currpage - 1) * this.pagesize +
        1 +
        '-' +
        ((this.currpage - 1) * this.pagesize + this.filterData.length)
      )
    },
    pageNameRed() {
      return '/' + this.dateList.length + '件'
    },
    pageData() {
      // ページングデータ
      this.filterData = this.dateList.slice(
        (this.currpage - 1) * this.pagesize,
        this.currpage * this.pagesize
      )
    },
    // ハイフンを除去して表示。
    changeIdForma(id) {
      return id.replace(/-/g, '')
    },
    // 「C99-9999-9999」形式。
    custIdLabel(commonCustId) {
      let commonCustIdLeft = commonCustId.slice(0, 3)
      let commonCustIdMid = commonCustId.slice(3, 7)
      let commonCustIdRight = commonCustId.slice(7, 11)
      return commonCustIdLeft + '-' + commonCustIdMid + '-' + commonCustIdRight
    },
    // 8桁の場合「YYYY/MM/DD」形式。
    custDataLabel(useDisContEndDate) {
      if (
        useDisContEndDate.length === 0 ||
        useDisContEndDate === null ||
        useDisContEndDate === USE_DISCONT_END_DATE
      ) {
        return '契約中'
      } else {
        if (useDisContEndDate.length > 1) {
          let useDisContEndDateIdLeft = useDisContEndDate.slice(0, 4)
          let useDisContEndDateIdMid = useDisContEndDate.slice(4, 6)
          let useDisContEndDateIdRight = useDisContEndDate.slice(6, 8)
          return (
            useDisContEndDateIdLeft +
            '/' +
            useDisContEndDateIdMid +
            '/' +
            useDisContEndDateIdRight
          )
        }
      }
    },
    /**
     * アドレスのフォマード (NB)
     * 住所、番地、建物、様方の両端のスペースをトリムし全角スペースで連結
     */
    addressFormatNB(
      kySTMei,
      kySSMei,
      kySOMei,
      kySAMei,
      banchi1,
      banchi2,
      banchi3,
      buliding1,
      buliding2,
      buliding3,
      people
    ) {
      kySTMei = this.spaceTrim(kySTMei)
      kySSMei = this.spaceTrim(kySSMei)
      kySOMei = this.spaceTrim(kySOMei)
      kySAMei = this.spaceTrim(kySAMei)
      let add = ''
      if (
        kySTMei &&
        kySSMei &&
        kySOMei &&
        kySAMei &&
        kySTMei.length > 0 &&
        kySSMei.length > 0 &&
        kySOMei.length > 0 &&
        kySAMei.length > 0
      ) {
        add = kySTMei + '　' + kySSMei + '　' + kySOMei + '　' + kySAMei
      } else if (
        kySTMei &&
        kySSMei &&
        kySOMei &&
        kySTMei.length > 0 &&
        kySSMei.length > 0 &&
        kySOMei.length > 0
      ) {
        add = kySTMei + '　' + kySSMei + '　' + kySOMei
      } else if (
        kySTMei &&
        kySSMei &&
        kySTMei.length > 0 &&
        kySSMei.length > 0
      ) {
        add = kySTMei + '　' + kySSMei
      } else {
        add = kySTMei
      }
      return this.addressFormat(
        add,
        banchi1,
        banchi2,
        banchi3,
        buliding1,
        buliding2,
        buliding3,
        people
      )
    },
    // ページジャンプ
    toMainCard(val, order) {
      if (order && order.length > 0) {
        let orderMaster = {
          contractNum: val,
          searchRangeType: order,
          searchType: '1'
        }
        this.$store.commit('app/SET_ORDER_MASTER', orderMaster)
      } else {
        let orderMaster = {}
        this.$store.commit('app/SET_ORDER_MASTER', orderMaster)
      }

      let flg = this.checkSearchKeyType(val)
      let searchInfo = {
        searchKey: val,
        searchType: DETAIL_SEARCH,
        keyType: flg
      }

      this.$nextTick(() => {
        this.$idpfEventBus.$emit(IDPFEvent.ON_DETAIL_SEARCH, searchInfo)
      })
    }
  },
  watch: {
    filterData: {
      handler() {
        this.pageName = this.pageCntArea()
        if (this.filterData.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
      },
      deep: true,
      immediate: true
    },
    viewParam: {
      handler(value) {
        // 初期化
        Object.assign(this.$data, this.$options.data())
        this.hasDetailError = false
        this.noData = false
        for (var key in this.viewParam) {
          // データの存在
          if (this.viewParam[key] instanceof Array) {
            this.handleFilter(false)
            return
          } else if (
            this.viewParam.errorCode &&
            this.viewParam.errorCode === 'WScs4001'
          ) {
            this.noData = true
            return
          } else {
            // エラーを報告する
            if (
              this.viewParam.errorCode === undefined &&
              this.viewParam.errorMsg === ''
            ) {
              this.noData = true
              return
            } else {
              this.hasDetailError = true
              this.errorCode = this.viewParam.errorCode
              this.errorMsg = this.viewParam.errorMsg
              return
            }
          }
        }
        // データが0の場合
        this.noData = true
      },
      deep: true,
      immediate: true
    }
  }
}
