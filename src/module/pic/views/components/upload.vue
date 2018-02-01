<template>
	<div class="upload-box">
		<div class="upload-title">上传图片</div>
		<div id="mainUpload" class="upload-content-box">
			<span>目前平台只支持png，jpg图片格式上传,重名文件会被替换.</span>
			<div style="width: 100%;">
				<el-table id="pic_upload_table" :data="fileList" stripe style="width: 100%; height: 350px; overflow-y: scroll; overflow-x: hidden;">
					<el-table-column prop="filename" label="图片名称" width="180">
					</el-table-column>
					<el-table-column label="文件大小" width="180">
						<template slot-scope="scope">
							{{scope.row.filesizeStr}}
						</template>
					</el-table-column>
					<el-table-column prop="progress" label="上传进度">
						<template slot-scope="scope">
							<div v-if="scope.row.fileStatus==0"><i></i><span>等待上传</span></div>
							<div v-if="scope.row.fileStatus==1">
								<div class="">{{scope.row.progress+"%("+scope.row.speed+"/s)"}}</div>
							</div>
							<div v-if="scope.row.fileStatus==2"><i></i><span>取消上传</span></div>
							<div v-if="scope.row.fileStatus==3 || scope.row.progress==100"><i></i><span>上传成功</span></div>
							<div v-if="scope.row.fileStatus==4"><i></i><span>上传失败</span></div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click.native.prevent="abortUpload(scope.$index)" type="text" size="small" v-if="scope.row.fileStatus==0||scope.row.fileStatus==1">取消</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="position-relative" style="padding-top: 12px;">
				<div class="display-inline-block">
					<el-button @click="clearSuccess()">清除成功记录</el-button>
					<el-button @click="clearFail()">清除失败记录</el-button>
				</div>
				<div class="display-inline-block upload-btn-box">
					<div class="el-upload el-upload--text upload-btn">
						<a href="javascript:;" class="file">继续上传
							<input title="请选择要上传的文件" id="fileInput" class="file-select-proxy" type="file" multiple="" size="100" @change="onFilesAdded">
						</a>
					</div>
					<el-button @click="close()" class="upload-btn upload-done-btn">完成</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const RETRY_LIMIT = 3; //每片失败重试次数
	const LIMIT_FILE_SIZE = 1 * 1024 * 1024 * 1024; //限制上传的单个文件大小(1 * 1024 * 1024 * 1024)
	import Vue from "vue"
	import * as srv from '../../api/service.js';
	import tool from '../../utils/tool';
	let token = "";
	export default {
		data() {
			return {
				fileList: [],
				uploading: false,
				uploadIndex: -1
			}
		},
		watch: {
			fileList: function(val, oldVal) {
				this.$parent.uploadTotal = this.fileList.length;
				this.watchWaiting();
			}
		},
		methods: {
			watchWaiting() {
				var waiting = 0;
				for(var i=0,ii=this.fileList.length;i<ii;i++) {
					if(this.fileList[i].fileStatus == 0 || this.fileList[i].fileStatus == 1) waiting++;
				}
				this.$parent.uploadingNum = waiting;
			},
			close() {
				this.$parent.showUpload = false;
				this.$parent.getPicList();
//				this.fileList = [];
			},
			upload() {
				if(this.uploading) {
					return;
				}
				if(this.fileList.length == 0) {
					return;
				}
				var that = this;
				var startTime = Date.now();
				var uploadItem = null;
				for(var i = 0, ii = that.fileList.length; i < ii; i++) { //获取最前面的上传图片
					if(that.fileList[i].progress != 100 && that.fileList[i].fileStatus != 4 && that.fileList[i].fileStatus != 2) {
						that.uploadIndex = i;
						uploadItem = that.fileList[i];
						break;
					}
				}
				if(!uploadItem) return;
				var uploadPart = function() {
					var partStateItem = null;
					var partItemIndex = -1;
					for(i = 0, ii = uploadItem.shares; i < ii; i++) {
						partStateItem = uploadItem.partStateArr[i];
						if(!partStateItem.isOK) {
							if(partStateItem.retryTimes == RETRY_LIMIT) {
								uploadItem.fileStatus = 4; //标记该文件上传失败
								that.watchWaiting();
								that.uploading = false;
								that.upload();
								return;
							}
//							uploadItem.speed = "10KB";
							partStateItem.retryTimes++;
							partItemIndex = i;
							uploadItem.fileStatus = 1; //标记该文件为上传中
							that.watchWaiting();
							break;
						}
					}
					if(partItemIndex == -1) {
						console.error("获取当前分片信息错误");
						that.uploading = false;
						that.upload();
						return;
					}
					(function(uploadItem) {
						that.uploading = true;
						var start = (partItemIndex) * uploadItem.shardsize;
						var end = start + uploadItem.shardsize;
						//最后一片不需要end来计算
						var data = (partItemIndex == uploadItem.shares - 1) ? uploadItem.item.slice(start) : uploadItem.item.slice(start, end);
						var formData = new FormData();
						formData.append("appid", JSON.parse(sessionStorage.getItem("tenantInfo")).appid);
						formData.append("appkey", JSON.parse(sessionStorage.getItem("tenantInfo")).appkey);
						formData.append("imageid", uploadItem.imageid);
						formData.append("shardindex", partItemIndex);
						formData.append("data", data);

						function createxmlHttpRequest() {
							if(window.ActiveXObject) {
								return new ActiveXObject("Microsoft.XMLHTTP");
							} else if(window.XMLHttpRequest) {
								return new XMLHttpRequest();
							}
						}
						var request = createxmlHttpRequest();
						request.open("POST", "http://123.58.34.245:12420/mimg/v1/image/webshard");
						request.send(formData);
						request.onreadystatechange = function() {
							if(request.readyState == 4) {
								if(request.status == 200) {
									var res = JSON.parse(request.response);
									if(res.code === 0 && res.msg === 'ok') {
										var endTime = Date.now();
										uploadItem.speed = tool.formatSize(parseInt(uploadItem.shardsize / (endTime - startTime) * 1000)); //多少b每秒
										partStateItem.isOK = true;
										uploadItem.okNum++;
										if(uploadItem.okNum == uploadItem.shares) { //该文件分片上传完毕
											uploadItem.fileStatus = 3; //标记该文件上传完成
											uploadItem.progress = 100;
											that.watchWaiting();
											that.$parent.getPicList();
											let finishParams = {
												imageid: uploadItem.imageid
											}
											srv.uploadDone(finishParams).then(finishRes => { //设置单个文件上传完成
												if(finishRes.code === 0 && finishRes.msg === 'ok') {

												}
											})
										} else {
											//更新上传百分比
											uploadItem.progress = parseInt((partItemIndex + 1) / uploadItem.partStateArr.length * 100);
										}
										that.uploading = false;
										that.upload();
									} else {
										that.uploading = false;
										that.upload();
										uploadItem.fileStatus = 4;
										that.watchWaiting();
										that.$notify.error({
											title: '错误',
											message: '上传失败'
										});
									}
								} else {
									that.uploading = false;
									that.upload();
									uploadItem.fileStatus = 4;
									that.watchWaiting();
									that.$notify.error({
										title: '错误',
										message: '上传失败'
									});
								}
							}
						}
					})(uploadItem);
				}
				if(uploadItem.imageid) {
					uploadPart();
				} else {
					let params = {
						//						appid: '10001',
						//						appkey: 'b9059f639a0b5130fec127f8e5139089',
						filename: uploadItem.filename,
						format: uploadItem.format,
						filesize: uploadItem.filesize,
						ruleid: "",
						public: ""
					}
					srv.getPicId(params).then(res => {
						if(res.code === 0 && res.msg === 'ok') {
							uploadItem.imageid = res.data.imageid;
							uploadItem.shares = res.data.shards;
							uploadItem.shardsize = res.data.shardsize;
							var partStateArr = [];
							for(var j = 0, jj = uploadItem.shares; j < jj; j++) { //设置每片是否上传完成变量
								partStateArr[j] = {
									retryTimes: 0,
									isOK: false
								};
							}
							uploadItem.partStateArr = partStateArr;
							uploadPart();
						} else {
							that.$notify({
								title: '警告',
								message: '图片上传失败：'+uploadItem.filename,
								type: 'warning'
							});
							uploadItem.fileStatus = 4; //标记该文件上传失败
							that.watchWaiting();
							that.uploading = false;
							that.upload();
						}
					})
				}
			},
			abortUpload(index) {
				var that = this;
				if(that.uploadIndex == index) {
					that.uploading = false;
					let params = {
						imageid: this.fileList[index].imageid
					}
					srv.abortUpload(params).then(finishRes => { //设置单个文件上传取消
						if(finishRes.code === 0 && finishRes.msg === 'ok') {
							that.fileList[index].fileStatus = 2;
							that.watchWaiting();
						}
					})
				} else {
					that.fileList[index].fileStatus = 2;
					that.watchWaiting();
				}
			},
			onFilesAdded(event) {
				if(!this.$parent.showUpload) {
					this.$parent.showUpload = true;
				}
				var that = this;
				var addFiles = event.target.files;
				for(var i = 0; i < addFiles.length; i++) {
					var item = addFiles[i];
					if(!item.size) {
						that.$notify({
							title: '警告',
							message: '图片大小为0，无法上传',
							type: 'warning'
						});
						continue;
					}
					if(item.size > LIMIT_FILE_SIZE) { //单个文件大小超过1G，过滤掉，不让上传
						that.$notify({
							title: '警告',
							message: '不允许上传超过1G大小的文件（' + item.name + '）',
							type: 'warning'
						});
						continue;
					}
					//                  jpg：0, png：1,bmp：2,gif：3
					if(!/\.(jpg|png|JPG|PNG|)$/.test(item.name)) {
						that.$notify({
							title: '警告',
							message: '不支持的图片格式',
							type: 'warning'
						});
						continue;
					}
					if(/\.(jpg|JPG)$/.test(item.name)) {
						var format = 0;
					}
					if(/\.(png|PNG)$/.test(item.name)) {
						var format = 1;
					}
					if(/\.(bmp|BMP)$/.test(item.name)) {
						var format = 2;
					}
					if(/\.(gif|GIF)$/.test(item.name)) {
						var format = 3;
					}
					var fileItem = {
						item: item,
						filename: item.name,
						format: format + "",
						filesize: item.size,
						filesizeStr: tool.formatSize(item.size),
						shares: 0, //分片数初始化为0
						shardsize: 0, //分片大小初始化为0
						partStateArr: [],
						okNum: 0, //上传成功的分片个数
						speed: 0,
						progress: 0,
						imageid: '',
						fileStatus: 0, //0:未上传，1：上传中，2：已取消，3：成功，4：失败
					};
					that.fileList.push(fileItem);
					var timeout = setTimeout(function() {
						clearTimeout(timeout);
						var table = document.getElementById("pic_upload_table");
						table.scrollTop = table.scrollHeight;
					}, 100);

				}
				if(!that.uploading) {
					that.upload();
				}
				var fileObj = document.getElementById('fileInput');
				that.clearInputFile(fileObj);
			},
			//清除file表单域，兼容各浏览器
			clearInputFile(f) {
				if(f.value) {
					try {
						f.value  =  '';  //for IE11, latest Chrome/Firefox/Opera...
					} catch(err) {
						console.log(err);
					}
					if(f.value) {  //for IE5 ~ IE10
						var  form  =  document.createElement('form'),
							 ref  =  f.nextSibling,
							 p  =  f.parentNode;
						form.appendChild(f);
						form.reset();
						p.insertBefore(f, ref);
					}
				}
			},
			clearSuccess() {
				for(var i = 0; i < this.fileList.length; i++) {
					if(this.fileList[i].fileStatus == 3) {
						this.fileList.splice(i, 1);
						i--;
					}
				}
			},
			clearFail() {
				for(var i = 0; i < this.fileList.length; i++) {
					if(this.fileList[i].fileStatus == 2 || this.fileList[i].fileStatus == 4) {
						this.fileList.splice(i, 1);
						i--;
					}
				}
			}
		},
		mounted() {
			if(JSON.parse(sessionStorage.getItem("user")))
				token = JSON.parse(sessionStorage.getItem("user")).token;
		}
	}
