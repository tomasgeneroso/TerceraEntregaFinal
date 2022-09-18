const mongoose=require('mongoose')
const {expireTime}=require('../../../config/config.js')
const userSchema= new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    phone:{type:String,required:true},
    age:{type:Number},
    address:{type:String},
    profilePhoto:{type:String},
    createdAt: { type: Date, expires: expireTime, default: Date.now, index:true }//contiene path de la foto
})

const userModel= mongoose.model('users',userSchema)
module.exports= {userModel}