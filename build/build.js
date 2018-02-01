// https://github.com/shelljs/shelljs
require('shelljs/global')
//env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var env = process.env.NODE_ENV
var webpackConfig = require('./webpack.prod.conf')
var configPath = config[env];

console.log(
  `
  -----------------------------------------------------------
    提示：
      1.打包过程比较长请耐心等待
      2.打包完成后需挂载web服务器才能访问
      
  `
);

var spinner = ora('building for production...');
spinner.start();


var assetsPath = path.join(configPath.assetsRoot, configPath.assetsSubDirectory);

rm('-rf', configPath.assetsRoot);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
