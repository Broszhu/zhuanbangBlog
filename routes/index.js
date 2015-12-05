var express = require('express');//导入express模板
var router = express.Router();//生产一个路由实例

/* GET home page. 获取主页*/
router.get('/', function(req, res, next) {//当用户访问根目录；也就是 / 的时候执行此回调
  res.render('index', { title: '朱安邦博客' });//渲染views/index.ejs模版并显示到浏览器中;
  //模板引擎会把 <%= title %> 替换成 Express，然后把替换后的页面显示给用户。
});
/*
* 通过调用 res.render() 渲染模版，并将其产生的页面直接返回给客户端。它接受两个参数，第一个是模板的名称，即 views 目录下的模板文件名，扩展名 .ejs 可选。第二个参数是传递给模板的数据对象，用于模板翻译。
* */

module.exports = router;//导出这个路由并在app.js中通过app.use('/', routes); 加载

//这段代码的意思是当访问主页时，调用 ejs 模板引擎，来渲染 index.ejs 模版文件（即将 title 变量全部替换为字符串 Express），生成静态页面并显示在浏览器中。


