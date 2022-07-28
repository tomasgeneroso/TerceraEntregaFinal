const mongoose=require('mongoose')
const cartSchema= new mongoose.Schema({
    id:{type:String,required:true},
    items:[{
        title:{type:String,required:true},
        description:{type:String},
        price:{type:Number},
        stock:  {type:Number, required:true}
    }]
})

const cartModel= mongoose.model('carts',cartSchema)
module.exports= cartModel