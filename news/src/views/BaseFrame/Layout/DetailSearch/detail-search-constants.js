// 照会対象Option-------------------------------
export const SEARCH_OBJECT_LIST = [
  {
    value: 0,
    label: '顧客基本情報',
    authority: 'CUSTOMER'
  },
  {
    value: 1,
    label: '契約情報照会',
    authority: 'CONTRACT'
  },
  {
    value: 2,
    label: '料金情報照会',
    authority: 'BILLING_TEL_OCN'
  },
  {
    value: 3,
    label: 'ビリングID（ACCEL）',
    authority: 'BILLING_TEL_OCN'
  }
]
// 照会対象2のOptions---------------------------
// 照会対象は契約情報照会の場合
export const CONTRACT_LIST = [
  {
    value: 0,
    label: '電話サービス',
    authority: 'CONTRACT_TEL'
  },
  {
    value: 1,
    label: 'OCN',
    authority: 'CONTRACT_OCN'
  },
  {
    value: 2,
    label: 'OCN（B向け）',
    authority: 'CONTRACT_BOCN'
  },
  {
    value: 3,
    label: 'OCN（C向け）',
    authority: 'CONTRACT_COCN'
  }
]
// 照会対象は料金情報照会の場合
export const FEE_LIST = [
  {
    value: 0,
    label: '電話サービス'
  },
  {
    value: 1,
    label: 'OCN'
  },
  {
    value: 2,
    label: 'OCN（B向け）'
  },
  {
    value: 3,
    label: 'OCN（C向け）'
  },
  {
    value: 4,
    label: '指定なし'
  }
]
// 必須条件のOptions---------------------------
export const MUST_SEARCH_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  },
  {
    value: 2,
    label: '電話番号'
  },
  {
    value: 3,
    label: 'メールアドレス'
  },
  {
    value: 4,
    label: '認証ID'
  },
  {
    value: 5,
    label: '顧客名カナ'
  },
  {
    value: 6,
    label: '顧客名（漢字/英字）'
  },
  {
    value: 7,
    label: '帝国データバンク企業番号'
  },
  {
    value: 8,
    label: 'ビリングID（ACCEL）'
  },
  {
    value: 9,
    label: 'ACCELカスタマID'
  },
  {
    value: 11,
    label: '共通顧客ID'
  },
  {
    value: 12,
    label: '使用ドメイン名'
  },
  {
    value: 13,
    label: 'マイアドレスプラス（汎用IP）'
  },
  {
    value: 14,
    label: '050電話番号'
  },
  {
    value: 15,
    label: 'ドコモ光契約者携帯電話番号'
  },
  {
    value: 16,
    label: 'ドコモ課金先番号'
  },
  {
    value: 17,
    label: 'OCN回収代行課金先番号'
  }
]
// 照会対象は顧客基本情報の場合
export const CUSTOMER_MUST_LIST = [
  {
    value: 11,
    label: '共通顧客ID'
  },
  {
    value: 7,
    label: '帝国データバンク企業番号'
  },
  {
    value: 8,
    label: 'ビリングID（ACCEL）'
  },
  {
    value: 9,
    label: 'ACCELカスタマID'
  },
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 5,
    label: '顧客名カナ'
  },
  {
    value: 6,
    label: '顧客名（漢字/英字）'
  }
]
// 照会対象２は電話サービスの場合
export const PHONE_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  }
]
// 照会対象は契約情報照会、照会対象２はOCNの場合
export const CONTRACT_OCN_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  },
  {
    value: 2,
    label: '電話番号'
  },
  {
    value: 3,
    label: 'メールアドレス'
  },
  {
    value: 4,
    label: '認証ID'
  }
]
// 照会対象は契約情報照会、照会対象２はOCN（B向け）の場合
export const CONTRACT_OCNB_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  },
  {
    value: 2,
    label: '電話番号'
  },
  {
    value: 3,
    label: 'メールアドレス'
  },
  {
    value: 4,
    label: '認証ID'
  },
  {
    value: 12,
    label: '使用ドメイン名'
  }
]
// 照会対象は契約情報照会、照会対象２はOCN（C向け）の場合
export const CONTRACT_OCNC_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  },
  {
    value: 2,
    label: '電話番号'
  },
  {
    value: 3,
    label: 'メールアドレス'
  },
  {
    value: 4,
    label: '認証ID'
  },
  {
    value: 13,
    label: 'マイアドレスプラス（汎用IP）'
  },
  {
    value: 14,
    label: '050電話番号'
  },
  {
    value: 15,
    label: 'ドコモ光契約者携帯電話番号'
  },
  {
    value: 16,
    label: 'ドコモ課金先番号'
  },
  {
    value: 17,
    label: 'OCN回収代行課金先番号'
  }
]
// 照会対象は料金情報照会、照会対象２はOCNやOCN（C向け）の場合
export const FEE_OCN_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  }
]
// 照会対象は料金情報照会、照会対象２はOCN（B向け）の場合
export const FEE_OCNB_MUST_LIST = [
  {
    value: 0,
    label: '契約番号'
  },
  {
    value: 1,
    label: '契約者名カナ'
  },
  {
    value: 12,
    label: '使用ドメイン名'
  }
]
// 照会対象は料金情報照会、照会対象2は指定なしの場合
// 照会対象はビリングID（ACCEL）の場合
export const ID_MUST_LIST = [
  {
    value: 8,
    label: 'ビリングID（ACCEL）'
  }
]
// 任意条件のOptions---------------------------
export const ALTERNATE_LIST = [
  {
    value: '',
    label: 'なし'
  },
  {
    value: 0,
    label: '顧客名（漢字/英字）'
  },
  {
    value: 1,
    label: '住所'
  },
  {
    value: 2,
    label: '郵便番号'
  },
  {
    value: 3,
    label: '顧客状態'
  },
  {
    value: 4,
    label: '顧客名カナ'
  },
  {
    value: 5,
    label: '照会年月日'
  },
  {
    value: 6,
    label: '都道府県'
  },
  {
    value: 7,
    label: '番号種別'
  },
  {
    value: 8,
    label: '請求期別'
  }
]
// 照会対象は顧客基本情報、必須条件は顧客名カナの場合
export const CUS_NAMECANA_ALTERNATE_LIST = [
  {
    value: 0,
    label: '顧客名（漢字/英字）'
  },
  {
    value: 1,
    label: '住所'
  },
  {
    value: 2,
    label: '郵便番号'
  },
  {
    value: 3,
    label: '顧客状態'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 照会対象は顧客基本情報、必須条件は顧客名カナの場合
export const CUS_NAME_ALTERNATE_LIST = [
  {
    value: 4,
    label: '顧客名カナ'
  },
  {
    value: 1,
    label: '住所'
  },
  {
    value: 2,
    label: '郵便番号'
  },
  {
    value: 3,
    label: '顧客状態'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 照会対象は契約情報照会、照会対象２は電話サービス、必須条件は契約番号の場合
export const PHONE_CONTRACT_ALTERNATE_LIST = [
  {
    value: 5,
    label: '照会年月日'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 照会対象は契約情報照会、必須条件は契約者名カナの場合
export const OCN_NAMECANA_ALTERNATE_LIST = [
  {
    value: 6,
    label: '都道府県'
  },
  {
    value: 2,
    label: '郵便番号'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 照会対象は契約情報照会、必須条件は電話番号の場合
export const OCN_PHONE_ALTERNATE_LIST = [
  {
    value: 7,
    label: '番号種別'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 照会対象はビリングID（ACCEL）の場合
export const ID_ID_ALTERNATE_LIST = [
  {
    value: 8,
    label: '請求期別'
  },
  {
    value: '',
    label: 'なし'
  }
]
// 任意条件は顧客状態の場合
export const STATUS_LIST = [
  {
    value: 0,
    label: 'すべて'
  },
  {
    value: 1,
    label: '有効な顧客のみ'
  }
]
// siriusの入力(契約番号)
export const SIRIUS_CONTRACT = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '',
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

// siriusの入力(契約者名カナ)
export const SIRIUS_NAMEKANA = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: ''
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'contractCustomerNameKana',
            attributeValue: '',
            compareCondition: '01',
            matchCondition: '03'
          }
        }
      ]
    }
  }
}

// siriusの入力(契約者名カナ+都道府県)
export const SIRIUS_NAMEKANA_PREFECTURE = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '20181119171850',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '3',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'contractCustomerNameKana',
            attributeValue: 'カナの値',
            compareCondition: '01',
            matchCondition: '03'
          }
        },
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'addressType',
            attributeValue: 'STB',
            compareCondition: '01',
            matchCondition: '01'
          }
        },
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'addressCode',
            attributeValue: '都道府県の値',
            compareCondition: '01',
            matchCondition: '03'
          }
        }
      ]
    }
  }
}

