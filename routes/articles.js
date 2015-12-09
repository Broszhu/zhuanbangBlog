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

router.post('/add', function (req, res, next) {
    var article=req.body;
    article.user = req.session.user._id;//给article赋值用户的ID；
    new  Model('Article')(article).save(function(err,article){
        if(err){
            res.redirect('back')
        }else{
            res.redirect('/')
        }
    })
});



module.exports = router;