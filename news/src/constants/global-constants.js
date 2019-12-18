export const CUSTOMER_NO_SET = '顧客未設定'
export const CUSTOMER_INFO_ERROR = '顧客基本情報読み込みエラー'

export const CONTRACT_LIST = '契約一覧'

export const CONTRACT_DETAIL = '契約詳細'

export const BILLING_DETAIL = 'ビリング詳細'

export const SERVICE_LIST = 'サービス一覧'

export const EKIMU_CONTRACT_NUM_LIST = '役務一覧'

export const EKIMU_CONTRACT_LIST = '役務別契約件数一覧'

export const CONTRACTING_LIST = '契約中サービス'

export const USER_NOT_DEFINED = '顧客が設定されていません'

export const CONTRACTING_SER_LIST = '契約中契約件数一覧'

export const CORPORATE_SERVICES = '法人サービス'

export const E_VLAN = 'ｅ−ＶＬＡＮ'

export const GIGA_WAY = 'ギガウェイ'

export const BIZ_FAX = 'BizFAX'

export const DISTANCE_TOP = 106

export const MAX_TAB_COUNT = 6

export const DATA_ERROR_MSG_FIR = 'データの読み込みに失敗しました。'

export const DATA_ERROR_MSG_SCE = '再検索してください。'

export const COMMODITY_LIST = '商品一覧'

export const PHONE_SERVICES = '電話サービス'

export const CONSUMER_OCN = 'コンシューマ向けＯＣＮ'

export const DEDICATED_SERVICE = '専用サービス'

export const NUMBER_SERVICE = '050番号サービス（050plus）'

export const OTHERS = 'その他'

export const SEARCH_RESULT_NONE = 'none'

export const SIMPLE_SEARCH = 0
export const DETAIL_SEARCH = 1
export const NUM_LIST_SEARCH = 2

// メッセージ種類
export const MSG_TYPE_E = 'エラー'
export const MSG_TYPE_W = 'ワーニング'
export const MSG_TYPE_I = 'インフォメーション'

// 検索種別
export const B_SEARCH = 'B' // B番検索
export const C_SEARCH = 'C' // C番検索
export const D_SEARCH = 'D' // D番検索
export const N_SEARCH = 'N' // N番検索
export const H_SEARCH = 'H' // H番検索
export const ERROR_SEARCH = 'ERROR_KEY' // 不正の検索キー

export const ECONNABORTED = 'ECONNABORTED' // timeoutのエラーコード

export const TIME_OUT_ERROR_MESSAGE =
  '読み込みに時間がかかりすぎたため中断されました。検索条件を変えるなどして、再度検索・アクセスしてください。'

