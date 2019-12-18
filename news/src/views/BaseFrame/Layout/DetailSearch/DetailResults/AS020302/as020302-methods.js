export default {
  methods: {
    // データの初期化とデータのフィルター処理
    handleFilter(val) {
      if (this.masterRadioCheck === false) {
        this.sCenterData = this.viewParam.siriusData.slice(0)
        if (this.sCenterData[0].searchResultDetailInfo.guidanceInfo) {
          this.dateList.splice(0, this.dateList.length)
          for (let y = 0; y < this.sCenterData.length; y++) {
            if (
              this.sCenterData[y].searchResultDetailInfo.searchRangeType ===
              '02'
            ) {
              this.dateList.push(this.sCenterData[y])
            }
          }
          if (this.dateList.length === 0) {
            for (let i = 0; i < this.sCenterData.length; i++) {
              if (
                this.sCenterData[i].searchResultDetailInfo.searchRangeType ===
                '01'
              ) {
                this.dateList.push(this.sCenterData[i])
              }
            }
          }
        } else {
          this.dateList = this.sCenterData.slice()
        }
      } else {
        this.dateList = this.viewParam.siriusData.slice(0)
      }

      let length = 0
      if (this.dateList) {
        length = this.dateList.length
      }
      if (val) {
        for (let i = length - 1; i >= 0; i--) {
          let data = this.dateList[i]
          let flg =
            data.searchResultDetailInfo.applyInfo.contractInfo.contractNumber.search(
              val[1].value
            ) < 0
          if (flg) {
            this.dateList.splice(i, 1)
          }
        }
      }
      this.pageData()
    },
    addressExist(address) {
      let centerArr = []
      address.forEach(item => {
        if (item.addressInfo.addressType === 'STB') {
          centerArr.push(item)
        }
      })
      if (centerArr.length > 0) {
        return this.addressFormat(
          centerArr[0].addressInfo.address,
          centerArr[0].addressInfo.banchi1,
          centerArr[0].addressInfo.banchi2,
          centerArr[0].addressInfo.banchi3,
          centerArr[0].addressInfo.building1,
          centerArr[0].addressInfo.building2,
          centerArr[0].addressInfo.building3,
          centerArr[0].addressInfo.samakata
        )
      } else {
        return ''
      }
    }
  }
}
