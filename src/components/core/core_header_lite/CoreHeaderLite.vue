<template>
  <header>
    <div class="header">
      <a href="/module/management.html#/welcome">
        <div class="iconfont">&nbsp;&nbsp;美的技术平台</div>
      </a>
    </div>
  </header>
</template>

<script>

</script>

<style lang="less" scoped>
  header {
    height: 60px;
    background-color: #211e2e;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 100;
    position: fixed;
    font-size: 14px;
     .header {
       margin: 0;
       float: left;
       padding: 0 29px;
      .iconfont{
        width: 220px;
        height: 60px;
        background: url(/static/images/loginImg/logo1.png) no-repeat;
        background-size: 40px 28px;
        background-position: 20px 14px;
        line-height: 60px;
        position: absolute;
        font-weight: 700;
        top: 0px;
        left: 0px;
        font-size: 18px;
        color: white;
        padding-left: 16px;
        text-align: center;
        cursor: pointer;
      }
     }
  }
</style>
