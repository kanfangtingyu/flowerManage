<template>
  <div id="as02" v-if="resultShowCheck">
    <div class="detail-search-result" v-if="!initNoData">
      <div class="no-data-space-two">
        <span>該当する結果は存在しません。条件を変えて検索し直してください。</span>
      </div>
    </div>
    <div
      v-if="!hasDetailError && initNoData"
      class="detail-search-result"
    >
      <div v-if="!overMax" class="result-head">
        <span class="over-max-warn">※検索結果が表示可能件数を超過しています</span>
      </div>
      <div class="result-head">
        <span class="head-select">
          検索結果：
          <div class="text-div" v-if="overMax">
            <span class="number-Rec">{{pageName}}</span>
          </div>
          <div class="text-div" v-if="!overMax">
            <span class="number-Rec">{{pageNameNom()}}</span>
            <span class="number-Rec over-max-warn">{{pageNameRed()}}</span>
          </div>
        </span>
        <span class="kennsuSpace">
          <el-pagination
            layout="prev, pager, next"
            :total="dateList.length"
            @current-change="handleCurrentChange"
            :current-page.sync="currpage"
            :page-size="pagesize"
          ></el-pagination>
        </span>
        <div>
          <el-select
            v-model="kennsuhyoujiValue"
            placeholder="0"
            size="small"
            class="firstSelectBody"
            ref="sizePulldown"
            @visible-change="inputBlur($event,'sizePulldown')"
            @change="handleSizeChange"
          >
            <el-option
              v-for="item in kennsuhyoujiList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="kennsuHyouji">件表示</span>
          <el-button type="text" @click="showMW05" class="button komi-button">絞り込み</el-button>
        </div>
      </div>
      <div class="resultBody">
        <div v-if="!noData">
          <el-table :data="filterData" class="table-spe">
            <el-table-column fixed type="index"></el-table-column>
            <el-table-column fixed label="契約番号" width="228">
              <template slot-scope="scope">
                <span
                  class="span-line link-style"
                  @click="toMainCard(scope.row.searchResultDetailInfo.applyInfo.contractInfo.contractNumber,scope.row.searchResultDetailInfo.searchRangeType)"
                >{{scope.row.searchResultDetailInfo.applyInfo.contractInfo.contractNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="searchResultDetailInfo.applyInfo.contractCustomerInfo.contractCustomerName"
              label="契約者名"
              width="174"
            ></el-table-column>
            <el-table-column label="設置場所住所" width="300">
              <template slot-scope="scope">
                <span>{{addressExist(scope.row.searchResultDetailInfo.applyInfo.addressList)}}</span>
              </template>
            </el-table-column>
            <!-- todo -->
            <el-table-column label="契約終了年月日" width="174">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.searchResultDetailInfo.applyInfo.contractInfo.contractEndDate"
                >{{custDataLabel(scope.row.searchResultDetailInfo.applyInfo.contractInfo.contractEndDate)}}</span>
                <span v-else>契約中</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="searchResultDetailInfo.applyInfo.productList[0].productInfo.productSummaryName"
              label="商品サマリ"
              width="300"
            ></el-table-column>
          </el-table>
        </div>
        <div class="no-data-space" v-if="noData">
          <span>該当する結果は存在しません。条件を変えて検索し直してください。</span>
        </div>
      </div>
      <span class="spe-span">
        <el-pagination
          layout="prev, pager, next"
          :total="dateList.length"
          @current-change="handleCurrentChange"
          :current-page.sync="currpage"
          :page-size="pagesize"
        ></el-pagination>
      </span>
    </div>
    <!-- エラー表示部 -->
    <div class="warn-txt" v-if="hasDetailError">
      <div class="warn-main">
        <svg-icon class="warni-conm" icon-class="warning icon"></svg-icon>
        <span class="warn-word">{{errorMsg}}</span>
        <span class="warn-word">{{'エラーコード：' + errorCode}}</span>
      </div>
    </div>
    <MW05 :visible.sync="mw05Visible" :filterdata.sync="filterid" @filter="handleFilter($event)"></MW05>
  </div>
</template>
<script>
import AS020 from '../mixin/detail-results-mixin'
import As020302 from './as020302-methods.js'
import GlobalMixins from '@/mixin/global-mixins'
import '@/assets/css/as02Common.scss'
export default {
  mixins: [AS020, As020302, GlobalMixins],
  data() {
    return {
      filterid: 'AS020302',
      sCenterData: [],
      maxSize: 100
    }
  }
}
</script>
