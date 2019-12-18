export const SEARCH_YOUTO_KBN = 'searchYoutoKbn'
export const FORM_CHECK = '入力形式が異なります'
export const RESULT_CHECK = '該当する結果は存在しません'
export const AUTHORITY_CHECK = '該当情報を参照する権限がありません'
export const MAX_TAB_COUNT = 6
export const TITLE_PW2 = '顧客切替の確認'
export const MESSAGE_PW2 =
  '表示中の顧客とは異なる顧客の情報を閲覧しようとしています。現在開いているカードはすべて閉じられますがよろしいですか？'
export const CUSTOMER_INFO_PARAM = {
  idpfCtrlConseNum: '000000',
  srchObjectDate: '',
  blockingRecNum: 1000,
  searchTypCode: '',
  commonCustId: '',
  accCustId: '',
  custId: '',
  srvcId: '',
  empireDbCode: '',
  tsrNo: '',
  dunsNo: '',
  custName: '',
  custNameKanaSglbyte: '',
  custNameKanaDblbyte: '',
  custNameKanaCoincidCondition: '2', // 照会時の一致条件は、前方一致固定
  zip: '',
  addrCode1: '',
  addrCode2: '',
  addrCode3: '',
  addrCode4: '',
  custClassCode: '',
  resbilBrnchCode: '',
  domestFrgnTyp: '',
  compEtcCode: ''
}

export const NB_GENERIC_IF = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcBusinessHeadInfo: [
              {
                strProcessIdent: 'string',
                strResultCd: 'string',
                strZksInfoSuu: 'string',
                seqStcZksInfo: [
                  {
                    strZksCod: 'string',
                    strZksChi: 'string'
                  }
                ]
              }
            ],
            ifDto: {
              kzKey: 'string',
              kzKCnt: 'string',
              iCondCnt: 'string',
              ifDtoLst: [
                {
                  srchKnd: 'string',
                  zksCd: 'string',
                  zks: 'string',
                  cCond: 'string'
                }
              ]
            },
            reqInfDto: {
              reqInfCnt: 'string',
              reqDtoLst: [
                {
                  reqInf: 'string',
                  reqItm: 'string',
                  reqItmVal: 'string'
                }
              ]
            }
          }
        ]
      }
    ]
  }
}

export const TRANSFORM_TO_NB_PARAM = {
  screenId: '', // 迁移元画面ID
  contractId: '' // 契约约番号
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
                  reqInf: '契約者契約情報',
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

export const DISUSED_SERVICE_LIST = {
  srchObjectDate: '',
  commonCustId: '',
  contractId: '',
  billingId: '',
  custId: '',
  accCustId: ''
}
