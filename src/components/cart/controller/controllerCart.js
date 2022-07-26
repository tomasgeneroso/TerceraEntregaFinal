let winston = require('../../../utils/winston.js')
const Cart=require('../schema/modelCart.js')
let cart=new Cart()

const getProductsOnCart=async (req,res)=>{
    try {
        let idCart=req.session.id
        
        let response=await cart.getProductsOnCart(idCart)
        return response
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const addProductsToCart=async (req,res)=>{
    try {
        let idCart=req.session.id
        let idProd=req.body.title
            
        let response=await cart.addProductsToCart(idCart,idProd)
        return response
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const deleteCart=async(req,res)=>{
    try {
        let idCart=req.session.id
        let cartDeleted=await cart.deleteCart(idCart)
        return cartDeleted
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

module.exports={addProductsToCart,getProductsOnCart,deleteCart}