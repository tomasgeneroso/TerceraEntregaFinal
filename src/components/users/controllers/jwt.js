//user
let user=require('../../../DAOS/barrel.js').user
//JWT
let jwt=require('jsonwebtoken')
let jwtsecret=require('../../../config/config.js').SECRET
let expireTime=require('../../../config/config.js').EXPIRE_TIME
const  generateToken= (user) => {
    return jwt.sign(user,jwtsecret,{expiresIn:expireTime})
}

const validateToken=async (req,res,next) => {
    //TODO:TOKEN UNDEFINEDs
    try {
        if (req.headers.authorization &&req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
        } 
        const token = req.headers.authorization;
        console.log("🚀 ~ file: jwt.js ~ line 15 ~ validateToken ~ token", token)
        const verified=jwt.verify(token,jwtsecret)
        if(!token) res.status(401).send('Access denied')
        console.log("🚀 ~ file: jwt.js ~ line 20 ~ validateToken ~ verified", verified)
        req.user=verified
        next()
    }catch (error) {
        console.log("🚀 ~ file: jwt.js ~ line 20 ~ validateToken ~ error", error)
        res.status(400).send('Access denied, token expired or incorrect',error)
    }

}

module.exports={generateToken,validateToken}