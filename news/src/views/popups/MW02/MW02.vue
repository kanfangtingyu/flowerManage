<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    @close="onCloseSubcardAdd"
    center
    :show-close="false"
    width="835px"
    class="add-subcard-dialog"
  >
    <!-- ダイアログヘーダー部 -->
    <div slot="title" class="head-style">
      <button class="cancle-btn" @click="onCloseSubcardAdd">キャンセル</button>
      <span class="head-title">よく使う機能の追加・削除</span>
      <button class="kakutei-btn" @click="onSubcardAdd">確定</button>
    </div>
    <!-- ダイアログボディー部 -->
    <div class="dialog-body">
      <div v-for="item in subcardlistAll" :key="item.name" class="style-for-ie">
        <!-- タイトル -->
        <span class="title-name">{{ mw02Title(item) }}</span>
        <div class="content">
          <div class="content-box">
            <div
              class="box-position same-box"
              :class="mw02ServiceTitle(item)"
              @click.prevent="active(item, $event)"
            >
              <!-- カードが選択されないもダル -->
              <div v-if="mw02CardModel(item)" class="box-selected"></div>
              <!-- カードが契約中サービス別契約件数一覧ではない場合 -->
              <div class="content-box-title" v-if="notScl0100(item)">
                <div :class="cardName(item)">
                  <div class="title-left">
                    <el-checkbox v-model="item.isActived" @change="active(item)"></el-checkbox>
                  </div>
                  <div class="check-style">{{ changeName(item.name) }}</div>
                  <div class="title-right">
                    <span>&nbsp;</span>
                  </div>
                </div>
                <div :class="cardSelected(item)">{{ item.componentName }}</div>
                <!-- カードが役務別契約件数一覧である場合 -->
                <div class="content-box-name" v-if="isEkimuContractCard(item)">
                  <div class="content-box-list-title">
                    <span :class="contractNumTitle(item)">合計契約数</span>
                    <span :class="contractNum(item)">** 件</span>
                  </div>
                  <div>
                    <div class="content-list-box-title" v-for="el in serviceList" :key="el.index">
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span :class="contractServiceNum(item)">{{ el.count + ' 件' }}</span>
                    </div>
                  </div>
                </div>
                <!-- カードが別の契約件数一覧である場合 -->
                <div class="content-box-name" v-if="otherCard(item)">
                  <div class="list-content">
                    <span :class="contractNumTitle(item)">合計契約数</span>
                    <span :class="contractNum(item)">** 件</span>
                  </div>

                  <span v-if="item.name === '法人サービス'">
                    <div
                      class="content-list-box-title"
                      v-for="el in scl0300NameList"
                      :key="el.index"
                    >
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span :class="contractServiceNum(item)">{{ el.count + ' 件' }}</span>
                    </div>
                  </span>
                  <span v-else-if="item.name === 'ｅ−ＶＬＡＮ'">
                    <div class="content-list-box-title" v-for="el in eVlanNameList" :key="el.index">
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span :class="contractServiceNum(item)">{{ el.count + ' 件' }}</span>
                    </div>
                  </span>
                  <span v-else-if="item.name === 'BizFAX'">
                    <div
                      class="content-list-box-title"
                      v-for="el in bizFaxNameList"
                      :key="el.index"
                    >
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span :class="contractServiceNum(item)">{{ el.count + ' 件' }}</span>
                    </div>
                  </span>
                  <span v-else>
                    <div
                      class="content-list-box-title"
                      v-for="el in serviceNameList"
                      :key="el.index"
                    >
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span
                        :class="contractServiceNum(item)"
                        v-if="item.componentName === 'サービス一覧'"
                      >{{ el.count + ' 件' }}</span>
                    </div>
                  </span>
                </div>
              </div>
              <!-- カードが契約中別契約件数一覧である場合 -->
              <div v-if="isServiceCard(item)" class="width-control">
                <div v-if="isServiceCardSelected(item)" class="box-selected"></div>
                <div :class="cardName(item)">
                  <div class="title-left">
                    <el-checkbox v-model="item.isActived" @change="active(item)"></el-checkbox>
                  </div>
                  <div class="check-style">{{ item.name }}</div>
                </div>
                <div class="content-box-name" v-if="isServiceCard(item)">
                  <div class="list-content">
                    <span :class="contractNumTitle(item)">合計契約数</span>
                    <span :class="contractNum(item)">** 件</span>
                  </div>
                  <div>
                    <div class="content-list-box-title" v-for="el in serviceList" :key="el.index">
                      <span :class="contractServiceTitle(item)">{{ el.title }}</span>
                      <span :class="contractServiceNum(item)">{{ el.count + ' 件' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- カードが契約番号一覧である場合 -->
          <div v-for="(el, index) in item.subCardChild" :key="index" class="card-style">
            <div
              class="box-position"
              :class="isServiceCardSelStyle(el)"
              @click.prevent="onItemActive(el, $event)"
              v-if="notScl0100(item)"
            >
              <div v-if="isServiceCardSelected(el)" class="box-selected"></div>
              <div :class="cardName(el)">
                <div class="title-left">
                  <el-checkbox v-model="el.isActived" @change="active(el)"></el-checkbox>
                </div>

                <el-tooltip :content="el.name" placement="top" :disabled="false">
                  <div class="check-style">{{ el.name }}</div>
                </el-tooltip>
                <div class="title-right"></div>
              </div>
              <div :class="cardSelected(el)">{{ el.componentName }}</div>
              <div class="content-box-name">
                <div class="list-content">
                  <span :class="contractNumTitle(el)">合計契約数</span>
                  <span :class="contractNum(el)">** 件</span>
                </div>
                <div
                  v-for="(li, index) in serviceNumList"
                  :key="index"
                  class="content-list-box-title"
                >
                  <span :class="contractServiceTitle(el)">{{ li.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import MW02Methods from './mw02-methods'
import * as MW02Constants from './mw02-constants'
import * as cardIdConstants from '@/constants/card-id-constants'
import * as GlobalConstants from '@/constants/component-constants'
import GlobalMixins from '@/mixin/global-mixins'
export default {
  name: 'MW02',
  mixins: [MW02Methods, GlobalMixins],
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 11) {
        return (this.titleover = true)
      }
      return this.titleover
    }
  },
  data() {
    return {
      selectedComponents: [], // 選択中サブカード
      titleover: false,
      title: MW02Constants.MW02_TITLE,
      others: MW02Constants.OTHERS,
      subcardlistAll: GlobalConstants.SUB_CARD_LIST,
      subCardOne: cardIdConstants.SCL0406,
      contractSrvc: MW02Constants.CONTRACT_SRVC,
      ekimuContractNumList: MW02Constants.EKIMU_CONTRACT_NUM_LIST,
      contractList: MW02Constants.CONTRACT_LIST,
      srvcList: MW02Constants.SRVC_LIST,
      serviceList: MW02Constants.SERVICE_LIST,
      serviceNameList: MW02Constants.SERVICE_NAME_LIST,
      serviceNumList: MW02Constants.SERVICE_NUM_LIST,
      scl0300NameList: MW02Constants.SCL0300_NAME_LIST,
      eVlanNameList: MW02Constants.E_VLAN_NAME_LIST,
      bizFaxNameList: MW02Constants.BIZ_FAX_NAME_LIST,
      subcardlistAllChange: [],
      subCardList: [],
      selectCard: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.selectCard = []
          this.subCardList = this.$store.getters.subCardList.slice(0)
          this.subCardList.forEach(item => {
            this.selectCard.push({
              component: item.component,
              componentName: item.componentName,
              ekimuCode: item.ekimuCode,
              isActived: item.isActived,
              name: item.name,
              srvcKindCode: item.srvcKindCode
            })
          })
          for (let i = 0; i < this.subcardlistAll.length; i++) {
            let item = this.subcardlistAll[i]
            if (!item.subCardChild) {
              for (let el = 0; el < this.selectCard.length; el++) {
                let element = this.selectCard[el]
                if (
                  item.component === element.component &&
                  item.ekimuCode === element.ekimuCode
                ) {
                  item.isActived = true
                }
              }
            } else {
              for (let el = 0; el < item.subCardChild.length; el++) {
                let child = item.subCardChild[el]
                for (let i = 0; i < this.selectCard.length; i++) {
                  let actItem = this.selectCard[i]
                  if (
                    child.component === actItem.component &&
                    actItem.srvcKindCode === child.srvcKindCode
                  ) {
                    child.isActived = true
                  }
                }
              }
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.subcardlistAllChange = JSON.parse(JSON.stringify(this.subcardlistAll))
  },
  mounted() {},
  methods: {
    active(ele, event) {
      let actived = !ele.isActived
      this.$set(ele, 'isActived', actived)
      if (ele.isActived) {
        this.selectCard.push(ele)
      } else {
        this.selectCard.forEach((item, index) => {
          if (ele.isActived === false && item.name === ele.name) {
            this.selectCard.splice(index, 1)
          }
        })
      }
    },
    onItemActive(val, event) {
      let actived = !val.isActived
      this.$set(val, 'isActived', actived)
      if (val.isActived) {
        this.selectCard.push(val)
      } else {
        this.selectCard.forEach((item, index) => {
          if (val.isActived === false && item.name === val.name) {
            this.selectCard.splice(index, 1)
          }
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.card-title {
  margin-bottom: 4px;
  display: inline-block;
}
.card-style {
  padding-left: 20px;
  padding-bottom: 20px;
}
.content-list-box-title {
  height: 16px;
  margin-bottom: 6px;
}
.width-control {
  width: 100%;
  position: relative;
}
.list-content {
  margin-bottom: 6px;
  height: 18px;
}

.content-box-name-title {
  cursor: pointer;
  height: 16px;
  margin-bottom: 6px;
}
.content-box-list-title {
  margin-bottom: 6px;
  height: 18px;
}
.content-box-name {
  cursor: pointer;
  padding: 10px 20px;
}
.content-box {
  padding-left: 20px;
  padding-bottom: 20px;
}

.content-box-title {
  height: 234px;
  width: 100%;
}

.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.mask {
  cursor: pointer;
}
.head-style {
  width: 100%;
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #979797;
  border-radius: 4px 4px 0 0;
  line-height: 60px;
}
.kakutei-btn:hover {
  background: #2665b2;
  border: 1px solid #00438b;
}
.cancle-btn:hover {
  background-color: #e5eef7;
}
.cancle-btn {
  height: 36px;
  width: 100px;
  border: 0px;
  background: #ffffff;
  border: 1px solid #00438b;
  border-radius: 4px;
  font-family: Meiryo-Bold;
  font-size: 14px;
  color: #00438b;
  letter-spacing: 0;
  text-align: center;
  line-height: 14px;
  font-weight: bold;
  float: left;
  margin-top: 12px;
  margin-left: 30px;
  cursor: pointer;
}
.kakutei-btn {
  height: 36px;
  width: 100px;
  border: 0px;
  background: #00438b;
  border: 1px solid #00438b;
  border-radius: 4px;
  font-family: Meiryo-Bold;
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  line-height: 14px;
  font-weight: bold;
  float: right;
  margin-top: 12px;
  margin-right: 30px;
  cursor: pointer;
}
.head-title {
  font-family: 'Meiryo UI';
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
}
.title-name {
  font-family: 'Meiryo UI';
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
  padding-left: 20px;
  font-weight: bold;
}
.check-box {
  padding-left: 10px;
  float: left;
}
.list-box {
  height: 222px;
  width: 240px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  display: flex;
  cursor: pointer;
}
.contracting-box {
  height: 190px;
  width: 240px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
}
.check-style {
  width: 176px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list-box-selected-bor {
  box-shadow: 0 0 0 2px #00438b;
}
.box-title {
  cursor: pointer;
  justify-content: center;
  height: 32px;
  line-height: 32px;
  font-weight: bold;
  width: 100%;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
  text-align: center;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.box-title-sel-bac {
  cursor: pointer;
  background: #00438b;
  color: #ffffff;
  display: inline-flex;
}
.box-title-no-sel-bac {
  background: #00438b;
  color: #ffffff;
  display: inline-flex;
}
.box-title-no-sel-col :hover {
  background-color: #dcdcdc;
  color: #ffffff;
  opacity: 0.4;
}

.box-title-sel-col {
  background: #dcdcdc;
  color: #4a4a4a;
}
.box-title-no-sel-col {
  background: #dcdcdc;
  color: #9b9b9b;
}
.kennsu-title {
  float: left;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
  font-weight: bold;
}
.kennsu-sel-col {
  color: #4a4a4a;
}
.kennsu-no-sel-col {
  color: #9b9b9b;
}
.contract-num-list {
  float: right;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
  font-weight: bold;
}
.item-name {
  float: left;
  font-family: 'Meiryo UI';
  font-size: 12px;
  letter-spacing: 0.27px;
  width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.item-name-sel-col {
  color: #00438b;
}
.item-name-no-sel-col {
  color: #00438b;
}
.same-box {
  width: 240px;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  cursor: pointer;
}
.same-box-height {
  height: 222px;
}
.same-boxSelect {
  height: 222px;
  width: 240px;
  background: #ffffff;
  box-shadow: 0 0 0 2px #00438b;
  box-sizing: border-box;
  border-radius: 2px;
}
.tannitikennsu {
  float: right;
  font-family: 'Meiryo UI';
  font-size: 12px;
  letter-spacing: 0.27px;
}
.tanniti-col {
  color: #000000;
}
.tanniti-no-sel-col {
  color: #00438b;
}
.notSelectedBac {
  background: #00438b;
}
.notSelectedColor {
  color: #00438b;
}
.notSelectedBorCol {
  // border-color: #00438b;
  border: none;
}
.checkbox-hover-checkbox-select {
  height: 14px;
  width: 14px;
}
.box-position {
  position: relative;
}
.box-position:hover .box-selected {
  opacity: 0.4;
}
.box-selected {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
}
.title-left {
  position: absolute;
  left: 10px;
  top: -2px;
}
.style-for-ie {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
<style>
.add-subcard-dialog .el-dialog__header {
  padding: 0px;
}
.add-subcard-dialog .el-dialog.el-dialog--center {
  /* height: 940px; */
  background: #ededed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px 4px 0 0;
}
.add-subcard-dialog .el-dialog--center .el-dialog__body {
  padding: 0px;
  padding-top: 20px;
  height: 820px;
  overflow: auto;
}
.add-subcard-dialog .el-checkbox__input .el-checkbox__inner,
.add-subcard-dialog .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #fff;
  box-sizing: border-box;
  height: 14px;
  width: 14px;
  border-radius: 2px;
  background-color: #ffffff;
}
.add-subcard-dialog .el-checkbox__input.is-checked .el-checkbox__inner::after {
  border-color: #00438b;
}
.add-subcard-dialog .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ffffff;
}
.add-subcard-dialog .el-checkbox__input .el-checkbox__inner {
  float: left;
  box-sizing: border-box;
  height: 14px;
  width: 14px;
  border: 1px solid #ffffff;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
