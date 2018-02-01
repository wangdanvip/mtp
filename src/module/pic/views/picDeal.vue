<template>
  <section class="home-wrapper">
    <paper>
      <div>
        <son-title :headTitle="headTitle"></son-title>
        <div class="btn">
          <el-button @click="createRule">新建规则</el-button>
          <user-search style="float: right;width: 20%;" @search-enter="searchEnter" :value="keywords"
                      :placeword="placewords"></user-search>
        </div>
        <div>
          <full-table :data="tableData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation" ref="pic"></full-table>
        </div>
        <div>
          <preview v-if="showPreview" @close-preview = "closePreview" @refresh-list = "getRuleList"></preview>
        </div>
      </div>
    </paper>
  </section>
</template>

<style lang="less" >
  .home-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .btn {
      padding-bottom: 20px;
      button {
        text-align: center;
        width: 80px;
        height: 30px;
        line-height: 8px;
      }
    }
  }
</style>

<script>
	import Vue from 'vue';
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
	import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import Preview from './components/preview.vue'
  import * as srv from '../api/service.js';
  import utils from '../utils/tool.js'
  import ss from 'utils/session_storage_tool';
	
	export default {
		data() {
			return {
        limitArr: ["不限制", "限制"],
        ruleSubtypeArr: ["固定宽度", "固定高度", "矩形内等比缩放", "矩形外等比缩放"],
        ruleTypeArr: ["不使用缩略", "等比缩放", "固定宽高缩放"],
        showPreview:false,
        isRules: false, // 控制进入新建规则界面
        isEdit:false, // 判断是否进入编辑规则界面
        value:'',
				headTitle: {
          titleName: '图片处理', // 标题的名字
          isBack: false,    // 是否显示返回上一步的骚操作，可不传
          path: ''
        },
        placewords: '请输入规则名称', // 占位符的字
        keywords: "",  // 搜索框的字
        tableData: [], // 表格数据
        tableSetting: {
          selection: false,
          index: false
        }, // 初始化表格的可选项和序号
        title: [
          {
            prop: 'rule_name',
            label: '规则名称'
          },
          {
            prop: 'rule_type_desc',
            label: '图片样式'
          },
          {
            prop: 'modify_time',
            label: '更新时间'
          }
				], // 配置表头
				columnsOperation:{
          title: "操作",
          align: "center",
          buttons:[{
            label: "编辑",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                // this.$router.push({ path:'/pic/components/preview'});
                ss.addItem("query",{isRules:true,isEdit:true,page:this.page,formData:row})
                this.showPreview = true;
              }
            }
          },{
            label: "删除",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                let that = this
                this.$confirm("是否确定删除该规则","提示",{
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {
                  let params = {
                    ruleid:row.ruleid
                  }
                  srv.requestDeleteRules(params).then(res => {
                    if(res.code === 0 && res.msg === 'ok'){
                      this.$notify({
                        type:'success',
                        message:'删除成功'
                      });
                    }
                  })
                  that.getRuleList();
                }).catch(() => {

                });
                
              }
            }
          }]
        },
        page: {
          current: 1,
          size: 10,
          total: 0
        } // 分页器选项
			}
    },
    created () {
      this.getRuleList()
    },
		methods: {
      /**
       * 搜索框返回的值
       */
      searchEnter(keywords) {
        this.keywords = keywords;
        this.page.current = 1;
        if (/^[a-z0-9_]+$/.test(keywords)) {
          this.getRuleList(keywords);
        } else {
          this.getRuleList();
        }
      },
			/**
       * 表格数据
       * */
			getRuleList(val) {
        let params = {
          size: String(this.page.size),
          from: String((this.page.current-1)*this.page.size+1),
          keywords: val
        }
				srv.requestSearchRules(params).then(res => {
          var rule_type_desc = [];
          this.tableData = res.data.rules;
          this.page.total = res.data.total;
          for(let i = 0;i<res.data.rules.length;i++){
            this.tableData[i].rule_type_desc = (this.tableData[i].limit?this.limitArr[this.tableData[i].limit]:"")+(this.tableData[i].rule_sub_type?","+this.ruleSubtypeArr[this.tableData[i].rule_sub_type]:"")+(this.tableData[i].rule_type?","+this.ruleTypeArr[this.tableData[i].rule_type]:"")
            this.tableData[i].modify_time = utils.formatTime(this.tableData[i].modify_time)
          }
        })
      },
      /**
       * 新建规则
       */
      createRule() {
        ss.addItem("query",{isRules:true,isEdit:false})
        this.showPreview = true;
      },
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        if (this.keywords !== '' || this.keywords) {
          this.getRuleList(this.keywords);
        } else {
          this.getRuleList();
        }
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        if (this.keywords !== '' || this.keywords) {
          this.getRuleList(this.keywords);
        } else {
          this.getRuleList();
        }
      },
      closePreview (val) {
        this.showPreview = val;
      }
		},
		components: {
			"full-table": FullTable,
			"user-search": UserSearch,
			"son-title": SonTitle,
      "paper": Paper,
      "preview": Preview
		}
	}
</script>
