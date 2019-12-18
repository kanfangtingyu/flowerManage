/* eslint-disable */
import Template from './index.vue'

const globalOptions = {
  show: false,
  closable: true,
  title: {
    content: '',
    cssClass: '',
    style: {}
  },
  message: {
    content: '',
    cssClass: '',
    style: {}
  },
  buttons: [],
  messageBox: {
    cssClass: '',
    style: {}
  },
  msgFooter: {
    cssClass: '',
    style: {}
  }
}

let instance

const Message = function(config = {}) {
  if (instance) {
    instance.$data.show = false
    document.body.style.overflow = null
    document.body.style.paddingRight = null
    instance = null
  }

  const Tpl = this.extend(Template)
  instance = new Tpl()

  config = {
    ...globalOptions,
    ...config
  }
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      instance.$data[key] = config[key]
    }
  }
  instance.$data.show = true
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = 15 + 'px'
  document.body.appendChild(instance.$mount().$el)
}

const AlertTitle = function(title, message, btnName, callback) {
  const alertConfig = {
    type: 'info',
    title: {
      content: title
    },
    message: {
      content: message
    },
    buttons: [
      {
        label: btnName,
        style: {
          margin: '0',
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          boxSizing: 'border-box',
          border: 'none',
          background: '#00438b',
          color: '#fff'
        },
        action: function() {
          Dismiss()
          const callbackFlg = false
          callback && callback(callbackFlg)
        }
      }
    ],
    msgFooter: {
      style: {
        padding: '0'
      }
    }
  }
  window.onkeydown = function(e) {
    event.stopPropagation()
    return false
  }
  Message.call(this, {
    ...alertConfig
  })
}

const Alert = function(message, callback) {
  const alertConfig = {
    type: 'info',
    message: {
      content: message
    },
    buttons: [
      {
        label: 'OK',
        style: {
          margin: '0',
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          boxSizing: 'border-box',
          border: 'none',
          background: '#00438b',
          color: '#fff'
        },
        action: function() {
          Dismiss()
          const callbackFlg = false
          callback && callback(callbackFlg)
        }
      }
    ],
    msgFooter: {
      style: {
        padding: '0'
      }
    }
  }
  window.onkeydown = function(e) {
    event.stopPropagation()
    return false
  }
  Message.call(this, {
    ...alertConfig
  })
}

const Confirm = function(title, message, callback) {
  const confirmConfig = {
    type: 'info',
    title: {
      content: title
    },
    message: {
      content: message
    },
    buttons: [
      {
        label: 'キャンセル',
        style: {
          margin: '0',
          padding: '2%',
          width: '50%',
          height: '40px',
          boxSizing: 'border-box',
          border: 'none',
          lineHeight: '2'
        },
        action: function() {
          Dismiss()
          const callbackFlg = false
          callback && callback(callbackFlg)
        }
      },
      {
        label: 'OK',
        style: {
          margin: '0',
          padding: '2%',
          width: '50%',
          height: '40px',
          boxSizing: 'border-box',
          border: 'none',
          lineHeight: '2'
        },
        action: function() {
          Dismiss()
          const callbackFlg = true
          callback && callback(callbackFlg)
        }
      }
    ],
    msgFooter: {
      style: {
        padding: '0'
      }
    }
  }
  window.onkeydown = function(e) {
    event.stopPropagation()
    return false
  }
  Message.call(this, {
    ...globalOptions,
    ...confirmConfig
  })
}

const Dismiss = () => {
  instance.$data.show = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  window.onkeydown = function(e) {}
}

export default {
  install(Vue) {
    Vue.prototype.$Message = Message.bind(Vue)
    Vue.prototype.$Message.alertTitle = AlertTitle.bind(Vue)
    Vue.prototype.$Message.alert = Alert.bind(Vue)
    Vue.prototype.$Message.confirm = Confirm.bind(Vue)
  }
}
