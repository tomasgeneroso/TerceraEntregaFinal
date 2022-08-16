let winston = require('../../../utils/winston.js')
let user=require('../../../DAOS/barrel.js').user
console.log('user en controlleruser es ',user)
const getUser=async (req,res)=>{
    try {
        let data = await user.validateLogin(req.body.email,req.body.password)
        return data
    } catch (error) {
        console.log('error en controllerUsers, getuser')
        winston.errorLogger.error(error)
    }
}
const addUser=async (req,res)=>{
    try {
        let data=req.body
        if (!data.email || !data.password || !data.name || !data.surname) {
            res.status(400).send({message: 'Faltan datos, vuelve atras'});
        } else {
            console.log('user en controlleruser addUser',user)
            let response = await user.addUser(data)
            return response
        }
    } catch (error) {
        console.log('error en controllerUsers, adduser',error)
        winston.errorLogger.error(error)
    }
}
let logOutUser = async (req, res, next) => {
    try {
        req.session.destroy();
        next()
    } catch (error) {
        console.log('error en controllerUsers, logout')
        winston.errorLogger.error(error)
    }
}

module.exports={getUser,addUser,logOutUser}