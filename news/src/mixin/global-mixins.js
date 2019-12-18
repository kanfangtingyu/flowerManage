import * as GlobalConstants from '@/constants/global-constants'
import IdpfNoopError from '@/errors/idpf-noop-error'
import { E_WEB1002 } from '@/constants/idpf-message.js'
export default {
  name: 'GlobalMixins',
  data() {
    return {
      preActivedCard: {},
      preMainCardName: '',
      errorMsg: '', //  通信エラーが発生の場合、メッセージ内容を設定
      errorCode: ''
    }
  },
  created() {},
  computed: {
    // 通信エラー発生
    hasError() {
      return this.errorMsg !== ''
    }
  },
  methods: {
    updateMaincardList(selectedCard) {
      // 既に基本フレーム画面に表示されたの場合、表示中にする
      let mainCardList = this.$store.getters.mainCardList.slice(0)
      let len = mainCardList.length
      let isShown = false
      let refreshView = false
      for (let index = 0; index < len; index++) {
        const mainCard = mainCardList[index]
        // カードの判断：
        //  → component: 'MCL0200'
        //  → ekimuCode: ''
        //  → srvcKindCode: '  '
        if (
          selectedCard.name === mainCard.name &&
          selectedCard.component === mainCard.component &&
          selectedCard.ekimuCode === mainCard.ekimuCode &&
          selectedCard.srvcKindCode === mainCard.srvcKindCode
        ) {
          isShown = true // 既に表示
          if (selectedCard.isActived) {
            // 既に表示中なので、画面レファレンス必要なし
            refreshView = false
          } else {
            mainCard.isActived = true
            // カードリスト更新
            // 画面レファレンス通知要
            refreshView = true
          }
        } else {
          // 非表示にする
          if (mainCard.isActived) {
            this.preActivedCard = JSON.parse(JSON.stringify(mainCard))
            this.preMainCardName = mainCard.name
          }
          mainCard.isActived = false
          refreshView = true
        }
      }

      if (!isShown) {
        // カードリスト
        selectedCard.isActived = true
        this.$store.commit('app/ADD_MAINCARD', selectedCard)
        refreshView = true
      } else {
        // tab表示切替
        this.$store.commit('app/SET_MAINCARD_LIST', mainCardList)
      }

      return refreshView
    },
    updateSubcardList(selectedCards) {
      this.$store.commit('app/SET_SUBCARD_LIST', selectedCards)
    },
    checkSearchKeyDigit(key) {
      let digitTest = /^.{10,11}$/
      let testResult = digitTest.test(key)
      return testResult
    },
    checkSearchKeyType(key) {
      let testResult = this.checkSearchKeyDigit(key)
      if (testResult) {
        let regex = [
          /^[N]([0-9]{9})$/,
          /^[C]([0-9]{10})$/,
          /^[B]([0-9]{10})$/,
          /^\d{10,11}$/,
          /^[H]([0-9]{9})$/
        ]

        if (regex[0].test(key)) {
          // N番
          return GlobalConstants.N_SEARCH
        } else if (regex[1].test(key)) {
          // C番
          return GlobalConstants.C_SEARCH
        } else if (regex[2].test(key)) {
          // B番
          return GlobalConstants.B_SEARCH
        } else if (regex[3].test(key)) {
          // 電番
          return GlobalConstants.D_SEARCH
        } else if (regex[4].test(key)) {
          // H番
          return GlobalConstants.H_SEARCH
        } else {
          return GlobalConstants.ERROR_SEARCH
        }
      } else {
        return GlobalConstants.ERROR_SEARCH
      }
    },
    onComError(optionId, error) {
      if (error.code === GlobalConstants.ECONNABORTED) {
        this.errorMsg = E_WEB1002
        this.errorCode = '-'
      } else {
        this.errorMsg = error.response.data.errorMessage
        this.errorCode = error.response.data.errorCode
      }
      throw new IdpfNoopError(this.errorMsg, optionId, this.errorCode)
    },
    /**
     * アドレスのフォマード
     * 住所、番地、建物、様方の両端のスペースをトリムし全角スペースで連結
     */
    addressFormat(
      add,
      banchi1,
      banchi2,
      banchi3,
      buliding1,
      buliding2,
      buliding3,
      people
    ) {
      let banchi1C = this.isFullWidth(banchi1)
      let banchi2C = this.isFullWidth(banchi2)
      let banchi3C = this.isFullWidth(banchi3)
      let buliding1C = this.isFullWidth(buliding1)
      let buliding2C = this.isFullWidth(buliding2)
      let buliding3C = this.isFullWidth(buliding3)
      let addC = this.spaceTrim(add)
      let peopleC = this.spaceTrim(people)
      let banchi = this.addr(banchi1C, banchi2C, banchi3C)
      let buliding = this.addr(buliding1C, buliding2C, buliding3C)
      return addC + '　' + banchi + '　' + buliding + '　' + peopleC
    },
    // 連結 契約者番地等1～3、契約者建物等1～3、契約者様方等の両端のスペースをトリムし、全角スペースで連結。ただし、
    // 契約者番地等1～3内と契約者建物等1～3内は、両端1文字が数字同士の場合のみ"－"で連結
    addr(valueBefore, valueMid, valueAfter) {
      // 番地 スペースをキャンセルする
      let vBefore = this.spaceTrim(valueBefore)
      let vMid = this.spaceTrim(valueMid)
      let vAfter = this.spaceTrim(valueAfter)
      // 番地 最後の文字を取得
      let endBeforeTempSB = vBefore.substr(vBefore.length - 1, vBefore.length)
      let endMidTempSB = vMid.substr(vMid.length - 1, vMid.length)
      // 番地 最初の文字を取得
      let startAfterTempSB = vAfter.substr(0, 1)
      let startMidTempSB = vMid.substr(0, 1)
      return (
        vBefore +
        this.connector(endBeforeTempSB, startMidTempSB) +
        vMid +
        this.connector(endMidTempSB, startAfterTempSB) +
        vAfter
      )
    },
    // 両端1文字が数字同士の場合のみ"－"で連結
    connector(start, end) {
      start = this.isHalfWidth(start)
      end = this.isHalfWidth(end)
      if (end && end.length > 0) {
        if (!isNaN(start) && !isNaN(end)) {
          return 'ー'
        } else {
          return '　'
        }
      } else {
        return ''
      }
    },
    // 両端のスペースをトリム
    spaceTrim(str) {
      if (str == null) return ''

      // 前のスペースを全部削除する
      while (str[0] === ' ' || str.charCodeAt(0) === 12288) {
        str = str.substr(1, str.length)
      }

      // 後の方のスペースを全部削除する
      while (
        str[str.length - 1] === ' ' ||
        str.charCodeAt(str.length - 1) === 12288
      ) {
        str = str.substr(0, str.length - 1)
      }
      return str
    },
    // 半角数字を全角数字に変換
    isFullWidth(val) {
      let result = ''
      if (val) {
        for (let i = 0; i < val.length; i++) {
          if (val.charCodeAt(i) <= 57 && val.charCodeAt(i) >= 48) {
            result += String.fromCharCode(val.charCodeAt(i) + 65248)
          } else {
            result += val.slice(i, i + 1)
          }
        }
      }
      return result
    },
    isHalfWidth(str) {
      var tmp = ''
      if (str) {
        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
          } else {
            tmp += String.fromCharCode(str.charCodeAt(i))
          }
        }
      }
      return tmp
    },
    // 論理11桁電話番号変換
    reqTelNoFormat(item) {
      item = item.split('-')
      item = item.join('')
      if (item && item !== '') {
        let telHeader = item.slice(0, 3)
        if (
          telHeader === '050' ||
          telHeader === '070' ||
          telHeader === '080' ||
          telHeader === '090'
        ) {
          return item.substr(1)
        } else {
          return item
        }
      } else {
        return '　'
      }
    },
    // 物理11桁電話番号変換
    resTelNoFormat(item) {
      if (item && item !== '') {
        let telHeader = item.slice(0, 2)
        if (
          telHeader === '50' ||
          telHeader === '70' ||
          telHeader === '80' ||
          telHeader === '90'
        ) {
          return '0' + item
        } else {
          return item
        }
      } else {
        return '　'
      }
    }
  }
}
