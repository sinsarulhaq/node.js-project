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
router.get('/delete-product/:id',(req,res)=>{
  let proId = req.params.id
  // console.log(proId)
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',async(req,res)=>{
  let proId = req.params.id
  let product =await productHelper.getProductDetails(proId).then((product)=>{
    console.log(product)
    res.render('admin/edit-product',{product})
  })
})
router.post('/edit-product/:id',(req,res)=>{
  let proId = req.params.id
  productHelper.updateProduct(proId,req.body).then((data)=>{
    console.log(data)
    res.redirect('/admin/')
  })
})
module.exports = router;
