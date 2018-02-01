<template>
  <section class="container pic-box">
    <el-dialog :visible.sync="dialogFormVisible" size="large" top="0%" @close="cancel" :close-on-click-modal="false" :modal="false" >
			<div class="content" v-loading="inTheRequest" element-loading-text="图片加载中...">
				<el-row>
					<el-col :span="19" class="img-content">
						<div class="block">
							<el-carousel 
							ref="carouselDom"
							trigger="click"  
							:autoplay="false"
							height="600px" 
							:initial-index = "imgIndex"
							indicator-position = "none"
							arrow = "never">
								<el-carousel-item v-for="item in imgUrl" :key="item.data">
									<h3 >
										<div class="el-icon-arrow-left arrow"  @click="prevPic" v-if="isPreview || isModify"></div>
										<div class="el-icon-arrow-right arrow" @click="nextPic" v-if="isPreview || isModify"></div>
										<img :src="isRules ? item : 'data:image/'+item.format+';base64,'+item.data" ref="image" class="myImage" :style="getImgSize"/>
										</h3>
								</el-carousel-item>
							</el-carousel>
						</div>
					</el-col>
					<el-col :span="5">
						<!-- 新增编辑图片规则 -->
						<div class="edit-content img-rules" v-if="isRules">
							<div class="edit-title">{{isEdit ? '编辑' : '新增'}}图片处理规则</div>
							<el-form label-width="90px" label-position="left" :model="ruleForm" ref="ruleForm" >
								<el-form-item label="规则名称：" >
									<el-tooltip class="item" effect="dark" :content="ruleForm.ruleName" placement="top">
											<div v-if="isEdit" class="img_name" 
											style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
											{{ruleForm.ruleName}}</div>
									</el-tooltip>
									<el-input :maxlength="50" placeholder="请输入规则名称（50个字符以内）" v-model="ruleForm.ruleName" v-if="!isEdit"></el-input>
								</el-form-item>
								<el-form-item label="缩略方式：">
									<el-select placeholder="请选择缩略方式" style="width:45%" @change="chooseMore" v-model="ruleForm.ruleType">
										<el-option label="不使用缩略" value="0"></el-option>
										<el-option label="等比缩放" value="1"></el-option>
										<el-option label="固定宽高缩放" value="2"></el-option>
									</el-select>
									<el-select style="width:45%" @change="chooseSubType" v-model="ruleForm.ruleSubType" v-if="isDetail">
										<el-option label="只固定宽度" value="0"></el-option>
										<el-option label="只固定高度" value="1"></el-option>
										<el-option label="矩形内等比缩放" value="2"></el-option>
										<el-option label="矩形外等比缩放" value="3"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="缩略尺寸：" v-if="isSize">
									<el-input
									v-model="ruleForm.ruleWidth" 
									class="size" 
									type="number"
									placeholder="最大值为6666"
									@focus="showTriangle = true" 
									@blur="showTriangle = false"
									:disabled="widthDisabled">
										<template slot="prepend">宽</template>
										<template slot="append">
											<div class="triangle-box" v-if="!widthDisabled">
												<div class="triangle top width" @click="addValue($event)"></div>
												<div class="triangle bottom width" @click="minusValue($event)"></div>
											</div>
											px
										</template>
									</el-input>
									<el-input  
									v-model="ruleForm.ruleHeight" 
									class="size" 
									type="number"
									placeholder="最大值为6666"
									@focus="showTriangle = true" 
									@blur="showTriangle = false" 
									:disabled="heightDisabled">
										<template slot="prepend">高</template>
										<template slot="append">
											<div class="triangle-box" v-if="!heightDisabled">
												<div class="triangle top height" @click="addValue($event)"></div>
												<div class="triangle bottom height" @click="minusValue($event)"></div>
											</div>
											px
										</template>
									</el-input>
								</el-form-item>
								<el-form-item label="缩略限制：" >
									<el-select placeholder="请选择缩略限制"  v-model="ruleForm.ruleLimit" style="width:100%">
										<el-option label="不限制" value="0"></el-option>
										<el-option label="限制" value="1"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="保存格式：">
									<el-select placeholder="请选择保存格式" value="不限制"  v-model="ruleForm.format" style="width:100%">
										<el-option label="jpg" value="0"></el-option>
										<el-option label="png" value="1"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="图片尺寸：" v-if="ruleForm.ruleType !=='0'">
									<div v-if="isSize && !isDetail">
										{{ruleForm.ruleWidth+'px'+'*'+ruleForm.ruleHeight+'px'}}
									</div>
									<div v-if="ruleForm.ruleSubType==='0' && isDetail">
										{{ruleForm.ruleWidth+'px'+'*'+Math.round(ruleForm.ruleWidth*.75)+'px'}}
									</div>
									<div v-if="ruleForm.ruleSubType==='1' && isDetail">
										{{Math.round(ruleForm.ruleHeight/.75)+'px'+'*'+ruleForm.ruleHeight+'px'}}
									</div>
									<div v-if="ruleForm.ruleSubType==='2' && isDetail">
										{{ruleForm.ruleWidth/imgNaturalWidth>ruleForm.ruleHeight/imgNaturalHeight ? Math.round(imgNaturalWidth*(ruleForm.ruleHeight/imgNaturalHeight))+'px'+'*'+Math.round(imgNaturalHeight*(ruleForm.ruleHeight/imgNaturalHeight))+'px': Math.round(imgNaturalWidth*(ruleForm.ruleWidth/imgNaturalWidth))+'px'+'*'+Math.round(imgNaturalHeight*(ruleForm.ruleWidth/imgNaturalWidth))+'px'}}
									</div>
									<div v-if="ruleForm.ruleSubType==='3' && isDetail">
										{{ruleForm.ruleWidth/imgNaturalWidth < ruleForm.ruleHeight/imgNaturalHeight ? Math.round(imgNaturalWidth*(ruleForm.ruleHeight/imgNaturalHeight))+'px'+'*'+Math.round(imgNaturalHeight*(ruleForm.ruleHeight/imgNaturalHeight))+'px':Math.round(imgNaturalWidth*(ruleForm.ruleWidth/imgNaturalWidth))+'px'+'*'+Math.round(imgNaturalHeight*(ruleForm.ruleWidth/imgNaturalWidth))+'px'}}
									</div>
								</el-form-item>
								<el-form-item label="更新日期：" v-model="ruleForm.updateTime" v-if="isEdit">
									<div>{{ruleForm.updateTime}}</div>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="cancel">取 消</el-button>
								<el-button type="primary" @click="changeRules">确 定</el-button>
							</div>
						</div>
						<!-- 图片预览 -->
						<div class="edit-content img-preview" v-if="isPreview && previewImgForm.length > 0">
							<div class="edit-title">图片详情</div>
							<el-form label-width="90px" label-position="left" :model="previewImgForm[preIndex]">
								<el-form-item label="图片名称：" >
									<el-tooltip class="item" effect="dark" :content="previewImgForm[preIndex].imgName" placement="top">
												<div v-if="!editName" class="img_name" 
												style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
												{{previewImgForm[preIndex].imgName}}</div>
										</el-tooltip>
								</el-form-item>
								<el-form-item label="图片尺寸：" >
									<div>{{previewImgForm[preIndex].imgWidth}}px*{{previewImgForm[preIndex].imgHeight}}px</div>
								</el-form-item>
								<el-form-item label="文件大小：" >
									<div>{{previewImgForm[preIndex].imgSize}}</div>
								</el-form-item>
								<el-form-item label="更新日期：" >
									<div>{{previewImgForm[preIndex].updateTime}}</div>
								</el-form-item>
							</el-form>
						</div>
						<!-- 管理图片 -->
						<div class="edit-content img-manage" v-if="isModify && previewImgForm.length > 0">
							<div class="edit-title">图片管理</div>
							<el-form label-width="90px" label-position="left" :model="previewImgForm[preIndex]">
								<el-form-item label="图片名称：" >
									<div>
										<el-input v-if="editName" style="width: 80%" :maxlength="255" v-model="previewImgForm[preIndex].imgName"></el-input>
										<el-tooltip class="item" effect="dark" :content="previewImgForm[preIndex].imgName" placement="top">
												<div v-if="!editName" class="img_name" 
												style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
												{{previewImgForm[preIndex].imgName}}</div>
										</el-tooltip>
										
										<span class="change-edit" @click="modifyImgName" v-if="editName" >保存</span>
										<span class="change-edit" @click="editName = true" v-else>编辑</span>
									</div>
								</el-form-item>
								<el-form-item label="图片样式：" >
									<el-select placeholder="请选择缩略限制" v-model="imageForm.imgRule" value="666" @change="chooseRule">
										<el-option label="原图" key="666" value="666"></el-option>
										<el-option 
										v-for="item in options" 
										:key="item.value"
										:label="item.rule_name" 
										:value="item.ruleid"></el-option>
									</el-select>
									<div><span>说明：样式可在图片处理中设置</span><br><span class="change-edit" @click="goToRules">管理样式</span></div>
								</el-form-item>
								<el-form-item label="图片尺寸：" >
									<div>{{previewImgForm[preIndex].imgWidth}}px*{{previewImgForm[preIndex].imgHeight}}px</div>
								</el-form-item>
								<el-form-item label="文件大小：" >
									<div>{{previewImgForm[preIndex].imgSize}}</div>
								</el-form-item>
								<el-form-item label="更新日期：" >
									<div>{{previewImgForm[preIndex].updateTime}}</div>
								</el-form-item>
							</el-form>
						</div>
					</el-col>
				</el-row>
			</div>
    </el-dialog>
  </section>
