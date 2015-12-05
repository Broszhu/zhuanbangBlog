var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource || 404,请求资源不存在！');
});
/**
 * 用户注册
 */
router.get('/reg', function (req, res) {
  res.render('users/reg', {title: '注册朱安邦博客'});
});

/**
 * 当填写用户注册信息提交时的处理
 */
router.post('/reg', function (req, res) {
});

/**
 * 显示用户登录表单
 */
router.get('/login', function (req, res) {
  res.render('users/login', {title: '登录朱安邦博客'});
});

 /**
 * 当填写用户登录信息提交时的处理
 */
router.post('/login', function (req, res) {
});

router.get('/logout', function (req, res) {
});

module.exports = router;
