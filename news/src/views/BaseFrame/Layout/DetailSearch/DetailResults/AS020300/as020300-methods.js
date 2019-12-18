export default {
  methods: {
    // データの初期化とデータのフィルター処理
    handleFilter(param) {
      if (!param) {
        this.dateList = this.viewParam.accelContractData.slice(0)
      }
      this.pageData()
    }
  }
}