</template>
<script>
	import * as srv from '../../api/service.js';
	import utils from '../../utils/tool.js'
	import ss from 'utils/session_storage_tool';

	export default {
		data() {
			return{
				inTheRequest: false,
				rules: [],
				preIndex: 0,//预览的index
				imgIndex:0,
				page: ss.getObject("query").page,
				isModify: ss.getObject("query").isModify, // 控制是否进入图片编辑界面
				isPreview: ss.getObject("query").isPreview, // 控制是否进入图片预览界面
				isRules: ss.getObject("query").isRules, // 控制是否进入规则界面
				isEdit: ss.getObject("query").isEdit , // 控制是否是编辑规则界面
				editName: false, // 编辑图片名称
				isDetail: false, // 控制是否显示详细缩略方式
				isSize: false, // 控制是否显示宽高输入框
				showTriangle: false, // 控制输入框内的三角形显示
				dialogFormVisible: true, // 整个弹窗的显示隐藏
				widthDisabled:false, // 控制宽度调节禁用
				heightDisabled:false, // 控制高度调节禁用
				options:[],
				ruleForm: {// 编辑规则页面的数据
					ruleName:'',
					ruleType:'', // 缩略方式
					ruleSubType:'', // 详细缩略
					ruleWidth:'', // 缩略宽度
					ruleHeight:'', // 缩略高度
					ruleLimit:'0', // 缩略限制
					format:'', // 格式
					ruleId:'', // 规则id
					updateTime:''
					
				},
				imageForm:{// 编辑图片页面的数据
					imgName:'',
					imgWidth:'',
					imgHeight:'',
					imgSize:'',
					updateTime:'',
					imgId:'',
					imgRule:'666'
				},
				previewImgForm: [],
				imgUrl:[], // 图片链接列表
				screenWidth: document.body.clientWidth, // 屏幕的宽度
				refreshmethod: this.detailRuleLoad,
				ruleIdLoad:this.useRuleId,// 依据详细规则参数下载图片的方法
				imgNaturalWidth:'',
				imgNaturalHeight:''
			}
		},
		created () {
			if(this.isRules){
				this.imgNaturalWidth='638';
				this.imgNaturalHeight='478';
				this.imgUrl = ['../../../../../static/images/picServiceImg/preview.jpg']
				if(this.isEdit) {
					this.ruleForm = {
						ruleId: ss.getObject("query").formData.ruleid,
						ruleName:ss.getObject("query").formData.rule_name,
						ruleType:ss.getObject("query").formData.rule_type, // 缩略方式
						ruleSubType:ss.getObject("query").formData.rule_sub_type, // 详细缩略
						ruleWidth:ss.getObject("query").formData.width, // 缩略宽度
						ruleHeight:ss.getObject("query").formData.height, // 缩略高度
						ruleLimit:ss.getObject("query").formData.limit, // 缩略限制
						format:ss.getObject("query").formData.format, // 格式
						updateTime:ss.getObject("query").formData.modify_time
					}
					this.chooseSubType();
				}
			}else{
				this.preIndex = ss.getObject("query").index+this.page.size*(this.page.current-1)
				this.getPicList((this.page.current-1)*this.page.size+1);
				if(this.isModify){
					this.getRuleList();
				}
			}
			this.chooseMore();
		},
		mounted () {
			// 改变浏览器窗口大小并监听
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
					that.screenWidth = window.screenWidth;
				})();
				
      }
		},
		watch: {
			/**
       * 监听屏幕高度发生改变
       */
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
					let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400);
        }
			},
			'ruleForm.ruleWidth':function(val) {
				if(val>6666){
					this.$notify({
						message:"宽度设置不能超过6666px",
						type:"warning"
					})
				}
			},
			'ruleForm.ruleHeight':function(val) {
				if(val>6666){
					this.$notify({
						message:"高度设置不能超过6666px",
						type:"warning"
					})
				}
			}
    },
		computed: {
			getImgSize:function(){
				var img = document.getElementsByClassName("myImage")[0];
				if(this.isRules){
					if(this.isSize && !this.isDetail){
						return {width:this.ruleForm.ruleWidth+'px',height:this.ruleForm.ruleHeight+'px'}
					}else if(this.isSize && this.isDetail){
						if(this.ruleForm.ruleSubType === '0'){
							return {width:this.ruleForm.ruleWidth+'px',height:this.ruleForm.ruleWidth*.75+'px'}
						}else if(this.ruleForm.ruleSubType === '1'){
							return {width:this.ruleForm.ruleHeight/.75+'px',height:this.ruleForm.ruleHeight+'px'}
						}else if(this.ruleForm.ruleSubType === '2'){
							if(this.ruleForm.ruleWidth/this.imgNaturalWidth>this.ruleForm.ruleHeight/this.imgNaturalHeight){
								return {width:this.imgNaturalWidth*(this.ruleForm.ruleHeight/this.imgNaturalHeight)+'px',height:this.imgNaturalHeight*(this.ruleForm.ruleHeight/this.imgNaturalHeight)+'px'}
							}else if(this.ruleForm.ruleWidth/this.imgNaturalWidth<this.ruleForm.ruleHeight/this.imgNaturalHeight){
								return {width:this.imgNaturalWidth*(this.ruleForm.ruleWidth/this.imgNaturalWidth)+'px',height:this.imgNaturalHeight*(this.ruleForm.ruleWidth/this.imgNaturalWidth)+'px'}
							}
						}else if(this.ruleForm.ruleSubType === '3'){
							if(this.ruleForm.ruleWidth/this.imgNaturalWidth<this.ruleForm.ruleHeight/this.imgNaturalHeight){
								return {width:this.imgNaturalWidth*(this.ruleForm.ruleHeight/this.imgNaturalHeight)+'px',height:this.imgNaturalHeight*(this.ruleForm.ruleHeight/this.imgNaturalHeight)+'px'}
							}else if(this.ruleForm.ruleWidth/this.imgNaturalWidth>this.ruleForm.ruleHeight/this.imgNaturalHeight){
								return {width:this.imgNaturalWidth*(this.ruleForm.ruleWidth/this.imgNaturalWidth)+'px',height:this.imgNaturalHeight*(this.ruleForm.ruleWidth/this.imgNaturalWidth)+'px'}
							}
						}
					}
				}else{
					if(this.previewImgForm[this.preIndex].imgWidth>this.previewImgForm[this.preIndex].imgHeight){
						return {width:this.previewImgForm[this.preIndex].imgWidth>this.screenWidth*.73 ? this.screenWidth*.73+'px': this.previewImgForm[this.preIndex].imgWidth+'px',height:this.previewImgForm[this.preIndex].imgWidth>this.screenWidth*.73 ? this.screenWidth*.73*(this.previewImgForm[this.preIndex].imgHeight/this.previewImgForm[this.preIndex].imgWidth) : this.previewImgForm[this.preIndex].imgHeight+'px'}
					}else{
						return {width:this.previewImgForm[this.preIndex].imgHeight>600 ? 600*(this.previewImgForm[this.preIndex].imgWidth/this.previewImgForm[this.preIndex].imgHeight)+'px': this.previewImgForm[this.preIndex].imgWidth+'px',height:this.previewImgForm[this.preIndex].imgHeight>600 ? '600px' : this.previewImgForm[this.preIndex].imgHeight+'px'}
					}
				}
			}
		},
		methods: {
			/***************************** 图片预览 ***************************/
			/**
       * 获取图片列表
       */
			getPicList() {
				let that = this;
				let promise = new Promise((resolve,reject) => {
					let params = {
						appid : ss.getObject("tenantInfo").appid,
						appkey : ss.getObject("tenantInfo").appkey,
						size: String(this.page.total),
					}	
					srv.requstGetPicList(params).then(res => {
						if(res.code === 0 && res.msg === 'ok'){
							for(let i = 0;i<res.data.images.length;i++){
								this.previewImgForm.push({
									imgName: res.data.images[i].img_name,
									imgHeight: res.data.images[i].height,
									imgWidth: res.data.images[i].width,
									imgSize: utils.formatSize(res.data.images[i].img_size),
									updateTime: utils.formatTime(res.data.images[i].modify_time),
									imgId: res.data.images[i].imageid,
									imgFormat: res.data.images[i].img_fmt
								});
							}
							resolve(this.previewImgForm)
						}else{
							this.$notify({
								type:"error",
								message:"请求列表失败",
							})
							reject()
						}
					})
				})
				promise.then(
					(res) => {
						that.refreshmethod(res[that.preIndex].imgId,res[that.preIndex].imgFormat).then(val => {
							if(val){
								if(that.imgUrl.length !== 0) {
									that.imgUrl[0]={
										data: val.data,
										format: val.format
									}
								}else{
									that.imgUrl.push(val);
								}
							}
						})
					},
					() => {

					}
				)
      },
			/**
       * 点击切换下一张图片
       */
			nextPic() {
				if(this.inTheRequest) return;
				let that = this;
				var carousel = this.$refs.carouselDom;
				if(this.preIndex<this.page.total-1){
						if(this.imageForm.imgRule !== '666'){
							this.imageForm.imgRule = '666'
						}
						this.refreshmethod(this.previewImgForm[this.preIndex+1].imgId,this.previewImgForm[this.preIndex+1].imgFormat).then(val => {
							if(val){
								if(that.imgUrl.indexOf(val) === -1){
									that.imgUrl.push(val)
								}else{
									carousel.next()
								}
								if(that.imgIndex<0){
									that.imgIndex = 0;
								}
								that.preIndex++;
								that.imgIndex++;
							}
						})
				}else{
					this.$notify({
						type:"info",
						message:"已到最后一张",
						title:"提示"
					})
				}
			},
			/**
       * 点击切换上一张图片
       */
			prevPic() {
				if(this.inTheRequest) return;
				let that = this;
				var carousel = this.$refs.carouselDom;
				if(this.preIndex>0){
						if(this.imageForm.imgRule !== '666'){
							this.imageForm.imgRule = '666'
						}
						this.refreshmethod(this.previewImgForm[this.preIndex-1].imgId,this.previewImgForm[this.preIndex-1].imgFormat).then(val => {
							if(val){
								if(that.imgUrl.indexOf(val) === -1){
									that.imgUrl.unshift(val);
								}else{
									carousel.prev()
								}
								that.imgIndex--;
								that.preIndex--;
							}
						})
				}else	{
					this.imgIndex = 0; 
					this.$notify({
						type:"info",
						message:"已到第一张",
						title:"提示"
					})
				}
			},
			/**
       * 获取规则列表
       */
			getRuleList() {
        let params = {
          size: '10000'
        }
				srv.requestSearchRules(params).then(res => {
					if(res.code === 0 && res.msg ==='ok'){
						this.options = res.data.rules;
					}
        })
			},
			/**
       * 根据规则详情下载图片
       */
			detailRuleLoad(val,val1) {
				let that = this;
				this.inTheRequest = true;
				let params = {
					imageid:val,
					rule_type:'0',
					format:val1,
					limit:'0',
					base64:'1'
				}
				return srv.requestDetailImgUpload(params).then(res => {
					if(res.code === 0){
						this.inTheRequest = false;
						if (res.data.format === 'jpg'){
							res.data.format = 'jpeg'
						}
						return res.data
					}else {
						setTimeout(function(){
							that.$notify({
								type: "error",
								message: "图片加载失败"
							})
							that.inTheRequest = false;
						},2000)
					}
				})
			},
			/**
       * 根据规则id下载图片
       */
			useRuleId(val,id) {
				let that = this;
				let params = {
					ruleid: id,
					imageid: val || this.previewImgForm[this.preIndex].imgId,
					base64:'1'
				}
				return srv.requestRuleImgUpload(params).then(res => {
					if(res.code === 0){
						this.inTheRequest = false;
						if (res.data.format === 'jpg'){
							res.data.format = 'jpeg'
						}
						return res.data
					}else {
						setTimeout(function(){
							that.$notify({
								type: "error",
								message: "图片加载失败"
							})
							that.inTheRequest = false;
						},2000)
					}
				})
			},
			/**
       * 选择规则
       */
			chooseRule(val) {
				let that = this;
				this.inTheRequest = true;
				if(this.imageForm.imgRule !== '666'){
					this.ruleIdLoad(this.previewImgForm[this.preIndex].imgId,val).then(res => {
						var img = document.getElementsByClassName("myImage")[that.imgIndex < 0 ? 0 : that.imgIndex];
						img.setAttribute("src", 'data:image/'+res.format+';base64,'+res.data);
						img.onload = function() {
							that.$set(that.previewImgForm,that.preIndex,{
								imgName: that.previewImgForm[that.preIndex].imgName,
								imgWidth: img.naturalWidth,
								imgHeight: img.naturalHeight,
								imgSize: that.previewImgForm[that.preIndex].imgSize,
								updateTime: that.previewImgForm[that.preIndex].updateTime,
								imgId: that.previewImgForm[that.preIndex].imgId,
								imgRule: that.previewImgForm[that.preIndex].imgRule
							})
							that.inTheRequest = false;
						}
					})
				}else{
					this.refreshmethod(this.previewImgForm[this.preIndex].imgId,this.previewImgForm[this.preIndex].imgFormat).then(res => {
						if(res){
							var img = document.getElementsByClassName("myImage")[that.imgIndex<0 ? 0 : that.imgIndex];
							img.setAttribute("src", 'data:image/'+res.format+';base64,'+res.data);
							img.onload = function() {
								that.$set(that.previewImgForm,that.preIndex,{
									imgName: that.previewImgForm[that.preIndex].imgName,
									imgWidth: img.naturalWidth,
									imgHeight: img.naturalHeight,
									imgSize: that.previewImgForm[that.preIndex].imgSize,
									updateTime: that.previewImgForm[that.preIndex].updateTime,
									imgId: that.previewImgForm[that.preIndex].imgId,
									imgRule: that.previewImgForm[that.preIndex].imgRule
								})
								that.inTheRequest = false;
							}
						}
					})
				}
			},
			/**
       * 修改图片名称
       */
			modifyImgName() {
				let that = this;
				let promise = new Promise ((resolve,reject) => {
					let params = {
						new_name: this.previewImgForm[this.preIndex].imgName,
						imageid: this.previewImgForm[this.preIndex].imgId
					}
					srv.requestResetImgName(params).then(res => {
						if(res.code === 0){
							this.$notify({
								type:'success',
								message:'修改成功'
							});
							resolve()
						}else{
							this.$notify({
								type:'error',
								message:'修改失败，图片名已存在'
							});
							reject()
						}
					})
					this.editName = false;
				})
				promise.then(
					() => {
						setTimeout(function(){that.$emit('reload-list')},1000)
					},
					() => {

					})
				
			},
			/**
       * 去规则管理界面
       */
			goToRules() {
				this.$router.push({path:'/pic/PicDeal',query:{showPreview:true}})
				ss.addItem("query",{isModify:true,index:this.preIndex,page:this.page,showPreview:true})
			},
			/***************************** 规则新建和修改 ***************************/
			/**
       * 选择缩略方式
       */
			chooseMore() {
				if(this.ruleForm.ruleType === '1'){
					this.isDetail = true;
					this.isSize = true;
				}else if(this.ruleForm.ruleType === '2'){
					this.isDetail = false;
					this.isSize = true;
				}else{
					this.isDetail = false;
					this.isSize = false;
				}
			},
			/**
       * 选择详细缩略方式
       */
			chooseSubType() {
				if(this.ruleForm.ruleSubType === '0'){
					this.widthDisabled = false;
					this.heightDisabled = true;
					this.ruleForm.ruleHeight = '0';
				}else if(this.ruleForm.ruleSubType === '1'){
					this.widthDisabled = true;
					this.heightDisabled = false;
					this.ruleForm.ruleWidth = '0';
				}else{
					this.widthDisabled = false;
					this.heightDisabled = false;
				}
			},
			/**
       * 新增/修改规则
       */
			changeRules() {
				var that = this;
				if(this.isEdit){
					let params = {
						ruleid: this.ruleForm.ruleId,
						rule_type: this.ruleForm.ruleType,
						rule_sub_type: this.ruleForm.ruleSubType,
						width: String(this.ruleForm.ruleWidth),
						height: String(this.ruleForm.ruleHeight),
						format: this.ruleForm.format,
						limit: this.ruleForm.ruleLimit
					}
					srv.requestModifyRules(params).then(res => {
						if(res.code ===0 && res.msg=== 'ok'){
							this.$notify({
								type:'success',
								message:'修改成功',
								title:'修改规则'
							})
							this.$emit('close-preview',false)
							this.$emit('refresh-list')
						}else{
							this.$notify({
								type:'error',
								message:'修改失败',
								title:'修改规则'
							})
						}
					})
				}else {
					let params = {
						rule_name: this.ruleForm.ruleName,
						rule_type: this.ruleForm.ruleType,
						rule_sub_type: this.ruleForm.ruleSubType,
						width: String(this.ruleForm.ruleWidth),
						height: String(this.ruleForm.ruleHeight),
						format: this.ruleForm.format,
						limit: this.ruleForm.ruleLimit
					}
					srv.requestAddRules(params).then(res => {
						if(res.code === 0 && res.msg === 'ok'){
							this.$notify({
								type:'success',
								message:'新增成功',
								title:'新增规则'
							})
							this.$emit('close-preview',false)
							this.$emit('refresh-list')
							
//							that.$parent.getRuleList();
						}else {
							this.$notify({
								type:'error',
								message:'新增失败',
								title:'新增规则'
							})
						}
					})
				}
			},
			/**
       * 点击上三角增加数字
       */
			addValue(event) {
				if(event.target.className === "triangle top width") {
					this.ruleForm.ruleWidth = Number(this.ruleForm.ruleWidth) + 1;
				}else if (event.target.className === "triangle top height") {
					this.ruleForm.ruleHeight = Number(this.ruleForm.ruleHeight) + 1;
				}
			},
			/**
       * 点击下三角减少数字
       */
			minusValue(event) {
				if(event.target.className === "triangle bottom width") {
					if(Number(this.ruleForm.ruleWidth) > 0){
						this.ruleForm.ruleWidth = Number(this.ruleForm.ruleWidth) - 1;
					}
				}else if (event.target.className === "triangle bottom height") {
					if(Number(this.ruleForm.ruleHeight) > 0){
						this.ruleForm.ruleHeight = Number(this.ruleForm.ruleHeight) - 1;
					}
				}
			},
			/****************************** 公共方法 **************************/
			/**
       * 关闭弹窗
       */
			cancel() {
				this.previewImgForm = [];
				this.imgUrl =[];
				this.inTheRequest = false;
				ss.removeItem("query");
				this.$emit('close-preview',false)
			},
		}
	}
