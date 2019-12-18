// ユーザ情報
const USER_INFO = 'USER_INFO'

export function set(userInfo) {
  sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}

export function get() {
  return JSON.parse(sessionStorage.getItem(USER_INFO) || null)
}

export function remove() {
  sessionStorage.removeItem(USER_INFO)
}
