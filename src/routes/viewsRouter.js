const express=require('express')
const Router = express.Router()
let viewsController=require('../controller/viewsController.js');

//LOGGER
let winston = require('../utils/winston.js');

//register
Router.get('/register', viewsController.getRegister);
Router.post('/register' ,viewsController.register);

//login
Router.get('/', viewsController.getLogin);
Router.post('/',viewsController.login);

//logout
Router.get('/logout', viewsController.getLogout);

//carro
Router.get('/cart',viewsController.getAllProducts)
Router.post('/cart',viewsController.addProduct)


//products
Router.get('/product',viewsController.getProds)
Router.post('/product',viewsController.addProds)

//fail route
Router.get('*', viewsController.failRoute);



module.exports=Router