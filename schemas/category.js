const mongoose = require('mongoose');

//定义表节构
module.exports=new mongoose.Schema({
//    分类名称0：
    category_name:String,
    //分类说明
    category_note:String,
})