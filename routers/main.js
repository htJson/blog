const express= require('express');
const router = express.Router();

router.get('/',function(req,res,next){
    res.render('index',{
        'userInfo':req.userInfo
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