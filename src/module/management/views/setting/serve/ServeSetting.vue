<template>
  <section class="container">
    <whole-table ref="wt" :data="data">
    </whole-table>
    <router-view @hash="hash"></router-view>
  </section>
</template>
<style lang="less" scoped>

</style>
<script>
 import * as srv from '../../../api/service';
 import WholeTable from 'components/awesome/whole_table/WholeTable.vue';
  export default {
    data(){
      return {
        data:{
          title:"服务配置",
          tableSetting: {
          },
          refreshMethod:this.getServeLists,
          tableTitle:[
            {
              prop: 'serverName',
              type: 'operate',
              label: '服务名称',
              width:'100px',
              methods:{
                click:(index,row)=>{
                  this.$router.push('/setting/serve/create_serve/detail/'+row.serverId);
                }
              }
            },
            {
             prop:'mark',
             label:'服务标识',
             width:'100px'
            },
            {
             prop:'memo',
             label:'描述'
            },
            {
             prop:'type',
             label:'所属分类',
             width:'100px'
            },
            {
             prop:'sort',
             label:'排序',
             width:'70px'
            },
            {
              prop:'systemClass',
              label:'系统类别',
              width:'100px'
            },
             {
              prop:'link',
              label:'访问链接',
              width:'140px'
            },
             {
              prop:'needProject',
              label:'需要项目',
              width:'100px'
            },
            {
              prop:'updateTime',
              label:'修改时间',
              width:'170px'
            }
          ],
          columnsOperation:{
            title: "操作",
            align: "center",
            width:'130px',
            buttons:[{
              label: "编辑",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{
                 this.$router.push('/setting/serve/create_serve/editor/'+row.serverId);
                }
              }
            },{
              label: "禁用",
              size: "small",
              type: "text",
              computedValue:{
                "0":"启用",
                "1":"禁用"
              },
              computedParams:"enable",
              methods:{
                click:(index, row)=>{
                  this.openOrCloseServe(index,row);
                }
              }
            }]
          },
          titleButton:[{
            label: "新增",
            click: (index, row) => {
             this.$router.push('/setting/serve/create_serve/new/-1')
            }
          }]
        }
      }
    },
    methods:{
      //---列表刷新
      hash(data) {
        this.$refs.wt.getData();
      },
      //---开启或是关闭服务
      openOrCloseServe(index,row){
        let params = {
          enable:row.enable==='0'?'1':'0',
          serverId:row.serverId,
          JSESSIONID:""
        }
      if(row.enable==='0'){
          this.$confirm('启用服务后用户可以使用，是否继续？', '启用服务', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
              }).then(()=>{
                srv.openOrforbiddenServe(params).then(res=>{
                  if(res.errorCode=="600000"){
                      this.$notify.success({
                             title: '成功',
                             message: `启用成功`,
                      });
                      row.enable = '1'
                  }
                });
              }).catch(() => {

               });
         }else{
          this.$confirm('禁用服务后用户将无法使用，是否继续？', '禁用服务', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
              }).then(()=>{
                srv.openOrforbiddenServe(params).then(res=>{
                  if(res.errorCode=="600000"){
                      this.$notify.success({
                          title: '成功',
                          message: `禁用成功`,
                      });
                       row.enable = '0'
                  }
                });
              }).catch(() => {

               });
          }
      },
      //---获取服务列表
      getServeLists(keywords="",current=1,size=10) {
        let params = {keywords:keywords,serverName:keywords,index:current,pageSize:size,mtpCookie:""};
        return srv.requestServeLists(params).then(data => {
            data.result.info.map((item) =>{
              if(item.systemClass==="0"){
                item.systemClass = '内部系统'
              }else if(item.systemClass==='1'){
                item.systemClass = '外部系统'
              }else if(item.systemClass ==='2'){
                item.systemClass = '金融系统'
              }
              if(item.needProject=="0"){
                item.needProject = '否'
              }else if(item.needProject=="1"){
                item.needProject = '是'
              }
              if(item.type=="0"){
                item.type = '基础资源'
              }else if(item.type=="1"){
                item.type = '基础服务'
              }else if(item.type == '2'){
                item.type = '基础应用'
              }
              return item;
            })
            return data.result;
        })
      },
    },
    components:{
      "whole-table":WholeTable
    }
  }

</script>
