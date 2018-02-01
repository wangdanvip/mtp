<<template>
  <section class="search-content">
		<el-tabs v-model="activeName" @tab-click="chooseTab">
			<el-tab-pane label="产品概述" name="first" class="first-pane">
				<div class="pro-introduce">
					<div class="text-introduce">
						<span>
							美的搜索引擎是美的IT共享技术独立研发的大规模分布式搜索引擎平台，提供了丰富的全文检索功能，包含模糊搜索，精准匹配，范围过滤，关键字高亮显示等功能，未来将提供更多优化功能。目前已经承载了美的MIP公文系统、KMS系统、美的说吧和美的云网盘等业务系统，现面向所有美的业务系统开放，全面支持美的业务系统搜索功能。
						</span>
					</div>
					<div class="image-introduce">
						<ul>
							<li>
								<div class="img-content"><img src="/static/images/cloudDataImg/videoorder1_07.png"></div>
								<div class="img-desc">
									<p class="title">稳定</p>
									<p>系统可用性达99.9%</p>
									<p>数据持久性达99.9%</p>
									<p>自动检测故障与恢复</p>
								</div>
							</li>
							<li>
								<div class="img-content"><img src="/static/images/cloudDataImg/videoorder1_11.png"></div>
								<div class="img-desc">
									<p class="title">高效</p>
									<p>单应用千万级别文档搜索</p>
									<p>低查询延迟 高QPS</p>
								</div>
							</li>
							<li>
								<div class="img-content"><img src="/static/images/cloudDataImg/cloudcontrol_05.png"></div>
								<div class="img-desc">
									<p class="title">安全</p>
									<p>用户级别数据隔离</p>
									<p>用户级别访问控制和权限管理</p>
									<p>数据冗余备份</p>
								</div>
							</li>
							<li>
								<div class="img-content"><img src="/static/images/cloudDataImg/objectstore_03.png"></div>
								<div class="img-desc">
									<p class="title">便捷</p>
									<p>支持控制台手动和API自动创建索引</p>
									<p>Restful开放API，快速对接</p>
								</div>
							</li>
							<div style="clear:both"></div>
						</ul>
					</div>
				</div>
    </div>
			</el-tab-pane>
			<el-tab-pane label="产品功能" name="second" class="second-pane">
				<div class="fn-point">
					<p class="title">灵活便捷：索引自由创建，动态修改</p>
					<p class="text">将应用结构简单化、定制化，用户可以通过可视化界面，自由配置业务索引的字段及属性，也可以通过接口直接推送数据自动创建索引</p>
				</div>
				<div class="fn-point">
					<p class="title">数据对接：支持多种接入方式，实时同步</p>
					<p class="text">支持API/SDK数据上传，数据实时同步，省时省力！</p>
				</div>
				<div class="fn-point">
					<p class="title">数据处理：支持多索引查询</p>
					<p class="text">通过简单操作即可完成多索引业务查询，复杂业务再也不用担心享受不到开放的便捷了</p>
				</div>
				<div class="fn-point">
					<p class="title">智能排序：搜索结果支持智能排序</p>
					<p class="text">支持智能排序，可以根据业务需要，自行配置排序规则，简单、灵活，加速产品效果迭代</p>
				</div>
				<div class="fn-point">
					<p class="title">搜索调优：后续增加联想搜索等调优功能，持续提升用户搜索体验</p>
				</div>
			</el-tab-pane>
			<el-tab-pane label="典型应用场景" name="third" class="third-pane">
				<p class="title">数据检索的需求非常普遍，针对大量搜索的场景，可以通过美的云搜索引擎平台可以简化开发周期，减少成本，提升性能。</p>
				<table>
					<tr >
						<td class="scene">垂直社区搜索场景</td>
						<td class="scene-text">垂直社区基本以内容为主，包含网站本身的资讯、平台内容以及服务型论坛。搜索是这类场景的标配，对于快速找到符合用户需求的信息起着至关重要的作用。需求主要体现在对内容进行综合或者分频道的关键词检索，并提供相关性、时间、浏览量等维度的过滤及排序功能。</td>
					</tr>
					<tr>
						<td class="scene">数据分析类搜索场景</th>
						<td class="scene-text">ERP、物流、订单、日志及后台管理系统是企业基本设施环境，这些场景的共同特点是数据量大、检索及筛选条件复杂，数据库查询性能较差，使用搜索引擎可以满足功能及性能的双项保证。</td>
					</tr>
					<tr>
						<td class="scene">电商平台</th>
						<td class="scene-text">电商平台商品种类众多，信息量大，对搜索的依赖非常大，除了显式用户搜索关键词外，还会根据业务场景根据搜索形成产品推荐、产品售卖排行、配送范围等</td>
					</tr>
				</table>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    chooseTab(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less" scoped>
.search-content {
  width: 100%;
  height: 100;
  margin: 0;
  padding: 0;
  .el-tabs {
    .first-pane {
      .pro-introduce {
        margin-top: 10px;
        .text-introduce span {
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          text-align: left;
          line-height: 25px;
        }
        .image-introduce {
          padding-left: 20px;
          margin-top: 40px;
          width: 100%;
          height: 100%;
          text-align: center;
          ul li {
            list-style: none;
            float: left;
            width: 50%;
            margin-bottom: 60px;
						text-align: left;
						position: relative;
						height: 70px;
						.img-content{
							position: absolute;
							left: 0;
							top: 24px;
							img {
								margin-left: 0;
								width: 70px;
								height: 70px;
							}
						}
						.img-desc {
							height: 100%;
							width: 60%;
							position: absolute;
							right: 100px;;
							top: 0;
							p {
								font-weight: 400;
								font-size: 16px;
								line-height: 26px;
							}
							.title{
								font-size: 20px;
								font-weight: 700;
								margin-top: 20px;
							}
						}
          }
        }
			}
    }
    .second-pane {
      .fn-point {
        color: #333333;
        font-style: normal;
        margin-bottom: 40px;
        .title {
          font-size: 16px;
          font-weight: 700;
          height: 16px;
          line-height: 16px;
          margin-bottom: 16px;
        }
        .text {
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          height: 14px;
          line-height: 14px;
        }
      }
		}
		.third-pane{
			.title{
				font-size: 14px;
				font-weight: 400;
				text-align: left;
				margin-bottom: 25px;
				font-style: normal;
			}
			table{
				width:100%;
				height:500px;
				td {
					border: 2px solid #333333;
					vertical-align: middle;
					color: #333333;
				}
				.scene {
					width: 30%;
					font-size: 22px;
					font-weight: 700;
					font-style: normal;
					text-align: center;
				}
				.scene-text {
					font-size: 14px;
					font-weight: 400;
					line-height: 25px;
					text-align: left;
					padding-left: 20px;
				}
			}
		}
  }
}
</style>


