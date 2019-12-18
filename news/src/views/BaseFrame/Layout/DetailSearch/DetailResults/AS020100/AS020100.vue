<template>
  <div v-if="resultShowCheck" id="as02">
    <div class="detail-search-result" v-if="!initNoData">
      <div class="no-data-space-two">
        <span>該当する結果は存在しません。条件を変えて検索し直してください。</span>
      </div>
    </div>
    <div v-if="!hasDetailError && initNoData" class="detail-search-result">
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
            ref="elPageFirst"
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
          <el-table v-if="authFlg" :data="filterData" class="table-spe">
            <el-table-column fixed type="index"></el-table-column>
            <el-table-column v-if="authFlg" fixed label="顧客ID">
              <template slot-scope="scope">
                <span
                  @click="toMainCard(scope.row.commonCustId)"
                  class="span-line link-style"
                >{{custIdLabel(scope.row.commonCustId)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="custName" label="顧客名"></el-table-column>
            <el-table-column prop="custAddr" label="住所"></el-table-column>
            <el-table-column label="創立年月日/生年月日">
              <template slot-scope="scope">
                <span>{{birth(scope.row.birthFoundDate,scope.row.birth,scope.row.domestFrgnTyp,scope.row.corpOrPersTyp,scope.row.foundDate)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="!authFlg" :data="filterData" class="table-spe">
            <el-table-column fixed type="index"></el-table-column>
            <el-table-column fixed label="顧客ID" prop="commonCustId"></el-table-column>
            <el-table-column label="顧客名">********</el-table-column>
            <el-table-column label="住所">********</el-table-column>
            <el-table-column label="創立年月日/生年月日">********</el-table-column>
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
          :current-page="currpage"
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
    <MW05 :visible.sync="mw05Visible" :filterdata="filterid" @filter="handleFilter($event)"></MW05>
  </div>
</template>
<script>
import DetailResultsMixin from '../mixin/detail-results-mixin'
import As020100Methods from './as020100-methods'
import GlobalMixins from '@/mixin/global-mixins'
import '@/assets/css/as02Common.scss'
export default {
  name: 'AS020100',
  mixins: [GlobalMixins, DetailResultsMixin, As020100Methods],
  data() {
    return {
      filterid: 'AS020100',
      authFlg: false,
      maxSize: 2000
    }
  }
}
</script>
