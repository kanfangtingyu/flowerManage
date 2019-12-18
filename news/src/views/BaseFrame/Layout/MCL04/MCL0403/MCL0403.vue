<template>
  <div ref="mcl04" class="mcl04 mcl0403">
    <div class="header">
      <div class="title">
        <span @click="onBackSrvcList()" class="cursor">
          <svg-icon class="title-Img" icon-class="GobackButton"></svg-icon>
          <span class="spanLine title-Left">サービス一覽</span>
        </span>
      </div>
      <span class="title-center">契約一覧</span>
    </div>
    <div class="maincard-center" v-if="dataDis">
      <div class="maincard-border">
        <div class="kennsu-Title">
          <span class="kennsu-Total">{{ pageCntArea }}</span>
          <span class="kennsu-Space">
            <el-pagination
              layout="prev, pager, next"
              :current-page="currPage"
              :total="dataList.length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-size="pageSize"
            ></el-pagination>
          </span>
          <div class="no-choice">
            <el-select
              ref="selectPageSize"
              v-model="value"
              placeholder="0"
              size="mini"
              class="firstSelect"
              @change="handleSizeChange(value)"
              @visible-change="inputBlur($event, 'selectPageSize')"
            >
              <el-option
                v-for="item in listSetNum"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="kennsuHyouji">件表示</span>
          </div>
        </div>
        <el-table
          v-if="dataListPerPage().length > 0"
          :data="dataListPerPage()"
          class="table-width"
          :header-cell-style="getRowClass"
          :cell-style="cellStyle"
        >
          <el-table-column label="契約番号" min-width="53%">
            <template slot-scope="scope">
              <span class="keiyaku-number">{{ scope.row.contractId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="開始日" min-width="23%">
            <template slot-scope="scope">
              <span>{{ YMDFormat(scope.row.contractStrtDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="終了日" min-width="23%">
            <template slot-scope="scope">
              <span v-if="!scope.row.contractEndDate">契約中</span>
              <span v-else>{{ YMDFormat(scope.row.contractEndDate) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div v-else class="no-result-data">該当する契約はありません</div>
        <div class="kennsu-footer">
          <span class="kennsu-Total"></span>
          <span class="kennsu-Space">
            <el-pagination
              class="up-page"
              layout="prev, pager, next"
              :current-page="currPage"
              :total="dataList.length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-size="pageSize"
            ></el-pagination>
          </span>
          <div class="no-choice"></div>
        </div>
      </div>
    </div>

    <div class="warn-data" v-else>
      <div class="warn-main">
        <svg-icon class="warn-iconm" icon-class="warning icon"></svg-icon>
        <span class="warn-word">{{ errorMsg }}</span>
        <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import MCL04Mixin from '../mixin/mcl04-mixin.js'
import GlobalMixins from '@/mixin/global-mixins'
import * as OPTION_ID from '@/constants/option-id-constans'
import MainCardBase from '@/mixin/main-card-base'
import * as CARD_ID from '@/constants/card-id-constants'
import '@/assets/css/mcl04Common.css'
export default {
  name: 'MCL0403',
  extends: MainCardBase,
  mixins: [MCL04Mixin, GlobalMixins],
  created() {
    this.cardId = CARD_ID.MCL0403
    this.pageID = OPTION_ID.MCL0403A
  }
}
</script>
<style>
.mcl0403 .keiyaku-number {
  color: #4a4a4a;
}
</style>
