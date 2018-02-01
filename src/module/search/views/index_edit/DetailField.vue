<template>
  <section class="container">
		<el-row class="title">
			<div class="top-title">
				<el-col :span="2"><span>序号</span></el-col>
				<el-col :span="8"><span>字段名称</span></el-col>
				<el-col :span="3"><span>类型</span></el-col>
				<el-col :span="5"><span>格式</span></el-col>
				<el-col :span="3"><span>分词</span></el-col>
				<el-col :span="3"><span>操作</span></el-col>
			</div>
		</el-row>
		<el-row class="field" v-for="(item,index) in fieldList">
			<div class="top-field" :id="index">
				<el-col :span="2">
					<div >
						<div class="arrow" :class="{'is-active': item.nestedShow}" v-show="item.field_type === 'nested'">
							<span class="el-icon-arrow-right" @click="getNestfield(index)"></span>
						</div>
						<span>{{index+1}}</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div>
						<el-input style="width:80%" v-model="item.field_name"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div>
						<el-select placeholder="" style="width:80%" v-model="item.field_type" @change="chooseType(index)">
							<el-option label="date" value="date"></el-option>
							<el-option label="string" value="string"></el-option>
							<el-option label="nested" value="nested"></el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="format" v-if="item.field_type === 'date'">{{item.format}}</div>
					<div style="opacity:0" v-else>1</div>
				</el-col>
				<el-col :span="3">
					<div v-if="item.field_type === 'string'">
						<el-select placeholder="" v-model="item.analyzer" style="width:80%" @change="chooseAnalyzer(index)">
							<el-option label="是" value="true"></el-option>
							<el-option label="否" value="false"></el-option>
						</el-select>
					</div>
					<div style="opacity:0" v-else>1</div>
				</el-col>
				<el-col :span="3">
					<div>
						<el-button type="text" @click="deleteFiled(index)">删除</el-button>
					</div>
				</el-col>
			</div>
			<div class="nested-field" v-show="item.field_type === 'nested' && item.nestedShow" ref="nestedList">
				<el-table :data="item.nest" style="margin-bottom:-1px" v-loading element-loading-text="拼命加载中">
					<el-table-column label="序号" type="index" show-overflow-tooltip align="center" width="90" >
					</el-table-column>
					<el-table-column label="字段名称"  show-overflow-tooltip align="center"  prop="filed_name">
						<template scope="scope">
							<el-input v-model="item.nest[scope.$index].field_name" style="width:80%"></el-input>
						</template>
					</el-table-column>
					<el-table-column  label="类型"  show-overflow-tooltip align="center"  prop="field_type">
						<template scope="scope">
							<el-select placeholder="" style="width:80%" v-model="item.nest[scope.$index].field_type" @change="chooseNestField(scope.$index,item.nest)">
								<el-option label="date" value="date"></el-option>
								<el-option label="string" value="string"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="format" label="格式"  show-overflow-tooltip align="center" >
						<template scope="scope" v-if="item.nest[scope.$index].field_type === 'date'">
							<div>{{item.nest[scope.$index].format}}</div>
						</template>
					</el-table-column>
					<el-table-column  label="分词"  show-overflow-tooltip align="center" prop="analyzer">
						<template scope="scope">
							<el-select placeholder="" v-model="item.nest[scope.$index].analyzer" style="width:80%" v-if="item.nest[scope.$index].field_type === 'string'" @change="chooseNestAnalyzer(scope.$index,item.nest)">
								<el-option label="是" value="true"></el-option>
								<el-option label="否" value="false"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="操作"  show-overflow-tooltip align="center">
						<template scope="scope">
							<el-button @click="deleteNestField(scope.$index,item.nest,index)" type="text" size="small">刪除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row class="plus">
					<div class="plus-button">
						<el-col :span="24">
							<div class="icon-plus" @click="addNestField(index)">
								<span class="el-icon-plus"></span>
							</div>
						</el-col>
					</div>
				</el-row>
			</div>
		</el-row>
		<el-row class="plus">
			<div class="plus-button">
				<el-col :span="24">
					<div class="icon-plus" @click="addField">
						<span class="el-icon-plus"></span>
					</div>
				</el-col>
			</div>
		</el-row>
		<div class="btn-group">
			<el-button >取消</el-button>
			<el-button type="primary" @click="sureSubmit" :disabled="buttonDisable">提交</el-button>
		</div>
	</section>
