<template>
  <div class="foot-wrapper">
    <div class="left">
      Copyright &copy; 1968-2017 美的集团 版权所有
    </div>
    <ul class="right">
      <li><router-link to="/websiteinfo/contactus">联系我们</router-link></li>
      <li><router-link to="/websiteinfo/serviceterm">服务条款</router-link></li>
      <li><router-link to="/websiteinfo/privatepolicy">隐私政策</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .foot-wrapper {
    position: relative;
    height: 70px;
    font-size: 14px;
    color: #cadfff;
    .left {
      position: absolute;
      left: 74px;
      margin-top: 32px;
    }
    .right {
      position: absolute;
      right: 74px;
      margin-top: 32px;
      li {
        float: left;
        margin-right: 62px;
        &:last-child {
          margin-right: 0;
        }
        a {
          color: #cadfff;
        }
      }
    }
    @media screen and (max-width: 730px) {
      .right {
        display: none;
      }
    }
  }
</style>

