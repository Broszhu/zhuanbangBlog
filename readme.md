#this is my blog  by node 【我的 node博客项目】

## express 用的是老版本的；
  - 开始是用 npm install -g express-generator来安装用的；但是每次用的时候，出现不是可用的命令行；折腾半天没有解决；我就用老版本了
  - 我用了；npm install -g express@3.5.0  这个版本来操作的；
  - 后来解决好了，可以用npm install -g express-generator了

# 1、初始化一个仓库

 - express -e zhuanbangBlog
 - cd zhuanbangBlog && npm install
 - 设置环境变量并启动服务器,在命令行中执行下列命令
 - SET DEBUG=zhuanbangBlog:* & npm start
 - 然后会显示zhuanbangBlog:server Listening on port 3000 +0ms
 - 在浏览器里访问 http://localhost:3000 就可以显示欢迎页面
    - Express
    - Welcome to Express
 - 再命令行输入 SET PORT=5000 可以把默认的3000端口改为5000
 - 通过命令行简历一个忽略文件。touch .gitignore 忽略
    - node_modules
    - .idea
 - 上面就是用express生成器生成了一个使用ejs模板的示例工程。

### 提交本地仓库
- git init 初始化git仓库
- git add -A 把所有的文件添加到暂存区
- git commit -m"初始化博客" 把所有的修改添加到历史区

### git 仓库关联github
- git remote add origin XXXXX.git 添加远程仓库的关联
- git push -u origin master 把本地的仓库推送到远程服务器上去

#2、生成文件说明
- app.js：express的主配置文件
- package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块
- node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下
- public：存放 image、css、js 等文件
- routes：存放路由文件
- views：存放视图文件或者说模版文件
- bin：可执行文件，可以从此启动服务器的

#3、功能分析
- 搭建一个简单的具有多人注册、登录、发表文章、登出功能的博客。

##设计目标
- 未登录：主页导航显示 首页、注册、登陆，下面显示已发表的文章、发表日期及作者。
- 登陆后：主页导航显示 首页、发表文章、退出，下面显示已发表的文章、发表日期及作者。
- 用户登录、注册、发表成功以及登出后都返回到主页。

# 4、路由规划
我们已经把设计的构想图贴出来了，接下来的任务就是完成路由规划了。路由规划，或者说控制器规划是整个网站的骨架部分，因为它处于整个架构的枢纽位置，相当于各个接口之间的粘合剂，所以应该优先考虑。

- / ：首页
- /users/login ：用户登录
- /users/reg ：用户注册
- /articles/post ：发表文章
- /articles/logout ：登出

app.js中有用的核心代码

- app.use('/', routes);//根目录的路由
- app.use('/users', users);//用户的路由的目录文件用user.js来控制
- app.use('/articles', articles);//视图中的articles文件夹用articles来控制；

http://localhost:3000/users/reg

