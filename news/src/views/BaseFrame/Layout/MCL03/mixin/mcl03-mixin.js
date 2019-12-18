/**
 * mcl03系の処理方法のミックスイン
 * @module src\views\BaseFrame\Layout\MCL03\mixin\mcl03-mixin.js
 * @author IBM CIC
 */
import * as MCL03CONS from '../mcl03-constants'
import * as GlobalConstants from '@/constants/global-constants'
import { getServiceList } from '@/api/get-service-list'
import { getDisusedServiceList } from '@/api/get-disused-service-list'
import * as changeWidth from '@/utils/change-width'
import moment from 'moment'
import * as CARD_ID from '@/constants/card-id-constants'
import * as DateConstants from '@/constants/date-constants.js'
import * as UserInfo from '@/utils/user-info'
import * as LoadingUtil from '@/utils/loading-util'
export default {
  data() {
    return {
      // 役務一覧照会APIの戻り値
      serviceList: [],
      // 廃止済役務一覧照会APIの戻り値
      disusedServiceList: [],
      authority: ''
    }
  },
  created() {
    this.initView()
    this.authority = UserInfo.get().AUTHORITY
  },
  computed: {
    // ページャ後のデータ一覧
    hasData() {
      return this.dataList && this.dataList.length > 0
    }
  },
  methods: {
    /**
     * 初期化処理
     */
    async initView() {
      // viewDataがあるかを判断
      let card = this.getCurrentCard()

      if (card.viewData) {
        // データ取得済
        this.authority = JSON.parse(JSON.stringify(card.viewData.authority))
        this.cardId = JSON.parse(JSON.stringify(card.viewData.cardId))
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
        this.optionId = JSON.parse(JSON.stringify(card.viewData.optionId))
        this.optionList = JSON.parse(JSON.stringify(card.viewData.optionList))
        this.pageSize = JSON.parse(JSON.stringify(card.viewData.pageSize))
        this.serviceList = JSON.parse(JSON.stringify(card.viewData.serviceList))
        this.startPage = JSON.parse(JSON.stringify(card.viewData.startPage))
        this.value = JSON.parse(JSON.stringify(card.viewData.value))
        return
      }

      let mainCardList = this.$store.getters.mainCardList.slice(0)
      const tabsList = document.getElementsByClassName('tagsDiv')

      if (this.customerInfo) {
        let option = { optionId: this.optionId, traceLog: false }

        let pramas = { ...MCL03CONS.SERVICE_LIST_PARAM }
        pramas.commonCustId = this.customerInfo.commonCustId
        pramas.srchObjectDate = moment().format(DateConstants.YYYYMMDD)

        let serviceListParam = {
          ekimuListSrchReq: pramas
        }
        let serviceListResponse = null
        try {
          LoadingUtil.show()
          serviceListResponse = await getServiceList(serviceListParam, option)
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(this.optionId, error)
          return
        }
        LoadingUtil.hidden()
        this.serviceList =
          serviceListResponse.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo

        pramas = {
          ...MCL03CONS.DISUSED_SERVICE_LIST_PARAM
        }

        let disusedServiceListParam = {
          endDidEkimuListSrchReq: pramas
        }
        // 廃止済役務一覧照会.業務メッセージ域.照会対象年月日
        pramas.srchObjectDate = moment().format(DateConstants.YYYYMMDD)

        // 廃止済役務一覧照会.業務メッセージ域.共通顧客ID
        pramas.commonCustId = this.customerInfo.commonCustId
        let disusedServiceListResponse = null
        try {
          LoadingUtil.show()
          disusedServiceListResponse = await getDisusedServiceList(
            disusedServiceListParam,
            option
          )
        } catch (error) {
          LoadingUtil.hidden()
          this.onComError(this.optionId, error)
          return
        }
        LoadingUtil.hidden()

        this.disusedServiceList =
          disusedServiceListResponse.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo

        const serviceListLength = this.serviceList.length
        const disusedServiceListLength = this.disusedServiceList.length
        for (let i = 0; i < serviceListLength; i++) {
          let serviceList = this.serviceList[i]
          for (let j = 0; j < disusedServiceListLength; j++) {
            let disusedServiceList = this.disusedServiceList[j]
            if (
              serviceList.ekimuCode === disusedServiceList.ekimuCode &&
              serviceList.srvcKindCode === disusedServiceList.srvcKindCode
            ) {
              if (
                this.cardId === CARD_ID.MCL0300 &&
                disusedServiceList.ekimuCode === '26'
              ) {
                this.pickData(disusedServiceList, serviceList)
              }
              if (
                this.cardId === CARD_ID.MCL0301 &&
                disusedServiceList.ekimuCode === '50'
              ) {
                this.pickData(disusedServiceList, serviceList)
              }
              if (
                this.cardId === CARD_ID.MCL0302 &&
                disusedServiceList.ekimuCode === '53'
              ) {
                this.pickData(disusedServiceList, serviceList)
              }
              if (
                this.cardId === CARD_ID.MCL0303 &&
                disusedServiceList.ekimuCode === '74'
              ) {
                this.pickData(disusedServiceList, serviceList)
              }
            }
          }
        }
        changeWidth.changeTagsWidth(tabsList, mainCardList)
      }
    },
    pickData(disusedServiceList, serviceList) {
      if (disusedServiceList.srvcKindCode !== '') {
        this.dataList.push({
          name: disusedServiceList.srvcKindName,
          number: serviceList.recRecNum,
          noUseNum: disusedServiceList.recRecNum - serviceList.recRecNum,
          ekimuCode: disusedServiceList.ekimuCode,
          srvcKindCode: disusedServiceList.srvcKindCode
        })
      } else {
        this.dataList.push({
          name: disusedServiceList.ekimuName,
          number: disusedServiceList.recRecNum,
          noUseNum: disusedServiceList.recRecNum - serviceList.recRecNum,
          ekimuCode: disusedServiceList.ekimuCode,
          srvcKindCode: disusedServiceList.srvcKindCode
        })
      }
    },
    /**
     *  クリックされたサービスの契約番号一覧カードに遷移する
     */
    changeToInfoView(val) {
      let componentList = GlobalConstants.MAIN_CARD_LIST.slice(0)
      let selectedCard = {}
      let cardIndex = componentList.findIndex(item => {
        return (
          item.ekimuCode === val.ekimuCode &&
          item.srvcKindCode === val.srvcKindCode
        )
      })
      if (cardIndex !== -1) {
        selectedCard = { ...componentList[cardIndex] }
        selectedCard.isActived = true
        selectedCard.name = val.name
      } else {
        return
      }
      this.moveTo(selectedCard)
    },
    /**
     * 役務別契約件数一覧を表示する
     */
    onBackList() {
      let selectedComponent = {
        isActived: true,
        component: 'MCL0200',
        componentName: '役務別契約件数一覧',
        name: '役務一覧',
        ekimuCode: '',
        srvcKindCode: '  '
      }
      this.moveTo(selectedComponent)
    }
  }
}
