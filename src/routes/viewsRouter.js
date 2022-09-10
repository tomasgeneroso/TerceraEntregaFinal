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
//register
Router.get('/register',viewsController.getRegister);
Router.post('/register',viewsController.register);

//login
Router.get('/' ,viewsController.getLogin);
Router.post('/',jwt.validateToken,viewsController.login);

//logout
Router.get('/logout',viewsController.getLogout);

//carro
Router.get('/cart',jwt.validateToken,viewsController.getProductsOnCart)
Router.post('/cart',viewsController.addProductToCart)
Router.post('/cartdeleted',viewsController.deleteCart)
Router.post('/itemdeleted',viewsController.removeProductsOnCart)


//products
Router.get('/product',jwt.validateToken,viewsController.getProds)
Router.post('/product',viewsController.addProds)

//fail route
Router.get('*', viewsController.failRoute);



module.exports=Router