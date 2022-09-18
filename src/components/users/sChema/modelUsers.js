let {userModel} = require('./schemaUsers.js')
//LOGGER
let winston = require('../../../utils/winston.js')
const bcrypt=require('bcrypt');

class User{
    async getUser(email){
        try {
            let response = await userModel.find({email:email})
            if(response.length > 0) return response;
            return false
        } catch (error) {
            console.log("🚀 ~ file: modelUsers.js ~ line 14 ~ User ~ getUser ~ error", error)
            winston.errorLogger.error(error)
        }
    }
    async addUser(obj){
        
        try {
            let mail=obj.email
            
            let userE=await this.getUser(mail)
            
            if(!userE){
                let {name,surname,email,password,age,address,phone,profilePhoto}=obj
                let passwordH=await bcrypt.hash(password, 10)
                let response= new userModel({email:email,password:passwordH,name:name,surname:surname,age:age,address:address,phone:toString(phone),profilePhoto:profilePhoto})
                response.save(el=>{if(el){console.log('error en adduser ',el);winston.errorLogger.error('error adduser saving',el)}});
                return response
            }else{
                return userE
            }
        } catch (error) {
            console.log('error en adduser modelusers ',error)
            winston.errorLogger.error(error)
        }
    }
async comparePassword(hash,pass){
        try {
            let validate = await bcrypt.compare(pass, hash)
            if (!validate) return false
            return true
        } catch (error) {
            console.log('error en comparepassword modelusers ',error)
            winston.errorLogger.error(error)
        }
    }    

    async validateLogin(username,password){
        try {
            let user = await userModel.findOne({email: username })
            if (user) {    
                let compare = await this.comparePassword(user.password, password)
                if(!compare)return false
                return user
            }
            else {
                return false
            }
        } catch (error) {
            console.log('error en validatelogin modelusers ',error)
            winston.errorLogger.error(error)
        }
    }
}
module.exports={User}