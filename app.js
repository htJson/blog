/*应用启动入口文件*/
const express = require('express')
const swig = require('swig');


const app=express(); //创建服务器

const mongoose=require('mongoose');

/*当前应用所用的模板引擎
* 1.第一个参数是文件类型
* 2.解析模板内容的方法
* 模板有缓存机制
* */
app.engine('html',swig.renderFile);
//模板文件的存放目录 ，第一个参数必须是views ,第二个参数是路径
app.set('views','./views');
//注册模板引擎
//第一个参数必须是  view engine,第二个参数必须与 app.engine的第一个参数一互通有无和
app.set('view engine','html')
swig.setDefaults({catch:false})

//设置静态文件拖管
app.use('/static',express.static(__dirname+'/public'))
app.use('/admin',require('./routers/admin.js'))
app.use('/api',require('./routers/api.js'))
app.use('/',require('./routers/main.js'))

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功');
        app.listen(8090); //监听端口号
    }
})


