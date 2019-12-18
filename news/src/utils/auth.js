/**
 * tokenに関する共通処理を提供するユーティリティ
 * @module src/utils/auth.js
 */
const TokenKey = 'idpf-token'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey)
}
