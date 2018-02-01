module.exports = {
  NODE_ENV: '"uat"',
  authority: true,//强制鉴权(方便开发阶段测试，不会出现没有路由的情况)
  //需包含的模块，优先级高于moduleFilter.  统一控制台子系统需包含index,login和management三个模块
  moduleContainer:[],
  moduleFilter:[],//过滤不被打包的模块
  urlNoAuthority:['/websiteinfo/contactus', '/websiteinfo/privatepolicy','/websiteinfo/serviceterm','/websiteinfo/faq','/d','/d/center','/d/cloudbasice','/d/monitor','/d/oss','/d/search','/d/video','/d/codestandard','/d/iflow'],
  api: {
    login:{
      host: 'http://123.58.34.245:9000'
    },
    socket:{
      host: 'http://202.104.112.244:18093'
    },
    ustack:{
      url: 'http://123.58.34.247:8081/auth-iframe'
    },
    manaement: {
      host: 'http://202.104.112.244:18092',
      menu:'http://10.133.143.155:18092'
    },
    monitor:{
      // host: 'http://123.58.34.241:8000'
      host: 'http://123.58.34.246:9527'
    },
    objectStore: {
      appid:'4a0f0d9f2e414046b686be72b0d8169d',
      uploadHost: 'http://123.58.34.246:9527',
      appmanager: 'http://123.58.34.246:9527',
      mcloud: 'http://123.58.34.246:9527'
    },
    video: {
      uploadHost: 'http://123.58.34.245:17480',
      appmanager:'http://123.58.34.245:80',
      authen: 'http://123.58.34.245:9000',
      videoplay: 'http://123.58.34.246:80'
    },
    search:{
      host:'http://123.58.34.246:12109',
      push:'http://123.58.34.246:10118',
      search:'http://123.58.34.246:10321'
    },
    market: {
      host:'172.20.32.159:80'
    }
  },
  url:{
    pin_code_url:'http://c4adev.midea.com/servlet/pinServlet.png',
  },
  secretKey:{
    c4a:{
      ssoToken:'mideatest_sso_token',
      oamId: 'OAM_ID'
    }
  }
};
