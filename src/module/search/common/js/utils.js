/**
 * Created by wenZerrrrrr on 2017/9/21.
 */
/* eslint-disable no-unused-vars */
export default {
  formatDate: (str) => {
    var a = new Date(str);
    var year = a.getFullYear(); // 年
    var month = a.getMonth() + 1; // 月
    month = month < 10 ? '0' + month : month;
    var day = a.getDate(); // 日
    day = day < 10 ? '0' + day : day;
    var hour = a.getHours(); // 小时
    hour = hour < 10 ? '0' + hour : hour;
    var min = a.getMinutes(); // 分钟
    min = min < 10 ? '0' + min : min;
    var sec = a.getSeconds(); // 秒
    sec = sec < 10 ? '0' + sec : sec;
    let formatData = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    formatData = formatData.toString();
    return formatData;
  },

  // 将json格式化显示
  formatJSON: (json, options) => {
    var reg = null,
      formatted = '',
      pad = 0,
      PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
      json = JSON.stringify(json);
    } else {
      json = JSON.parse(json);
      json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
      reg = /\:\r\n\{/g;
      json = json.replace(reg, ':{');
      reg = /\:\r\n\[/g;
      json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
      reg = /\:/g;
      json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
      var i = 0,
        indent = 0,
        padding = '';

      if (node.match(/\{$/) || node.match(/\[$/)) {
        indent = 1;
      } else if (node.match(/\}/) || node.match(/\]/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else {
        indent = 0;
      }

      for (i = 0; i < pad; i++) {
        padding += PADDING;
      }
      formatted += padding + node + '\r\n';
      pad += indent;
    }
    );
    return formatted;
  },
  /**
   * 格式化请求参数
   */
  formatParams:(val) => {
    var formatParams = []
    for(let i=0;i<val.length;i++){
      formatParams.push({
        field_name: val[i].field_name,
        field_type: val[i].field_type,
        format: val[i].format,
        analyzer: val[i].analyzer === 'true' ? true : false,
        nest: []
      })
      if(val[i].nest.length>0)
      for(let ii = 0 ; ii<val[i].nest.length;ii++){
        formatParams[i].nest.push({
          field_name: val[i].nest[ii].field_name,
          field_type: val[i].nest[ii].field_type,
          format: val[i].nest[ii].format,
          analyzer: val[i].nest[ii].analyzer === 'true' ? true : false,
        })
      }
    }
    return formatParams;
  },
  /**
   * 格式化列表数据
   */
  formatList: (val) => {
    var formatList = [];
    for(let i = 0;i<val.length;i++) {
      formatList.push({
        field_name: val[i].field_name,
        field_type: val[i].field_type,
        format: val[i].format,
        analyzer: val[i].analyzer ? 'true' : 'false',
        nest: [],
        nestedShow: val[i].nest.length > 0 ? true : false
      })
      if(val[i].nest.length> 0) {
        for(let j = 0 ;j<val[i].nest.length;j++) {
          formatList[i].nest.push({
            field_name: val[i].nest[j].field_name,
            field_type: val[i].nest[j].field_type,
            format: val[i].nest[j].format,
            analyzer: val[i].nest[j].analyzer ? 'true' : 'false',
          })
        }
      }
    }
    return formatList;
  }
};
