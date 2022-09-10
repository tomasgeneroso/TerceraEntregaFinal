const express=require('express')
let userRouter=express.Router()
let userController=require('../controllers/controllerUsers.js')


userRouter.post('/',userController.getUser);
userRouter.post('/register',userController.addUser);
userRouter.get('/logout',userController.logOutUser)
module.exports=userRouter
