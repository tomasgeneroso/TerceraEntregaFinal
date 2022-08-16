const express=require('express')
//ROUTER
const Router = express.Router()
//CONTROLLERS
let viewsController=require('../controller/viewsController.js');

//LOGGER
let winston = require('../utils/winston.js');
//PASSPORT
const passport = require('passport')

//RUTAS
//register
Router.get('/register',viewsController.isLogin ,viewsController.getRegister);
Router.post('/register',passport.authenticate('register',{failureRedirect:'/register',failureMessage:'error in passport authenticate register'}),viewsController.register);

//login
Router.get('/' ,viewsController.getLogin);
Router.post('/',passport.authenticate('login',{failureRedirect:'/',failureMessage:'error in passport authenticate login'}),viewsController.login);

//logout
Router.get('/logout', viewsController.getLogout);

//carro
Router.get('/cart',viewsController.isLogin,viewsController.getProductsOnCart)
Router.post('/cart',viewsController.addProductToCart)
Router.post('/cartdeleted',viewsController.deleteCart)
Router.post('/itemdeleted',viewsController.removeProductsOnCart)


//products
Router.get('/product',viewsController.isLogin,viewsController.getProds)
Router.post('/product',viewsController.addProds)

//fail route
Router.get('*', viewsController.failRoute);



module.exports=Router