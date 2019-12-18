/**
 * DetailSearchの処理方法
 * @module /src/views/BaseFrame/Layout/DetailSearch/detail-search-methods.js
 * @author IBM CIC
 */
import { getPrefectureInfo } from '@/api/get-prefecture-info'
import { getCityInfo } from '@/api/get-city-info'
import { getTownInfo } from '@/api/get-town-info'
import { getStreetInfo } from '@/api/get-street-info'
import { getCustomerInfo } from '@/api/get-customer-info'
import { nbGenericIf } from '@/api/nb-generic-if'
import { getAccelContract } from '@/api/get-accel-contract'
import { siriusWssb019 } from '@/api/sirius-wssb019'
import { getAccelBillingidContractIdList } from '@/api/get-accel-billingid-contract-id-list'
import { getAccelBillingDetailByBillingid } from '@/api/get-accel-billing-detail-by-billingid'
import { customerinfoSearchLimitCheck } from '@/api/customerinfo-search-limit-check'
import { getServiceList } from '@/api/get-service-list'
import { setDetailSearchHistory } from '@/utils/search-history'
import { getAccelReceiptStatus } from '@/api/get-accel-receipt-status'
import { getAccelCustomerList } from '@/api/get-accel-customer-list'
import * as DETAIL_SEARCH_CONSTANTS from './detail-search-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as UserInfo from '@/utils/user-info'
import moment from 'moment'
import * as GlobalConstants from '@/constants/global-constants'
import { E_WEB1002 } from '@/constants/idpf-message.js'
import * as DateConstants from '@/constants/date-constants.js'
import * as LoadingUtil from '@/utils/loading-util'

