var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
const { ObjectId } = require('bson')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
    },
    doLogin:(userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        console.log('login succes')
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('unsucces')
                        resolve({ status: false })
                    }
                })
            } else {
                console.log('unsucces')
                resolve({ status: false })
            }
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user =await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(user){

            }else{
                let objct = {
                    user : ObjectId(userId),
                    product : [ObjectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(objct).then((response)=>{
                    resolve(response)
                })
            }
        })
    }
}