/**
* Created by CHENRC2 on 2017-11-13.
*/
<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header-lite></core-header-lite>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
  import CoreHeaderLite from 'components/core/core_header_lite/CoreHeaderLite.vue';
  export default {
    name: 'document',
    components: {
      'core-header-lite': CoreHeaderLite
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      overflow-y: hidden;
    }
  }
</style>

