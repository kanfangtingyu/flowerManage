<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h5 class="title">
          ※IDフェデレーションのアプリケーション選択画面がないので、一時ログイン画面使用
        </h5>
        <h3 class="title">ユーザログイン</h3>
      </div>

      <el-form-item prop="aliceId">
        <el-input
          v-model="loginForm.aliceId"
          name="aliceId"
          type="text"
          auto-complete="on"
          @keyup.enter.native="responseLogin"
        />
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;margin-left:0px;"
        @click.native.prevent="responseLogin"
        >ログイン</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getAuth } from '@/api/get-auth-for-dummy-login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        // 一時ログイン用
        aliceId: 'I000001',
        password: ''
      }
    }
  },
  methods: {
    async responseLogin() {
      let resResult = await getAuth({ 'RequestData': { 'userId': this.loginForm.aliceId } })
      Cookies.set('idpf-token', resResult['data']['idpf-token'])
      // 認証しない場合、共通認証画面へ遷移
      this.$router.push({
        name: 'BaseFrame'
      })
    }
  },
  mounted() {
    this.$refs.loginForm.$el.style.height = window.innerHeight + 'px'
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    margin-top: 200px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
