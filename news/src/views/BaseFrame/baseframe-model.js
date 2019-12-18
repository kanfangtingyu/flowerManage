class BaseFrameModel {
  constructor() {
    this.dialogVisible = false
    this.mw01Visible = false
    this.subcardList = []
    this.mainCardList = []
    this.mcList = []

    this.mainCard = {}
    this.mcl0100EkimuListSrchRes = {}
    this.ocnBillingList = {}
    this.accelSoBillingByIds = {}
    this.ocnBillingDetail = {}

    this.mcd0101Sirius = {}
    this.mcd0101OcnBillingList = {}
    this.mcd0101AccelSoBillingByIds = {}
    this.mcd0101OcnBillingDetail = {}
    this.mcd0101OcnBillingCategory = {}
    this.mcd0101OcnOrderHistory = {}

    this.mcd0100CustomerBusiness = {}
    this.mcd0100AccelContract = {}
    this.mcd0100AccelCustomerBusiness = {}
    this.mcd0100AccelBillingDetailByLine = {}
    this.mcd0100AccelSoBillingByIds = {}
    this.mcd0100AccelDiscount = {}
    this.mcd0100AccelCallDetailSendingAddress = {}

    this.mcd0200AccelBillingDetailByLine = {}
    this.mcd0200AccelReceiptStatus = {}
    this.mcd0200AccelSoBillingByIds = {}
    this.mcd0200AccelBillingDetailByBillingid = {}
    this.mcd0200AccelBillingidContractIdList = {}

    this.customerInfo = { commonCustId: '顧客未設定', custName: '顧客未設定' }
    this.maincardheight = '0px'
  }
}
export default BaseFrameModel
