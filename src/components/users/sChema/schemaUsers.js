const mongoose=require('mongoose')
const {EXPIRE_TIME}=require('../../../config/config.js')
const userSchema= new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    phone:{type:String,required:true},
    age:{type:Number},
    address:{type:String},
    profilePhoto:{type:String},//contiene path de la foto
    createdAt: { type: Date, expires: EXPIRE_TIME, default: Date.now, index:true }
})

const userModel= mongoose.model('users',userSchema)
module.exports= {userModel}