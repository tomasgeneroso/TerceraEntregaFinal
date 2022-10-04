//user
let user=require('../../../DAOS/barrel.js').user
//JWT
let jwt=require('jsonwebtoken')
let jwtsecret=require('../../../config/config.js').SECRET
let expireTime=require('../../../config/config.js').EXPIRE_TIME
//WINSTON
let winston=require('../../../utils/winston.js')

//genera jwt
const  signToken=async (user) => {
    try {
        let userE=user.toString()
        return jwt.sign({userE},jwtsecret,{expiresIn:expireTime})
    } catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 20 ~ validateToken ~ error", error)
        winston.errorLogger.error(error)
    }
}

//valida jwt
const validateToken=async (token) => {
    try {
        if(!token) return error        
        let verified=jwt.verify(token,jwtsecret)
        return verified
    }catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            winston.warningLogger.error(error)
            return false
        }
        console.log("🚀 ~ file: jwt.js ~ line 28 ~ validateToken ~ error", error)
       
        winston.warningLogger.error(error)
        return error
    }
}


const LoggedIn=async (req,res,next)=>{
    try {
        let token=req.cookies.token
        if(!token) res.redirect('/')
        let response=await validateToken(token)    
        if(!response) return res.redirect('/')
        next()
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
           
            winston.warningLogger.error(error)
           return false
        }
        console.log("🚀 ~ file: jwt.js ~ line 45 ~ isLoggedIn ~ error", error)
        winston.errorLogger.error(error)
        return error
    }
}
module.exports={signToken,validateToken,LoggedIn}