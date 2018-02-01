module.exports = {
  authority: true,//强制鉴权(方便开发阶段测试，不会出现没有路由的情况)
  NODE_ENV: '"prod"',
  //需包含的模块，优先级高于moduleFilter.  统一控制台子系统需包含index,login和management三个模块
  moduleContainer:[],
  moduleFilter:['./src/module/faq','./src/module/dashboard'],//过滤不被打包的模块
  urlNoAuthority:['/websiteinfo/contactus', '/websiteinfo/privatepolicy','/websiteinfo/serviceterm','/websiteinfo/faq','/d','/d/center','/d/cloudbasice','/d/monitor','/d/oss','/d/search','/d/video','/d/codestandard','/d/iflow'],
  api: {
    objectStore: {
      appid:'90aba3aff17f4611b26026b396321444'
    }
  },
  url:{
    pin_code_url:'http://c4a.midea.com/servlet/pinServlet.png',
    doc_standard_java:'http://mtp.midea.com/mtp/docs/standard-java/index.html',
    doc_iflow:'http://mtp.midea.com/mtp/docs/iflow/index.html',
    ustack:'http://172.20.32.194:5678/auth-iframe'
  },
  secretKey:{
    c4a:{
      ssoToken:'midea_sso_token',
      oamId: 'OAM_ID'
    }
  }
};
