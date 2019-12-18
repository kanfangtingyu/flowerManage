import * as UserInfo from '@/utils/user-info'
export default {
  methods: {
    // データの初期化とデータのフィルター処理
    handleFilter(param) {
      if (!param || param[0].id === 100) {
        this.dateList = this.viewParam.customerBusinessData.slice()
      } else if (param[0].id === 0) {
        this.dateList = this.viewParam.customerBusinessData.filter(
          item => item.domestFrgnTyp === '1' && item.corpOrPersTyp === '2'
        )
      } else if (param[0].id === 1) {
        this.dateList = this.viewParam.customerBusinessData.filter(
          item => item.domestFrgnTyp === '1' && item.corpOrPersTyp === '1'
        )
      } else if (param[0].id === 2) {
        this.dateList = this.viewParam.customerBusinessData.filter(
          item => item.domestFrgnTyp === '2'
        )
      }
      this.authFlg = this.auth()
      this.pageData()
    },
    // 顧客層参照権限がない場合はリンク非表示。
    auth() {
      let userInfo = UserInfo.get()
      if (this.dateList.length === 0) {
        return
      }
      let segment = this.dateList[0].custClassCode - 1
      if (userInfo === null) {
        return false
      }
      try {
        if (((userInfo.IDD_CUSTOMER_LAYER >>> segment) & 1) === 1) {
          return true
        }
      } catch {}
      return false
    },
    birth(birthFoundDate, birth, domestFrgnTyp, corpOrPersTyp, foundDate) {
      if (birthFoundDate) {
        return this.custDataLabel(birthFoundDate)
      } else {
        if (domestFrgnTyp === '1' && corpOrPersTyp === '2') {
          return this.custDataLabel(birth)
        } else {
          return this.custDataLabel(foundDate)
        }
      }
    }
  }
}
