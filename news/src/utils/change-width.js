/**
 * タブのBoxの幅を設定する
 * @param {Object} タブの数量
 * @param {Array} タブリスト
 */
export function changeTagsWidth(tags, cardList) {
  if (cardList && cardList.length >= 5) {
    for (let i = 0; i < tags.length; i++) {
      // closeボタンの位置
      tags[i].nextElementSibling.parentElement.style.position = 'relative'
      tags[i].nextElementSibling.style.position = 'absolute'
      tags[i].nextElementSibling.style.top = '5px'
      tags[i].nextElementSibling.style.right = '2px'
      tags[i].nextElementSibling.style.display = 'none'
      tags[i].nextElementSibling.style.zIndex = '2'
      tags[i].parentElement.parentElement.style.overflow = 'hidden'
      if (document.body.clientWidth >= 1024 && cardList.length > 6) {
        tags[i].parentElement.parentElement.style.width =
          document.body.clientWidth - 42 * 2 - 51 + 'px'
      } else if (
        document.body.clientWidth > 795 &&
        document.body.clientWidth < 1023
      ) {
        tags[i].parentElement.parentElement.style.width =
          document.body.clientWidth - 42 * 2 - 51 + 'px'
      } else if (document.body.clientWidth >= 1024 && cardList.length <= 6) {
        tags[i].parentElement.style.width = '148px'
        tags[i].style.width = 130 + 'px'
      }
      let parentWidth = tags[i].parentElement.style.width
      tags[i].style.width = parseInt(parentWidth) * 0.81 + 'px'
    }
  } else {
    for (let i = 0; i < tags.length; i++) {
      let parentWidth = tags[i].parentElement.style.width
      tags[i].style.width = parseInt(parentWidth) * 0.81 + 'px'
      tags[i].parentElement.parentElement.style.overflow = 'hidden'
      tags[i].parentElement.style.width = '148px'
    }
  }
}
/**
 * タブの幅を設定する
 * @param {Object} tags
 * @param {Number} autoWidth
 * @param {Array} cardList
 */
export function changeAutoWidth(tags, autoWidth, cardList) {
  if (cardList && cardList.length >= 5) {
    for (let i = 0; i < tags.length; i++) {
      tags[i].nextElementSibling.parentElement.style.position = 'relative'
      tags[i].nextElementSibling.style.position = 'absolute'
      tags[i].nextElementSibling.style.top = '5px'
      tags[i].nextElementSibling.style.right = '2px'
      tags[i].nextElementSibling.style.display = 'none'
      tags[i].nextElementSibling.style.zIndex = '2'
      tags[i].parentElement.parentElement.style.overflow = 'hidden'
      if (document.body.clientWidth >= 1024 && cardList.length > 6) {
        tags[i].parentElement.parentElement.style.width =
          document.body.clientWidth - 42 * 2 - 31 + 'px'
      } else if (
        document.body.clientWidth > 795 &&
        document.body.clientWidth < 1023
      ) {
        tags[i].parentElement.parentElement.style.width =
          document.body.clientWidth - 42 * 2 - 31 + 'px'
      } else if (document.body.clientWidth <= 700 && cardList.length === 5) {
        tags[i].parentElement.parentElement.style.width = 700 - 84 - 11 + 'px'
      }
      tags[i].style.width = parseInt(autoWidth) * 0.859 + 'px'
    }
  } else {
    for (let i = 0; i < tags.length; i++) {
      tags[i].style.width = autoWidth * 0.859 + 'px'
      tags[i].parentElement.parentElement.style.overflow = 'hidden'
      tags[i].parentElement.style.width = '148px'
    }
  }
}
export function changeTabWidth(pageWidth, cardList, autoWidth) {
  // タブの数量が6より多く、三点のタブリストが表示されて、Windowsの幅によって、タブの幅がまた計算する
  let tabSixMore = Math.floor((pageWidth - 42 * 2 - 65 - 12 - 10) / 6) + 'px'
  // タブの数量が6、Windowsの幅が700pxより大きい
  let tabSixLit =
    Math.floor(
      (pageWidth - 42 * 2 - 25 - cardList.length * 2 - 10) / cardList.length
    ) + 'px'
  // タブの数量が6より多く、Windowsの幅が700pxより小さい
  let pageMinTabWidth = Math.floor((700 - 42 * 2 - 65 - 12 - 10) / 6) + 'px'
  // タブの数量が6、Windowsの幅が700pxより小さい
  let pageWidthFiveTab =
    Math.floor(
      (700 - 42 * 2 - 25 - cardList.length * 2 - 10) / cardList.length
    ) + 'px'
  // タブの数量が5、Windowsの幅が700pxより小さい
  let pageMinWidthFiveTab = Math.floor((700 - 42 * 2 - 9 - 20) / 5) + 'px'

  if (cardList.length >= 6 && pageWidth > 700) {
    if (cardList.length > 6) {
      autoWidth = tabSixMore
    } else {
      autoWidth = tabSixLit
    }
  } else if (cardList.length >= 6 && pageWidth <= 700) {
    if (cardList.length > 6) {
      autoWidth = pageMinTabWidth
    } else {
      autoWidth = pageWidthFiveTab
    }
  } else if (cardList.length === 5 && pageWidth > 700) {
    autoWidth =
      Math.floor(
        (pageWidth - 42 * 2 - 25 - cardList.length * 2 - 10) / cardList.length
      ) + 'px'
  } else if (cardList.length === 5 && pageWidth <= 700) {
    autoWidth = pageMinWidthFiveTab
  }
  return autoWidth
}
export function pageWidthChangeTab(pageWidth, cardList, autoWidth) {
  // タブの数量が6より多く、三点のタブリストが表示されて、Windowsの幅によって、タブの幅がまた計算する
  let tabSixMore = Math.floor((pageWidth - 42 * 2 - 65 - 12 - 10) / 6) + 'px'
  // タブの数量が6、Windowsの幅が700pxより大きい
  let tabSixLit =
    Math.floor(
      (pageWidth - 42 * 2 - 25 - cardList.length * 2 - 10) / cardList.length
    ) + 'px'
  // タブの数量が6より多く、Windowsの幅が700pxより小さい
  let pageMinTabWidth = Math.floor((700 - 42 * 2 - 65 - 12 - 10) / 6) + 'px'
  // タブの数量が5、Windowsの幅が700pxより小さい
  let pageWidthFiveTab =
    Math.floor(
      (700 - 42 * 2 - 25 - cardList.length * 2 - 10) / cardList.length
    ) + 'px'

  if (cardList.length > 5 && pageWidth > 700) {
    if (cardList.length > 6) {
      autoWidth = tabSixMore
    } else {
      autoWidth = tabSixLit
    }
  } else if (cardList.length > 5 && pageWidth <= 700) {
    if (cardList.length > 6) {
      autoWidth = pageMinTabWidth
    } else {
      autoWidth = pageWidthFiveTab
    }
  } else if (
    cardList &&
    cardList.length === 5 &&
    pageWidth < 875 &&
    pageWidth > 700
  ) {
    autoWidth = tabSixLit
  } else if (cardList.length === 5 && pageWidth < 700) {
    autoWidth = pageWidthFiveTab
  }
  return autoWidth
}
export function tabWidthDiff(startAutoWidth, autoWidth, tabsList, cardList) {
  if (startAutoWidth !== autoWidth) {
    changeAutoWidth(tabsList, autoWidth, cardList)
  } else {
    changeAutoWidth(tabsList, startAutoWidth, cardList)
  }
}
