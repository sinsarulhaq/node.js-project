var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getProduct().then((products)=>{
    res.render('admin/view-products', {admin:true,products});
    // console.log(products)
  })
  
});
router.get('/add-product',(req,res,next)=>{
  res.render('admin/add-products');
});
router.post('/add-product',(req,res)=>{
  // console.log(req.body)
  // console.log(req.files.Image)
  productHelper.addproduct(req.body,(insertedId)=>{
    let image = req.files.Image
    image.mv('./public/product-image/'+insertedId+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-products');
      }else{
        console.log(err)
      }
    })
   
  })
});
module.exports = router;
