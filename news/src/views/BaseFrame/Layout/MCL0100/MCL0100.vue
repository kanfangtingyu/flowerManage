<template>
  <div ref="mcl0100" class="mcl0100">
    <div class="header">
      <span class="title-center">サービス一覧</span>
    </div>
    <!-- データ表示部 -->
    <div class="maincard-center" v-if="hasData">
      <div class="maincard-border">
        <div class="kennsu-title">
          <span class="count-display">{{ pageCntArea }}</span>
          <span class="kennsu-space">
            <el-pagination
              :current-page="currPage"
              layout="prev, pager, next"
              :total="dataList.length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-size="pageSize"
            ></el-pagination>
          </span>
          <div class="kennsu-filter">
            <el-select
              ref="selectPageSize"
              v-model="value"
              @change="handleSizeChange(value)"
              placeholder="0"
              size="mini"
              class="first-select"
              @visible-change="inputBlur($event, 'selectPageSize')"
            >
              <el-option
                v-for="(item, index) in optionList"
                :key="index"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="kennsuHyouji">件表示</span>
          </div>
        </div>
        <div class="total-count">{{ dataListNum }}</div>
        <el-row class="maincard-title">
          <el-col class="first-row">
            <span class="maincard-title-text">サービス名</span>
          </el-col>
          <el-col class="second-row">
            <span class="maincard-title-text">有効契約数</span>
          </el-col>
          <el-col class="third-row">
            <span class="maincard-title-text">無効契約数</span>
          </el-col>
        </el-row>
        <el-row
          v-for="(item, i) in dataListPerPage()"
          :key="i"
          class="spe-font"
        >
          <el-col class="srvc_kind_name" v-if="isShowEkimuName(item, i)"
            >{{ item.ekimuName }} {{ continueText(item, i) }}</el-col
          >
          <el-row>
            <el-col class="first-row">
              <span class="span-line text-content" @click="openMclList(item)">{{
                item.srvcKindName
              }}</span>
            </el-col>
            <el-col class="second-row">
              <span class="maincard-text">{{ item.recRecNum + '件' }}</span>
            </el-col>
            <el-col class="third-row">
              <span class="maincard-text">{{ item.invalidNum + '件' }}</span>
            </el-col>
          </el-row>
        </el-row>
        <div class="kennsu-footer">
          <span class="count-display"></span>
          <span class="kennsu-space">
            <el-pagination
              class="sp-page"
              :current-page="currPage"
              layout="prev, pager, next"
              :total="dataList.length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-size="pageSize"
            ></el-pagination>
          </span>
          <div class="kennsu-filter"></div>
        </div>
      </div>
    </div>
    <!-- エラー表示部 -->
    <div v-else-if="hasError" class="warn-txt">
      <div class="warn-main">
        <svg-icon class="warn-iconm" icon-class="warning icon"></svg-icon>
        <span class="warn-word">{{ errorMsg }}</span>
        <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
      </div>
    </div>
    <div v-if="userNotSet" class="user-not-set">顧客が設定されていません</div>
  </div>
</template>
<script>
import MCL0100Methods from './mcl0100-methods'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
export default {
  name: 'MCL0100',
  extends: MainCardBase,
  mixins: [MCL0100Methods, GlobalMixins],
  data() {
    return {
      // 役務一覧照会APIの戻り値
      serviceList: [],
      // 廃止済役務一覧照会APIの戻り値
      disusedServiceList: [],
      // srvcKindNameを保存します
      dataListPer: [],
      currentItem: {
        index: 0,
        arrIndex: 0
      },
      userNotSet: false
    }
  },
  created() {
    this.initView()
  },
  computed: {
    dataListNum() {
      let recRecNum = 0
      let invalidNum = 0
      let totalNum = 0
      for (let i = 0; i < this.dataList.length; i++) {
        recRecNum += this.dataList[i].recRecNum
        invalidNum += this.dataList[i].invalidNum
      }
      totalNum = recRecNum + invalidNum
      return '合計：' + totalNum + '件（無効' + invalidNum + '件を含む）'
    },
    hasData() {
      return this.dataList && this.dataList.length > 0
    }
  }
}
</script>
<style scoped>
.maincard-center {
  min-height: 200px;
}
.spe-font {
  font-weight: bold;
}
.first-row {
  width: calc((100vw - 80px - 80px) * 0.5);
  min-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.second-row {
  width: calc((100vw - 80px - 80px) * 0.245);
  min-width: 80px;
}
.third-row {
  width: calc((100vw - 80px - 80px) * 0.25);
  min-width: 80px;
}
.elpage-bottom {
  margin-bottom: 20px;
}
.kennsu-title {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.kennsu-space {
  text-align: center;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.kennsu-filter {
  width: 128px;
}
.kennsuHyouji {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0;
  line-height: 14px;
}
.sp-page {
  margin-bottom: 20px;
}
.kennsu-footer {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 18px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.box-card {
  width: 935px;
  border: 1px solid black;
  border-radius: 10px;
}
.span-line:hover {
  text-decoration: underline;
}
.header {
  text-align: center;
  width: 100%;
  height: 32px;
  line-height: 32px;
  background: #00438b;
  border-radius: 0px 4px 0px 0px;
}
.title-center {
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
}
.maincard-border {
  padding: 20px;
  padding-bottom: 0px;
}
.maincard-title {
  display: flex;
  margin-bottom: 6px;
  font-weight: bold;
  color: #4a4a4a;
}
.maincard-title-text {
  float: left;
  font-weight: bold;
  color: #4a4a4a;
  font-size: 14px;
}
.maincard-text {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: normal;
}
.service-width {
  width: 320px;
}
.inuse-width {
  width: 320px;
}
.abolition-width {
  width: 280px;
}
.text-height {
  display: inline-block;
  line-height: 32px;
  font-weight: normal;
}
.text-content {
  color: #00438b;
  font-family: 'Meiryo UI';
  font-size: 16px;
  cursor: pointer;
  padding-left: 10px;
  font-weight: normal;
}
.text-height:hover {
  background: #ededed;
  width: 100%;
}
.total-count {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  margin-bottom: 12px;
}
.count-display {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
  min-width: 100px;
}
.warn-txt {
  display: flex;
  width: 100%;
  height: 268px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-iconm {
  width: 36px !important;
  height: 32px !important;
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
.user-not-set {
  height: 262px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a4a4a;
}
</style>
<style>
.mcl0100 .box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcl0100 .first-select .el-input {
  width: 60px;
  height: 28px;
}
.mcl0100 .first-select .el-input span.el-input__suffix span i {
  color: #00438b;
}
.mcl0100 .el-pager {
  display: flex;
  align-items: center;
}
.mcl0100 .el-pager li {
  font-family: 'Meiryo UI';
  margin: 0 10px;
  color: #00438b;
}
.mcl0100 .el-input--mini .el-input__inner {
  border: 1px solid #979797;
}
.mcl0100 .el-input.is-focus .el-input__inner {
  border: 1px solid #00438b;
}
.mcl0100 .el-input.is-disabled .el-input__inner {
  border: 1px solid #dcdfe6;
}
.mcl0100 .first-select .el-input__inner {
  padding-left: 10px;
}
.mcl0100 .maincard-border .srvc_kind_name {
  background: #edeeee;
  line-height: 26px;
  height: 26px;
  padding-left: 10px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
  margin-bottom: 5px;
}
</style>
