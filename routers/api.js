const express= require('express');
const router = express.Router();
const url=require('url');
const userModel=require('../moduls/user');


// var userArr=['abc','张三','李四']
var responesData;
router.use(function(req,res,next){ //注册时的中间件用来接口返回
    responesData={
        code:0,
        message:''
    }
    next();
})
//注册
router.post('/user/register',function(req,res,next){
    var data=req.body;
    var reg=/\d{5,10}/;
    if( data.userName == ''){
        responesData={
            code:1,
            message:'用户名不能为空'
        }
        res.json(responesData)
        return ;
    }

    if(data.password == '') {
        responesData = {
            code: 2,
            message: '密码不能为空'
        }
        res.json(responesData);
        return;
    }

    if(!reg.test(data.password)){
        responesData={
            code:4,
            message:'密码只能是5-10位数字'
        }
        res.json(responesData);
        return ;
    }

    if(data.password !== data.repassword){
        responesData={
            code:3,
            message:'两次密码输入不一致'
        }
        res.json(responesData);
        return ;
    }

    userModel.findOne({
        username:data.userName
    }).then(function(result){
        if(result) {
            responesData.code=5;
            responesData.message='用户名已经注册过';
            res.json(responesData)
            return ;
        }
        var userD=new userModel({
            username:data.userName,
            password:data.password
        });
        return userD.save()
    }).then(function(result){
        responesData.message='恭喜您，注册成功了！！'
        res.json(responesData)

    })
})
//登录
router.get('/user/login',function(req,res,next){
    var queryData=url.parse(req.url,true).query;
    if(queryData.userName =='' || queryData.password ==''){
        responesData.code=003;
        responesData.message='用户名或密码不能为空'
        res.json(responesData)
        return ;
    }
    userModel.findOne({
        username:queryData.userName,
        password:queryData.password
    }).then(function(data){
        if(data){
            req.cookies.set('userInfo',JSON.stringify({
                _id:data._id,
                username:data.username
            }))
            // responesData.code=26;
            responesData.message='登录成功';
            responesData.userInfo=req.userInfo;
            res.json(responesData)
            return;
        }else{
            responesData.code=001;
            responesData.message='此用户名不存在'
            res.json(responesData)
            return;
        }
    })
})
//退出
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    res.json(responesData)
    return;
})


module.exports=router;