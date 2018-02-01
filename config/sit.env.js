module.exports = {
  NODE_ENV: '"sit"',
  authority: true,//强制鉴权(方便开发阶段测试，不会出现没有路由的情况)
  //需包含的模块，优先级高于moduleFilter.  统一控制台子系统需包含index,login和management三个模块
  moduleContainer:['./src/module/index','./src/module/login','./src/module/management','./src/module/search','./src/module/monitor', './src/module/cloudbasic', './src/module/video', './src/module/objectstroe','./src/module/dashboard', './src/module/database', './src/module/cloudmarket', './src/module/cloudproduct','./src/module/pic'],
  moduleFilter:['./src/module/dashboard'],//过滤不被打包的模块
  urlNoAuthority:['/websiteinfo/contactus', '/websiteinfo/privatepolicy','/websiteinfo/serviceterm','/websiteinfo/faq','/d','/d/center','/d/cloudbasice','/d/monitor','/d/oss','/d/search','/d/video','/d/codestandard','/d/iflow'],
  api: {
    objectStore: {
      appid:'4a0f0d9f2e414046b686be72b0d8169d'
    }
  },
  url:{
    pin_code_url:'http://c4adev.midea.com/servlet/pinServlet.png',
    doc_standard_java:'http://mtp.midea.com/mtp/docs/standard-java/index.html',
    doc_iflow:'http://mtp.midea.com/mtp/docs/iflow/index.html',
    ustack:'http://123.58.34.247:8081/auth-iframe'
  },
  secretKey:{
    c4a:{
      ssoToken:'mideatest_sso_token',
      oamId: 'OAM_ID'
    }
  }
}
