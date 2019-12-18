<template>
  <transition name="modal">
    <div v-if="show" class="msgBox">
      <div class="message" :class="msgBody.cssClass" :style="msgBody.style">
        <div
          v-if="title.content !== ''"
          class="title"
          :cssClass="title.cssClass"
          :style="title.style"
        >{{ title.content }}</div>
        <div class="msg" :class="message.cssClass" :style="message.style" v-html="message.content" />
        <div class="msgFooter" :class="msgFooter.cssClass" :style="msgFooter.style">
          <div
            v-for="(item, index) in buttons"
            :key="index"
            class="footerBtn"
            :class="item.cssClass"
            :style="item.style"
            @click="item.action"
          >{{ item.label }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      closable: true,
      type: 'default',
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
      msgBody: {
        cssClass: '',
        style: {}
      },
      msgFooter: {
        cssClass: '',
        style: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.msgBox {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  -webkit-transition: opacity 0.3s ease;
  -moz-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  z-index: 9999;
  -webkit-user-select: none;
}
.title {
  font-size: 16px;
  font-family: 'Meiryo UI';
  position: relative;
  padding-top: 11px;
  padding-bottom: 11px;
  background: #fff;
  text-align: center;
  font-weight: bold;
  color: #4a4a4a;
}
.message {
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: #fff;
  z-index: 9999;
  overflow: auto;
  box-shadow: 1px 1px 5px 0px #000;
}
.msg {
  padding: 19px 30px 45px 30px;
  border-top: 1px solid #dcdcdc;
  font-size: 14px;
  color: #4a4a4a;
  font-family: 'Meiryo UI';
}
.msgFooter {
  position: relative;
  box-sizing: border-box;
  border-top: 1px solid #e8e8e8;
  background: #fff;
  text-align: right;
  overflow: auto;
}
.footerBtn {
  font-family: 'Meiryo UI';
  display: inline-block;
  position: relative;
  margin-right: 5px;
  margin-bottom: 0;
  padding: 0 15px;
  line-height: 1.15;
  height: 28px;
  line-height: 28px;
  border-color: #d9d9d9;
  background-color: #dcdcdc;
  color: #4a4a4a;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.footerBtn:hover {
  background-color: #cacaca;
}
.footerBtn:nth-child(2) {
  color: #fff;
  background-color: #00438b;
}
.footerBtn:nth-child(2):hover {
  background-color: #2665b2;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
