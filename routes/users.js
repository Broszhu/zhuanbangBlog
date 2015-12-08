var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource || 404,请求资源不存在！');
});*/
/**
 * 用户注册
 */
router.get('/reg', function (req, res,next) {
  res.render('users/reg',{});
});

/**
 * 当填写用户注册信息提交时的处理
 */
router.post('/reg', function (req, res) {
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
router.get('/login', function (req, res, next) {
  res.render('users/login',{});
});

 /**
 * 当填写用户登录信息提交时的处理
 */
router.post('/login', function (req, res, next) {
    var user=req.body;//获得请求过来的数据；
    //在数据库里，查询客户输入的信息；找到一个就可以返回了；
    Model('User').findOne(user,function(err,user){
        if(user){
            //req.session={};
            req.session.user = user;
            res.redirect('/')
        }else{
            res.redirect('/users/login');
        }
    })
});

router.get('/logout', function (req, res) {
    res.render('users/logout', {title: '退出朱安邦博客'});
});

module.exports = router;
