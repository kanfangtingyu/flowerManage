<template>
  <div ref="mcd0102" class="mcd0102">
    <div class="keiyaku-nav">
      <div class="keiyaku-back">
        <svg-icon class="back-icon" icon-class="GobackButton" @click="onBackView"></svg-icon>
        <span class="span-line" @click="onBackView">契約一覧</span>
      </div>
      <span class="main-card-type">{{maincardType}}</span>
    </div>
    <div v-if="!hasError">
      <span v-if="!contractNoneFlg">
        <el-row v-if="billingListShow" class="keiyaku-header">
          <el-row v-if="isSummaryShow" class="keiyaku-msg-head">
            <div class="all-width">
              <span class="item-title">契約番号</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strKykNum)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名</span>
              <span
                class="item-contents full-style"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strSksSfsMei)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名カナ</span>
              <span
                class="item-contents full-style"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strSksSfsKnaMei)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">帰属センタ名</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strKzkCenSyb)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">課金開始日</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{YMDFormat(item.strKakSttBi)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">廃止日</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{YMDFormat(item.strHaiBi)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">利用停止状態</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strRiyTisJtiMei)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">利用停止実施日</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{YMDFormat(item.strRiyTisJssBi)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">契約決裁番号</span>
              <span
                class="item-contents item-contents-width"
                v-for="(item, index) in summaryListInfo"
                :key="index"
              >{{ifNoData(item.strKykKssNum)}}</span>
            </div>
          </el-row>
          <el-row v-else class="keiyaku-msg-head">
            <div class="all-width">
              <span class="item-title">契約番号</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名カナ</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">帰属センタ名</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">課金開始日</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">廃止日</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">利用停止状態</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">利用停止実施日</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">契約決裁番号</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
          </el-row>
        </el-row>
        <div class="no-data-box" v-if="!billingListShow"></div>
        <el-radio-group v-model="tabPosition" class="tab-radio-group">
          <el-radio-button class="bill-radio-button" label="契約情報">契約情報</el-radio-button>
          <el-radio-button :disabled="billDisabled" class="bill-radio-button" label="請求情報">請求情報</el-radio-button>
          <el-radio-button
            :disabled="receiptDisabled"
            class="receipt-radio-button"
            label="収納情報"
          >収納情報</el-radio-button>
        </el-radio-group>
        <div class="bill-tab" v-if="tabPosition==='契約情報'">
          <div class="div-center">契約情報の詳細はNB基盤にて確認してください。</div>
          <div class="nb-btn">
            <el-button @click="transformToNb">NB基盤を開く</el-button>
          </div>
        </div>
        <div v-if="!isBundle">
          <div class="bill-tab" v-if="tabPosition==='請求情報' && tableData.length > 0">
            <el-table
              v-if="billingListShow"
              ref="multipleTable"
              stripe
              :data="tableData"
              border
              class="ocn-list"
              :header-cell-style="tableCellStyle"
              :cell-style="changeCellStyle"
            >
              <el-table-column align="center" label="表示" min-width="5%">
                <template slot-scope="scope">
                  <el-radio
                    v-model="multipleRadio"
                    :label="scope.$index"
                    @change="onMultipleRadioClick(scope.$index, scope.row)"
                    class="table-row"
                  >&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column align="center" type="index" min-width="5%"></el-table-column>
              <el-table-column align="center" label="請求年月" min-width="10%">
                <template slot-scope="scope">
                  <span>{{YMFormat(scope.row.strSkyYm)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="strHyjBilId"
                label="ビリングID(BEAGLE)"
                min-width="10%"
              ></el-table-column>
              <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="10%"></el-table-column>
              <el-table-column align="center" label="定期一括" min-width="10%">
                <template slot-scope="scope">
                  <span>{{payReAccelType(scope.row)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="10%" :key="Math.random()">
                <template slot="header">
                  <span>{{payment}}</span>
                  <span v-if="isShowAxel()" class="color-red">※1</span>
                </template>
                <template slot-scope="scope">
                  <span v-if="scope.row.strShrKbn !== 'アクセル'">{{payCategory(scope.row.strShrKbn)}}</span>
                  <span v-else class="axel-line" @click="onPayment(scope.row)">{{scope.row.strShrKbn}}</span>
                </template>
              </el-table-column>
              <el-table-column align="right" label="金額" min-width="40%">
                <template slot-scope="scope">
                  <span>{{payAmountType(scope.row)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="no-data-box" v-if="!billingListShow"></div>
          </div>
          <div class="bill-tab" v-if="tabPosition==='収納情報' && storageData.length > 0">
            <el-table
              ref="storageTable"
              stripe
              :data="storageData"
              border
              class="receipt-status-list"
              :header-cell-style="tableCellStyle"
              :cell-style="changeCellStyle"
            >
              <el-table-column align="center" label="表示" min-width="5%">
                <template slot-scope="scope">
                  <el-radio
                    v-model="storageRadio"
                    :label="scope.$index"
                    @change="onStorageRadioClick(scope.$index)"
                    class="table-row"
                  >&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column align="center" label="請求年月" min-width="15%">
                <template slot-scope="scope">
                  <span>{{YMFormat(scope.row.strSkyYm)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="strHyjBilId"
                label="ビリングID(BEAGLE)"
                min-width="20%"
              ></el-table-column>
              <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="15%"></el-table-column>
              <el-table-column align="center" label="定期一括" min-width="15%">
                <template slot-scope="scope">
                  <span>{{payReAccelType(scope.row)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="right" label="金額" min-width="10%">
                <template slot-scope="scope">
                  <span>{{payAmountType(scope.row)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="strKkmJkyKbn" label="消込状況" min-width="10%"></el-table-column>
              <el-table-column align="center" label="収納年月日" min-width="15%">
                <template slot-scope="scope">
                  <span>{{storageYMD(scope.row.strSynYmd)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="no-data-box" v-if="!billingListShow"></div>
          </div>
          <el-row class="tab-info" v-if="tabPosition==='請求情報' && tableData.length > 0">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="サマリー" name="サマリー">
                <div v-if="billingDetailShow">
                  <el-row v-if="showSummaryDetailInfo" class="item-box">
                  <div class="item-width">
                    <span class="item-title">契約番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{item.strKykNum}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求年月</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{YMFormat(item.strSkyYm)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">分割番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{YMFormat(item.strBktNum)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">定期分割表示</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payReAccelType(item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payType(item.strShrKbn)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">請求書送付先名</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strSksSfsMei)}}</span>
                  </div>
                  <div :span="12" class="item-width half-width">
                    <span class="item-title">請求書送付先名カナ</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strSksSfsKnaMei)}}</span>
                  </div>
                  <div :span="24" class="item-width">
                    <span class="item-title">帰属センタ</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strKzkCenSyb)}}</span>
                  </div>
                  </el-row>
                  <div v-else-if="!showSummaryDetailInfo">該当する情報はありません。</div>
                  </div>
                <div class="no-data-box" v-if="!billingDetailShow"></div>
              </el-collapse-item>
              <el-collapse-item v-if='!accelBillingInfo' title="請求情報" name="請求情報">
                <div v-if="billingDetailShow">
                  <el-row
                    v-if="showSummaryDetailInfo"
                    class="item-box margin-bottom-high margin-bottom-lows"
                  >
                  <div class="item-width half-width">
                    <span class="item-title">請求金額</span>
                    <span
                      class="item-contents full-style amount-right"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{claimAmountFormat(item.strSkyKgk)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">分割区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strKmkSynBktKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payType(item.strShrKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">金融機関コード</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strKnyKknCod)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">口座番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payReType(item.strKozKgo, item)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">カード番号</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strCdtCrdNum)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">住所入力区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{addrInputType(item.addrCode)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求書送付先郵便番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{isNumFormat(item.strSksSfsMeiYbnNum)}}</span>
                  </div>
                  <div class="margin-bottom-high width-margin">
                    <span class="item-title">請求書送付先住所</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in address"
                      :key="index"
                    >{{addrFormat(item)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">一括請求書送付先名</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payReType(item.strIktSksSfsMei, item)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">一括請求書送付先名カナ</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strIktSksSfsKnaMei)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">発行止</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payReType(item.strHkDmeHyj, item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行課金状況</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payAccelType(item.strHkDmeHyj, item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行支払期限日</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payAccelYMDType(item.strKozKgo, item)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">OCN回収代行課金先番号</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{payAccelType(item.strIktSksSfsMei, item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">任意内訳種類</span>
                    <div v-for="(items, index) in summaryDetailInfo" :key="index">
                      <span
                        class="item-contents item-contents-width"
                        v-for="(item, index) in items.stcLblJyo"
                        :key="index"
                      >{{payReType(item.strNniUwkSyu, item)}}</span>
                    </div>
                  </div>
                  <div class="item-width">
                    <span class="item-title">定期回送/発行止</span>
                    <div v-for="(items, index) in summaryDetailInfo" :key="index">
                      <span
                        class="item-contents item-contents-width"
                        v-for="(item, index) in items.stcLblJyo"
                        :key="index"
                      >{{payAccelType(item.strNniUwkSyu, item)}}</span>
                    </div>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括契約番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryDetailInfo"
                      :key="index"
                    >{{ifNoData(item.strIktKykNum)}}</span>
                  </div>
                  </el-row>
                  <div v-else>該当する情報はありません。</div>
                </div>
                <div class="no-data-box" v-if="!billingDetailShow"></div>
              </el-collapse-item>
              <el-collapse-item v-if="accelBillingInfo" title="請求情報" name="請求情報">
                <div v-if="accelBillingDetailByLineShow">
                  <el-row class="item-box margin-bottom-high info-list">
                  <div class="item-width half-width">
                    <span class="item-title">当月請求額</span>
                    <span
                      class="item-contents full-style amount-right"
                    >{{amountFormat(guiBillGrp.thisMonthBillAmount)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求群</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifHasGroup(guiBillGrp.billGrp)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求種別</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.billClassName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">ワンビリング識別</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifHasGroup(guiBillGrp.oneBillingDistName + guiBillGrp.oneBillingParentChildDistName)}}</span>
                  </div>

                  <div class="item-width">
                    <span class="item-title">ワンビリング適用群</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.oneBillingApplyGrp)}}</span>
                  </div>

                  <div class="item-width">
                    <span class="item-title">利用期間(自～至)</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(guiBillGrp.usePeriodStrt) + '~' + YMFormat(guiBillGrp.usePeriodEnd)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">契約区分</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.contractTyp)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">回送条件</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in guiBillGrp.fwConditionG"
                      :key="index"
                    >{{ifNoData(item.fwCondition)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">回線計</span>
                    <span class="item-contents full-style">{{ifNoData(guiBillGrp.lineTotal)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払方法</span>
                    <span class="item-contents item-contents-width">{{ifNoData(guiBillGrp.payWay)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">預り金有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.depositFlg)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">加減算有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.chrgCorrectFlg)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">バンドルID</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.bandleId)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">合算エラー結果</span>
                    <span class="item-contents full-style">{{ifNoData(guiBillGrp.addupErrResult)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">異名義契約有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.differContractNameContractFlg)}}</span>
                  </div>
                  </el-row>
                </div>
                <div class="no-data-box" v-if="!accelBillingDetailByLineShow"></div>
              </el-collapse-item>
              <el-collapse-item title="内訳" name="内訳">
                <div v-if="billingDetailShow">
                  <div
                    v-if="detailsData.length > 999"
                    class="warn-text"
                  >※1000レコード以上存在するため、最初の999レコード表示します</div>
                  <div class="detail-table-header">
                    <div class="intitle">
                      <div class="index-width">#</div>
                      <div class="detail-width">内訳</div>
                      <div class="detail-name-width">内訳名</div>
                      <div class="daily-rate-width">日割</div>
                      <div class="chrg-width">金額</div>
                      <div class="tax-typ-width">税区分</div>
                    </div>
                    <div v-for="(item, index) in detailsIndexData" :key="index">
                      <div v-if="showBreakdown(item)" class="incontain">
                        <div class="index-width">{{item.index}}</div>
                        <div class="detail-width">{{ifNoData(item.strUwkSyb)}}</div>
                        <div class="detail-name-width detail-name-left">{{ifNoData(item.strUwkMei)}}</div>
                        <div class="daily-rate-width">{{ifNoData(item.strHwrKbn)}}</div>
                        <div class="chrg-width chrg-right">{{claimAmountFormat(item.strUwkSyb)}}</div>
                        <div class="tax-typ-width">{{ifNoData(item.strZeiKbn)}}</div>
                      </div>
                      <div class="incontain">
                        <div class="str-osr-mgn-left-width"></div>
                        <div class="str-osr-mgn-width">{{ifNoData(item.strOsrMgn)}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="no-data-box" v-if="!billingDetailShow"></div>
              </el-collapse-item>
              <el-collapse-item title="科目照会" name="科目照会">
                <div v-if="billingCategoryShow">
                  <el-row class="class-title">請求プラン情報</el-row>
                  <el-table
                  ref="invoicePlanTable"
                  stripe
                  :data="invoicePlanInfo"
                  border
                  class="invoice-plan-table"
                  :header-cell-style="tableCellStyle"
                  :cell-style="changeCellStyle"
                  >
                  <el-table-column align="center" prop="strTnySkb" label="投入識別" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strKmkCod" label="科目コード" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strKmkMei" label="科目名" min-width="15%"></el-table-column>
                  <el-table-column align="center" label="利用期間" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{YMDFormat(scope.row.strRiySttBi) + '～' + YMDFormat(scope.row.strRiyEndBi)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="strKoSuu" label="個数" min-width="10%"></el-table-column>
                  <el-table-column align="right" label="金額" min-width="10%">
                    <template slot-scope="scope">
                      <span>{{claimAmountFormat(scope.row.strKinGak)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="strZeiKbn" label="税区分" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strKsyMei" label="会社名" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strAbnKbn" label="按分有無" min-width="10%"></el-table-column>
                  </el-table>
                  <el-row class="class-title">請求情報</el-row>
                  <el-row class="item-box margin-bottom-low">
                  <div class="item-width half-width">
                    <span class="item-title">請求金額</span>
                    <span
                      class="item-contents full-style amount-right"
                      v-for="(item, index) in summaryCategoryInfo"
                      :key="index"
                    >{{claimAmountFormat(item.strSkyKgk)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">分割区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strKmkSynBktKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in summaryCategoryInfo"
                      :key="index"
                    >{{payType(item.strShrKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括表示</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strIktHyj)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">一括請求書送付先名</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in summaryCategoryInfo"
                      :key="index"
                    >{{ifNoData(item.strIktSksSfsMei)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">消費税相当額</span>
                    <span
                      class="item-contents full-style amount-right"
                      v-for="(item, index) in summaryCategoryInfo"
                      :key="index"
                    >{{claimAmountFormat(item.strShzStoGak)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">契約プラン名</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strPlnMei)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">休止理由</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strKyuRyu)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">顧客区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strKkkKbnHyj)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">相対有無</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in invoiceInfo"
                      :key="index"
                    >{{ifNoData(item.strAitUmu)}}</span>
                  </div>
                  </el-row>
                </div>
                <div class="no-data-box" v-if="!billingCategoryShow"></div>
              </el-collapse-item>
              <el-collapse-item title="投入履歴" name="投入履歴">
                <div v-if="orderHistoryShow">
                  <el-table
                  v-if="tabPosition==='請求情報'"
                  :data="historyIndexData"
                  border
                  class="bill-info-table"
                  :header-cell-style="tableCellStyle"
                  :span-method="arraySpanMethod"
                  :cell-style="historyCellStyle"
                  :row-style="historyRowStyle"
                  >
                  <el-table-column align="center" label="#" min-width="5%">
                    <template slot-scope="scope">
                      <span>{{scope.row.index}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="請求年月" min-width="13%">
                    <template slot-scope="scope">
                      <span>{{billingDateFormat(scope.row)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="strHyjBilId"
                    label="ビリングID(BEAGLE)"
                    min-width="24%"
                  ></el-table-column>
                  <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="13%"></el-table-column>
                  <el-table-column align="center" label="投入年月日" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{YMDFormat(scope.row.strTnyYmd)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="strTnySyb" label="投入種別" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strTnyCen" label="投入センタ" min-width="10%"></el-table-column>
                  <el-table-column align="center" prop="strTnySyaMei" label="投入者名" min-width="15%"></el-table-column>
                  <el-table-column align="center" prop="strKijRan" label="投入情報" min-width="15%"></el-table-column>
                  </el-table>
                </div>
                <div class="no-data-box" v-if="!orderHistoryShow"></div>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-row
            class="bill-tab"
            v-if="tabPosition==='請求情報' && tableData.length <= 0 && billingListShow"
          >該当する情報はありません。</el-row>
          <el-row
            class="no-data-box"
            v-else-if="tabPosition==='請求情報' && !billingListShow"
          ></el-row>
          <el-row class="tab-info" v-if="tabPosition==='収納情報' && storageData.length > 0">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="サマリー" name="サマリー">
                <div v-if="billingListShow">
                  <el-row class="item-box">
                  <div class="item-width">
                    <span class="item-title">定期分割表示</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{payReAccelType(item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{payType(item.strShrKbn)}}</span>
                  </div>
                  </el-row>
                </div>
                <div class="no-data-box" v-if="!billingListShow"></div>
              </el-collapse-item>
              <el-collapse-item title="収納状況" name="収納状況">
                <div v-if="billingListShow">
                  <el-row class="item-box">
                  <div class="item-width">
                    <span class="item-title">収納年月日</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{storageDate(item.strSynYmd)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">消込年月日</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{YMDFormat(item.strKkmYmd)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行支払期限日</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{payAccelYMDType(item.strKozNum, item)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括契約番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strIktKykNum)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">一括請求書送付先名</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strIktSksSfsMei)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">一括請求書送付先名カナ</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strIktSksSfsKnaMei)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">請求金額</span>
                    <span
                      class="item-contents full-style amount-right"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{amountFormat(item.strSkyKgk)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">分割区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strKmkSynBktKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{payType(item.strShrKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">金融機関コード</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strKnyKikCod)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">口座番号</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{payReType(item.strKozNum, item)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">カード番号</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strCdtCrdNum)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">消込状況</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strKkmJkyKbn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">滞納簿登記</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strTnbTou)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">振替不能理由</span>
                    <span
                      class="item-contents full-style"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strFfnRyu)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">変更後支払期限</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{YMDFormat(item.strHkoGoShrKgn)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">収納機関(区分)</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in storageSituationInfo"
                      :key="index"
                    >{{ifNoData(item.strSynKikKbn)}}</span>
                  </div>
                  </el-row>
                </div>
                <div class="no-data-box" v-if="!billingListShow"></div>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-row
            class="bill-tab"
            v-if="tabPosition==='収納情報' && storageData.length <= 0 && billingListShow"
          >該当する情報はありません。</el-row>
          <el-row
            class="no-data-box"
            v-else-if="tabPosition==='収納情報' && !billingListShow"
          ></el-row>
        </div>
        <div v-if="isBundle">
          <div class="bill-tab" v-if="tabPosition==='請求情報' && accelTableData.length > 0">
            <div v-if="accelSoBillingByIdsShow">
              <el-table
              ref="multipleTable"
              stripe
              :data="accelTableData"
              border
              class="ocn-list"
              :header-cell-style="tableCellStyle"
              >
              <el-table-column align="center" label="表示" min-width="5%">
                <template slot-scope="scope">
                  <el-radio
                    class="radio"
                    v-model="radio"
                    :label="scope.$index"
                    @change="radioClick(scope.$index, scope.row)"
                  >&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column align="center" label="ビリングID" min-width="15%">
                <template slot-scope="scope">
                  <span
                    @click="billingIdClick(scope.row)"
                    class="billing-link"
                  >{{scope.row.billInfo[0].billingId}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="請求種別" min-width="10%">
                <template slot-scope="scope">
                  <span>{{billClassName(scope.row.billInfo[0].billClass)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="ﾜﾝﾋﾞﾘﾝｸﾞ" min-width="15%">
                <template slot-scope="scope">
                  <span>{{wabillingFlg(scope.row)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="請求群" min-width="11%">{{reqAttr}}</el-table-column>
              <el-table-column align="center" label="譲渡請求拒否" min-width="11%">
                <template slot-scope="scope">{{scope.row.billInfo[0].transferBillRefusalDistName}}</template>
              </el-table-column>
              <el-table-column align="center" label="譲渡請求対象外" min-width="11%">
                <template slot-scope="scope">{{scope.row.billInfo[0].transferBillObjectOffDistName}}</template>
              </el-table-column>
              <el-table-column align="center" label="強制独自発行" min-width="11%">
                <template slot-scope="scope">{{scope.row.billInfo[0].cnplsionOriginPblshDistName}}</template>
              </el-table-column>
              <el-table-column align="center" label="定期分割" min-width="11%">{{attr}}</el-table-column>
              </el-table>
              <div v-if="!accelReceiptStatusResNone">
              <p class="request-date-text">請求期別</p>
              <el-select
                size="small"
                v-model="label"
                placeholder="選択してください"
                @change="accelDate($event)"
                ref="accelDate"
                @visible-change="inputBlur($event,'accelDate')"
              >
                <el-option
                  v-for="(item,index) in requestDateList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              </div>
              <div v-else>該当する情報はありません。</div>
            </div>
             <div class="no-data-box" v-if="!accelSoBillingByIdsShow"></div>
          </div>
          <el-row class="tab-info" v-if="tabPosition==='請求情報' && accelTableData.length > 0">
            <el-collapse
              v-if="mcd0102Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes"
              v-model="activeNames"
            >
              <el-collapse-item title="請求情報" name="請求情報">
                <div v-if="accelBillingDetailByLineShow">
                  <el-row class="item-box margin-bottom-high info-list">
                  <div class="item-width half-width">
                    <span class="item-title">当月請求額</span>
                    <span
                      class="item-contents full-style amount-right"
                    >{{amountFormat(guiBillGrp.thisMonthBillAmount)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求群</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifHasGroup(guiBillGrp.billGrp)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求種別</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.billClassName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">ワンビリング識別</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifHasGroup(guiBillGrp.oneBillingDistName + guiBillGrp.oneBillingParentChildDistName)}}</span>
                  </div>

                  <div class="item-width">
                    <span class="item-title">ワンビリング適用群</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.oneBillingApplyGrp)}}</span>
                  </div>

                  <div class="item-width">
                    <span class="item-title">利用期間(自～至)</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(guiBillGrp.usePeriodStrt) + '~' + YMFormat(guiBillGrp.usePeriodEnd)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">契約区分</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.contractTyp)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">回送条件</span>
                    <span
                      class="item-contents item-contents-width"
                      v-for="(item, index) in guiBillGrp.fwConditionG"
                      :key="index"
                    >{{ifNoData(item.fwCondition)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">回線計</span>
                    <span class="item-contents full-style">{{ifNoData(guiBillGrp.lineTotal)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払方法</span>
                    <span class="item-contents item-contents-width">{{ifNoData(guiBillGrp.payWay)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">預り金有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.depositFlg)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">加減算有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.chrgCorrectFlg)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">バンドルID</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.bandleId)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">合算エラー結果</span>
                    <span class="item-contents full-style">{{ifNoData(guiBillGrp.addupErrResult)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">異名義契約有無</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(guiBillGrp.differContractNameContractFlg)}}</span>
                  </div>
                  </el-row>
                </div>
                <div class="no-data-box" v-if="!accelBillingDetailByLineShow"></div>
              </el-collapse-item>
              <el-collapse-item title="内訳" name="内訳">
                <div v-if="accelBillingDetailByLineShow" class="bottom-padding">
                  <el-table
                    class="naiwake-table"
                    :data="billDetailIndexData"
                    border
                    :header-cell-style="tableCellStyle"
                    :span-method="detailSpanMethod"
                    :cell-style="billDetaCellStyle"
                  >
                    <el-table-column align="center" label="#" min-width="5%">
                      <template slot-scope="scope">
                        <div>{{scope.row.index}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="detail" label="内訳" min-width="8%"></el-table-column>
                    <el-table-column align="center" prop="dmy" label="疑似" min-width="8%"></el-table-column>
                    <el-table-column align="center" min-width="3%">
                      <template slot-scope="scope">
                        <div>{{scope.row.dmyIntegIndicate}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="内訳名" min-width="3%">
                      <template slot-scope="scope">
                        <div>{{scope.row.premialableSrvsIndicate}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" min-width="10%">
                      <template slot-scope="scope">
                        <div>{{scope.row.detailName}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="itemCode" label="科目コード" min-width="10%"></el-table-column>
                    <el-table-column align="center" prop="dailyRate" label="日割" min-width="10%"></el-table-column>
                    <el-table-column align="right" label="金額" min-width="12%">
                      <template slot-scope="scope">{{amountFormat(scope.row.detailChrg)}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="consmEql" label="消費税相当" min-width="11%"></el-table-column>
                    <el-table-column align="center" prop="taxTyp" label="税区" min-width="10%"></el-table-column>
                    <el-table-column align="center" prop="usePeriod" label="利用期間" min-width="10%"></el-table-column>
                  </el-table>
                </div>
                <div class="no-data-box" v-if="!accelBillingDetailByLineShow"></div>
              </el-collapse-item>
            </el-collapse>
            <div v-else class="dataNoneStyle">該当する情報はありません。</div>
          </el-row>
          <el-row
            class="tab-info"
            v-if="tabPosition==='請求情報' && accelTableData.length <= 0"
          >該当する情報はありません。</el-row>
          <el-row class="tab-info" v-if="tabPosition==='収納情報' && storageData.length > 0">
            <div class="top-margin" />
            <el-collapse v-model="activeNames">
              <el-collapse-item title="収納状況一覧" name="収納状況一覧">
                <div v-if="accelSoBillingByIdsShow">
                  <el-row class="class-title">ビリングID（ACCEL）一覧</el-row>
                  <div class="bottom-padding">
                    <el-table
                      ref="storageTable"
                      stripe
                      :data="storageData"
                      border
                      class="storage-status"
                      :header-cell-style="tableCellStyle"
                    >
                    <el-table-column alige="center" label="ビリングID" min-width="15%">
                      <template slot-scope="scope">
                        <span
                          @click="billingIdClick(scope.row)"
                          class="billing-link"
                        >{{scope.row.billInfo[0].billingId}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column alige="center" label="請求種別" min-width="10%">
                      <template slot-scope="scope">
                        <span>{{billClassName(scope.row.billInfo[0].billClass)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column alige="center" label="ﾜﾝﾋﾞﾘﾝｸﾞ" min-width="15%">
                      <template slot-scope="scope">
                        <span>{{wabillingFlg(scope.row)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column alige="center" label="請求群" min-width="11%">{{reqAttr}}</el-table-column>
                    <el-table-column alige="center" label="譲渡請求拒否" min-width="11%">
                      <template
                        slot-scope="scope"
                      >{{scope.row.billInfo[0].transferBillRefusalDistName}}</template>
                    </el-table-column>
                    <el-table-column alige="center" label="譲渡請求対象外" min-width="11%">
                      <template
                        slot-scope="scope"
                      >{{scope.row.billInfo[0].transferBillObjectOffDistName}}</template>
                    </el-table-column>
                    <el-table-column alige="center" label="強制独自発行" min-width="11%">
                      <template
                        slot-scope="scope"
                      >{{scope.row.billInfo[0].cnplsionOriginPblshDistName}}</template>
                    </el-table-column>
                    <el-table-column alige="center" label="定期分割" min-width="11%">{{attr}}</el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="no-data-box" v-if="!accelSoBillingByIdsShow"></div>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-row
            class="tab-info"
            v-if="tabPosition==='収納情報' && storageData.length <= 0"
          >該当する情報はありません。</el-row>
        </div>
      </span>
      <div v-else class="contract-none-display">該当する契約はありません</div>
    </div>
    <div class="maincard-border" v-else>
      <div class="warn-data">
        <div class="warn-data-box">
          <svg-icon class="warn-iconm" icon-class="warning icon"></svg-icon>
          <span class="warn-word">{{errorMsg}}</span>
          <span class="warn-word">{{'エラーコード：' + errorCode}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mcd0102Methods from './mcd0102-methods'
import Mcd0102Model from './mcd0102-model'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
import '@/assets/css/kyoutuuCSS.css'
export default {
  name: 'MCD0102',
  extends: MainCardBase,
  mixins: [mcd0102Methods, GlobalMixins],
  data() {
    return {
      mcd0102Model: {},
      accelReceiptStatusResNone: false,
      breakdownIndex: [],
      isShow: true,
      payment: '支払区分 ',
      isBundle: false,
      showSummaryDetailInfo: false,
      showClick: false,
      errorMsg: '',
      errorCode: '',
      summaryListInfo: [],
      summaryDetailInfo: [],
      summaryCategoryInfo: [],
      summaryHistoryInfo: [],
      // 科目照会の請求プラン情報
      invoicePlanInfo: [],
      // 科目照会の請求情報
      invoiceInfo: [],
      multipleSituationInfo: [],
      // 収納状況
      storageSituationInfo: [],
      address: [],
      tabPosition: '契約情報',
      tableData: [],
      storageData: [],
      detailsData: [],
      historyData: [],
      multipleRadio: 0,
      storageRadio: 0,
      userInfo: {},
      // 請求期別
      requestDateList: [],
      label: '',
      guiBillGrp: {},
      radio: 0,
      srchDate: '',
      ekimuListSrchRes: {},
      accelTableData: [],
      reqAttr: '',
      attr: '',
      flag: true,
      pageWidth: document.body.clientWidth,
      widthRes: false,
      activeNames: '',
      billDisabled: true,
      receiptDisabled: true,
      isSummaryShow: false,
      contractNoneFlg: false,
      accelBillingInfo: false,
      strHyjBilId: '',
      strSkyYm: '',
      billingListShow: true,
      billingDetailShow: true,
      billingCategoryShow: true,
      orderHistoryShow: true,
      accelSoBillingByIdsShow: true,
      accelBillingDetailByLineShow: true
    }
  },
  created() {
    this.mcd0102Model = new Mcd0102Model()
    // this.initView()
  },
  computed: {
    detailsIndexData() {
      let that = this
      let times = 0
      for (let i = 0; i < that.detailsData.length; i++) {
        let item = that.detailsData[i]
        if (
          item.strUwkSyb === '' &&
          item.strUwkMei === '' &&
          item.strHwrKbn === '' &&
          item.strUwkSyb === '' &&
          item.strZeiKbn === ''
        ) {
        } else {
          times = times + 1
          that.detailsData[i]['index'] = times
        }
      }
      return that.detailsData
    },
    historyIndexData() {
      let that = this
      let times = 0
      for (let i = 0; i < that.historyData.length; i++) {
        let item = that.historyData[i]
        if (
          item.strBktNum === '' &&
          item.strHyjBilId === '' &&
          item.strTnyCen === '' &&
          item.strTnySyaMei === '' &&
          item.strTnySyb === '' &&
          item.strTnyYmd === '' &&
          item.strKijRan === ''
        ) {
        } else {
          times = times + 1
          that.historyData[i]['index'] = times
        }
      }
      return that.historyData
    },
    billDetailIndexData() {
      let that = this
      let billDetailData =
        that.mcd0102Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes
          .billDetail[0].detailInfo
      let times = 0
      for (let i = 0; i < billDetailData.length; i++) {
        let item = billDetailData[i]
        if (
          item.detail === '' &&
          item.dmy === '' &&
          item.usePeriod === '' &&
          item.itemCode === '' &&
          item.dailyRate === '' &&
          item.detailChrg === '' &&
          item.consmEql === '' &&
          item.taxTyp === ''
        ) {
          billDetailData[i]['index'] = item.detailName
        } else {
          times = times + 1
          billDetailData[i]['index'] = times
        }
      }
      return billDetailData
    }
  },
  watch: {
    maincardName: {
      handler(newVal, oldVal) {
        let data = JSON.parse(JSON.stringify(this.$data))
        let reg = /^[N]([0-9]{10})$/
        if (reg.test(oldVal)) {
          let mainCardList = this.$store.getters.mainCardList.slice(0)
          let cardIndex = mainCardList.findIndex(item => {
            return item.name === oldVal
          })
          if (cardIndex !== -1) {
            this.$set(mainCardList[cardIndex], 'viewData', data)
            this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
          }
        } else {
          let mainCardList = this.$store.getters.mainCardList.slice(0)
          let cardIndex = mainCardList.findIndex(item => {
            return item.name === oldVal
          })
          if (cardIndex !== -1) {
            this.$set(mainCardList[cardIndex], 'viewData', data)
            this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
          }
        }
        Object.assign(this.$data, this.$options.data())
        this.initView()
      },
      deep: true,
      immediate: true
    },
    pageWidth: {
      handler(value) {
        this.pageWidth = value
        if (value > 1024) {
          this.widthRes = false
        } else {
          this.widthRes = true
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.amount-right {
  text-align: right;
  display: block;
}
.warn-text {
  color: #fd596d;
  padding-bottom: 5px;
}
.info-list {
  margin-top: 0px;
}
.class-title-margin {
  margin-bottom: 9px;
}
.request-date-text {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  margin-bottom: 10px;
}
.detail-table-header {
  margin-bottom: 10px;
  border-left: 1px solid #c1c1c1;
}
.index-width {
  width: 5%;
}
.detail-width {
  width: 10%;
}
.detail-name-width {
  width: 35%;
  padding-left: 10px;
}
.detail-name-left {
  text-align: left !important;
}
.daily-rate-width {
  width: 20%;
}
.chrg-width {
  width: 20%;
  padding-right: 10px;
}
.chrg-right {
  text-align: right !important;
}
.tax-typ-width {
  width: 10%;
}
.str-osr-mgn-left-width {
  width: calc(15% + 1px);
  background: #f8f8f8;
}
.str-osr-mgn-width {
  width: calc(85% + 3px);
  text-align: left !important;
  padding-left: 10px;
  padding-right: 10px;
  background: #f8f8f8;
}
.intitle {
  display: flex;
  width: 100%;
  background: #dcdcdc;
  height: 38px;
}
.intitle div {
  text-align: center;
  line-height: 38px;
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
  border-top: 1px solid #c1c1c1;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
}
.incontain {
  display: flex;
  width: 100%;
  background: #fff;
}
.incontain div {
  text-align: center;
  line-height: 38px;
  border-bottom: 1px solid #c1c1c1;
  border-right: 1px solid #c1c1c1;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
}
.div-center {
  text-align: center;
  padding: 20px;
  font-size: 14px;
  letter-spacing: -1px;
}
.nb-btn {
  text-align: center;
  padding-bottom: 20px;
}
.nb-btn .el-button {
  background: #00438b;
  color: #fff;
  width: 280px;
}
.nb-btn .el-button:hover {
  opacity: 0.8;
}
.key-left {
  padding-left: 20px;
}
.margin-bottom-lows {
  margin-top: 0px;
}
.in-spestyle {
  padding-left: 20px;
  padding-right: 20px;
}
.class-titles {
  margin-bottom: 9px;
}
.req-news {
  padding-left: 20px;
  margin-bottom: 10px;
}
.flag-newss {
  padding-left: 20px;
}
.mcd0102 .keiyaku-nav {
  width: 100%;
  height: 32px;
  background: #00438b;
  border-radius: 0px 4px 0px 0px;
  display: flex;
  align-items: center;
}
.mcd0102 .keiyaku-back {
  float: left;
  width: 16%;
  cursor: pointer;
  margin-right: 31%;
}
.mcd0102 .back-icon {
  margin-left: 20px;
  color: #fff;
  font-size: 12px;
  vertical-align: middle;
}
.warn-data {
  display: flex;
  width: 100%;
  height: 268px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-data-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-iconm {
  width: 36px !important;
  height: 32px !important;
  margin-bottom: 18px;
}
.warn-word {
  width: 100%;
  text-align: center;
  color: #fd596d;
  font-family: Meiryo;
  font-size: 16px;
  line-height: 22px;
}
.svg-title {
  padding-left: 20px;
  font-size: 14px;
  color: #00438b;
  font-family: 'Meiryo UI';
  font-weight: bold;
}
.svg-titles {
  padding-left: 0px;
}
.svg-row {
  padding-top: 12px;
  padding-bottom: 12px;
  cursor: pointer;
  padding-right: 20px;
}
.svg-styleup {
  width: 12px;
  float: right;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
}
.box-card {
  width: 935px;
  shadow: never;
  border: 1px solid black;
  border-radius: 10px;
}
.axel-line {
  font-size: 12px;
  color: #00438b;
  cursor: pointer;
}
.axel-line:hover {
  text-decoration: underline;
}
.span-line {
  margin-left: 10px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.span-line:hover {
  text-decoration: underline;
}
.keiyaku-msg-head {
  margin-top: 23px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.item-contents-width {
  background: #eee;
}
.item-contents {
  color: #4a4a4a;
}
.highLightArrow {
  width: 0px;
  border-top: 11px solid transparent;
  border-right: 11px solid #fd596d;
  border-bottom: 10px solid transparent;
  display: inline-block;
}
.bill-tab {
  padding-left: 20px;
  padding-right: 20px;
}
.main-card-type {
  font-size: 14px;
  color: #ffffff;
  font-weight: 700;
}
.keiyaku-header {
  padding-left: 20px;
  margin-bottom: 20px;
}
.width-margin {
  width: 100%;
  margin-right: 20px;
}
.tab-info {
  padding: 20px;
  padding-bottom: 0px;
}
.bottom-padding {
  padding-bottom: 10px;
}
.contract-none-display {
  height: 268px;
  line-height: 268px;
  text-align: center;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
}
.no-data-box{
  height: 100px;
}
</style>
<style>
.mcd0102 .el-collapse-item__arrow:hover {
  background-color: #ededed;
  border-radius: 7px;
}
.mcd0102 .invoice-plan-table {
  margin-bottom: 10px;
}
.el-radio__label {
  padding-left: 0px;
}
.mcd0102 .box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcd0102 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #00438b;
  border: 0px;
  color: #ffffff;
}
.mcd0102 .el-radio-button__inner {
  color: #0058b6;
  font-family: 'Meiryo UI';
  font-size: 14px;
  padding: 11px 72px;
  border: 0px;
}
.mcd0102 .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px 0px 0px 4px;
}
.mcd0102 .el-radio-button.is-active .el-radio-button__inner {
  font-weight: bold;
}
.mcd0102 .el-radio-button.is-active {
  border-color: #7cadde;
}
.mcd0102 .el-radio-button {
  border: 1px solid #c9ced7;
}
.mcd0102 .tab-radio-group {
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
}
.mcd0102 .tab-radio-group :last-child.el-radio-button .el-radio-button__inner {
  border-radius: inherit;
}
.mcd0102 .tab-radio-group .bill-radio-button {
  width: 200px;
  border-radius: 4px 0px 0px 4px;
}
.mcd0102 .tab-radio-group .receipt-radio-button {
  width: 200px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.mcd0102 .tableRow .el-radio__inner:hover {
  border: 5px solid #00438b;
}
.tableRow .el-radio__inner {
  border: 1px solid #9b9b9b;
}
.mcd0102 .ocn-list {
  width: 100%;
  min-width: 590px;
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
}
.mcd0102 .receipt-status-list {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
}
.mcd0102 .naiwake-table {
  border: 1px solid #c1c1c1;
  border-top: 0px;
  margin-bottom: 20px;
}
.mcd0102 .naiwake-table tr th:nth-child(4),
.mcd0102 .naiwake-table tr th:nth-child(5) {
  border-right: none !important;
}
.mcd0102 .el-table td,
.mcd0102.el-table th {
  padding: 8px 0;
}
.mcd0102 .el-table th .color-red {
  color: red;
}
.mcd0102 .el-table .cell,
.mcd0102 .el-table th div,
.mcd0102 .el-table--border td:first-child .cell,
.mcd0102 .el-table--border th:first-child .cell {
  padding-left: 0px;
}
.mcd0102 .el-table .cell {
  padding: 0px;
}
.mcd0102 .el-table th div {
  text-align: center;
}
.mcd0102 .el-table--border td,
.mcd0102 .el-table--border th,
.mcd0102
  .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border-right-color: #c1c1c1;
}
.mcd0102 .el-table td,
.mcd0102 .el-table th.is-leaf {
  border-bottom-color: #c1c1c1;
}
.mcd0102 .el-table--border,
.mcd0102 .el-table--group {
  border-color: #c1c1c1;
}
.mcd0102 .bill-info-table {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-bottom: 10px;
}
.mcd0102 .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f8f8f8;
}
.mcd0102 .el-radio__input.is-checked .el-radio__inner {
  border-color: #00438b;
  background: #00438b;
}
.mcd0102 .el-collapse-item__header {
  font-weight: bold;
  color: #00438b;
  font-weight: bold;
  border-bottom: 1px dashed #ebeef5;
}
.mcd0102 .el-collapse-item__content {
  padding-bottom: 20px;
}
.mcd0102 .el-collapse-item__arrow {
  color: #00438b;
  font-size: 17px;
  transform: rotate(90deg);
}
.mcd0102 .el-collapse-item__arrow.is-active {
  transform: rotate(-90deg);
}
.mcd0102 .el-collapse-item__header.is-active {
  border-bottom-color: transparent;
}
.mcd0102 .el-collapse {
  border-top: 1px dashed #ebeef5;
  border-bottom: 1px dashed #ebeef5;
}
.mcd0102 .el-collapse-item__wrap {
  border-bottom: 1px dashed #ebeef5;
}
.mcd0102 .storage-status tr td {
  text-align: center;
}
.mcd0102 .el-collapse .el-collapse-item:last-child .el-collapse-item__header,
.mcd0102 .el-collapse .el-collapse-item:last-child .el-collapse-item__wrap {
  border-bottom: none;
}
.mcd0102 .tab-radio-group .is-disabled {
  border-color: #dcdfe6;
}
</style>
