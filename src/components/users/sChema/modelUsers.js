let {userModel} = require('./schemaUsers.js')
//LOGGER
let winston = require('../../../utils/winston.js')
const bcrypt=require('bcrypt');
const { generateToken } = require('../controllers/jwt.js');
class User{
    async getUser(email){
        try {
            let response = await userModel.find({email:email});
            return response;
        } catch (error) {
            console.log('error en getuser modelusers ',error)
            winston.errorLogger.error(error)
        }
    }
    async addUser(obj){
        try {  
            let {name,surname,email,password,age,address,phone,profilePhoto}=obj
            let passwordH=await bcrypt.hash(password, 10)
            
            let response= new userModel({email:email,password:passwordH,name:name,surname:surname,age:age,address:address,phone:toString(phone),profilePhoto:profilePhoto})
            response.save(el=>{if(el){console.log('error en adduser ',el);winston.errorLogger.error('error adduser saving',el)}});
            //console.log('adduser modelUsers ',response)
            let accessToken=generateToken(obj)
            response.accessToken=accessToken
            return response
        } catch (error) {
            console.log('error en adduser modelusers ',error)
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
            console.log('error en comparepassword modelusers ',error)
            winston.errorLogger.error(error)
        }
    }

    async validateLogin(username,password){
        try {
            let user = await userModel.findOne({email: username })
            if (user) {    
                let compare = await this.comparePassword(user.password, password)
                let obj={
                    email:user.email
                }
                if(!compare)return false
                let accessToken=generateToken(obj)
                let response={user:user,token:accessToken}
                console.log('user en modelUsers Validate login ')
                return response
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