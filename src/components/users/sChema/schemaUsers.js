const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    phone:{type:String,required:true},
    age:{type:Number},
    address:{type:String},
    profilePhoto:{type:String} //contiene path de la foto
})

const userModel= mongoose.model('users',userSchema)
module.exports= {userModel}