</script>
<style lang="less" scoped>
	.content{
		padding: 0 0 20px 0;
		.img-content{
			padding: 10px 30px 0 10px;
			.el-carousel__item h3 {
				color: #475669;
				font-size: 14px;
				opacity: 0.75;
				position: relative;
				line-height: 600px;
				margin: 0;
				text-align: center;
				.arrow {
					padding: 0;
					line-height: 36px;
					width: 36px;
					height: 36px;
					color: #ffffff;
					position: absolute;
					border-radius: 50%;
					background-color: rgba(31,45,61,.11);
					top:50%;
					font-size: 20px;
					vertical-align: middle;
					z-index: 10;
					cursor: pointer;
				}
				.el-icon-arrow-left{
					left: 20px;
				}
				.el-icon-arrow-right{
					right: 20px;
				}
				img {
					vertical-align: middle;
					max-height: 600px;
				}
			}
			.el-carousel__item:nth-child(2n) {
				background-color: #99a9bf;
			}
			
			.el-carousel__item:nth-child(2n+1) {
				background-color: #d3dce6;
			}
		}
		.edit-content {
			.edit-title {
				color: #ffffff;
				font-size: 20px;
				font-weight: 600;
				height: 80px;
				line-height: 80px;
			}
		}
		.img-rules {
			.el-form .el-form-item .size{
				position: relative;
				.triangle-box{
					position: absolute;
					left: -26px;
					top: 0;
					width: 24px;
					height: 33px;
					z-index: 1000;
					display: none;
					.triangle{
						width: 0;
						height: 0;
						border: 7px solid;
						position: absolute;
						left: 4px
					}
					.top {
						border-color: transparent transparent #bfd2d9 transparent;
						top: 1px;
					}
					.top:hover {
						border-color: transparent transparent #333333 transparent;
					}
					.bottom {
						border-color: #bfd2d9 transparent transparent transparent;
						top: 19px;
					}
					.bottom:hover {
						border-color: #333333 transparent transparent transparent;
					}
				}
			}
			.dialog-footer{
				.el-button{
					width: 30%;
				}
			}
		}
		
		.img-rules .el-form .el-form-item .size:hover .triangle-box {
			display: block;
		}
		.img-manage .el-form .el-form-item{
			.change-edit {
				color: #21b8d5;
				cursor: pointer;
			}
		}
	}
	.pic-box .content .img-content .el-carousel__item h3 {
			background-color: #333333 !important;
			opacity: 1;
	}
	.pic-box .content .img-content .el-carousel__item {
		background-color: #333333 !important;
	}
	
</style>