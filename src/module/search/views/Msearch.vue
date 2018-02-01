/**
* Created by CHENRC2 on 2017-11-3.
*/
<template>
    <section class="container">
      <div class="content">
        <iframe class="msearch" id="msearch"  src="http://10.16.75.93:12580/search_web/index.html"></iframe>
      </div>
    </section>
</template>
<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top:  0;
      bottom: 0;
      background-color: @color-background;
      .msearch{
        height:99%;
        width:100%;
      }
    }
  }
</style>
<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>
