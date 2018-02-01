<template>
  <section>
    <span class="badge">{{value}}</span>
  </section>
</template>

<style type="less" scoped>
.badge{
   width:18px;
   height:18px;
   top:10px;
   left:9px;
   font-size:12px;
   text-align:center;
   line-height:18px;
   background:#ff4949;
   border-radius:50%;
   position:absolute;
}
</style>
<script>
export default {
   data(){
     return{
     }
  },
  props:{
    value:{
      type:String,
      default:""
    }
  }
}
  
</script>