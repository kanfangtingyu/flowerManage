import { getCodeName } from '@/api/get-accel-product-name'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as LoadingUtil from '@/utils/loading-util'
export default {
  methods: {
    handleFilter(param) {
      if (!param) {
        this.centerData = []
        this.viewParam.accelBillingIdContractIdData.forEach(ele => {
          ele.variousIdListInfo.forEach(ele => {
            ele.subPdInfo.forEach((ele, index) => {
              let eleData = {
                payNo: '',
                pdDetailClassCode: ''
              }
              if (ele.payNo.length > 0) {
                eleData.payNo = ele.payNo
                eleData.pdDetailClassCode = ele.pdDetailClassCode
                this.centerData.push(eleData)
                this.changeName(ele.pdDetailClassCode, index)
              }
            })
          })
        })
        this.dateList = this.centerData.slice()
      } else {
        // 指定なし
        if (param[0].id === 100 || Object.keys(param[0]).length === 0) {
          this.dateList = this.centerData.slice()
        }
        // 役務コード
        if (param[0].ekimuCode.length > 0) {
          this.dateList = this.centerData.filter(
            item => item.pdDetailClassCode.slice(0, 2) === param[0].ekimuCode
          )
        }
        // サービス種類コード
        if (param[0].srvcKindCode && param[0].srvcKindCode !== '  ') {
          this.dateList = this.centerData.filter(
            item => item.pdDetailClassCode.slice(2, 4) === param[0].srvcKindCode
          )
        }
        if (param[1]) {
          for (let i = this.dateList.length - 1; i >= 0; i--) {
            if (this.dateList[i].payNo.search(param[1].value) < 0) {
              this.dateList.splice(i, 1)
            }
          }
        }
      }
      this.pageData()
    },
    async changeName(val, i) {
      let ekimuCode = val.slice(0, 2)
      let srvKindCode = val.slice(2, 4)
      this.centerData[i].ekimuCode = ekimuCode
      if (ekimuCode === '01') {
        this.centerData[i].pdDetailClassName = '電話サービス'
      } else {
        let option = { optionId: OPTION_ID.AS020304, traceLog: false }
        let param = {
          accelServiceClass: ekimuCode,
          accelServiceSubClass: srvKindCode
        }
        let req = null
        try {
          LoadingUtil.show()
          req = await getCodeName(param, option)
        } catch (error) {
          LoadingUtil.hidden()
          throw error
        }
        LoadingUtil.hidden()
        this.centerData[i].pdDetailClassName = req.data.NAME
        this.pageData()
      }
    }
  }
}
