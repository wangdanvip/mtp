<template>
  <div class="header-wrapper">
    <div class="left">
      <div class="logo">美的云市场</div>
    </div>
    <ul class="right">
      <li class="login">{{loginWord}}</li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loginWord: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~styles/vars.less";
  .header-wrapper {
    position: fixed;
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    z-index: 100;
    padding: 12px 64px;
    min-width: 630px;
    .left {
      margin-top: 10px;
      float: left;
      .logo {
        width: 128px;
        height: 23px;
        line-height: 23px;
        padding-left: 36px;
        letter-spacing: 2px;
        font-size: 16px;
        color: #cadfff;
        margin-top: -4px;
        background: url("/static/images/marketHomeLogo/cloudmarketlogo.png") no-repeat left center;
        background-size: contain;
        cursor: pointer;
      }
    }
    .right {
      margin-top: -1px;
      float: right;
      font-size: 15px;
      font-weight: bold;
      color: #cadfff;
      .login {
        box-sizing: border-box;
        cursor: pointer;
        float: left;
        padding: 12px 0 16px 16px;
      }
    }
  }
</style>

