<template>
  <div style="z-index:10;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3);" v-if="detailHistory">
    <div class="title">
      <span class="text2"></span>
      詳細検索履歴
    </div>
    <div class="contain">
      <div class="tablest">
        <div style="display:flex;margin-top:20px;">
          <div class="tabletitle firstRow">照会対象</div>
          <div class="tabletitle secondRow">必須条件</div>
          <div class="tabletitle thirdRow">任意条件</div>
        </div>
        <div v-if="mainData.length !== 0">
          <div class="tablecon" v-for="(item,index) in newMainData" :key="index">
            <div class="tabletxt firstRow">{{item.searchObjectLabel}}</div>
            <div
              @click="onInfoBackShow(item)"
              class="tabletxt secondRow secondContent"
            >{{item.mustLabel}}</div>
            <div class="tabletxt thirdRow">{{item.alternateLabel}}</div>
          </div>
        </div>
        <div v-else class="tablecon2">
          <div class="tabletxt2">該当する結果は存在しません</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailSearchHistory } from '@/utils/search-history'
import * as DETAIL_SEARCH_CONSTANTS from '../detail-search-constants'
import detailSearchHistoryMethods from './datail-search-history-methods'
export default {
  mixins: [detailSearchHistoryMethods],
  data() {
    return {
      mainData: [],
      newMainData: []
    }
  },
  watch: {
    detailHistory: {
      handler() {
        this.mainData = getDetailSearchHistory()
        let newString = JSON.parse(JSON.stringify(this.mainData))
        newString.forEach((element, index) => {
          // 照会対象のlabelを取得
          let searObjLab = {}
          searObjLab = DETAIL_SEARCH_CONSTANTS.SEARCH_OBJECT_LIST.find(item => {
            return item.value === element.searchObjectValue
          })
          element.searchObjectLabel = searObjLab.label
          let historyLabel = JSON.parse(
            window.sessionStorage.getItem('DETAIL_SEARCH')
          )
          historyLabel.forEach((ele, ind) => {
            if (index === ind) {
              if (historyLabel[ind].mailInputValue.length > 0) {
                element.mustLabel =
                  historyLabel[ind].mailInputValue +
                  '@' +
                  historyLabel[ind].hostInputValue +
                  '.ocn.ne.jp'
              } else {
                element.mustLabel = historyLabel[ind].mustInputValue
              }
            }
          })
          // 任意条件のlabelを取得
          historyLabel.forEach((ele, ind) => {
            if (index === ind) {
              if (historyLabel[ind].newAddress.length > 0) {
                element.alternateLabel = historyLabel[ind].newAddress
              } else if (historyLabel[ind].newStatus.length > 0) {
                element.alternateLabel = historyLabel[ind].newStatus
              } else if (historyLabel[ind].alternateInputValue.length > 0) {
                element.alternateLabel = historyLabel[ind].alternateInputValue
              } else {
                let alternateObjLab = {}
                alternateObjLab = DETAIL_SEARCH_CONSTANTS.ALTERNATE_LIST.find(
                  item => {
                    return item.value === element.alternateValue
                  }
                )
                element.alternateLabel = alternateObjLab.label
              }
            }
          })
        })
        this.newMainData.splice(0, this.newMainData.length)
        let centerString = ''
        newString.forEach((item, index) => {
          if (JSON.stringify(item) !== centerString) {
            this.newMainData.push(item)
          }
          centerString = JSON.stringify(item)
        })
        this.newMainData = this.newMainData.reverse()
      }
    }
  },
  props: {
    detailHistory: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.firstRow {
  width: 115px;
}
.thirdRow {
  width: 150px;
}
.title {
  width: 435px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 2px 2px 0 0;
  background-color: #dcdcdc;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
  font-weight: bold;
}
.secondRow {
  width: 120px;
}
.secondContent {
  color: #00438b !important;
  cursor: pointer;
}
.text2 {
  display: inline-block;
  background: #dcdcdc;
  width: 12px;
  height: 11px;
  transform: rotate(-45deg);
  position: absolute;
  right: 55px;
  top: -5px;
}
.contain {
  width: 415px;
  background-color: #fff;
  padding-left: 20px;
}
.tablest {
  display: flex;
  width: 415px;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
}
.tabletitle {
  height: 20px;
  width: 115px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
}
.tabletxt {
  height: 30px;
  width: 115px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  line-height: 30px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabletxt2 {
  width: 100%;
  height: 50px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
.tablecon {
  display: flex;
}
.tablecon2 {
  display: flex;
}
.tablecon:hover {
  background-color: #ededed;
}
</style>>
