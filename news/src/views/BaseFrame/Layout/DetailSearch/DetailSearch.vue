<template>
  <div id="detailSearch" v-show="detailSearchShow" class="detail-search" ref="DetailSearch">
    <!-- 詳細検索条件入力部 -->
    <span class="text"></span>
    <span class="text2"></span>
    <div class="close-detail-btn" @click="searchCloseBtn">
      <svg-icon class="icon-size" icon-class="delete"></svg-icon>
    </div>
    <div class="history-detail-btn" @click="hisCloseBtn">
      <svg-icon class="icon-size" icon-class="history_advance-search"></svg-icon>
    </div>
    <div class="history-detail">
      <DatailSearchHistory
        @infoBackShow="handleInfoBackShow($event)"
        :detailHistory.sync="detailHistory"
      ></DatailSearchHistory>
    </div>
    <div class="detail-search-body">
      <!-- 照会対象部 -->
      <div class="select-title-box">
        <span class="select-title-txt">
          照会対象
          <span class="title-symbol">*</span>
        </span>
      </div>
      <div class="display-flex">
        <div class="obj-margin">
          <el-select
            v-model="searchObjectValue"
            placeholder="照会対象を選択してください"
            size="small"
            class="select-style"
            ref="searchObj"
            @visible-change="inputBlur($event,'searchObj')"
            v-on:change="onSearchObjectChange()"
          >
            <el-option
              v-for="item in searchObjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 照会対象２部 -->
        <div v-if="searchObjectTwoCheck">
          <el-select
            v-model="searchObjectTwoValue"
            size="small"
            class="select-style"
            ref="searchObjT"
            @visible-change="inputBlur($event,'searchObjT')"
            v-on:change="onSearchObjectTwoChange()"
          >
            <el-option
              v-for="item in searchObjectTwoList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 必須条件部 -->
      <div class="margin-top" v-if="mustSearchCheck">
        <div class="select-title-box">
          <span class="select-title-txt">
            必須条件
            <span class="title-symbol">*</span>
          </span>
        </div>

        <div class="display-flex">
          <el-select
            v-model="mustSearchValue"
            placeholder="必須条件を選択してください"
            size="small"
            class="select-style"
            ref="selectStyle"
            @visible-change="inputBlur($event,'selectStyle')"
            v-on:change="onMustSearchChange()"
          >
            <el-option
              v-for="item in mustSearchList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="long-box">
            <el-input
              :class="{'isError': isError}"
              v-if="mustSearchInputCheck"
              v-model="mustInputValue"
              :placeholder="mustInputPlaceholder"
              size="small"
              class="right-box"
              v-on:blur="mustInputValueCheck()"
              v-on:keyup.enter.native="onDetailSearch"
            ></el-input>
            <!--errorMsg-->
            <div v-if="isError" class="errorMsg">
              <span>{{errorMsg}}</span>
            </div>

            <div v-if="mailInputCheck" class="mail-box">
              <div class="account-box">
                <el-input
                  :class="{'isError': isErrorThree}"
                  v-model="mailInputValue"
                  placeholder="アカウント"
                  size="small"
                  class="account-input"
                  v-on:blur="mustInputValueCheck()"
                  v-on:keyup.enter.native="onDetailSearch"
                ></el-input>
                <!--errorMsg-->
                <div v-if="isErrorThree" class="mailErrorMsg">
                  <span>{{errorMsgThree}}</span>
                </div>
              </div>@
              <div class="host-box">
                <el-input
                  :class="{'isError': isErrorFour}"
                  v-model="hostInputValue"
                  placeholder="ホスト"
                  size="small"
                  class="host-input"
                  v-on:blur="hostValueCheck()"
                  v-on:keyup.enter.native="onDetailSearch"
                ></el-input>
                <!--errorMsg-->
                <div v-if="isErrorFour" class="mailErrorMsg">
                  <span>{{errorMsgFour}}</span>
                </div>
              </div>.ocn.ne.jp
            </div>
          </div>
        </div>
        <div
          v-if="mustSearchValue === 11 || mustSearchValue === 7 || mustSearchValue === 8 || mustSearchValue === 9 || mustSearchValue === 0"
          class="qufen-radio"
        >
          <span class="select-title-radio">顧客状態：</span>
          <span class="title-symbol-radio">*</span>
          <el-radio-group v-model="haveOrNo">
            <el-radio label="0">無効</el-radio>
            <el-radio label="1">有効</el-radio>
          </el-radio-group>
        </div>
        <div v-if="masterRadioCheck" class="qufen-radio">
          <span class="select-title-radio">オーダ/マスタ区分：</span>
          <span class="title-symbol-radio">*</span>
          <el-radio-group v-model="masterRadioValue">
            <el-radio label="01">オーダ</el-radio>
            <el-radio label="02">マスタ</el-radio>
          </el-radio-group>
        </div>
        <div :class="masterRadioCheck?'new-fanhao-radio':'fanhao-radio'" v-if="numberType">
          <span class="select-title-radio">番号種別：</span>
          <span class="title-symbol-radio">*</span>
          <el-radio-group v-model="numberRadioValue">
            <el-radio label="01">利用電話番号</el-radio>
            <el-radio label="02">連絡先電話番号</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 任意条件部 -->
      <div class="margin-top" v-if="alternateShowCheck">
        <div class="select-title-box">
          <span class="select-title-txt">任意条件</span>
        </div>
        <div class="display-flex">
          <el-select
            v-model="alternateValue"
            placeholder="任意条件"
            size="small"
            :disabled="mustSearchValue !=='' && searchObjectValue !=='' ? false : true"
            class="select-style"
            ref="alternateValue"
            @visible-change="inputBlur($event,'alternateValue')"
            v-on:change="onAlternateChange()"
          >
            <el-option
              v-for="item in alternateList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div :class="alternateInputCheck?'long-box':''">
            <el-input
              :class="{'isError': isErrorTwo}"
              v-if="alternateInputCheck"
              v-model="alternateInputValue"
              :placeholder="alternateInputPlaceholder"
              size="small"
              class="right-box"
              v-on:blur="alternateInputValueCheck()"
              v-on:keyup.enter.native="onDetailSearch"
            ></el-input>
            <!--errorMsg-->
            <div v-if="isErrorTwo" class="errorMsg">
              <span>{{errorMsgTwo}}</span>
            </div>
          </div>
          <el-select
            v-if="statusSelectCheck"
            v-model="alternateStatusValue"
            :placeholder="alternateSelectPlaceholder"
            size="small"
            class="right-box"
            ref="alternateStatusValue"
            @visible-change="inputBlur($event,'alternateStatusValue')"
          >
            <el-option
              v-for="item in statusList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-if="alternateTwoSelectCheck"
            v-model="alternateTwoValue"
            placeholder="都道府県"
            size="small"
            class="city-box"
            ref="alternateTwoValue"
            @visible-change="inputBlur($event,'alternateTwoValue')"
            v-on:change="onAlternateTwoChange($event)"
          >
            <el-option
              v-for="(item, index) in alternateTwoList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-if="citySelectCheck"
            v-model="alternateThreeValue"
            placeholder="市区町村"
            size="small"
            class="city-box"
            ref="alternateThreeValue"
            @visible-change="inputBlur($event,'alternateThreeValue')"
            v-on:change="onAlternateThreeChange($event)"
          >
            <el-option
              v-for="(item, index) in cityList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-if="townSelectCheck"
            v-model="alternateFourValue"
            placeholder="町名"
            size="small"
            class="city-box"
            ref="alternateFourValue"
            @visible-change="inputBlur($event,'alternateFourValue')"
            v-on:change="onAlternateFourChange($event)"
          >
            <el-option
              v-for="(item, index) in townList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-if="streetSelectCheck"
            v-model="alternateFiveValue"
            placeholder="丁目"
            size="small"
            ref="alternateFiveValue"
            @visible-change="inputBlur($event,'alternateFiveValue')"
            class="city-box"
          >
            <el-option
              v-for="(item, index) in streetList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 検索button部 -->
      <div class="button-box">
        <el-button
          class="button-style"
          @click="onDetailSearch"
          :disabled="!btnDisableCheck"
        >{{this.buttonLabel}}</el-button>
      </div>
    </div>
    <!-- 詳細検索結果一覧部 -->
    <div v-if="resultShowCheck">
      <component :is="resultFrameId" :viewParam="viewParam" :masterRadioCheck="masterRadioCheck"></component>
    </div>
  </div>
