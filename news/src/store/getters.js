const getters = {
  comReqHdrAre: state => state.app.comReqHdrAre,
  expireTime: state => state.app.expireTime,
  mainCardList: state => state.app.mainCardList,
  subCardList: state => state.app.subCardList,
  customerInfo: state => state.app.customerInfo,
  accelCustomerInfo: state => state.app.accelCustomerInfo,
  searchInfo: state => state.app.searchInfo,
  contractInfoSrchResNB: state => state.app.contractInfoSrchResNB,
  loadingNum: state => state.app.loadingNum,
  userInfo: state => state.user.userInfo,
  srchRangeTypeInfo: state => state.app.srchRangeTypeInfo,
  contractNoneCard: state => state.app.contractNoneCard
}
export default getters
