var db=require('../config/connection')
var collection = require('../config/collection')
module.exports={
    addproduct:(cart,callback)=>{
        // console.log(cart)
        db.get().collection('cart').insertOne(cart).then((data)=>{
            console.log(data)
         callback(data.insertedId)   
        })
    },
    getProduct:()=>{
        return new Promise (async(resolve,reject)=>{
            let products =await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}