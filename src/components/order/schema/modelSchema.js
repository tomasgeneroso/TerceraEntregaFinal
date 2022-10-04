const mongoose=require('mongoose')
const {EXPIRE_TIME}=require('../../../config/config.js')

const orderSchema= new mongoose.Schema({
    id:{type:String,required:true}, 
    items:[{
        title:{type:String,required:true},
        description:{type:String},
        price:{type:Number},
        stock:  {type:Number, required:true}
    }],
    quantity:{type:Number},
    total:{type:Number},
    createdAt: { type: Date, expires: EXPIRE_TIME, default: Date.now, index:true }
})

const orderModel= mongoose.model('orders',orderSchema)
module.exports= orderModel