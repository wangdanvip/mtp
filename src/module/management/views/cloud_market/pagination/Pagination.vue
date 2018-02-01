<template>
  <footer>
    <el-row class="page-main" justify="end" style="float: right;padding-left: 16px">
      <el-col :span="18">
        <el-pagination
          class="page-right"
          @current-change="currentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="1">
        <el-button @click ="currentChange(currentPage)" size="small" class="go" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </footer>
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  .page-main{
    margin-top:10px;
    min-width: 400px;
    .pagedetail{
      font: 400 14px/32px "微软雅黑";
      color:rgb(72, 96, 106);
      .bg{
        color:@color-primary;
      }
    }
    .page-right{
      float:right;
      padding-right:0;
    }
    .go{
      width:80px;
      height:32px;
      margin-left:15px;
      text-align:center;
      /*margin-top:2px;*/
    }
    .el-button--small{
      padding:7px 4px;
    }
  }
</style>
<script>
  export default{
    name: "Pagination",
    data(){
      return{

      }
    },
    props:{
      currentPage:{
        type:Number,
        default:1
      },
      pageSize:{
        type: Number,
        default: 10
      },
      total:{
        type: Number,
        default: 0
      }
    },
//    computed:{
//      startpage(){
//        return this.pageSize*(this.currentPage-1)+1;
//      },
//      endpage(){
//        //总页数小于每页大小或者 当前页数加上每页大小大于总页数
//        if((this.pageSize*(this.currentPage-1)+1+this.pageSize)>this.total||this.pageSize > this.total){
//          return this.total;
//        }
//        return  this.pageSize*(this.currentPage-1)+this.pageSize;
//      }
//    },
    methods:{
      currentChange(e){
        this.$emit('current-change',e);
      }
    }
  }
</script>

