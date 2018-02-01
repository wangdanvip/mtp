<template>
	<div style="overflow: hidden;">
		<paper>
			<son-title :headTitle="headTitle"></son-title>
      <div>
        <span style="color: #6a707d">Bucket选择:</span>
        <el-select v-model="selectValue" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="bnt">
        <span style="color: #6a707d">选择时间:</span>
        <el-button class="timeLag" style="margin-left: 0px" size="small" @click="funTime(0)">1小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(1)">6小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(2)" :autofocus="true">12小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(3)">1天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(4)">7天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(5)">15天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(6)">30天</el-button>
        <el-date-picker
          style="margin-left: 8px"
          v-model="timeRange"
          size="small"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="chartGroup1">
        <p class="smallTitle" @click="funShowChart1" title="显示/隐藏" style="cursor:pointer;"><span :class="{transform: showChart1}" style="display: inline-block"><i class="el-icon-caret-right colorRed"></i></span>使用流量  <span style="color: #6a707d">近30天</span></p>
        <div class="line_chart"></div>
        <div v-show="showChart1">
          <div id="useWrite" class="table-left" ></div>
          <div id="useRead" class="table-right"></div>
        </div>
      </div>
      <div class="chartGroup2">
        <p class="smallTitle" @click="funShowChart2" title="显示/隐藏" style="cursor:pointer;"><span :class="{transform: showChart2}" style="display: inline-block"><i class="el-icon-caret-right colorRed"></i></span>请求量  <span style="color: #6a707d">近30天</span></p>
        <div class="line_chart"></div>
        <div v-show="showChart2">
          <div id="requestWrite" class="table-left" ></div>
          <div id="requestRead" class="table-right"></div>
        </div>
      </div>
      <div class="chartGroup3">
        <p class="smallTitle" @click="funShowChart3" title="显示/隐藏" style="cursor:pointer;"><span :class="{transform: showChart3}" style="display: inline-block"><i class="el-icon-caret-right colorRed"></i></span>HTTP请求成功率  <span style="color: #6a707d">近30天</span></p>
        <div class="line_chart"></div>
        <div v-show="showChart3">
          <div id="httpWrite" class="table-left" ></div>
          <div id="httpRead" class="table-right"></div>
        </div>
      </div>
		</paper>
	</div>
</template>