</template>
<script>
import * as srv from '../../api/service';
import utils from '../../common/js/utils.js'

	export default {
		data() {
			return{
				// showNestField:true, // 控制二级字段的显示或者隐藏
				fieldList:[],
				value1:'',
				value2:'',
				rowData: this.$route.query.indexForm,
			}
		},
		created () {
			console.log(this.isCreated);
			if(!this.isCreated) {
				this.getFieldList()
			}
		},
		methods: {
			/**
       * 获取该索引下的字段列表
       * */
      getFieldList() {
        let params = {
          keyword: this.rowData.index_name,
          page:'',
          size: this.rowData.total
        }
        srv.requestSearchIndex(params).then(res => {
					this.fieldList = utils.formatList(res.data.info[0].fields)
        })
      },
			/**
       * 显示/隐藏二级字段
       */
			getNestfield(index) {
				this.fieldList[index].nestedShow = this.fieldList[index].nestedShow ? false : true;
			},
			/**
       * 更改字段类型
       */
			chooseType(index) {
				if(this.fieldList[index].field_type === 'nested'){
					this.$set(this.fieldList,index,{
						field_name:this.fieldList[index].field_name,
						field_type:this.fieldList[index].field_type,
						nest:this.fieldList[index].nest,
						nestedShow:true
					})
					if(this.fieldList[index].nest.length === 0){
						this.fieldList[index].nest.push({
							field_name:'',
							field_type:'',
							format:'yyyy-MM-dd HH:mm:ss / epoch_millis',
							analyzer:'true'
						})
					}
					
				}else if(this.fieldList[index].field_type === 'date'){
					this.$set(this.fieldList,index,{
						field_name:this.fieldList[index].field_name,
						field_type:this.fieldList[index].field_type,
						format:'yyyy-MM-dd HH:mm:ss / epoch_millis',
						nest: this.fieldList[index].nest,
						nestedShow:this.fieldList[index].nestedShow
					})
				}else if(this.fieldList[index].field_type === 'string'){
					this.$set(this.fieldList,index,{
						field_name:this.fieldList[index].field_name,
						field_type:this.fieldList[index].field_type,
						nestedShow:this.fieldList[index].nestedShow,
						analyzer:this.fieldList[index].analyzer,
						nest: this.fieldList[index].nest
					})
				}
			},
			/**
       * 选择是否分词
       */
			chooseAnalyzer(index) {
				this.chooseType(index)
			},
			/**
       * 选择nest字段类型
       */
			chooseNestField(nestIndex,nest) {
				if(nest[nestIndex].field_type === 'date'){
					this.$set(nest,nestIndex,{
						field_name:nest[nestIndex].field_name,
						field_type:nest[nestIndex].field_type,
						format:'yyyy-MM-dd HH:mm:ss / epoch_millis',
					})
				}else if(nest[nestIndex].field_type === 'string') {
					this.$set(nest,nestIndex,{
						field_name:nest[nestIndex].field_name,
						field_type:nest[nestIndex].field_type,
						analyzer:nest[nestIndex].analyzer,
					})
				}
			},
			/**
       * 选择nest是否分词
       */
			chooseNestAnalyzer(nestIndex,nest){
				this.chooseNestField(nestIndex,nest)
			},
			/**
       * 新建字段
       */
			addField() {
				this.fieldList.push({
					field_name:'',
					field_type:'',
					format:'yyyy-MM-dd HH:mm:ss / epoch_millis',
					analyzer:'true',
					nest:[],
					nestedShow:false
				})
			},
			/**
       * 新建nested字段
       */
			addNestField(index) {
				this.fieldList[index].nest.push({
					field_name:'',
					field_type:'',
					format:'yyyy-MM-dd HH:mm:ss / epoch_millis',
					analyzer:'true'
				})
			},
			/**
       * 删除字段
       */
			deleteFiled(index) {
				this.$confirm("确定删除该字段","提示",{
					confirmButtonText: '是',
					cancelButtonText: '否',
					type: 'warning'
				}).then(() => {
					this.fieldList.splice(index,1)
				}).catch(() => {

				});
			},
			/**
       * 删除nested字段
       */
			deleteNestField(nestIndex,nest) {
				this.$confirm("确定删除该字段","提示",{
					confirmButtonText: '是',
					cancelButtonText: '否',
					type: 'warning'
				}).then(() => {
					nest.splice(nestIndex,1)
				}).catch(() => {

				});
			},
			/**
       * 确定创建索引
       */
			sureSubmit() {
				if(this.isCreated){
					let params = {
						index: this.data.index_name,
						process_type: this.data.process_type,
						desc:this.data.desc,
						item:utils.formatParams(this.fieldList)
					}
					srv.requestCreateIndex(params).then(res => {
						if(res.code === 0 && res.msg === 'ok'){
							this.$notify({
								type:'success',
								message:'新增索引成功',
							})
							this.$router.push('/search/indexmanagement')
						}else {
							this.$notify({
								type:'error',
								message:'新增索引失败',
							})
						}
					})
				}else {
					let params = {
						index: this.rowData.index_name,
						process_type: this.rowData.process_type === 'common' ? '0' : '1',
						desc:this.rowData.desc,
						item:utils.formatParams(this.fieldList)
					}
					srv.requestRebuildIndex(params).then(res => {
						if(res.code === 0 && res.msg === 'ok'){
							this.$notify({
								type:'success',
								message:'重建索引成功',
							})
							this.$router.push('/search/indexmanagement')
						}else {
							this.$notify({
								type:'error',
								message:'重建索引失败',
							})
						}
					})
				}
			},
		},
		props:{
      data: {
        type: Object,
        default(){
          return {};
        }
			},
			tableData: {
				type: Array,
				default() {
					return [];
				}
			},
			isCreated: {
				type: Boolean,
				default: false
			}
    },
	}
