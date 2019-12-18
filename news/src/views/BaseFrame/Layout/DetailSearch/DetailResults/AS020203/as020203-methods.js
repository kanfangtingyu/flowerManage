export default {
  methods: {
    // データの初期化とデータのフィルター処理
    handleFilter(val) {
      this.dateList = this.viewParam.nbGenericIfData.slice()
      let length = this.dateList.length
      if (val) {
        for (let i = length - 1; i >= 0; i--) {
          let data = this.dateList[i]
          let flg =
            data.inqResDto.corCotIfDto.corCotDtoLst[0].kyNm.search(
              val[1].value
            ) < 0
          if (flg) {
            this.dateList.splice(i, 1)
          }
        }
      }
      this.pageData()
    }
  }
}
