var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helpers')
var productHelper = require('../helper/product-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getProduct().then((products)=>{
    res.render('user/view-products', { products,admin:false});
  }) 
});
router.get('/login',(req,res)=>{
  res.render('user/login')
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelper.doSignup(req.body).then((data)=>{
    console.log(data)
  })
})
router.post('/login',(req,res)=>{
  
})
module.exports = router;