export default {
  watch: {
    mustSearchValue(value) {
      console.log(value)
    }
  },
  mounted() {
    let userInfo = UserInfo.get()
    if (userInfo.AUTHORITY.BILLING_TEL_OCN === '0') {
      this.searchObjectList.splice(2, 2)
    }
    if (userInfo.AUTHORITY.CONTRACT_TEL_OCN === '0') {
      this.searchObjectList.splice(1, 1)
    }
    if (userInfo.AUTHORITY.CUSTOMER === '0') {
      this.searchObjectList.splice(0, 1)
    }
  },
  methods: {
    handleInfoBackShow(info) {
      this.searchObjectValue = info.searchObjectValue
      this.onSearchObjectChange()
      this.searchObjectTwoValue = info.searchObjectTwoValue
      this.onSearchObjectTwoChange()
      this.mustSearchValue = info.mustSearchValue
      this.onMustSearchChange()
      this.mustInputValue = info.mustInputValue
      this.mailInputValue = info.mailInputValue
      this.hostInputValue = info.hostInputValue
      this.masterRadioValue = info.masterRadioValue
      this.alternateValue = info.alternateValue
      this.onAlternateChange()
      this.alternateInputValue = info.alternateInputValue
      this.alternateStatusValue = info.alternateStatusValue
      this.alternateTwoValue = info.alternateTwoValue
      this.onAlternateTwoChange()
      this.alternateThreeValue = info.alternateThreeValue
      this.onAlternateThreeChange()
      this.alternateFourValue = info.alternateFourValue
      this.onAlternateFourChange()
      this.alternateFiveValue = info.alternateFiveValue
      this.numberRadioValue = info.numberRadioValue
      this.flag = 0
      this.onDetailSearch()
    },
    searchCloseBtn() {
      this.$emit('update:detailSearchShow', false)
    },
    hisCloseBtn() {
      this.detailHistory = !this.detailHistory
    },
    /* errorMsg */
    mustInputValueCheck() {
      if (this.mustSearchValue === 7) {
        let regex = /^[0-9]{9}$/
        let errorMsg = '半角数字9桁で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 8) {
        let regex = /^[B]([0-9]{10})$/
        let errorMsg = 'B＋半角数字10桁で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 9 || this.mustSearchValue === 11) {
        let regex = /^[C]([0-9]{10})$/
        let errorMsg = 'C＋半角数字10桁で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 6) {
        let regex = /^[\u30a1-\u30f6\u3041-\u3093\uFF00-\uFFFF\u4e00-\u9fa5]{0,100}$/
        let errorMsg = '全角100文字以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (
        (this.searchObjectTwoValue === 0 && this.mustSearchValue === 0) ||
        this.mustSearchValue === 2 ||
        this.mustSearchValue === 14 ||
        this.mustSearchValue === 15 ||
        this.mustSearchValue === 16 ||
        this.mustSearchValue === 17
      ) {
        let regex = /^[0-9]{0,11}$/
        let errorMsg = '半角数字11桁以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (
        (this.searchObjectTwoValue === 1 && this.mustSearchValue === 0) ||
        (this.searchObjectTwoValue === 2 && this.mustSearchValue === 0) ||
        (this.searchObjectTwoValue === 3 && this.mustSearchValue === 0)
      ) {
        let regex = /^[N]([0-9]{9})$|^[H]([0-9]{9})$/
        let errorMsg = 'N/H＋半角数字9桁で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.searchObjectValue === 0 && this.mustSearchValue === 0) {
        let regex = /^[0-9a-zA-Z]{0,25}$/
        let errorMsg = '半角英数字25桁以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 13) {
        let regex = /^[0-9a-zA-Z]{0,63}$/
        let errorMsg = '半角英数字63文字以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 4) {
        let regex = /^[0-9a-zA-Z]{8}$/
        let errorMsg = '半角英数字8文字で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 12) {
        let regex = /^[0-9a-zA-Z]{0,100}$/
        let errorMsg = '半角英数字100文字以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 3) {
        let regex = /^[0-9a-zA-Z]{0,64}$/
        let errorMsg = '半角英数字64文字以内で入力してください。'
        this.accountValueCheck(regex, errorMsg)
      }
      if (this.mustSearchValue === 5 || this.mustSearchValue === 1) {
        let regex = /^[ァ-ンー]{0,100}$/
        let errorMsg = '全角カタカナ100文字以内で入力してください。'
        this.mustValueCheck(regex, errorMsg)
      }
    },
    hostValueCheck() {
      if (this.mailInputCheck) {
        let regex = /^[0-9a-zA-Z]{0,63}$/
        let errorMsg = '半角英数字63文字以内で入力してください。'
        if (this.hostInputValue === '') {
          this.isErrorFour = true
          this.errorMsgFour = '入力必須項目です。'
        } else {
          if (!regex.test(this.hostInputValue)) {
            this.isErrorFour = true
            this.errorMsgFour = errorMsg
          } else {
            this.isErrorFour = false
            this.errorMsgFour = ''
          }
        }
      }
    },
    alternateInputValueCheck() {
      if (this.alternateValue === 0) {
        let regex = /^[\u30a1-\u30f6\u3041-\u3093\uFF00-\uFFFF\u4e00-\u9fa5]{0,100}$/
        let errorMsg = '全角100文字以内で入力してください。'
        this.alternateCheck(regex, errorMsg)
      }
      if (this.alternateValue === 2) {
        let regex = /^[0-9]{7}$/
        let errorMsg = '半角数字7桁で入力してください。'
        this.alternateCheck(regex, errorMsg)
      }
      if (this.alternateValue === 5 || this.alternateValue === 8) {
        let regex = /^[0-9]{0,11}$/
        let errorMsg = '半角数字11桁以内で入力してください。'
        this.alternateCheck(regex, errorMsg)
      }
      if (this.alternateValue === 4) {
        let regex = /^[ァ-ンー]{0,100}$/
        let errorMsg = '全角カタカナ100文字以内で入力してください。'
        this.alternateCheck(regex, errorMsg)
      }
    },
    mustValueCheck(regex, errorMsg) {
      if (this.mustInputValue === '') {
        this.isError = true
        this.errorMsg = '入力必須項目です。'
      } else {
        if (!regex.test(this.mustInputValue)) {
          this.isError = true
          this.errorMsg = errorMsg
        } else {
          this.isError = false
          this.errorMsg = ''
        }
      }
    },
    alternateCheck(regex, errorMsg) {
      if (this.alternateInputValue === '') {
        this.isErrorTwo = true
        this.errorMsgTwo = '入力必須項目です。'
      } else {
        if (!regex.test(this.alternateInputValue)) {
          this.isErrorTwo = true
          this.errorMsgTwo = errorMsg
        } else {
          this.isErrorTwo = false
          this.errorMsgTwo = ''
        }
      }
    },
    accountValueCheck(regex, errorMsg) {
      if (this.mailInputValue === '') {
        this.isErrorThree = true
        this.errorMsgThree = '入力必須項目です。'
      } else {
        if (!regex.test(this.mailInputValue)) {
          this.isErrorThree = true
          this.errorMsgThree = errorMsg
        } else {
          this.isErrorThree = false
          this.errorMsgThree = ''
        }
      }
    },
    onSearchObjectChange() {
      this.searchObjectTwoValue = ''
      this.mustSearchValue = ''
      this.mustInputValue = ''
      this.mailInputValue = ''
      this.hostInputValue = ''
      this.masterRadioValue = '02'
      this.alternateValue = ''
      this.alternateInputValue = ''
      this.alternateStatusValue = ''
      this.alternateTwoValue = ''
      this.alternateThreeValue = ''
      this.alternateFourValue = ''
      this.alternateFiveValue = ''
      this.isError = false
      this.isErrorTwo = false
      this.isErrorThree = false
      this.isErrorFour = false
      if (this.searchObjectValue === 3) {
        this.mustSearchList = this.IDList
      }
      if (this.searchObjectValue === 2) {
        this.searchObjectTwoList = this.feeList
      }
      if (this.searchObjectValue === 1) {
        this.searchObjectTwoList = this.contractList
      }
      if (this.searchObjectValue === 0) {
        this.mustSearchList = this.customerMustList
      }
    },
    onSearchObjectTwoChange() {
      this.mustSearchValue = ''
      this.mustInputValue = ''
      this.mailInputValue = ''
      this.hostInputValue = ''
      this.masterRadioValue = '02'
      this.alternateValue = ''
      this.alternateInputValue = ''
      this.alternateStatusValue = ''
      this.alternateTwoValue = ''
      this.alternateThreeValue = ''
      this.alternateFourValue = ''
      this.alternateFiveValue = ''
      this.isError = false
      this.isErrorTwo = false
      this.isErrorThree = false
      this.isErrorFour = false
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 0) {
        this.mustSearchList = this.phoneMustTwoList
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 1) {
        this.mustSearchList = this.contractOcnMustList
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 2) {
        this.mustSearchList = this.contractOcnBMustList
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 3) {
        this.mustSearchList = this.contractOcnCMustList
      }
      if (this.searchObjectValue === 2 && this.searchObjectTwoValue === 0) {
        this.mustSearchList = this.phoneMustTwoList
      }
      if (this.searchObjectValue === 2 && this.searchObjectTwoValue === 1) {
        this.mustSearchList = this.feeOcnMustList
      }
      if (this.searchObjectValue === 2 && this.searchObjectTwoValue === 2) {
        this.mustSearchList = this.feeOcnBMustList
      }
      if (this.searchObjectValue === 2 && this.searchObjectTwoValue === 3) {
        this.mustSearchList = this.feeOcnMustList
      }
      if (this.searchObjectValue === 2 && this.searchObjectTwoValue === 4) {
        this.mustSearchList = this.IDList
      }
    },
    onMustSearchChange() {
      this.mustInputValue = ''
      this.mailInputValue = ''
      this.hostInputValue = ''
      this.masterRadioValue = '02'
      this.alternateValue = ''
      this.alternateInputValue = ''
      this.alternateStatusValue = ''
      this.alternateTwoValue = ''
      this.alternateThreeValue = ''
      this.alternateFourValue = ''
      this.alternateFiveValue = ''
      this.isError = false
      this.isErrorTwo = false
      this.isErrorThree = false
      this.isErrorFour = false
      // labelの値を取得
      let labelTemp = {}
      labelTemp = this.mustSearchList.find(item => {
        return item.value === this.mustSearchValue
      })
      this.mustInputPlaceholder = labelTemp.label + 'を入力してください'
      if (this.searchObjectValue === 0 && this.mustSearchValue === 5) {
        this.alternateList = this.cusNamecanaAlternateList
      }
      if (this.searchObjectValue === 0 && this.mustSearchValue === 6) {
        this.alternateList = this.cusNameAlternateList
      }
      if (
        this.searchObjectValue === 1 &&
        this.searchObjectTwoValue === 0 &&
        this.mustSearchValue === 0
      ) {
        this.alternateList = this.phoneContractAlternateList
      }
      if (
        this.searchObjectValue === 1 &&
        this.searchObjectTwoValue !== 0 &&
        this.searchObjectTwoValue !== '' &&
        this.mustSearchValue === 1
      ) {
        this.alternateList = this.ocnNamecanaAlternateList
      }
      if (
        this.searchObjectValue === 1 &&
        this.searchObjectTwoValue !== 0 &&
        this.searchObjectTwoValue !== '' &&
        this.mustSearchValue === 2
      ) {
        this.alternateList = this.ocnPhoneAlternateList
      }
      if (
        this.searchObjectValue === 2 &&
        this.searchObjectTwoValue === 4 &&
        this.mustSearchValue === 8
      ) {
        this.alternateList = this.idIdList
      }
    },
    async onAlternateChange() {
      this.alternateInputValue = ''
      this.alternateStatusValue = ''
      this.alternateTwoValue = ''
      this.alternateThreeValue = ''
      this.alternateFourValue = ''
      this.alternateFiveValue = ''
      this.citySelectCheck = false
      this.townSelectCheck = false
      this.streetSelectCheck = false
      this.isErrorTwo = false
      // labelの値を取得
      let labelTemp = {}
      labelTemp = this.alternateList.find(item => {
        return item.value === this.alternateValue
      })
      if (labelTemp) {
        this.alternateInputPlaceholder = labelTemp.label + 'を入力してください'
        this.alternateSelectPlaceholder = labelTemp.label + 'を選択してください'
      }
      if (this.alternateValue === 6 || this.alternateValue === 1) {
        let option = {}
        if (this.searchObjectValue === 0) {
          option = { optionId: OPTION_ID.AS010100, traceLog: false }
        }
        if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 1) {
          option = { optionId: OPTION_ID.AS010201, traceLog: false }
        }
        if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 2) {
          option = { optionId: OPTION_ID.AS010202, traceLog: false }
        }
        if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 3) {
          option = { optionId: OPTION_ID.AS010203, traceLog: false }
        }
        const provsList = await getPrefectureInfo(option)
        const newProvsList = []
        provsList.data.map(value => {
          newProvsList.push({
            label: value.PREFECTURENAME,
            value: value.PREFECTURECODE
          })
        })
        this.alternateTwoList = newProvsList
      }
    },
    async onAlternateTwoChange() {
      this.townSelectCheck = false
      this.streetSelectCheck = false
      this.alternateThreeValue = ''
      this.alternateFourValue = ''
      this.alternateFiveValue = ''

      let option = {}
      if (this.searchObjectValue === 0) {
        option = { optionId: OPTION_ID.AS010100, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 1) {
        option = { optionId: OPTION_ID.AS010201, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 2) {
        option = { optionId: OPTION_ID.AS010202, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 3) {
        option = { optionId: OPTION_ID.AS010203, traceLog: false }
      }
      const param = { prefectureCode: this.alternateTwoValue }
      const cityList = await getCityInfo(param, option)
      const newCityList = []
      cityList.data.map(value => {
        if (value.CITYNAME !== '') {
          newCityList.push({
            label: value.CITYNAME,
            value: value.CITYCODE
          })
        }
      })
      this.cityList = newCityList

      if (this.alternateValue === 1 && this.cityList.length > 0) {
        this.citySelectCheck = true
      } else {
        this.citySelectCheck = false
      }
    },
    async onAlternateThreeChange() {
      this.streetSelectCheck = false
      this.alternateFourValue = ''
      this.alternateFiveValue = ''

      let option = {}
      if (this.searchObjectValue === 0) {
        option = { optionId: OPTION_ID.AS010100, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 1) {
        option = { optionId: OPTION_ID.AS010201, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 2) {
        option = { optionId: OPTION_ID.AS010202, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 3) {
        option = { optionId: OPTION_ID.AS010203, traceLog: false }
      }
      const param = {
        prefectureCode: this.alternateTwoValue,
        cityCode: this.alternateThreeValue
      }
      const townList = await getTownInfo(param, option)
      const newTownList = []
      townList.data.map(value => {
        if (value.TOWNNAME !== '') {
          newTownList.push({
            label: value.TOWNNAME,
            value: value.TOWNCODE
          })
        }
      })
      this.townList = newTownList

      if (this.alternateThreeValue !== '' && this.townList.length > 0) {
        this.townSelectCheck = true
      } else {
        this.townSelectCheck = false
      }
    },
    async onAlternateFourChange() {
      this.alternateFiveValue = ''

      let option = {}
      if (this.searchObjectValue === 0) {
        option = { optionId: OPTION_ID.AS010100, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 1) {
        option = { optionId: OPTION_ID.AS010201, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 2) {
        option = { optionId: OPTION_ID.AS010202, traceLog: false }
      }
      if (this.searchObjectValue === 1 && this.searchObjectTwoValue === 3) {
        option = { optionId: OPTION_ID.AS010203, traceLog: false }
      }
      const param = {
        prefectureCode: this.alternateTwoValue,
        cityCode: this.alternateThreeValue,
        townCode: this.alternateFourValue
      }
      const streetList = await getStreetInfo(param, option)
      const newStreetList = []
      streetList.data.map(value => {
        if (value.STREETNAME !== '') {
          newStreetList.push({
            label: value.STREETNAME,
            value: value.STREETCODE
          })
        }
      })
      this.streetList = newStreetList
      if (this.alternateFourValue !== '' && this.streetList.length > 0) {
        this.streetSelectCheck = true
      } else {
        this.streetSelectCheck = false
      }
    },

    /* customer/customer-business API */
    async customerBusiness(cusParam, option, flg = 3) {
      try {
        if (flg === 3) {
          this.viewParam = {}
          LoadingUtil.show()
          const res = await getCustomerInfo(cusParam, option)
          if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
            if (res.data.SysMsgAre.pickCustListRes) {
              this.$set(
                this.viewParam,
                'customerBusinessData',
                res.data.SysMsgAre.pickCustListRes.pickCustListInfo
              )
            } else {
              let tmpArr = []
              tmpArr.push(res.data.SysMsgAre.custBasicInfoSrchRes)
              this.$set(this.viewParam, 'customerBusinessData', tmpArr)
            }
          }
        }
        if (flg === 0) {
          this.viewParam = {}
          this.centerParam = []
          LoadingUtil.show()
          const res = await getCustomerInfo(cusParam, option)
          if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
            if (res.data.SysMsgAre.pickCustListRes) {
              this.centerParam = res.data.SysMsgAre.pickCustListRes.pickCustListInfo.slice(
                0
              )
            } else {
              let tmpArr = []
              tmpArr.push(res.data.SysMsgAre.custBasicInfoSrchRes)
              this.centerParam = tmpArr.slice(0)
            }
          }
        }
        if (flg === 1) {
          let haveParam = []
          LoadingUtil.show()
          const res = await getCustomerInfo(cusParam, option)
          if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
            if (res.data.SysMsgAre.pickCustListRes) {
              haveParam = res.data.SysMsgAre.pickCustListRes.pickCustListInfo.slice(
                0
              )
            } else {
              let tmpArr = []
              tmpArr.push(res.data.SysMsgAre.custBasicInfoSrchRes)
              haveParam = tmpArr.slice(0)
            }
          }
          let newData = haveParam.filter(item => {
            let filterFlg = true
            this.centerParam.forEach(item2 => {
              if (item.commonCustId === item2.commonCustId) {
                filterFlg = false
              }
            })
            return filterFlg
          })
          this.$set(this.viewParam, 'customerBusinessData', newData)
        }
      } catch (error) {
        LoadingUtil.hidden()
        if (error.code === GlobalConstants.ECONNABORTED) {
          this.errorMsg = E_WEB1002
          this.errorCode = '-'
        } else {
          this.errorMsg = error.response.data.errorMessage
          this.errorCode = error.response.data.errorCode
        }
        this.$set(this.viewParam, 'errorMsg', this.errorMsg)
        this.$set(this.viewParam, 'errorCode', this.errorCode)
      }
      LoadingUtil.hidden()
    },
    /* contract/accel-contract API */
    async accelContract(contractParam, option) {
      try {
        LoadingUtil.show()
        this.viewParam = {}
        const res = await getAccelContract(contractParam, option)
        if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
          this.$set(
            this.viewParam,
            'accelContractData',
            res.data.SysMsgAre.accSrvcIdInfoSrchVer2.srvcIdInfo
          )
        }
      } catch (error) {
        LoadingUtil.hidden()
        if (error.code === GlobalConstants.ECONNABORTED) {
          this.errorMsg = E_WEB1002
          this.errorCode = '-'
        } else {
          this.errorMsg = error.response.data.errorMessage
          this.errorCode = error.response.data.errorCode
        }
        this.$set(this.viewParam, 'errorMsg', this.errorMsg)
        this.$set(this.viewParam, 'errorCode', this.errorCode)
      }
      LoadingUtil.hidden()
    },

    /* nbGeneric API */
    async nbGeneric(nbGenericParam, option) {
      try {
        LoadingUtil.show()
        this.viewParam = {}
        const res = await nbGenericIf(nbGenericParam, option)
        if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
          this.$set(
            this.viewParam,
            'nbGenericIfData',
            res.data.SysMsgAre.contractInfoSrchResNB
              .reqInquireReqGenericIfResponse[0].return
          )
        }
      } catch (error) {
        LoadingUtil.hidden()
        if (error.code === GlobalConstants.ECONNABORTED) {
          this.errorMsg = E_WEB1002
          this.errorCode = '-'
        } else if (error.response) {
          this.errorMsg = error.response.data.errorMessage
          this.errorCode = error.response.data.errorCode
        }
        this.$set(this.viewParam, 'errorMsg', this.errorMsg)
        this.$set(this.viewParam, 'errorCode', this.errorCode)
      }
      LoadingUtil.hidden()
    },

    /* sirius API */
    async sirius(siriusParam, option) {
      try {
        LoadingUtil.show()
        this.viewParam = {}
        const res = await siriusWssb019(siriusParam, option)
        if (
          res.data.ComResHdrAre &&
          res.data.ComResHdrAre.TmlHyjMsgId === 'WScs4001'
        ) {
          this.$set(this.viewParam, 'errorMsg', res.data.ComResHdrAre.TmlHyjMsg)
          this.$set(
            this.viewParam,
            'errorCode',
            res.data.ComResHdrAre.TmlHyjMsgId
          )
        } else {
          this.$set(
            this.viewParam,
            'siriusData',
            res.data.responseData.searchResultDetailList
          )
        }
      } catch (error) {
        LoadingUtil.hidden()
        if (error.code === GlobalConstants.ECONNABORTED) {
          this.errorMsg = E_WEB1002
          this.errorCode = '-'
        } else {
          this.errorMsg = error.response.data.errorMessage
          this.errorCode = error.response.data.errorCode
        }
        this.$set(this.viewParam, 'errorMsg', this.errorMsg)
        this.$set(this.viewParam, 'errorCode', this.errorCode)
      }
      LoadingUtil.hidden()
    },

    /* クリックして検索 */
    async onDetailSearch() {
      let newAddress = ''
      if (
        this.alternateTwoList.length > 0 &&
        this.alternateTwoValue.length > 0
      ) {
        newAddress = this.alternateTwoList[parseInt(this.alternateTwoValue) - 1]
          .label
      }
      let newStatus = ''
      if (this.statusList.length > 0 && this.alternateStatusValue !== '') {
        newStatus = this.statusList[this.alternateStatusValue].label
      }

      this.mustInputValueCheck()
      this.hostValueCheck()
      this.alternateInputValueCheck()
      if (
        this.isError === false &&
        this.isErrorTwo === false &&
        this.isErrorThree === false
      ) {
        // history session set
        let items = {
          newStatus: newStatus,
          newAddress: newAddress,
          searchObjectValue: this.searchObjectValue,
          searchObjectTwoValue: this.searchObjectTwoValue,
          mustSearchValue: this.mustSearchValue,
          mustInputValue: this.mustInputValue,
          mailInputValue: this.mailInputValue,
          hostInputValue: this.hostInputValue,
          masterRadioValue: this.masterRadioValue,
          alternateValue: this.alternateValue,
          alternateInputValue: this.alternateInputValue,
          alternateStatusValue: this.alternateStatusValue,
          alternateTwoValue: this.alternateTwoValue,
          alternateThreeValue: this.alternateThreeValue,
          alternateFourValue: this.alternateFourValue,
          alternateFiveValue: this.alternateFiveValue,
          numberRadioValue: this.numberRadioValue
        }
        // searchInfo set
        let searchInfo = {
          searchKey: items,
          searchType: GlobalConstants.DETAIL_SEARCH,
          keyType: ''
        }
        this.$store.commit('app/SET_SEARCH_INFO', searchInfo)

        if (this.flag === 1) {
          this.historyItems.push(items)
          setDetailSearchHistory(this.historyItems)
        }
        this.flag = 1

        // TO AS020100
        if (this.searchObjectValue === 0) {
          let option = { optionId: OPTION_ID.AS010100, traceLog: false }
          let param = { ...DETAIL_SEARCH_CONSTANTS.CUSTOMER_BUSINESS }
          let cusParam = {
            custSearchReq: param
          }
          if (this.mustSearchValue === 11) {
            param.searchTypCode = 1
            param.commonCustId = this.mustInputValue
            if (this.haveOrNo === '1') {
              param.srchObjectDate = moment().format(DateConstants.YYYYMMDD)
              await this.customerBusiness(cusParam, option)
            } else if (this.haveOrNo === '0') {
              let optionFlg = 0
              param.srchObjectDate = '00000000'
              await this.customerBusiness(cusParam, option, optionFlg)
              optionFlg = 1
              param.srchObjectDate = moment().format(DateConstants.YYYYMMDD)
              await this.customerBusiness(cusParam, option, optionFlg)
            } else if (
              this.mustSearchValue === 5 ||
              this.mustSearchValue === 6
            ) {
              param.srchObjectDate = '00000000'
              await this.customerBusiness(cusParam, option)
            }
          }
          if (this.mustSearchValue === 7) {
            param.searchTypCode = 5
            param.empireDbCode = this.mustInputValue
            await this.customerBusiness(cusParam, option)
          }
          if (this.mustSearchValue === 9) {
            param.searchTypCode = 2
            param.accCustId = this.mustInputValue
            await this.customerBusiness(cusParam, option)
          }
          if (this.mustSearchValue === 0) {
            if (
              this.mustInputValue.substr(0, 1) === 'H' ||
              this.mustInputValue.substr(0, 1) === 'N'
            ) {
              param.searchTypCode = 4
              param.srvcId = this.mustInputValue
              await this.customerBusiness(cusParam, option)
            } else {
              let accelCustomerParam = {
                ...DETAIL_SEARCH_CONSTANTS.ACCEL_CUSTOMER_LIST_PARAM
              }
              accelCustomerParam.searchDate = moment().format(
                DateConstants.YYYYMMDD
              )
              accelCustomerParam.custServiceId = this.mustInputValue
              let customerParam = {
                custSearchReq: accelCustomerParam
              }
              try {
                LoadingUtil.show()
                this.viewParam = {}
                const customerRes = await getAccelCustomerList(
                  customerParam,
                  option
                )
                var customerResPick = []
                if (customerRes.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
                  if (
                    customerRes.data.SysMsgAre.custInfoSrchCorpResIdpfWebNew
                  ) {
                    customerRes.data.SysMsgAre.custInfoSrchCorpResIdpfWebNew.basicInfo.forEach(
                      item => {
                        let flg = true
                        customerResPick.forEach(item2 => {
                          if (item2.commonCustId === item.commonCustId) {
                            flg = false
                          }
                        })
                        if (flg) {
                          customerResPick.push(item)
                        }
                      }
                    )
                  } else if (
                    customerRes.data.SysMsgAre.custInfoSrchPersResIdpfWebNew
                  ) {
                    customerRes.data.SysMsgAre.custInfoSrchPersResIdpfWebNew.basicInfo.forEach(
                      item => {
                        let flg = true
                        customerResPick.forEach(item2 => {
                          if (item2.commonCustId === item.commonCustId) {
                            flg = false
                          }
                        })
                        if (flg) {
                          customerResPick.push(item)
                        }
                      }
                    )
                  } else if (customerRes.data.SysMsgAre.pickCustListFirstRes) {
                    customerRes.data.SysMsgAre.pickCustListFirstRes.pickCustListInfo.forEach(
                      item => {
                        let flg = true
                        customerResPick.forEach(item2 => {
                          if (item2.commonCustId === item.commonCustId) {
                            flg = false
                          }
                        })
                        if (flg) {
                          customerResPick.push(item)
                        }
                      }
                    )
                  }
                }
              } catch (error) {
                LoadingUtil.hidden()
                if (error.code === GlobalConstants.ECONNABORTED) {
                  this.errorMsg = E_WEB1002
                  this.errorCode = '-'
                } else {
                  this.errorMsg = error.response.data.errorMessage
                  this.errorCode = error.response.data.errorCode
                }
                this.$set(this.viewParam, 'errorMsg', this.errorMsg)
                this.$set(this.viewParam, 'errorCode', this.errorCode)
              }
              LoadingUtil.hidden()
              let tmpArr = []
              for (let index = 0; index < customerResPick.length; index++) {
                const element = customerResPick[index]
                param.searchTypCode = 1
                param.commonCustId = element.commonCustId
                try {
                  LoadingUtil.show()
                  this.viewParam = {}
                  let res = await getCustomerInfo(cusParam, option)
                  if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
                    let obj = res.data.SysMsgAre.custBasicInfoSrchRes
                    tmpArr.push(obj)
                  }
                } catch (error) {
                  LoadingUtil.hidden()
                  if (error.code === GlobalConstants.ECONNABORTED) {
                    this.errorMsg = E_WEB1002
                    this.errorCode = '-'
                  } else {
                    this.errorMsg = error.response.data.errorMessage
                    this.errorCode = error.response.data.errorCode
                  }
                  this.$set(this.viewParam, 'errorMsg', this.errorMsg)
                  this.$set(this.viewParam, 'errorCode', this.errorCode)
                }
                LoadingUtil.hidden()
              }
              this.$set(this.viewParam, 'customerBusinessData', tmpArr)
            }
          }
          if (this.mustSearchValue === 5 || this.mustSearchValue === 6) {
            let params = DETAIL_SEARCH_CONSTANTS.SEARCH_LIMIT
            if (this.mustSearchValue === 5) {
              params.custKana = this.mustInputValue
              params.custName = ''
            }
            if (this.mustSearchValue === 6) {
              params.custName = this.mustInputValue
              params.custKana = ''
            }
            params.prefecture = this.alternateTwoValue
            params.city = this.alternateThreeValue
            params.town = this.alternateFourValue
            params.street = this.alternateFiveValue
            if (this.alternateStatusValue === 1) {
              params.validCustomerOnly = true
            }
            try {
              LoadingUtil.show()
              this.viewParam = {}
              await customerinfoSearchLimitCheck(params, option)
              if (this.mustSearchValue === 5) {
                param.custNameKanaDblbyte = this.mustInputValue
                if (this.alternateValue === 0) {
                  param.custName = this.alternateInputValue
                }
              }
              if (this.mustSearchValue === 6) {
                param.custName = this.mustInputValue
                if (this.alternateValue === 4) {
                  param.custNameKanaDblbyte = this.alternateInputValue
                }
              }
              if (this.alternateValue === 1) {
                param.addrCode1 = this.alternateTwoValue
                param.addrCode2 = this.alternateThreeValue
                param.addrCode3 = this.alternateFourValue
                param.addrCode4 = this.alternateFiveValue
              }
              if (this.alternateValue === 2) {
                param.zip = this.alternateInputValue
              }
              if (this.alternateValue === 3) {
                if (this.alternateStatusValue === 1) {
                  param.srchObjectDate = moment().format(DateConstants.YYYYMMDD)
                } else {
                  param.srchObjectDate = '00000000'
                }
              }
              param.searchTypCode = 8
              await this.customerBusiness(cusParam, option)
            } catch (error) {
              LoadingUtil.hidden()
              if (error.code === GlobalConstants.ECONNABORTED) {
                this.errorMsg = E_WEB1002
                this.errorCode = '-'
              } else {
                this.errorMsg = error.response.data.errorMessage
                this.errorCode = error.response.data.errorCode
              }
              this.$set(this.viewParam, 'errorMsg', this.errorMsg)
              this.$set(this.viewParam, 'errorCode', this.errorCode)
            }
            LoadingUtil.hidden()
          }
          if (this.mustSearchValue === 8) {
            let serviceListparam = { ...DETAIL_SEARCH_CONSTANTS.SERVICE_LIST }
            serviceListparam.billingId = this.mustInputValue
            let serviceListParam = {
              ekimuListSrchReq: serviceListparam
            }
            try {
              LoadingUtil.show()
              this.viewParam = {}
              let res = await getServiceList(serviceListParam, option)
              var resPick = []
              if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
                let resPickTran =
                  res.data.SysMsgAre.ekimuListSrchRes.ekimuListInfo
                resPickTran.forEach(item => {
                  let flg = true
                  resPick.forEach(item2 => {
                    if (item2.commonCustId === item.commonCustId) {
                      flg = false
                    }
                  })
                  if (flg) {
                    resPick.push(item)
                  }
                })
              }
            } catch (error) {
              LoadingUtil.hidden()
              if (error.code === GlobalConstants.ECONNABORTED) {
                this.errorMsg = E_WEB1002
                this.errorCode = '-'
              } else {
                this.errorMsg = error.response.data.errorMessage
                this.errorCode = error.response.data.errorCode
              }
              this.$set(this.viewParam, 'errorMsg', this.errorMsg)
              this.$set(this.viewParam, 'errorCode', this.errorCode)
            }
            LoadingUtil.hidden()

            let tmpArr = []
            for (let index = 0; index < resPick.length; index++) {
              const element = resPick[index]
              param.searchTypCode = 1
              param.commonCustId = element.commonCustId
              try {
                LoadingUtil.show()
                this.viewParam = {}
                let res = await getCustomerInfo(cusParam, option)
                if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
                  let obj = res.data.SysMsgAre.custBasicInfoSrchRes
                  tmpArr.push(obj)
                }
              } catch (error) {
                LoadingUtil.hidden()
                if (error.code === GlobalConstants.ECONNABORTED) {
                  this.errorMsg = E_WEB1002
                  this.errorCode = '-'
                } else {
                  this.errorMsg = error.response.data.errorMessage
                  this.errorCode = error.response.data.errorCode
                }
                this.$set(this.viewParam, 'errorMsg', this.errorMsg)
                this.$set(this.viewParam, 'errorCode', this.errorCode)
              }
              LoadingUtil.hidden()
            }
            this.$set(this.viewParam, 'customerBusinessData', tmpArr)
          }
          this.resultShowCheck = true
          this.resultFrameId = 'AS020100'

          // TO AS020200
        } else if (
          this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 0
        ) {
          let option = { optionId: OPTION_ID.AS010200, traceLog: false }
          let param = { ...DETAIL_SEARCH_CONSTANTS.ACCEL_CONTRACT }
          param.telNo = this.mustInputValue
          let flag = param.telNo.slice(0, 3)
          if (
            flag === '050' ||
            flag === '070' ||
            flag === '080' ||
            flag === '090'
          ) {
            param.telNo = param.telNo.substr(1)
          }
          if (this.alternateInputValue === '') {
            param.srchDate = moment().format(DateConstants.YYYYMMDD)
          } else {
            param.srchDate = this.alternateInputValue
          }
          let accConParam = {
            accSrvcIdInfoSrchReq: param
          }
          this.accelContract(accConParam, option)
          this.resultShowCheck = true
          this.resultFrameId = 'AS020200'

          // TO AS020201
        } else if (
          this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 1
        ) {
          let option = { optionId: OPTION_ID.AS010201, traceLog: false }
          if (this.mustSearchValue === 1 && this.alternateValue === '') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === 6) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA_PREFECTURE
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.alternateTwoValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === 2) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA_ZIPCODE
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.alternateInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 2 && this.numberRadioValue === '01') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_USE_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 2 && this.numberRadioValue === '02') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CONTACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 0) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CONTRACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            try {
              LoadingUtil.show()
              this.viewParam = {}
              const res = await nbGenericIf(nbGenericParam, option)
              if (res.data.ComResHdrAre && res.data.ComResHdrAre.Imp === 'I') {
                this.$set(
                  this.viewParam,
                  'nbGenericIfData',
                  res.data.SysMsgAre.contractInfoSrchResNB
                    .reqInquireReqGenericIfResponse[0].return
                )
              } else {
                let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTRACT }
                siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                  DateConstants.YYYYMMDDHHmmss
                )
                siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
                await this.sirius(siriusParam, option)
              }
            } catch (error) {
              LoadingUtil.hidden()
              let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTRACT }
              siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                DateConstants.YYYYMMDDHHmmss
              )
              siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
              await this.sirius(siriusParam, option)
            }
            LoadingUtil.hidden()
          }
          if (this.mustSearchValue === 3) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_MAIL
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mailInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[2].zks = this.hostInputValue
            try {
              LoadingUtil.show()
              this.viewParam = {}
              const res = await nbGenericIf(nbGenericParam, option)
              if (res.data.ComResHdrAre && res.data.ComResHdrAre.Imp === 'I') {
                this.$set(
                  this.viewParam,
                  'nbGenericIfData',
                  res.data.SysMsgAre.contractInfoSrchResNB
                    .reqInquireReqGenericIfResponse[0].return
                )
              } else {
                let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_MAIL }
                siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                  DateConstants.YYYYMMDDHHmmss
                )
                siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
                siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mailInputValue
                siriusParam.requestData.operationInfo.referenceConditionList[1].referenceConditionInfo.attributeValue = this.hostInputValue
                await this.sirius(siriusParam, option)
              }
            } catch (error) {
              LoadingUtil.hidden()
              let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_MAIL }
              siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                DateConstants.YYYYMMDDHHmmss
              )
              siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
              siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mailInputValue
              siriusParam.requestData.operationInfo.referenceConditionList[1].referenceConditionInfo.attributeValue = this.hostInputValue
              await this.sirius(siriusParam, option)
            }
            LoadingUtil.hidden()
          }
          if (this.mustSearchValue === 4) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_ID
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            try {
              LoadingUtil.show()
              this.viewParam = {}
              const res = await nbGenericIf(nbGenericParam, option)
              if (res.data.ComResHdrAre && res.data.ComResHdrAre.Imp === 'I') {
                this.$set(
                  this.viewParam,
                  'nbGenericIfData',
                  res.data.SysMsgAre.contractInfoSrchResNB
                    .reqInquireReqGenericIfResponse[0].return
                )
              } else {
                let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_ID }
                siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                  DateConstants.YYYYMMDDHHmmss
                )
                siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
                siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
                await this.sirius(siriusParam, option)
              }
            } catch (error) {
              LoadingUtil.hidden()
              let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_ID }
              siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                DateConstants.YYYYMMDDHHmmss
              )
              siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
              siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
              await this.sirius(siriusParam, option)
            }
            LoadingUtil.hidden()
          }
          this.resultShowCheck = true
          this.resultFrameId = 'AS020201'
          // TO AS020202
        } else if (
          this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 2
        ) {
          let option = { optionId: OPTION_ID.AS010202, traceLog: false }
          if (this.mustSearchValue === 0) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTRACT }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === '') {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_NAMEKANA }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === 6) {
            let siriusParam = {
              ...DETAIL_SEARCH_CONSTANTS.SIRIUS_NAMEKANA_PREFECTURE
            }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.referenceConditionList[2].referenceConditionInfo.attributeValue = this.alternateTwoValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }

          if (this.mustSearchValue === 1 && this.alternateValue === 2) {
            let siriusParam = {
              ...DETAIL_SEARCH_CONSTANTS.SIRIUS_NAMEKANA_ZIPCODE
            }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.referenceConditionList[2].referenceConditionInfo.attributeValue = this.alternateInputValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }

          if (this.mustSearchValue === 2 && this.numberRadioValue === '02') {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTACT_NUM }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 2 && this.numberRadioValue === '01') {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_USE_NUM }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 3) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_MAIL }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mailInputValue
            siriusParam.requestData.operationInfo.referenceConditionList[1].referenceConditionInfo.attributeValue = this.hostInputValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 4) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_ID }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 12) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_USE_NAME }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            await this.sirius(siriusParam, option)
          }
          this.resultShowCheck = true
          this.resultFrameId = 'AS020202'
        } else if (
          this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 3
        ) {
          let option = { optionId: OPTION_ID.AS010203, traceLog: false }
          if (this.mustSearchValue === 0) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CONTRACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === '') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 1 && this.alternateValue === 6) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA_PREFECTURE
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.alternateTwoValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 1 && this.alternateValue === 2) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA_ZIPCODE
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.alternateInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 2 && this.numberRadioValue === '01') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_USE_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 2 && this.numberRadioValue === '02') {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CONTACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 3) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_MAIL
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mailInputValue
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[2].zks = this.hostInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 4) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_ID
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 13) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_IP
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 14) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_50NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 15) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CODE_CONTRACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 16) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CODE_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[1].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          if (this.mustSearchValue === 17) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_OCN_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }

          this.resultShowCheck = true
          this.resultFrameId = 'AS020203'
          // TO AS020300
        } else if (
          this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 0
        ) {
          let option = { optionId: OPTION_ID.AS010300, traceLog: false }
          let param = { ...DETAIL_SEARCH_CONSTANTS.ACCEL_CONTRACT }
          param.telNo = this.mustInputValue
          let flag = param.telNo.slice(0, 3)
          if (
            flag === '050' ||
            flag === '070' ||
            flag === '080' ||
            flag === '090'
          ) {
            param.telNo = param.telNo.substr(2)
          }
          param.srchDate = moment().format(DateConstants.YYYYMMDD)
          let accConParam = {
            accSrvcIdInfoSrchReq: param
          }
          this.accelContract(accConParam, option)
          this.resultShowCheck = true
          this.resultFrameId = 'AS020300'
          // TO AS020301
        } else if (
          this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 1
        ) {
          let option = { optionId: OPTION_ID.AS010301, traceLog: false }
          if (this.mustSearchValue === 1) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_NAMEKANA
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 0) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_CONTRACT_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            try {
              LoadingUtil.show()
              this.viewParam = {}
              const res = await nbGenericIf(nbGenericParam, option)
              if (res.data.ComResHdrAre && res.data.ComResHdrAre.Imp === 'I') {
                this.$set(
                  this.viewParam,
                  'nbGenericIfData',
                  res.data.SysMsgAre.contractInfoSrchResNB
                    .reqInquireReqGenericIfResponse[0].return
                )
              } else {
                let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTRACT }
                siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                  DateConstants.YYYYMMDDHHmmss
                )
                siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
                await this.sirius(siriusParam, option)
              }
            } catch (error) {
              LoadingUtil.hidden()
              let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_CONTRACT }
              siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
                DateConstants.YYYYMMDDHHmmss
              )
              siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
              await this.sirius(siriusParam, option)
            }
            LoadingUtil.hidden()
          }
          this.resultShowCheck = true
          this.resultFrameId = 'AS020301'
          // TO AS020302
        } else if (
          this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 2
        ) {
          let option = { optionId: OPTION_ID.AS010302, traceLog: false }
          if (this.mustSearchValue === 0) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_FEE_NUM }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 1) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_NAMEKANA }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            await this.sirius(siriusParam, option)
          }
          if (this.mustSearchValue === 12) {
            let siriusParam = { ...DETAIL_SEARCH_CONSTANTS.SIRIUS_USE_NAME }
            siriusParam.requestData.commonHeaderInfo.otherSystemSendTime = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            siriusParam.requestData.operationInfo.searchRangeTypeList[0].searchRangeTypeValue = this.masterRadioValue
            siriusParam.requestData.operationInfo.referenceConditionList[0].referenceConditionInfo.attributeValue = this.mustInputValue
            await this.sirius(siriusParam, option)
          }
          this.resultFrameId = 'AS020302'
          // TO AS020303
        } else if (
          this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 3
        ) {
          let option = { optionId: OPTION_ID.AS010303, traceLog: false }
          if (this.mustSearchValue === 0) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_FEE_NUM
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          if (this.mustSearchValue === 1) {
            let nbGenericParam = {
              ...DETAIL_SEARCH_CONSTANTS.NB_GENERIC_FEE_NAMEKANA
            }
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].stcCommonHeader[0].strTstSndNcj = moment().format(
              DateConstants.YYYYMMDDHHmmss
            )
            nbGenericParam.contractInfoSrchReqNB.reqInquireReqGenericIf[0].stcInquireReqGenericIfReq[0].ifDto.ifDtoLst[0].zks = this.mustInputValue
            await this.nbGeneric(nbGenericParam, option)
          }
          this.resultShowCheck = true
          this.resultFrameId = 'AS020303'
          // TO AS020304
        } else if (
          this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 4
        ) {
          let param = { ...DETAIL_SEARCH_CONSTANTS.BILLING_ID_CONTRACT }
          param.variousId = this.mustInputValue
          if (this.alternateValue === 8) {
            param.chrgMonth = this.alternateInputValue
          }
          param.srchDate = moment().format(DateConstants.YYYYMMDD)
          let billingid = {
            accTelNoGetRequestSrchVer2Req: param
          }
          let option = { optionId: OPTION_ID.AS010304, traceLog: false }
          try {
            LoadingUtil.show()
            this.viewParam = {}
            const res = await getAccelBillingidContractIdList(billingid, option)
            if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
              this.$set(
                this.viewParam,
                'accelBillingIdContractIdData',
                res.data.SysMsgAre.accTelNoGetRequestSrchVer3Res.soEachDataArea
              )
            }
          } catch (error) {
            LoadingUtil.hidden()
            if (error.code === GlobalConstants.ECONNABORTED) {
              this.errorMsg = E_WEB1002
              this.errorCode = '-'
            } else {
              this.errorMsg = error.response.data.errorMessage
              this.errorCode = error.response.data.errorCode
            }
            this.$set(this.viewParam, 'errorMsg', this.errorMsg)
            this.$set(this.viewParam, 'errorCode', this.errorCode)
          }
          LoadingUtil.hidden()
          this.resultShowCheck = true
          this.resultFrameId = 'AS020304'
          // TO AS020502
        } else if (this.searchObjectValue === 3) {
          let option = { optionId: OPTION_ID.AS010500, traceLog: false }
          // /billing/accel-receipt-status api
          let AccParam = { ...DETAIL_SEARCH_CONSTANTS.RECEIPT_STATUS }
          AccParam.billingId = this.mustInputValue
          let recptStatusSrchAccReq = {
            recptStatusSrchAccReq: AccParam
          }
          // /billing/accel-billing-detail-by-billingid api
          let param = { ...DETAIL_SEARCH_CONSTANTS.BILLING_DETAIL }
          param.billingId = this.mustInputValue
          let billParam = {
            billDetailSrchAccReq: param
          }
          try {
            LoadingUtil.show()
            this.viewParam = {}
            const recptStatusSrchAccRes = await getAccelReceiptStatus(
              recptStatusSrchAccReq,
              option
            )
            if (
              recptStatusSrchAccRes.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000'
            ) {
              param.billGrp =
                recptStatusSrchAccRes.data.SysMsgAre.recptStatusSrchAccRes.billGrp
              param.billClass =
                recptStatusSrchAccRes.data.SysMsgAre.recptStatusSrchAccRes.billClass
            }
          } catch (error) {
            LoadingUtil.hidden()
            if (error.code === GlobalConstants.ECONNABORTED) {
              this.errorMsg = E_WEB1002
              this.errorCode = '-'
            } else {
              this.errorMsg = error.response.data.errorMessage
              this.errorCode = error.response.data.errorCode
            }
            this.$set(this.viewParam, 'errorMsg', this.errorMsg)
            this.$set(this.viewParam, 'errorCode', this.errorCode)
          }
          LoadingUtil.hidden()
          try {
            LoadingUtil.show()
            this.viewParam = {}
            if (param.billGrp !== '') {
              const res = await getAccelBillingDetailByBillingid(
                billParam,
                option
              )
              if (res.data.ComResHdrAre.TmlHyjMsgId === 'IScs4000') {
                this.$set(
                  this.viewParam,
                  'billDetail',
                  res.data.SysMsgAre.billDetailSrchBillingIdAccRes.guiBillGrp
                )
                this.viewParam['billDetail'].forEach(element => {
                  element.id = this.mustInputValue
                })
              }
            }
          } catch (error) {
            LoadingUtil.hidden()
            if (error.code === GlobalConstants.ECONNABORTED) {
              this.errorMsg = E_WEB1002
              this.errorCode = '-'
            } else {
              this.errorMsg = error.response.data.errorMessage
              this.errorCode = error.response.data.errorCode
            }
            this.$set(this.viewParam, 'errorMsg', this.errorMsg)
            this.$set(this.viewParam, 'errorCode', this.errorCode)
          }
          LoadingUtil.hidden()
          this.resultShowCheck = true
          this.resultFrameId = 'AS020502'
        }
      }
    },
    // IEでpulldownを操作すると、Textboxのようにカーソル「｜」が表示されません。
    inputBlur(flag, refName) {
      this.$refs[refName].$children[0].blur()
    }
  }
}
