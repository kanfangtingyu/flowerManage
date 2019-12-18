<template>
  <div ref="mcd0101" class="mcd0101">
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
        <!-- 契約詳細（法人サービス）サマリ情報 -->
        <el-row class="keiyaku-header">
          <el-row v-if="isSummaryShow" :class="!siriusErr ? '' : 'keiyaku-msg-head'">
            <span v-if="!siriusErr" class="keiyaku-msg-head">
              <div class="item-width">
                <span class="item-title">共通顧客ID</span>
                <span
                  class="item-contents item-contents-width"
                >{{commonIdFormat(customerInfo ? customerInfo.commonCustId : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約状態</span>
                <span
                  class="item-contents item-contents-width"
                >{{statusUser(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.statusContractCustomer : '')}}</span>
              </div>
              <div class="item-width" v-if="orderDataDis()">
                <span class="item-title">オーダ受付番号</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.orderReceiptNumber : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約番号</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractInfo.contractNumber : '')}}</span>
              </div>
              <div class="item-width" v-if="orderDataDis()">
                <span class="item-title">利用者ID</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.userId : '')}}</span>
              </div>
              <div class="item-width half-width">
                <span class="item-title">契約者名</span>
                <span
                  class="item-contents full-style"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.contractCustomerName : '')}}</span>
              </div>
              <div class="item-width half-width">
                <span class="item-title">契約者名（カナ）</span>
                <span
                  class="item-contents full-style"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.contractCustomerNameKana : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約商品</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.productList[0].productInfo.productName : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">オーダ/マスタ区分</span>
                <span
                  class="item-contents item-contents-width"
                >{{orderOrMast(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.searchRangeType : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">請求年月</span>
                <span
                  class="item-contents item-contents-width"
                >{{YMDFormat(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strSkyYm : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">ビリングID(BEAGLE)</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strHyjBilId : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">分割番号</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strBktNum : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">定期分割表示</span>
                <span
                  class="item-contents item-contents-width"
                >{{reqDateAll(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strTikBktNumHyj : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">支払区分</span>
                <span
                  class="item-contents item-contents-width"
                >{{contactPayType(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strShrKbn : '')}}</span>
              </div>
              <div class="item-width">
                <span class="item-title">帰属センタ</span>
                <span
                  class="item-contents item-contents-width"
                >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKzkCenSyb : '')}}</span>
              </div>
            </span>
            <span v-else class="error-page-dis"></span>
          </el-row>
          <el-row v-else :class="!siriusErr ? '' : 'keiyaku-msg-head'">
            <span v-if="!siriusErr" class="keiyaku-msg-head">
              <div class="item-width">
                <span class="item-title">共通顧客ID</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約状態</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width" v-if="orderDataDis()">
                <span class="item-title">オーダ受付番号</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約番号</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width" v-if="orderDataDis()">
                <span class="item-title">利用者ID</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width half-width">
                <span class="item-title">契約者名</span>
                <span class="item-contents full-style">&nbsp;</span>
              </div>
              <div class="item-width half-width">
                <span class="item-title">契約者名（カナ）</span>
                <span class="item-contents full-style">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">契約商品</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">オーダ/マスタ区分</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">請求年月</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">ビリングID(BEAGLE)</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">分割番号</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">定期分割表示</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">支払区分</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
              <div class="item-width">
                <span class="item-title">帰属センタ</span>
                <span class="item-contents item-contents-width">&nbsp;</span>
              </div>
            </span>
            <span v-else class="error-page-dis"></span>
          </el-row>
          <div class="gif-title" v-if="gifList.length > 0">注意喚起情報</div>
          <el-row class="star-info-row">
            <span v-for="(item, index) in gifList" :key="index">
              <div class="tag">
                <span class="high-light-box">{{item}}</span>
              </div>
            </span>
          </el-row>
        </el-row>
        <!-- 契約詳細（法人サービス）セグメント -->
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
        <!-- 契約詳細（法人サービス）請求情報セグメントの表 -->
        <div
          class="bill-tab"
          v-if="tabPosition==='請求情報' && ((!haveAccelReq && contactTableData.length > 0 && !ocnBillingListErr) || (accelTableData.length > 0 && haveAccelReq))"
        >
          <el-table
            v-if="!haveAccelReq"
            ref="multipleTable"
            stripe
            :data="contactTableData"
            border
            class="ocn-list"
            key="multipleTable"
            :header-cell-style="tableCellStyle"
          >
            <el-table-column align="center" label="表示" min-width="5%">
              <template slot-scope="scope">
                <el-radio
                  v-model="contactRadio"
                  :label="scope.$index"
                  @change="radioClick(scope.row)"
                  fill="#000"
                  class="table-row"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" type="index" min-width="5%"></el-table-column>
            <el-table-column align="center" label="請求年月" min-width="15%">
              <template slot-scope="scope">
                <span>{{YMFormat(scope.row.strSkyYm)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="strHyjBilId"
              label="ビリングID(BEAGLE)"
              min-width="15%"
            ></el-table-column>
            <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="15%"></el-table-column>
            <el-table-column align="center" label="定期一括" min-width="15%">
              <template slot-scope="scope">{{reqDateAll(scope.row.strTikBktNumHyjMei)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="strShrKbn" label="支払区分" min-width="15%"></el-table-column>
            <el-table-column align="right" label="金額" min-width="15%">
              <template slot-scope="scope">
                <span>{{strAmount(scope.row.strSkyKgk)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--ACCELバンドルの場合（「注意喚起情報」に「ACCEL請求」が有る場合）-->
          <el-table
            v-else
            ref="accelBillingTable"
            stripe
            :data="accelTableData"
            border
            class="ocn-list"
            :header-cell-style="tableCellStyle"
          >
            <el-table-column align="center" label="表示" min-width="5%">
              <template slot-scope="scope">
                <el-radio
                  v-model="accelRadio"
                  :label="scope.$index"
                  @change="accelRadioClick(scope.$index,scope.row)"
                  fill="#000"
                  class="table-row"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" label="ビリングID" min-width="15%">
              <template slot-scope="scope">{{scope.row.billInfo[0].billingId}}</template>
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
          <div v-if="haveAccelReq && !accelReceiptStatusErr">
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
        </div>
        <!-- 契約詳細（法人サービス）収納情報セグメントの表 -->
        <div
          class="bill-tab"
          v-if="tabPosition==='収納情報' &&((!haveAccelReq && storageData.length > 0) || (haveAccelReq && mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes && mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo))"
        >
          <el-table
            v-if="!haveAccelReq"
            ref="storageTable"
            stripe
            :data="storageData"
            border
            key="storageData"
            class="receipt-status-list"
            :header-cell-style="tableCellStyle"
          >
            <el-table-column align="center" label="表示" min-width="5%">
              <template slot-scope="scope">
                <el-radio
                  v-model="storageRadio"
                  :label="scope.$index"
                  @change="storageClick(scope.row)"
                  fill="#000"
                  class="table-row"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" label="請求年月" min-width="10%">
              <template slot-scope="scope">
                <span>{{YMFormat(scope.row.strSkyYm)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="strHyjBilId"
              label="ビリングID(BEAGLE)"
              min-width="15%"
            ></el-table-column>
            <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="15%"></el-table-column>
            <el-table-column align="center" label="定期一括" min-width="15%">
              <template slot-scope="scope">{{dateAll(scope.row)}}</template>
            </el-table-column>
            <el-table-column align="right" label="金額" min-width="15%">
              <template slot-scope="scope">
                <span>{{strAmount(scope.row.strSkyKgk)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="strKkmJkyKbn" label="消込状況" min-width="15%"></el-table-column>
            <el-table-column align="center" label="收納年月日" min-width="10%">
              <template slot-scope="scope">
                <span>{{YMDFormat(scope.row.strSynYmd)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--ACCELバンドルでない場合（「注意喚起情報」に「ACCEL請求」が無い場合）-->
          <el-table
            v-else-if="mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes && haveAccelReq && !accelSoBillingErr"
            ref="accelBillingTable"
            stripe
            :data="mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo"
            border
            class="ocn-list"
            :header-cell-style="tableCellStyle"
          >
            <el-table-column align="center" label="ビリングID" min-width="15%">
              <template slot-scope="scope">{{scope.row.billInfo[0].billingId}}</template>
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
          <span v-if="haveAccelReq && accelSoBillingErr" class="error-page-dis"></span>
        </div>
        <!-- 契約詳細（法人サービス）契約情報セグメント情報 -->
        <el-row v-if="siriusErr && tabPosition==='契約情報'">
          <span class="error-page-dis"></span>
        </el-row>
        <el-row v-if="!siriusErr && tabPosition==='契約情報'" class="tab-info">
          <div class="top-margin" />
          <el-collapse>
            <el-collapse-item title="申込情報" name="申込情報">
              <el-row class="class-title">申込基本情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">センタ識別</span>
                  <span
                    class="item-contents full-style"
                  >{{centerSee(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">申込年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.applyDate : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">申込書到着年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.applicationArrivalDate : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">オーダ登録番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.orderEntryNumber : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">開廃希望年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.requestDate : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">切替開始希望時間</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{timeFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.switchStartRequestTime : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">切替終了希望時間</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{timeFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.switchEndRequestTime : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">引継元契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.orginContractNumber : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">廃止側契約番号（切替元回線番号）</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{contactNum(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius : '')}}</span>
                </div>
                <div class="item-width half-width" v-if="orderDataDis()">
                  <span class="item-title">注文種類</span>
                  <span class="item-contents full-style">{{orderType}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">端末工事希望年月日</span>
                  <span class="item-contents item-contents-width">{{hopeDateNew()}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">端末工事希望年月日(旧)</span>
                  <span class="item-contents item-contents-width">{{hopeDateOld()}}</span>
                </div>
              </el-row>
              <el-row class="class-title">契約情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="margin-bottom-high all-width">
                  <span class="item-title">お客様区分</span>
                  <span
                    class="item-contents full-style"
                  >{{dataAllHas(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.customerType :'',mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.customerTypeName :'')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">共通顧客ID有無</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{hasOrNotCustomer(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractCustomerInfo.commonCustomerId :'')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約開始年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractInfo.contractStartDate :'')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約終了年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractInfo.contractEndDate :'')}}</span>
                </div>
                <div class="item-width" v-if="mastDataDis()">
                  <span class="item-title">商品最終変更年月日</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{prodctChgDate(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.productList :'')}}</span>
                </div>
                <div class="item-width" v-if="mastDataDis()">
                  <span class="item-title">竣工登録年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.contractInfo.completionDate :'')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">課金先契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{classContractNum(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius :'')}}</span>
                </div>
                <div class="item-width half-width" v-if="orderDataDis">
                  <span class="item-title">譲渡・承継区分</span>
                  <span class="item-contents full-style">{{ifNoData(ranOrHasType)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">契約者住所</el-row>
              <el-row class="item-box margin-bottom-high" v-if="kysAddress.addressInfo">
                <div class="item-width">
                  <span class="item-title">契約者郵便番号</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(kysAddress.addressInfo ? kysAddress.addressInfo.postalNumber : ' ')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約者住所コード</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(kysAddress.addressInfo ? kysAddress.addressInfo.addressCode : ' ')}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">契約者住所</span>

                  <span class="item-contents full-style">{{ifNoData(kysAddrMsg)}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="orderDataDis()">開通案内送付先住所</el-row>
              <el-row class="item-box margin-bottom-high" v-if="orderDataDis()">
                <div class="item-width">
                  <span class="item-title">開案送付先郵便番号</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(kasAddress.addressInfo ? kasAddress.addressInfo.postalNumber : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">開案送付先住所コード</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(kasAddress.addressInfo ? kasAddress.addressInfo.addressCode : '')}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">開案送付先住所</span>

                  <span class="item-contents full-style">{{ifNoData(kasAddrMsg)}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="orderDataDis()">開通案内連絡先</el-row>
              <el-row class="item-box margin-bottom-high" v-if="orderDataDis()">
                <div class="item-width half-width">
                  <span class="item-title">開通案内送付先名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.kaianMailingName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">開通案内送付先部門名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.kaianMailingDeptName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">開通案内送付先担当者</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.kaianMailingPerson)}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="orderDataDis()">開通案内記事</el-row>
              <el-row class="item-box margin-bottom-high" v-if="orderDataDis()">
                <div class="item-width half-width">
                  <span class="item-title">開通案内記載項目</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.kaianDescribedItem)}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis">
                  <span class="item-title">開通案内再出力要否</span>
                  <span class="item-contents item-contents-width">{{openLeadFlg()}}</span>
                </div>
                <div class="item-width half-width" v-if="orderDataDis">
                  <span class="item-title">開通案内出力回数</span>
                  <span class="item-contents full-style">{{ifNoData(openOutCount)}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis">
                  <span class="item-title">開案修正内容コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{changeContCode ? changeContCode : '&nbsp;'}}</span>
                </div>
                <div class="item-width half-width" v-if="orderDataDis">
                  <span class="item-title">開案修正記事</span>
                  <span class="item-contents full-style">{{ifNoData(openChangeTex)}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="orderDataDis()">申込記事</el-row>
              <el-row class="item-box margin-bottom-high" v-if="orderDataDis()">
                <div class="item-width half-width">
                  <span class="item-title">お客様ご要望記事欄(支店記事)</span>
                  <span class="item-contents full-style">{{ifNoData(otherTex)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">廃止関連情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">契約解除決裁番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{contractCancel(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius : '')}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="orderDataDis()">時間外・時間指定工事</el-row>
              <el-row class="item-box margin-bottom-high" v-if="orderDataDis()">
                <div class="item-width half-width">
                  <span class="item-title">時間区分</span>
                  <span class="item-contents full-style">{{timeType ? timeType : '&nbsp;'}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">工事内容</span>
                  <span class="item-contents full-style">{{ifNoData(workContent)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">希望日時 年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(hopeDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">希望日時 開始時間帯</span>
                  <span class="item-contents item-contents-width">{{timeFormat(hopeStartDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">希望日時 終了時間帯</span>
                  <span class="item-contents item-contents-width">{{timeFormat(hopeEndDate)}}</span>
                </div>
              </el-row>
              <el-row class="class-title" v-if="workChargeListDis">契約料・手数料・工事料</el-row>

              <el-row class="item-box margin-bottom-high" v-if="workChargeListDis">
                <el-table
                  stripe
                  :data="this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo.workChargeList.workChargeInfo"
                  border
                  class="bill-info-table"
                  :header-cell-style="tableCellStyle"
                >
                  <el-table-column align="center" prop="chargeItemSerialno" label="#"></el-table-column>
                  <el-table-column align="center" prop="chargeItemName" label="料金項目"></el-table-column>
                  <el-table-column align="right" label="金額">
                    <template slot-scope="scope">
                      <span>{{strAmount(scope.row.amount)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-collapse-item>
            <!--ACCELバンドルの場合（「注意喚起情報」に「ACCEL請求」が有る場合）-->
            <el-collapse-item title="請求情報" name="請求情報" v-if="haveAccelReq">
              <span v-if="!accelLedgerErr && !accelSoBillingErr">
                <el-row class="class-title">請求書送付先</el-row>
                <el-row class="item-box margin-bottom-high">
                  <div class="item-width">
                    <span class="item-title">ビリングID(ACCEL)</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].billingId : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付先名</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billSend ? billInfoBand.billSend[0].billSendName : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">送付先名カナ</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billSend ? billInfoBand.billSend[0].billSendNameKana : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">郵便番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(billInfoBand.billSend ? billInfoBand.billSend[0].billSendAddr[0].zip : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">特殊郵便番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(billInfoBand.billSend ? billInfoBand.billSend[0].billSendAddr[0].spZip : '')}}</span>
                  </div>
                  <div class="margin-bottom-high all-width">
                    <span class="item-title">住所</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(billInfoBand.billSend ? billInfoBand.billSend[0].billSendAddr[0].addr + space + billInfoBand.billSend[0].billSendAddr[0].houseNo + space + billInfoBand.billSend[0].billSendAddr[0].addrfor : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">連絡先電話番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(billInfoBand.billSend ? billInfoBand.billSend[0].payerContactTelNo : '')}}</span>
                  </div>
                </el-row>
                <el-row class="class-title">支払</el-row>
                <el-row class="item-box marginBottomLow">
                  <div class="item-width">
                    <span class="item-title">支払方法</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].payWay : '')}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">クレジットカード番号</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].crdtBill[0].crCardNo : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">金融機関コード</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].financeCode : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支店コード</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].brnchCode : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">金融機関名</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].financeName : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支店名</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].brnchName : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">口座番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].bnkacntNo : '')}}</span>
                  </div>
                  <div class="item-width half-width">
                    <span class="item-title">口座番号等表示</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].bnkacntNoEtcIndicateFlg : '')}}</span>
                  </div>
                  <div class="margin-bottom-high all-width">
                    <span class="item-title">口座名義</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(billInfoBand.billInfo ? billInfoBand.billInfo[0].bnkacntAuto[0].bnkacntKanaName : '')}}</span>
                  </div>
                </el-row>
              </span>
              <span v-else class="error-page-dis"></span>
            </el-collapse-item>
            <!--ACCELバンドルでない場合（「注意喚起情報」に「ACCEL請求」が無い場合）-->
            <el-collapse-item title="請求情報" name="請求情報" v-if="!haveAccelReq">
              <el-row class="class-title">請求情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">請求情報変更有無</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{reqChangeHas(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.chargeInfoChangeExist : '')}}</span>
                </div>
              </el-row>
              <el-row class="class-title">請求書送付先住所</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">請求書送付先郵便番号</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{iszipFormat(sksAddress.addressInfo ? sksAddress.addressInfo.postalNumber : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求書送付先住所コード</span>

                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(sksAddress.addressInfo ? sksAddress.addressInfo.addressCode : '')}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">請求書送付先住所</span>

                  <span class="item-contents full-style">{{ifNoData(sksAddrMsg)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">請求書連絡先</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">請求書送付先名カナ</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.billMailingKanaName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求書送付先名</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.billMailingName : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">請求書送付先担当者</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.billMailingPersonName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求書送付先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.billMailingPhoneNumber : '')}}</span>
                </div>
              </el-row>
              <el-row class="class-title">支払情報</el-row>
              <el-row class="item-box marginBottomLow">
                <div class="item-width half-width">
                  <span class="item-title">支払区分</span>
                  <span
                    class="item-contents full-style"
                  >{{payType(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">クレジットカード番号</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.creditCardNumber : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">クレジット有効期限</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.creditProvidedYearmonth : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">銀行コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.bankCode : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">銀行支店コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.bankBranchCode : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">口座番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.bankacNumber : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">預金種別</span>
                  <span class="item-contents item-contents-width">{{ifNoData(amountTypeV)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">通帳記号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.postalPassbookCode : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">通帳番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.postalPassbookNumber : '')}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">口座カナ名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.bankacKanaName : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">口座番号非出力表示</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{reqChangeHas(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.bankacNumberNotDisplay : '')}}</span>
                </div>
                <div class="item-width" v-if="orderDataDis()">
                  <span class="item-title">支払情報変更フラグ</span>
                  <span class="item-contents item-contents-width">{{payChangeFlg()}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="商品情報" name="商品情報">
              <el-row class="class-title">商品情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">
                    商品名(連結)
                    <span
                      v-if="mcd0101Model.messageDisplayFlg"
                      class="messageDisplayFlg"
                    >※オーダ情報を複数取得しました。正しい商品情報に関しては、SIRIUSをご確認ください</span>
                  </span>
                  <span class="item-contents full-style font-bold">{{productConnect()}}</span>
                </div>
              </el-row>
              <el-row v-for="(item,index) in prdctList" :key="index">
                <el-row
                  class="class-title"
                >{{item.productInfo.productCode ? item.productInfo.productCode + ':' + item.productInfo.productName : item.productInfo.productName}}</el-row>
                <el-row class="item-box margin-bottom-high">
                  <div class="item-width half-width">
                    <span class="item-title">処理区分</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(item.productInfo.processType)}}</span>
                  </div>
                  <span
                    v-for="(el,i) in item.productInfo.productDetailList"
                    :key="i"
                    :class="el.productDetailInfo.itemIdProduct === 'S0000107' ? 'item-box' : ''"
                  >
                    <div
                      class="item-width"
                      v-if="(el.productDetailInfo.itemIdProduct !== 'S0000100' || el.productDetailInfo.itemIdProduct !== 'S0000005' ||el.productDetailInfo.itemIdProduct !== 'S0000006') && el.productDetailInfo.itemIdProduct !== 'S0000107'"
                    >
                      <span class="item-title">{{el.productDetailInfo.itemNameProduct}}</span>
                      <span
                        class="item-contents item-contents-width"
                      >{{prdctDetailDisplay(el.productDetailInfo)}}</span>
                    </div>
                    <div
                      v-if="el.productDetailInfo.itemIdProduct === 'S0000107'"
                      class="item-width"
                    >
                      <span class="item-title">設置場所郵便番号</span>
                      <span
                        class="item-contents item-contents-width"
                      >{{ifNoData(el.productDetailInfo.setAddZip)}}</span>
                    </div>
                    <div
                      v-if="el.productDetailInfo.itemIdProduct === 'S0000107'"
                      class="item-width"
                    >
                      <span class="item-title">設置場所住所コード</span>
                      <span
                        class="item-contents item-contents-width"
                      >{{ifNoData(el.productDetailInfo.setAddCode)}}</span>
                    </div>
                    <div
                      v-if="el.productDetailInfo.itemIdProduct === 'S0000107'"
                      class="item-width special-margin"
                    >
                      <span class="item-title">設置場所住所</span>
                      <span
                        class="item-contents item-contents-width"
                      >{{ifNoData(el.productDetailInfo.productSetAddr)}}</span>
                    </div>
                  </span>
                </el-row>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="担当者情報" name="担当者情報">
              <el-row class="class-title">事務担当者</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">連絡先担当者名</span>
                  <span class="item-contents full-style">{{ifNoData(clerical.contactPersonName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先部門名</span>
                  <span class="item-contents full-style">{{ifNoData(clerical.contactDeptName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">連絡先メールアドレス</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(clerical.contactMailaddress)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(clerical.contactPhoneNumber)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">ネットワーク技術部門</el-row>
              <div class="con-padding">
                <div v-for="(item, index) in allCostomer" :key="index" class="tectab">
                  <div class="tecind">{{ index+1 }}</div>
                  <div class="teccon">
                    <div class="conhang conhang-border">
                      <div class="conname">連絡先担当者名</div>
                      <div class="convalue">{{item.contactPersonName}}</div>
                    </div>
                    <div class="conhang">
                      <div class="conname">連絡先電話番号</div>
                      <div class="convalue">{{item.contactPhoneNumber}}</div>
                    </div>
                    <div class="conhang">
                      <div class="conname">連絡先FAX番号</div>
                      <div class="convalue">{{item.contactFaxNumber}}</div>
                    </div>
                    <div class="conhang">
                      <div class="conname">連絡先メールアドレス</div>
                      <div class="convalue">{{item.contactMailaddress}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <el-row class="class-title">受注情報</el-row>
              <el-row class="item-box marginBottomLow">
                <div class="item-width">
                  <span class="item-title">異動用販売事業所コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.sirius.searchResultDetailInfo ? mcd0101Model.sirius.searchResultDetailInfo.applyInfo.orderInfo.changesSalesOfficeCode : '')}}</span>
                </div>
              </el-row>
              <el-row class="class-title">お客様対応部門</el-row>
              <el-row class="item-box marginBottomLow">
                <div class="item-width">
                  <span class="item-title">販売チャネルコード</span>
                  <span class="item-contents item-contents-width">{{saleChanelCode()}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先担当者名</span>

                  <span class="item-contents full-style">{{ifNoData(customerSup.contactPersonName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先支店／事業所名</span>

                  <span
                    class="item-contents full-style"
                  >{{ifNoData(customerSup.contactBranchOfficeName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先部課名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(customerSup.contactDepartmentName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">連絡先メールアドレス</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(customerSup.contactMailaddress)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(customerSup.contactPhoneNumber)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先ＦＡＸ番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(customerSup.contactFaxNumber)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">お申込受付部門</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">連絡先担当者名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(receiptSection.contactPersonName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先支店／事業所名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(receiptSection.contactBranchOfficeName)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">連絡先部課名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(receiptSection.contactDepartmentName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">連絡先メールアドレス</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(receiptSection.contactMailaddress)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(receiptSection.contactPhoneNumber)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先ＦＡＸ番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(receiptSection.contactFaxNumber)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">設備保守担当</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width half-width">
                  <span class="item-title">連絡先担当者名</span>
                  <span class="item-contents full-style">{{ifNoData(toolCharge.contactPersonName)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">連絡先メールアドレス</span>
                  <span class="item-contents full-style">{{ifNoData(toolCharge.contactMailaddress)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(toolCharge.contactPhoneNumber)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先電話番号内線</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(toolCharge.contactPhoneNumberExtension)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">連絡先ＦＡＸ番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(toolCharge.contactFaxNumber)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">統制局</el-row>
              <el-row
                :class="!workProgressmanagedetailList ? 'item-box margin-high' : 'item-box margin-bottom-high'"
              >
                <div class="item-width half-width">
                  <span class="item-title">故障受付窓口部門</span>

                  <span class="item-contents full-style">{{ifNoData(errCompony)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="工事情報" name="工事情報" v-if="workProgressmanagedetailList">
              <el-row class="class-title">竣工情報</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">開廃年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(workDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ネットワーク起算日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(networkStartDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン起算日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(accellineStartCotDate)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">サーバ工事日</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">サーバ工事予定年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(serverWorkDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">サーバ工事開始時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(serverStartDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">サーバ工事終了時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(serverEndDate)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">ルータ工事日</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">ルータ工事予定年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(rootWorktDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ルータ工事開始時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(rootStartDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ルータ工事終了時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(rootEndDate)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">アクセスライン工事日</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">アクセスライン工事予定年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(accelLineWorkDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン工事開始時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(accelLineStartDate)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン工事終了時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(accelLineEndDate)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">工事内訳</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">工事完了年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(workEndDate)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">開通試験実施内容</span>
                  <span class="item-contents full-style">{{ifNoData(openTestContent)}}</span>
                </div>
                <div class="margin-bottom-high all-width">
                  <span class="item-title">開通記事</span>
                  <span class="item-contents full-style">{{ifNoData(openText)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">竣工情報（旧）</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">開廃年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(workDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ネットワーク起算日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(networkStartDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン起算日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(accellineStartCotDateOld)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">サーバ工事日（旧）</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">サーバ工事予定年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(serverWorkDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">サーバ工事開始時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(serverStartDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">サーバ工事終了時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(serverEndDateOld)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">ルータ工事日（旧）</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">ルータ工事予定年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(rootWorktDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ルータ工事開始時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(rootStartDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ルータ工事終了時間</span>
                  <span class="item-contents item-contents-width">{{timeFormat(rootEndDateOld)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">アクセスライン工事日（旧）</el-row>
              <el-row class="item-box margin-bottom-high">
                <div class="item-width">
                  <span class="item-title">アクセスライン工事予定年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(accelLineWorkDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン工事開始時間</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{timeFormat(accelLineStartDateOld)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">アクセスライン工事終了時間</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{timeFormat(accelLineEndDateOld)}}</span>
                </div>
              </el-row>
              <el-row class="class-title">工事内訳（旧）</el-row>
              <el-row class="item-box margin-high">
                <div class="item-width">
                  <span class="item-title">工事完了年月日</span>
                  <span class="item-contents item-contents-width">{{YMDFormat(workEndDateOld)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <div class="bottom-line"></div>
        </el-row>
        <!-- 契約詳細（法人サービス）請求情報セグメント情報 -->
        <el-row v-if="(siriusErr || accelLedgerErr || accelSoBillingErr) && tabPosition==='請求情報'">
          <span class="error-page-dis"></span>
        </el-row>
        <el-row
          v-if="!siriusErr && tabPosition==='請求情報' && ((!haveAccelReq && contactTableData.length > 0 && !ocnBillingListErr) || (accelTableData.length > 0 && haveAccelReq))"
          class="tab-info"
        >
          <div class="top-margin" v-if="!accelReceiptStatusErr" />
          <el-collapse>
            <el-collapse-item title="サマリ" name="サマリ" v-if="!haveAccelReq">
              <el-row class="item-box">
                <div class="item-width">
                  <span class="item-title">契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strKykNum : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">送付先名</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strSksSfsMei : '')}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">送付先名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strSksSfsKnaMei : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">帰属センタ名</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strKzkCenSyb : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">課金開始日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strKakSttBi : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">廃止日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strHaiBi : '')}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="請求情報" name="請求情報" v-if="!haveAccelReq">
              <span v-if="!ocnBillingDetailErr">
                <div class="item-box">
                  <div class="item-width">
                    <span class="item-title">請求金額</span>
                    <span
                      class="item-contents item-contents-width acount"
                    >{{amountFormat(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strSkyKgk[0].strSkyKgk :'')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">分割区分</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKmkSynBktKbn : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">支払区分</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{contactPayType(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strShrKbn : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">金融機関コード</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKnyKikCod : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">口座番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysDataDis(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKozNum : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">カード番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strCdtCrdNum : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">住所入力区分</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strJsyCod : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">請求書送付先郵便番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{iszipFormat(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strSksSfsMeiYbnNum : '')}}</span>
                  </div>
                  <div class="margin-bottom-high width-margin">
                    <span class="item-title">請求書送付先住所（住所コード）</span>
                    <span
                      class="item-contents full-style"
                    >{{reqAddrCode(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0] : '')}}</span>
                  </div>
                  <div class="margin-bottom-high width-margin">
                    <span class="item-title">請求書送付先住所（直接入力）</span>
                    <span
                      class="item-contents full-style"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strTdf + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strSgc + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strOat + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strAcm + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strBnc1 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strBnc2 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strBnc3 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strTtm1 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strTtm2 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strTtm3 + ' ' + mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcSksSfsMei[0].strSkt : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括請求書送付先名</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysDataDis(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strIktSksSfsMei : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括請求書送付先名カナ</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strIktSksSfsKnaMei : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">発行止</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysDataDis(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strHkDmeHyj : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行課金状況</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysAccelData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strHkDmeHyj : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行支払期限日</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysAccelData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKozKgo : '','1')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">OCN回収代行課金先番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysAccelData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strIktSksSfsMei : '')}}</span>
                  </div>

                  <div class="item-width">
                    <span class="item-title">任意内訳種類</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysDataDis(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcLblJyo[0].strNniUwkSyu : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">定期回送/発行止</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{sysAccelData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].stcLblJyo[0].strNniUwkSyu : '')}}</span>
                  </div>
                  <div class="item-width">
                    <span class="item-title">一括契約番号</span>
                    <span
                      class="item-contents item-contents-width"
                    >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strIktKykNum : '')}}</span>
                  </div>
                </div>
              </span>
              <span v-else class="error-page-dis"></span>
            </el-collapse-item>
            <el-collapse-item
              title="内訳"
              name="内訳"
              v-if="!haveAccelReq && mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB && mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].seqStcSkyUwk.length > 0"
              :class="haveAccelReq ? 'table-margin billing-line' :''"
            >
              <!--ACCELバンドルでない場合（「注意喚起情報」に「ACCEL請求」が無い場合）-->
              <div class="ocn-table-bor">
                <el-row class="ocn-table-head">
                  <el-col :span="2" class="ocn-con-bor">#</el-col>
                  <el-col :span="4" class="ocn-con-bor">内訳</el-col>
                  <el-col :span="6" class="ocn-con-bor">内訳名</el-col>
                  <el-col :span="3" class="ocn-con-bor">日割</el-col>
                  <el-col :span="6" class="ocn-con-bor">金額</el-col>
                  <el-col :span="3" class="ocn-con-bor">税区分</el-col>
                </el-row>
                <el-row
                  v-for="(item,index) in mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].seqStcSkyUwk"
                  :key="index"
                >
                  <el-row class="ocn-table-height">
                    <el-col :span="2" class="ocn-table-center ocn-con-bor">{{index + 1}}</el-col>
                    <el-col
                      :span="4"
                      class="ocn-table-center ocn-con-bor"
                    >{{ifNoData(item.strUwkSyb)}}</el-col>
                    <el-col
                      :span="6"
                      class="ocn-table-center ocn-con-bor"
                    >{{ifNoData(item.strUwkMei)}}</el-col>
                    <el-col
                      :span="3"
                      class="ocn-table-center ocn-con-bor"
                    >{{ifNoData(item.strHwrKbn)}}</el-col>
                    <el-col :span="6" class="acount ocn-con-bor">{{amountFormat(item.strKinGak)}}</el-col>
                    <el-col
                      :span="3"
                      class="ocn-table-center ocn-con-bor"
                    >{{ifNoData(item.strZeiKbn)}}</el-col>
                  </el-row>
                  <el-row class="ocn-table-text ocn-table-height">
                    <el-col :span="6" class="ocn-con-bor">&nbsp;</el-col>
                    <el-col
                      :span="18"
                      class="ocn-con-bor ocn-table-padding"
                    >{{ifNoData(item.strOsrMgn)}}</el-col>
                  </el-row>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item
              title="内訳"
              name="内訳"
              v-if="mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes && haveAccelReq && !accelDetailByLineErr && !accelReceiptStatusErr"
              :class="haveAccelReq ? 'table-margin billing-line' :''"
            >
              <!--ACCELバンドルの場合（「注意喚起情報」に「ACCEL請求」が有る場合）-->
              <div
                :class="widthRes ? 'table-max-width' : ''"
                v-if="mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes"
              >
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
                  v-for="(item,index) in mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes.billDetail[0].detailInfo"
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
              <span v-else>該当する情報はありません。</span>
            </el-collapse-item>
            <el-collapse-item title="科目照会" name="科目照会" v-if="!haveAccelReq">
              <span
                v-if="!ocnBillingCategoryErr && mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB"
              >
                <el-row class="class-title">請求プラン情報</el-row>
                <el-row
                  class="item-box marginBottomLow"
                  v-if="mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB"
                >
                  <el-table
                    stripe
                    :data="mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData[0].seqStcSkyKmk"
                    border
                    class="bill-info-table"
                    :header-cell-style="tableCellStyle"
                  >
                    <el-table-column align="center" prop="strTnySkb" label="投入識別" min-width="13%"></el-table-column>
                    <el-table-column align="center" prop="strKmkCod" label="科目コード" min-width="13%"></el-table-column>
                    <el-table-column align="center" prop="strKmkMei" label="科目名" min-width="13%"></el-table-column>
                    <el-table-column align="center" prop="strTnySyb" label="利用期間" min-width="13%">
                      <template
                        slot-scope="scope"
                      >{{YMDFormat(scope.row.strRiySttBi) + '~' + YMDFormat(scope.row.strRiyEndBi)}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="strKoSuu" label="個数" min-width="13%"></el-table-column>
                    <el-table-column align="right" label="金額" min-width="13%">
                      <template slot-scope="scope">
                        <span>{{amountFormat(scope.row.strKinGak)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="strZeiKbn" label="税区分" min-width="13%"></el-table-column>
                    <el-table-column align="center" prop="strKsyMei" label="会社名" min-width="13%"></el-table-column>
                    <el-table-column align="center" prop="strAbnKbn" label="按分有無" min-width="13%"></el-table-column>
                  </el-table>
                </el-row>
                <el-row class="class-title">請求情報</el-row>
                <el-row :class="ocnBillingCategoryErr ? 'item-box marginBottomLow' : ''">
                  <span
                    :class="!ocnBillingCategoryErr ? 'item-box marginBottomLow' : ''"
                    v-if="!ocnBillingCategoryErr && mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB"
                  >
                    <div class="item-width">
                      <span class="item-title">一括表示</span>
                      <div
                        v-for="(items, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >
                        <span
                          class="item-contents item-contents-width"
                          v-for="(item, index) in items.stcLblJyo"
                          :key="index"
                        >{{ifNoData(item.strIktHyj)}}</span>
                      </div>
                    </div>
                    <div class="item-width half-width">
                      <span class="item-title">消費税相当額</span>
                      <span
                        class="item-contents full-style acount"
                        v-for="(item, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >{{amountFormat(item.strShzStoGak)}}</span>
                    </div>
                    <div class="item-width half-width">
                      <span class="item-title">契約プラン名</span>
                      <div
                        v-for="(items, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >
                        <span
                          class="item-contents full-style"
                          v-for="(item, index) in items.stcLblJyo"
                          :key="index"
                        >{{ifNoData(item.strPlnMei)}}</span>
                      </div>
                    </div>
                    <div class="item-width half-width">
                      <span class="item-title">休止理由</span>
                      <div
                        v-for="(items, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >
                        <span
                          class="item-contents full-style"
                          v-for="(item, index) in items.stcLblJyo"
                          :key="index"
                        >{{ifNoData(item.strKyuRyu)}}</span>
                      </div>
                    </div>
                    <div class="item-width">
                      <span class="item-title">顧客区分</span>
                      <div
                        v-for="(items, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >
                        <span
                          class="item-contents item-contents-width"
                          v-for="(item, index) in items.stcLblJyo"
                          :key="index"
                        >{{ifNoData(item.strKkkKbnHyj)}}</span>
                      </div>
                    </div>
                    <div class="item-width">
                      <span class="item-title">相対有無</span>
                      <div
                        v-for="(items, index) in mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB.sysData"
                        :key="index"
                      >
                        <span
                          class="item-contents item-contents-width"
                          v-for="(item, index) in items.stcLblJyo"
                          :key="index"
                        >{{ifNoData(item.strAitUmu)}}</span>
                      </div>
                    </div>
                  </span>
                  <span v-else class="error-page-dis"></span>
                </el-row>
              </span>
              <span
                v-else-if="ocnBillingCategoryErr && !mcd0101Model.ocnBillingCategory.ocnBillSubjectSrchNB"
                class="error-page-dis"
              ></span>
              <span v-else>該当する情報はありません。</span>
            </el-collapse-item>

            <el-collapse-item title="投入履歴" name="投入履歴" v-if="!haveAccelReq">
              <el-table
                v-if="!ocnOrderHistoryErr"
                :data="historyIndexData"
                border
                class="bill-info-table"
                :header-cell-style="tableCellStyle"
                :span-method="arraySpanMethod"
                :cell-style="changeCellStyle"
              >
                <el-table-column align="center" label="#" min-width="9%">
                  <template slot-scope="scope">
                    <span>{{scope.row.index}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="請求年月" min-width="13%">
                  <template slot-scope="scope">
                    <span>{{requestYMFormat(scope.row.strSkyYm)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="strHyjBilId"
                  label="ビリングID(BEAGLE)"
                  min-width="13%"
                ></el-table-column>
                <el-table-column align="center" prop="strBktNum" label="分割番号" min-width="13%"></el-table-column>
                <el-table-column align="center" label="投入年月日" min-width="13%">
                  <template slot-scope="scope">
                    <span>{{YMDFormat(scope.row.strTnyYmd)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="strKijRan" label="投入情報" min-width="13%"></el-table-column>
                <el-table-column align="center" prop="strTnySyb" label="投入種別" min-width="13%"></el-table-column>
                <el-table-column align="center" prop="strTnyCen" label="投入センタ" min-width="13%"></el-table-column>
                <el-table-column align="center" prop="strTnySyaMei" label="投入者名" min-width="13%"></el-table-column>
              </el-table>
              <span v-else class="error-page-dis"></span>
            </el-collapse-item>
            <!--ACCELバンドルの場合（「注意喚起情報」に「ACCEL請求」が有る場合）-->
            <el-collapse-item
              title="請求情報"
              name="請求情報"
              v-if="haveAccelReq && Object.keys(guiBillGrp).length > 0 && !accelDetailByLineErr && !accelReceiptStatusErr"
            >
              <div class="item-box margin-high" v-if="Object.keys(guiBillGrp).length > 0">
                <div class="item-width half-width">
                  <span class="item-title">当月請求額</span>
                  <span
                    class="item-contents full-style acount"
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
                  <span class="item-contents full-style">{{amountFormat(guiBillGrp.lineTotal)}}</span>
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
              </div>
              <span v-else>該当する情報はありません。</span>
            </el-collapse-item>
            <div
              v-if="!accelDetailByLineErr && !accelReceiptStatusErr && !ocnBillingDetailErr && !ocnOrderHistoryErr && !ocnBillingCategoryErr && Object.keys(guiBillGrp).length <= 0 && !mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes && !mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB"
            >該当する情報はありません。</div>
            <span
              v-if="haveAccelReq && accelDetailByLineErr && !mcd0101Model.accelBillingDetailByLine.billDetailSrchLineNoAccRes"
              class="error-page-dis"
            ></span>
            <span v-if="haveAccelReq && accelReceiptStatusErr" class="error-page-dis"></span>
          </el-collapse>
          <div class="bottom-line" />
        </el-row>
        <el-row
          v-if="!siriusErr && tabPosition==='請求情報' && !haveAccelReq && contactTableData.length <= 0 && !ocnBillingListErr && !ocnBillingDetailErr && !ocnOrderHistoryErr "
        >該当する情報はありません。</el-row>
        <span
          v-if="ocnBillingListErr && tabPosition==='請求情報' && !haveAccelReq"
          class="error-page-dis"
        ></span>
        <el-row
          v-if="!siriusErr && !accelLedgerErr && !ocnBillingDetailErr && !ocnOrderHistoryErr && tabPosition==='請求情報' && accelTableData.length <= 0 && haveAccelReq && !ocnOrderHistoryErr && !accelSoBillingErr"
        >該当する情報はありません。</el-row>
        <!-- 契約詳細（法人サービス）収納情報セグメント情報 -->
        <el-row v-if="(siriusErr || accelLedgerErr || accelSoBillingErr) && tabPosition==='収納情報'">
          <span class="error-page-dis"></span>
        </el-row>
        <el-row
          v-if="!siriusErr && tabPosition==='収納情報' && !haveAccelReq && storageData.length > 0 && !ocnBillingListErr"
          class="tab-info"
        >
          <div class="top-margin" />
          <el-collapse>
            <el-collapse-item title="サマリ" name="サマリ">
              <el-row class="item-box">
                <div class="item-width">
                  <span class="item-title">契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB ? mcd0101Model.ocnBillingDetail.billDetailSrchOcnResNB.sysData[0].strKykNum : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">請求年月</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(storageInfo.strSkyYm)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">ビリングID(BEAGLE)</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strHyjBilId)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">分割番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strBktNum)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">定期分割表示</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{reqDateAll(storageInfo.strTikBktNumHyjMei)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払区分</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{contactPayType(storageInfo.strShrKbn)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">帰属センタ</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strShrKbn : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">利用停止状態</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strRiyTisJtiMei : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">利用停止実施日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strRiyTisJssBi : '')}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">契約決裁番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(mcd0101Model.ocnBillingList.billInfoListOcnResNB ? mcd0101Model.ocnBillingList.billInfoListOcnResNB.sysData[0].strKykKssNum : '')}}</span>
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="収納状況" name="収納状況">
              <el-row class="item-box margin-high">
                <div class="item-width">
                  <span class="item-title">収納年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(storageInfo.strSynYmd)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">消込年月日</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(storageInfo.strKkmYmd)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">OCN回収代行支払期限日</span>
                  <span class="item-contents item-contents-width">{{ocnPayDate(storageInfo)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">一括契約番号</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strIktKykNum)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">一括請求書送付先名</span>
                  <span class="item-contents full-style">{{ifNoData(storageInfo.strIktSksSfsMei)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">一括請求書送付先名カナ</span>
                  <span
                    class="item-contents full-style"
                  >{{ifNoData(storageInfo.strIktSksSfsKnaMei)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">請求金額</span>
                  <span
                    class="item-contents full-style acount"
                  >{{amountFormat(storageInfo.strSkyKgk)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">分割区分</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strKmkSynBktKbn)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">支払区分</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strShrKbn)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">金融機関コード</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strKnyKikCod)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">口座番号</span>
                  <span class="item-contents item-contents-width">{{strKozNum(storageInfo)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">カード番号</span>
                  <span class="item-contents full-style">{{ifNoData(storageInfo.strCdtCrdNum)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">消込状況</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strKkmJkyKbn)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">滞納簿登記</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{ifNoData(storageInfo.strTnbTou)}}</span>
                </div>
                <div class="item-width half-width">
                  <span class="item-title">振替不能理由</span>
                  <span class="item-contents full-style">{{ifNoData(storageInfo.strFfnRyu)}}</span>
                </div>
                <div class="item-width">
                  <span class="item-title">変更後支払期限</span>
                  <span
                    class="item-contents item-contents-width"
                  >{{YMDFormat(storageInfo.strHkoGoShrKgn)}}</span>
                </div>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <div class="bottom-line" />
        </el-row>
        <el-row
          v-if="!siriusErr && !ocnBillingListErr && !ocnOrderHistoryErr && tabPosition==='収納情報' && ((!haveAccelReq && storageData.length <= 0) || (haveAccelReq && (mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes && !mcd0101Model.accelSoBillingByIds.accSoKindBillInfoSrchRes.soEachDataArea[0].variousIdListInfo) && !accelSoBillingErr))"
        >該当する情報はありません。</el-row>
        <span
          v-if="ocnBillingListErr && tabPosition==='収納情報' && !haveAccelReq"
          class="error-page-dis"
        ></span>
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
import mcd0101Methods from './mcd0101-methods'
import mcd0101Model from './mcd0101-model'
import '@/assets/css/kyoutuuCSS.css'
import * as MCD0101CONS from './mcd0101-constants'
import GlobalMixins from '@/mixin/global-mixins'
import MainCardBase from '@/mixin/main-card-base'
import * as CARD_ID from '@/constants/card-id-constants'
export default {
  name: 'MCD0101',
  extends: MainCardBase,
  mixins: [mcd0101Methods, GlobalMixins],
  data() {
    return {
      contractDetailInfo: [],
      workProgressmanageInfo: [],
      ekimuListSrchRes: {},
      searchInfo: {},
      errorMsg: '',
      errorCode: '',
      monflgChrg: true,
      monflgReg: true,
      contactRadio: 0,
      storageRadio: 0,
      accelRadio: 0,
      allCostomer: [],
      mcd0101Model: {},
      tabPosition: '契約情報',
      requestInfo: MCD0101CONS.REQUEST_INFO,
      contactInfo: MCD0101CONS.CONTRACT_INFO,
      intakeInfo: MCD0101CONS.INTAKE_INFO,
      seqStcSkyUwk: [],
      /* eslint-disable */
      contactTableData: [],
      /* eslint-disable */
      space: '　',
      radio: 0,
      storageData: [],
      gifList: [],
      haveAccelReq: false,
      kasAddress: {},
      kysAddress: {},
      sksAddress: {},
      stbAddress: {},
      kysAddrMsg: '',
      kasAddrMsg: '',
      stbAddrMsg: '',
      sksAddrMsg: '',
      orderType: '',
      amountTypeV: '',
      prdctDetailDis: true,
      clerical: {}, // 事務担当者
      customerSup: {}, // お客様対応部門
      receiptSection: {}, // お申込受付部門
      toolCharge: {}, // 設備保守担当
      storageInfo: {},
      changeContCode: '', // 開案修正内容コード
      timeType: '', // 時間区分
      handleTypeData: '',
      nowDate: '',
      srchDate: '',
      accelTableData: [],
      reqAttr: '',
      attr: '',
      label: '',
      requestDateList: [],
      accelReceiptStatusResNone: false,
      guiBillGrp: {},
      billInfoBand: {},
      workDate: '', // 開廃年月日
      networkStartDate: '', // ネットワーク起算日
      accellineStartCotDate: '', // アクセスライン起算日
      serverWorkDate: '', // サーバ工事予定年月日
      serverStartDate: '', // サーバ工事開始時間
      serverEndDate: '', // サーバ工事終了時間
      rootWorktDate: '', // ルータ工事予定年月日
      rootStartDate: '', // ルータ工事開始時間
      rootEndDate: '', // ルータ工事終了時間
      accelLineWorkDate: '', // アクセスライン工事予定年月日
      accelLineStartDate: '', // アクセスライン工事開始時間
      accelLineEndDate: '', // アクセスライン工事終了時間
      workEndDate: '', // 工事完了年月日
      workDateOld: '', // 開廃年月日(旧)
      networkStartDateOld: '', // ネットワーク起算日(旧)
      accellineStartCotDateOld: '', // アクセスライン起算日(旧)
      serverWorkDateOld: '', // サーバ工事予定年月日(旧)
      serverStartDateOld: '', // サーバ工事開始時間(旧)
      serverEndDateOld: '', // サーバ工事終了時間(旧)
      rootWorktDateOld: '', // ルータ工事予定年月日(旧)
      rootStartDateOld: '', // ルータ工事開始時間(旧)
      rootEndDateOld: '', // ルータ工事終了時間(旧)
      accelLineWorkDateOld: '', // アクセスライン工事予定年月日(旧)
      accelLineStartDateOld: '', // アクセスライン工事開始時間(旧)
      accelLineEndDateOld: '', // アクセスライン工事終了時間(旧)
      workEndDateOld: '', // 工事完了年月日(旧)
      ranOrHasType: '', // 譲渡・承継区分
      openOutCount: '', // 開通案内出力回数
      openChangeTex: '', // 開案修正記事
      otherTex: '', // お客様ご要望記事欄(支店記事)
      workContent: '', // 工事内容
      hopeDate: '', //希望日時 年月日
      hopeStartDate: '', //希望日時 開始時間帯
      hopeEndDate: '', // 希望日時 終了時間帯
      errCompony: '', //故障受付窓口部門
      openTestContent: '', //開通試験実施内容
      openText: '', //開通記事
      prdctList: [],
      setAddZip: '',
      setAddCode: '',
      setAddAddr: '',
      widthRes: false,
      contractDisabled: true,
      billDisabled: true,
      receiptDisabled: true,
      isSummaryShow: false,
      contractNoneFlg: false,
      siriusErr: false,
      accelLedgerErr: false,
      accelDetailByLineErr: false,
      accelReceiptStatusErr: false,
      ocnBillingListErr: false,
      ocnBillingDetailErr: false,
      ocnOrderHistoryErr: false,
      ocnBillingCategoryErr: false,
      accelSoBillingErr: false
    }
  },
  created() {
    this.cardId = CARD_ID.MCD0101
    this.mcd0101Model = new mcd0101Model()
  },
  computed: {
    showFlg() {
      return (
        this.mcd0101Model &&
        this.mcd0101Model.keiyakuInfo &&
        Object.keys(this.mcd0101Model.keiyakuInfo).length > 0
      )
    },
    dataDisplay() {
      return this.errorCode === ''
    },
    workChargeListDis() {
      return (
        this.mcd0101Model.sirius.searchResultDetailInfo &&
        this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType ===
          '01' &&
        this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo.workChargeList
      )
    },
    workProgressmanagedetailList() {
      return (
        this.mcd0101Model.sirius.searchResultDetailInfo &&
        this.mcd0101Model.sirius.searchResultDetailInfo.applyInfo
          .workProgressmanageList &&
        this.mcd0101Model.sirius.searchResultDetailInfo.searchRangeType === '01'
      )
    },
    historyIndexData() {
      let that = this
      let times = 0
      if (
        !this.ocnOrderHistoryErr &&
        that.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB
      ) {
        for (
          let i = 0;
          i <
          that.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB.sysData[0]
            .seqStcTnyRrk.length;
          i++
        ) {
          let item =
            that.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB.sysData[0]
              .seqStcTnyRrk[i]
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
            that.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB.sysData[0].seqStcTnyRrk[
              i
            ]['index'] = times
          }
        }
        return that.mcd0101Model.ocnOrderHistory.ocnChrgSrchCommonResNB
          .sysData[0].seqStcTnyRrk
      }
    }
  },
  watch: {
    maincardName: {
      handler(newVal, oldVal) {
        let data = JSON.parse(JSON.stringify(this.$data))
        let reg = /^[N]([0-9]{10})$/ || /^[H]([0-9]{9})$/
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
        this.$nextTick(() => {
          this.errorCode = ''
          this.maincardName = newVal
          // 顧客基本情報取得
          this.customerInfo = this.$store.getters.customerInfo
          this.searchInfo = this.$store.getters.searchInfo
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
  }
}
</script>
<style scoped>
.mcd0101 .keiyaku-nav {
  width: 100%;
  height: 32px;
  background: #00438b;
  border-radius: 0px 4px 0px 0px;
  display: flex;
  align-items: center;
}
.mcd0101 .keiyaku-back {
  float: left;
  width: 47%;
}
.mcd0101 .keiyaku-back .cursor {
  cursor: pointer;
  margin-left: 20px;
}
.mcd0101 .back-icon {
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
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
}
.width-margin {
  width: 100%;
  margin-right: 20px;
}
.star-info {
  font-weight: normal;
  margin-bottom: 6px;
}
.star-info-row {
  display: flex;
  width: 100%;
  margin: 10px 0;
}
.tag {
  display: flex;
  margin-right: 20px;
}
.con-padding {
  padding-right: 20px;
}
.bottom-line {
  margin-left: 20px;
  margin-right: 20px;
  height: 0px;
}
.width-style {
  width: 100%;
}
.gif-title {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  line-height: 14px;
  margin-bottom: 6px;
}
.top-margin {
  margin: 0 0 0 0px;
  height: 0px;
  border-top: 1px dashed #c9ced7;
}
.font-bold {
  font-weight: bold;
}
.ocn-table-head {
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 12px;
  font-weight: bold;
  line-height: 38px;
  height: 38px;
  background: #dcdcdc;
  text-align: center;
}
.ocn-table-text {
  background-color: #f8f8f8;
}
.ocn-table-center {
  text-align: center;
}
.ocn-table-height {
  height: 40px;
  line-height: 38px;
}
.ocn-table-bor {
  border-top: 1px solid #c1c1c1;
  border-left: 1px solid #c1c1c1;
  margin-bottom: 20px;
}
.ocn-con-bor {
  border-right: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.ocn-table-padding {
  padding-left: 11px;
}
.messageDisplayFlg {
  font-family: 'Meiryo UI';
  font-size: 12px;
  color: red;
  letter-spacing: 0.19px;
  display: inline-block;
  margin-left: 10px;
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
.margin-high {
  margin-bottom: 20px;
}
.special-margin {
  margin-right: 20px;
}
.contract-none-display {
  height: 268px;
  line-height: 268px;
  text-align: center;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
  font-size: 16px;
}
.error-page-dis {
  height: 100px;
  display: block;
}
</style>
<style>
.mcd0101 .el-collapse-item__arrow:hover {
  background-color: #ededed;
  border-radius: 7px;
}
.box-card .el-card__header {
  border-bottom: 1px solid #303133 !important;
}
.mcd0101 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #00438b;
  border: 0px;
  color: #fff;
}
.mcd0101 .el-radio-button__inner {
  color: #0058b6;
  font-family: 'Meiryo UI';
  font-size: 14px;
  padding: 11px 72px;
  border: 0px;
}

.mcd0101 .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px 0px 0px 4px;
}
.mcd0101 .el-radio-button.is-active .el-radio-button__inner {
  font-weight: bold;
}
.mcd0101 .el-radio-button.is-active {
  border-color: #00438b;
}
.mcd0101 .el-radio-button {
  border: 1px solid #00438b;
}
.mcd0101 .tab-radio-group {
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
}
.mcd0101 .tab-radio-group :last-child.el-radio-button .el-radio-button__inner {
  border-radius: inherit;
}
.mcd0101 .tab-radio-group .contract-radio-button {
  width: 200px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.mcd0101 .tab-radio-group .bill-radio-button {
  width: 200px;
}
.mcd0101 .tab-radio-group .receipt-radio-button {
  width: 200px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.table-row .el-radio__inner:hover {
  border: 5px solid #00438b;
}
.table-row .el-radio__inner {
  border: 1px solid #9b9b9b;
}
.mcd0101 .naiwake-table {
  border: 1px solid #c1c1c1;
  border-top: 0px;
  margin-bottom: 20px;
}
.mcd0101 .ocn-list {
  width: 100%;
  min-width: 590px;
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 30px;
}
.mcd0101 .receipt-status-list {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-top: 21px;
  margin-bottom: 5px;
}
.mcd0101 .el-table td,
.el-table th {
  padding: 8px 0;
}
.mcd0101 .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
}
.mcd0101 .el-table th div {
  padding-right: 0px;
  text-align: center;
}
.mcd0101 .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right-color: #c1c1c1;
}
.mcd0101 .el-table td,
.el-table th.is-leaf {
  border-bottom-color: #c1c1c1;
}
.mcd0101 .el-table--border,
.el-table--group {
  border-color: #c1c1c1;
}
.mcd0101 .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f8f8f8;
}
.mcd0101 .bill-info-table {
  border-left: 1px solid #c1c1c1;
  border-top: 0px;
  margin: auto;
  margin-bottom: 30px;
}
.mcd0101 .el-radio__input.is-checked .el-radio__inner {
  border-color: #00438b;
  background: #00438b;
}
.mcd0101 .el-radio__label {
  padding-left: 0px;
}
.mcd0101 .el-collapse {
  border-top: 0px;
  border-bottom: 0px;
}
.mcd0101 .el-collapse-item__content {
  padding-bottom: 0px;
}
.mcd0101 .el-collapse-item__header {
  font-size: 14px;
  color: #00438b;
  font-family: 'Meiryo UI';
  font-weight: bold;
}
.mcd0101 .el-collapse-item__arrow {
  font-weight: bold;
  transform: rotate(90deg);
  color: #00438b;
  font-size: 17px;
}
.mcd0101 .el-collapse-item__arrow.is-active {
  transform: rotate(-90deg) !important;
}
.mcd0101 .el-collapse-item__header {
  border-bottom: 1px dashed #c9ced7;
}
.mcd0101 .el-collapse-item__header.is-active {
  border-bottom-color: transparent !important;
}
.mcd0101 .el-collapse-item__wrap {
  border-bottom: 1px dashed #c9ced7;
}
.item-box .item-width:first-child {
  margin-left: 0px;
}
.tectab {
  width: 100%;
  display: flex;
  font-family: 'Meiryo UI';
  font-size: 12px;
  margin: 10px 0;
}
.tectab .tecind {
  text-align: center;
  line-height: 38px;
  width: 44px;
  background-color: #dcdcdc;
  border: 1px solid #c1c1c1;
}
.tectab .teccon {
  width: calc(100% - 45px);
}
.tectab .teccon .conhang {
  width: 100%;
  height: 38px;
  line-height: 38px;
  display: flex;
}
.tectab .teccon .conhang-border {
  border-top: 1px solid #c1c1c1;
}
.tectab .teccon .conhang .conname {
  width: 128px;
  text-align: center;
  font-weight: bold;
  background-color: #dcdcdc;
  border-bottom: 1px solid #c1c1c1;
}
.tectab .teccon .conhang .convalue {
  width: calc(100% - 129px);
  border-bottom: 1px solid #c1c1c1;
  border-left: 1px solid #c1c1c1;
  border-right: 1px solid #c1c1c1;
  padding-left: 11px;
  font-size: 14px;
}
.idpf-view-container .detailSearchResult .resultBody .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  text-align: center;
}
.mcd0101 .billing-line .el-collapse-item__content {
  overflow: auto;
}
.mcd0101 .el-table__header-wrapper .el-table__header {
  width: 100% !important;
}
.mcd0101 .el-table__body-wrapper.is-scrolling-left .el-table__body {
  width: 100% !important;
}
.mcd0101 .el-collapse .el-collapse-item:last-child {
  margin-bottom: 0px;
}
.mcd0101 .el-collapse .el-collapse-item:last-child .el-collapse-item__header,
.mcd0101 .el-collapse .el-collapse-item:last-child .el-collapse-item__wrap {
  border-bottom: none;
}
.mcd0101 .tab-radio-group .is-disabled {
  border-color: #dcdfe6;
}
</style>