![](http://i.imgur.com/Hounhie.png)

http://localhost:3000/users/login

![](http://i.imgur.com/dnWDZm7.png)

http://localhost:3000/articles/add

![](http://i.imgur.com/LGEzIus.png)

# 5、开发准备工作 ,把首页，登录页，注册页，发表文章页面做好 [git版本存档](https://github.com/Broszhu/zhuanbangBlog/commit/3338397799c6452535c26c49101fb667d996aaaf)
MD5加密算法

- var crypto = require('crypto');
- var content = 'password'
- var md5 = crypto.createHash('md5');
- md5.update(content);
- var d = md5.digest('hex'); 

SHA1加密例程

- var crypto = require('crypto');
- var content = 'password'
- var shasum = crypto.createHash('sha1');
- shasum.update(content);
- var d = shasum.digest('hex');


### 配置bower
 执行bower init

一路回车就可以生产一个bower.json 文件；然后再通过 

 - touch  .bowerrc

创建一个.bowerrc文件；里面的内容输入

- {"directory":"./public/lib"}

这表示以后bower安装的模块都安装在./public/lib下面。

然后通过 bower install bootstrap --save  安装bootstrap文件；因为家了--save。不但会安装bootstrap,还会安装依赖的jquery；

然后通过拼接文档的方式来拼index.ejs；内容如下

- <% include include/header.ejs%>
- < div class="container">
-   这是主页的内容哦！
- < /div>
- <% include include/footer.ejs%>

下面是这里的样子；

![](http://i.imgur.com/ltL6U3w.png)

注册页面如下

![](http://i.imgur.com/RxRrA5Z.png)

登录页面如下
![](http://i.imgur.com/pHfkHm1.png)

发表文章页面如下
![](http://i.imgur.com/LmpeCKk.png)

# 6，博客【注册】&&【登录】功能完善，链接mongodb数据库

### 链接数据库

安装mongodb模块到node_modules下面并把此配置添加到package.json文件中

- npm install mongoose --save

mogodb的安装启用；在D:\mongodb\data文件夹下

- 命令窗体中输入 mongod --dbpath=D:\Mongodb\data 按回车键
注： --dbpath后的值表示数据库文件的存储路径 而且后面的路径必须存在否则服务开启失败 
借助mongoose工具mongoVUE来管理；

- 在根目录下新建一个db文件夹，并且新建一个index.js文件；
 

    	var mongoose=require('mongoose');
    	mongoose.connect('mongodb://127.0.0.1:27017/zhuanbangblog');
    	mongoose.model('User',new mongoose.Schema({
	    	username:String,
	    	password:String,
	    	email:String
    	}));
		global.Model=function(modName){
		    return mongoose.model(modName);//一个参数是获取model值；并且放在global用；可以直接在users.js里用
		}

//model2个是定义，一个是取值；

global.Model=function(modName){
    return mongoose.model(modName);//一个参数是获取model值；并且放在global用；可以直接在users.js里用
}
 

 一个参数是获取model值；并且放在global用；可以直接在users.js里用；model2个值是定义，一个是取值；

在app.js里require('./db'); 引入一下db里面的index.js;./db和./db/index.db是一样的效果的；

检查require是否正确，可以按住ctrl点击文件，如果可以访问，说明是正确的，如果访问不了，说明不成功的;

###user.js里的登录如下；
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


###mongoVUE中的数据如图

![](http://i.imgur.com/f9LFaeF.png)

###登录的和注册套路一样；

    router.post('/login', function (req, res) {
    var user=req.body;//获得请求过来的数据；
    //在数据库里，查询客户输入的信息；找到一个就可以返回了；
    Model('User').findOne(user,function(err,user){
        console.log('err');
        if(user){
            res.redirect('/')
        }else{
            res.redirect('/users/login')
        }
    })
	});
如果登录成功就返回到首页，如果登录失败就留在登录页；

# 会话支持模块

导航条内做判断
            <ul class="nav navbar-nav">
            <%
            if(user){
                %>
                    <li><a href="/articles/add">发表文章</a></li>
                    <li><a href="/users/logout">登出</a></li>
                <%
            }else{
                %>
                    <li class="active"><a href="/users/reg">注册</a></li>
                    <li><a href="/users/login">登录</a></li>
                <%
            }
             %>
        </ul>

app.js里装会话中间件

	var session=require('express-session');//安装后导入会话中间节；

	app.use(session({
      secret: 'anbangblog',
      resave: true,
      saveUninitialized: true,
        cookie:{
        maxAge:60*1000*30
      }
    })
	);

	app.use(function(req,res,next){//把请求的user放到res.locals.user上，这样访问的页面就都能用了
	  res.locals.user=req.session.user;
	  next();
	});

因为可以用app里面的res内容；所以下面users.js里的代码需要改变了；

	router.get('/reg', function (req, res,next) {//登录
	  res.render('users/reg',{});
	});

	router.get('/login', function (req, res, next) {//注册
	  res.render('users/login',{});
	});

这个时候，么有登录时候显示登录和注册；如图
![](http://i.imgur.com/VDQYs0V.png)

登录后显示发表文章和退出；
![](http://i.imgur.com/u7LRqwA.png)

但是上面的有一个问题，即时cookie设置是半小时过期；，就是重新启动服务器后，又需要登录了；相当于在一个店铺办卡，然后店铺倒闭，别人再这了重新开一个店铺，以前的卡在新开店里就不认识了；
这里需要用到一个包；connect-mongo；可以把session保存到数据库了；

安装后，然后app.js引入；

	var MongoStore = require('connect-mongo')(session);//保持session在数据库里的中间件,重启服务器后session也不会丢失；

在app.js下面加入需要引入的数据库；

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

这样无论服务器重启如否都不需要再次登录了；

### 提示消息通知

很多时候注册表单错了，如果只提示错误，并不告诉错误原因，用户会很崩溃；通过connrct-flash可以来实现

	npm install connect-flash --save
先安装flash包；
然后通过下面的代码引入到app.js里；

	var flash = require('connect-flash');
	app.use(flash());

user.js里添加

    req.flash('success',"恭喜您，登录成功");//类似于req.session.success="登录成功"
如果失败了，用

    req.flash('error',"滚粗，登录失败，回家种田去吧！");

在前台里面需要用<%=success%>和<%=error%>来供替换；

因为是消息提示的，所以需要用到ifelse来判断；

	<%
 	if(success){
    %>
    <div class="alert alert-success" role="alert"><%=success %></div>
    <%
     }else if(error){
    %>
    <div class="alert alert-danger" role="alert"><%=error %></div>
    <%
 	}
	%>

然后再app,js里添加东西；

原本是

	app.use(function(req,res,next){
  	res.locals.user=req.session.user;
  	next();
	});

添加后是

    res.locals.success=req.flash("success").toString();//req.flash("success")取出来的是数组，需要toString一下；
	res.locals.error=req.flash("error").toString();

因为req.flash("success")可以多次提示的，也属于一个数据，需要toString一下，才能让上面的判断生效；

#用户访问的权限控制
登录后的用户，不能访问注册和登录页面；
没有登录的时候不能访问退出页面；

需要新建一个中间件，在根目录下新建一个middleware文档。在里面新建一个index.js的中间件代码如下

	//登录才能继续访问的
	exports.checkLogin=function(req,res,next){
    if(req.session.user){//您已经登录过了
        next();//继续执行
    }else{
        req.flash('error','您还没有登录，需要重新登录');
        res.redirect('back')
    }
	};

	//未登录才能继续访问的
	exports.checkNotLogin=function(req,res,next){
    if(req.session.user){//您已经登录过了
        req.flash('error','您已经登陆过了，不需要重复登录');
        res.redirect('back')
    }else{
        next();//继续执行
    }
	};

然后再user中，在参数里假如，会先执行的里面的；添加的注册页面如下

	router.get('/reg', middleware.checkNotLogin, function (req, res,next) {
    res.render('users/reg',{});
	});

	
退出界面如下

	router.get('/logout', middleware.checkLogin, function (req, res) {
	    req.session.user = null;
	    req.flash('success',"退出成功，下次进来需要登录哦");
	    res.redirect('/users/login');
	});

图像如下；

![](http://i.imgur.com/m9bZCNP.png)

![](http://i.imgur.com/si5Zwl3.png)

这样就做好了用户权限的控制；

#发表文章页面的制作；

在routes/articles里修改；套路和注册一样的；

	router.post('/add', function (req, res, next) {
    var article=req.body;
    new  Model('Article')(article).save(function(err,article){
        if(err){
            res.redirect('back')
        }else{
            res.redirect('/')
        }
    })
	});

这个时候需要mongodb里改下model；因为现在的model没有Article，只有User的；在db下面的index.js里添加；

	mongoose.model('Article',new mongoose.Schema({
    	title:String,
    	content:String
	}));

这个时候就做好了发表文档的页面；发表后可以在mongoVUE里查看到zhuanbangblog的数据库下面的Collections下面多了一个articles的数据表

#首页显示文章的列表

首先在route/index.js中添加文件，把文章给读取出来

	router.get('/', function(req, res) {//当用户访问根目录；也就是 / 的时候执行此回调
		  var article = req.body;
		  //下面的populate('user')是mongo提供的方法；会找到user，然后循环name，id等；把用户的ID转成对象；这个用法非常好用，一定要记得用；
		  Model('Article').find({}).populate('user').exec(function(err,articles){
		    res.render('index', { articles: articles});
		  });
	});

然后需要修改db文件下面的index.js

	mongoose.model('Article',new mongoose.Schema({
	    title:String,
	    content:String,
	    user:{type:ObjectId,ref:'User'}//对象ID类型引用User；加的是这一条；ref引用的是上面定好的User
	}));

其中的ObjectId需要重新的指定；在开始的部分需要下一段下面代码
	
	var ObjectId=mongoose.Schema.Types.ObjectId;//Types相当于枚举

然后就是需要重头戏了，需要改routes/srticle.js文件

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

然后就是渲染模板了；在views/index.ejs改的代码如下

	<%
  	for(var i=0;i<articles.length;i++){
    var article=articles[i];
  	%>
    <div class="media">
      <div class="media-left">
        <a href="#">
          < img src="http://gravatar.duoshuo.com/avatar/e069fb6ca153e3c272bc85beb6f85b49?s=50
          " alt=""/>
          <%=article.user.username%>
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading"><%=article.title%></h4>
        <p><%=article.content %></p>
      </div>
    </div>
	  <%
	  }
	  %>


最后的状态如下

没有登录看到的是
![](http://i.imgur.com/E8dIx0P.png)

登录后看到的是

![](http://i.imgur.com/lnTailQ.png)


