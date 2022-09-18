//user
let user=require('../../../DAOS/barrel.js').user
//JWT
let jwt=require('jsonwebtoken')
let jwtsecret=require('../../../config/config.js').SECRET
let expireTime=require('../../../config/config.js').EXPIRE_TIME
//WINSTON
let winston=require('../../../utils/winston.js')
const  signToken=async (user) => {
    try {
        let userE=user.toString()
        return jwt.sign({userE},jwtsecret,{expiresIn:expireTime})
    } catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 20 ~ validateToken ~ error", error)
        winston.errorLogger.error(error)
    }
}

const validateToken=async (token) => {
    //TODO:TOKEN UNDEFINEDs
    try {
        if(!token) res.status(401).send('Access denied')        
        let verified=jwt.verify(token,jwtsecret)
        return verified
    }catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            console.log("🚀 ~ file: jwt.js ~ line 29 ~ validateToken ~ error, the token expired", error)
            winston.errorLogger.error(error)
        }else{
            console.log("🚀 ~ file: jwt.js ~ line 32 ~ validateToken ~ error", error)
            winston.errorLogger.error(error)
        }
        return false
    }

}
const generateRefreshToken = async (user) => {
    let refreshPayload = user.toString()
    try {
        let refreshToken = jwt.sign({refreshPayload}, jwtsecret, {expiresIn:expireTime})
        return refreshToken
    } catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 42 ~ generateRefreshToken ~ error", error)
        winston.errorLogger.error(error)
    }
}

const LoggedIn=async (req,res,next)=>{
    try {
        if(req.cookies.token){ 
            let response=await validateToken(req.cookies.token)    
            if(!response) return error
            req.user=response
            let newToken = await signToken(req.user)
        
            res.cookie('token', newToken)
            next()
        }
        
    } catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 45 ~ isLoggedIn ~ error", error)
        winston.errorLogger.error(error)
        res.redirect('/')
    }
}
module.exports={signToken,validateToken,generateRefreshToken,LoggedIn}