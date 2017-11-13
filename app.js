/*应用启动入口文件*/
const express = require('express')
const swig = require('swig');
const bodyParser=require('body-parser');
const Cookies=require('cookies');
const app=express(); //创建服务器
const userModel=require('./moduls/user')
const mongoose=require('mongoose');

/*当前应用所用的模板引擎
* 1.第一个参数是文件类型
* 2.解析模板内容的方法
* 模板有缓存机制
* */
//处理post数据
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html',swig.renderFile);
//模板文件的存放目录 ，第一个参数必须是views ,第二个参数是路径
app.set('views','./views');
//注册模板引擎
//第一个参数必须是  view engine,第二个参数必须与 app.engine的第一个参数一互通有无和
app.set('view engine','html')
swig.setDefaults({catch:false})


//设置cookie
app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));
            userModel.findById(req.userInfo._id).then(function(result){
                if(result){
                    //注意设置数据的isAdmin字段不然info.admin是获到不到的
                    req.userInfo.isAdmin=Boolean(result.isAdmin);
                }
                next();
            })

        }catch(e){
            next();
        }
    }else{
        next()
    }
})

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


