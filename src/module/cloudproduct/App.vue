<template>
  <div id="app">
    <section class="container">
      <div class="header" v-if="isShow">
        <core-header></core-header>
      </div>
      <div class="content">
        <div class="content-nav" v-if="isShow">
          <core-nav-sub></core-nav-sub>
        </div>
        <div class="content-main" :style="'left:' + menuleft">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';

  export default {
    name: 'cloudproduct',
    data(){
      return {
        menuleft: '200px',
      }
    },
    computed: {
      isShow() {
        if (window.location.hash.match('/product_overview/show')) {
          this.menuleft = '';
          setTimeout(() => {
            let contentMainStyle = document.getElementsByClassName('content-main')[0].style
            contentMainStyle.top = '0';
            contentMainStyle.left = '0';
          }, 20)
          return false;
        }
        return true;
      }
    },
    methods: {

    },
    components:{
      'core-header': CoreHeader,
      'core-nav-sub': CoreNavSub,
      'core-bread-crumb': CoreBreadCrumb
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .header{
      position: fixed;
      width: 100%;
      z-index:1;
    }
    .content{
      .content-nav{
        position: fixed;
        top: 60px;
        bottom: 0;
        background: #211e2e;
        border-top:2px solid rgba(255,255,255,0.05) !important;
        width: 200px;
      }
      .content-main{
        position: absolute;
        left: 200px;
        top: 60px;
        bottom: 0;
        right: 0;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #e5e5e5;
        /*text-align: center;*/
      }
    }
  }
</style>
