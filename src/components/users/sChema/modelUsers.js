let userModel = require('./schemaUsers.js')
//LOGGER
let winston = require('../../../utils/winston.js')
const bcrypt=require('bcrypt')
class User{
    async getUser(email){
        try {
            let response = await userModel.find({email:email});
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async addUser(obj){
        try {  
            let {name,surname,email,password,age,address,phone,profilePhoto}=obj
            let passwordH=await bcrypt.hash(password, 10)
            
            let response= new userModel({email:email,password:passwordH,name:name,surname:surname,age:age,address:address,phone:toString(phone),profilePhoto:profilePhoto})
            response.save(el=>{if(el){winston.errorLogger.error(el)}});
            return response
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async comparePassword(hash,pass){
        try {
            let validate = await bcrypt.compare(pass, hash)
            if (validate) {
                return true
            } else {
                return false
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async validateLogin(username,password){
        try {
            let userPass = await userModel.findOne({email: username })
            if (userPass) {
                let compare = await this.comparePassword(userPass.password, password)
                if(!compare)return false
                return userPass
            }
            else {
                return false
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
}
module.exports=User