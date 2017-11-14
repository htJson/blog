const express = require('express')
const router=express.Router();
const userModel=require('../moduls/user');
const categoryModel=require('../moduls/category')
router.use(function(req,res,next){
    if(!req.userInfo.isAdmin){
        res.send('只有管理员才可以进入后台')
    }
    next();
})
router.get('/',function(req,res,next){
    res.render('admin/index',{
        userInfo:req.userInfo
    });
})
router.get('/userList',function(req,res,next){

    var page=Number(req.query.page||1);
    userModel.count().then(function(count){
        var pageCount=Math.ceil(count/2);
        page=Math.min(page,pageCount);
        page=Math.max(page,1);
        var pc=(page-1)*2;


        userModel.find().limit(2).skip(pc).then(function(result){
            res.render('admin/userList',{
                userInfo:req.userInfo,
                users:result,
                page:page,
                count: count,
                pageCount:pageCount,
            });
        })
    })
})
//分类列表
router.get('/category',function(req,res,next){
    /*
    *  _id字段数据库生成时，会有一个时间戳
    *   1：代表升序
    *   -1：代表降序
    * */
    categoryModel.find().sort({_id:-1}).then(function(result){
        res.render('admin/category',{
            categoryList:result
        })
    })

})
//添加分类界面路由
router.get('/category/add',function(req,res,next){
    res.render('admin/add_category')
})
//添加分类接口
router.post('/category/add',function(req,res){
    categoryModel.findOne({
        category_name:req.body.name
    }).then(function(result){
        if(result){
            res.send('当前分类已存在')
            return Promise.reject();
        }else{
            return new categoryModel({
                category_name:req.body.name,
                category_note:req.body.note
            }).save()
        }
    }).then(function(result){
        if(!result){
            res.send('当前分类已存在');
        }else{
            res.send('添加成功')
        }
    })
})
//编辑分类
router.get('/category/edite',function(req,res){
    categoryModel.findOne({
        _id:req.query.id
    }).then(function(result){
        if(!result){
            res.send({
                message:'分类不存在'
            })
        }else{
            res.render('admin/edite_category',{
                categoryInfo:result
            });
        }
    })
})

router.post('/category/edite',function(req,res){
    var data=req.body;
    var id=req.query.id || '';
    categoryModel.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.send('分类不存在')
        }else{
            if(result.category_name == data.name){
                res.send('分类修改成功')
                return Promise.reject();
            }else{
                return categoryModel.findOne({
                    _id:{$ne:id},
                    category_name:data.name
                })
            }
        }
    }).then(function(result){
        if(!result){
            return categoryModel.update({_id:id},{
                category_name:data.name,
                category_note:data.note
            })
        }else{
            res.send('修改的分类名称已存在')
            return Promis.reject();
        }
    }).then(function(result){
        console.log(result);
        res.send('修改成功')
    })
})

router.get('/category/delete',function(req,res){

})
module.exports=router;