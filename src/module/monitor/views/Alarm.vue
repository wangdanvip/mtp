<template>
  <div class="manager-container">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .manager-container{
    display: block;
    box-sizing: border-box;
    overflow:hidden;
    .container-fluid{
      height: 98%;
    }
  }
</style>
<script>
  export default{}
</script>
