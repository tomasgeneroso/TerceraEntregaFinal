const mongoose=require('mongoose')
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

const prodSchema= new mongoose.Schema({
    title:{type:String,required:true},//title es el id
    description:{type:String},
    price:{type:Number,required:true},
    stock:  {type:Number, required:true},
    createdAt: { type: Date, default: formatDate(new Date()), index:true }
})

const prodModel= mongoose.model('products',prodSchema)
module.exports= {prodModel}