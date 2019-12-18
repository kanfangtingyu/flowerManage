<template>
  <div ref="mcl0200" class="mcl0200">
    <div class="header">
      <span class="title-center">役務一覧</span>
    </div>
    <!-- データ表示部 -->
    <div class="maincard-center" v-if="hasData">
      <div class="maincard-border">
        <div class="kennsu-title">
          <span class="number-rec">{{ pageCntArea }}</span>
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
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="kennsuHyouji">件表示</span>
          </div>
        </div>
        <el-row class="maincard-title">
          <el-col class="first-row">
            <span class="maincard-texttitle">サービス名</span>
          </el-col>
          <el-col class="second-row">
            <span class="maincard-texttitle">有効契約数</span>
          </el-col>
          <el-col class="third-row">
            <span class="maincard-texttitle">無効契約数</span>
          </el-col>
        </el-row>
        <el-row
          class="text-height"
          v-for="(item, index) in dataListPerPage()"
          :key="index"
        >
          <el-col class="first-row">
            <span class="span-line text-content" @click="openMclList(item)">{{
              item.ekimuName
            }}</span>
          </el-col>
          <el-col class="second-row">
            <span>{{ item.recRecNum + '件' }}</span>
          </el-col>
          <el-col class="third-row">
            <span>{{ item.invalidNum + '件' }}</span>
          </el-col>
        </el-row>
        <div class="kennsu-footer footer-down">
          <span class="number-rec"></span>
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
          <div class="kennsu-filter"></div>
        </div>
      </div>
    </div>
    <!-- エラー表示部 -->
    <div v-else-if="hasError">
      <div class="warn-data">
        <div class="warn-data-box">
          <svg-icon class="warn-iconm" icon-class="warning icon"></svg-icon>
          <span class="warn-word">{{ errorMsg }}</span>
          <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MCL0200Methods from './mcl0200-methods'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
export default {
  name: 'MCL0200',
  extends: MainCardBase,
  mixins: [MCL0200Methods, GlobalMixins],
  data() {
    return {
      // 役務一覧照会APIの戻り値
      serviceList: [],
      // 廃止済役務一覧照会APIの戻り値
      disusedServiceList: []
    }
  },
  computed: {
    hasData() {
      return this.dataList && this.dataList.length > 0
    }
  },
  created() {
    this.initView()
  }
}
</script>
<style scoped>
.maincard-center {
  min-height: 200px;
}
.first-row {
  width: calc((100vw - 80px - 80px) * 0.5);
  min-width: 80px;
}
.second-row {
  width: calc((100vw - 80px - 80px) * 0.245);
  min-width: 80px;
}
.third-row {
  width: calc((100vw - 80px - 80px) * 0.25);
  min-width: 80px;
}
.warn-data {
  display: flex;
  width: 100%;
  height: 268px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-data-box {
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
.kennsu-title {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0.27px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.number-rec {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
  min-width: 100px;
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
.kennsu-footer {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 18px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.footer-down .el-pagination {
  margin-top: 15px;
}
.kennsu-none {
  height: 200px;
  padding-left: 450px;
  padding-top: 100px;
}

.box-card {
  width: 935px;
  shadow: never;
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
}
.maincard-title {
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  color: #4a4a4a;
}
.maincard-text {
  float: left;
  font-weight: bold;
  font-size: 14px;
  color: #4a4a4a;
}
.maincard-texttitle {
  float: left;
  font-weight: bold;
  font-size: 14px;
  color: #4a4a4a;
}
.kennsu-none {
  height: 200px;
  padding-left: 450px;
  padding-top: 100px;
}
.text-height {
  height: 30px;
  line-height: 30px;
}
.text-content {
  width: calc((100vw - 80px - 80px) * 0.5);
  min-width: 80px;
  float: left;
  color: #00438b;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-height:hover {
  background: #ededed;
}
</style>
<style>
.box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcl0200 .first-select .el-input {
  width: 60px;
  height: 28px;
}
.mcl0200 .first-select .el-input span.el-input__suffix span i {
  color: #00438b;
}
.mcl0200 .el-pager {
  display: flex;
  align-items: center;
}
.mcl0200 .el-pager li {
  font-family: 'Meiryo UI';
  margin: 0 10px;
  color: #00438b;
}
.mcl0200 .el-input--mini .el-input__inner {
  border: 1px solid #979797;
}
.mcl0200 .el-input.is-focus .el-input__inner {
  border: 1px solid #00438b;
}
.mcl0200 .el-input.is-disabled .el-input__inner {
  border: 1px solid #dcdfe6;
}
.mcl0200 .first-select .el-input__inner {
  padding-left: 10px;
}
</style>
