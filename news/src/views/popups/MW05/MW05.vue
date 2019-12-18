<template>
  <el-dialog class="filter-dialog mw05" :visible="visible" :show-close="false" width="50%" center>
    <!-- ダイアログヘーダー部 -->
    <div slot="title" class="head-style">
      <button class="cancle-btn" @click="onCloseWindows">キャンセル</button>
      <span class="head-title">絞り込み</span>
      <button class="clickable-btn" @click="onOKbtn">確定</button>
    </div>
    <!-- ダイアログボディー部 -->
    <div class="dialog-body">
      <div v-for="(item,index) in filter" :key="index">
        <div v-if="isMainCardShow(item)">
          <div v-if="item.pulldown">
            <!-- タイトル -->
            <div class="body-title">{{item.pulldown.name}}</div>
            <!-- select -->
            <el-select
              class="body-select"
              size="small"
              v-model="init"
              ref="bodySelect"
              @visible-change="inputBlur($event,'bodySelect')"
            >
              <el-option
                v-for="newItem in item.pulldown.value"
                :key="newItem.value"
                :label="newItem.label"
                :value="newItem.value"
              ></el-option>
            </el-select>
          </div>
          <div v-if="item.textarea">
            <!-- タイトル -->
            <div class="body-title">{{item.textarea.name}}</div>
            <!-- input -->
            <el-input class="body-select" size="small" v-model="initInput"></el-input>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import MW05Methods from './mw05-methods'
import * as MW05Constants from './mw05-constants'
export default {
  name: 'MW05',
  mixins: [MW05Methods],
  data() {
    return {
      filter: MW05Constants.FILTER,
      mw05Model: '',
      filterList: [{}, {}],
      init: 100,
      initInput: '',
      initVal: MW05Constants.PULLDOWN_INIT
    }
  },
  props: {
    filterdata: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    inputData: {
      type: Number
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.init = this.inputData
      }
    }
  }
}
</script>
<style scoped>
.head-style {
  width: 100%;
  height: 60px;
  background: #ffffff;
  border-radius: 4px 4px 0 0 0;
  line-height: 60px;
}
.cancle-btn {
  height: 36px;
  width: 100px;
  background: #ffffff;
  border: 1px solid #00438b;
  border-radius: 4px;
  font-family: Meiryo-Bold;
  font-size: 14px;
  color: #00438b;
  line-height: 14px;
  font-weight: bold;
  float: left;
  margin: 12px 0px 0px 30px;
  cursor: pointer;
}
.clickable-btn {
  height: 36px;
  width: 100px;
  border-radius: 4px;
  font-family: Meiryo-Bold;
  font-size: 14px;
  color: #fff;
  line-height: 14px;
  font-weight: bold;
  float: right;
  margin: 12px 30px 0px 0px;
  background: #00438b;
  border: 1px solid #00438b;
  cursor: pointer;
}
.clickable-btn:hover {
  background: #2665b2;
  border: 1px solid #00438b;
}
.cancle-btn:hover {
  background-color: #e5eef7;
}
.disabledBtn {
  background: #d8d8d8;
  border: 0px;
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
.serviceName {
  padding-left: 30px;
  height: 42px;
  line-height: 42px;
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
.dialog-body {
  border-top: 1px solid #979797;
  height: 264px;
  background-color: #ededed;
  overflow-y: auto;
  padding-top: 10px;
  padding: 25px;
}
.body-title {
  height: 20px;
  color: #000000;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 12px;
}
.body-select {
  width: 100%;
  margin-bottom: 18px;
}
</style>
<style>
.mw05 .el-dialog {
  min-width: 364px;
}
.filter-dialog .dialog-body .body-select .el-input input {
  border: 1px solid #979797;
  padding-left: 10px;
}
.filter-dialog .dialog-body .body-select .el-input.is-focus input {
  border: 1px solid #00438b;
  padding-left: 10px;
}
.filter-dialog .dialog-body .body-select .el-input.is-disabled input {
  border: 1px solid #c9ced7;
  padding-left: 10px;
}
.filter-dialog .dialog-body .body-select .el-icon-arrow-up {
  color: #00438b;
}
.filter-dialog .dialog-body .body-select .el-input__inner {
  height: 32px;
  line-height: 31px;
  border: 1px solid #979797;
  font-family: Meiryo;
  font-size: 14px;
  color: #4a4a4a;
}
.filter-dialog .dialog-body .body-select .is-focus .el-input__inner {
  border: 1px solid #00438b;
}
.filter-dialog .dialog-body .body-select .el-input__inner:disabled {
  background: #fafafa;
  border: 1px solid #c9ced7;
  color: #9b9b9b;
}
.filter-dialog .el-dialog__body {
  height: 264px;
  overflow: hidden;
  padding: 0;
}
.filter-dialog .el-dialog__header {
  padding: 0;
}
</style>
