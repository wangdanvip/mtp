<template>
  <section class="home-wrapper">
  	<mask-component v-show="showUpload"></mask-component>
  	<upload ref="$uploadPanel" v-show="showUpload"></upload>
    <paper>
      <div>
        <son-title :headTitle="headTitle"></son-title>
        <div class="btn">
          <el-button @click="showUploadPanel">上传图片</el-button>
					<el-button @click="deleteImg()" :disabled="moreChoose">删除</el-button>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            placeholder="请输入搜索时间范围"
            align="right"
            >
          </el-date-picker>
          <user-search style="float: right;width: 20%;" @search-enter="searchEnter" :value="keywords"
                      :placeword="placewords"></user-search>
        </div>
        <div>{{uploadTotal - uploadingNum}}/{{uploadTotal}} <span style="padding: 10px; color: #21B8D5; cursor: pointer;" @click="showUploadFn">上传进度</span></div>
        <div>
          <full-table :data="tableData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation" @select="select" ref="pic"></full-table>
        </div>
      </div>
      <div>
        <preview v-if="showPreview" @close-preview = "closePreview" @reload-list="getPicList" ref="childrenPreview"></preview>
      </div>
    </paper>
  </section>
</template>

<style lang="less" scoped>
  .home-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .btn {
      position: relative;
      padding-bottom: 20px;
      .el-date-editor{
        position: absolute;
        right: 21.5%;
        width: 30%;
      }
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
	import upload from "./components/Upload.vue"
	import maskComponent from "./components/MaskComponent.vue"
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
	import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import * as srv from '../api/service.js';
  import utils from '../utils/tool'
  import ss from 'utils/session_storage_tool';
  import Preview from "./components/preview.vue"

	export default{
		data() {
			return {
				uploadTotal: 0,
        uploadingNum: 0,
        showPreview:false,
				showUpload: false,//是否显示上传界面
        isModify: false, // 控制是否进入图片编辑界面
        isPreview: false, // 控制是否进入图片预览界面
        moreChoose: true, // 图片选中超过两个才能使用批量删除
        value:[], // 时间选择器的值
        time:[],
				headTitle: {
          titleName: '图片管理', // 标题的名字
          isBack: false,    // 是否显示返回上一步的操作，可不传
          path: '' // 点击返回上一页时跳转到指定页面，为空则返回上一页
        },
        placewords: '请输入搜索提示', // 搜索框的placeholder
        keywords: "",  // 搜索框的关键字
        tableData: [], // 表格数据
        tableSetting: {
          selection: true,
          index: false
        }, // 初始化表格的可选项和序号
        title: [
          {
            prop: 'img_name',
            label: '图片名称',
            type: 'operate',
            methods: {
              click: (index, row) => {
                ss.addItem("query",{isPreview:true,index:index,page:this.page});
                this.showPreview = true;
              }
            }
          },
          {
            prop: 'imgSize',
            label: '文件大小'
          },
          {
            prop: 'updateTime',
            label: '更新时间'
          }
				], // 配置表头
				columnsOperation:{
          title: "操作",
          align: "center",
          buttons:[{
            label: "管理",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                ss.addItem("query",{isModify:true,index:index,page:this.page})
                this.showPreview = true;
              }
            }
          },{
            label: "删除",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                this.selectedImgId.push(row.imageid)
                this.deleteImg()
              }
            }
          }]
        },
        page: {
          current: 1,
          size: 10,
          total: 0
        }, // 分页器选项
        selected: [],
        selectedImgId: []
			}
    },
    // 路由钩子，判断页面是否从管理图片中进去的。
    beforeRouteEnter: (to, from, next) => {
      if(from.path === '/pic/PicDeal' && from.query.showPreview === true){
        next( vm => {
          vm.showPreview = true
        })
      }else{
        next()
      }
    },
    created () {
      this.getPicList();
    },
    methods: {
    	showUploadFn() {
    		this.showUpload = true;
      },
      /**
       * 格式化时间格式
       */
      setTime(val) {
        var time = []
        for(let i = 0;i<val.length;i++){
          time[i] = Date.parse(String(val[i]))/1000
        }
        return time
      },
      /**
       * 搜索框返回的值
       */
      searchEnter(keywords) {
        this.keywords = keywords;
        this.page.current = 1;
        if(keywords !== '' && /\s*\S+/.test(keywords)){
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList(keywords);
          }
        }else{
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList()
          }
        }
      },
      /**
       * 获取图片列表
       */
      getPicList(keywords,begin,end) {
        let params = {
          appid : ss.getObject("tenantInfo").appid,
		      appkey : ss.getObject("tenantInfo").appkey,
          size: String(this.page.size),
          from: String((this.page.current-1)*this.page.size+1),
          begin: begin || '',
          end: end || '',
          keywords: keywords
        }
        srv.requstGetPicList(params).then(res => {
          if(res.code === 0 && res.msg === 'ok'){
            for(let i = 0;i<res.data.images.length;i++){
              res.data.images[i].imgSize = utils.formatSize(res.data.images[i].img_size);
              res.data.images[i].updateTime = utils.formatTime(res.data.images[i].modify_time)
            }
            this.tableData = res.data.images;
            this.page.total = res.data.total;
          }else{
            this.$notify({
              type:"error",
              message:"请求列表失败",
            })
          }
        })
      },
      /**
       * 删除图片
       */
			deleteImg() {
        let that = this;
        let promise = new Promise((resolve,reject) => {
          this.$confirm('是否删除选中项，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (!this.moreChoose) {
              for (var i = 0; i < this.selected.length; i++) {
                if (this.selected.indexOf(this.selected[i].imageid) == -1) {
                  this.selectedImgId.push(this.selected[i].imageid)
                }
              }
            }
            let params = {
              imageid:this.selectedImgId
            }
            srv.requestDeletePic(params).then(res => {
              if (res.code === 0) {
                this.$notify({
                  type: 'success',
                  message: '删除成功'
                });
                resolve(res)
              }else {
                this.$notify({
                  type: 'error',
                  message: '删除失败'
                });
                reject();
              }
              that.selected = [];
              that.selectedImgId = [];
            });
          }).catch(() => {

          });
        })
        promise.then(
          () => {
            that.getPicList()
          },
          () => {

          }
        )
			},
      /**
       * 页码大小变
       */
      sizeChange(size) {
        
        this.page.size = size;
        if(this.keywords !== '' && /\s*\S+/.test(this.keywords)){
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(this.keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList(this.keywords);
          }
        }else{
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(this.keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList()
          }
        }
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        if(this.keywords !== '' && /\s*\S+/.test(this.keywords)){
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(this.keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList(this.keywords);
          }
        }else{
          if(!isNaN(this.setTime(this.value)[0]) && this.setTime(this.value).length>0){
            this.getPicList(this.keywords,String(this.setTime(this.value)[0]),String(this.setTime(this.value)[1]));
          }else{
            this.getPicList()
          }
        }
      },
      /**
       * 勾选的值
       */
      select(val){
        this.selected=val;
        if(this.selected.length>0){
          this.moreChoose = false;
        }else{
          this.moreChoose = true;
        }
        
      },
      showUploadPanel() {
      	document.getElementById("fileInput").click();
      },
      closePreview (val) {
        this.showPreview = val;
      }
    },
		components: {
			upload,
			maskComponent,
			"full-table": FullTable,
			"user-search": UserSearch,
			"son-title": SonTitle,
      "paper": Paper,
      "preview": Preview
		}
	}
</script>