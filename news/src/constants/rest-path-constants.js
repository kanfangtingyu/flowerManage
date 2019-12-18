// 都道府県取得
export const IDPF_DBINFO_PREFECTUREINFO = '/idpf/dbinfo-prefectureInfo'
// 市区町村取得
export const IDPF_DBINFO_CITYINFO = '/idpf/dbinfo-cityInfo'
// 大字/町名取得
export const IDPF_DBINFO_TOWNINFO = '/idpf/dbinfo-townInfo'
// 字/丁目取得
export const IDPF_DBINFO_STREETINFO = '/idpf/dbinfo-streetInfo'
// ユーザーカスタマイズ情報取得
export const IDPF_DBINFO_GET_USERCUSTMIZEINFO =
  '/idpf/dbinfo-get-userCustmizeInfo'
// ユーザーカスタマイズ情報更新
export const IDPF_DBINFO_UPDATE_USERCUSTMIZEINFO =
  '/idpf/dbinfo-update-userCustmizeInfo'
// 顧客名検索における大量検索防止チェック
export const IDPF_CUSTOMERINFO_SEARCH_LIMITCHECK =
  '/idpf/customerinfo-search-limitCheck'
// 顧客ディレクトリ照会ユーティリティ・共通顧客ID取得
export const IDPF_DBINFO_FINDCUSTOMERIDBYCONTRACTID =
  '/idpf/dbinfo-findCustomerIDByContractID'
// コード変換テーブルユーティリティ・コード名称取得
export const IDPF_DBINFO_GETCODENAME = '/idpf/dbinfo-getCodeName'
// コード変換テーブルユーティリティ・ACCELプロダクト名取得
export const IDPF_DBINFO_GETACCELSERVICENAME =
  '/idpf/dbinfo-getACCELServiceName'
// バンドルサービス種類コード（ACCEL）をキーとしてIDPF役務コードなどを取得する
export const IDPF_DBINFO_GETIDPFEKIMU_BY_ACCEL_SERVICEKINDCODE =
  '/idpf/dbinfo-getIdpfEkimuByAccelServiceKindCode'

export const GET_USER_INFO = '/login/getUserInfo'

export const GET_AUTH = '/login/getAuth'

export const REFRESH_TOKEN = '/refreshToken'

// システム連携API
export const CUSTOMER_CUSTOMER_BUSINESS = '/customer/customer-business'
export const CUSTOMER_ACCEL_CUSTOMER_LIST = '/customer/accel-customer-list'
export const CUSTOMER_SERVICE_LIST = '/customer/service-list'
export const CUSTOMER_CUSTOMER_DIRECTORY = '/customer/customer-directory'
export const CUSTOMER_DISUSED_SERVICE_LIST = '/customer/disused-service-list'
export const CUSTOMER_DISUSED_CUSTOMER_DIRECTORY =
  '/customer/disused-customer-directory'
export const CONTRACT_ACCEL_CALL_DETAIL_SENDING_ADDRESS =
  '/contract/accel-call-detail-sending-address'
export const CONTRACT_ACCEL_CONTRACT = '/contract/accel-contract'
export const BILLING_ACCEL_BILLING_DETAIL_BY_LINE =
  '/billing/accel-billing-detail-by-line'
export const BILLING_ACCEL_BILLING_DETAIL_BY_BILLINGID =
  '/billing/accel-billing-detail-by-billingid'
export const BILLING_ACCEL_SO_BILLING_BY_IDS =
  '/billing/accel-so-billing-by-ids'
export const BILLING_ACCEL_RECEIPT_STATUS = '/billing/accel-receipt-status'
export const BILLING_ACCEL_DISCOUNT = '/contract/accel-discount'
export const BILLING_ACCEL_BILLINGID_CONTRACT_ID_LIST =
  '/billing/accel-billingid-contract-id-list'
export const BILLING_ACCEL_LEDGER = '/contract/accel-ledger'
export const BILLING_OCN_BILLING_LIST = '/billing/ocn-billing-list'
export const BILLING_OCN_BILLING_DETAIL = '/billing/ocn-billing-detail'
export const BILLING_OCN_BILLING_CATEGORY = '/billing/ocn-billing-category'
export const BILLING_OCN_ORDER_HISTORY = '/billing/ocn-order-history'
export const BILLING_NB_GENERIC_IF = '/contract/nb-generic-if'

// NB基盤
export const TRANSFORM_TO_NB = '/transform-to-nb'
