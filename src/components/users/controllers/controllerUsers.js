let winston = require('../../../utils/winston.js')
let {User}=require('../sChema/modelUsers.js')
let user=new User() 

const getUser=async (req,res)=>{
    try {
        let data = await user.validateLogin(req.body.email,req.body.password)
       
        return data
    } catch (error) {
        console.log('error en controllerUsers, getuser',error)
        winston.errorLogger.error(error)
    }
}
const addUser=async (req,res)=>{
    try {
        let data=req.body
        if (!data.email || !data.password || !data.name || !data.surname) {
            res.status(400).send({message: 'Faltan datos, vuelve atras'});
        } else {
            
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
        console.log('error en controllerUsers, logout',error)
        winston.errorLogger.error(error)
    }
}

module.exports={getUser,addUser,logOutUser}