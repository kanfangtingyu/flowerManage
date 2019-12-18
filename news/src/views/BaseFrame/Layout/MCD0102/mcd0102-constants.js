// 役務一覧照会APIのリクエストオブジェクト
export const SERVICE_LIST_PARAM = {
  srchObjectDate: '',
  commonCustId: '',
  contractId: '',
  billingId: '',
  custId: '',
  accCustId: ''
}

// OCN請求情報一覧照会APIのリクエストオブジェクト
export const OCN_BILLING_LIST_PARAM = {
  contractId: ''
}

// OCN請求内訳照会APIのリクエストオブジェクト
export const OCN_BILLING_DETAIL_PARAM = {
  srvcId: '',
  billMonth: 0,
  devideNo: 0,
  periodicDevideIndicate: '',
  searchBillingId: ''
}

// OCN請求科目情報照会APIのリクエストオブジェクト
export const OCN_BILLING_CATEGORY_PARAM = {
  contractId: '',
  billMonth: 0,
  devideNo: 0,
  periodicDevideIndicate: '',
  searchBillingId: ''
}

// OCN投入履歴情報照会APIのリクエストオブジェクト
export const OCN_ORDER_HISTORY_PARAM = {
  contractId: '',
  periodicDevideIndicate: '',
  searchBillingId: ''
}

export const TRANSFORM_TO_NB_PARAM = {
  screenId: '', // 迁移元画面ID
  contractId: '' // 契约约番号
}

// nbGeneric
export const NB_GENERIC_PARAM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: '',
                strOperatorId: '',
                strOperatorGroupId: '',
                strServiceRsltCd: '',
                strServiceRsltDetailCd: ''
              }
            ],
            stcBusinessHeadInfo: [
              {
                strProcessIdent: '05',
                strResultCd: '',
                strZksInfoSuu: '0'
              }
            ],
            ifDto: {
              kzKey: '',
              kzKCnt: '',
              iCondCnt: '2',
              ifDtoLst: [
                {
                  srchKnd: '10',
                  zksCd: 's11002',
                  zks: '契約番号の値',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's11003',
                  zks: '99999999999999',
                  cCond: '0'
                }
              ]
            },
            reqInfDto: {
              reqInfCnt: '1',
              reqDtoLst: [
                {
                  reqInf: '契約請求情報',
                  reqItm: '',
                  reqItmVal: ''
                }
              ]
            }
          }
        ]
      }
    ]
  }
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

// ACCEL収納状況照会パラメータ
export const RECPT_STATUS_SRCH_ACC_REQ = {
  billingId: ''
}

// バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
export const ACCEL_EKIMU_REQ = {
  accelServiceKindCode: ''
}
