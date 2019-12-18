<template>
  <div class="scl0200">
    <el-card :class="isCardShow()">
      <div slot="header">
        <span class="header-text">{{ subcardName }}</span>
      </div>
      <el-row class="row-text">役務一覧</el-row>
      <div class="warn-text" v-if="!isCutomInfoSet">
        <span>{{ userNotDefined }}</span>
      </div>
      <div v-else-if="dataExsit" class="out-space contract-list-height">
        <el-row class="spe-row">
          <span class="left-text">合計契約数</span>
          <span class="right-text">
            {{
            scl0200Model.totalCount + ' ' + '件'
            }}
          </span>
        </el-row>
        <el-row class="row-height" v-for="(item, index) in limitData" :key="index">
          <span class="span-line" @click="onOpenMclList(item)">
            {{
            item.ekimuName
            }}
          </span>
          <span class="rec-num">{{ item.recRecNum + ' ' + '件' }}</span>
        </el-row>
      </div>

      <div class="warn-maintxt" v-else-if="hasError">
        <div class="warn-maintxtw">
          <svg-icon icon-class="warning icon" class="warn-icons"></svg-icon>
          <span class="warn-word">{{ errorMsg }}</span>
          <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
        </div>
      </div>
      <div class="warn-text" v-if="nodata && !hasError">
        <span>該当する契約はありません。</span>
      </div>
      <el-row class="row-center" v-if="!insrvChange && !hasError && isCutomInfoSet">
        <span
          :class="dataExsit ? 'shoryaku-kigo' : 'click-disable'"
          @click="dataExsit ? onOpenMcl0200() : ''"
        >すべて見る</span>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import SCL0200Methods from './scl0200-methods'
import SCL0200Model from './scl0200-model'
import * as GlobalConstants from '@/constants/global-constants'
import GlobalMixins from '@/mixin/global-mixins'
import SubCardBase from '@/mixin/sub-card-base'
import * as CARDID from '@/constants/card-id-constants'
export default {
  name: 'SCL0200',
  extends: SubCardBase,
  mixins: [SCL0200Methods, GlobalMixins],
  data() {
    return {
      mainCardList: [],
      tabCardList: [],
      selectedComponent: {},
      userNotDefined: GlobalConstants.USER_NOT_DEFINED,
      scl0200Model: {},
      nodata: false
    }
  },
  created() {
    this.scl0200Model = new SCL0200Model()
    this.cardId = CARDID.SCL0200
    this.customerInfo = this.$store.getters.customerInfo
    // 画面を初期化する
    this.initView()
  },
  computed: {
    // API請求する前に、画面のデフォルト表示
    insrvChange() {
      return !this.customerInfo && this.scl0200Model.ekimuListInfo.length <= 0
    },
    // 顧客が設定された場合、画面の表示
    dataExsit() {
      return this.customerInfo && this.scl0200Model.ekimuListInfo.length > 0
    },
    // 画面にデータの表示
    limitData() {
      return this.scl0200Model.ekimuListInfo.slice(0, 5)
    }
  }
}
</script>
<style scoped>
.scl0200 {
  padding-left: 20px;
  padding-bottom: 20px;
}
.spe-row {
  margin-bottom: 13px;
}
.header-text {
  font-weight: bold;
  font-size: 14px;
}
.row-text {
  height: 32px;
  width: 100%;
  line-height: 32px;
  background: #dcdcdc;
  text-align: center;
  color: #4a4a4a;
  font-size: 14px;
  font-weight: bold;
}
.warn-text {
  text-align: center;
  height: 175px;
  line-height: 193px;
}
.left-text {
  float: left;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0.27px;
  font-weight: bold;
}
.right-text {
  float: right;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0.27px;
  font-weight: bold;
}
.out-space {
  padding-left: 20px;
  margin-top: 14px;
  padding-right: 20px;
  margin-bottom: 4px;
}
.row-height {
  height: 25px;
}
.rec-num {
  float: right;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.27px;
}
.warn-maintxt {
  display: flex;
  width: 100%;
  height: 175px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-maintxtw {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-icons {
  width: 30px !important;
  height: 27px !important;
  margin-bottom: 18px;
}
.warn-word {
  width: 100%;
  text-align: center;
  color: #fd596d;
  font-family: Meiryo;
  font-size: 16px;
  line-height: 22px;
}
.span-line:hover {
  text-decoration: underline;
}
.row-center {
  text-align: center;
  height: 37px;
  line-height: 37px;
  border-top: 1px solid #d7d7d7;
}
.shoryaku-kigo {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #00438b;
  cursor: pointer;
}
.shoryaku-kigo:hover {
  text-decoration: underline;
}
.click-disable {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #9b9b9b;
}
.scl0200-style {
  width: 300px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.no-data-height {
  height: 257px;
}
.card-height {
  height: 276px;
}
.contract-list-height {
  height: 157px;
}
</style>
<style>
.scl0200 .el-card__header {
  background: #00438b;
  border-radius: 2px 2px 0 0;
  height: 32px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  padding: 0px;
  line-height: 32px;
}
.scl0200 .el-card {
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.scl0200 .el-card__body {
  padding: 0px;
}
.scl0200 .span-line {
  float: left;
  cursor: pointer;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #00438b;
  letter-spacing: 0.27px;
  width: 74%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
