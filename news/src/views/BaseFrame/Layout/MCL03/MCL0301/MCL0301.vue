<template>
  <div ref="mcl0301" class="mcl03">
    <div class="header">
      <div class="title" @click="onBackList">
        <svg-icon class="title-Img" icon-class="GobackButton"></svg-icon>
        <span class="title-left">役務一覧</span>
      </div>
      <span class="title-center">サービス一覽</span>
    </div>
    <!-- データ表示部 -->
    <div class="main-card-center">
      <div class="main-card-border" v-if="hasData">
        <div class="main-card-title">
          <span class="number-rec">{{ pageCntArea }}</span>
          <span class="page-box">
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
            <span class="data-num">件表示</span>
          </div>
        </div>
        <el-row class="content-title">
          <el-col class="first-row">
            <span class="main-card-text">サービス名</span>
          </el-col>
          <el-col class="second-row">
            <span class="main-card-text">有効契約数</span>
          </el-col>
          <el-col class="third-row">
            <span class="main-card-text">無効契約数</span>
          </el-col>
        </el-row>
        <el-row
          class="text-height"
          v-for="item in dataListPerPage()"
          :key="item.name"
        >
          <el-col class="first-row">
            <span
              class="span-line text-content"
              @click="changeToInfoView(item)"
              >{{ item.name }}</span
            >
          </el-col>
          <el-col class="second-row">
            <span>{{ item.number }}</span>
          </el-col>
          <el-col class="third-row">
            <span>{{ item.noUseNum }}</span>
          </el-col>
        </el-row>
        <div class="content-footer">
          <span class="number-rec">{{ pageCntArea }}</span>
          <span class="page-box">
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
      <div v-else class="no-result-data">該当する契約はありません</div>
    </div>
    <!-- エラー表示部 -->
    <div class="warn-txt" v-if="hasError">
      <div class="warn-main">
        <svg-icon class="warni-conm" icon-class="warning icon"></svg-icon>
        <span class="warn-word">{{ errorMsg }}</span>
        <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import MCL03Mixin from '../mixin/mcl03-mixin.js'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
import * as CARD_ID from '@/constants/card-id-constants'
import * as OPTION_ID from '@/constants/option-id-constans'
import '@/assets/css/mcl03Common.css'

export default {
  name: 'MCL0301',
  extends: MainCardBase,
  mixins: [MCL03Mixin, GlobalMixins],

  created() {
    this.cardId = CARD_ID.MCL0301
    this.optionId = OPTION_ID.MCL0301A
  }
}
</script>
