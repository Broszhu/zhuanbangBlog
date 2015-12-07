var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zhuanbangblog');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));
//model2个是定义，一个是取值；

global.Model=function(modName){
    return mongoose.model(modName);//一个参数是获取model值；并且放在global用；可以直接在users.js里用
}