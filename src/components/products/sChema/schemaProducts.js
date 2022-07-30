const mongoose=require('mongoose')
const prodSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true},
    stock:  {type:Number, required:true}
})

const prodModel= mongoose.model('products',prodSchema)
module.exports= prodModel