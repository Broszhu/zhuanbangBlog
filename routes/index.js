var express = require('express');//导入express模板
var router = express.Router();//生产一个路由实例

/* GET home page. 获取主页*/
router.get('/', function(req, res) {//当用户访问根目录；也就是 / 的时候执行此回调
  var article = req.body;
  //populate('user')是mongo提供的方法；会找到user，然后循环name，id等；把用户的ID转成对象；这个用法非常好用，一定要记得用；
  Model('Article').find({}).populate('user').exec(function(err,articles){
    res.render('index', { articles: articles});
  });
});
module.exports = router;//导出这个路由并在app.js中通过app.use('/', routes); 加载

//这段代码的意思是当访问主页时，调用 ejs 模板引擎，来渲染 index.ejs 模版文件（即将 title 变量全部替换为字符串 Express），生成静态页面并显示在浏览器中。