</script>

<style scoped>
	.position-relative {
		position: relative;
	}
	
	.upload-box {
		width: 60%;
		left: 20%;
		top: 20%;
		position: fixed;
		z-index: 100;
		top: 20%;
		background-color: #FFFFFF;
		border-radius: 4px;
	}
	
	.upload-content-box {
		padding: 10px;
	}
	
	.upload-content-box .el-table::before {
		height: 0;
	}
	
	.upload-title {
		background-color: #FAFAFA;
		padding: 10px;
		border-radius: 4px;
	}
	
	.display-inline-block {
		display: inline-block;
	}
	
	.upload-btn {
		width: 116px;
		height: 36px;
	}
	
	.upload-btn-box {
		width: 240px;
		position: absolute;
		right: 0;
	}
	
	.upload-done-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.file {
		position: relative;
		display: inline-block;
		background: #D0EEFF;
		border: 1px solid #20a0ff;
		border-radius: 4px;
		/*padding: 4px 12px;*/
		overflow: hidden;
		text-decoration: none;
		text-indent: 0;
		line-height: 36px;
		width: 116px;
		text-align: center;
		color: #fff;
		background-color: #20a0ff;
	}
	
	.file input {
		position: absolute;
		font-size: 100px;
		right: 0;
		top: 0;
		opacity: 0;
	}
	
	.file:hover {
		background: #4db3ff;
		border-color: #4db3ff;
		color: #fff;
		text-decoration: none;
	}
	
	.file-size {
		position: absolute;
		right: 10%;
		top: 0;
	}
	
	.speed {
		position: absolute;
		right: 23%;
		top: 0;
	}
	
	.normal-a {
		text-decoration: none;
		cursor: default!important;
		color: #48576a!important;
	}
	
	.showIt {
		display: inline-block !important;
	}
	
	.hideIt {
		display: none;
	}
	
	.upload-expire-a:hover {
		color: #48576a !important;
	}
</style>