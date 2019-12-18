<template>
  <div class="information">
    <el-row class="nav-list" v-show="visible">
      <div v-if="customerInfo && !customerInfoError.code" class="nav-header">
        <!-- サマリ情報部 -->
        <el-row class="item-box">
          <div class="item-width half-width">
            <span class="item-title">顧客名カナ</span>
            <span
              class="item-contents full-style"
            >{{commonItemCheck(this.customerInfo.custNameKana)}}</span>
          </div>
          <div class="item-width half-width">
            <span class="item-title">顧客名英字</span>
            <span
              class="item-contents full-style"
            >{{commonItemCheck(this.customerInfo.custEngName)}}</span>
          </div>
          <div class="item-width" v-if="idCheck">
            <span class="item-title">統合先共通顧客ID</span>
            <span
              class="item-contents item-contents-width"
            >{{commonIdCheck(this.customerInfo.integPlcCommonCustId)}}</span>
          </div>
          <div class="item-width" v-if="domesticCheck">
            <span class="item-title">分割元共通顧客ID</span>
            <span
              class="item-contents item-contents-width"
            >{{commonIdCheck(this.customerInfo.devideBefCommonCustId)}}</span>
          </div>
        </el-row>
        <el-row class="icon-block">
          <div class="icon-style" v-if="retentionFlgCheck">
            <span class="high-light-box">名寄精度向上対象</span>
          </div>
          <div class="icon-style" v-if="integBefFailFlgCheck">
            <span class="high-light-box">顧客統合元指定不可</span>
          </div>
        </el-row>
        <!-- 国内の法人部 -->
        <div v-if="domesticLegalCheck">
          <el-collapse value="基本情報">
            <el-collapse-item title="顧客情報" name="顧客情報">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">顧客ID</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.custId)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{zipCheck(this.customerInfo.zip)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">特殊郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{zipCheck(this.customerInfo.spZip)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.custAddr)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterKanaName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名英字</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterEngName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">代表電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.repTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">創立年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{dateCheck(this.customerInfo.foundDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">顧客状態</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.custStatus)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">責任事業所コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.resbilBrnchCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">特異情報</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.peculiarInfo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="プロフィール" name="プロフィール">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">帝国データバンク企業情報</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.tdbNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">帝国データバンク業種コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.tdbJob)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">東京商工リサーチ企業コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.tsrNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">東京商工リサーチ業種コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.tsrJob)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード１</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode1)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード２</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode2)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード３</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode3)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード４</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode4)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">顧客ホームページ</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.custHp)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="担当者連絡先" name="担当者連絡先" class="userTel">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">組織コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrOrgCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">担当者氏名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">部門名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrUnitName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">E-Mailアドレス</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.cvrEml)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先FAX番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactFaxNo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 国内の個人部 -->
        <div v-if="domesticPersonalCheck">
          <el-collapse value="基本情報">
            <el-collapse-item title="顧客情報" name="顧客情報">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{zipCheck(this.customerInfo.zip)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.custAddr)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">性別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.gender)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">生年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{dateCheck(this.customerInfo.birth)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">顧客状態</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.custStatus)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">責任事業所コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.resbilBrnchCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">特異情報</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.peculiarInfo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="プロフィール" name="プロフィール">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">職業</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.job)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">企業団体名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.custOfficeName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">企業団体名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.custOfficeNameKana)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.custOfficeTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先FAX番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactFaxNo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="担当者連絡先" name="担当者連絡先" class="userTel">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">組織コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrOrgCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">担当者氏名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">部門名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrUnitName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">E-Mailアドレス</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.cvrEml)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先FAX番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactFaxNo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 海外部 -->
        <div v-if="OverseasCheck">
          <el-collapse value="基本情報">
            <el-collapse-item title="顧客情報" name="顧客情報">
              <el-row class="item-box no-top">
                <div class="margin-bottom-high all-width">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.custAddr)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterKanaName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">代表者名英字</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.masterEngName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">代表電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.repTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">創立年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{dateCheck(this.customerInfo.foundDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">顧客状態</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.custStatus)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">責任事業所コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.resbilBrnchCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">特異情報</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.peculiarInfo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="プロフィール" name="プロフィール">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">業種コード１</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode1)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード２</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode2)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード３</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode3)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">業種コード４</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.jobCode4)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">顧客ホームページ</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.custHp)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="担当者連絡先" name="担当者連絡先" class="userTel">
              <el-row class="item-box no-top">
                <div class="item-width">
                  <span class="item-title">組織コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrOrgCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">担当者氏名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">部門名</span>
                  <span
                    class="item-contents full-style"
                  >{{commonItemCheck(this.customerInfo.cvrUnitName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">E-Mailアドレス</span>
                  <span
                    class="item-contents full-style i-full-style"
                  >{{commonItemCheck(this.customerInfo.cvrEml)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先FAX番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{commonItemCheck(this.customerInfo.cvrContactFaxNo)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="no-data" v-if="!customerInfo && (!customerInfoError ||!customerInfoError.code)">
        <span class="noDataContent">該当する顧客情報がありません</span>
      </div>
      <div class="warn-maintxt" v-if="customerInfoError.code">
        <div class="warn-maintxtw">
          <svg-icon icon-class="warning icon white" class="warn-icons"></svg-icon>
          <div class="warn-word">{{customerInfoError.message}}</div>
          <div class="warn-word">{{'エラーコード：' + customerInfoError.code}}</div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import informationMethods from './information-methods'
import * as INFORMATION_CONSTANTS from './information-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import GlobalMixins from '@/mixin/global-mixins'
import '@/assets/css/kyoutuuCSS.css'
export default {
  name: 'Information',
  mixins: [informationMethods, GlobalMixins],
  data() {
    return {
      nameFlg: 0,
      cumFlg: 0,
      customerInfo: null,
      customerInfoError: {
        code: '',
        message: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    customerInfoTitle: {
      type: String,
      default: ''
    }
  },
  watch: {
    customerInfoTitle: {
      handler(value) {
        // this.$idpfEventBus.$on(IDPFEvent.REFRESH_INFOMATION_VIEW, this.initView)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    integBefFailFlgCheck() {
      return (
        this.customerInfo.integBefFailFlg ===
        INFORMATION_CONSTANTS.INTEG_BEF_FAIL_FLG
      )
    },
    retentionFlgCheck() {
      return (
        this.customerInfo.retentionFlg === INFORMATION_CONSTANTS.RETENTION_FLG
      )
    },
    idCheck() {
      return (
        this.customerInfo.custStatusCode ===
          INFORMATION_CONSTANTS.CUST_STATUS_CODE &&
        this.customerInfo.domestFrgnTyp ===
          INFORMATION_CONSTANTS.INFORMATION_DOMESTIC
      )
    },
    domesticCheck() {
      return (
        this.customerInfo.domestFrgnTyp ===
        INFORMATION_CONSTANTS.INFORMATION_DOMESTIC
      )
    },
    OverseasCheck() {
      return (
        this.customerInfo.domestFrgnTyp ===
        INFORMATION_CONSTANTS.INFORMATION_OVERSEAS
      )
    },
    domesticLegalCheck() {
      return (
        this.customerInfo.domestFrgnTyp ===
          INFORMATION_CONSTANTS.INFORMATION_DOMESTIC &&
        this.customerInfo.corpOrPersTyp ===
          INFORMATION_CONSTANTS.INFORMATION_LEGAL
      )
    },
    domesticPersonalCheck() {
      return (
        this.customerInfo.domestFrgnTyp ===
          INFORMATION_CONSTANTS.INFORMATION_DOMESTIC &&
        this.customerInfo.corpOrPersTyp ===
          INFORMATION_CONSTANTS.INFORMATION_PERSONAL
      )
    }
  },
  mounted() {
    this.$idpfEventBus.$on(IDPFEvent.REFRESH_INFOMATION_VIEW, this.initView)
  },
  beforeDestroy() {
    this.$idpfEventBus.$off(IDPFEvent.REFRESH_INFOMATION_VIEW)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.full-style {
  background-color: #4b5765;
}
.i-full-style {
  width: calc(100% - 43px);
}
.half-bg {
  opacity: 0.4;
}
.icon-style {
  display: flex;
  margin-right: 20px;
}

.icon-block {
  display: flex;
}

.nav-header {
  color: #fff;
  padding: 10px 42px 0px;
}

.information {
  border-top: 1px solid #c9ced7;
}

.nav-list {
  background-color: #707c8a;
  padding-bottom: 20px;
  .list-content {
    float: left;
    color: white;
    padding-left: 42px;
    padding-top: 3px;
  }
  .no-data {
    .noDataContent {
      text-align: center;
      padding-top: 90px;
      padding-bottom: 90px;
      display: block;
      color: #dde6f1;
      padding-left: 40px;
    }
  }
}

.item-title {
  color: #dde6f1;
}

.item-contents-width {
  background: #4b5765;
}

.item-contents {
  color: #fff;
}
.no-top {
  margin-top: 0px;
}
.high-light-box {
  padding: 0 14px;
  height: 22px;
  background: #fff;
  border-radius: 11px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
}
.information .warn-maintxt {
  display: flex;
  width: 100%;
  height: 175px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.information .warn-maintxtw {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.information .warn-icons {
  width: 30px !important;
  height: 27px !important;
  margin-bottom: 18px;
}
.information .warn-word {
  width: 100%;
  text-align: center;
  color: white;
  font-family: Meiryo;
  font-size: 16px;
  line-height: 22px;
}
</style>
<style>
.information .el-collapse {
  border-top: 1px dashed #c9ced7;
  border-bottom: 0px;
}
.information .el-collapse-item__header {
  color: #fff;
}
.information .el-collapse-item__header {
  background-color: transparent;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Meiryo UI';
  border-bottom: 1px dashed #c9ced7;
}
.information .el-collapse-item__header.is-active {
  border-bottom-color: transparent !important;
}
.information .el-collapse-item__wrap {
  background: transparent;
  border-bottom: 1px dashed #c9ced7;
}
.information .el-collapse-item__content {
  padding-bottom: 0px;
}
.information .el-collapse-item__arrow.is-active {
  transform: rotate(-90deg);
}
.information .el-collapse-item__arrow:hover {
  background-color: #606b77;
  border-radius: 7px;
}
.information .el-collapse-item__arrow {
  transform: rotate(90deg);
}
.information .userTel div:first-child div.el-collapse-item__header {
  border-bottom: 0px;
}
.information .userTel .el-collapse-item__wrap {
  border-bottom: 0px;
}
</style>
