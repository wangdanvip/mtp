<template>
	<div style="overflow: hidden;">
	<paper>
	<div id="pic_app">
		<div class="wrap">
			<div id="pic_open_tittle">
				<son-title :headTitle="headTitle"></son-title>
			</div>
			<div id="pic_app_list">
				<!-- <el-button id="newCreateApp" size="small" type="primary" @click="createApp()" :disabled="isable">&nbsp;创建应用&nbsp;</el-button> -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="appid" label="应用ID" min-width="100px">
						<template scope="scope">
							<input type="text" :value='scope.row.appid' readonly name="" id="appId" style="opacity:0;position:absolute;top:0;" />
							<el-tooltip placement="top" style='position: relative;' popper-class="liheight" :visible-arrow="false">
								<p style="cursor: pointer;margin-bottom: -5px;margin-top: -2px;" slot="content" type="primary" @click="mouseEnter('appId')" size="mini">复制</p>
								<span id="" style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
		        		  	{{scope.row.appid}}
		        		  </span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="appkey" label="密钥" min-width="100">
						<template scope="scope">
							<input type="text" :value='scope.row.appkey' readonly name="" id="appKey" style="opacity:0;position:absolute;top:0;z-index: -1;" />
							<el-tooltip placement="top" style='position: relative;float: left;width: 70%;' popper-class="liheight" :visible-arrow="false">
								<p style="cursor: pointer;margin-bottom: -5px;margin-top: -2px;" slot="content" type="primary" @click="mouseEnter('appKey')" size="mini">复制</p>
								<span id="" v-if='!hide' style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
		        		  	{{scope.row.appkey}}
		        		  </span>
								<span id="" v-if='hide' style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
		        		  	.........
		        		  </span>
							</el-tooltip>
							<el-button type="primary" style='margin-right: 3px;float: right;' @click="hideShow" size="mini">{{hide?'显示':'隐藏'}}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" width="200">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="100">
						<template scope="scope">
							<span id="status_pic">
							{{scope.row.status==='1'?'启用中':'已禁用'}}
						</span>
						</template>
					</el-table-column>
					<!--<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-button type="text" size="small" @click="stopApp()">{{scope.row.status==='1'?'禁用':'启用'}}</el-button>
					</template>
				</el-table-column>-->
				</el-table>
			</div>
		</div>
	</div>
	</paper>
	</div>
</template>

<style lang="less" scoped>
  #pic_app {
		min-width: 780px;
		/*position: relative;
		padding: 20px 20px;
		margin: 0 auto;*/
		.wrap {
			/*position: absolute;
			left: 20px;
			top: 20px;
			right: 20px;
			bottom: 20px;*/
			/*margin-top: 19px;*/
			/*padding-bottom: 20px;
			margin-bottom: 20px;
			padding-left: 20px;
			padding-right: 20px;
			background-color: #FFFFFF;*/
		}
		#pic_open_tittle {
			width: 100%;
			height: 65px;
			/*padding: 1px 20px;*/
			padding-top: 1px;
			/*padding: 0 20px;*/
			text-align: left;
			p {
				margin-top: 16px;
				float: left;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
			#newCreateApp {
				line-height: 15px;
				margin-top: 16px;
				float: right;
				margin-right: 20px;
			}
		}
		#status_pic {
			color: #09c;
		}
		#pic_app_list {
			overflow-x: auto;
			width: 100%;
			/*margin-top: 20px;*/
			#newCreateApp {
				line-height: 15px;
				font-size: 14px;
				margin-bottom: 20px;
			}
		}
	}
</style>
  
<script>
	import Vue from 'vue';
  import ListTable from 'components/awesome/list_table/ListTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import ss from 'utils/session_storage_tool';
  import utils from '../utils/tool'

	export default{
		data() {
			return {
        hide: true,
				headTitle: {
          titleName: '应用管理', // 标题的名字
          isBack: false,    // 是否显示返回上一步的骚操作，可不传
          path: ''
        },
        tableData: [], // 表格数据
			}
    },
    created() {
      this.getPicList()
    },
    methods: {

      /**
       * 获取图片列表
       */
      getPicList() {
        this.tableData.push({
          appid: ss.getObject('tenantInfo').appid,
          appkey: ss.getObject('tenantInfo').appkey,
          create_time: utils.formatTime(ss.getObject('tenantInfo').create_time),
          status: ss.getObject('tenantInfo').status
        })
      },
      open(mesa) {
				this.$notify.success({
					title: '成功',
					message: mesa,
					offset: 100,
					duration: 1000
				});
			},
      mouseEnter (id) {
				let abcd = document.getElementById(id);
				abcd.select();
				document.execCommand('Copy');
				this.open('复制' + id + '成功')
      },
      hideShow () {
				if(this.hide) {
					this.hide = false;
				} else {
					this.hide = true;
				}
			},
    },
		components: {
			// "list-table": ListTable,
			"son-title": SonTitle,
			"paper": Paper
		}
	}
</script>