/**
* Created by CHENRC2 on 2017-11-13.
*/
<template>
  <section class="container" v-loading="loading" element-loading-text="文档加载中">
    <iframe @load="toggleLoading()" @readystatechange="toggleLoading()" class="doc" id="doc" :src="docSrc"></iframe>
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
        loading: true,
        docSrc:'http://www.midea.net/docs'
      }
    },
    methods:{
      toggleLoading(){
        this.loading=!this.loading;
      }
    }
  }
</script>
