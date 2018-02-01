/**
* Created by CHENRC2 on 2017-7-22.
*/
<template>
    <paper class="paper-hook" style="position: relative; z-index: 0">
      <slot name="header"></slot>
      <div class="title-box" v-if="data.title">
        <el-row class="container-title" v-if="data.title">
          <el-col :span="24">
            <son-title :headTitle="{'titleName':data.title}"></son-title>
          </el-col>
        </el-row>
      </div>
      <el-row class="mb20" type="flex" justify="space-between">
        <el-col :span="20">
          <el-button class="w100" v-for="button in data.titleButton":size="button.size"
                     :type="button.type"
                     :disabled="button.singleControl?selected.length!==1:button.selectedControl?selected.length<=0:false"
                     @click="columnsButtonClick(button.click)">
            {{button.label}}</el-button>
        </el-col>
        <el-col v-if="isNeedSearch" :span="4">
          <user-search @search-enter="searchEnter" :value="keywords" :placeword="data.placewords"></user-search>
        </el-col>
      </el-row>
      <el-row>
        <list-table :data="tableData" :loading="loading" :title="data.tableTitle" :setting="data.tableSetting" :columnsOperation="data.columnsOperation" @select="select"></list-table>
        <pagination :currentPage="page.current" :pageSize="page.size" :total="page.total" @size-change="sizeChange"  @current-change="currentChange" ></pagination>
      </el-row>
    </paper>
</template>
<style lang="less" scoped>
  .title-box {
    position: relative;
    top: -20px;
    z-index: 2;
    height: 70px;
    width: 100%;
    .container-title {
      position: absolute;
      top: 0px;
      z-index: 2;
      width: 100%;
      padding-top: 20px;
      font-size: 20px;
      background-color: #fff;
      h3 {
        font-weight: 400;
      }
    }
  }
</style>
<script>
  import ListTable from '../list_table/ListTable.vue';
  import Pagination from '../pagination/Pagination.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue'
  export default{
    name: 'WholeTable',
    data() {
      return {
        tableData:[],
        loading:false,
        selected:[],
        keywords:"",
        page: {
          current: 1,
          size: 10,
          total: 0
        },
      }
    },
    created(){
      this.getData();
    },
    mounted () {
      var slotHeight = document.getElementsByClassName('container-title')[0].getBoundingClientRect().top - document.getElementsByClassName('paper-hook')[0].getBoundingClientRect().top;
      slotHeight = parseInt(slotHeight); // 计算slot进来的东西的高度
      // 异步加载
      setTimeout(function () {
        document.getElementsByClassName('paper-hook')[0].onscroll = function () {
          var paperHook = document.getElementsByClassName('paper-hook')[0];
          var title = document.getElementsByClassName('container-title')[0];
          var scrollTop = paperHook.scrollTop;
          if (slotHeight === 0) {
             // paper被卷去的高度
            if (scrollTop !== 0 && scrollTop >= 10) {
              title.style.top = (scrollTop) + 'px';
            } else { title.style.top = '0px'; }
          }
          else {
            if (scrollTop > slotHeight) {
//              if (scrollTop !== 0 && scrollTop >= 10) {
                title.style.top = (scrollTop - slotHeight) - 1 + 'px';
//              }
            }else { title.style.top = '0px'; }
          }
        }
      }, 0)
    },
    methods:{
      getData() {
        let that=this;
        that.loading=true;
        that.selected=[];
        this.data.refreshMethod(this.keywords, this.page.current, this.page.size).then(res => {
          that.page.total = res.total;
          that.tableData = res.info;
          that.loading = false;
        });
      },
      select(val){
        this.selected=val;
      },
      sizeChange(size){
        this.page.size = size;
        this.getData();
      },
      currentChange(current){
        this.page.current = current;
        this.getData();
      },
      searchEnter(keywords){
        this.keywords = keywords;
        this.page.current = 1;
        this.getData();
      },
      columnsButtonClick(method){
        method(this.selected);
      },
    },
    props: {
      data: {
        type: Object,
        default(){
          return {
            title:"标题",
            titleButton:[],
            refreshMethod:null,
            tableTitle:[],
            placewords: '',
            columnsOperation:{},
            tableSetting:{}
          };
        }
      },
      isNeedSearch: {
        type:Boolean,
        default:true
      }
    },
    components: {
      "list-table": ListTable,
      "pagination": Pagination,
      "user-search":UserSearch,
      "son-title": SonTitle
    }
  }
</script>
