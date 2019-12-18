export const MW01_TITLE = 'メインカード管理'
export const OTHERS = 'その他'
export const CORPORATESERVICES = '法人サービス'
export const EVLAN = 'e-VLAN'
export const GIGAWAY = 'ギガウェイ'
export const BIZFAX = 'BizFAX'
export const BROADBAND = 'ブロードバンドアクセス'
export const DISTANCE_TOP = 106
export const MAX_TAB_COUNT = 6
export const SERVICES_LIST = 'サービス'
export const SERVICE_DUTY = '役務'
export const CONSUMER_OCN = 'コンシューマ向けＯＣＮ'
export const PHONE_SERVICES = '電話サービス'
export const DEDICATED_SERVICE = '専用サービス'
export const NUMBER_SERVICE = '050番号サービス（050plus）'
export const ARCSTAR_IP_VPN = 'ArcstarグローバルIP-VPNサービス'
export const ARCSTAR_NW = 'ArcstarグローバルデータNWサービス'

export const MAIN_CARD_LIST = [
  {
    isActived: false, // 現在表示中,
    component: 'MCL0100',
    componentName: '契約中サービス一覧',
    name: 'サービス',
    ekimuCode: '', // TODO
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0200',
    componentName: '役務一覧', // TODO
    name: '役務',
    ekimuCode: '', // TODO
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0400',
    componentName: '契約一覧',
    name: '電話サービス',
    ekimuCode: '01', // TODO
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0300',
    componentName: 'サービス一覧',
    name: '法人サービス',
    ekimuCode: '26',
    srvcKindCode: '  ', // TODO
    mainCardChild: [
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'Universal One',
        ekimuCode: '26',
        srvcKindCode: '01'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'Universal One(Vのみ)',
        ekimuCode: '26',
        srvcKindCode: '02'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'VoIP',
        ekimuCode: '26',
        srvcKindCode: '03'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '廃止済み移行サービス',
        ekimuCode: '26',
        srvcKindCode: '04'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'OCN for business',
        ekimuCode: '26',
        srvcKindCode: '05'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＷｅｂエントリＬｉｔｅ',
        ekimuCode: '26',
        srvcKindCode: '06'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クラウド連携サービス',
        ekimuCode: '26',
        srvcKindCode: '07'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '個別約款サービス',
        ekimuCode: '26',
        srvcKindCode: '08'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'モバイル／リモートアクセス',
        ekimuCode: '26',
        srvcKindCode: '09'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'アプリケーション＆コンテンツサービス',
        ekimuCode: '26',
        srvcKindCode: '10'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'インターネットゲートウェイ',
        ekimuCode: '26',
        srvcKindCode: '11'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ｅＶＬＡＮＣａｔ２',
        ekimuCode: '26',
        srvcKindCode: '12'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＩＳＰプラットフォーム（網型）',
        ekimuCode: '26',
        srvcKindCode: '13'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＩＳＰプラットフォーム（線型）',
        ekimuCode: '26',
        srvcKindCode: '14'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '第９種－ＶＰＮサービス個別案件（電報）',
        ekimuCode: '26',
        srvcKindCode: '15'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '第９種－ＶＰＮサービス第１種サービス',
        ekimuCode: '26',
        srvcKindCode: '16'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '第９種－ＶＰＮサービス第２種サービス',
        ekimuCode: '26',
        srvcKindCode: '17'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＶＰＮ－ＲＡＤＩＵＳホスティング',
        ekimuCode: '26',
        srvcKindCode: '18'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＶＰＮ－ＶＰＮサービスＮＷ設備系',
        ekimuCode: '26',
        srvcKindCode: '19'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－クローズドコンピュータ通信網　カテゴリ２',
        ekimuCode: '26',
        srvcKindCode: '20'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－クローズドコンピュータ通信網　カテゴリ３',
        ekimuCode: '26',
        srvcKindCode: '21'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－個別契約',
        ekimuCode: '26',
        srvcKindCode: '22'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－ＡＳＰ接続利用規約',
        ekimuCode: '26',
        srvcKindCode: '23'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－クローズドコンピュータ通信ＶＰＮアクセス',
        ekimuCode: '26',
        srvcKindCode: '24'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＶＰＮ－ＡＳＰ接続利用規約',
        ekimuCode: '26',
        srvcKindCode: '25'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＶＰＮ－ＶＰＮサービス第２種サービス',
        ekimuCode: '26',
        srvcKindCode: '26'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'クローズド－グループイーササービス利用規約',
        ekimuCode: '26',
        srvcKindCode: '27'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: 'ＶＰＮ－ＶＰＮサービス個別案件（ユーザ）',
        ekimuCode: '26',
        srvcKindCode: '28'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '[新規停止]第６種ＩＰ通信網サービス',
        ekimuCode: '26',
        srvcKindCode: '29'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '[新規停止]第９種－ＶＰＮサービス第１種サービス',
        ekimuCode: '26',
        srvcKindCode: '30'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '[新規停止]第９種－ＶＰＮサービス第２種サービス',
        ekimuCode: '26',
        srvcKindCode: '31'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '[新規停止]ＶＰＮ－ＶＰＮサービスＮＷ設備系',
        ekimuCode: '26',
        srvcKindCode: '32'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0401',
        componentName: '契約一覧',
        name: '[新規停止]クローズド－クローズドコンピュータ通信網Ｃａｔ２',
        ekimuCode: '26',
        srvcKindCode: '33'
      }
    ]
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0402',
    componentName: '契約一覧',
    name: 'コンシューマ向けＯＣＮ',
    ekimuCode: '20', // TODO
    srvcKindCode: '02' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0301',
    componentName: 'サービス一覧',
    name: 'e-VLAN',
    ekimuCode: '50',
    srvcKindCode: '  ', // TODO
    mainCardChild: [
      {
        isActived: false, // 現在表示中,
        component: 'MCL0403',
        componentName: '契約一覧',
        name: 'カテゴリ１',
        ekimuCode: '50',
        srvcKindCode: '01'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0403',
        componentName: '契約一覧',
        name: 'カテゴリ2',
        ekimuCode: '50',
        srvcKindCode: '02'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0403',
        componentName: '契約一覧',
        name: 'ギガイーサプラットフォーム',
        ekimuCode: '50',
        srvcKindCode: '03'
      }
    ]
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0404',
    componentName: '契約一覧',
    name: '専用サービス',
    ekimuCode: '40',
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0405',
    componentName: '契約一覧',
    name: '050番号サービス（050plus）',
    ekimuCode: '73', // TODO
    srvcKindCode: '12' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ブロードバンドアクセス',
    ekimuCode: '52',
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0302',
    componentName: 'サービス一覧',
    name: 'ギガウェイ',
    ekimuCode: '53',
    srvcKindCode: '  ', // TODO
    mainCardChild: [
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'ＴｙｐｅＧ（ＧＷ）',
        ekimuCode: '53',
        srvcKindCode: '01'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'ＴｙｐｅＦ',
        ekimuCode: '53',
        srvcKindCode: '03'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'ＴｙｐｅＧ（ＰＥ）',
        ekimuCode: '53',
        srvcKindCode: '04'
      }
    ]
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0303',
    componentName: 'サービス一覧',
    name: 'BizFAX',
    ekimuCode: '74',
    srvcKindCode: '  ', // TODO
    mainCardChild: [
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'Fネット+iFAX1種',
        ekimuCode: '74',
        srvcKindCode: '1'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'iFAX4種',
        ekimuCode: '74',
        srvcKindCode: '4'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'iFAX5種',
        ekimuCode: '74',
        srvcKindCode: '5'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'BizFAX ストレージ＆リモート',
        ekimuCode: '74',
        srvcKindCode: '10'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'Fネット',
        ekimuCode: '74',
        srvcKindCode: '11'
      },
      {
        isActived: false, // 現在表示中,
        component: 'MCL0406',
        componentName: '契約一覧',
        name: 'iFAX1種',
        ekimuCode: '74',
        srvcKindCode: '12'
      }
    ]
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ArcstarグローバルIP-VPNサービス',
    ekimuCode: '90',
    srvcKindCode: '  ' // TODO
  },
  {
    isActived: false, // 現在表示中,
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ArcstarグローバルデータNWサービス',
    ekimuCode: '91',
    srvcKindCode: '  ' // TODO
  }
]