</template>
<script>
import * as DETAIL_SEARCH_CONSTANTS from './detail-search-constants'
import detailSearchMethods from './detail-search-methods'
import DatailSearchHistory from './DatailSearchHistory/DatailSearchHistory'
import AS020502 from './DetailResults/AS020502/AS020502'
import AS020201 from './DetailResults/AS020201/AS020201'
import AS020202 from './DetailResults/AS020202/AS020202'
import AS020203 from './DetailResults/AS020203/AS020203'
import AS020200 from './DetailResults/AS020200/AS020200'
import AS020100 from './DetailResults/AS020100/AS020100'
import AS020304 from './DetailResults/AS020304/AS020304'
import AS020301 from './DetailResults/AS020301/AS020301'
import AS020302 from './DetailResults/AS020302/AS020302'
import AS020303 from './DetailResults/AS020303/AS020303'
import AS020300 from './DetailResults/AS020300/AS020300'
import * as IDPFEvent from '@/constants/idpf-event'

export default {
  name: 'DetailSearch',
  mixins: [detailSearchMethods],
  data() {
    return {
      // 検索結果画面のパラメータ
      viewParam: {},
      centerParam: {},
      alternateInputPlaceholder: '',
      mustInputPlaceholder: '',
      alternateSelectPlaceholder: '',

      searchObjectValue: '',
      searchObjectTwoValue: '',
      mustSearchValue: '',
      mustInputValue: '',
      mailInputValue: '',
      hostInputValue: '',
      masterRadioValue: '02',
      alternateValue: '',
      alternateInputValue: '',
      alternateStatusValue: '1',
      alternateTwoValue: '',
      alternateThreeValue: '',
      alternateFourValue: '',
      alternateFiveValue: '',
      numberRadioValue: '01',
      haveOrNo: '1',

      citySelectCheck: false,
      townSelectCheck: false,
      streetSelectCheck: false,

      searchObjectList: DETAIL_SEARCH_CONSTANTS.SEARCH_OBJECT_LIST,
      searchObjectTwoList: [],
      mustSearchList: [],
      alternateList: [],
      alternateTwoList: [],
      cityList: [],
      townList: [],
      streetList: [],

      statusList: DETAIL_SEARCH_CONSTANTS.STATUS_LIST,
      phoneContractAlternateList:
        DETAIL_SEARCH_CONSTANTS.PHONE_CONTRACT_ALTERNATE_LIST,
      ocnPhoneAlternateList: DETAIL_SEARCH_CONSTANTS.OCN_PHONE_ALTERNATE_LIST,
      feeList: DETAIL_SEARCH_CONSTANTS.FEE_LIST,
      contractList: DETAIL_SEARCH_CONSTANTS.CONTRACT_LIST,
      customerMustList: DETAIL_SEARCH_CONSTANTS.CUSTOMER_MUST_LIST,
      phoneMustTwoList: DETAIL_SEARCH_CONSTANTS.PHONE_MUST_LIST,
      contractOcnMustList: DETAIL_SEARCH_CONSTANTS.CONTRACT_OCN_MUST_LIST,
      contractOcnBMustList: DETAIL_SEARCH_CONSTANTS.CONTRACT_OCNB_MUST_LIST,
      contractOcnCMustList: DETAIL_SEARCH_CONSTANTS.CONTRACT_OCNC_MUST_LIST,
      feeOcnMustList: DETAIL_SEARCH_CONSTANTS.FEE_OCN_MUST_LIST,
      feeOcnBMustList: DETAIL_SEARCH_CONSTANTS.FEE_OCNB_MUST_LIST,
      IDList: DETAIL_SEARCH_CONSTANTS.ID_MUST_LIST,
      cusNamecanaAlternateList:
        DETAIL_SEARCH_CONSTANTS.CUS_NAMECANA_ALTERNATE_LIST,
      cusNameAlternateList: DETAIL_SEARCH_CONSTANTS.CUS_NAME_ALTERNATE_LIST,
      ocnNamecanaAlternateList:
        DETAIL_SEARCH_CONSTANTS.OCN_NAMECANA_ALTERNATE_LIST,
      idIdList: DETAIL_SEARCH_CONSTANTS.ID_ID_ALTERNATE_LIST,

      resultFrameId: '',
      detailHistory: false,
      buttonLabel: '検　索',
      errorMsg: '',
      errorMsgTwo: '',
      errorMsgThree: '',
      errorMsgFour: '',
      isError: false,
      isErrorTwo: false,
      isErrorThree: false,
      isErrorFour: false,
      resultShowCheck: false,
      accelReceiptData: [],
      accelBillingIdContractIdData: [],
      historyItems: [],
      flag: 1
    }
  },
  props: {
    detailSearchShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DatailSearchHistory,
    AS020502,
    AS020201,
    AS020202,
    AS020203,
    AS020200,
    AS020100,
    AS020304,
    AS020301,
    AS020302,
    AS020303,
    AS020300
  },
  computed: {
    alternateShowCheck() {
      return (
        (this.searchObjectValue === 0 && this.mustSearchValue === 5) ||
        (this.searchObjectValue === 0 && this.mustSearchValue === 6) ||
        (this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 0 &&
          this.mustSearchValue === 0) ||
        (this.searchObjectValue === 1 &&
          this.searchObjectTwoValue !== 0 &&
          this.searchObjectTwoValue !== '' &&
          this.mustSearchValue === 1) ||
        (this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 4 &&
          this.mustSearchValue === 8)
      )
    },
    numberType() {
      return (
        this.searchObjectValue === 1 &&
        this.searchObjectTwoValue !== 0 &&
        this.searchObjectTwoValue !== '' &&
        this.mustSearchValue === 2
      )
    },
    alternateInputCheck() {
      return (
        (this.searchObjectValue === 0 &&
          this.mustSearchValue === 5 &&
          this.alternateValue === 0) ||
        (this.searchObjectValue === 0 &&
          this.mustSearchValue === 5 &&
          this.alternateValue === 2) ||
        (this.searchObjectValue === 0 &&
          this.mustSearchValue === 6 &&
          this.alternateValue === 4) ||
        (this.searchObjectValue === 0 &&
          this.mustSearchValue === 6 &&
          this.alternateValue === 2) ||
        (this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 0 &&
          this.mustSearchValue === 0 &&
          this.alternateValue === 5) ||
        (this.searchObjectValue === 1 &&
          this.searchObjectTwoValue !== 0 &&
          this.searchObjectTwoValue !== '' &&
          this.mustSearchValue === 1 &&
          this.alternateValue === 2) ||
        (this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 4 &&
          this.mustSearchValue === 8 &&
          this.alternateValue === 8)
      )
    },
    alternateTwoSelectCheck() {
      return this.alternateValue === 1 || this.alternateValue === 6
    },
    statusSelectCheck() {
      return this.alternateValue === 3
    },
    masterRadioCheck() {
      return (
        (this.searchObjectValue === 1 &&
          this.searchObjectTwoValue === 2 &&
          this.mustSearchValue !== '' &&
          this.mustSearchValue !== 0) ||
        (this.searchObjectValue === 2 &&
          this.searchObjectTwoValue === 2 &&
          this.mustSearchValue !== '' &&
          this.mustSearchValue !== 0)
      )
    },
    searchObjectTwoCheck() {
      return this.searchObjectValue === 1 || this.searchObjectValue === 2
    },
    mustSearchCheck() {
      return (
        this.searchObjectValue === 0 ||
        this.searchObjectValue === 3 ||
        this.searchObjectTwoValue !== ''
      )
    },
    mustSearchInputCheck() {
      return this.mustSearchValue !== '' && this.mustSearchValue !== 3
    },
    numberRadioCheck() {
      return this.alternateValue === 7
    },
    btnDisableCheck() {
      return (
        this.isError === false &&
        this.isErrorTwo === false &&
        this.isErrorThree === false &&
        this.isErrorFour === false
      )
    },
    mailInputCheck() {
      return this.mustSearchValue === 3
    }
  },
  created() {
    this.$idpfEventBus.$on(IDPFEvent.CLICK_DETAIL_SEARCH, this.onDetailSearch)
  },
  beforeDestroy() {
    this.$idpfEventBus.$off(IDPFEvent.CLICK_DETAIL_SEARCH)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fanhao-radio {
  margin-left: 330px;
  margin-top: 5px;
}
.new-fanhao-radio {
  margin-top: 5px;
  margin-left: 330px;
}
.qufen-radio {
  margin-top: 5px;
  margin-left: 330px;
}
.detail-search {
  overflow-x: auto;
  position: relative;
  border-top: 2px solid rgb(0, 67, 139);
}

.icon-size {
  width: 20px;
  height: 20px;
}

.select-title-box {
  min-width: 750px;
  margin-bottom: 5px;
}
.select-title-radio {
  font-size: 14px;
  color: #4a4a4a;
}

.select-title-txt {
  font-size: 14px;
  margin-right: 20px;
  color: #4a4a4a;
}

.title-symbol {
  color: red;
  margin-left: 4px;
}
.title-symbol-radio {
  color: red;
  margin-right: 10px;
}

.display-flex {
  display: flex;
}

.margin-top {
  margin-top: 10px;
}

.radio-group {
  margin-top: 10px;
  line-height: 32px;
}

.obj-margin {
  margin-right: 20px;
}

.long-box {
  width: 100%;
}
.right-box {
  width: 100%;
  max-width: 620px;
  margin-left: 20px;
}

.account-input {
  width: 100%;
}

.mail-box {
  display: flex;
  width: 700px;
  margin-left: 20px;
}

.account-box {
  width: 230px;
}

.host-box {
  width: 230px;
}

.host-input {
  width: 100%;
}

.city-box {
  margin-left: 20px;
  width: 140px;
}

.button-box {
  margin-top: 16px;
  text-align: right;
}

.result-none {
  border-top: 1px dashed #c9ced7;
  padding: 18px 42px 20px 42px;
  text-align: center;
  color: #979797;
  height: 200px;
  line-height: 200px;
}

.errorMsg {
  display: flex;
  width: 250px;
  height: 14px;
  font-family: Meiryo;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #fd596d;
  margin-left: 32px;
  margin-top: 6px;
}
.mailErrorMsg {
  display: flex;
  width: 210px;
  height: 14px;
  font-family: Meiryo;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #fd596d;
  margin-left: 6px;
  margin-top: 6px;
}
.text {
  display: inline-block;
  border-top: 2px solid;
  border-right: 2px solid;
  width: 11px;
  height: 11px;
  border-color: rgb(0, 67, 139);
  transform: rotate(-45deg);
  position: absolute;
  right: 344px;
  top: -8px;
}
.text2 {
  display: inline-block;
  background: #fff;
  width: 12px;
  height: 11px;
  transform: rotate(-45deg);
  position: absolute;
  right: 345px;
  top: -5px;
}
.close-detail-btn {
  position: absolute;
  top: 17px;
  right: 40px;
  cursor: pointer;
}
.history-detail-btn {
  position: absolute;
  top: 17px;
  right: 80px;
  cursor: pointer;
}
.history-detail {
  position: absolute;
  top: 40px;
  right: 30px;
  z-index: 10;
}
.detail-search-body {
  padding: 20px 40px 20px 42px;
}
.button-style {
  width: 300px;
  height: 36px;
  line-height: 36px;
  font-family: Meiryo-Bold;
  background: #00438b;
  font-size: 14px;
  color: #ffffff;
  padding: 0px;
}
.button-style:hover {
  background-color: #2665b2;
}
</style>
<style>
#detailSearch .el-radio__input.is-checked .el-radio__inner {
  background-color: #00438b;
  border: 0px;
  color: #fff;
}
#detailSearch .el-radio__input {
  margin-right: 5px;
}
#detailSearch .el-radio__input.is-checked + .el-radio__label {
  color: #4a4a4a;
}
#detailSearch .detail-search-body .el-input--small .el-input__inner {
  height: 32px;
  line-height: 31px;
  border: 1px solid #979797;
  font-family: Meiryo;
  font-size: 14px;
  color: #4a4a4a;
}
#detailSearch .detail-search-body .is-focus .el-input__inner {
  border: 1px solid #00438b;
}
#detailSearch .detail-search-body .el-input__inner:disabled {
  background: #fafafa;
  border: 1px solid #c9ced7;
  color: #9b9b9b;
}
#detailSearch
  .detail-search-body
  .el-input.el-input--small.isError
  .el-input__inner {
  border: 1px solid #fd596d;
  background-color: #ffe4e8;
}

#detailSearch .detail-search-body .select-style .el-input {
  width: 300px;
}
.button-style:disabled {
  background-color: #d8d8d8;
}
.button-style:disabled:hover {
  color: #ffffff;
  background-color: #d8d8d8;
}
#detailSearch .kennsuSpace {
  text-align: center;
  margin-left: 104px;
}
#detailSearch .firstSelectBody .el-input {
  width: 60px;
  height: 32px;
}
#detailSearch .firstSelectBody .el-input input {
  border: 1px solid #979797;
  padding-left: 10px;
}
#detailSearch .firstSelectBody .el-input.is-focus input {
  border: 1px solid #00438b;
  padding-left: 10px;
}
#detailSearch .firstSelectBody .el-input.is-disabled input {
  border: 1px solid #c9ced7;
  padding-left: 10px;
}
#detailSearch .firstSelectBody .el-input span.el-input__suffix span i {
  color: #00438b;
}
#detailSearch .kennsuHyouji {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0;
  line-height: 14px;
  margin-right: 40px;
}
#detailSearch .el-table .cell,
.el-table th div {
  text-align: left;
}
#detailSearch .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #ededed !important;
}
</style>
