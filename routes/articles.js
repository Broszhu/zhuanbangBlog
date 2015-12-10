var express = require('express');
var router = express.Router();
var path=require('path');
var multer=require('multer');
var middleware=require('../middleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname));
    }
})
var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource || 404,请求资源不存在！');
});
/**
 * 用户注册
 */
router.get('/add',middleware.checkLogin,  function (req, res) {
    res.render('articles/add', {title: '朱安邦博客添加文件',article:{}});
});

router.post('/add' , upload.single('poster') ,middleware.checkLogin,  function (req, res, next) {
    var article=req.body;
    var id=article.id;
    if(id){
        var updateObj = {
            title:article.title,
            content:article.content,
        }
        if(req.file){
            var poster = path.join('/upload',req.file.filename);
            updateObj.poster = poster;
        }

        new Model('Article').update({_id:id},{$set:updateObj},function(err){
            if(err){
                res.redirect('back');
            }else{
                res.redirect('/articles/detail/'+id);
            }

        });
    }else{
        article.user = req.session.user._id;//给article赋值用户的ID；
        if(req.file){
            article.poster=path.join('/upload',req.file.filename);
        }
        new  Model('Article')(article).save(function(err,article){
            if(err){
                res.redirect('back')
            }else{
                res.redirect('/')
            }
        })
    }
});

router.get('/detail/:id', function(req,res){
    var id = req.params.id;
    Model('Article').findById(id,function(err,article){
        res.render('articles/detail',{article:article});
    })
});
router.get('/delete/:id',middleware.checkLogin, function(req,res){
    var id = req.params.id;
    Model('Article').remove({_id:id},function(err){
        res.redirect('/');
    })
});

router.get('/edit/:id',middleware.checkLogin, function(req,res){
    var id = req.params.id;
    Model('Article').findById(id,function(err,article){
        res.render('articles/add',{article:article});
    })
});


module.exports = router;