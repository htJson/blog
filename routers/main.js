const express= require('express');
const router = express.Router();
const categoryModel=require('../moduls/category');

router.get('/',function(req,res,next){
    categoryModel.find().then(function(result){
        // console.log(result,'===================')
        res.render('index',{
            'userInfo':req.userInfo,
            'navs':result
        })
    })

})
router.get('/register',function(req,res,next){
    res.render('index',{
        'userInfo':req.userInfo
    })
})
router.get('/login',function(req,res,next){
    res.render('login',{
        'userInfo':req.userInfo
    })
})
module.exports=router;