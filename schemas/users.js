const mongoose = require('mongoose');

//定义表节构
module.exports=new mongoose.Schema({
//    用户名：
    username:String,
    password:String
})