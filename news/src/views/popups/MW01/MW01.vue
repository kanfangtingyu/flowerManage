<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="false"
    @close="onCloseWindows"
    :show-close="false"
    id="mw01"
    class="add-maincard-dialog mw01"
    width="50%"
    center
  >
    <!-- ダイアログヘーダー部 -->
    <div slot="title" class="dialog-header">
      <button class="cancle-btn" @click="onCloseWindows">キャンセル</button>
      <span class="header-title">照会対象の追加</span>
      <button class="confirm-btn clickable-btn" @click="onConfirmMaincard">確定</button>
    </div>
    <!-- ダイアログボディー部 -->
    <div class="dialog-body">
      <div v-for="(item, index) in maincardAllList" :key="index">
        <!-- タイトル -->
        <div :class="itemTitleStyle(item)">{{item.name}}</div>
        <!-- radio -->
        <div class="background-style">
          <div class="service-info-name" @click="onChangeStatus(item)">
            <el-radio v-model="radio" :label="item.name" @change="onChangeStatus(item)">&nbsp;</el-radio>
            <span>{{itemComponentName(item)}}</span>
          </div>
          <!-- mainCardChild -->
          <div v-for="(el, index) in item.mainCardChild" :key="index">
            <div class="sub-item-border"></div>
            <div class="service-info-name" @click="onChangeStatus(el)">
              <el-radio v-model="radio" :label="el.name" @change="onChangeStatus(el)">&nbsp;</el-radio>
              <span>{{mainCardChildComponentName(el)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import GlobalMixins from '@/mixin/global-mixins'
import mw01Methods from './mw01-methods'
import * as MW01Constants from './mw01-constants'
import * as GlobalConstants from '@/constants/component-constants'
import 'sortablejs'
export default {
  name: 'MW01',
  mixins: [mw01Methods, GlobalMixins],
  data() {
    return {
      selectedComponent: {
        isActived: GlobalConstants.MAIN_CARD_LIST[0].isActived,
        component: GlobalConstants.MAIN_CARD_LIST[0].component,
        componentName: GlobalConstants.MAIN_CARD_LIST[0].componentName,
        name: GlobalConstants.MAIN_CARD_LIST[0].name,
        ekimuCode: GlobalConstants.MAIN_CARD_LIST[0].ekimuCode,
        srvcKindCode: GlobalConstants.MAIN_CARD_LIST[0].srvcKindCode
      },
      maincardAllList: MW01Constants.MAIN_CARD_LIST,
      sortable: null,
      radio: MW01Constants.MAIN_CARD_LIST[0].name,
      scrolltopFlag: 0
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mainCardTop: {
      type: Number
    }
  },
  created() {
    this.scrolltopFlag = 1
  },
  updated() {
    if (this.scrolltopFlag === 1) {
      this.$nextTick(function() {
        var container = this.$el.querySelector('.dialog-body')
        container.scrollTop = 0
      })
    }
  },
  watch: {
    visible: {
      handler(newValue) {
        this.radio = MW01Constants.MAIN_CARD_LIST[0].name
        this.selectedComponent = {
          isActived: GlobalConstants.MAIN_CARD_LIST[0].isActived,
          component: GlobalConstants.MAIN_CARD_LIST[0].component,
          componentName: GlobalConstants.MAIN_CARD_LIST[0].componentName,
          name: GlobalConstants.MAIN_CARD_LIST[0].name,
          ekimuCode: GlobalConstants.MAIN_CARD_LIST[0].ekimuCode,
          srvcKindCode: GlobalConstants.MAIN_CARD_LIST[0].srvcKindCode
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.background-style {
  background: #fff;
  text-align: left;
}
.dialog-header {
  width: 100%;
  height: 60px;
  background: #ffffff;
  border-radius: 4px 4px 0 0;
  border-bottom: 0.5px solid #979797;
  line-height: 60px;
}
.dialog-body {
  height: 382px;
  overflow-y: scroll;
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
.confirm-btn {
  height: 36px;
  width: 100px;
  border: 0px;
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
.clickable-btn {
  background: #00438b;
  border: 1px solid #00438b;
}
.clickable-btn:hover {
  background: #2665b2;
  border: 1px solid #00438b;
}
.cancle-btn:hover {
  background-color: #e5eef7;
}
.disabled-btn {
  background: #d8d8d8;
  border: 0px;
}
.header-title {
  font-family: 'Meiryo UI';
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
}
.service-name-first-item {
  padding-left: 30px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #979797;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: left;
}
.service-name {
  padding-left: 30px;
  height: 42px;
  line-height: 42px;
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: left;
}
.sub-item-border {
  height: 0px;
  border-top: 1px solid #ccc;
  margin: 0px 0px 0px 31px;
}
.service-info-name {
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  padding-left: 45px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  color: #000;
  font-family: 'Meiryo UI';
  font-size: 14px;
}
</style>

<style>
.service-info-name:hover .el-radio__inner {
  border-color: #00438b !important;
}
.mw01 .el-dialog {
  min-width: 412px;
}
.add-maincard-dialog {
  min-width: '610px';
  max-width: '610px';
}
.add-maincard-dialog .el-dialog__header {
  padding: 0;
}
.add-maincard-dialog .el-dialog.el-dialog--center {
  /* height: 940px; */
  background: #ededed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
.add-maincard-dialog .el-dialog--center .el-dialog__body {
  padding: 0px;
  height: 380px;
  overflow: hidden;
  scroll-padding-inline: 20px;
  border-radius: 4px;
}
.add-maincard-dialog .el-radio {
  margin-right: 0px;
}
.add-maincard-dialog .el-radio__input.is-checked .el-radio__inner {
  border-color: #00438b;
  background: #00438b;
}
</style>
