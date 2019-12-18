/**
 * Informationの処理方法
 * @module /src/views/BaseFrame/Layout/Information/information-methods.js
 * @author IBM CIC
 */
export default {
  methods: {
    initView(customerInfo, customerInfoError) {
      this.customerInfo = customerInfo
      if (!customerInfoError) {
        this.customerInfoError = {
          code: '',
          message: ''
        }
      } else {
        this.customerInfoError = customerInfoError
      }
    },
    commonItemCheck(commonItem) {
      if (
        commonItem === null ||
        commonItem.length === 0 ||
        commonItem === ' '
      ) {
        return '　'
      } else {
        return commonItem
      }
    },
    commonIdCheck(commonItem) {
      if (
        commonItem === null ||
        commonItem.length === 0 ||
        commonItem === ' '
      ) {
        return '　'
      } else {
        let commonIdLeft = commonItem.slice(0, 3)
        let commonIdMid = commonItem.slice(3, 7)
        let commonIdRight = commonItem.slice(7, 11)
        return commonIdLeft + '-' + commonIdMid + '-' + commonIdRight
      }
    },
    zipCheck(commonItem) {
      if (
        commonItem === null ||
        commonItem.length === 0 ||
        commonItem === ' '
      ) {
        return '　'
      } else {
        let commonIdLeft = commonItem.slice(0, 3)
        let commonIdMid = commonItem.slice(3, 7)
        return commonIdLeft + '-' + commonIdMid
      }
    },
    dateCheck(commonItem) {
      if (
        commonItem === null ||
        commonItem.length === 0 ||
        commonItem === ' '
      ) {
        return '　'
      } else {
        let commonIdLeft = commonItem.slice(0, 4)
        let commonIdMid = commonItem.slice(4, 6)
        let commonIdRight = commonItem.slice(6, 8)
        return commonIdLeft + '/' + commonIdMid + '/' + commonIdRight
      }
    }
  }
}
