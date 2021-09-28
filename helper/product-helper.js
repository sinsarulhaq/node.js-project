var db=require('../config/connection')
var collection = require('../config/collection')
// const { response } = require('../app')
var objectId=require('mongodb').ObjectId
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
    },
    deleteProduct:(proId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
                console.log(response)
                resolve(response)
        })
       
        })
    }
}