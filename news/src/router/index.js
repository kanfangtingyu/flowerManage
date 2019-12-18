import Vue from 'vue'
import Router from 'vue-router'
import Views from './views.js'
import * as UserInfo from '@/utils/user-info'
import { getUserInfo } from '@/api/get-user-info'
import Cookies from 'js-cookie'
import { setToken } from '@/utils/auth'
Vue.use(Router)

const router = new Router({
  routes: Views
})

// ナビゲーションガード
router.beforeEach((to, from, next) => {
  // 認証済の場合、BaseFrameパスへ遷移

  if (to.name === 'BaseFrame') {
    let idpfToken = Cookies.get('idpf-token')
    // 認証しない場合、共通認証画面へ遷移
    if (!idpfToken) {
      next(false)
      window.location.href = process.env.VUE_APP_BASE_API + '/login'
    }

    // ②ロカールtokenを更新
    setToken(idpfToken)

    getUserInfo({}).then(res => {
      UserInfo.set(res.data)
      next()
    })
  } else {
    next()
  }
})

export default router
