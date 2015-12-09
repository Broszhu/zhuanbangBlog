var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;//Types相当于枚举
mongoose.connect('mongodb://127.0.0.1:27017/zhuanbangblog');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));

mongoose.model('Article',new mongoose.Schema({
    title:String,
    content:String,
    user:{type:ObjectId,ref:'User'}//对象ID类型引用User；
}));

//model2个是定义，一个是取值；

global.Model=function(modName){
    return mongoose.model(modName);//一个参数是获取model值；并且放在global用；可以直接在users.js里用
}