<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as UserInfo from '@/utils/user-info'
export default {
  name: 'App',
  mounted() {
    let keylisten = []
    let isDialogShow = false

    window.addEventListener('keydown', event => {
      let ev = event || window.event
      let obj =
        ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget
      if (event.keyCode === 8) {
        let tagName = obj.nodeName
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          event.preventDefault()
        }
      }

      let userInfo = UserInfo.get()
      if (isDialogShow) {
        event.preventDefault()
        return
      }
      if (event.keyCode === keylisten[0]) {
        return
      }
      keylisten.push(event.keyCode)
      if (keylisten[0] !== 17) {
        keylisten.splice(0, keylisten.length)
      }
      if (userInfo && userInfo.IDD_CTRL_KEY === '0') {
        if (keylisten[0] === 17) {
          event.preventDefault()
          isDialogShow = true
          const message = 'コントロールキーは、使用できません。'
          this.$Message.alert(message, function() {
            keylisten.length = 0
            isDialogShow = false
          })
        }
      }
      if (keylisten.length === 2) {
        if (!userInfo) {
          event.preventDefault()
          return
        }
        if (userInfo.IDD_CTRL_KEY === '1') {
          if (
            !(
              (keylisten[0] === 17 && keylisten[1] === 67) ||
              (keylisten[0] === 17 && keylisten[1] === 86)
            ) &&
            keylisten[0] === 17
          ) {
            event.preventDefault()
            const message =
              'コントロールキーは、「Ctrl+c」「Ctrl+v」以外使用できません。'
            isDialogShow = true
            this.$Message.alert(message, function() {
              keylisten.length = 0
              isDialogShow = false
            })
          }
        }
      } else if (keylisten.length > 2) {
        event.preventDefault()
      }
    })
    window.addEventListener('keyup', event => {
      keylisten.length = 0
    })
    window.addEventListener('contextmenu', event => {
      event.preventDefault()
    })
  },
  destroyed() {
    window.removeEventListener('keydown', event => {
      event.preventDefault()
    })
  }
}
</script>
