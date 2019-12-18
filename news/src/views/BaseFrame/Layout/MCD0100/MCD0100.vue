<template>
  <div ref="mcd0100" class="mcd0100">
    <div class="keiyaku-nav">
      <div class="keiyaku-back">
        <span @click="toKeiyakuList()" class="cursor">
          <svg-icon class="back-icon" icon-class="GobackButton"></svg-icon>
          <span class="span-line">契約一覧</span>
        </span>
      </div>
      <span class="main-card-type">{{maincardType}}</span>
    </div>
    <div v-if="dataDisplay">
      <div v-if="!contractNoneFlg">
        <!-- 契約詳細（電話）サマリ情報 -->
        <el-row class="keiyaku-header">
          <el-row v-if="isSummaryShow" class="keiyaku-msg-head">
            <div class="item-width">
              <span class="item-title">照会年月日：</span>
              <span class="item-contents item-contents-width">{{getSearchDate()}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">共通顧客ID</span>
              <span
                class="item-contents full-style"
              >{{commonIdFormat(mcd0100Model.customerBusiness && mcd0100Model.customerBusiness.basicInfo ? mcd0100Model.customerBusiness.basicInfo[0].commonCustId : '')}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">ACCELカスタマID</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].contractCustId : '')}}</span>
            </div>
            <div class="item-width">
              <span class="item-title">電話番号</span>
              <span
                class="item-contents item-contents-width"
              >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].srvcId : '')}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">契約者名</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(mcd0100Model.customerBusiness && mcd0100Model.customerBusiness.basicInfo ? mcd0100Model.customerBusiness.basicInfo[0].custName :'')}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">契約者名カナ</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(mcd0100Model.customerBusiness && mcd0100Model.customerBusiness.basicInfo ? mcd0100Model.customerBusiness.basicInfo[0].custNameKana : '')}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes ? mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.guiBillGrp[0].sendtoNameKanji : '')}}</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名カナ</span>
              <span
                class="item-contents full-style"
              >{{ifNoData(mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes ? mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.guiBillGrp[0].sendtoNameKana : '')}}</span>
            </div>
          </el-row>
          <el-row v-else class="keiyaku-msg-head">
            <div class="item-width">
              <span class="item-title">照会年月日：</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">共通顧客ID</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">ACCELカスタマID</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width">
              <span class="item-title">電話番号</span>
              <span class="item-contents item-contents-width">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">契約者名</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">契約者名カナ</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
            <div class="item-width half-width">
              <span class="item-title">送付先名カナ</span>
              <span class="item-contents full-style">&nbsp;</span>
            </div>
          </el-row>
          <div
            class="gif-title"
            v-if="srvcStopCodeDis || unpaidCodeDis || orderStatusDis || spReportFlg"
          >注意喚起情報</div>
          <div class="tags">
            <div class="tag" v-if="srvcStopCodeDis">
              <span class="high-light-box">利用停止</span>
            </div>
            <div class="tag" v-if="unpaidCodeDis">
              <span class="high-light-box">料金未納</span>
            </div>
            <div class="tag" v-if="orderStatusDis">
              <span class="high-light-box">受注中</span>
            </div>
            <div class="tag" v-if="spReportFlg">
              <span class="high-light-box">特記</span>
            </div>
          </div>
        </el-row>
        <el-radio-group v-model="tabPosition" class="tab-radio-group">
          <el-radio-button
            :disabled="contractDisabled"
            class="contract-radio-button"
            label="契約情報"
          >契約情報</el-radio-button>
          <el-radio-button :disabled="billDisabled" class="bill-radio-button" label="請求情報">請求情報</el-radio-button>
          <el-radio-button
            :disabled="receiptDisabled"
            class="receipt-radio-button"
            label="収納情報"
          >収納情報</el-radio-button>
        </el-radio-group>
        <div class="bill-tab" v-if="tabPosition==='請求情報' && accelTableData.length > 0">
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
                  @change="radioClick(scope.$index,scope.row)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="ビリングID" min-width="15%">
              <template slot-scope="scope">
                <span
                  @click="billingIdClick(scope.row)"
                  class="billing-link"
                >{{scope.row.billInfo[0].billingId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="請求種別" min-width="10%">
              <template slot-scope="scope">
                <span>{{billClassName(scope.row.billInfo[0].billClass)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="ﾜﾝﾋﾞﾘﾝｸﾞ" min-width="15%">
              <template slot-scope="scope">
                <span>{{wabillingFlg(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="請求群" min-width="11%">
              <template slot-scope="scope">{{reqGroupDis(scope.row.attr)}}</template>
            </el-table-column>
            <el-table-column label="譲渡請求拒否" min-width="11%">
              <template slot-scope="scope">{{scope.row.billInfo[0].transferBillRefusalDistName}}</template>
            </el-table-column>
            <el-table-column label="譲渡請求対象外" min-width="11%">
              <template slot-scope="scope">{{scope.row.billInfo[0].transferBillObjectOffDistName}}</template>
            </el-table-column>
            <el-table-column label="強制独自発行" min-width="11%">
              <template slot-scope="scope">{{scope.row.billInfo[0].cnplsionOriginPblshDistName}}</template>
            </el-table-column>
            <el-table-column label="定期分割" min-width="11%">
              <template slot-scope="scope">{{periodicDevide(scope.row.attr)}}</template>
            </el-table-column>
          </el-table>
          <div v-if="!accelReceiptStatusResNone">
            <p class="reqdatetxt">請求期別</p>
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
        <div
          class="bill-tab"
          v-if="tabPosition==='請求情報' && accelTableData.length <= 0"
        >該当する情報はありません。</div>
        <!-- 契約詳細（電話）契約情報 -->
        <el-row v-if="tabPosition==='契約情報'">
          <div class="top-margin" />
          <el-collapse v-model="activeNames">
            <el-collapse-item title="契約情報" name="契約情報">
              <el-row class="class-title">契約情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">契約種別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].contractClassName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">回線種別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].lineClassName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">回線種類識別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].linekindDistName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ISDN種別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].isdnDistName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求種別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].billDistName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求群</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifHasGroup(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].chrgGrp : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">地域群</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifHasGroup(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].areatypeChrgGrp : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">Web表示要否</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{hasFlg(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.srvcIdInfo[0].webIndicateReqr : '')}}</span>
                </div>
              </el-row>
              <el-row class="class-title">契約者住所</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">特殊郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.customerBusiness ? mcd0100Model.customerBusiness.custAddr[0].spZip : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.customerBusiness ? mcd0100Model.customerBusiness.custAddr[0].zip : '')}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style addr"
                  >{{addrAttach(mcd0100Model.customerBusiness ? mcd0100Model.customerBusiness.custAddr : '')}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="請求書送付先" name="請求書送付先">
              <el-row class="class-title">請求書送付先</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">送付先名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].billSendName : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">送付先名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].billSendNameKana : '')}}</span>
                </div>

                <div class="item-width">
                  <span class="item-title">郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].billSendAddr[0].zip : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">特殊郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].billSendAddr[0].spZip : '')}}</span>
                </div>
                <div class="all-width address">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style addr"
                  >{{soAddressFormat(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].billSendAddr[0] : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes ? mcd0100Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].billSend[0].payerContactTelNo : '')}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="設置場所" name="設置場所">
              <el-row class="class-title">設置場所</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">設場名称</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.locationInfo[0].locationName : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">設場名称カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.locationInfo[0].locationNameKana : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.locationInfo[0].zip : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">特殊郵便番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.locationInfo[0].spZip : '')}}</span>
                </div>
                <div class="all-width">
                  <span class="item-title">住所</span>
                  <span
                    class="item-contents full-style addr"
                  >{{addrForDis(mcd0100Model.accelContract.accSrvcIdInfoSrchVer2 ? mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.locationInfo[0] : '')}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="商品情報" name="商品情報">
              <el-row class="class-title">商品情報</el-row>
              <el-row class="item-box margin-bottom-high" v-if="productList.length > 0">
                <div class="all-width naiwake-padding margin-bottom-high">
                  <span class="item-title">商品名(コード)</span>
                  <el-select
                    class="all-width"
                    size="small"
                    v-model="productLabel"
                    placeholder="選択してください"
                    ref="productSel"
                    @visible-change="inputBlur($event,'productSel')"
                    @change="productChange($event)"
                  >
                    <el-option
                      v-for="(item,index) in productList"
                      :key="index"
                      :label="item.srrecPrdctName + '(' + item.srrecPrdctCode + ')'"
                      :value="item.srrecPrdctCode"
                    ></el-option>
                  </el-select>
                </div>
                <div class="item-width">
                  <span class="item-title">付加サービス番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(productInfo.srrecAddSrvcNo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">個数</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(productInfo.srrecItemCnt)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払区分</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(productInfo.srrecPayTypName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">課金先契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(productInfo.srrecChrgSrvcId)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">上限利用額</span>
                  <span
                    class="item-contents item-contents-width amount-right"
                  >{{amountFormat(productInfo.srrecMaxUseChrg)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約開始日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(productInfo.srrecContractStrtDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">サービス開始日</span>
                  <div>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMDFormat(accelDiscountInfo.srvcInDate)}}</span>
                  </div>
                </div>
                <div class="item-width">
                  <span class="item-title">適用開始年月日</span>
                  <div>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMDFormat(accelDiscountInfo.applyStrtDate2)}}</span>
                  </div>
                </div>
                <div class="item-width">
                  <span class="item-title">適用終了年月日</span>
                  <div>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMDFormat(accelDiscountInfo.applyEndDate2)}}</span>
                  </div>
                </div>
              </el-row>
              <el-row
                class="item-box margin-bottom-high"
                v-if="productList.length <= 0"
              >該当する情報はありません。</el-row>
              <el-row
                class="class-title class-title-margin"
                v-if="mcd0100Model.accelDiscount.accDiscntInfoSrchRes"
              >選択した商品に対する付加情報</el-row>
              <div class="naiwake-padding" v-if="mcd0100Model.accelDiscount.accDiscntInfoSrchRes">
                <el-table
                  class="naiwake-table"
                  stripe
                  :data="mcd0100Model.accelDiscount.accDiscntInfoSrchRes.soEachDataArea[0].variousIdListInfo[0].discntAddInfoRec"
                  border
                  :header-cell-style="tableCellStyle"
                >
                  <el-table-column type="index" label="#" min-width="10%"></el-table-column>
                  <el-table-column prop="addSrvcAddInfoName" label="付加情報名" min-width="18%"></el-table-column>
                  <el-table-column prop="addInfoContents" label="内容" min-width="18%"></el-table-column>
                  <el-table-column label="適用開始日" min-width="18%">
                    <template slot-scope="scope">
                      <span>{{YMDFormat(scope.row.applyStrtDate)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="適用終了日" min-width="18%">
                    <template slot-scope="scope">
                      <span>{{YMDFormat(scope.row.applyEndDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="優先接続" name="優先接続">
              <el-row class="class-title">優先接続 [表]</el-row>
              <el-table
                v-if="mcd0100Model.accelContract.accSrvcIdInfoSrchVer2"
                :data="mcd0100Model.accelContract.accSrvcIdInfoSrchVer2.myline"
                stripe
                border
                class="myline-table"
                :header-cell-style="tableCellStyle"
              >
                <el-table-column type="index" label="現在の登録区分" width="100px"></el-table-column>
                <el-table-column prop="inCityName" label="市内" min-width="21%"></el-table-column>
                <el-table-column prop="outCityName" label="市外" min-width="18%"></el-table-column>
                <el-table-column prop="outPrefctName" label="県間" min-width="19%"></el-table-column>
                <el-table-column prop="internationalName" label="国際" min-width="18.7%"></el-table-column>
              </el-table>
              <el-row class="class-title rec-table">履歴 [表]</el-row>
              <div>
                <div class="table-head table-row-height bor-left-top">
                  <div class="table-first-col bor-top"></div>
                  <div class="table-sec-col bor-top"></div>
                  <div class="table-third-col table-gray-bac table-title-font bor-top">市内</div>
                  <div class="table-forth-col table-gray-bac table-title-font bor-top">市外</div>
                  <div class="table-five-col table-gray-bac table-title-font bor-top">県間</div>
                  <div class="table-six-col table-gray-bac table-title-font bor-top">国際</div>
                </div>
                <div class="flex-box">
                  <div class="table-head flex-colum">
                    <div v-for="(item,index) in historyLengthList" :key="index" class="flex-box">
                      <div class="table-first-col table-gray-bac table-index-style">{{index + 1}}</div>
                      <div class="table-sec-col">
                        <div
                          class="table-row-height table-gray-bac table-title-font bor-bottom"
                        >登録区分</div>
                        <div
                          class="table-row-height table-gray-bac table-title-font bor-bottom"
                        >契約状態</div>
                        <div
                          class="table-row-height table-gray-bac table-title-font bor-bottom"
                        >予定/登録日</div>
                        <div class="table-row-height table-gray-bac table-title-font">原簿更新日</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-box">
                    <!-- 市内履歴 -->
                    <div>
                      <div
                        class="table-third-col table-font"
                        v-for="(inCity,index) in inCityRecRec"
                        :key="'#'+index"
                      >
                        <div class="table-row-height bor-bottom">{{inCity.inCityRecRegistTypName}}</div>
                        <div
                          class="table-row-height bor-bottom tabel-even-bac"
                        >{{inCity.inCityRecContractStatusName}}</div>
                        <div
                          class="table-row-height bor-bottom"
                        >{{YMDFormat(inCity.inCityRecScheduleRegistDate)}}</div>
                        <div
                          class="table-row-height tabel-even-bac"
                        >{{YMDFormat(inCity.inCityRecCustListRenewDate)}}</div>
                      </div>
                      <span v-if="inCityRecRec.length < maxLength">
                        <div
                          class="table-third-col table-font"
                          v-for="(item,index) in inCityRecRecBlank"
                          :key="index"
                        >
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height bor-bottom tabel-even-bac"></div>
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height tabel-even-bac"></div>
                        </div>
                      </span>
                    </div>
                    <div>
                      <!-- 市内履歴 -->
                      <div
                        class="table-forth-col table-font"
                        v-for="(ovrCity,ovrIndex) in ovrCityRecRec"
                        :key="'$'+ovrIndex"
                      >
                        <div class="table-row-height bor-bottom">{{ovrCity.ovrCityRecRegistTypName}}</div>
                        <div
                          class="table-row-height bor-bottom tabel-even-bac"
                        >{{ovrCity.ovrCityRecContractStatusName}}</div>
                        <div
                          class="table-row-height bor-bottom"
                        >{{YMDFormat(ovrCity.ovrCityRecScheduleRegistDate)}}</div>
                        <div
                          class="table-row-height tabel-even-bac"
                        >{{YMDFormat(ovrCity.ovrCityRecCustListRenewDate)}}</div>
                      </div>
                      <span v-if="ovrCityRecRec.length < maxLength">
                        <div
                          class="table-forth-col table-font"
                          v-for="(item,index) in ovrCityRecRecBlank"
                          :key="'ovr' + index"
                        >
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height bor-bottom tabel-even-bac"></div>
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height tabel-even-bac"></div>
                        </div>
                      </span>
                    </div>
                    <div>
                      <!-- 県間履歴 -->
                      <div
                        class="table-five-col table-font"
                        v-for="(outPrefct,outIndex) in outPrefctRecRec"
                        :key="'%'+outIndex"
                      >
                        <div
                          class="table-row-height bor-bottom"
                        >{{outPrefct.outPrefctRecRegistTypName}}</div>
                        <div
                          class="table-row-height bor-bottom tabel-even-bac"
                        >{{outPrefct.outPrefctRecContractStatusName}}</div>
                        <div
                          class="table-row-height bor-bottom"
                        >{{YMDFormat(outPrefct.outPrefctRecScheduleRegistDate)}}</div>
                        <div
                          class="table-row-height tabel-even-bac"
                        >{{YMDFormat(outPrefct.outPrefctRecCustListRenewDate)}}</div>
                      </div>
                      <span v-if="outPrefctRecRec.length < maxLength">
                        <div
                          class="table-five-col table-font"
                          v-for="(item,index) in outPrefctRecRecBlank"
                          :key="'out' + index"
                        >
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height bor-bottom tabel-even-bac"></div>
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height tabel-even-bac"></div>
                        </div>
                      </span>
                    </div>
                    <div>
                      <!-- 国際履歴 -->
                      <div
                        class="table-six-col table-font"
                        v-for="(inter,inIndex) in internationalRecRec"
                        :key="'*'+inIndex"
                      >
                        <div
                          class="table-row-height bor-bottom"
                        >{{inter.internationalRecRegistTypName}}</div>
                        <div
                          class="table-row-height bor-bottom tabel-even-bac"
                        >{{inter.internationalRecContractStatusName}}</div>
                        <div
                          class="table-row-height bor-bottom"
                        >{{YMDFormat(inter.internationalRecScheduleRegistDate)}}</div>
                        <div
                          class="table-row-height tabel-even-bac"
                        >{{YMDFormat(inter.internationalRecCustListRenewDate)}}</div>
                      </div>
                      <span v-if="internationalRecRec.length < maxLength">
                        <div
                          class="table-six-col table-font"
                          v-for="(item,index) in internationalRecRecBlank"
                          :key="'inter' + index"
                        >
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height bor-bottom tabel-even-bac"></div>
                          <div class="table-row-height bor-bottom"></div>
                          <div class="table-row-height tabel-even-bac"></div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="明細情報" name="明細情報">
              <span v-if="detailIDList.length > 0">
                <el-row class="class-title">明細情報</el-row>
                <el-row class="item-box margin-bottom-high">
                  <div class="all-width">
                    <div class="item-width naiwake-padding margin-bottom-high">
                      <span class="item-title">明細送付ID</span>
                      <el-select
                        class="all-width"
                        size="small"
                        v-model="detailIDLabel"
                        placeholder="選択してください"
                        ref="detailSel"
                        @visible-change="inputBlur($event,'detailSel')"
                        @change="detailIDChange($event)"
                      >
                        <el-option
                          v-for="(item,index) in detailIDList"
                          :key="index"
                          :label="item.detailSendId+ '(' + item.sendSrvctypName + ')'"
                          :value="item.detailSendId"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="item-width">
                    <span class="item-title">明細一括送付ID</span>
                    <div>
                      <span
                        class="item-contents item-contents-width"
                      >{{ifNoData(variousIdListInfo.detailSumupSendId)}}</span>
                    </div>
                  </div>
                  <div class="item-width">
                    <span class="item-title">電話番号</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.telNo)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">顧客区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.custTypName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付サービス区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.sendSrvctypName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">付加サービス番号</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.addSrvcNo)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">発信先番号表示</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.dispPlcNoIndicateName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">明細出力区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.detailOutputTypName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">発信元番号表示</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{daiyaruinnFlg(variousIdListInfo.dInDispNoIndicateReqr)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求書と同封</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{billEncloseFlag(variousIdListInfo.billEnclose)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">メンバーズ送付識別区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.membersSendDistTyp)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付申込者区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.sendSubscrptnPerTypName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付開始期別</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.contractStrtMonth)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付終了期別</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.contractEndMonth)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">契約開始日</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{YMDFormat(variousIdListInfo.contractStrtDate)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">契約終了日</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMDFormat(variousIdListInfo.contractEndDate)}}</span>
                  </div>
                </el-row>
                <el-row class="class-title">媒体送付情報</el-row>
                <el-row class="item-box margin-bottom-high">
                  <div class="item-width">
                    <span class="item-title">媒体(紙)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{daiyaruinnFlg(variousIdListInfo.cndctPaper)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">媒体(紙以外)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{daiyaruinnFlg(variousIdListInfo.cndctNonpaper)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">媒体名</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.cndctNameCodeName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付開始期別(紙)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.sendStrtMonthPaper)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付終了期別(紙)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.sendEndMonthPaper)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付開始期別(紙以外)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.sendStrtMonthNonpaper)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付終了期別(紙以外)</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.sendeEndMonthNonpaper)}}</span>
                  </div>
                </el-row>
                <el-row class="class-title">回送情報</el-row>
                <el-row class="item-box margin-bottom-high">
                  <div class="item-width">
                    <span class="item-title">回送区分</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(variousIdListInfo.fwTypCodeName)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">回送理由</span>

                    <span
                      class="item-contents full-style"
                    >{{ifNoData(variousIdListInfo.fwReasonCodeName)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">回送先</span>

                    <span
                      class="item-contents full-style"
                    >{{ifNoData(variousIdListInfo.fwtoCodeName)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">担当者名</span>

                    <span
                      class="item-contents full-style"
                    >{{ifNoData(variousIdListInfo.fwtoDeptName)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">回送開始期別</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.fwStrtChrgMonth)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">回送終了期別</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{YMFormat(variousIdListInfo.fwEndChrgMonth)}}</span>
                  </div>
                </el-row>
                <el-row class="class-title">明細送付先住所</el-row>
                <el-row class="item-box margin-bottom-last">
                  <div class="item-width half-width">
                    <span class="item-title">送付先名</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(variousIdListInfo.detailSendtoAddr[0].detailSendtoName)}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">送付先名カナ</span>

                    <span
                      class="item-contents full-style"
                    >{{ifNoData(variousIdListInfo.detailSendtoAddr[0].detailSendtoNameKana)}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">郵便番号</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(variousIdListInfo.detailSendtoAddr ? variousIdListInfo.detailSendtoAddr[0].zip :'')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">特殊郵便番号</span>

                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(variousIdListInfo.detailSendtoAddr ? variousIdListInfo.detailSendtoAddr[0].spZip :'')}}</span>
                  </div>
                  <div class="all-width">
                    <span class="item-title">住所</span>
                    <span
                      class="item-contents full-style addr"
                    >{{variousIdAddressFormat(variousIdListInfo.detailSendtoAddr ? variousIdListInfo.detailSendtoAddr[0] :'')}}</span>
                  </div>
                </el-row>
              </span>
              <span v-else>該当する情報はありません。</span>
            </el-collapse-item>
          </el-collapse>
        </el-row>
        <!-- 契約詳細（電話）請求情報 -->
        <el-row v-if="tabPosition==='請求情報' && accelTableData.length > 0">
          <div class="top-margin" />
          <el-collapse
            v-model="activeNames"
            v-if="mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes"
          >
            <el-collapse-item title="請求情報" name="請求情報">
              <el-row class="item-box margin-bottom-high info-list">
                <div class="item-width half-width">
                  <span class="item-title">当月請求額</span>
                  <span
                    class="item-contents full-style amount-right"
                  >{{amountFormat(guiBillGrp.thisMonthBillAmount)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求群</span>
                  <span class="item-contents item-contents-width">{{ifHasGroup(guiBillGrp.billGrp)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求種別</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(guiBillGrp.billClassName)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ワンビリング識別</span>
                  <span class="item-contents item-contents-width">{{wanbillingFlg(guiBillGrp)}}</span>
                </div>

                <div class="item-width">
                  <span class="item-title">ワンビリング適用群</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifHasGroup(guiBillGrp.oneBillingApplyGrp)}}</span>
                </div>

                <div class="item-width">
                  <span class="item-title">利用期間(自～至)</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YYMMFormat(guiBillGrp.usePeriodStrt) + '~' + YYMMFormat(guiBillGrp.usePeriodEnd)}}</span>
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
                  <span
                    class="item-contents full-style amount-right"
                  >{{amountFormat(guiBillGrp.lineTotal)}}</span>
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
                  <span class="item-contents item-contents-width">{{ifNoData(guiBillGrp.bandleId)}}</span>
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
            </el-collapse-item>
            <el-collapse-item title="内訳" name="内訳" class="billing-line">
              <div :class="widthRes ? 'table-max-width' : ''">
                <div class="table-bor table-head-bac">
                  <div
                    :class="widthRes ? 'table-line-index table-border-height' : 'table-line-index-w table-border-height'"
                  >#</div>
                  <div
                    :class="widthRes ? 'table-detail table-border-height' : 'table-detail-w table-border-height'"
                  >内訳</div>
                  <div
                    :class="widthRes ? 'table-dmy table-border-height' : 'table-dmy-w table-border-height'"
                  >疑似</div>
                  <div
                    :class="widthRes ? 'table-detail-title table-border-height' : 'table-detail-title-w table-border-height'"
                  >内訳名</div>
                  <div
                    :class="widthRes ? 'table-itemCode table-border-height' : 'table-itemCode-w table-border-height'"
                  >科目</div>
                  <div
                    :class="widthRes ? 'table-dailyRate table-border-height' : 'table-dailyRate-w table-border-height'"
                  >日割</div>
                  <div
                    :class="widthRes ? 'table-detailChrg table-border-height text-cen' : 'table-detailChrg-w table-border-height text-cen'"
                  >金額</div>
                  <div
                    :class="widthRes ? 'table-consmEql table-border-height' : 'table-consmEql-w table-border-height'"
                  >消費税相当</div>
                  <div
                    :class="widthRes ? 'table-taxTyp table-border-height' : 'table-taxTyp-w table-border-height'"
                  >税区</div>
                  <div
                    :class="widthRes ? 'table-usePeriod table-border-height' :'table-usePeriod-w table-border-height'"
                  >利用期間</div>
                </div>
                <div
                  v-for="(item,index) in mcd0100Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.billDetail[0].detailInfo"
                  :key="index"
                >
                  <div class="table-title">{{item.detailName}}</div>
                  <div
                    class="table-bor table-flex no-bor-top"
                    v-if="item.detail !== '' && item.dmy !== '' && item.dmyIntegIndicate !== '' && item.premialableSrvsIndicate !== ''&& item.detailName !== ''&& item.itemCode !== ''&& item.dailyRate !== ''&& item.detailChrg !== ''&& item.consmEql !== ''&& item.taxTyp !== ''&& item.usePeriod !== ''"
                  >
                    <div
                      :class="widthRes ? 'table-line-index table-border-height' : 'table-line-index-w table-border-height'"
                    >1</div>
                    <div
                      :class="widthRes ? 'table-detail table-border-height' : 'table-detail-w table-border-height'"
                    >{{item.detail}}</div>
                    <div
                      :class="widthRes ? 'table-dmy table-border-height' : 'table-dmy-w table-border-height'"
                    >{{item.dmy}}</div>
                    <div
                      :class="widthRes ? 'table-dmyIntegIndicate table-border-height' : 'table-dmyIntegIndicate-w table-border-height'"
                    >{{item.dmyIntegIndicate}}</div>
                    <div
                      :class="widthRes ? 'table-premialableSrvsIndicate table-border-height' : 'table-premialableSrvsIndicate-w table-border-height'"
                    >{{item.premialableSrvsIndicate}}</div>
                    <div
                      :class="widthRes ? 'table-detail-name table-border-height' : 'table-detail-name-w table-border-height'"
                    >{{item.detailName}}</div>
                    <div
                      :class="widthRes ? 'table-itemCode table-border-height' : 'table-itemCode-w table-border-height'"
                    >{{item.itemCode}}</div>
                    <div
                      :class="widthRes ? 'table-dailyRate table-border-height' : 'table-dailyRate-w table-border-height'"
                    >{{item.dailyRate}}</div>
                    <div
                      :class="widthRes ? 'table-detailChrg table-border-height' : 'table-detailChrg-w table-border-height'"
                    >{{amountFormat(item.detailChrg)}}</div>
                    <div
                      :class="widthRes ? 'table-consmEql table-border-height' : 'table-consmEql-w table-border-height'"
                    >{{item.consmEql}}</div>
                    <div
                      :class="widthRes ? 'table-taxTyp table-border-height' : 'table-taxTyp-w table-border-height'"
                    >{{item.taxTyp}}</div>
                    <div
                      :class="widthRes ? 'table-usePeriod table-border-height' : 'table-usePeriod-w table-border-height'"
                    >{{useDateFor(item.usePeriod)}}</div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div v-else class="dataNoneStyle">該当する情報はありません。</div>
        </el-row>
        <!-- 契約詳細（電話）収納情報 -->
        <el-row v-if="tabPosition==='収納情報'">
          <div class="top-margin" />
          <el-collapse v-model="activeNames">
            <el-collapse-item title="収納状況一覧" name="収納状況一覧">
              <el-row class="class-title">ビリングID（ACCEL）一覧</el-row>
              <div v-if="storageData.length > 0">
                <el-table
                  ref="storageTable"
                  stripe
                  :data="storageData"
                  border
                  class="receipt-status-list"
                  :header-cell-style="tableCellStyle"
                >
                  <el-table-column label="ビリングID" min-width="15%">
                    <template slot-scope="scope">
                      <span
                        @click="billingIdClick(scope.row)"
                        class="billing-link"
                      >{{scope.row.billInfo[0].billingId}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="請求種別" min-width="10%">
                    <template slot-scope="scope">
                      <span>{{billClassName(scope.row.billInfo[0].billClass)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="ﾜﾝﾋﾞﾘﾝｸﾞ" min-width="15%">
                    <template slot-scope="scope">
                      <span>{{wabillingFlg(scope.row)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="請求群" min-width="11%">
                    <template slot-scope="scope">{{reqGroupDis(scope.row.attr)}}</template>
                  </el-table-column>
                  <el-table-column label="譲渡請求拒否" min-width="11%">
                    <template
                      slot-scope="scope"
                    >{{scope.row.billInfo[0].transferBillRefusalDistName}}</template>
                  </el-table-column>
                  <el-table-column label="譲渡請求対象外" min-width="11%">
                    <template
                      slot-scope="scope"
                    >{{scope.row.billInfo[0].transferBillObjectOffDistName}}</template>
                  </el-table-column>
                  <el-table-column label="強制独自発行" min-width="11%">
                    <template
                      slot-scope="scope"
                    >{{scope.row.billInfo[0].cnplsionOriginPblshDistName}}</template>
                  </el-table-column>
                  <el-table-column label="定期分割" min-width="11%">
                    <template slot-scope="scope">{{periodicDevide(scope.row.attr)}}</template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else>該当する情報はありません。</div>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </div>
      <div v-else class="contract-none-display">該当する契約はありません</div>
    </div>
    <div v-else>
      <div class="warning-data">
        <div class="warning-data-box">
          <svg-icon class="warn-icon" icon-class="warning icon"></svg-icon>
          <span class="warn-word">{{errorMsg}}</span>
          <span class="warn-word">{{'エラーコード：' + errorCode}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mcd0100Methods from './mcd0100-methods'
import Mcd0100Model from './mcd0100-model'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
import * as CARD_ID from '@/constants/card-id-constants'
export default {
  name: 'MCD0100',
  extends: MainCardBase,
  mixins: [mcd0100Methods, GlobalMixins],
  data() {
    return {
      mcd0100Model: {},
      searchInfo: {},
      mainCardList: {},
      subCardList: {},
      activeNames: '',
      errorMsg: '',
      errorCode: '',
      tabPosition: '契約情報',
      /* eslint-disable */
      accelTableData: [],
      radio: 0,
      storageData: [],
      label: '選択してください',
      productLabel: '',
      detailIDLabel: '',
      productList: [],
      detailIDList: [],
      requestDateList: [],
      productInfo: {},
      accelDiscountInfo: {},
      variousIdListInfo: {},
      inCityRecRec: [], // 市内履歴
      ovrCityRecRec: [], // 市内履歴
      outPrefctRecRec: [], // 県間履歴
      internationalRecRec: [], // 国際履歴
      historyLengthList: [],
      inCityRecRecBlank: [],
      ovrCityRecRecBlank: [],
      outPrefctRecRecBlank: [],
      internationalRecRecBlank: [],
      maxLength: '',
      attr: '',
      srvcStopCodeDis: false,
      unpaidCodeDis: false,
      orderStatusDis: false,
      spReportFlg: false,
      nowDate: '',
      srchDate: '',
      guiBillGrp: {},
      accelReceiptStatusResNone: false,
      widthRes: false,
      contractDisabled: true,
      billDisabled: true,
      receiptDisabled: true,
      isSummaryShow: false,
      contractNoneFlg: false
    }
  },
  watch: {
    maincardName: {
      handler(newVal, oldVal) {
        let data = JSON.parse(JSON.stringify(this.$data))
        let reg = /^\d{10,11}$/
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

        this.errorCode = ''
        this.maincardName = newVal
        this.$nextTick(() => {
          // ACCEL候補顧客一覧照会API取得
          this.mcd0100Model.customerBusiness = this.$store.getters.accelCustomerInfo
          this.tabPosition = '契約情報'
          this.initView()
        })
      },
      deep: true,
      immediate: true
    },
    pageClientWidth: {
      handler(value) {
        if (value > 1024) {
          this.widthRes = false
        } else {
          this.widthRes = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    pageClientWidth: {
      type: Number
    }
  },
  created() {
    this.cardId = CARD_ID.MCD0101
    this.mcd0100Model = new Mcd0100Model()
  },
  computed: {
    showFlg() {
      return (
        this.mcd0100Model &&
        this.mcd0100Model.keiyakuInfo &&
        Object.keys(this.mcd0100Model.keiyakuInfo).length > 0
      )
    },
    dataDisplay() {
      return this.errorCode === ''
    }
  }
}
</script>
<style scoped>
.keiyaku-nav {
  width: 100%;
  height: 32px;
  background: #00438b;
  border-radius: 0px 4px 0px 0px;
  display: flex;
  align-items: center;
}
.keiyaku-back {
  float: left;
  width: 47%;
}
.keiyaku-back .cursor {
  cursor: pointer;
  margin-left: 20px;
}
.back-icon {
  color: #fff;
  font-size: 12px;
  vertical-align: middle;
}
.warning-data {
  display: flex;
  width: 100%;
  height: 268px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warning-data-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warn-icon {
  width: 36px !important;
  height: 32px !important;
  margin-bottom: 18px;
}
.warn-word {
  width: 100%;
  text-align: center;
  color: #fd596d;
  font-family: 'Meiryo UI';
  font-size: 16px;
  line-height: 22px;
}
.box-card {
  width: 935px;
  shadow: never;
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
.main-card-type {
  font-size: 14px;
  color: #ffffff;
  font-weight: 700;
}
.keiyaku-header {
  padding-left: 20px;
  margin-bottom: 10px;
}
.keiyaku-msg-head {
  margin-top: 23px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.tags {
  display: flex;
  width: 100%;
}
.tag {
  display: flex;
  margin-right: 20px;
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
.high-light-box {
  padding: 0 14px;
  height: 22px;
  color: #fff;
  background: #fd596d;
  border-radius: 11px;
  font-family: 'Meiryo UI';
  font-size: 12px;
  line-height: 22px;
  text-align: center;
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
.reqdatetxt {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  margin-bottom: 10px;
}
.top-margin {
  margin: 20px 20px 0 20px;
  height: 0px;
  border-top: 1px dashed #c9ced7;
}
.information {
  padding-left: 20px;
}
.div-line {
  margin-left: 20px;
  margin-right: 20px;
  height: 0px;
  border-top: 1px dashed #c9ced7;
}
.address {
  margin-bottom: 10px;
}
.class-title-margin {
  margin-bottom: 9px;
}
.naiwake-padding {
  padding-right: 20px;
}
.myline-padding {
  padding-left: 20px;
  padding-bottom: 16px;
}
.rec-table {
  margin-top: 20px;
}
.bottom-line {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 0px;
  border-top: 1px dashed #c9ced7;
}
.info-list {
  margin-top: 0px;
}
.detail-info-padding {
  padding-left: 20px;
  padding-right: 20px;
}
.gif-title {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  line-height: 14px;
  margin-bottom: 6px;
}
.billing-link {
  color: #00438b;
  cursor: pointer;
}
.table-head {
  display: flex;
  border-left: 1px solid #c1c1c1;
}
.bor-top {
  border-top: 1px solid #c1c1c1;
}
.flex-box {
  display: flex;
}
.flex-colum {
  flex-direction: column;
}
.table-first-col {
  width: calc((100vw - 139px) * 0.053);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-sec-col {
  width: calc((100vw - 139px) * 0.15);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-third-col {
  width: calc((100vw - 139px) * 0.243);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-forth-col {
  width: calc((100vw - 139px) * 0.182);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-five-col {
  width: calc((100vw - 139px) * 0.19);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-six-col {
  width: calc((100vw - 139px) * 0.189);
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-row-height {
  height: 38px;
}
.bor-left-top {
  border-left: 1px solid #c1c1c1;
}
.bor-bottom {
  border-bottom: 1px solid #c1c1c1;
}
.table-gray-bac {
  background: #dcdcdc;
}
.table-index-style {
  text-align: center;
  padding-top: 9px;
}
.table-font {
  font-family: 'Meiryo UI';
  font-size: 14px;
  text-align: center;
  line-height: 38px;
}
.table-title-font {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  line-height: 38px;
  text-align: center;
}
.tabel-even-bac {
  background-color: #f8f8f8;
}
.amount-right {
  justify-content: flex-end;
}
.dataNoneStyle {
  padding-left: 20px;
}
.table-border-height {
  height: 36px;
  line-height: 36px;
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.table-line-index {
  width: 46px;
  text-align: center;
}
.table-line-index-w {
  width: 5%;
  text-align: center;
}
.table-detail {
  text-align: center;
  width: 53px;
}
.table-detail-w {
  text-align: center;
  width: 5.8%;
}
.table-dmy {
  text-align: center;
  width: 59px;
}
.table-dmy-w {
  text-align: center;
  width: 6.5%;
}
.table-dmyIntegIndicate {
  text-align: center;
  width: 32px;
}
.table-dmyIntegIndicate-w {
  text-align: center;
  width: 3.5%;
}
.table-premialableSrvsIndicate {
  text-align: center;
  width: 32px;
}
.table-premialableSrvsIndicate-w {
  text-align: center;
  width: 3.5%;
}
.table-detail-title {
  text-align: center;
  width: 297px;
}
.table-detail-title-w {
  text-align: center;
  width: 33%;
}
.table-detail-name {
  text-align: center;
  width: 234px;
}
.table-detail-name-w {
  text-align: center;
  width: 26%;
}
.table-itemCode {
  text-align: center;
  width: 51px;
}
.table-itemCode-w {
  text-align: center;
  width: 5.6%;
}
.table-dailyRate {
  text-align: center;
  width: 53px;
}
.table-dailyRate-w {
  text-align: center;
  width: 5.8%;
}
.table-detailChrg {
  text-align: right;
  width: 114px;
}
.table-detailChrg-w {
  text-align: right;
  width: 12.6%;
}
.table-consmEql {
  text-align: center;
  width: 84px;
}
.table-consmEql-w {
  text-align: center;
  width: 9.3%;
}
.table-taxTyp {
  text-align: center;
  width: 87px;
}
.table-taxTyp-w {
  text-align: center;
  width: 9.6%;
}
.table-usePeriod {
  text-align: center;
  width: 87px;
}
.table-usePeriod-w {
  text-align: center;
  width: 9.6%;
}
.table-bor {
  border-top: 1px solid #c1c1c1;
  border-left: 1px solid #c1c1c1;
}
.table-head-bac {
  background: #dcdcdc;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  display: flex;
}
.table-title {
  background: #f8f8f8;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  padding-left: 11px;
  box-sizing: border-box;
  border-left: 1px solid #c1c1c1;
  border-right: 1px solid #c1c1c1;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #c1c1c1;
}
.table-flex {
  display: flex;
}
.no-bor-top {
  border-top: 0px;
}
.text-cen {
  text-align: center;
}
.table-max-width {
  width: 900px;
  margin-bottom: 10px;
}
.margin-bottom-last {
  margin-bottom: 30px;
}
span.billing-link:hover {
  text-decoration: underline;
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
.mcd0100 .el-collapse-item__arrow:hover {
  background-color: #ededed;
  border-radius: 7px;
}
.mcd0100 .el-radio__label {
  padding-left: 0px;
}
.box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcd0100 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #00438b;
  border: 0px;
  color: #fff;
}
.mcd0100 .el-radio-button__inner {
  color: #0058b6;
  font-family: 'Meiryo UI';
  font-size: 14px;
  padding: 11px 72px;
  border: 0px;
}

.mcd0100 .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px 0px 0px 4px;
}
.mcd0100 .el-radio-button.is-active .el-radio-button__inner {
  font-weight: bold;
}
.mcd0100 .el-radio-button.is-active {
  border-color: #00438b;
}
.mcd0100 .el-radio-button {
  border: 1px solid #00438b;
}
.mcd0100 .tab-radio-group {
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
}
.mcd0100 .tab-radio-group :last-child.el-radio-button .el-radio-button__inner {
  border-radius: inherit;
}
.mcd0100 .tab-radio-group .contract-radio-button {
  width: 200px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.mcd0100 .tab-radio-group .bill-radio-button {
  width: 200px;
}
.mcd0100 .tab-radio-group .receipt-radio-button {
  width: 200px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.mcd0100 .bill-tab {
  padding-left: 20px;
  padding-right: 20px;
}
.mcd0100 .ocn-list {
  width: 100%;
  min-width: 590px;
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
}
.mcd0100 .receipt-tab {
  padding-left: 20px;
  padding-right: 20px;
}
.mcd0100 .receipt-status-list {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-bottom: 30px;
}
.tableRow .el-radio__inner:hover {
  border: 5px solid #00438b;
}
.tableRow .el-radio__inner {
  border: 1px solid #9b9b9b;
}
.mcd0100 .naiwake-table {
  border: 1px solid #c1c1c1;
  border-top: 0px;
  margin-bottom: 20px;
}
.mcd0100 .myline-table {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
  width: 100%;
}
.mcd0100 .el-table td,
.el-table th {
  padding: 8px 0;
}
.mcd0100 .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
}
.mcd0100 .el-table .cell,
.el-table th div {
  padding-right: 0px;
  text-align: center;
}
.mcd0100 .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right-color: #c1c1c1;
}
.mcd0100 .el-table__header-wrapper .el-table__header {
  width: 100% !important;
}
.mcd0100 .el-table__body-wrapper.is-scrolling-left .el-table__body {
  width: 100% !important;
}
.mcd0100 .el-table td,
.el-table th.is-leaf {
  border-bottom-color: #c1c1c1;
}
.mcd0100 .el-table--border,
.el-table--group {
  border-color: #c1c1c1;
}
.mcd0100 .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f8f8f8;
}
.mcd0100 .el-radio__input.is-checked .el-radio__inner {
  border-color: #00438b;
  background: #00438b;
}
.mcd0100 .el-collapse {
  border-top: 0px;
  border-bottom: 0px;
  padding: 0 20px;
}
.mcd0100 .el-collapse-item__content {
  padding-bottom: 0px;
}
.mcd0100 .el-collapse-item__header {
  font-size: 14px;
  color: #00438b;
  font-family: 'Meiryo UI';
  font-weight: bold;
}
.mcd0100 .el-collapse-item__arrow {
  font-weight: bold;
  transform: rotate(90deg);
  color: #00438b;
  font-size: 17px;
}
.mcd0100 .el-collapse-item__arrow.is-active {
  transform: rotate(-90deg) !important;
}
.mcd0100 .el-collapse-item__header {
  border-bottom: 1px dashed #c9ced7;
}
.mcd0100 .el-collapse-item__header.is-active {
  border-bottom-color: transparent !important;
}
.mcd0100 .el-collapse-item__wrap {
  border-bottom: 1px dashed #c9ced7;
}
.mcd0100 .billing-line .el-collapse-item__content {
  overflow: auto;
  margin-bottom: 30px;
}
span.el-radio-button__inner:hover {
  background: #e6f1fc;
}
.mcd0100 .el-collapse .el-collapse-item:last-child {
  margin-bottom: 0px;
}
.mcd0100 .el-collapse .el-collapse-item:last-child .el-collapse-item__header,
.mcd0100 .el-collapse .el-collapse-item:last-child .el-collapse-item__wrap {
  border-bottom: none;
}
.mcd0100 .tab-radio-group .is-disabled {
  border-color: #dcdfe6;
}
</style>
