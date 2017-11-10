const express= require('express');
const router = express.Router();
router.get('/user',function(req,res,next){
    res.send('Api = USER')
})
module.exports=router;