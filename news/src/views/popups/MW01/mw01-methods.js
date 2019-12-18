/**
 * MW01の処理方法
 * @module /src/views/popups/MW01/mw01-methods.js
 * @author IBM CIC
 */
import * as MW01Constants from './mw01-constants'
import * as IDPFEvent from '@/constants/idpf-event'
import * as GlobalConstants from '@/constants/global-constants'
export default {
  methods: {
    /**
     * マンカード画面の展開
     * @param なし
     */
    onConfirmMaincard() {
      if (this.mainCardTop === MW01Constants.DISTANCE_TOP) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, this.mainCardTop - MW01Constants.DISTANCE_TOP - 2)
      }

      let refreshView = this.updateMaincardList(this.selectedComponent)
      if (refreshView) {
        // 画面レファレンス
        this.$idpfEventBus.$emit(IDPFEvent.REFRESH_MAINCARD_LIST_VIEW)
      }

      this.$emit('update:visible', false)
    },
    /**
     * mw01フレームを閉じる
     */
    onCloseWindows() {
      this.$emit('update:visible', false)
      this.scrolltopFlag = 1
    },
    /**
     * ラジオのオプションを変更します
     */
    onChangeStatus(val) {
      let componentList = GlobalConstants.MAIN_CARD_LIST

      let cardIndex = componentList.findIndex(item => {
        return (
          item.component === val.component &&
          item.ekimuCode === val.ekimuCode &&
          item.srvcKindCode === val.srvcKindCode
        )
      })

      if (cardIndex !== -1) {
        this.selectedComponent = { ...componentList[cardIndex] }
      } else {
        this.selectedComponent = null
      }

      this.radio = val.name
      this.scrolltopFlag = 0
    },
    /**
     * itemTitleのCSSを設定
     */
    itemTitleStyle(item) {
      if (item.name === MW01Constants.MAIN_CARD_LIST[0].name) {
        return 'service-name-first-item'
      } else {
        return 'service-name'
      }
    },
    itemComponentName(item) {
      if (item.name === 'コンシューマ向けＯＣＮ') {
        return '第２種' + ' : ' + item.componentName
      } else if (
        item.name === MW01Constants.SERVICES_LIST ||
        item.name === MW01Constants.SERVICE_DUTY
      ) {
        return item.componentName
      } else {
        return item.name + ' : ' + item.componentName
      }
    },
    /**
     * カードのサブ項目のコンポネントを表示
     */
    mainCardChildComponentName(el) {
      return el.name + ' : ' + el.componentName
    }
  }
}
