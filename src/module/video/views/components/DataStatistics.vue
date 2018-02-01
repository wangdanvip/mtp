<template>
	<div style="overflow: hidden;">
	<paper>
	<div id="video_data">
		<div class="wrap">
			<div id="video_open_tittle">
				<!--<p>数据统计</p>-->
				<!--<core-header :setting="setting"></core-header>-->
				<son-title :headTitle="headTitle"></son-title>
			</div>
			<div id="video_text">
				<i class="mf mf-smile"></i>
				<p>&nbsp;&nbsp;&nbsp;下期上线，敬请期待！！！</p>
			</div>
		</div>
	</div>
	</paper>
	</div>
</template>
<script type="text/ecmascript-6">
	import Bus from '../../api/bus';
	import CoreHeader from '../CoreHeader.vue';
	import son_title from 'components/awesome/son_title/SonTitle.vue';
	import Paper from 'components/awesome/paper/Paper.vue';
	//import Vue from 'vue'
	//import VueRouter from 'vue-router';
	//import routes from 'src/router';
	//import Bus from 'common/api/bus';
	//	const router = new VueRouter({
	//	  // mode: 'history',
	//	  routes
	//	})
	export default {
		data() {
			return {
				setting: {
					title: '数据统计'
				},
				headTitle: {
				   titleName: '数据统计', // 标题的名字
				   isBack: false    // 是否显示返回上一步的操作，可不传
				},
			}
		},
		methods: {},
		created() {
			//	    	if (window.sessionStorage.videoappid === '' || !window.sessionStorage.videoappid || window.sessionStorage.videoappkey === '' || !window.sessionStorage.videoappkey) {
			//	    		router.push({
			//				path: '/home/video/app/appmanage'
			//			});
			//	    	}
		},
		components: {
			'core-header': CoreHeader,
			'son-title': son_title,
			'paper': Paper
		},
		mounted() {
			let that = this;
			window.sessionStorage.video_File = window.sessionStorage.videoFile;
			Bus.$on('videoFlieAll', function(msg) {
				Bus.$emit('videoFileSelect', msg);
			})
			Bus.$on('fileTime', function(msg) {
				Bus.$emit('getfileTime', msg);
			})
		}
	}
</script>
<style lang="less" scoped>
	#video_data {
		/*position: relative;
		padding: 0px 20px;
		margin: 0 auto;*/
		.wrap {
			/*position: absolute;
			left: 20px;
			top: 20px;
			right: 20px;
			bottom: 20px;*/
			/*margin-top: 19px;
			padding-bottom: 20px;
			margin-bottom: 20px;
			padding-left: 20px;
			padding-right: 20px;
			background-color: #FFFFFF;*/
		}
		#video_open_tittle {
			width: 100%;
			padding-top: 1px;
			height: 60px;
			text-align: left;
			p {
				margin-top: 16px;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
		}
		#video_text {
			text-align: center;
			width: 400px;
			margin: 100px auto;
			i {
				font-size: 80px;
			}
			p {
				margin-top: 20px;
				font-size: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>