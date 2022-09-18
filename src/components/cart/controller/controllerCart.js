let winston = require('../../../utils/winston.js')
let {cart}=require('../../../DAOS/barrel.js')
let productController=require('../../products/controllers/controllerProducts.js')

const getProductsOnCart=async (req,res)=>{
    try {
        let cookieTrim=req.headers.cookie
        let idCart=cookieTrim.substring(12,(cookieTrim.length))
        let response=await cart.getProductsOnCart(idCart)
        return response
    } catch (error) {
        console.log("🚀 ~ file: controllerCart.js ~ line 12 ~ getProductsOnCart ~ error", error)
        
        winston.errorLogger.error(error)
    }
}
const addProductsToCart=async (req,res)=>{
    try {
        let cookieTrim=req.headers.cookie
        let idCart=cookieTrim.substring(12,(cookieTrim.length))
        let idProd=req.body.title
        let productF=await productController.product.getProduct(idProd)
        let response
        if(productF){
            let cartF=await cart.getCart(idCart)
            response=await cart.addProductsToCart(cartF,productF)
        }
        return response
    } catch (error) {
        console.log("🚀 ~ file: controllerCart.js ~ line 30 ~ addProductsToCart ~ error", error)
        winston.errorLogger.error(error)
    }
}
const deleteCart=async(req,res)=>{
    try {
        let cookieTrim=req.headers.cookie
        let idCart=cookieTrim.substring(12,(cookieTrim.length))
        let cartDeleted=await cart.deleteCart(idCart)
        return cartDeleted
    } catch (error) {
        console.log("🚀 ~ file: controllerCart.js ~ line 41 ~ deleteCart ~ error", error)
        winston.errorLogger.error(error)
    }
}

//no se llama
const removeProductsOnCart=async(req,res)=>{
    try {
        let idProd=req.body.title
        //busca producto 
        let productF=await productController.product.getProduct(idProd)
        //obtener id cart
        let cookieTrim=req.headers.cookie
        let idCart=cookieTrim.substring(12,(cookieTrim.length))
        let cartF=await cart.getCart(idCart)
        let response
        //si existe producto
        if(productF&&cartF){
            response=await cart.removeProductsOnCart(cartF,productF[0])
            return response
        }else{

            return error
        }
        
    } catch (error) {
        console.log("🚀 ~ file: controllerCart.js ~ line 67 ~ removeProductsOnCart ~ error", error)
        winston.errorLogger.error(error)
    }
}

module.exports={addProductsToCart,getProductsOnCart,deleteCart,removeProductsOnCart}