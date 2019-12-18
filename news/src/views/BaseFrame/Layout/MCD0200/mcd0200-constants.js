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

// ACCEL収納状況照会APIのリクエストオブジェクト
export const ACCEL_RECEIPT_STATUS_PARAM = {
  billingId: ''
}

// ACCEL_SO系請求情報照会(各種ID指定)APIのリクエストオブジェクト
export const ACCEL_SO_BILLING_BY_IDS_PARAM = {
  ekimuCode: '',
  srvcKindCode: '  ',
  variousId: '',
  srchDate: ''
}

// ACCELビリング配下契約ID照会APIのリクエストオブジェクト
export const ACCEL_BILLINGID_CONTRACT_ID_LIST_PARAM = {
  ekimuCode: '',
  srvcKindCode: '  ',
  variousId: '',
  srchDate: '',
  chrgMonth: ''
}

// ACCEL請求内訳照会（ビリングID指定）APIのリクエストオブジェクト
export const ACCEL_BILLING_DETAIL_BY_BILLINGID_PARAM = {
  billingId: '',
  contractId: '',
  bandleKindCode: '',
  lineKind: '',
  variousContractDistCode: '',
  searchPtnNo: '',
  srchRqstYearMonth: '',
  srchRqstBillCnt: '',
  srchPtn: '1',
  billClass: '',
  billGrp: '',
  indicateTyp: '0'
}

// 役務一覧照会APIのリクエストオブジェクト
export const SERVICE_LIST_PARAM = {
  srchObjectDate: '',
  commonCustId: '',
  contractId: '',
  billingId: '',
  custId: '',
  accCustId: ''
}

export const GET_CODE_NAME = {
  accelServiceClass: '',
  accelServiceSubClass: ''
}