export const MAIN_CARD_LIST = [
  {
    isActived: false, // 現在表示中
    component: 'MCL0100',
    componentName: '契約中サービス別契約件数一覧',
    name: '契約中サービス一覧',
    ekimuCode: '',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0200',
    componentName: '役務別契約件数一覧',
    name: '役務一覧',
    ekimuCode: '',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0300',
    componentName: 'サービス一覧',
    name: '法人サービス',
    ekimuCode: '26',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0400',
    componentName: '契約一覧',
    name: '電話サービス',
    ekimuCode: '01',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'Universal One',
    ekimuCode: '26',
    srvcKindCode: '01'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'Universal One(Vのみ)',
    ekimuCode: '26',
    srvcKindCode: '02'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'VoIP',
    ekimuCode: '26',
    srvcKindCode: '03'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '廃止済み移行サービス',
    ekimuCode: '26',
    srvcKindCode: '04'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'OCN for business',
    ekimuCode: '26',
    srvcKindCode: '05'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＷｅｂエントリＬｉｔｅ',
    ekimuCode: '26',
    srvcKindCode: '06'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クラウド連携サービス',
    ekimuCode: '26',
    srvcKindCode: '07'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '個別約款サービス',
    ekimuCode: '26',
    srvcKindCode: '08'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'モバイル／リモートアクセス',
    ekimuCode: '26',
    srvcKindCode: '09'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'アプリケーション＆コンテンツサービス',
    ekimuCode: '26',
    srvcKindCode: '10'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'インターネットゲートウェイ',
    ekimuCode: '26',
    srvcKindCode: '11'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ｅＶＬＡＮＣａｔ２',
    ekimuCode: '26',
    srvcKindCode: '12'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＩＳＰプラットフォーム（網型）',
    ekimuCode: '26',
    srvcKindCode: '13'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＩＳＰプラットフォーム（線型）',
    ekimuCode: '26',
    srvcKindCode: '14'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス個別案件（電報）',
    ekimuCode: '26',
    srvcKindCode: '15'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス第１種サービス',
    ekimuCode: '26',
    srvcKindCode: '16'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '17'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＲＡＤＩＵＳホスティング',
    ekimuCode: '26',
    srvcKindCode: '18'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービスＮＷ設備系',
    ekimuCode: '26',
    srvcKindCode: '19'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信網　カテゴリ２',
    ekimuCode: '26',
    srvcKindCode: '20'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信網　カテゴリ３',
    ekimuCode: '26',
    srvcKindCode: '21'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－個別契約',
    ekimuCode: '26',
    srvcKindCode: '22'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－ＡＳＰ接続利用規約',
    ekimuCode: '26',
    srvcKindCode: '23'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信ＶＰＮアクセス',
    ekimuCode: '26',
    srvcKindCode: '24'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＡＳＰ接続利用規約',
    ekimuCode: '26',
    srvcKindCode: '25'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '26'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド－グループイーササービス利用規約',
    ekimuCode: '26',
    srvcKindCode: '27'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービス個別案件（ユーザ）',
    ekimuCode: '26',
    srvcKindCode: '28'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '[新規停止]第６種ＩＰ通信網サービス',
    ekimuCode: '26',
    srvcKindCode: '29'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '[新規停止]第９種－ＶＰＮサービス第１種サービス',
    ekimuCode: '26',
    srvcKindCode: '30'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '[新規停止]第９種－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '31'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '[新規停止]ＶＰＮ－ＶＰＮサービスＮＷ設備系',
    ekimuCode: '26',
    srvcKindCode: '32'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '[新規停止]クローズド－クローズドコンピュータ通信網Ｃａｔ２',
    ekimuCode: '26',
    srvcKindCode: '33'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0402',
    componentName: '契約一覧',
    name: 'コンシューマ向けOCN',
    ekimuCode: '20',
    srvcKindCode: '02'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0301',
    componentName: 'サービス一覧',
    name: 'ｅ−ＶＬＡＮ',
    ekimuCode: '50',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0403',
    componentName: '契約一覧',
    name: 'カテゴリ１',
    ekimuCode: '50',
    srvcKindCode: '01'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0403',
    componentName: '契約一覧',
    name: 'カテゴリ２',
    ekimuCode: '50',
    srvcKindCode: '02'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0403',
    componentName: '契約一覧',
    name: 'ギガイーサプラットフォーム',
    ekimuCode: '50',
    srvcKindCode: '03'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0404',
    componentName: '契約一覧',
    name: '専用サービス',
    ekimuCode: '40',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0405',
    componentName: '契約一覧',
    name: '050番号サービス（050plus）',
    ekimuCode: '73',
    srvcKindCode: '12'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ブロードバンドアクセス',
    ekimuCode: '52',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0302',
    componentName: 'サービス一覧',
    name: 'ギガウェイ',
    ekimuCode: '53',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0303',
    componentName: 'サービス一覧',
    name: 'BizFAX',
    ekimuCode: '74',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'Fネット+iFAX1種',
    ekimuCode: '74',
    srvcKindCode: '1'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'iFAX4種',
    ekimuCode: '74',
    srvcKindCode: '4'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'iFAX5種',
    ekimuCode: '74',
    srvcKindCode: '5'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'BizFAX ストレージ＆リモート',
    ekimuCode: '74',
    srvcKindCode: '10'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'Fネット',
    ekimuCode: '74',
    srvcKindCode: '11'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'iFAX1種',
    ekimuCode: '74',
    srvcKindCode: '12'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ArcstarグローバルIP-VPNサービス',
    ekimuCode: '90',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0406',
    componentName: '契約一覧',
    name: 'ArcstarグローバルデータNWサービス',
    ekimuCode: '91',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCD0100',
    componentName: '契約詳細',
    name: '',
    ekimuCode: '01',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCD0101',
    componentName: '契約詳細',
    name: '',
    ekimuCode: '26',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCD0102',
    componentName: '契約詳細',
    name: '',
    ekimuCode: '20',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCD0200',
    componentName: '契約詳細',
    name: '',
    ekimuCode: '',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第１種',
    ekimuCode: '21',
    srvcKindCode: '01'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第３種',
    ekimuCode: '21',
    srvcKindCode: '03'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第５種',
    ekimuCode: '21',
    srvcKindCode: '04'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第６種',
    ekimuCode: '21',
    srvcKindCode: '06'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第７種',
    ekimuCode: '21',
    srvcKindCode: '07'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第４種',
    ekimuCode: '21',
    srvcKindCode: '10'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＡＤＳＬ',
    ekimuCode: '21',
    srvcKindCode: '11'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ラディウス',
    ekimuCode: '21',
    srvcKindCode: '13'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＩＰｖ６',
    ekimuCode: '21',
    srvcKindCode: '14'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'クローズド',
    ekimuCode: '21',
    srvcKindCode: '15'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＵＮＯ',
    ekimuCode: '21',
    srvcKindCode: '20'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ドコモ定額',
    ekimuCode: '21',
    srvcKindCode: '30'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'データ１種',
    ekimuCode: '21',
    srvcKindCode: '31'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'データ２種',
    ekimuCode: '21',
    srvcKindCode: '32'
  },

  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '卸Ｓ関連',
    ekimuCode: '23',
    srvcKindCode: '33'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＩＰＰＢＸ',
    ekimuCode: '23',
    srvcKindCode: '17'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＣＤＮ',
    ekimuCode: '24',
    srvcKindCode: '16'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: '第９種',
    ekimuCode: '25',
    srvcKindCode: '09'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0401',
    componentName: '契約一覧',
    name: 'ＶＰＮ',
    ekimuCode: '25',
    srvcKindCode: '12'
  },
  {
    isActived: false, // 現在表示中
    component: 'MCL0405',
    componentName: '契約一覧',
    name: '０５０あんしんナンバー',
    ekimuCode: '73',
    srvcKindCode: '11'
  }
]

