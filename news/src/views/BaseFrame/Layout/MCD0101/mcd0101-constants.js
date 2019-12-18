// オーダ
export const ORDER = '01'
// マスタ
export const MAST = '02'
// 履歴
export const HISTORY = '03'
// 進捗
export const SINNPO = '04'
// ステータス_契約者
export const USING = '20'
export const ENDUSE = '50'
// 請求情報
export const REQUEST_INFO = '請求情報'
// 契約情報
export const CONTRACT_INFO = '契約情報'
// 収納情報
export const INTAKE_INFO = '収納情報'

export const K0000023 = 'K0000023'

export const K0000024 = 'K0000024'

export const K0000026 = 'K0000026'

export const K0000001 = 'K0000001'

export const K0000003 = 'K0000003'

export const K0000007 = 'K0000007'

export const K0000008 = 'K0000008'

export const K0000009 = 'K0000009'

export const K0000010 = 'K0000010'

export const K0000011 = 'K0000011'

export const K0000012 = 'K0000012'

export const K0000013 = 'K0000013'

export const K0000014 = 'K0000014'

export const K0000015 = 'K0000015'

export const K0000016 = 'K0000016'

export const K0000017 = 'K0000017'

export const K0000018 = 'K0000018'

export const S0000100 = 'S0000100'

export const S0000005 = 'S0000005'

export const S0000006 = 'S0000006'

export const S0000107 = 'S0000107'

export const J0000301 = 'J0000301'

export const J0000302 = 'J0000302'

export const J0000303 = 'J0000303'

export const J0000101 = 'J0000101'

export const J0000102 = 'J0000102'

export const J0000103 = 'J0000103'

export const J0000104 = 'J0000104'

export const J0000105 = 'J0000105'

export const J0000106 = 'J0000106'

export const J0000107 = 'J0000107'

export const J0000108 = 'J0000108'

export const J0000109 = 'J0000109'

export const J0000201 = 'J0000201'

export const MCD01NAME = '法人サービス'

// バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
export const ACCEL_EKIMU_REQ = {
  accelServiceKindCode: ''
}

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
// ACCEL収納状況照会パラメータ
export const RECPT_STATUS_SRCH_ACC_REQ = {
  billingId: ''
}
// ACCEL_SO系請求情報照会(各種ID指定)パラメータ
export const ACCEL_SO_BILLING_BY_IDS_PARAM = {
  ekimuCode: '',
  srvcKindCode: '  ',
  variousId: '',
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
// SIRIUS情報取得
export const SIRIUS_PARAM = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '20181119171850',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '02',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: '01'
        },
        {
          searchRangeTypeValue: '02'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '1'
        }
      ],
      chargeInfoReturnFlag: '1',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'contractNumber',
            attributeValue: '',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}
// OCN請求情報一覧照会API取得
export const OCN_BILLING_LIST_PARAM = { contractId: '' }
// OCN請求内訳照会API取得
export const OCN_BILLING_DETAIL_PARAM = {
  srvcId: '',
  billMonth: 0,
  devideNo: 0,
  periodicDevideIndicate: '',
  searchBillingId: ''
}
// OCN請求科目情報照会API取得
export const OCN_BILLING_CATEGORY_PARAM = {
  contractId: '',
  billMonth: 0,
  devideNo: 0,
  periodicDevideIndicate: '',
  searchBillingId: ''
}
// OCN投入履歴情報照会API取得
export const OCN_ORDER_HISTORY_PARAM = {
  contractId: '',
  periodicDevideIndicate: '',
  searchBillingId: ''
}

// 役務一覧照会
export const SERVICE_LIST_PARAM = {
  srchObjectDate: '',
  commonCustId: '',
  contractId: '',
  billingId: '',
  custId: '',
  accCustId: ''
}