<script>
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import son_title from 'components/awesome/son_title/SonTitle.vue';
	import Paper from 'components/awesome/paper/Paper.vue';
  import echarts from 'echarts';

	export default {
		data() {
			return {
				headTitle: {
					titleName: '监控报表', // 标题的名字
					isBack: false // 是否显示返回上一步的操作，可不传
				},
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: 'test-bucket1'
        }, {
          value: '选项3',
          label: 'test-bucket2'
        }],
        selectValue: '选项1',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeRange:'',
        showChart1:true,
        showChart2:true,
        showChart3:true,
        color: [
          ['rgba(224,4,52, 0.3)', 'rgba(224,4,52, 0)', 'rgb(224,4,52)', 'rgba(224,4,52,0.27)'],
          ['rgba(27, 107, 155, 0.3)', 'rgba(27, 107, 155, 0)', 'rgb(27, 107, 155)', 'rgba(27, 107, 155,0.27)'],
          ['rgba(36, 144, 66, 0.3)', 'rgba(36, 144, 66, 0)', 'rgb(36, 144, 66)', 'rgba(36, 144, 66,0.27)'],
          ['rgba(239, 179, 4, 0.3)', 'rgba(239, 179, 4, 0)', 'rgb(239, 179, 4)', 'rgba(239, 179, 4,0.27)'],
          ['rgba(147, 67, 131, 0.3)', 'rgba(147, 67, 131, 0)', 'rgb(147, 67, 131)', 'rgba(147, 67, 131,0.27)'],
          ['rgba(266, 112, 60, 0.3)', 'rgba(266, 112, 60, 0)', 'rgb(266, 112, 60)', 'rgba(266, 112, 60,0.27)'],
          ['rgba(101, 188, 232, 0.3)', 'rgba(101, 188, 232, 0)', 'rgb(101, 188, 232)', 'rgba(101, 188, 232,0.27)'],
          ['rgba(224, 101, 152, 0.3)', 'rgba(224, 101, 152, 0)', 'rgb(224, 101, 152)', 'rgba(224, 101, 152,0.27)'],
          ['rgba(117, 160, 154, 0.3)', 'rgba(117, 160, 154, 0)', 'rgb(117, 160, 154)', 'rgba(117, 160, 154,0.27)']
        ],
        value: [
          [20, 30, 40, 50, 10, 70, 60],
          [40, 20, 10, 60, 30, 10, 50],
          [70, 40, 50, 20, 50, 80, 20],
          [40, 60, 60, 10, 60, 90, 70],
          [50, 10, 70, 80, 70, 20, 10],
          [10, 30, 50, 30, 10, 30, 10],
          [30, 20, 30, 20, 40, 30, 50],
          [60, 50, 60, 50, 60, 50, 60],
          [70, 50, 70, 50, 70, 60, 80]
        ],
        nameList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
        series: [],
        legend: []
			}
		},
		computed: {

		},
		methods: {
      // 显示隐藏
      funShowChart1(){
        this.showChart1 = !this.showChart1;
      },
      funShowChart2(){
        this.showChart2 = !this.showChart2;
      },
      funShowChart3(){
        this.showChart3 = !this.showChart3;
      },
      getLegend () {
        let selected = []
        for (let i = 0, ii = this.nameList.length; i < ii; i++) {
          var temp = `this.nameList[i]:true`
          selected = selected.concat(temp)
        }
        var legend = {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.nameList,
          selected: selected,
          right: '4%',
          bottom: '2%',
          textStyle: {
            fontSize: 12,
            color: '#62c0e0'
          }
        }
        this.legend = legend
      },
      getSeries () {
        let series = []
        for (let i = 0, ii = this.value.length; i < ii; i++) {
          let temp = [{
            name: this.nameList[i],
            type: 'line',
            smooth: true, //  平滑曲线
            symbol: 'circle', //  鼠标标记图形
            symbolSize: 5, //  鼠标标记图形大小
            showSymbol: false, //  显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //  面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0]
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //  折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.value[i]
          }]
          series = series.concat(temp)
        }
        this.series = series
      },
      drawGraph () {
        var myChart1 = echarts.init(document.getElementById('useWrite'));
        var myChart2 = echarts.init(document.getElementById('useRead'));
        var myChart3 = echarts.init(document.getElementById('requestWrite'));
        var myChart4 = echarts.init(document.getElementById('requestRead'));
        var myChart5 = echarts.init(document.getElementById('httpWrite'));
        var myChart6 = echarts.init(document.getElementById('httpRead'));
        window.onresize = function () {
          myChart1.resize();
          myChart2.resize();
          myChart3.resize();
          myChart4.resize();
          myChart5.resize();
          myChart6.resize();
        };
        // window.onresize = myChart.resize
        myChart1.showLoading();
        myChart2.showLoading();
        myChart3.showLoading();
        myChart4.showLoading();
        myChart5.showLoading();
        myChart6.showLoading();
        //  set
        try {
          myChart1.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        try {
          myChart2.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        try {
          myChart3.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        try {
          myChart4.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        try {
          myChart5.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        try {
          myChart6.setOption({
            //  option的配置开始
            title: { //  标题
              text: '这是标题',
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0f0f0f'
              }
            },
            tooltip: { //  提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: this.legend,
            grid: { //  绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //  X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            yAxis: [{ //  Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //  轴线
                lineStyle: {
                  color: '#75a09a'
                }
              },
              axisLabel: { //  文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //  栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //  系列配置
            series: this.series
            // 以上为option的配置结束
          })
        } catch (e) {
          console.log(e + '报错啦')
        }
        myChart1.hideLoading();
        myChart2.hideLoading();
        myChart3.hideLoading();
        myChart4.hideLoading();
        myChart5.hideLoading();
        myChart6.hideLoading();
      }
		},
		components: {
			'son-title': son_title,
			'paper': Paper
		},
		created() {

		},
    mounted () {
      this.getSeries();
      this.getLegend();
      this.drawGraph()
    }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .bnt
    margin-top 20px
    .timeLag
      margin-left 8px
      width 75px
  .smallTitle
    font-size 14px
    font-weight 700
    margin-top 40px
    clear both
  .colorRed
    margin-right: 5px
    color: #0099cb
  .line_chart
    width 100%
    height 1px
    background-color #21B8D5
    margin-top 10px
    margin-bottom 20px
  .table-left
    height 320px
    width 47%
    border 1px solid #cecece
    float left
    margin-right 20px
    margin-bottom 40px
  .table-right
    height 320px
    width 47%
    border 1px solid #cecece
    float right
    /*margin-right 20px*/
    margin-bottom 40px
  .transform
    -ms-transform rotate(90deg)
    transform rotate(90deg)
  .transform
    margin-right 8px
    transition transform .3s
</style>
