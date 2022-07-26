const express=require('express')
let productRouter=express.Router()
let productController=require('../controllers/controllerProducts.js')


productRouter.get('/', productController.getAllProducts);

productRouter.post('/', productController.addProduct);

module.exports=productRouter
