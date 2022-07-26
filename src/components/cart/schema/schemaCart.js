const mongoose=require('mongoose')
const cartSchema= new mongoose.Schema({
    id:{type:String,required:true},
    items:{type:Array}
})

const cartModel= mongoose.model('carts',cartSchema)
module.exports= cartModel