</script>
<style lang="less" scoped>
	.container{
		width: 100%;
		height: 100%;
		.title {
			margin-top: 20px;
			.top-title {
				font-size: 16px;
				font-weight: 0;
				text-align: center;
				background-color: #f6f6f6;
				color: #999999;
				height:43px;
				line-height:43px;
			}
		}
		.field {
			.top-field {
				height:43px;
				line-height:43px;
				text-align: center;
				background-color:#fff;
				margin: 5px 0 5px 0;
				font-size: 14px;
				font-weight: 200;
				color: #6a707d;
				.format {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
				}
				.arrow {
					display: inline-block;
					height: 100%;
					width: 30px;
					transition:transform .3s;
					cursor: pointer;
				}
				.is-active {
					-ms-transform:rotate(90deg);transform:rotate(90deg)
				}
			}
			.nested-field{
				width: 95%;
				margin: 0 auto;
				margin-left: 5%;
				// padding: 5px 20px 5px 20px;
			}
		}
		.plus{
			.plus-button{
				background-color: #f6f6f6;
				color: #999999;
				height:30px;
				line-height:30px;
				margin-top: 10px;
				.icon-plus{
					padding-left: 10px;
					height: 100%;
					width: 50px;
					cursor: pointer;
					span{
					color:#21b8d5;
					}
				}
			}
		}
		.btn-group {
      padding-top: 10px;
      text-align: center;
      button {
        width: 80px;
        height: 30px;
        line-height: 8px;
      }
    }
	}
</style>
