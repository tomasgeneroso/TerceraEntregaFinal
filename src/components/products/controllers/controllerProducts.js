let winston = require('../../../utils/winston.js')
let {product}=require('../../../DAOS/barrel.js')
const getAllProducts=async ()=>{
    try {
        let data = await product.getAllProducts()
        return data
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 9 ~ getAllProducts ~ error", error)
        winston.errorLogger.error(error)
    }
}
const addProduct=async (data)=>{
    try {
        if (!data.title || !data.price || !data.stock) {
            res.status(400).send({
                message: 'Faltan datos'
            });
        } else {
            let response = await product.addProduct(data)
            return response
        }
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 24 ~ addProduct ~ error", error)
        winston.errorLogger.error(error)
    }
}
const  getProduct=async (title)=>{
    try {
        if (!title) {
            res.status(400).send({
                message: 'No title'
            });
        } else {
            let response = await product.getProduct(title)
            return response
        }
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 38 ~ getProduct ~ error", error)
        winston.errorLogger.error(error)
    }
}
const deleteProduct=async(data)=>{
    try {
        let deleted = await product.deleteProduct(data.title)
        if(deleted) return deleted
        else return false
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 46 ~ deleteProduct ~ error", error)
        winston.errorLogger.error("🚀 ~ file: controllerProducts.js ~ line 46 ~ deleteProduct ~ error",error)
    }
}
module.exports={getAllProducts,addProduct,getProduct,deleteProduct,product}