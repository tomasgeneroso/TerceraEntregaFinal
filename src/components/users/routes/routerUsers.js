const express=require('express')
let userRouter=express.Router()
let userController=require('../controllers/controllerUsers.js')


userRouter.post('/', passport.authenticate('login', { failureRedirect: "errorLogin", successRedirect: "home" }));
userRouter.post('/register', passport.authenticate('register', { failureRedirect: "home", successRedirect: "login", failureMessage:"error al verificar"}));
userRouter.get('/logout',userController.logOutUser)
module.exports=userController
