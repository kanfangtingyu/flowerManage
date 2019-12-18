class Mcd0100Model {
  constructor() {
    // ACCEL顧客基本情報照会
    this.customerBusiness = {}
    // ACCEL契約番号情報照会
    this.accelContract = {}
    // ACCEL請求内訳照会（回線指定）
    this.accelBillingDetailByLine = {}
    // ACCEL_SO系請求情報照会(各種ID指定)
    this.accelSoBillingByIds = {}
    // ACCEL収納状況照会
    this.recptStatusSrchAccRes = {}
    // ACCEL割引情報照会
    this.accelDiscount = {}
    // ACCEL通話明細送付先照会
    this.accelCallDetailSendingAddress = {}
    // ACCEL収納状況照会
    this.accelReceiptStatusRes = {}
  }
}
export default Mcd0100Model
