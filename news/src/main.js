// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import store from './store'
import router from './router'
import './icons' // svg-icon
import MsgBox from './components/MessageBox/index'
Vue.use(MsgBox)

// element-ui
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.config.errorHandler = function(err, vm, info) {
  console.log(err)
  switch (err.name) {
    case 'idpf-noop-error':
      console.log(vm, err.message, err.id)
      break
    default:
      console.log(`予期しないエラー:${err.message}`)
  }
}
window.onerror = (message, source, lineno, colno, error) => {
  console.log(
    `予期しないエラー:${message} - ${source} - ${lineno} - ${colno} - ${error} `
  )
}

// イベントバスを定義する
let eventBus = new Vue()
Object.defineProperty(Vue.prototype, '$idpfEventBus', {
  get: () => {
    return eventBus
  }
})

let initApp = async function(vm) {
  // アプリ全体の初期化の処理は、ここで実装
  return Promise.resolve()
}

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Promise.resolve()
  .then(() => {
    return initApp(app)
  })
  .then(() => {
    return app.$mount('#app')
  })
  .catch(err => {
    if (err.name === 'idpf-noop-error') {
      return
    }

    throw err
  })

const noop = function() {
  // 処理ない
}

export default { noop }
