/**
* Created by CHENRC2 on 2017-11-13.
*/
<template>
  <section class="container">
    <iframe class="doc" id="doc" :src="docSrc"></iframe>
  </section>
</template>
<style lang="less" scoped>
  .doc{
    height: 100%;
    width: 100%;
  }
</style>
<script>
  export default{
    data() {
      return {
        docSrc:'http://mtpnew.midea.com/mtp/docs/search/index.html'
      }
    }
  }
</script>
