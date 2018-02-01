<template>
  <section class="container">
    <whole-table :isNeedSearch="isNeedSearch" ref="wt" :data="data">
      <div slot="header">
        <div class="m-header">
          <complex-condition :condition="search" @submit="submit" @reset="reset"></complex-condition>
        </div>
      </div>
    </whole-table>
    <!--<router-view @hash="hash"></router-view>-->
    <router-view></router-view >
  </section>
</template>

<style lang="less" scoped>
  .m-header {
    width: 98%;
    min-height: 77px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    min-width: 400px;
    overflow-x: auto;
    border: 1px solid rgba(230, 228, 234, 1);
  }

  .elInput {
    width: 50% !important;
  }
</style>

<script>
  import * as srv from '../../../api/service';
  import ls from 'utils/local_storage_tool.js';
  import WholeTable from 'components/awesome/whole_table/WholeTable.vue';
  import ComplexCondition from 'components/awesome/complex_condition/ComplexCondition.vue';
  export default {
    created() {
      this.switchTableData();
    },
    data() {
      return {
        isNeedSearch: false,
        search: [  //------ComplexCondition组件的配置信息
          {
            type: 'el-input',
            label: '名称',
            placeholder: '请输入内容',
            model: '',
            method: {}
          },
          {
            type: 'el-select',
            label: '分类',
            placeholder: '请选择分类',
            model: '',
            items: [{
              label: '全部',
              value: '-1'
            },{
              label: '前端框架',
              value: '1'
            }, {
              label: '后端框架',
              value: '2'
            }, {
              label: '技术组件',
              value: '3'
            }],
            method: {}
          },
          {
            type: 'el-date-picker',
            pickType: 'daterange',
            label: '选择日期',
            placeholder: '请选择时间范围',
            model: '',
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
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            method: {}
          },
          {
            type: 'el-select',
            label: '审核状态',
            placeholder: '请选择状态',
            model: '',
            items: [{
              label: '全部',
              value: '-1'
            },{
              label: '待审核',
              value: '0'
            }, {
              label: '已发布',
              value: '1'
            }, {
              label: '已驳回',
              value: '2'
            }],
            method: {}
          }],
        data: {
          title: "产品管理",
          tableSetting: {
            selection: true,
          },
          refreshMethod: this.getPublishLists,
          tableTitle: [
            {
              prop: 'name',
              label: '名称'
            },
            {
              prop: 'publisher',
              label: '发布者'
            },
            {
              prop: 'cateId',
              label: '分类'
            },
            {
              prop: 'updateTime',
              label: '最后修改时间'
            },
            {
              prop: 'sortNum',
              label: '排序',
              type: 'input',
              minlength: 1,
              maxlength: 3,
              size: 'small',
              width: "120px",
              limit: 'number',
              methods: {
                // ----鼠标离开事件
                blur: (index, row) => {
                  if (this.tableData[index].sortNum != row.sortNum) {
                    this.changeNewWords(index, row);
                  }
                },
                //-----触发值改变的事件
                change: (index, row) => {
                  this.checkNum(index, row);
                },
                //-----回车事件
                keyup: (index, row) => {
                  if (this.tableData[index].sortNum != row.sortNum) {
                    this.changeOrder(index, row);
                  }
                }
              }
            },
            {
              prop: 'status',
              label: '审核状态',
              type: 'operate',
              colorConditionVal: ['已驳回', '已发布'],
              fontColor: ['red', '#6a707d'],
              methods: {
                click: (index, row) => {
                  let conditions = window.location.pathname.match('/module/management.html') && ls.getObject("user").roleFormat.admin && row.status === '待审核'
                  if (conditions) {
                    window.location.href = '/module/cloudproduct.html#/product_overview/?productId=' + row.productId;
                  } else {
                    return;
                  }
                }
              }
            }
          ],
          columnsOperation: {
            title: "操作",
            align: "center",
            buttons: [{
              label: "修改",
              size: "small",
              type: "text",
              disabled: true,
              methods: {
                click: (index, row) => {
                  this.$router.push('/market/product_launch/' + row.productId);
                }
              }
            }, {
              label: "删除",
              size: "small",
              type: "text",
              disabled: true,
              methods: {
                click: (index, row) => {
                  this.projectDelete(row.productId);
                }
              }
            }, {
              label: "评论",
              size: "small",
              type: "text",
              methods: {
                click: (index, row) => {
                  this.$router.push('/market/product_comment/' + row.productId);
                }
              }
            }]
          },
          titleButton: [{
            label: "新建",
            role: ['operator', 'member'],
            click: () => {
              this.$router.push('/market/product_launch/publish/product')
            }
          }, {
            label: "删除",
            selectedControl: true,
            click: (selected) => {
              if (selected.length != 0) {
                this.selectedDatas = selected;
                this.projectDelete();
              }
            }
          }]
        },
        tableData: [], //  获取列表数据
        selectedDatas: [],  //  列表种被选中的值
        selectedDataId: [], //  列表中被选中的id
        options: [] // 保存筛选提交时候的数据
      }
    },
    methods: {
      /**
       * 根据路径来判断表格显示的内容
       * */
      switchTableData() {
        let path = window.location.pathname
        let cloudProductRule = new RegExp('/module/cloudproduct.html');
        let managementRule = new RegExp('/module/management.html');
        if (path.match(cloudProductRule)) {
          this.data.tableTitle.splice(1, 1);
          this.data.tableTitle.splice(this.data.tableTitle.length - 2, 1);
          this.data.tableTitle[this.data.tableTitle.length - 1].type = 'text';
        }
        else if (path.match(managementRule)) {
          this.data.titleButton.splice(0, 1);
        } else {
            return false;
        }
      },
      //----对应列表输入框的blur事件
      changeNewWords(index, row) {
        if (row.sortNum === "") {
          row.sortNum = "99"
          return
        }
      },
      //----回车事件
      changeOrder(index, row) {
        var params = {
          productId: row.productId,
          seqNum: parseInt(row.sortNum)
        }
        if (row.sortNum == "") return;
        srv.modifyProductOrders(params).then(res => {
          if (res.code === 200) {
            this.$notify({
              type: 'success',
              message: `修改成功`
            });
          }
          else if (res.code === 607) {
            this.$notify({
              type: 'warning',
              message: `不能继续回复`
            });
          }
          else if (res.code === 608) {
            this.$notify({
              type: 'warning',
              message: `该状态下的产品无法修改排序`
            });
          }
        })
      },
      //----对应列表输入框的change事件
      checkNum(index, row) {
        let reg = /^[0-9]\d*$/;
        if (row.sortNum > 999 || new RegExp(reg).test(row.sortNum) == false) {
          setTimeout(() => {
            row.sortNum = '';
          }, 0);
        }
      },
      //----首次获取列表
      getPublishLists(keywords = "", current = 1, size = 10) {
        let params = {
          keywords: keywords,
          cateId: -1,
          name: keywords,
          index: current,
          pageSize: size,
          startTime: "",
          endTime: "",
          isAdmin: window.location.pathname === "/module/cloudproduct.html" ? 0 : 1
        }
        if (this.options.length != 0) {
          params.cateId = this.options[1].model;
          params.name = this.options[0].model;
          if (this.options[2].model && this.options[2].model == "") {
            params.startTime = '';
            params.endTime = '';
          }
          if (this.options[2].model[0] == "undefined" && this.options[2].model[1] == "undefined") {
            params.startTime = "";
            params.endTime = "";
          }
          params.status = this.options[3].model || -1;
          params.startTime = this.options[2].model[0] ? this.$moment(this.options[2].model[0]).format("YYYY-MM-DD") : "";
          params.endTime = this.options[2].model[1] ? this.$moment(this.options[2].model[1]).format("YYYY-MM-DD") : "";
        }
        return srv.requestPublishProductLists(params).then(data => {
          data.result.list.map((item) => {
            if (item.cateId === 1) {
              item.cateId = '前端框架';
            } else if (item.cateId === 2) {
              item.cateId = '后端框架';
            } else if (item.cateId === 3) {
              item.cateId = '技术组件';
            }

            if (item.status === 1) {
              item.status = '已发布';
            } else if (item.status === 2) {
              item.status = '已驳回';
            } else if (item.status === 0) {
              item.status = '待审核';
            }
            return item;
          });
          this.tableData = this.$_.cloneDeep(data.result.list);
          data.result.info = data.result.list;
          return data.result;
        })
      },
      //---删除列表中选中的数据
      projectDelete(productId) {
        this.$confirm('是否删除选中项，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!productId) {
            for (var i = 0; i < this.selectedDatas.length; i++) {
              if (this.selectedDatas.indexOf(this.selectedDatas[i].productId) == -1) {
                this.selectedDataId.push(this.selectedDatas[i].productId)
              }
            }
          }
          let projectIdStrArr = productId || this.selectedDataId.join(',');
          srv.deleteMultipleProducts({"productIds": projectIdStrArr}).then(data => {
            this.$notify({
              type: 'success',
              message: `删除成功`
            });
            // 刷新列表
            this.$refs.wt.getData();
          });
          this.selectedDataId = [];
        }).catch(() => {

        });
      },
      //---筛选时候的提交事件
      submit(params) {
        this.options = params;
        this.$refs.wt.getData(params);
      },
      //---筛选中的重置事件
      reset(params) {
        this.$refs.wt.getData(params);
      }
    },
    components: {
      "whole-table": WholeTable,
      "complex-condition": ComplexCondition
    }
  }


</script>
