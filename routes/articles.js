var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource || 404,请求资源不存在！');
});
/**
 * 用户注册
 */
router.get('/add', function (req, res) {
    res.render('articles/add', {title: '朱安邦博客添加文件'});
});



module.exports = router;