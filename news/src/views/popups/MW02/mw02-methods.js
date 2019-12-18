/**
 * MW02の処理方法
 * @module /src/views/popups/MW02/mw02-methods.js
 * @author IBM CIC
 */
import * as IDPFEvent from '@/constants/idpf-event'
export default {
  methods: {
    /**
     * 選択したサブカードをページに追加します。
     */
    onSubcardAdd() {
      let selectCard = []
      const res = new Map()
      selectCard = this.selectCard.filter(
        item => !res.has(item.name) && res.set(item.name, 1)
      )
      let oldCardList = this.subCardList
      let selList = selectCard
      let toShowList = []
      if (oldCardList.length === 0) {
        toShowList = selList
      } else {
        for (let i = 0; i < oldCardList.length; i++) {
          for (let j = 0; j < selList.length; j++) {
            if (oldCardList[i].name === selList[j].name) {
              toShowList.push(selList[j])
              break
            }
          }
        }

        for (let i = 0; i < selList.length; i++) {
          let pushFlag = true
          for (let j = 0; j < toShowList.length; j++) {
            if (selList[i].name === toShowList[j].name) {
              pushFlag = false
            }
          }
          if (pushFlag) {
            toShowList.push(selList[i])
          }
        }
      }

      this.updateSubcardList(toShowList)
      this.$idpfEventBus.$emit(IDPFEvent.REFRESH_SUBCARD_LIST_VIEW)
      this.$emit('update:visible', false)
      this.subcardlistAllChange = JSON.parse(
        JSON.stringify(this.subcardlistAll)
      )
    },
    /**
     * mw02フレームを閉じる
     */
    onCloseSubcardAdd() {
      this.$emit('update:visible', false)
      this.subcardlistAll = JSON.parse(
        JSON.stringify(this.subcardlistAllChange)
      )
    },
    mw02Title(item) {
      if (item.component === this.subCardOne) {
        return this.others
      } else {
        return item.name
      }
    },
    mw02ServiceTitle(item) {
      if (item.isActived === true && item.name !== this.contractSrvc) {
        return 'list-box list-box-selected-bor'
      } else if (item.isActived === false && item.name !== this.contractSrvc) {
        return 'list-box list-box-no-sel-bor'
      } else if (item.isActived === true && item.name === this.contractSrvc) {
        return 'contracting-box list-box-selected-bor'
      } else if (item.isActived === false && item.name === this.contractSrvc) {
        return 'contracting-box list-box-no-sel-bor'
      }
    },
    mw02CardModel(item) {
      if (item.isActived === false) {
        return true
      } else {
        return false
      }
    },
    notScl0100(item) {
      if (item.name !== this.contractSrvc) {
        return true
      } else {
        return false
      }
    },
    cardName(item) {
      if (item.isActived) {
        return 'box-title box-title-sel-bac'
      } else {
        return 'box-title box-title-no-sel-bac'
      }
    },
    cardSelected(item) {
      if (item.isActived) {
        return 'box-title box-title-sel-col'
      } else {
        return 'box-title box-title-no-sel-col'
      }
    },
    isEkimuContractCard(item) {
      if (item.componentName === this.ekimuContractNumList) {
        return true
      } else {
        return false
      }
    },
    contractNumTitle(item) {
      if (item.isActived) {
        return 'kennsu-title kennsu-sel-col'
      } else {
        return 'kennsu-title kennsu-no-sel-col'
      }
    },
    contractNum(item) {
      if (item.isActived) {
        return 'contract-num-list kennsu-sel-col'
      } else {
        return 'contract-num-list kennsu-no-sel-col'
      }
    },
    contractServiceTitle(item) {
      if (item.isActived) {
        return 'item-name item-name-sel-col'
      } else {
        return 'item-name item-name-no-sel-col'
      }
    },
    contractServiceNum(item) {
      if (item.isActived) {
        return 'tannitikennsu tanniti-col'
      } else {
        return 'tannitikennsu tanniti-no-sel-col'
      }
    },
    otherCard(item) {
      if (
        item.componentName === this.srvcList ||
        item.componentName === this.contractList
      ) {
        return true
      } else {
        return false
      }
    },
    isServiceCard(item) {
      if (item.name === this.contractSrvc) {
        return true
      } else {
        return false
      }
    },
    isServiceCardSelected(item) {
      if (item.isActived === false) {
        return true
      } else {
        return false
      }
    },
    isServiceCardSelStyle(item) {
      if (item.isActived) {
        return 'same-box same-box-height list-box-selected-bor'
      } else {
        return 'same-box same-box-height list-box-no-sel-bor box-position'
      }
    },
    changeName(name) {
      if (name === 'コンシューマ向けOCN') {
        return '第２種'
      } else {
        return name
      }
    }
  }
}
