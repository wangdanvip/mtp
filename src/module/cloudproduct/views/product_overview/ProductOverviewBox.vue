<template>
  <div class="manager-container">
    <section class="container">
      <div class="header">
        <market-head></market-head>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="footer">
        <market-foot></market-foot>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  @import "~styles/vars.less";
  .manager-container{
    overflow: hidden;
    width: 100%;
    .header{
      position: fixed;
      width: 100%;
      height: 60px;
      z-index: 50;
      border-bottom: 1px solid #37445c;
      background-color: #1d293f;
    }
    .content {
      min-width: 700px;
      padding-top: 60px;
    }
    .footer{
      height:70px;
      background-color: #1d293f;
    }
    .btn-wrapper {
      background-color: #f1f3f5;
    }
  }
</style>

<script>
  import MarketHead from './overview_head/overview_head.vue';
  import MarketFoot from './overview_foot/overview_foot.vue';
  export default{
    methods: {
      stickyFoot() {
        var foot = document.getElementsByClassName('footer')[0];
        if (window.location.hash.indexOf('#/websiteinfo') != -1) {
          foot.style.width = "100%";
          foot.style.position = 'fixed';
          foot.style.bottom = '0';
        }
        else {
          foot.style.position = 'static';
        }
      }
    },
    watch: {
      "$route": "stickyFoot"
    },
    components: {
      'market-head': MarketHead,
      'market-foot': MarketFoot
    }
  }
</script>
