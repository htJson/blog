const mongoose= require('mongoose');

var category_Schema= require('../schemas/category')

module.exports=mongoose.model('category',category_Schema)