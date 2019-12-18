<template>
  <el-container direction="vertical" class="idpf-view-container" id="responsive">
    <div>
      <div
        id="header-bar"
        :class="{
          'is-fixed header-back': headerBarFixed === true,
          'is-fixed error-header-back': headerBarFixed === true && isInputError,
          'header-back': headerBarFixed === false && !isInputError,
          'error-header-back': headerBarFixed === false && isInputError
        }"
        style="min-width:700px;position:relative"
      >
        <!-- タイトル -->
        <div class="header-title">
          <svg-icon icon-class="Logo-CiD" class="logo-icon-style"></svg-icon>
        </div>
        <!-- 検索部 -->
        <div class="header-search">
          <el-autocomplete
            popper-class="my-autocomplete"
            :class="{ inputError: isError, check_input_color: inputTips }"
            v-model="searchKey"
            clearable
            :fetch-suggestions="querySearch"
            v-on:keyup.enter.native="onSimpleSearch"
            @focus="onSimpleSearchFocus"
            @blur="onSimpleSearchBlur"
            :placeholder="placeholder"
          >
            <!-- 検索エコー -->
            <svg-icon slot="prefix" class="header-search-icon" icon-class="search"></svg-icon>
            <template slot-scope="{ item }">
              <div class="value">{{ item.value }}</div>
              <span class="describe">{{ item.describe }}</span>
            </template>
          </el-autocomplete>
          <!-- 入力エラー時表示 -->
          <div
            class="input-check check-color"
            :class="inputTips ? 'err-red-color' : ''"
            v-if="isInputError"
          >{{ inputErrorMsg }}</div>
        </div>
        <!-- 検索ボタン -->
        <div class="header-search-btn">
          <el-button
            :class="searchEnableStyle"
            :disabled="!searchEnable"
            @click="onSimpleSearch"
          >表 示</el-button>
        </div>
        <!-- 詳細検索ボタン -->
        <div class="header-detail-button">
          <el-button class="detail-link-title" @click="doDetailSearch">詳細検索</el-button>
        </div>

        <!-- ログアウトエリア -->
        <div @click="doLogout()" class="header-name-content">
          <span class="content-name">{{ userName }}</span>
          <svg-icon class="content-icon" icon-class="Profile"></svg-icon>
        </div>
      </div>
      <div v-if="headerBarFixed" :class="isInputError ? 'header-error-height' : 'header-height'"></div>
      <!-- 詳細検索エリア -->
      <detail-search :detailSearchShow.sync="detailSearchShow"></detail-search>
      <!-- 顧客情報エリア -->
      <div id="scroll-handler"></div>
      <el-row id="nav-bar" :class="navBarStyle">
        <div class="nav-bar-common">
          <span class="nav-common-cust-id" :title="customerInfoTitle()">
            {{
            customerInfoTitle()
            }}
          </span>
          <span class="nav-cust-name" @click="messageBoxPW4" v-if="hasCustomerInfo">
            <svg-icon class="read-end-icon" icon-class="information-area-clear"></svg-icon>閲覧終了
          </span>
        </div>
        <el-button
          :disabled="!isCustomerInfoShow"
          type="text"
          class="nav-open-customer"
          @click="showInformation"
        >
          <svg-icon
            icon-class="information-area_Chevron_active"
            :class="!isCollapse ? '' : 'information-opened'"
          ></svg-icon>
        </el-button>
      </el-row>
      <div v-if="searchBarFixed" class="search-bar-fixed-height"></div>
      <Information :customerInfoTitle="customerInfoTitle()" :visible.sync="isCollapse"></Information>
    </div>
    <!-- maincard エリア -->
    <div class="main-content">
      <div class="main-content-box" id="main-content-box">
        <el-row class="main-content-bottom" v-if="mainCardList.length > 0">
          <el-row class="main-content-margin">
            <div class="tags-view-container tags-content">
              <el-row class="tags-view-wrapper tags-wrapper">
                <draggable
                  :list="tabCardList"
                  :class="mainCartTabStyle"
                  @end="onMoveTag"
                  :options="{
                    group: 'article',
                    animation: 300,
                    ghostClass: 'sortable-ghost'
                  }"
                >
                  <el-tag
                    :key="index"
                    ref="tag"
                    style="text-overflow:ellipsis "
                    :style="{ width: autoWidth }"
                    v-for="(tag, index) in tabCardList"
                    :class="tag.isActived ? 'active' : ''"
                    class="tags-view-item tags-item"
                    closable
                    :disable-transitions="false"
                    @click="changeView(tag)"
                    @close="onCloseTag(tag)"
                  >
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="tag.name"
                      placement="bottom-start"
                      :visible-arrow="false"
                    >
                      <div v-if="tag.name === 'コンシューマ向けOCN'" class="tags-div">第２種</div>
                      <div v-else class="tags-div">{{ tag.name }}</div>
                    </el-tooltip>
                  </el-tag>
                </draggable>
              </el-row>
            </div>
            <div :class="mainCardList.length > 6 ? 'popover-box' : ''">
              <el-popover
                placement="bottom"
                ref="popover"
                v-model="popoverVisible"
                width="200"
                trigger="click"
                v-if="mainCardList.length > 6"
              >
                <div
                  class="popoverclass"
                  @click="changeSelectedTagInList(tag)"
                  v-for="(tag, index) in mainCardList"
                  :key="index"
                >
                  <div v-if="tag.isActived" class="selectedCurcle"></div>
                  <span
                    :class="
                      tag.isActived
                        ? 'maincard-list-selected'
                        : 'maincard-list-no-selected'
                    "
                  >{{ tag.name }}</span>
                </div>
                <svg
                  class="card-list"
                  width="28px"
                  height="28px"
                  viewBox="0 0 28 28"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  slot="reference"
                >
                  <g
                    id="MoreTabButton"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <rect id="BG_button" fill="#DCDCDC" x="0" y="0" width="28" height="28" rx="4" />
                    <circle id="Oval" fill="#4A4A4A" cx="14" cy="14" r="2" />
                    <circle id="Oval" fill="#4A4A4A" cx="6" cy="14" r="2" />
                    <circle id="Oval" fill="#4A4A4A" cx="22" cy="14" r="2" />
                  </g>
                </svg>
                <!-- <svg-icon icon-class="MoreTabButton" class="card-list" slot="reference"></svg-icon> -->
              </el-popover>
              <div
                v-if="hasCustomerInfo && mainCardList.length > 0"
                class="tags-list popover-list"
                @click="showMW01"
              >
                <svg-icon class="add-maincard-btn" icon-class="AddTabButton_active"></svg-icon>
              </div>
              <div v-else class="tags-list popover-list">
                <svg-icon
                  class="add-maincard-btn cursor-not-allowed"
                  icon-class="AddTabButton_disable"
                ></svg-icon>
              </div>
            </div>
          </el-row>
          <div class="get-last-card-show-div">
            <component
              :is="activedCardInfo.component"
              :key="maincardIndex"
              :maincardName="activedCardInfo.name"
              :maincardCop="activedCardInfo.component"
              :maincardType="activedCardInfo.componentName"
              :ekimuCode="activedCardInfo.ekimuCode"
              :srvcKindCode="activedCardInfo.srvcKindCode"
              :pageClientWidth="pageClientWidth"
            ></component>
          </div>
        </el-row>
        <div v-else class="default-content-padding">
          <div class="tags-list" v-if="!hasCustomerInfo || keyType === searchTypeB">
            <svg-icon class="add-maincard-btn cursor-not-allowed" icon-class="AddTabButton_disable"></svg-icon>
          </div>
          <div v-else class="tags-list" @click="showMW01">
            <svg-icon class="add-maincard-btn cursor-allowed" icon-class="AddTabButton_active"></svg-icon>
          </div>
          <div class="default-body">
            <div class="default-body-head"></div>
            <span>{{ mainCardContent }}</span>
          </div>
        </div>
      </div>
      <div class="area-border" />
      <div class="main-content-box main-content-list">
        <el-row class="main-content-list-top">
          <span class="main-content-list-top-title">よく使う機能</span>
          <label @click="showMW02">
            <svg-icon icon-class="Add-remove" class="add-subcard-icon"></svg-icon>
            <span class="span-line add-title">追加・削除</span>
          </label>
        </el-row>
        <div v-if="noSubcard()" class="no-subcard-list">よく使う機能に設定されている項目はありません</div>
        <el-row v-else class="main-content-list-bottom">
          <draggable
            :key="3"
            :list="subCardList"
            class="drag-subcard"
            :options="{
              group: 'mission',
              animation: 300,
              ghostClass: 'sortable-ghost'
            }"
            @end="onMoveSubcard"
          >
            <div v-for="(item, index) in subCardList" :key="index" class="drag-div-style">
              <component
                :is="item.component"
                :key="index"
                :subcardName="item.name"
                :mainCardTop="mainCardTop"
                :ekimuCode="item.ekimuCode"
                :srvcKindCode="item.srvcKindCode"
              ></component>
            </div>
          </draggable>
        </el-row>
      </div>
      <div class="area-border-solid" />
      <el-row class="footer-content">
        <el-row class="footer-content-head">
          <span class="main-content-list-top-title">外部リンク</span>
        </el-row>
        <el-row class="footer-content-icon">
          <ul class="footer-content-ul">
            <draggable
              :key="3"
              :list="toolIconList"
              class="drag-tool-icon"
              :options="{ group: 'mission', animation: 300 }"
              @start="drag = true"
              @end="drag = false"
            >
              <li v-for="item in toolIconList" :key="item.code">
                <span @click="transformToNb" class="tool-area">
                  <div class="tool-icon">
                    <svg-icon icon-class="NTTcom_icon-NB" class="nb-icon-style"></svg-icon>
                  </div>
                  <span class="tool-icon-title">{{ item.title }}</span>
                </span>
              </li>
            </draggable>
          </ul>
        </el-row>
      </el-row>
      <MW01 :visible.sync="mw01Visible" :mainCardTop="mainCardTop"></MW01>
      <MW02 :visible.sync="mw02Visible"></MW02>
    </div>
    <span @click="toPageTop()">
      <svg-icon icon-class="scroll-top" class="scroll-to-top" v-if="toTopShow"></svg-icon>
    </span>
  </el-container>