export const SUB_CARD_LIST = [
  {
    isActived: false,
    component: 'SCL0100',
    componentName: '契約中サービス別契約件数一覧',
    name: '契約中サービス',
    ekimuCode: '',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0200',
    componentName: '役務別契約件数一覧',
    name: '役務一覧',
    ekimuCode: '',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0400',
    componentName: '契約一覧',
    name: '電話サービス',
    ekimuCode: '01',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0300',
    componentName: 'サービス一覧',
    name: '法人サービス',
    ekimuCode: '26',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL040101',
    componentName: '契約一覧',
    name: 'Universal One',
    ekimuCode: '26',
    srvcKindCode: '01'
  },
  {
    isActived: false,
    component: 'SCL040102',
    componentName: '契約一覧',
    name: 'Universal One(Vのみ)',
    ekimuCode: '26',
    srvcKindCode: '02'
  },
  {
    isActived: false,
    component: 'SCL040103',
    componentName: '契約一覧',
    name: 'VoIP',
    ekimuCode: '26',
    srvcKindCode: '03'
  },
  {
    isActived: false,
    component: 'SCL040104',
    componentName: '契約一覧',
    name: '廃止済み移行サービス',
    ekimuCode: '26',
    srvcKindCode: '04'
  },
  {
    isActived: false,
    component: 'SCL040105',
    componentName: '契約一覧',
    name: 'OCN for business',
    ekimuCode: '26',
    srvcKindCode: '05'
  },
  {
    isActived: false,
    component: 'SCL040106',
    componentName: '契約一覧',
    name: 'ＷｅｂエントリＬｉｔｅ',
    ekimuCode: '26',
    srvcKindCode: '06'
  },
  {
    isActived: false,
    component: 'SCL040107',
    componentName: '契約一覧',
    name: 'クラウド連携サービス',
    ekimuCode: '26',
    srvcKindCode: '07'
  },
  {
    isActived: false,
    component: 'SCL040108',
    componentName: '契約一覧',
    name: '個別約款サービス',
    ekimuCode: '26',
    srvcKindCode: '08'
  },
  {
    isActived: false,
    component: 'SCL040109',
    componentName: '契約一覧',
    name: 'モバイル／リモートアクセス',
    ekimuCode: '26',
    srvcKindCode: '09'
  },
  {
    isActived: false,
    component: 'SCL040110',
    componentName: '契約一覧',
    name: 'アプリケーション＆コンテンツサービス',
    ekimuCode: '26',
    srvcKindCode: '10'
  },
  {
    isActived: false,
    component: 'SCL040111',
    componentName: '契約一覧',
    name: 'インターネットゲートウェイ',
    ekimuCode: '26',
    srvcKindCode: '11'
  },
  {
    isActived: false,
    component: 'SCL040112',
    componentName: '契約一覧',
    name: 'ｅＶＬＡＮＣａｔ２',
    ekimuCode: '26',
    srvcKindCode: '12'
  },
  {
    isActived: false,
    component: 'SCL040113',
    componentName: '契約一覧',
    name: 'ＩＳＰプラットフォーム（網型）',
    ekimuCode: '26',
    srvcKindCode: '13'
  },
  {
    isActived: false,
    component: 'SCL040114',
    componentName: '契約一覧',
    name: 'ＩＳＰプラットフォーム（線型）',
    ekimuCode: '26',
    srvcKindCode: '14'
  },
  {
    isActived: false,
    component: 'SCL040115',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス個別案件（電報）',
    ekimuCode: '26',
    srvcKindCode: '15'
  },
  {
    isActived: false,
    component: 'SCL040116',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス第１種サービス',
    ekimuCode: '26',
    srvcKindCode: '16'
  },
  {
    isActived: false,
    component: 'SCL040117',
    componentName: '契約一覧',
    name: '第９種－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '17'
  },
  {
    isActived: false,
    component: 'SCL040118',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＲＡＤＩＵＳホスティング',
    ekimuCode: '26',
    srvcKindCode: '18'
  },
  {
    isActived: false,
    component: 'SCL040119',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービスＮＷ設備系',
    ekimuCode: '26',
    srvcKindCode: '19'
  },
  {
    isActived: false,
    component: 'SCL040120',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信網　カテゴリ２',
    ekimuCode: '26',
    srvcKindCode: '20'
  },
  {
    isActived: false,
    component: 'SCL040121',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信網　カテゴリ３',
    ekimuCode: '26',
    srvcKindCode: '21'
  },
  {
    isActived: false,
    component: 'SCL040122',
    componentName: '契約一覧',
    name: 'クローズド－個別契約',
    ekimuCode: '26',
    srvcKindCode: '22'
  },
  {
    isActived: false,
    component: 'SCL040123',
    componentName: '契約一覧',
    name: 'クローズド－ＡＳＰ接続利用規約',
    ekimuCode: '26',
    srvcKindCode: '23'
  },
  {
    isActived: false,
    component: 'SCL040124',
    componentName: '契約一覧',
    name: 'クローズド－クローズドコンピュータ通信ＶＰＮアクセス',
    ekimuCode: '26',
    srvcKindCode: '24'
  },
  {
    isActived: false,
    component: 'SCL040125',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＡＳＰ接続利用規約',
    ekimuCode: '26',
    srvcKindCode: '25'
  },
  {
    isActived: false,
    component: 'SCL040126',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '26'
  },
  {
    isActived: false,
    component: 'SCL040127',
    componentName: '契約一覧',
    name: 'クローズド－グループイーササービス利用規約',
    ekimuCode: '26',
    srvcKindCode: '27'
  },
  {
    isActived: false,
    component: 'SCL040128',
    componentName: '契約一覧',
    name: 'ＶＰＮ－ＶＰＮサービス個別案件（ユーザ）',
    ekimuCode: '26',
    srvcKindCode: '28'
  },
  {
    isActived: false,
    component: 'SCL040129',
    componentName: '契約一覧',
    name: '[新規停止]第６種ＩＰ通信網サービス',
    ekimuCode: '26',
    srvcKindCode: '29'
  },
  {
    isActived: false,
    component: 'SCL040130',
    componentName: '契約一覧',
    name: '[新規停止]第９種－ＶＰＮサービス第１種サービス',
    ekimuCode: '26',
    srvcKindCode: '30'
  },
  {
    isActived: false,
    component: 'SCL040131',
    componentName: '契約一覧',
    name: '[新規停止]第９種－ＶＰＮサービス第２種サービス',
    ekimuCode: '26',
    srvcKindCode: '31'
  },
  {
    isActived: false,
    component: 'SCL040132',
    componentName: '契約一覧',
    name: '[新規停止]ＶＰＮ－ＶＰＮサービスＮＷ設備系',
    ekimuCode: '26',
    srvcKindCode: '32'
  },
  {
    isActived: false,
    component: 'SCL040133',
    componentName: '契約一覧',
    name: '[新規停止]クローズド－クローズドコンピュータ通信網Ｃａｔ２',
    ekimuCode: '26',
    srvcKindCode: '33'
  },
  {
    isActived: false,
    component: 'SCL0402',
    componentName: '契約一覧',
    name: 'コンシューマ向けOCN',
    ekimuCode: '20',
    srvcKindCode: '02'
  },
  {
    isActived: false,
    component: 'SCL0301',
    componentName: 'サービス一覧',
    name: 'ｅ−ＶＬＡＮ',
    ekimuCode: '50',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL040301',
    componentName: '契約一覧',
    name: 'カテゴリ１',
    ekimuCode: '50',
    srvcKindCode: '01'
  },
  {
    isActived: false,
    component: 'SCL040302',
    componentName: '契約一覧',
    name: 'カテゴリ2',
    ekimuCode: '50',
    srvcKindCode: '02'
  },
  {
    isActived: false,
    component: 'SCL040303',
    componentName: '契約一覧',
    name: 'ギガイーサプラットフォーム',
    ekimuCode: '50',
    srvcKindCode: '03'
  },
  {
    isActived: false,
    component: 'SCL0404',
    componentName: '契約一覧',
    name: '専用サービス',
    ekimuCode: '40',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0405',
    componentName: '契約一覧',
    name: '050番号サービス（050plus）',
    ekimuCode: '73',
    srvcKindCode: '12'
  },
  {
    isActived: false,
    component: 'SCL040601',
    componentName: '契約一覧',
    name: 'ブロードバンドアクセス',
    ekimuCode: '52',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0302',
    componentName: 'サービス一覧',
    name: 'ギガウェイ',
    ekimuCode: '53',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL0303',
    componentName: 'サービス一覧',
    name: 'BizFAX',
    ekimuCode: '74',
    srvcKindCode: '  '
  },
  {
    isActived: false,
    component: 'SCL040605',
    componentName: '契約一覧',
    name: 'Fネット+iFAX1種',
    ekimuCode: '74',
    srvcKindCode: '1'
  },
  {
    isActived: false,
    component: 'SCL040606',
    componentName: '契約一覧',
    name: 'iFAX4種',
    ekimuCode: '74',
    srvcKindCode: '4'
  },
  {
    isActived: false,
    component: 'SCL040607',
    componentName: '契約一覧',
    name: 'iFAX5種',
    ekimuCode: '74',
    srvcKindCode: '5'
  },
  {
    isActived: false,
    component: 'SCL040608',
    componentName: '契約一覧',
    name: 'BizFAX ストレージ＆リモート',
    ekimuCode: '74',
    srvcKindCode: '10'
  },
  {
    isActived: false,
    component: 'SCL040609',
    componentName: '契約一覧',
    name: 'Fネット',
    ekimuCode: '74',
    srvcKindCode: '11'
  },
  {
    isActived: false,
    component: 'SCL040610',
    componentName: '契約一覧',
    name: 'iFAX1種',
    ekimuCode: '74',
    srvcKindCode: '12'
  },
  {
    isActived: false, // 現在表示中
    component: 'SCL040611',
    componentName: '契約一覧',
    name: 'ArcstarグローバルIP-VPNサービス',
    ekimuCode: '90',
    srvcKindCode: '  '
  },
  {
    isActived: false, // 現在表示中
    component: 'SCL040612',
    componentName: '契約一覧',
    name: 'ArcstarグローバルデータNWサービス',
    ekimuCode: '91',
    srvcKindCode: '  '
  }
]
