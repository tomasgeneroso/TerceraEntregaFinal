const mongoose=require('mongoose')
const {EXPIRE_TIME}=require('../../../config/config.js')

const cartSchema= new mongoose.Schema({
    id:{type:String,required:true}, 
    items:[{
        title:{type:String,required:true},
        description:{type:String},
        price:{type:Number},
        quantity:  {type:Number, required:true}
    }],
    total:{type:Number},
    createdAt: { type: Date, expires: EXPIRE_TIME, default: Date.now, index:true }
})

const cartModel= mongoose.model('carts',cartSchema)
module.exports= cartModel