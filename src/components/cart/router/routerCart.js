const express=require('express')
const cartController=require('../controller/controllerCart.js')
const cartRouter=express.Router()

cartRouter.get('/',cartController.getProductsOnCart)
cartRouter.post('/',cartController.addProductsToCart)

module.exports=cartRouter