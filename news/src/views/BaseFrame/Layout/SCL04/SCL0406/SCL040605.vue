<template>
  <div class="scl04">
    <el-card :class="isCardShow()">
      <div slot="header">
        <span class="header-span">{{ subcardName }}</span>
      </div>
      <el-row class="row-text">契約一覧</el-row>
      <div class="zero-text" v-if="!isCutomInfoSet">
        <span>{{ userNotDefined }}</span>
      </div>
      <div v-else-if="totalCount > 0 && !hasError" class="out-space title-height">
        <el-row class="spe-row">
          <span class="left-text">合計契約数</span>
          <span class="right-text">{{ totalCount + ' ' + '件' }}</span>
        </el-row>
        <div class="all-row-height">
          <el-row
            class="row-height"
            v-for="(item, index) in dataPerPage"
            :key="index"
          >
            <span :class="judgeAuthorityStyle()">{{ item.contractId }}</span>
          </el-row>
        </div>
        <el-row class="row-center">
          <span class="shoryaku-kigo" @click="openMcl04List()">すべて見る</span>
        </el-row>
      </div>
      <div class="warn-text" v-else-if="hasError">
        <div class="warn-text-box">
          <svg-icon icon-class="warning icon" class="warn-icons"></svg-icon>
          <span class="warn-word">{{ errorMsg }}</span>
          <span class="warn-word">{{ 'エラーコード：' + errorCode }}</span>
        </div>
      </div>
      <div v-else-if="totalCount === 0">
        <div class="warn-text">
          <span>該当するサービスはありません。</span>
        </div>
        <el-row class="row-center-dis">
          <span class="shoryaku-kigo-dis">すべて見る</span>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import SCL04Mixin from '../mixin/scl04-mixin'
import * as OPTION_ID from '@/constants/option-id-constans'
import * as CARDIDLIST from '@/constants/card-id-constants'
import GlobalMixins from '@/mixin/global-mixins'
import SubCardBase from '@/mixin/sub-card-base'
import '@/assets/css/scl04Common.css'
export default {
  name: 'SCL040605',
  extends: SubCardBase,
  mixins: [SCL04Mixin, GlobalMixins],
  data() {
    return {
      optionId: OPTION_ID.SCL0406A
    }
  },
  created() {
    this.cardId = CARDIDLIST.SCL0406
  }
}
</script>
<style scoped>
.scl04 .scl04-size {
  width: 300px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.scl04 .nodata-size {
  height: 257px;
}
.scl04 .data-size {
  height: 276px;
}
</style>