// siriusの入力(契約者名カナ+郵便番号)
export const SIRIUS_NAMEKANA_ZIPCODE = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '20181119171850',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '3',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'contractCustomerNameKana',
            attributeValue: 'カナの値',
            compareCondition: '01',
            matchCondition: '03'
          }
        },
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'addressType',
            attributeValue: 'STB',
            compareCondition: '01',
            matchCondition: '01'
          }
        },
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'postalNumber',
            attributeValue: '郵便番号の値',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(連絡先電話番号)
export const SIRIUS_CONTACT_NUM = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'S0000109',
            attributeValue: '',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(利用電話番号)
export const SIRIUS_USE_NUM = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '20181119171850',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'S0000092',
            attributeValue: '',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(メールアドレス)
export const SIRIUS_MAIL = {
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
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '1'
        }
      ],
      chargeInfoReturnFlag: '1',
      referenceConditionCount: '2',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'S0002060',
            attributeValue: 'アカウントの値',
            compareCondition: '01',
            matchCondition: '01'
          }
        },
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'S0002061',
            attributeValue: 'ホスト名の値',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(認証ID)
export const SIRIUS_ID = {
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
          searchRangeTypeValue: 'オーダーマスタ区分'
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
            referenceAttributeCode: 'S0000101',
            attributeValue: '認証IDの値',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(使用ドメイン名)
export const SIRIUS_USE_NAME = {
  requestData: {
    commonHeaderInfo: {
      requestSystemId: '8022',
      requestUserId: 'IDPF web',
      otherSystemSendTime: '20181119171850',
      userId: 'T000335'
    },
    operationInfo: {
      globalType: '1',
      searchItemType: '01',
      searchRangeTypeList: [
        {
          searchRangeTypeValue: 'オーダーマスタ区分'
        }
      ],
      getInfoList: [
        {
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '0',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'S0000111',
            attributeValue: '使用ドメイン名の値',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// siriusの入力(契約番号（料金情報）)
export const SIRIUS_FEE_NUM = {
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
          workProgressmanageInfo: '0'
        }
      ],
      chargeInfoReturnFlag: '1',
      referenceConditionCount: '1',
      referenceConditionList: [
        {
          referenceConditionInfo: {
            referenceAttributeCode: 'contractNumber',
            attributeValue: '契约番号',
            compareCondition: '01',
            matchCondition: '01'
          }
        }
      ]
    }
  }
}

// searchLimit
export const SEARCH_LIMIT = {
  custName: '',
  custKana: '',
  prefecture: '',
  city: '',
  town: '',
  street: '',
  zipCode: '',
  validCustomerOnly: false
}
// customerBusiness
export const CUSTOMER_BUSINESS = {
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
// accelContract
export const ACCEL_CONTRACT = {
  telNo: '',
  basicReqrFlg: 1,
  variousIdReqrFlg: 0,
  publishReqrFlg: 0,
  srchDate: ''
}

// nbGeneric(契約番号)
export const NB_GENERIC_CONTRACT_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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

// nbGeneric(契約者名カナ)
export const NB_GENERIC_NAMEKANA = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's01004',
                  zks: '契約者名カナの値',
                  cCond: '1'
                },
                {
                  srchKnd: '00',
                  zksCd: 's11002',
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

// nbGeneric(契約者名カナ+都道府県)
export const NB_GENERIC_NAMEKANA_PREFECTURE = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
              iCondCnt: '3',
              ifDtoLst: [
                {
                  srchKnd: '10',
                  zksCd: 's01004',
                  zks: '契約者名カナの値',
                  cCond: '1'
                },
                {
                  srchKnd: '10',
                  zksCd: 's01006',
                  zks: '都道府県の値',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's11002',
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

// nbGeneric(契約者名カナ+郵便番号)
export const NB_GENERIC_NAMEKANA_ZIPCODE = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
              iCondCnt: '3',
              ifDtoLst: [
                {
                  srchKnd: '10',
                  zksCd: 's01004',
                  zks: '契約者名カナの値',
                  cCond: '1'
                },
                {
                  srchKnd: '10',
                  zksCd: 's01005',
                  zks: '郵便番号の値',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's11002',
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

// nbGeneric(利用電話番号)
export const NB_GENERIC_USE_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's11004',
                  zks: '利用電話番号の値',
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

// nbGeneric(連絡先電話番号)
export const NB_GENERIC_CONTACT_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99010',
                  zks: '連絡先電話番号の値',
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

// nbGeneric(メールアドレス)
export const NB_GENERIC_MAIL = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
              iCondCnt: '3',
              ifDtoLst: [
                {
                  srchKnd: '10',
                  zksCd: 's99001',
                  zks: '0000000009',
                  cCond: '0'
                },
                {
                  srchKnd: '10',
                  zksCd: 's99003',
                  zks: 'アカウントの値',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99004',
                  zks: 'ホスト名の値',
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

// nbGeneric(認証ID)
export const NB_GENERIC_ID = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99001',
                  zks: '0000000002',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99003',
                  zks: '認証IDの値',
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

// nbGeneric(マイアドレスプラス(汎用JP）)
export const NB_GENERIC_IP = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99001',
                  zks: '0000000007',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99003',
                  zks: '汎用JPドメインの値',
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

// nbGeneric(050電話番号)
export const NB_GENERIC_50NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99001',
                  zks: '0000000011',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99003',
                  zks: '050電話番号の値',
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

// nbGeneric(ドコモ光契約者携帯電話番号)
export const NB_GENERIC_CODE_CONTRACT_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99001',
                  zks: '0000000047',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99003',
                  zks: 'ドコモ光契約者携帯電話番号の値',
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

// nbGeneric(ドコモ課金先番号)
export const NB_GENERIC_CODE_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's99001',
                  zks: '0000000043',
                  cCond: '0'
                },
                {
                  srchKnd: '00',
                  zksCd: 's99003',
                  zks: 'ドコモ課金先番号の値',
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

// nbGeneric(OCN回収代行課金先番号)
export const NB_GENERIC_OCN_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
              iCondCnt: '1',
              ifDtoLst: [
                {
                  srchKnd: '00',
                  zksCd: 's13001',
                  zks: 'OCN回収代行課金先番号の値',
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
// nbGeneric(契約番号（料金情報）)
export const NB_GENERIC_FEE_NUM = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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

// nbGeneric(契約者名カナ（料金情報）)
export const NB_GENERIC_FEE_NAMEKANA = {
  contractInfoSrchReqNB: {
    reqInquireReqGenericIf: [
      {
        stcInquireReqGenericIfReq: [
          {
            stcCommonHeader: [
              {
                strOppositeSysId: 'IDP',
                strTstSndNcj: 'システム日時',
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
                  zksCd: 's01004',
                  zks: '契約者名カナの値',
                  cCond: '1'
                },
                {
                  srchKnd: '00',
                  zksCd: 's11002',
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

// billingIdContract
export const BILLING_ID_CONTRACT = {
  ekimuCode: '  ',
  srvcKindCode: '  ',
  variousId: '',
  srchDate: '',
  chrgMonth: '999999'
}

// /billing/accel-receipt-status
export const RECEIPT_STATUS = {
  billingId: ''
}

// billingDetail
export const BILLING_DETAIL = {
  billingId: '',
  contractId: '',
  bandleKindCode: '',
  lineKind: '',
  variousContractDistCode: '',
  searchPtnNo: '',
  srchRqstYearMonth: '000000',
  srchRqstBillCnt: '00',
  srchPtn: '1',
  billClass: '',
  billGrp: '',
  indicateTyp: '0'
}
// /customer/service-list
export const SERVICE_LIST = {
  srchObjectDate: '',
  commonCustId: '',
  contractId: '',
  billingId: '',
  custId: '',
  accCustId: ''
}

// ACCEL候補顧客一覧照会パラメータ
export const ACCEL_CUSTOMER_LIST_PARAM = {
  searchTypCode: '1',
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
