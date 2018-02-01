/**
* Created by CHENRC2 on 2017-7-21.
* 二次封装element table 组件
*/
<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" @row-click='rowClick' @select="select"
              @select-all="select">

      <!--选择框-->
      <el-table-column
        v-if="normalizedSetting.selection"
        type="selection">
      </el-table-column>

      <!--索引-->
      <el-table-column
        v-if="normalizedSetting.index"
        label="序号"
        align="center"
        header-align="center"
        width="70px"
        type="index"
        show-overflow-tooltip>
      </el-table-column>

      <!--内容列-->
      <el-table-column v-for="t in normalizedTitle"
                       :prop="t.prop"
                       :class-name="t.className"
                       :label="t.label"
                       :width="t.width"
                       :min-width="t.minWidth"
                       :sortable="t.sortable"
                       :align="t.align"
                       show-overflow-tooltip>
        <template scope="scope">
          <span
            v-if="t.type === 'text'"
            :style="'color:'+computedFontColor(scope.row, t.prop, t.colorConditionVal,t.fontColor)">{{ scope.row[scope.column.property] }}
          </span>
          <span v-else-if="t.type ==='slot'" v-html="t.computed(scope,t)"></span>
          <span v-else-if="t.type ==='input'">
            <el-input
              v-model="scope.row[t.prop]"
              :maxlength="t.maxlength||100"
              :minlength="t.minlength||0"
              :size="t.size||small"
              :width="t.width||50"
             @keyup.enter.native='t.methods.keyup&&columnsButtonClick(t.methods.keyup,scope.$index,scope.row)'
             @click="t.methods.click&&columnsButtonClick(t.methods.click,scope.$index,scope.row)"
             @blur="t.methods.blur&&columnsButtonClick(t.methods.blur,scope.$index,scope.row)"
             @focus="t.methods.focus&&columnsButtonClick(t.methods.focus,scope.$index,scope.row)"
             @change="t.methods.change&&columnsButtonClick(t.methods.change,scope.$index,scope.row)"
            >
            </el-input>
          </span>
          <span v-else-if="t.type ==='operate'">
            <el-button type="text"
                       size="small"
                       :style="'color:'+computedFontColor(scope.row, t.prop, t.colorConditionVal,t.fontColor)"
                       @click="columnsButtonClick(t.methods.click,scope.$index,scope.row)">
              {{scope.row[t.prop]}}</el-button>
          </span>
        </template>
      </el-table-column>

      <el-table-column v-for="t in normalizedTitle"
                       v-else-if="t.type ==='hidden'"
                       v-if="t.type ==='hidden'">
      </el-table-column>
      <!--内容列-->

      <!--操作列-->
      <el-table-column v-if='normalizedColumnsButton.hasOwnProperty("title")' :label="normalizedColumnsButton.title" :align="normalizedColumnsButton.align" :width="normalizedColumnsButton.width" :min-width="normalizedColumnsButton.minWidth" :fixed="normalizedColumnsButton.fixed">
        <template scope="scope">
          <el-button v-for="(button, index) in normalizedColumnsButton.buttons"
                     :style="button.style"
                     :size="button.size"
                     :type="button.type"
                     :disabled="computedShowBtn(scope.row)&&button.disabled"
                     @click="columnsButtonClick(button.methods.click,scope.$index,scope.row)">
          {{computedLabel(button.label,button.computedParams,button.computedValue,scope.row)}}</el-button>
        </template>
      </el-table-column>
      <!--操作列-->
    </el-table>
  </div>
</template>
<style lang="less" scoped>

</style>
<script>
  import Vue from "vue";
  import UserButton from "../user_button/UserButton.vue";
  import { tableSetting } from "../awesome_config.js";

  export default {
    name: "ListTable",
    data(){
        return {
            tableData: this.data
        }
    },
    watch:{
      data(){
        this.tableData = [...this.data];
      }
    },
    computed: {
      /**
       * 格式化标题
       * @returns {Array}
       */
      normalizedTitle(){
        let title=[];
        this.title.forEach(item=>{
          title.push(Object.assign({},tableSetting.title,item));
        });
        return title;
      },
      /**
       * 格式化配置
       */
      normalizedSetting(){
        return Object.assign({},tableSetting.base,tableSetting.column,this.setting);
      },
      /**
       * 格式化列按钮
       */
      normalizedColumnsButton(){
        if(this.columnsOperation.buttons&&this.columnsOperation.buttons.length>0){
          this.columnsOperation.buttons=this.columnsOperation.buttons.map((item)=>{
            return Object.assign({},tableSetting.columnButtonOperation,item);
          });
        }
        return this.columnsOperation;
      }
    },
    props:{
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: Array,
        default() {
          return [];
        }
      },
      setting: {
        type: Object,
        default(){
          return Object.assign({},tableSetting.base,tableSetting.column);
        }
      },
      columnsOperation: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      /**
       * 根据显示内容而变色，最多只能支持到3种变化
       * @params
       *  row   --- 一行的信息
       *  prop  --- 属性名字
       *  colorConditionVal  --- 控制变颜色的值得条件
       *  color   --- 需要变的颜色
       * */
      computedFontColor(row={}, prop=[], colorConditionVal=[], color='') {
        for (let i = 0; i < colorConditionVal.length; i++) {
          if (row[prop]===colorConditionVal[i]) {
            return color[i];
          }
        }
//        if (row[prop]===colorConditionVal[0]) {
//          return color[0];
//        } else if (row[prop]===colorConditionVal[1]) {
//            return color[1]
//        } else if (row[prop]===colorConditionVal[2]) {
//            return color[2]
//        } else {
//            return '';
//        }
      },

      /**
       * 计算能否显示按钮
       * */
      computedShowBtn(row) {
        return row.status=='待审核'?true:false;
      },

      /**
       * 根据字段计算要显示的值
       * @param label
       * @param params
       * @param values
       * @param row
       * @returns {*}
       */
      computedLabel(label,params,values,row){
        if(!!params&&!!values){
          return values[row[params]];
        }
        return label;
      },
      /**
       * 列按钮点击事件回调
       * @param method 回调方法
       * @param index 当前行数
       * @param row 当前行
       */
      columnsButtonClick(method,index,row){
        method(index,row);
      },
      /**
       * 选中事件
       * @param val 选中行
       */
      select(val){
        this.$emit('select',val);
      },
      /**
       * 行点击事件
       * @param row 当前行
       * @param event 事件名
       * @param column  当前列
       */
      rowClick(row, event, column){
        this.$emit('rowClick',row,event,column);
      }
    },
    components:{
      "user-button": UserButton
    }
  }
</script>
