var db = require('../config/connection')
var collection =require('../config/collection')
var bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise (async(resolve,reject)=>{
            userData.Password = await bcrypt.hash(userData.Password,10)
           db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
           })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
           let user =await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
           if(user){

           }else{
               
           }
        })
    }
}