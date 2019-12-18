export default {
  methods: {
    // データの初期化とデータのフィルター処理
    handleFilter(val) {
      if (this.viewParam.siriusData && this.viewParam.siriusData.length > 0) {
        this.addDataSirius(this.viewParam.siriusData)
      }
      if (
        this.viewParam.nbGenericIfData &&
        this.viewParam.nbGenericIfData.length > 0
      ) {
        this.addDataNB(this.viewParam.nbGenericIfData)
      }
      this.centerData = this.dateList.slice(0)
      let length = this.centerData.length
      if (val) {
        for (let i = length - 1; i >= 0; i--) {
          let data = this.centerData[i]
          let flg = data.id.search(val[1].value) < 0
          if (flg) {
            this.centerData.splice(i, 1)
          }
        }
        this.dateList = this.centerData.slice(0)
      }
      this.pageData()
    },
    // Siriusのデータを追加する
    addDataSirius(value) {
      let newArr = []
      if (value.length > 0) {
        this.sCenterData = this.viewParam.siriusData.slice(0)
        if (this.masterRadioCheck === false) {
          if (this.sCenterData[0].searchResultDetailInfo.guidanceInfo) {
            newArr.splice(0, newArr.length)
            for (let y = 0; y < this.sCenterData.length; y++) {
              if (
                this.sCenterData[y].searchResultDetailInfo.searchRangeType ===
                '02'
              ) {
                newArr.push(this.sCenterData[y])
              }
            }
            if (newArr.length === 0) {
              for (let y = 0; y < this.sCenterData.length; y++) {
                if (
                  this.sCenterData[y].searchResultDetailInfo.searchRangeType ===
                  '01'
                ) {
                  newArr.push(this.sCenterData[y])
                }
              }
            }
          } else {
            newArr = this.sCenterData.slice(0)
          }
        } else {
          newArr = this.sCenterData.slice(0)
        }
        for (let i = 0; i < newArr.length; i++) {
          let newoM = newArr[i].searchResultDetailInfo.searchRangeType
          let newid =
            newArr[i].searchResultDetailInfo.applyInfo.contractInfo
              .contractNumber
          let newQm =
            newArr[i].searchResultDetailInfo.applyInfo.contractCustomerInfo
              .contractCustomerName
          let newAd = this.addressExist(
            newArr[i].searchResultDetailInfo.applyInfo.addressList
          )
          let newEy =
            newArr[i].searchResultDetailInfo.applyInfo.contractInfo
              .contractEndDate
          let newSama =
            newArr[i].searchResultDetailInfo.applyInfo.productList[0]
              .productInfo.productSummaryName
          let addData = {}
          addData.oM = newoM
          addData.id = newid
          addData.Ym = '法人サービス'
          addData.Qm = newQm
          addData.Ad = newAd
          addData.Ey = newEy
          addData.SaMa = newSama
          this.dateList.push(addData)
        }
      }
    },
    // NB基盤のデータを追加する
    addDataNB(value) {
      this.dateList.splice(0, this.dateList.length)
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          let newid = this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
            .corCotDtoLst[0].kyNm
          let newQm = this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
            .corCotDtoLst[0].kySMei
          let newAd = this.addressFormatNB(
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySTMei,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySSMei,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySOMei,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySAMei,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySBc1,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySBc2,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySBc3,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySTm1,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySTm2,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySTm3,
            this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
              .corCotDtoLst[0].kySSkt
          )
          let newEy = this.viewParam.nbGenericIfData[i].inqResDto.corCotIfDto
            .corCotDtoLst[0].kyEdYmd
          let addData = {}
          addData.id = newid
          addData.Ym = 'コンシューマ向けOCN'
          addData.Qm = newQm
          addData.Ad = newAd
          addData.Ey = newEy
          addData.SaMa = ''
          this.dateList.push(addData)
        }
      }
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
