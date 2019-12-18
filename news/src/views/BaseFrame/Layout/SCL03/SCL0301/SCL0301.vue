<template>
  <div class="scl03">
    <el-card :class="isCardShow()">
      <div slot="header">
        <span class="header-text">{{subcardName}}</span>
      </div>
      <el-row class="row-text">サービス一覧</el-row>
      <div class="warn-text" v-if="!isCutomInfoSet">
        <span>{{userNotDefined}}</span>
      </div>
      <div v-else-if="totalCount > 0 && !hasError" class="out-space title-height">
        <el-row class="spe-row">
          <span class="left-text">合計契約数</span>
          <span class="right-text">{{totalCount+' '+'件'}}</span>
        </el-row>
        <div class="all-row-height">
          <el-row class="row-height" v-for="(item, index) in dataPerPage" :key="index">
            <span class="span-line" @click="openMclsec(item)">{{item.srvcKindName}}</span>
            <span class="rec-num">{{item.recRecNum+' '+'件'}}</span>
          </el-row>
        </div>
        <el-row class="row-center">
          <span class="shoryaku-kigo" @click="openMcl03List()">すべて見る</span>
        </el-row>
      </div>
      <div class="warn-maintxt" v-else-if="hasError">
        <div class="warn-maintxt-box">
          <svg-icon icon-class="warning icon" class="warn-icons"></svg-icon>
          <span class="warn-word">{{errorMsg}}</span>
          <span class="warn-word">{{'エラーコード：' + errorCode}}</span>
        </div>
      </div>
      <div v-else-if="totalCount === 0">
        <div class="warn-text">
          <span>該当するサービスはありません。</span>
        </div>
        <el-row class="row-center-dis">
          <span class="shoryaku-kigo-dis">すべて見る</span>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import SCL03Mixin from '../mixin/scl03-mixin'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as CARDIDLIST from '@/constants/card-id-constants'
import GlobalMixins from '@/mixin/global-mixins'
import SubCardBase from '@/mixin/sub-card-base'
import '@/assets/css/scl03Common.css'
export default {
  name: 'SCL0301',
  extends: SubCardBase,
  mixins: [SCL03Mixin, GlobalMixins],
  data() {
    return {
      optionId: OPTION_ID.SCL0301A
    }
  },
  created() {
    this.cardId = CARDIDLIST.SCL0301
  }
}
</script>
<style scoped>
.scl03 .span-line {
  float: left;
  cursor: pointer;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #00438b;
  letter-spacing: 0.27px;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scl03 .user-no-authority {
  float: left;
  cursor: pointer;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.27px;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
}
.scl03 .span-line:hover {
  text-decoration: underline;
}
.scl03 .scl03-size {
  width: 300px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.scl03 .nodata-size {
  height: 257px;
}
.scl03 .data-size {
  height: 276px;
}
</style>
