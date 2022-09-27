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
        if(!token) res.status(401).send('Access denied')        
        let verified=jwt.verify(token,jwtsecret)
        return verified
    }catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            console.log("🚀 ~ file: jwt.js ~ line 29 ~ validateToken ~ error, the token expired", error)
            winston.warningLogger.error(error)
        }else{
            console.log("🚀 ~ file: jwt.js ~ line 32 ~ validateToken ~ error", error)
            winston.errorLogger.error(error)
        }
        return false
    }
}


const LoggedIn=async (req,res,next)=>{
    try {
        let token=req.cookies.token
        if(token){ 
            let response=await validateToken(token)    
            if(!response) return error
            next()
        }else{
            return error
        }
        
    } catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 45 ~ isLoggedIn ~ error", error)
        winston.errorLogger.error(error)
        res.redirect('/')
    }
}
module.exports={signToken,validateToken,LoggedIn}