<template>
  <div ref="mcd0200" class="mcd0200">
    <div class="keiyaku-nav">
      <div class="keiyaku-back"></div>
      <span class="main-card-type">ビリング詳細</span>
    </div>
    <div v-if="!hasError">
      <span v-if="!contractNoneFlg">
        <el-row class="keiyaku-header">
          <el-row v-if="isSummaryShow" class="keiyaku-msg-head">
            <div class="item-width">
              <span class="item-title">ビリングID(ACCEL)</span>
              <span class="item-contents item-contents-width">{{ifNoData(maincardName)}}</span>
            </div>
            <div class="item-width half-width" v-if="isBillClass()">
              <span class="item-title">アクセスキー</span>
              <span
                class="item-contents item-contents-width"
              >{{isAccessKey(recptStatusSrchAccRes.accessKey)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先氏名＜漢字＞</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(recptStatusSrchAccRes.sendtoNameKanji)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先氏名＜カナ＞</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(recptStatusSrchAccRes.sendtoNameKana)}}</span>
            </div>
            <div class="margin-bottom-high all-width item-width-padding">
              <span class="item-title">送付先住所</span>
              <span
                class="item-contents full-style"
              >{{destinationAddress(recptStatusSrchAccRes.sendtoAddr, recptStatusSrchAccRes.houseNo)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">請求群</span>
              <span
                class="item-contents item-contents-width"
              >{{requestGroup(recptStatusSrchAccRes.billGrp)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">請求種別</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(recptStatusSrchAccRes.billClassName)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">滞納簿有無</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(recptStatusSrchAccRes.arrearBookFlg)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">滞納簿登記年月日</span>
              <span
                class="item-contents item-contents-width"
              >{{YMDFormat(recptStatusSrchAccRes.arrearBookRegistDate)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">利用権預り金</span>
              <span
                class="item-contents full-style acount"
              >{{amountFormat(recptStatusSrchAccRes.useRightDeposit)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">減算不能借受金額</span>
              <span
                class="item-contents full-style acount"
              >{{amountFormat(recptStatusSrchAccRes.subtractImpossTemprecvChrg)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">前払金額</span>
              <span
                class="item-contents full-style acount"
              >{{amountFormat(recptStatusSrchAccRes.prepaymChrg)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">未納額合計</span>
              <span
                class="item-contents full-style acount"
              >{{amountFormat(recptStatusSrchAccRes.noStoreChrgTotalChrg)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">未納件数</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(recptStatusSrchAccRes.noStoreChrgTotalRecNum)}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title half-width">不達登録期別-回数</span>
              <span
                class="item-contents full-style"
              >{{YMXFormat(recptStatusSrchAccRes.noReachRegistChrgMonth, recptStatusSrchAccRes.noReachRegistCnt)}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">支払期限変更日数</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(recptStatusSrchAccRes.payTermChgDateNum)}}</span>
            </div>
          </el-row>
          <el-row v-else class="authority">該当情報を参照する権限がありません</el-row>
        </el-row>
        <el-radio-group v-model="tabPosition" class="tab-radio-group">
          <el-radio-button :disabled="billDisabled" class="bill-radio-button" label="請求情報">請求情報</el-radio-button>
          <el-radio-button :disabled="btnlabDisabled" class="btnlab" label="収納状况">収納状况</el-radio-button>
          <el-radio-button
            :disabled="relateDisabled"
            class="relate-radio-button"
            label="関連契約一覧"
          >関連契約一覧</el-radio-button>
        </el-radio-group>
        <div class="bill-tab" v-show="tabPosition==='請求情報' && isTableShow()">
          <el-table
            ref="multipleTable"
            stripe
            :data="multipleTable"
            border
            class="recpt-status-table"
            :header-cell-style="tableCellStyle"
            :cell-style="changeCellStyle"
          >
            <el-table-column align="center" label="表示" min-width="5%">
              <template slot-scope="scope">
                <el-radio
                  class="radio"
                  v-model="radio"
                  :label="scope.$index"
                  @change="onRadioClick(scope.$index)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" type="index" min-width="5%"></el-table-column>
            <el-table-column align="center" label="請求期別" min-width="13%">
              <template slot-scope="scope">
                <span>{{YMFormat(scope.row.chrgMonth)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="回数" min-width="7%">
              <template slot-scope="scope">
                <span>{{XXFormat(scope.row.billCnt)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="billClassNameDetail" label="請求種別" min-width="13%"></el-table-column>
            <el-table-column align="center" label="請求群" min-width="9%">
              <template slot-scope="scope">
                <span>{{requestGroup(scope.row.billGrpDetail)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="srvcStop" label="利停" min-width="8%"></el-table-column>
            <el-table-column align="center" label="支払期限" min-width="15%">
              <template slot-scope="scope">
                <span>{{YMDFormat(scope.row.payTerm)}}</span>
              </template>
            </el-table-column>
            <el-table-column class="tableAcount" align="right" label="金額" min-width="25%">
              <template slot-scope="scope">
                <span>{{amountFormat(scope.row.chrg)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-row v-if="tabPosition==='請求情報'" class="tab-info">
          <el-collapse v-if="showRequestData" v-model="requestItem">
            <el-collapse-item title="請求情報" name="請求情報">
              <div v-if="showBillingInfo" class="item-box">
                <div class="item-width half-width">
                  <span class="item-title">当月請求金額</span>
                  <span
                    class="item-contents full-style acount"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{amountFormat(item.thisMonthBillAmount)}}</span>
                </div>
                <br />
                <div class="item-width">
                  <span class="item-title">請求群</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{requestGroup(item.billGrp)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求種別</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.billClassName)}}</span>
                </div>
                <br />
                <div class="item-width">
                  <span class="item-title">ワンビリング識別</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{recognition(item.oneBillingDistName, item.oneBillingParentChildDistName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ワンビリング適用群</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{XGroup(item.oneBillingApplyGrp)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">利用期間(自～至)</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{YYMMFormat(item.usePeriodStrt) + '~' + YYMMFormat(item.usePeriodEnd)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求書発行日</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{YMDFormat(item.billPblshDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">発行周期</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.pblshCycle)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">請求書再発行日-回数</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{YMXFormat(item.billRepblshDate,item.repblshCnt )}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">少額請求</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.smallchrgBill)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約区分</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.contractTyp)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">回送条件</span>
                  <span
                    class="item-contents full-style"
                    v-for="(items, index) in billingInfo"
                    :key="index"
                  >{{fwConditionFormat(items.fwConditionG)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払方法</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.payWay)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払期限日</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{payTermDate(item.payTermDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">預り金有無</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.depositFlg)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">加減算有無</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.chrgCorrectFlg)}}</span>
                </div>
                <div class="item-width" v-if="isPointFlg()">
                  <span class="item-title">ポイントID</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.pointId)}}</span>
                </div>
                <div class="item-width" v-if="isPointFlg()">
                  <span class="item-title">累積ポイント</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.accmPoint)}}</span>
                </div>
                <div class="item-width" v-if="isPointFlg()">
                  <span class="item-title">累積年月日</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{YMDFormat(item.accmDate)}}</span>
                </div>
                <div class="item-width" v-if="isDisappear()">
                  <span class="item-title">消滅予定ポイント</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.delSchedulePoint)}}</span>
                </div>
                <div class="item-width" v-if="isDisappear()">
                  <span class="item-title">消滅予定年月日</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{YMDFormat(item.delScheduleDate)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">利用権可能金額</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{amountFormat(item.useRightPossibleChrg)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">パック商品プラン</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.packPrdctPlanName)}}</span>
                </div>
              </div>
              <div v-else>該当する情報はありません。</div>
            </el-collapse-item>
            <el-collapse-item title="詳細" name="詳細">
              <div v-if="showDetailsInfo" class="item-box">
                <div class="item-width">
                  <span class="item-title">支払者ID</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.payerId)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">支払者名</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.payerName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">現住所郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{isNumFormat(item.nowAddrZip)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">現住所住所</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{destinationAddress(item.nowAddrAddr, item.nowAddrHouseNo)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">現住所氏名</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.nowAddrName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">現住所方書</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.nowAddrAddrfor)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">旧住所郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{isNumFormat(item.oldAddrZip)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">旧住所住所</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{destinationAddress(item.oldAddrAddr, item.oldAddrHouseNo)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">旧住所氏名</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.oldAddrName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">旧住所方書</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.oldAddrAddrfor)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.contact)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">連絡先記事</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.contactNews)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">メールアドレス</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.eml)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">関連電番</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{telNoFormat(item.relateTelNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求種別</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.billClassName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ワンビリング識別</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{recognition(item.oneBillingDistName, item.oneBillingParentChildDistName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払方法</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in billingInfo"
                    :key="index"
                  >{{ifNoData(item.payWay)}}</span>
                </div>
                <div class="item-width" v-if="isBillsendCodeFlg()">
                  <span class="item-title">請求書/事前案内書要否</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.billsend)}}</span>
                </div>
                <div class="item-width" v-if="isEmlsendCodeFlg()">
                  <span class="item-title">メール通知要否</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.emlsend)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">口座番号等表示有無</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.bnkacntNoEtcIndicateFlgName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">金融機関コード</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.financeCode)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">金融機関名</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.financeName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">口座番号</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.bnkacntNo)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">口座名義</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.bnkacntContractName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">カード番号</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.cardNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">カード会社コード</span>
                  <span
                    class="item-contents item-contents-width"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.cardCorpCode)}}</span>
                </div>
                <div class="margin-bottom-high all-width item-width-padding">
                  <span class="item-title">特記事項</span>
                  <span
                    class="item-contents full-style"
                    v-for="(item, index) in detailsInfo"
                    :key="index"
                  >{{ifNoData(item.spReport)}}</span>
                </div>
              </div>
              <div v-else>該当する情報はありません。</div>
            </el-collapse-item>
            <el-collapse-item title="内訳" name="内訳">
              <div v-if="showBreakDownInfo" class="detail-table-header">
                <div class="intitle">
                  <div class="index-width index-border">#</div>
                  <div class="detail-width">内訳</div>
                  <div class="dmy-width">疑似</div>
                  <div class="detail-name-width">内訳名</div>
                  <div class="item-width">科目</div>
                  <div class="daily-rate-width">日割</div>
                  <div class="chrg-width">内訳額</div>
                  <div class="consm-eql-width">消費税相当</div>
                  <div class="tax-typ-width">税区</div>
                  <div class="delay-month-width">延滞月</div>
                </div>
                <div class="detail-table-body">
                  <div v-for="(items, index) in breakDownInfoList" :key="index">
                    <div v-for="(item, index) in items.detailInfo" :key="index">
                      <div class="contain" v-if="!isDetailNameShow(item)">
                        <div class="index-width">{{item.index}}</div>
                        <div class="detail-width">{{ifNoData(item.detail)}}</div>
                        <div class="dmy-width">{{ifNoData(item.dmy)}}</div>
                        <div
                          class="detail-name-head-width"
                        >{{ifNoData(item.premialableSrvsIndicate)}}</div>
                        <div class="detail-name-body-width">{{ifNoData(item.detailName)}}</div>
                        <div class="item-width">{{ifNoData(item.itemCode)}}</div>
                        <div class="daily-rate-width">{{ifNoData(item.dailyRate)}}</div>
                        <div class="chrg-width">{{ifNoData(item.detailChrg)}}</div>
                        <div class="consm-eql-width">{{ifNoData(item.consmEql)}}</div>
                        <div class="tax-typ-width">{{ifNoData(item.taxTyp)}}</div>
                        <div
                          class="delay-month-width"
                        >{{delayMonth(item.delayPluralMonthIndicate) + item.delayObjectMonth}}</div>
                      </div>
                      <div
                        v-if="isDetailNameShow(item)"
                        class="detail-num-rec-num inmain-title"
                      >{{ifNoData(item.detailName)}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>該当する情報はありません。</div>
            </el-collapse-item>
          </el-collapse>
          <div v-else>該当する情報はありません。</div>
        </el-row>
        <el-row v-show="tabPosition==='収納状况'" class="tab-info">
          <el-collapse v-model="ownItem">
            <el-collapse-item title="収納状況" name="収納状況">
              <span>収納情報一覧</span>
              <el-table
                ref="storageTable"
                stripe
                :data="storageTable"
                border
                class="storage-table"
                :header-cell-style="tableCellStyle"
                :cell-style="changeCellStyle"
              >
                <el-table-column align="center" type="index" min-width="5%"></el-table-column>
                <el-table-column align="center" label="請求期別" min-width="10%">
                  <template slot-scope="scope">
                    <span>{{YMFormat(scope.row.chrgMonth)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="回数" min-width="5%">
                  <template slot-scope="scope">
                    <span>{{XXFormat(scope.row.billCnt)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="billClassDetail" label="請求種別" min-width="10%"></el-table-column>
                <el-table-column align="center" label="請求群" min-width="5%">
                  <template slot-scope="scope">
                    <span>{{requestGroup(scope.row.billGrpDetail)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="期別止" min-width="5%">
                  <template slot-scope="scope">
                    <span>{{isStpIndicate(scope.row.chrgMonthStpIndicate)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="examFlg" label="審査" min-width="5%"></el-table-column>
                <el-table-column align="center" prop="bunchNo" label="束番号" min-width="5%"></el-table-column>
                <el-table-column align="center" prop="srvcStop" label="利停" min-width="5%"></el-table-column>
                <el-table-column align="center" label="支払期限" min-width="10%">
                  <template slot-scope="scope">
                    <span>{{YMDFormat(scope.row.payTerm)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="right" label="金額" min-width="15%">
                  <template slot-scope="scope">
                    <span>{{amountFormat(scope.row.chrg)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recptFacility" label="収納機関" min-width="10%"></el-table-column>
                <el-table-column align="center" prop="crossStatus" label="消込状況" min-width="10%"></el-table-column>
                <el-table-column align="center" label="収納月日" min-width="10%">
                  <template slot-scope="scope">
                    <span>{{MDFormat(scope.row.recptMonthDate)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="消込月日" min-width="10%">
                  <template slot-scope="scope">
                    <span>{{MDFormat(scope.row.crossMonthDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-row>
        <el-row v-show="tabPosition==='関連契約一覧'" class="tab-info">
          <div v-if="showRelatedContractsData">
            <div>
              <p class="reqdatetxt">請求期別</p>
              <el-select
                size="small"
                v-model="selectedData"
                placeholder="選択してください"
                @change="selectDate($event)"
                ref="selectDate"
                @visible-change="inputBlur($event,'selectDate')"
              >
                <el-option
                  v-for="(item, index) in requestDateList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
            <div class="kennsu-title">
              <span class="count-display">{{pageCntArea}}</span>
              <span class="kennsu-space">
                <el-pagination
                  :current-page="currPage"
                  layout="prev, pager, next"
                  :total="dataList.length"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :page-size="pageSize"
                ></el-pagination>
              </span>
              <div>
                <el-select
                  ref="selectPageSize"
                  v-model="value"
                  @change="handleSizeChange(value)"
                  placeholder="0"
                  size="mini"
                  class="first-select"
                  @visible-change="inputBlur($event,'selectPageSize')"
                >
                  <el-option
                    v-for="item in optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="kennsu-hyouji">件表示</span>
                <el-button type="text" class="siborikomi-Btn" @click="mainCardManage">絞り込み</el-button>
              </div>
            </div>
            <el-row v-for="(item, i) in dataListPerPage()" :key="i" class="spe-font">
              <el-col
                class="srvc-kind-name"
                v-if="isShowEkimuName(item, i)"
              >{{item.titleName}} {{continueText(item, i)}}</el-col>
              <el-row class="text-height">
                <span class="span-line text-content" @click="toMainCard(item.payNo)">{{item.payNo}}</span>
              </el-row>
            </el-row>
            <span class="kennsuFooter">
              <el-pagination
                :current-page="currPage"
                layout="prev, pager, next"
                :total="dataList.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-size="pageSize"
              ></el-pagination>
            </span>
          </div>
          <div v-else>該当する情報はありません。</div>
        </el-row>
      </span>
      <div v-else class="contract-none-display">該当する契約はありません</div>
    </div>
    <div class="maincard-border" v-else>
      <div class="warn-data">
        <div class="warn-main-data">
          <svg-icon class="warn-iconm" icon-class="warning icon"></svg-icon>
          <span class="warn-word">{{errorMsg}}</span>
          <span class="warn-word">{{'エラーコード：' + errorCode}}</span>
        </div>
      </div>
    </div>
    <MW05 :visible.sync="mw05Visible" :filterdata="cardId" @filter="handleFilter($event)"></MW05>
  </div>
</template>
<script>
import mcd0200Methods from './mcd0200-methods'
import Mcd0200Model from './mcd0200-model'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
import MW05 from '@/views/popups/MW05/MW05'
import * as CARD_ID from '@/constants/card-id-constants'
import '@/assets/css/kyoutuuCSS.css'
export default {
  name: 'MCD0200',
  extends: MainCardBase,
  mixins: [mcd0200Methods, GlobalMixins],
  components: {
    MW05
  },
  data() {
    return {
      showRequestData: true,
      showBillingInfo: false,
      showDetailsInfo: false,
      showBreakDownInfo: false,
      showRelatedContractsData: true,
      flag: true,
      errorMsg: '',
      errorCode: '',
      mw05Visible: false,
      guiBillGrp: [],
      recptStatusSrchAccRes: {},
      // 請求情報
      billingInfo: [],
      // 詳細
      detailsInfo: [],
      // 内訳
      breakDownInfo: [],
      // 収納状况のtable
      storageTable: [],
      multipleTable: [],
      selectedData: '',
      requestDateList: [],
      pdDetailClassCodeList: [],
      payNoList: [],
      mcd0200Model: {},
      tabPosition: '請求情報',
      contractItem: '申込情報',
      requestItem: '',
      ownItem: '',
      tableData: [],
      radio: 0,
      historyData: [],
      storageData: [],
      dataListCopy: [],
      cardId: CARD_ID.MCD0200D,
      tabFlag: false,
      billDisabled: true,
      btnlabDisabled: true,
      relateDisabled: true,
      isSummaryShow: false,
      contractNoneFlg: false
    }
  },
  created() {
    this.mcd0200Model = new Mcd0200Model()
    // this.initView()
  },
  computed: {
    breakDownInfoList() {
      let times = 0
      for (let i = 0; i < this.breakDownInfo.length; i++) {
        let items = this.breakDownInfo[i]
        for (let j = 0; j < items.detailInfo.length; j++) {
          let item = items.detailInfo[j]
          if (
            item.consmEql === '' &&
            item.dailyRate === '' &&
            item.delayObjectMonth === '' &&
            item.delayPluralMonthIndicate === '' &&
            item.detail === '' &&
            item.detailChrg === '' &&
            item.dmy === '' &&
            item.itemCode === '' &&
            item.premialableSrvsIndicate === '' &&
            item.taxTyp === ''
          ) {
          } else {
            times = times + 1
            items.detailInfo[j]['index'] = times
          }
        }
      }
      return this.breakDownInfo
    }
  },
  watch: {
    maincardName: {
      handler(newVal, oldVal) {
        let data = JSON.parse(JSON.stringify(this.$data))
        let reg = /^[B]([0-9]{10})$/
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
    }
  }
}
</script>
<style scoped>
.mcd0200 .siborikomi-Btn:hover {
  background-color: #e5eef7;
}
.mcd0200 .keiyaku-nav {
  width: 100%;
  height: 32px;
  background: #00438b;
  border-radius: 0px 4px 0px 0px;
  display: flex;
  align-items: center;
}
.mcd0200 .keiyaku-back {
  float: left;
  width: 47%;
  cursor: pointer;
}
.mcd0200 .back-icon {
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
.warn-main-data {
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
.svgtitle {
  padding-left: 20px;
  font-size: 14px;
  color: #00438b;
  font-family: 'Meiryo UI';
  font-weight: bold;
}
.svgrow {
  padding-top: 12px;
  padding-bottom: 12px;
  cursor: pointer;
  padding-right: 20px;
}
.svgstyleup {
  width: 12px;
  float: right;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
}
.box-card {
  width: 935px;
  border: 1px solid black;
  border-radius: 10px;
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
.highLightBox {
  height: 22px;
  width: 133px;
  background: #fd596d;
  line-height: 22px;
  display: flex;
  align-items: center;
  border-radius: 0 3px 3px 0;
}
.highLightCir {
  display: inline-block;
  line-height: 22px;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  background: #ffffff;
  margin-right: 11px;
  margin-left: 5px;
}
.highLightTex {
  left: 25px;
  color: #ffffff;
  font-family: 'Meiryo UI';
  font-size: 12px;
  line-height: 12px;
}
.acount {
  display: block;
  text-align: right;
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
.tab-info {
  padding: 20px;
  padding-bottom: 0px;
}
.item-width-padding {
  padding-right: 20px;
}
.detail-table-header {
  margin-bottom: 5px;
  min-width: 865px;
}
.detail-table-body {
  border-left: 1px solid #c1c1c1;
}
.detail-table-body div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.detail-num-rec-num {
  padding-left: 11px;
}
.index-width {
  width: 5%;
}
.index-border {
  border-left: 1px solid #c1c1c1;
}
.detail-width {
  width: 5%;
}
.dmy-width {
  width: 5%;
}
.detail-name-width {
  width: 15%;
}
.detail-name-head-width {
  width: 5%;
}
.detail-name-body-width {
  width: calc(10% - 1px);
}
.item-width {
  width: 5%;
}
.daily-rate-width {
  width: 10%;
}
.chrg-width {
  width: 15%;
}
.consm-eql-width {
  width: 15%;
}
.tax-typ-width {
  width: 5%;
}
.delay-plural-month-width {
  width: 10%;
}
.delay-month-width {
  width: 5%;
}
.siborikomi-Btn {
  border: 1px solid #00438b;
  border-radius: 3px;
  border-radius: 3px;
  width: 80px;
  height: 27px;
  padding: 0px;
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #00438b;
  letter-spacing: 0;
}
.el-radio-group label:nth-child(3) span {
  padding-left: 60px;
}
.reqdatetxt {
  height: 16px;
  width: 48px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  line-height: 16px;
  margin-top: 0;
  margin-bottom: 10px;
}
.kennsu-title {
  padding: 20px 0;
  display: flex;
  align-items: center;
  height: 18px;
  margin-bottom: 12px;
  justify-content: space-between;
}
.kennsu-space {
  text-align: center;
}
.count-display {
  width: 106px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 14px;
  letter-spacing: 0.27px;
}
.srvc-kind-row {
  font-weight: bold;
}
.srvc-kind-name {
  background: #edeeee;
  line-height: 26px;
  height: 26px;
  padding-left: 10px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
  margin-bottom: 5px;
}
.text-height {
  display: inline-block;
  line-height: 32px;
  font-weight: normal;
}
.pay-no-width {
  width: calc(100vw - 80px - 40px);
}
.text-content {
  color: #00438b;
  font-family: 'Meiryo UI';
  font-size: 16px;
  padding-left: 10px;
}
.kennsu-hyouji {
  font-family: 'Meiryo UI';
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0;
  line-height: 14px;
  padding-right: 47px;
}
.kennsuFooter .el-pagination {
  margin: 10px 133px 10px 0px;
}
.intitle {
  display: flex;
  width: 99%;
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
.inmain-title {
  width: calc(99% - 12px);
  height: 38px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #c1c1c1;
  border-right: 1px solid #c1c1c1;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  line-height: 38px;
}
.contain {
  display: flex;
  width: 99%;
  background: #fff;
  height: 38px;
}
.contain div {
  text-align: center;
  line-height: 38px;
  border-bottom: 1px solid #c1c1c1;
  border-right: 1px solid #c1c1c1;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
}
.authority {
  text-align: center;
  height: 56px;
  line-height: 76px;
}
.contract-none-display {
  height: 268px;
  line-height: 268px;
  text-align: center;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
}
</style>
<style>
.mcd0200 .el-collapse-item__arrow:hover {
  background-color: #ededed;
  border-radius: 7px;
}
.btnlab {
  width: 200px;
}
.btnlab .el-radio-button__inner:nth-child(1) {
  width: 200px;
}
.btnlab .el-radio-button__inner:nth-child(2) {
  width: 200px;
}
.box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcd0200 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #00438b;
  border: 0px;
  color: #ffffff;
}
.mcd0200 .el-radio-button__inner {
  color: #0058b6;
  font-family: 'Meiryo UI';
  font-size: 14px;
  padding: 11px 72px;
  border: 0px;
}
.mcd0200 .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px 0px 0px 4px;
}
.mcd0200 .el-radio-button.is-active .el-radio-button__inner {
  font-weight: bold;
}
.mcd0200 .el-radio-button.is-active {
  border-color: #7cadde;
}
.mcd0200 .el-radio-button {
  border: 1px solid #c9ced7;
}
.mcd0200 .tab-radio-group {
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
}
.mcd0200 .tab-radio-group :last-child.el-radio-button .el-radio-button__inner {
  border-radius: inherit;
}
.mcd0200 .tab-radio-group .bill-radio-button {
  width: 200px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.mcd0200 .tab-radio-group .relate-radio-button {
  width: 200px;
  overflow: hidden;
}
.mcd0200 .tab-radio-group .relate-radio-button .el-radio-button__inner {
  padding: 11px 59px;
}
.tableRow .el-radio__inner:hover {
  border: 5px solid #00438b;
}
.tableRow .el-radio__inner {
  border: 1px solid #9b9b9b;
}
.mcd0200 .recpt-status-table {
  width: 100%;
  min-width: 590px;
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
}
.mcd0200 .storage-table {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-bottom: 5px;
}
.mcd0200 .el-table td,
.el-table th {
  padding: 8px 0;
}
.mcd0200 .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
}
.mcd0200 .el-table .cell,
.el-table th div {
  padding-right: 0px;
}
.mcd0200 .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right-color: #c1c1c1;
}
.mcd0200 .el-table td,
.el-table th.is-leaf {
  border-bottom-color: #c1c1c1;
}
.mcd0200 .el-table--border,
.el-table--group {
  border-color: #c1c1c1;
}
.mcd0200 .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f8f8f8;
}
.mcd0200 .el-radio__input.is-checked .el-radio__inner {
  border-color: #00438b;
  background: #00438b;
}
.mcd0200 .el-radio__label {
  padding-left: 0px;
}
.mcd0200 .el-collapse-item__header {
  color: #00438b;
  font-weight: bold;
}
.mcd0200 .el-collapse-item__arrow {
  color: #00438b;
  font-size: 17px;
  transform: rotate(90deg);
}
.mcd0200 .el-collapse-item__arrow.is-active {
  transform: rotate(-90deg);
}
.item-box .item-width:first-child {
  margin-left: 0px;
}
.mcd0200 .el-pager {
  display: flex;
  align-items: center;
}
.mcd0200 .el-pager li.active {
}
.mcd0200 .el-pager li {
  font-family: 'Meiryo UI';
  margin: 0 10px;
  color: #00438b;
}
.mcd0200 .el-input--small .el-input__inner {
  height: 32px;
  line-height: 31px;
  border: 1px solid #979797;
  font-family: Meiryo;
  font-size: 14px;
  color: #4a4a4a;
}
.mcd0200 .is-focus .el-input__inner {
  border: 1px solid #00438b;
}
.mcd0200 .first-select {
  width: 60px;
}
.mcd0200 .el-select .el-input__inner:focus {
  border: 1px solid #00438b;
}
.mcd0200 .el-input__inner:disabled {
  background: #fafafa;
  border: 1px solid #c9ced7;
  color: #9b9b9b;
}
.mcd0200 .el-input.el-input--small.haserror .el-input__inner {
  border: 1px solid #fd596d;
  background-color: #ffe4e8;
}
.mcd0200 .has-gutter tr th .cell {
  text-align: center;
}
.mcd0200 .el-collapse-item__header {
  font-weight: bold;
  color: #00438b;
  font-weight: bold;
  border-bottom: 1px dashed #ebeef5;
}
.mcd0200 .el-collapse-item__arrow {
  color: #00438b;
  font-size: 17px;
}
.mcd0200 .el-collapse-item__header.is-active {
  border-bottom-color: transparent;
}
.mcd0200 .el-collapse {
  border-top: 1px dashed #ebeef5;
  border-bottom: 1px dashed #ebeef5;
}
.mcd0200 .el-collapse-item__wrap {
  border-bottom: 1px dashed #ebeef5;
}
.mcd0200 .first-select .el-input__inner {
  padding-left: 10px;
}
.mcd0200 .el-collapse .el-collapse-item:last-child .el-collapse-item__header,
.mcd0200 .el-collapse .el-collapse-item:last-child .el-collapse-item__wrap {
  border-bottom: none;
}
.mcd0200 .tab-radio-group .is-disabled {
  border-color: #dcdfe6;
}
</style>
