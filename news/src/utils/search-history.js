// 簡易検索
const SIMPLE_SEARCH = 'SIMPLE_SEARCH'
// 詳細検索
const DETAIL_SEARCH = 'DETAIL_SEARCH'
// 簡易検索の最大履歴数
const MAX_SIMPLE_SEARCH_ITEMS = 10

function uniqueSimpleHistory(items) {
  return Array.from(new Set(items))
}

export function getSimpleSearchHistory() {
  return JSON.parse(sessionStorage.getItem(SIMPLE_SEARCH) || '[]')
}

export function getDetailSearchHistory() {
  return JSON.parse(sessionStorage.getItem(DETAIL_SEARCH) || '[]')
}

export function setSimpleSearchHistory(items) {
  items = uniqueSimpleHistory(items)

  if (items.length > MAX_SIMPLE_SEARCH_ITEMS) {
    items.splice(MAX_SIMPLE_SEARCH_ITEMS)
    sessionStorage.setItem(SIMPLE_SEARCH, JSON.stringify(items))
  } else {
    sessionStorage.setItem(SIMPLE_SEARCH, JSON.stringify(items))
  }
}

export function addSimpleSearchHistory(item) {
  let currentItems = JSON.parse(sessionStorage.getItem(SIMPLE_SEARCH) || '[]')
  currentItems.unshift(item)

  currentItems = uniqueSimpleHistory(currentItems)

  let len = currentItems.length
  if (len > MAX_SIMPLE_SEARCH_ITEMS) {
    currentItems.splice(MAX_SIMPLE_SEARCH_ITEMS)
    sessionStorage.setItem(SIMPLE_SEARCH, JSON.stringify(currentItems))
  } else {
    sessionStorage.setItem(SIMPLE_SEARCH, JSON.stringify(currentItems))
  }
}

export function setDetailSearchHistory(items) {
  sessionStorage.setItem(DETAIL_SEARCH, JSON.stringify(items))
}

export function removeSimpleSearchHistory() {
  sessionStorage.removeItem(SIMPLE_SEARCH)
}

export function removeDetailSearchHistory() {
  sessionStorage.removeItem(DETAIL_SEARCH)
}
