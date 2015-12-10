var express = require('express');//加载node_modules下的express模板；
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');//安装后导入会话中间节；
var MongoStore = require('connect-mongo')(session);//保持session在数据库里的中间件,重启服务器后session也不会丢失；
var flash=require('connect-flash');//提示消息用的，注册信息错了，会提示哪里出错了；否则表单多，提示错误，又不说哪里错了，很崩溃！

var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var multer=require('multer');

var app = express();//生成一个express的实例app；

// view engine setup 通过以下两行代码设置了模板文件的存储位置和使用的模板引擎：
app.set('views', path.join(__dirname, 'views'));//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');//设置视图模板引擎为 ejs。

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//设置/public/favicon.ico为favicon图标。
app.use(logger('dev'));//加载日志中间件；
app.use(bodyParser.json());//加载解析json的中间件；
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件。
app.use(cookieParser());//加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录。所以index.ejs代码中的 href='/stylesheets/style.css' 就相当于 href='public/stylesheets/style.css' 。

require('./db');


app.use(session({
      secret: 'anbangblog',
      resave: true,
      saveUninitialized: true,
        store: new MongoStore({//保存session的数据库保存地址；
            url: 'mongodb://127.0.0.1:27017/zhuanbangblog'
        }),
        cookie:{
        maxAge:60*1000*30
      }
    })
);
app.use(flash());//引入后可以在req后面加一个flash的方法；通过req.flash来使用；
app.use(function(req,res,next){
    res.locals.keyword="";
    res.locals.user=req.session.user;
    res.locals.success=req.flash("success").toString();//req.flash("success")取出来的是数组，需要toString一下；
    res.locals.error=req.flash("error").toString();
  next();
});

app.use('/', routes);//根目录的路由
app.use('/users', users);//用户的路由的目录文件用user.js来控制
app.use('/articles', articles);//视图中的articles文件夹用articles来控制；
app.use(session());



// catch 404 and forward to error handler 捕获404错误，并转发到错误处理器。
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers 错误处理器

// development error handler 开发环境下的错误处理
// will print stacktrace 将打印出堆栈跟踪信息
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境下的错误处理
// no stacktraces leaked to user 不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app; // 导出app供 bin/www 使用
