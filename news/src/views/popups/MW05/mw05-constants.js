export const SRVCID = '契約番号'
export const PULLDOWN_INIT = '指定なし'
export const FILTER = [
  {
    id: 'AS020100',
    name: '顧客基本情報検索結果一覧',
    pulldown: {
      name: '顧客属性',
      value: [
        {
          value: 0,
          label: '個人',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: '法人',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 2,
          label: '海外',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  },
  {
    id: 'AS020201',
    name: '契約情報検索結果一覧（OCN）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020202',
    name: '契約情報検索結果一覧（OCN B向け）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020203',
    name: '契約情報検索結果一覧（OCN C向け）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020301',
    name: '料金情報検索結果一覧（OCN）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020302',
    name: '料金情報検索結果一覧（OCN B向け）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020303',
    name: '料金情報検索結果一覧（OCN C向け）',
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'AS020304',
    name: '料金情報検索結果一覧（指定なし）',
    pulldown: {
      name: '契約サービス',
      value: [
        {
          value: 0,
          label: '電話サービス',
          ekimuCode: '01',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: 'Universal One',
          ekimuCode: '26',
          srvcKindCode: '01'
        },
        {
          value: 2,
          label: 'Universal One(Vのみ)',
          ekimuCode: '26',
          srvcKindCode: '02'
        },
        {
          value: 3,
          label: 'VoIP',
          ekimuCode: '26',
          srvcKindCode: '03'
        },
        {
          value: 4,
          label: '廃止済み移行サービス',
          ekimuCode: '26',
          srvcKindCode: '04'
        },
        {
          value: 5,
          label: 'OCN for business',
          ekimuCode: '26',
          srvcKindCode: '05'
        },
        {
          value: 6,
          label: 'ＷｅｂエントリＬｉｔｅ',
          ekimuCode: '26',
          srvcKindCode: '06'
        },
        {
          value: 7,
          label: 'クラウド連携サービス',
          ekimuCode: '26',
          srvcKindCode: '07'
        },
        {
          value: 8,
          label: '個別約款サービス',
          ekimuCode: '26',
          srvcKindCode: '08'
        },
        {
          value: 9,
          label: 'モバイル／リモートアクセス',
          ekimuCode: '26',
          srvcKindCode: '09'
        },
        {
          value: 10,
          label: 'アプリケーション＆コンテンツサービス',
          ekimuCode: '26',
          srvcKindCode: '10'
        },
        {
          value: 11,
          label: 'インターネットゲートウェイ',
          ekimuCode: '26',
          srvcKindCode: '11'
        },
        {
          value: 12,
          label: 'ｅＶＬＡＮＣａｔ２',
          ekimuCode: '26',
          srvcKindCode: '12'
        },
        {
          value: 13,
          label: 'ＩＳＰプラットフォーム（網型）',
          ekimuCode: '26',
          srvcKindCode: '13'
        },
        {
          value: 14,
          label: 'ＩＳＰプラットフォーム（線型）',
          ekimuCode: '26',
          srvcKindCode: '14'
        },
        {
          value: 15,
          label: '第９種－ＶＰＮサービス個別案件（電報）',
          ekimuCode: '26',
          srvcKindCode: '15'
        },
        {
          value: 16,
          label: '第９種－ＶＰＮサービス第１種サービス',
          ekimuCode: '26',
          srvcKindCode: '16'
        },
        {
          value: 17,
          label: '第９種－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '17'
        },
        {
          value: 18,
          label: 'ＶＰＮ－ＲＡＤＩＵＳホスティング',
          ekimuCode: '26',
          srvcKindCode: '18'
        },
        {
          value: 19,
          label: 'ＶＰＮ－ＶＰＮサービスＮＷ設備系',
          ekimuCode: '26',
          srvcKindCode: '19'
        },
        {
          value: 20,
          label: 'クローズド－クローズドコンピュータ通信網　カテゴリ２',
          ekimuCode: '26',
          srvcKindCode: '20'
        },
        {
          value: 21,
          label: 'クローズド－クローズドコンピュータ通信網　カテゴリ３',
          ekimuCode: '26',
          srvcKindCode: '21'
        },
        {
          value: 22,
          label: 'クローズド－個別契約',
          ekimuCode: '26',
          srvcKindCode: '22'
        },
        {
          value: 23,
          label: 'クローズド－ＡＳＰ接続利用規約',
          ekimuCode: '26',
          srvcKindCode: '23'
        },
        {
          value: 24,
          label: 'クローズド－クローズドコンピュータ通信ＶＰＮアクセス',
          ekimuCode: '26',
          srvcKindCode: '24'
        },
        {
          value: 25,
          label: 'ＶＰＮ－ＡＳＰ接続利用規約',
          ekimuCode: '26',
          srvcKindCode: '25'
        },
        {
          value: 26,
          label: 'ＶＰＮ－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '26'
        },
        {
          value: 27,
          label: 'クローズド－グループイーササービス利用規約',
          ekimuCode: '26',
          srvcKindCode: '27'
        },
        {
          value: 28,
          label: 'ＶＰＮ－ＶＰＮサービス個別案件（ユーザ）',
          ekimuCode: '26',
          srvcKindCode: '28'
        },
        {
          value: 29,
          label: '[新規停止]第６種ＩＰ通信網サービス',
          ekimuCode: '26',
          srvcKindCode: '29'
        },
        {
          value: 30,
          label: '[新規停止]第９種－ＶＰＮサービス第１種サービス',
          ekimuCode: '26',
          srvcKindCode: '30'
        },
        {
          value: 31,
          label: '[新規停止]第９種－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '31'
        },
        {
          value: 32,
          label: '[新規停止]ＶＰＮ－ＶＰＮサービスＮＷ設備系',
          ekimuCode: '26',
          srvcKindCode: '32'
        },
        {
          value: 33,
          label: '[新規停止]クローズド－クローズドコンピュータ通信網Ｃａｔ２',
          ekimuCode: '26',
          srvcKindCode: '33'
        },
        {
          value: 34,
          label: 'コンシューマ向けOCN',
          ekimuCode: '20',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    },
    textarea: {
      name: '契約番号',
      value: '',
      ekimuCode: '',
      srvcKindCode: '  '
    }
  },
  {
    id: 'MCL0400',
    name: '契約番号一覧（電話）',
    pulldown: {
      name: '契約状態',
      value: [
        {
          value: 0,
          label: '有効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: '無効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  },
  {
    id: 'MCL0401',
    name: '契約番号一覧（法人サービス）',
    pulldown: {
      name: '契約状態',
      value: [
        {
          value: 0,
          label: '有効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: '無効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  },
  {
    id: 'MCL0402',
    name: '契約番号一覧（コンシューマ向けOCN）',
    pulldown: {
      name: '契約状態',
      value: [
        {
          value: 0,
          label: '有効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: '無効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  },
  {
    id: 'MCL0406',
    name: '契約番号一覧（その他）',
    pulldown: {
      name: '契約状態',
      value: [
        {
          value: 0,
          label: '有効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: '無効',
          ekimuCode: '',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  },
  {
    id: 'MCD0200d',
    name: 'ビリング詳細（ACCEL）関連契約一覧',
    pulldown: {
      name: '契約サービス',
      value: [
        {
          value: 0,
          label: '電話サービス',
          ekimuCode: '01',
          srvcKindCode: '  '
        },
        {
          value: 1,
          label: 'Universal One',
          ekimuCode: '26',
          srvcKindCode: '01'
        },
        {
          value: 2,
          label: 'Universal One(Vのみ)',
          ekimuCode: '26',
          srvcKindCode: '02'
        },
        {
          value: 3,
          label: 'VoIP',
          ekimuCode: '26',
          srvcKindCode: '03'
        },
        {
          value: 4,
          label: '廃止済み移行サービス',
          ekimuCode: '26',
          srvcKindCode: '04'
        },
        {
          value: 5,
          label: 'OCN for business',
          ekimuCode: '26',
          srvcKindCode: '05'
        },
        {
          value: 6,
          label: 'ＷｅｂエントリＬｉｔｅ',
          ekimuCode: '26',
          srvcKindCode: '06'
        },
        {
          value: 7,
          label: 'クラウド連携サービス',
          ekimuCode: '26',
          srvcKindCode: '07'
        },
        {
          value: 8,
          label: '個別約款サービス',
          ekimuCode: '26',
          srvcKindCode: '08'
        },
        {
          value: 9,
          label: 'モバイル／リモートアクセス',
          ekimuCode: '26',
          srvcKindCode: '09'
        },
        {
          value: 10,
          label: 'アプリケーション＆コンテンツサービス',
          ekimuCode: '26',
          srvcKindCode: '10'
        },
        {
          value: 11,
          label: 'インターネットゲートウェイ',
          ekimuCode: '26',
          srvcKindCode: '11'
        },
        {
          value: 12,
          label: 'ｅＶＬＡＮＣａｔ２',
          ekimuCode: '26',
          srvcKindCode: '12'
        },
        {
          value: 13,
          label: 'ＩＳＰプラットフォーム（網型）',
          ekimuCode: '26',
          srvcKindCode: '13'
        },
        {
          value: 14,
          label: 'ＩＳＰプラットフォーム（線型）',
          ekimuCode: '26',
          srvcKindCode: '14'
        },
        {
          value: 15,
          label: '第９種－ＶＰＮサービス個別案件（電報）',
          ekimuCode: '26',
          srvcKindCode: '15'
        },
        {
          value: 16,
          label: '第９種－ＶＰＮサービス第１種サービス',
          ekimuCode: '26',
          srvcKindCode: '16'
        },
        {
          value: 17,
          label: '第９種－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '17'
        },
        {
          value: 18,
          label: 'ＶＰＮ－ＲＡＤＩＵＳホスティング',
          ekimuCode: '26',
          srvcKindCode: '18'
        },
        {
          value: 19,
          label: 'ＶＰＮ－ＶＰＮサービスＮＷ設備系',
          ekimuCode: '26',
          srvcKindCode: '19'
        },
        {
          value: 20,
          label: 'クローズド－クローズドコンピュータ通信網　カテゴリ２',
          ekimuCode: '26',
          srvcKindCode: '20'
        },
        {
          value: 21,
          label: 'クローズド－クローズドコンピュータ通信網　カテゴリ３',
          ekimuCode: '26',
          srvcKindCode: '21'
        },
        {
          value: 22,
          label: 'クローズド－個別契約',
          ekimuCode: '26',
          srvcKindCode: '22'
        },
        {
          value: 23,
          label: 'クローズド－ＡＳＰ接続利用規約',
          ekimuCode: '26',
          srvcKindCode: '23'
        },
        {
          value: 24,
          label: 'クローズド－クローズドコンピュータ通信ＶＰＮアクセス',
          ekimuCode: '26',
          srvcKindCode: '24'
        },
        {
          value: 25,
          label: 'ＶＰＮ－ＡＳＰ接続利用規約',
          ekimuCode: '26',
          srvcKindCode: '25'
        },
        {
          value: 26,
          label: 'ＶＰＮ－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '26'
        },
        {
          value: 27,
          label: 'クローズド－グループイーササービス利用規約',
          ekimuCode: '26',
          srvcKindCode: '27'
        },
        {
          value: 28,
          label: 'ＶＰＮ－ＶＰＮサービス個別案件（ユーザ）',
          ekimuCode: '26',
          srvcKindCode: '28'
        },
        {
          value: 29,
          label: '[新規停止]第６種ＩＰ通信網サービス',
          ekimuCode: '26',
          srvcKindCode: '29'
        },
        {
          value: 30,
          label: '[新規停止]第９種－ＶＰＮサービス第１種サービス',
          ekimuCode: '26',
          srvcKindCode: '30'
        },
        {
          value: 31,
          label: '[新規停止]第９種－ＶＰＮサービス第２種サービス',
          ekimuCode: '26',
          srvcKindCode: '31'
        },
        {
          value: 32,
          label: '[新規停止]ＶＰＮ－ＶＰＮサービスＮＷ設備系',
          ekimuCode: '26',
          srvcKindCode: '32'
        },
        {
          value: 33,
          label: '[新規停止]クローズド－クローズドコンピュータ通信網Ｃａｔ２',
          ekimuCode: '26',
          srvcKindCode: '33'
        },
        {
          value: 34,
          label: 'コンシューマ向けOCN',
          ekimuCode: '20',
          srvcKindCode: '  '
        },
        {
          value: 100,
          label: '指定なし',
          ekimuCode: '',
          srvcKindCode: '  '
        }
      ],
      init: '指定なし'
    }
  }
]
