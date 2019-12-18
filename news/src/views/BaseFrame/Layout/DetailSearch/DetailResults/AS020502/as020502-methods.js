export default {
  methods: {
    handleFilter(param) {
      if (!param) {
        this.dateList = this.viewParam.billDetail.slice(0)
        this.dateList.forEach(item => {
          if (
            item.oneBillingDist === ''
          ) {
            item.newShow = '　'
          } else if (item.oneBillingDist === '0') {
            item.newShow = '無'
          } else if (
            item.oneBillingDist === '1' &&
            item.oneBillingParentChildDistName.length > 0
          ) {
            item.newShow = '有' + '－' + item.oneBillingParentChildDistName
          }
        })
      }
      this.pageData()
    }
  }
}
