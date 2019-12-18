/**
 * MW05の処理方法
 * @module /src/views/popups/MW05/mw05-methods.js
 * @author IBM CIC
 */
import * as MW05Constants from './mw05-constants'

export default {
  methods: {
    /**
     * 確定ボタンをクリックします
     */
    onOKbtn() {
      if (this.init !== MW05Constants.PULLDOWN_INIT) {
        this.onSelected(this.init)
      } else {
        this.onInitSelected()
      }
      this.initVal = this.init
      if (this.initInput.length >= 0) {
        this.onChange(this.initInput)
      }
      this.$emit('filter', this.filterList)
      this.$emit('update:visible', false)
    },
    /**
     * Pulldown値の初期化
     */
    onInitSelected() {
      this.filterList[0] = {
        id: '100',
        name: '指定なし',
        ekimuCode: '',
        srvcKindCode: '  '
      }
    },
    /**
     * Pulldown値が変化したときにトリガします
     * @param val
     */
    onSelected(val) {
      for (let i = 0; i < this.filter.length; i++) {
        if (
          this.filter[i].id === this.filterdata &&
          this.filter[i].pulldown &&
          this.filter[i].pulldown.value
        ) {
          for (let j = 0; j < this.filter[i].pulldown.value.length; j++) {
            if (this.filter[i].pulldown.value[j].value === val) {
              this.filterList[0] = {
                id: this.filter[i].pulldown.value[j].value,
                name: this.filter[i].pulldown.value[j].label,
                ekimuCode: this.filter[i].pulldown.value[j].ekimuCode,
                srvcKindCode: this.filter[i].pulldown.value[j].srvcKindCode
              }
            }
          }
        }
      }
    },
    /**
     * Input値が変更されたときにトリガします
     * @param val
     */
    onChange(val) {
      this.filterList[1] = {
        name: MW05Constants.SRVCID,
        value: val
      }
    },
    /**
     * mw05フレームを閉じる
     */
    onCloseWindows() {
      if (this.initVal !== MW05Constants.PULLDOWN_INIT) {
        this.init = this.initVal
      } else {
        this.init = MW05Constants.PULLDOWN_INIT
      }
      this.$emit('update:visible', false)
    },
    /**
     * mw05の初期化
     */
    isMainCardShow(item) {
      if (item.id === this.filterdata) {
        return true
      } else {
        return false
      }
    },
    // IEでpulldownを操作すると、Textboxのようにカーソル「｜」が表示されません。
    inputBlur(flag, refName) {
      this.$refs[refName][0].$children[0].blur()
    }
  }
}
