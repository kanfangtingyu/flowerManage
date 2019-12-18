class mcd0101Model {
  constructor() {
    this.keiyakuInfo = []
    this.sirius = {}
    this.ocnBillingList = {}
    this.accelSoBillingByIds = {}
    this.ocnBillingDetail = {}
    this.ocnBillingCategory = {}
    this.ocnOrderHistory = {}
    this.accelBillingDetailByLine = {}
    this.accelReceiptStatusRes = {}
    // 商品最終変更年月日
    this.productLastChangeDate = ''
    // 注釈文言の表示フラグ
    this.messageDisplayFlg = ''
  }
}
export default mcd0101Model
