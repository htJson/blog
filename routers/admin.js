const express = require('express')
const router=express.Router();

router.get('/user',function(req,res,next){
    res.send('ADMIN-user');
})
module.exports=router;