</template>

<script>
import BaseframeMethods from './baseframe-methods'
import * as BaseFrameConstants from './baseframe-constants'
import SCL0100 from './Layout/SCL0100/SCL0100'
import SCL0200 from './Layout/SCL0200/SCL0200'
import SCL0300 from './Layout/SCL03/SCL0300/SCL0300'
import SCL0301 from './Layout/SCL03/SCL0301/SCL0301'
import SCL0302 from './Layout/SCL03/SCL0302/SCL0302'
import SCL0303 from './Layout/SCL03/SCL0303/SCL0303'
import SCL0400 from './Layout/SCL04/SCL0400/SCL0400'
import SCL040101 from './Layout/SCL04/SCL0401/SCL040101'
import SCL040102 from './Layout/SCL04/SCL0401/SCL040102'
import SCL040103 from './Layout/SCL04/SCL0401/SCL040103'
import SCL040104 from './Layout/SCL04/SCL0401/SCL040104'
import SCL040105 from './Layout/SCL04/SCL0401/SCL040105'
import SCL040106 from './Layout/SCL04/SCL0401/SCL040106'
import SCL040107 from './Layout/SCL04/SCL0401/SCL040107'
import SCL040108 from './Layout/SCL04/SCL0401/SCL040108'
import SCL040109 from './Layout/SCL04/SCL0401/SCL040109'
import SCL040110 from './Layout/SCL04/SCL0401/SCL040110'
import SCL040111 from './Layout/SCL04/SCL0401/SCL040111'
import SCL040112 from './Layout/SCL04/SCL0401/SCL040112'
import SCL040113 from './Layout/SCL04/SCL0401/SCL040113'
import SCL040114 from './Layout/SCL04/SCL0401/SCL040114'
import SCL040115 from './Layout/SCL04/SCL0401/SCL040115'
import SCL040116 from './Layout/SCL04/SCL0401/SCL040116'
import SCL040117 from './Layout/SCL04/SCL0401/SCL040117'
import SCL040118 from './Layout/SCL04/SCL0401/SCL040118'
import SCL040119 from './Layout/SCL04/SCL0401/SCL040119'
import SCL040120 from './Layout/SCL04/SCL0401/SCL040120'
import SCL040121 from './Layout/SCL04/SCL0401/SCL040121'
import SCL040122 from './Layout/SCL04/SCL0401/SCL040122'
import SCL040123 from './Layout/SCL04/SCL0401/SCL040123'
import SCL040124 from './Layout/SCL04/SCL0401/SCL040124'
import SCL040125 from './Layout/SCL04/SCL0401/SCL040125'
import SCL040126 from './Layout/SCL04/SCL0401/SCL040126'
import SCL040127 from './Layout/SCL04/SCL0401/SCL040127'
import SCL040128 from './Layout/SCL04/SCL0401/SCL040128'
import SCL040129 from './Layout/SCL04/SCL0401/SCL040129'
import SCL040130 from './Layout/SCL04/SCL0401/SCL040130'
import SCL040131 from './Layout/SCL04/SCL0401/SCL040131'
import SCL040132 from './Layout/SCL04/SCL0401/SCL040132'
import SCL040133 from './Layout/SCL04/SCL0401/SCL040133'
import SCL0402 from './Layout/SCL04/SCL0402/SCL0402'
import SCL040301 from './Layout/SCL04/SCL0403/SCL040301'
import SCL040302 from './Layout/SCL04/SCL0403/SCL040302'
import SCL040303 from './Layout/SCL04/SCL0403/SCL040303'
import SCL0404 from './Layout/SCL04/SCL0404/SCL0404'
import SCL0405 from './Layout/SCL04/SCL0405/SCL0405'
import SCL040601 from './Layout/SCL04/SCL0406/SCL040601'
import SCL040602 from './Layout/SCL04/SCL0406/SCL040602'
import SCL040603 from './Layout/SCL04/SCL0406/SCL040603'
import SCL040604 from './Layout/SCL04/SCL0406/SCL040604'
import SCL040605 from './Layout/SCL04/SCL0406/SCL040605'
import SCL040606 from './Layout/SCL04/SCL0406/SCL040606'
import SCL040607 from './Layout/SCL04/SCL0406/SCL040607'
import SCL040608 from './Layout/SCL04/SCL0406/SCL040608'
import SCL040609 from './Layout/SCL04/SCL0406/SCL040609'
import SCL040610 from './Layout/SCL04/SCL0406/SCL040610'
import SCL040611 from './Layout/SCL04/SCL0406/SCL040611'
import SCL040612 from './Layout/SCL04/SCL0406/SCL040612'
import MW02 from '../popups/MW02/MW02'
import MW01 from '../popups/MW01/MW01'
import MCD0100 from './Layout/MCD0100/MCD0100'
import MCD0101 from './Layout/MCD0101/MCD0101'
import MCD0102 from './Layout/MCD0102/MCD0102'
import MCD0200 from './Layout/MCD0200/MCD0200'
import MCL0300 from './Layout/MCL03/MCL0300/MCL0300'
import MCL0301 from './Layout/MCL03/MCL0301/MCL0301'
import MCL0302 from './Layout/MCL03/MCL0302/MCL0302'
import MCL0303 from './Layout/MCL03/MCL0303/MCL0303'
import MCL0400 from './Layout/MCL04/MCL0400/MCL0400'
import MCL0100 from './Layout/MCL0100/MCL0100'
import MCL0200 from './Layout/MCL0200/MCL0200'
import MCL0401 from './Layout/MCL04/MCL0401/MCL0401'
import MCL0402 from './Layout/MCL04/MCL0402/MCL0402'
import MCL0403 from './Layout/MCL04/MCL0403/MCL0403'
import MCL0404 from './Layout/MCL04/MCL0404/MCL0404'
import MCL0405 from './Layout/MCL04/MCL0405/MCL0405'
import MCL0406 from './Layout/MCL04/MCL0406/MCL0406'
import draggable from 'vuedraggable'
import Information from './Layout/Information/Information'
import DetailSearch from './Layout/DetailSearch/DetailSearch'
import '@/assets/css/responsive.css'
import * as changeWidth from '@/utils/change-width'
import * as IDPFEvent from '@/constants/idpf-event'
import GlobalMixins from '@/mixin/global-mixins'
import * as GlobalConstants from '@/constants/global-constants'
import { E_WEB1001 } from '@/constants/idpf-message.js'
export default {
  name: 'BaseFrame',
  mixins: [BaseframeMethods, GlobalMixins],
  components: {
    MW01,
    MW02,
    SCL0100,
    SCL0200,
    SCL0300,
    SCL0301,
    SCL0302,
    SCL0303,
    SCL0400,
    SCL040101,
    SCL040102,
    SCL040103,
    SCL040104,
    SCL040105,
    SCL040106,
    SCL040107,
    SCL040108,
    SCL040109,
    SCL040110,
    SCL040111,
    SCL040112,
    SCL040113,
    SCL040114,
    SCL040115,
    SCL040116,
    SCL040117,
    SCL040118,
    SCL040119,
    SCL040120,
    SCL040121,
    SCL040122,
    SCL040123,
    SCL040124,
    SCL040125,
    SCL040126,
    SCL040127,
    SCL040128,
    SCL040129,
    SCL040130,
    SCL040131,
    SCL040132,
    SCL040133,
    SCL0402,
    SCL040301,
    SCL040302,
    SCL040303,
    SCL0404,
    SCL0405,
    SCL040601,
    SCL040602,
    SCL040603,
    SCL040604,
    SCL040605,
    SCL040606,
    SCL040607,
    SCL040608,
    SCL040609,
    SCL040610,
    SCL040611,
    SCL040612,
    MCD0100,
    MCD0101,
    MCD0102,
    MCD0200,
    MCL0400,
    MCL0300,
    MCL0301,
    MCL0302,
    MCL0303,
    MCL0100,
    MCL0200,
    MCL0401,
    MCL0402,
    MCL0403,
    MCL0404,
    MCL0405,
    MCL0406,
    draggable,
    Information,
    DetailSearch
  },
  data() {
    return {
      mainCardList: [], // 選択済カード一覧
      tabCardList: [], // tabに表示中カード一覧
      tabCardIndex: 0,
      subCardList: [], // 選択済サブカード一覧
      searchKey: '', // 簡易検索の検索キー
      searchType: 0, // 0: 簡易検索 1: 詳細検索
      customerInfo: null,
      accelCustomerInfo: null,
      detailSearchInfo: {
        searchKey: '',
        searchType: GlobalConstants.DETAIL_SEARCH,
        keyType: ''
      },
      searchValue: '',
      contractInfo: {
        contractCustName: '',
        srvcId: ''
      }, // 契約情報
      customerInfoError: {
        code: '',
        message: ''
      },
      mw01Visible: false,
      mw02Visible: false,
      userName: '',
      userAuthority: {}, // ユーザ権限
      isError: false,
      inputTips: false,
      resultTips: false,
      roleTips: false,
      mainCardTop: 0,
      searchEnable: false,
      detailSearchShow: false,
      activedCardInfo: {},
      maincardIndex: -1,
      popoverVisible: false,
      searchBarFixed: false,
      headerBarFixed: false,
      autoWidth: '148px',
      isCollapse: false,
      pageClientWidth: document.body.clientWidth,

      // 現時点、外部リンクに「NB基盤」のみ表示
      toolIconList: [
        {
          title: 'NB基盤',
          iconRoot: '',
          code: '1'
        }
      ],
      inputPlaceholder: '契約番号（N番・電番）、顧客番号（C番）',
      toTopShow: false,
      searchTypeB: GlobalConstants.B_SEARCH,
      showPW02Flg: false,
      getAccelCustomerFlg: false
    }
  },
  watch: {
    searchKey: {
      handler(value) {
        if (value !== '') {
          let result = this.checkSearchKeyDigit(value)
          if (!result) {
            this.searchEnable = false
          } else {
            this.searchEnable = true
          }
        } else {
          this.inputTips = false
          this.resultTips = false
          this.roleTips = false
        }
      },
      immediate: true,
      deep: true
    },
    customerInfo: {
      handler(value, oldval) {
        if (value !== '') {
        }
      }
    },
    mainCardList: {
      handler(value) {
        let cardList = value
        let tabsList = null
        this.$nextTick(() => {
          tabsList = document.getElementsByClassName('tags-div')
          if (this.tabCardList.length >= 5) {
            if (cardList.length >= 6) {
              // タブの数量が6より多い場合、タブの幅を設定する
              let startWidth = this.autoWidth
              if (this.pageClientWidth >= 1024 && cardList.length > 6) {
                this.autoWidth = changeWidth.changeTabWidth(
                  this.pageClientWidth,
                  cardList,
                  this.autoWidth
                )
              } else if (
                this.pageClientWidth >= 795 &&
                this.pageClientWidth <= 1023
              ) {
                this.autoWidth = changeWidth.changeTabWidth(
                  this.pageClientWidth,
                  cardList,
                  this.autoWidth
                )
              } else if (
                this.pageClientWidth <= 794 &&
                this.pageClientWidth > 700
              ) {
                this.autoWidth = changeWidth.changeTabWidth(
                  this.pageClientWidth,
                  cardList,
                  this.autoWidth
                )
              } else if (this.pageClientWidth <= 700) {
                this.autoWidth = changeWidth.changeTabWidth(
                  this.pageClientWidth,
                  cardList,
                  this.autoWidth
                )
              }
              let newAutoWidth = this.autoWidth
              changeWidth.tabWidthDiff(
                startWidth,
                newAutoWidth,
                tabsList,
                cardList
              )
            } else if (
              this.tabCardList.length === 5 &&
              this.pageClientWidth < 875 &&
              this.pageClientWidth > 700
            ) {
              // タブの数量が5、Windowsの幅が700pxより大きい、875pxより小さい
              let startWidth = this.autoWidth
              this.autoWidth = changeWidth.changeTabWidth(
                this.pageClientWidth,
                cardList,
                this.autoWidth
              )
              changeWidth.tabWidthDiff(
                startWidth,
                this.autoWidth,
                tabsList,
                this.tabCardList
              )
            } else if (
              this.tabCardList.length === 5 &&
              this.pageClientWidth <= 700
            ) {
              // タブの数量が5、Windowsの幅が700pxより小さい
              this.autoWidth = changeWidth.changeTabWidth(
                this.pageClientWidth,
                this.tabCardList,
                this.autoWidth
              )
            } else if (
              this.tabCardList.length === 5 &&
              this.pageClientWidth >= 795 &&
              this.pageClientWidth <= 1023
            ) {
              // タブの数量が5、Windowsの幅が795pxより大きい、1023pxより小さい
              let startWidth = this.autoWidth
              // タブの総幅さがメインカードの幅さより小さいなら、レスポンスがある。その逆に、148pxを設定する
              if (this.pageClientWidth > 874) {
                this.autoWidth = '148px'
              } else {
                this.autoWidth = changeWidth.changeTabWidth(
                  this.pageClientWidth,
                  this.tabCardList,
                  this.autoWidth
                )
              }
              changeWidth.tabWidthDiff(
                startWidth,
                this.autoWidth,
                tabsList,
                this.tabCardList
              )
            } else if (this.tabCardList.length < 5) {
              // タブの数量が5より少ない
              let startWidth = this.autoWidth
              this.autoWidth = '148px'
              changeWidth.tabWidthDiff(
                startWidth,
                this.autoWidth,
                tabsList,
                this.tabCardList
              )
            }
          }
        })
      },
      immediate: true,
      deep: true
    },
    pageClientWidth: {
      /**
       * Windowsの幅によって、タブの幅がレスポンスを設定する
       */
      handler(value) {
        let tabsList = document.getElementsByClassName('tags-div')
        // タブの数量が6より多い場合、タブの幅を設定する
        if (this.tabCardList && this.mainCardList.length > 6) {
          let startAutoWidth = this.autoWidth
          this.autoWidth = changeWidth.pageWidthChangeTab(
            value,
            this.mainCardList,
            this.autoWidth
          )
          changeWidth.tabWidthDiff(
            startAutoWidth,
            this.autoWidth,
            tabsList,
            this.tabCardList
          )
        } else if (
          this.tabCardList &&
          this.tabCardList.length === 5 &&
          value < 875 &&
          value > 700
        ) {
          // タブの数量が5、Windowsの幅が700pxより大きい、875pxより小さい
          let startAutoWidth = this.autoWidth
          this.autoWidth = changeWidth.pageWidthChangeTab(
            value,
            this.tabCardList,
            this.autoWidth
          )
          changeWidth.tabWidthDiff(
            startAutoWidth,
            this.autoWidth,
            tabsList,
            this.tabCardList
          )
        } else if (
          this.tabCardList &&
          this.tabCardList.length === 5 &&
          value <= 700
        ) {
          // タブの数量が5、Windowsの幅が700pxより小さい
          let startAutoWidth = this.autoWidth
          this.autoWidth = changeWidth.pageWidthChangeTab(
            value,
            this.tabCardList,
            this.autoWidth
          )
          changeWidth.tabWidthDiff(
            startAutoWidth,
            this.autoWidth,
            tabsList,
            this.tabCardList
          )
        } else if (this.mainCardList.length === 6 && value < 1024) {
          let startAutoWidth = this.autoWidth
          this.autoWidth = changeWidth.pageWidthChangeTab(
            value,
            this.mainCardList,
            this.autoWidth
          )
          changeWidth.tabWidthDiff(
            startAutoWidth,
            this.autoWidth,
            tabsList,
            this.tabCardList
          )
        } else {
          // タブの数量が5より少ない
          let startAutoWidth = this.autoWidth
          this.autoWidth = '148px'
          changeWidth.tabWidthDiff(
            startAutoWidth,
            this.autoWidth,
            tabsList,
            this.tabCardList
          )
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    mainCardContent() {
      if (!this.customerInfo) {
        return '顧客が設定されていません'
      } else if (this.mainCardList.length === 0) {
        return '表示中のカードはありません'
      } else {
        return ''
      }
    },

    isCustomerInfoShow() {
      // 顧客基本情報あり、まだ通信エラーが発生の時
      if (this.customerInfoTitle !== GlobalConstants.CUSTOMER_NO_SET) {
        return true
      } else {
        return false
      }
    },
    isInputError() {
      return this.inputTips || this.resultTips || this.roleTips
    },
    inputErrorMsg() {
      if (this.inputTips) {
        return BaseFrameConstants.FORM_CHECK
      } else if (this.resultTips) {
        return BaseFrameConstants.RESULT_CHECK
      } else if (this.roleTips) {
        return BaseFrameConstants.AUTHORITY_CHECK
      }

      return ''
    },
    navBarStyle() {
      if (this.searchBarFixed && !this.isInputError) {
        return 'is-search-bar-fixed nav'
      } else if (this.searchBarFixed && this.isInputError) {
        return 'error-search-bar-fixed nav'
      }
      return 'nav'
    },
    searchEnableStyle() {
      return this.searchEnable
        ? 'clickable-button search-button'
        : 'disabled-search search-button'
    },
    hasCustomerInfo() {
      return this.customerInfo !== null
    },
    mainCartTabStyle() {
      return this.mainCardList.length <= BaseFrameConstants.MAX_TAB_COUNT
        ? 'no-width drag-tag'
        : 'drag drag-tag'
    },
    placeholder() {
      if (this.pageClientWidth < 960) {
        return ''
      } else {
        return this.inputPlaceholder
      }
    }
  },
  methods: {
    customerInfoTitle() {
      this.showPW02Flg = false
      if (this.customerInfoError.code) {
        this.showPW02Flg = true
        return E_WEB1001
      } else if (!this.customerInfo) {
        if (this.contractInfo.contractCustName) {
          this.showPW02Flg = true
          return (
            '該当なし ' +
            this.contractInfo.contractCustName +
            '（' +
            this.contractInfo.srvcId +
            '）'
          )
        } else {
          if (
            this.mainCardList.length > 0 &&
            this.keyType !== GlobalConstants.B_SEARCH
          ) {
            this.showPW02Flg = true
          }
          return GlobalConstants.CUSTOMER_NO_SET // '顧客未設定'
        }
      } else {
        let commonCustIdLeft = this.customerInfo.commonCustId.slice(0, 3)
        let commonCustIdMid = this.customerInfo.commonCustId.slice(3, 7)
        let commonCustIdRight = this.customerInfo.commonCustId.slice(7, 11)
        return (
          commonCustIdLeft +
          '-' +
          commonCustIdMid +
          '-' +
          commonCustIdRight +
          '　' +
          this.customerInfo.custName
        )
      }
    }
  },
  mounted() {
    // 画面を初期化する
    this.initView()
    this.mainCardTop = document.getElementById('main-content-box').offsetTop
    window.addEventListener('scroll', this.handleScroll)
    const navOffsetTop = document.getElementById('nav-bar').offsetTop
    if (navOffsetTop < 63) {
      this.searchBarFixed = false
    }
    this.headerBarFixed = false
    window.onresize = () => {
      return (() => {
        this.pageClientWidth = document.body.clientWidth
      })()
    }
    this.pageClientWidth = document.body.clientWidth

    this.$idpfEventBus.$on(
      IDPFEvent.REFRESH_MAINCARD_LIST_VIEW,
      this.refreshMainCardListView
    )
    this.$idpfEventBus.$on(
      IDPFEvent.REFRESH_SUBCARD_LIST_VIEW,
      this.refreshSubCardListView
    )

    this.$idpfEventBus.$on(IDPFEvent.GET_CUSTOMER_INFO, this.getCustomerInfo)
    this.$idpfEventBus.$on(
      IDPFEvent.REFRESH_CUSTOMER_INFO,
      this.refreshCustomerInfo
    )

    // 検索結果なし
    this.$idpfEventBus.$on(
      IDPFEvent.SEARCH_RESULT_VIEW,
      this.refreshSearchResultView
    )

    // 詳細検索から
    this.$idpfEventBus.$on(IDPFEvent.ON_DETAIL_SEARCH, this.onDetailSearch)
  },
  beforeDestroy() {
    this.$idpfEventBus.$off(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
    this.$idpfEventBus.$off(IDPFEvent.REFRESH_SUBCARD_LIST_VIEW)
    this.$idpfEventBus.$off(IDPFEvent.GET_CUSTOMER_INFO)
    this.$idpfEventBus.$off(IDPFEvent.REFRESH_CUSTOMER_INFO)
    this.$idpfEventBus.$off(IDPFEvent.SEARCH_RESULT_VIEW)
    this.$idpfEventBus.$off(IDPFEvent.ON_DETAIL_SEARCH)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.idpf-view-container .input-check {
  font-family: Meiryo;
  font-size: 12px;
  color: #4a4a4a;
  position: absolute;
  bottom: 0px;
}
.idpf-view-container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
.idpf-view-container .header {
  width: 1022px;
  position: fixed;
  top: 0px;
  z-index: 100;
}
.span-line:hover {
  text-decoration: underline;
}
.popoverclass {
  height: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.popoverclass:hover {
  background-color: #b4bccc !important;
}
.popoverclass.grid-row-selected {
  color: #00438b !important;
}
.maincard-list-selected {
  width: 95%;
  font-family: 'Meiryo UI';
  cursor: pointer;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  color: #00438b;
  margin-left: 6px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.maincard-list-no-selected {
  font-family: 'Meiryo UI';
  cursor: pointer;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  color: #4a4a4a;
  margin-left: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yokohaba {
  height: 12px;
  background: #ccc;
  opacity: 0.3;
}
.is-fixed {
  position: fixed !important;
  top: -1px;
  z-index: 1000;
  width: 1022px;
  border-bottom: 1px solid #00438b;
}
.is-search-bar-fixed {
  position: fixed;
  top: 64px;
  z-index: 999;
  width: 1022px;
  border-bottom: 1px solid #c9ced7;
}
.error-search-bar-fixed {
  position: fixed;
  top: 74px;
  z-index: 999;
  width: 1022px;
  border-bottom: 1px solid #c9ced7;
}
.closeDetailBtn {
  position: absolute;
  top: 17px;
  right: 40px;
  cursor: pointer;
}
.tags-view-container {
  height: 31px;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      border: 1px solid #d8dce5;
      color: #4a4a4a;
      background: #dcdcdc;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #00438b !important;
        color: #fff !important;
        border-color: #00438b;
        // width: 148px !important;
        // .tags-div {
        //   width: 130px !important;
        // }
      }
    }
  }
}
.header-back {
  height: 65px;
  background-color: white;
  display: flex;
  align-items: center;
}
.error-header-back {
  height: 75px;
  background: white;
  display: flex;
  align-items: center;
}
.header-title {
  float: left;
  padding-left: 42px;
  font-size: 24px;
  font-family: DINAlternate-Bold;
  width: 51px;
  height: 28px;
  line-height: 28px;
  color: #4a4a4a;
}
.logo-icon-style {
  width: 50px;
  height: 30px;
}
.header-search {
  float: left;
  margin-left: 29px;
  margin-right: 0px;
}
.header-search-icon {
  margin-top: 11px;
  padding-left: 3px;
}
.describe {
  margin-top: -5px;
}
.header-search-btn {
  float: left;
  margin-left: -1px;
  .clickable-button {
    background: #00438b;
  }
  .search-button {
    width: 140px;
    height: 38px;
    font-family: 'Meiryo UI';
    font-weight: bold;
    color: #ffffff;
    font-size: 14px;
    border-radius: 0 4px 4px 0;
  }
  .search-button:hover {
    background-color: #2665b2;
  }
  .disabled-search {
    background-color: #d8d8d8;
  }
  .disabled-search:hover {
    background-color: #d8d8d8;
  }
}
.header-detail-button {
  float: left;
  margin-left: 11px;
  line-height: 62px;
  .detail-link-title {
    width: 140px;
    height: 36px;
    font-family: 'Meiryo UI';
    font-weight: bold;
    border-color: #00438b;
    font-size: 14px;
    color: #00438b;
    letter-spacing: 2px;
    margin-top: 14px;
  }
  .detail-link-title:disabled {
    color: #9b9b9b;
    background: #fafafa;
    border: 1px solid #cfd3db;
  }
}
.header-name-content {
  float: right;
  text-align: right;
  height: 64px;
  display: flex;
  align-items: center;
  margin-right: 40px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0px;
  .content-name {
    width: 176px;
    font-family: 'Meiryo UI';
    font-size: 14px;
    color: #00438b;
    letter-spacing: 0.27px;
    font-weight: bold;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
  }
  .content-icon {
    margin-left: 10px;
    width: 32px;
    height: 20px;
  }
  .contentCompany {
    display: block;
    font-size: 10px;
    color: #4a4a4a;
    text-align: right;
  }
}
.header-error-height {
  height: 75px;
}
.header-height {
  height: 65px;
}
#scroll-handler {
  height: 0px;
}
.nav {
  background-color: #707c8a;
  height: 40px;
  line-height: 40px;
  .nav-common-cust-id {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
    font-size: 14px;
    margin-left: 42px;
  }
  .nav-cust-name {
    color: #ffffff;
    font-size: 14px;
    margin-left: 47px;
    cursor: pointer;
    .read-end-icon {
      position: relative;
      top: 1px;
      margin-right: 5px;
    }
  }
  .nav-cust-name:hover {
    text-decoration: underline;
  }
  .nav-open-customer {
    background-color: #707c8a;
    float: right;
    padding: 2px;
    margin-top: 9px;
    margin-right: 38px;
    border-radius: 10px;
  }
  .nav-open-customer:hover {
    background-color: #606b77;
  }
  .clickable {
    background-color: #707c8a;
    float: right;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-top: 11px;
    margin-right: 40px;
  }
}
.nav-bar-common {
  width: 500px;
  float: left;
  display: flex;
}
.search-bar-fixed-height {
  height: 40px;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-allowed {
  cursor: pointer;
}
.main-content {
  margin-top: 0px;
  padding: 0px;
  .main-content-box {
    background: #f9f9f9;
  }
  .mainContentTop {
    padding-left: 42px;
    padding-bottom: 15px;
    padding-top: 15px;
    .listButton {
      padding-top: 15px;
      background-color: white;
      height: 14px;
      color: blue;
      float: left;
      padding-top: 0px;
    }
    .listTitle {
      float: left;
      font-size: 12px;
      margin-left: 10px;
      color: #00438b;
      cursor: pointer;
      font-family: 'Meiryo UI';
      margin-right: 58px;
    }
    .sakujyoTitle {
      float: left;
      font-size: 12px;
      margin-left: 10px;
      color: #00438b;
      font-family: 'Meiryo UI';
    }
  }
  .main-content-bottom {
    padding: 0 40px 30px 42px;
    padding-right: 0px;
    .tags-content {
      float: left;
      overflow: hidden;
      .tags-wrapper {
        .tags-item {
          margin-left: 2px;
          text-overflow: ellipsis;
        }
      }
    }
    .tags-div {
      float: left;
      width: 130px;
      text-align: center;
      .tagsIcon {
        margin-right: 10px;
      }
      display: block;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      font-family: 'Meiryo UI';
    }
    .tags-list {
      width: 24px;
      height: 18px;
      line-height: 40px;
      .tagsMaincardNm {
        cursor: pointer;
      }
      .closeTagIcon {
        color: black;
        cursor: pointer;
      }
      .tagsListIcon {
        margin-left: 10px;
        font-size: 10px;
        color: #00438b;
      }
    }
    .tags-list-float {
      float: left;
    }
    .tooltipBox {
      float: left;
      width: 31px;
      background: #ffffff;
      box-shadow: 0 1px 3px 0;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      .tooltipDiv1 {
        width: 32px;
        height: 32px;
        background: #707c8a;
        border-radius: 0px 4px 0px 0px;
        line-height: 32px;
      }
      .tooltipDiv2 {
        width: 32px;
        height: 32px;
        background: #ededed;
        margin-left: -2px;
      }
      .tooltipDiv3 {
        position: absolute;
        top: 50%;
        padding-left: 5px;
      }
      .tooltipIcon {
        font-size: 25px;
        color: #dcdcdc;
        cursor: pointer;
      }
    }
    .get-last-card-show-div {
      float: left;
      margin-left: 2px;
      width: 940px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    }
  }
  .main-content-margin {
    margin-top: 15px;
  }
  .main-content-list {
    .main-content-list-bottom {
      margin-top: 18px;
      padding-left: 22px;
      width: 100%;
      .drag-div-style {
        float: left;
      }
    }
  }
}
.default-content-padding {
  padding: 20px 42px;
}
.footer-content {
  padding: 18px 0px;
  .footerIcon {
    float: left;
    color: blue;
    font-size: 40px;
  }
}
.main-content-list-top {
  padding-left: 42px;
  padding-bottom: 0px;
  padding-top: 18px;
  line-height: 18px;
}
.footer-content-head {
  padding-left: 42px;
  margin-bottom: 12px;
}
.footer-content-ul {
  height: 60px;
  margin: 0px;
  li {
    list-style: none;
    float: left;
    width: 60px;
    font-size: 12px;
    text-align: center;
    margin-right: 20px;
    span {
      margin-top: 8px;
      display: inline-block;
      font-family: 'Meiryo UI';
      font-size: 12px;
      color: #4a4a4a;
    }
  }
}
.main-content-list-top-title {
  float: left;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0.27px;
  margin-right: 40px;
  font-weight: bold;
}
.add-subcard-icon {
  float: left;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 1px;
}
.add-title {
  float: left;
  font-size: 12px;
  margin-left: 5px;
  color: #00438b;
  cursor: pointer;
  margin-right: 40px;
  font-family: 'Meiryo UI';
}
.disabledTitle {
  float: left;
  font-size: 12px;
  margin-left: 10px;
  color: #cbcbcb;
  cursor: not-allowed;
  margin-right: 40px;
  font-family: 'Meiryo UI';
}
.footerAddIcon {
  float: left;
  padding-left: 61px;
  margin-top: 2px;
  font-size: 14px;
  color: #00438b;
  cursor: pointer;
}
.changeIcon {
  float: left;
  cursor: pointer;
}
.changeTitle {
  float: left;
  font-size: 12px;
  margin-left: 10px;
  color: #00438b;
  font-family: 'Meiryo UI';
}
.disabledChangeTitle {
  float: left;
  font-size: 12px;
  margin-left: 10px;
  color: #cbcbcb;
  font-family: 'Meiryo UI';
}
.detailSearchBody {
  padding: 20px 40px 20px 42px;
}
.detailSearchResult {
  border-top: 1px dashed #c9ced7;
  padding: 18px 42px 20px 42px;
  .resultHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .kennsu {
      font-family: 'Meiryo UI';
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 0.27px;
    }
    .siborikomiBtn {
      border: 1px solid #00438b;
      border-radius: 3px;
      border-radius: 3px;
      width: 80px;
      height: 28px;
      line-height: 28px;
      padding: 0px;
      font-family: 'Meiryo UI';
      font-size: 14px;
      color: #00438b;
      letter-spacing: 0;
    }
  }
}
.detailSearchHyouji {
  width: 300px;
  height: 36px;
  line-height: 36px;
  font-family: Meiryo-Bold;
  background: #00438b;
  font-size: 14px;
  color: #ffffff;
  padding: 0px;
}
.page {
  margin-left: -45px;
}
.add-maincard-btn {
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.add-maincard-btn:hover {
  opacity: 0.8;
}
.card-list {
  cursor: pointer;
  height: 28px;
  width: 28px;
}
.card-list:hover #BG_button {
  fill: #cacaca;
}
.drag {
  width: 910px;
  overflow: hidden;
}
.no-width {
  width: inherit !important;
  overflow: inherit;
}
.default-body {
  height: 294px;
  line-height: 254px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 0 4px 4px 4px;
  border-top: 0px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
}
.default-body-head {
  background: #00438b;
  border-radius: 0 4px 0 0;
  height: 32px;
  width: 100%;
}
.popover-box {
  display: flex;
  height: 20px;
}
.selectedCurcle {
  display: flex;
  align-items: center;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  background: #00438b;
  line-height: 16px;
}
.popover-list {
  float: left;
  margin-left: 10px;
}
.area-border {
  height: 0px;
  border-top: 1px dashed #c9ced7;
}
.area-border-solid {
  height: 0px;
  border: 1px solid #c9ced7;
}
.tool-icon {
  height: 60px;
  width: 60px;
  background: #fff;
  border: 1px solid #c9ced7;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nb-icon-style {
  width: 32px;
  height: 32px;
}
.tool-icon-title {
  display: inline-block;
  height: 18px;
  line-height: 18px;
  cursor: pointer;
}
.tool-icon-title:hover {
  color: #00438b;
  text-decoration: underline;
}
.tool-area {
  cursor: pointer;
}
.tool-area:hover .tool-icon-title {
  color: #00438b;
  text-decoration: underline;
}
.idpf-view-container .confirmDialog {
  .el-dialog__header {
    border-bottom: 1px solid #cbcbcb;
  }
  .el-dialog__title {
    font-family: 'Meiryo UI';
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #4a4a4a;
  }
  .el-dialog__body span {
    font-family: 'Meiryo UI';
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #4a4a4a;
  }
  .el-dialog .el-dialog__header {
    padding-top: 10px;
    border-bottom: 1px solid #cbcbcb;
  }
  .el-btnn {
    width: 50%;
    height: 40px;
    border: 0px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Meiryo UI';
  }
  .el-change-btn1 {
    color: #4a4a4a;
    background-color: #dcdcdc;
  }
  .el-change-btn2 {
    color: #ffffff;
    background-color: #00438b;
  }
  .el-dialog__body {
    padding: 20px 30px 0 30px;
  }
  .el-dialog__footer {
    margin-top: 40px;
    padding: 0;
  }
  .el-dialog__footer span {
    display: flex;
  }
}
.information-opened {
  transform: rotate(180deg);
}
.no-subcard-list {
  height: 70px;
  text-align: center;
  font-size: 16px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  line-height: 35px;
}
.idpf-view-container .err-red-color {
  color: #fd596d;
}
.scroll-to-top {
  height: 48px;
  width: 48px;
  position: fixed;
  right: 0px;
  bottom: 30px;
  z-index: 300;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}
.scroll-to-top:hover {
  opacity: 0.9;
}
</style>
<style rel="stylesheet/scss" lang="scss" >
.el-radio__inner:hover {
  border-color: #00438b;
}
.el-radio:hover .el-radio__inner {
  border-color: #00438b !important;
}
.el-message-box {
  border: 0;
  padding-bottom: 0px;
  .el-message-box__header {
    border-bottom: 1px solid #dcdcdc;
    .el-message-box__title {
      text-align: center;
      font-size: 16px;
      font-family: 'Meiryo UI';
      font-weight: bold;
      color: #4a4a4a;
    }
    .el-message-box__headerbtn {
      display: none;
    }
  }
  .el-message-box__content {
    padding: 19px 30px 45px 30px;
    font-size: 14px;
    color: #4a4a4a;
    font-family: 'Meiryo UI';
  }
  .el-message-box__btns {
    padding: 0;
    height: 40px;
    .el-button {
      border-radius: 0;
    }
    button {
      height: 40px;
      width: 100%;
      background-color: rgb(0, 67, 139);
      border-color: rgb(0, 67, 139);
      span {
        font-size: 14px;
        color: '#fff';
        font-family: 'Meiryo UI';
        font-weight: bold;
      }
    }
  }
}
.el-input__inner:hover {
  border: 1px solid #00438b !important;
}
.tags-view-item.tags-item.el-tag.el-tag--light:hover {
  background-color: #cacaca;
}
.el-radio-button.is-active:hover {
  opacity: 0.8;
}
.el-loading-spinner i {
  color: #ffffff;
  font-size: 16px;
}
.el-loading-spinner .el-loading-text {
  color: #ffffff;
  font-size: 16px;
}
.idpf-view-container .check_input_color .el-input__inner {
  border: 1px solid #fd596d !important;
  border-radius: 4px 0 0 4px !important;
  background-color: #ffe4e8;
  height: 36px;
}
.el-radio-group
  .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
  box-shadow: inherit;
}
.main-content-box .el-tag .el-tag__close:hover {
  background: inherit;
}
.main-content-box span.tags-item:hover .el-tag__close {
  color: #4a4a4a;
}
.main-content-box span.tags-item.active:hover .el-tag__close {
  color: #fff;
}
.idpf-view-container .el-pager li.active {
  color: #fff;
  background: #00438b;
  width: 20px !important;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  font-weight: 100;
}
.idpf-view-container .el-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.idpf-view-container .el-pager li {
  min-width: unset;
}
.idpf-view-container .el-autocomplete-suggestion li {
  line-height: 25px;
  margin-top: 0px;
}
.idpf-view-container .el-autocomplete-suggestion li .describe {
  font-size: 12px;
  color: #b4b4b4;
}
.idpf-view-container .el-autocomplete-suggestion li .value {
  height: 20px;
}
.idpf-view-container .el-table .selected-row {
  background: #42b983 !important;
}

.idpf-view-container .el-table__body tr.current-row > td {
  background: #42b983 !important;
}

.idpf-view-container .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: unset !important;
}
.el-table__row.el-table__row--striped:hover {
  background: #f8f8f8;
}

.idpf-view-container
  .header-back
  .header-search
  .el-autocomplete
  .el-input__inner {
  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 4px 0 0 4px;
  border-radius: 4px 0px 0px 4px;
  border-right: 0px;
  width: 324px;
  height: 36px;
  line-height: 36px;
  padding: 0 0px;
  padding-left: 32px;
  font-size: 12px;
}
.idpf-view-container .el-tag {
  border-radius: 4px 4px 0 0;
  display: block;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.idpf-view-container .el-tag .el-icon-close {
  float: right;
  top: 9px !important;
  color: #fff;
}
/* .idpf-view-container .header-detail-button .el-button:focus, .el-button:hover{
  background: transparent
} */
.idpf-view-container .detailSearchBody .el-input--mini .el-input__inner {
  height: 32px;
  line-height: 31px;
  border: 1px solid #979797;
  font-family: Meiryo;
  font-size: 14px;
  color: #4a4a4a;
}
.idpf-view-container .detailSearchBody .firstSelect .el-input {
  width: 300px;
}
.idpf-view-container .detailSearchResult .resultBody .el-table td,
.el-table th.is-leaf {
  border: 0px;
}
.idpf-view-container .detailSearchResult .resultBody .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
}
.idpf-view-container
  .detailSearchResult
  .resultBody
  .el-table__body-wrapper.is-scrolling-none
  .el-table__row
  td {
  padding: 5px 0px;
}
.idpf-view-container .el-tabs {
  padding: 0px 42px;
}
.idpf-view-container .el-tabs__header {
  margin: 0px;
}
.idpf-view-container .el-tabs__content {
  height: 364px;
  border-top: 0px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 0px 4px 4px 4px;
}
.idpf-view-container .el-tabs__item {
  font-family: 'Meiryo UI';
  font-size: 12px;
  letter-spacing: 0.23px;
  border-radius: 4px 4px 0px 0px;
}
.idpf-view-container .el-tabs--card > .el-tabs__header .is-active {
  background: #00438b;
  font-family: 'Meiryo UI';
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0.23px;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 0px;
}
.idpf-view-container .el-tabs--card > .el-tabs__header .el-tabs__item.is-top {
  padding: 0px;
  width: 141px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.idpf-view-container .el-tabs__new-tab {
  margin: 0px;
}
.idpf-view-container .el-carousel__container {
  height: 364px;
}
.idpf-view-container .el-tabs__nav-prev,
.el-tabs__nav-next {
  display: none;
}
.idpf-view-container .el-tabs__nav-wrap.is-scrollable {
  padding: 0px;
}
.blankTabs .el-tabs__nav.is-top {
  margin-left: -1px;
}
.el-tooltip__popper.is-light {
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  border: 0px !important;
}
span.tags-item {
  position: relative;
}
span.tags-item:hover .el-tag__close {
  display: block !important;
  position: absolute;
  right: 1px;
  top: 9px;
}
.tags-item .el-tag__close {
  display: none;
}
.el-autocomplete ::-webkit-input-placeholder {
  color: #9b9b9b;
}
.el-autocomplete ::-moz-placeholder {
  color: #9b9b9b;
}
.el-autocomplete :-ms-input-placeholder {
  color: #9b9b9b;
}
.el-autocomplete :-moz-placeholder {
  color: #9b9b9b;
}
.detail-link-title {
  padding: 0px;
}
.drag-tag {
  height: 32px;
}
.drag-tag span.sortable-ghost {
  color: #4a4a4a !important;
  background: #dcdcdc !important;
}
.drag-subcard .drag-div-style.sortable-ghost {
  background: inherit !important;
}
.drag-tool-icon li.sortable-ghost {
  background: inherit !important;
}
</style>
