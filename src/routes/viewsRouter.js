const express=require('express')
//ROUTER
const Router = express.Router()
//CONTROLLERS
let viewsController=require('../controller/viewsController.js');
//LOGGER
let winston = require('../utils/winston.js');
//JWT
let jwt=require('../components/users/controllers/jwt.js')
//RUTAS
//TODO: AGREGAR VERIFY COMO MID EN LAS RUTAS
//post
Router.get('/home',jwt.LoggedIn,viewsController.home)

//register
Router.get('/register',viewsController.getRegister);
Router.post('/register',viewsController.register);

//login
//TODO: SI LOG ENTONCES PASAR A HOME
Router.get('/' ,viewsController.getLogin);
Router.post('/',viewsController.login);

//logout
Router.get('/logout',viewsController.getLogout);

//carro
Router.get('/cart',jwt.LoggedIn,viewsController.getCart)
Router.post('/cart',jwt.LoggedIn,viewsController.addProductToCart)
Router.post('/cartdeleted',jwt.LoggedIn,viewsController.deleteCart)
Router.post('/itemdeleted',jwt.LoggedIn,viewsController.removeProductsOnCart)


//products
Router.get('/product',jwt.LoggedIn,viewsController.getProds)
Router.post('/product',viewsController.addProds)
Router.post('/product/:title',viewsController.deleteProd)

//fail route
Router.get('*', viewsController.failRoute);



module.exports=Router