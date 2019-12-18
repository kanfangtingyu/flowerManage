export const CORP = '1'

export const PERS = '2'

export const ZERO = '0'

export const MCD04NAME = '電話サービス'

export const EKIMUCODE = '01'

// ACCEL原簿照会パラメータ
export const ACC_CUST_LIST_SRCH_REQ = {
  reqCnt: '',
  extcPtn: '',
  searchKeyKind: '',
  searchKey: '',
  searchDate: '',
  follLineRtnReqr: '',
  continueInfo: [
    {
      continueEntiClass: '',
      continueSearchKey: '',
      continueSearchKey2: ''
    }
  ],
  spcfyDateTimePointSrchFlg: '',
  spare1: ''
}

// ACCEL契約番号情報照会パラメータ
export const ACCEL_CONTRACT_PARAM = {
  telNo: '',
  basicReqrFlg: '',
  variousIdReqrFlg: '',
  publishReqrFlg: '',
  srchDate: ''
}
// ACCEL請求内訳照会（回線指定）パラメータ
export const ACCEL_BILLING_DETAIL_BY_LINE_PARAM = {
  billingId: '',
  contractId: '',
  bandleKindCode: '',
  lineKind: '',
  variousContractDistCode: '',
  searchPtnNo: '',
  srchRqstYearMonth: null,
  srchRqstBillCnt: null,
  srchPtn: '',
  billClass: '',
  billGrp: '',
  indicateTyp: ''
}
// ACCEL_SO系請求情報照会(各種ID指定)パラメータ
export const ACCEL_SO_BILLING_BY_IDS_PARAM = {
  ekimuCode: '',
  srvcKindCode: '  ',
  variousId: '',
  srchDate: ''
}
// ACCEL収納状況照会パラメータ
export const RECPT_STATUS_SRCH_ACC_REQ = {
  billingId: ''
}
// ACCEL割引情報照会パラメータ
export const ACCEL_DISCOUNT_PARAM = {
  telNo: '',
  SrchDate: ''
}
// ACCEL通話明細送付先照会パラメータ
export const ACCEL_CALL_DETAIL_SENDING_ADDRESS_PARAM = {
  telNo: '',
  srchDate: ''
}

// ACCEL候補顧客一覧照会パラメータ
export const ACCEL_CUSTOMER_LIST_PARAM = {
  searchTypCode: '',
  commonCustId: '',
  custServiceId: '',
  custKanaAddrSearch: [
    {
      searchObjectTypCode: '',
      custNameSearchConditionCode: '',
      custNameSglbyteKana: '',
      custNameDblbyteKana: '',
      addrCodeValidplaceNum: 0,
      addrCode: ''
    }
  ],
  searchDate: ''
}
