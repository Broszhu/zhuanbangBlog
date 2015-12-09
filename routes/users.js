var express = require('express');
var router = express.Router();
var middleware=require('../middleware');//引入处理用户登录页面权限的中间件；

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource || 404,请求资源不存在！');
});*/
/**
 * 用户注册
 */
router.get('/reg', middleware.checkNotLogin, function (req, res,next) {
    res.render('users/reg',{});
});

/**
 * 当填写用户注册信息提交时的处理
 */
router.post('/reg', middleware.checkNotLogin, function (req, res) {
    var user=req.body;//获取用户提交过来的注册表单
    new Model('User')(user).save(function(err,user){
        if(err){
            res.redirect('/users/reg')
        }else{
            res.redirect('/users/login')
        }
    })
});

/**
 * 显示用户登录表单
 */
router.get('/login' , middleware.checkNotLogin, function (req, res, next) {
  res.render('users/login',{});
});

 /**
 * 当填写用户登录信息提交时的处理
 */
router.post('/login' , middleware.checkNotLogin, function (req, res, next) {
    var user=req.body;//获得请求过来的数据；
    //在数据库里，查询客户输入的信息；找到一个就可以返回了；
    Model('User').findOne(user,function(err,user){
        if(user){
            req.session.user = user;
            req.flash('success',"恭喜您，登录成功");//类似于req.session.success="登录成功"
            res.redirect('/')
        }else{
            req.flash('error',"滚粗，登录失败，回家种田去吧！");
            res.redirect('/users/login');
        }
    })
});

router.get('/logout', middleware.checkLogin, function (req, res) {
    req.session.user = null;
    req.flash('success',"退出成功，下次进来需要登录哦");
    res.redirect('/users/login');
});

module.exports = router;
