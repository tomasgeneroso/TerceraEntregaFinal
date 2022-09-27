let winston = require('../../../utils/winston.js')
let {prod}=require('../../../DAOS/barrel.js')
const getAllProducts=async ()=>{
    try {
        let data = await prod.getAllProducts()
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
            let response = await prod.addProduct(data)
            return response
        }
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 24 ~ addProduct ~ error", error)
        winston.errorLogger.error(error)
    }
}
const  getProduct=async (title)=>{
    try {
        if (!title) res.status(400).send({message: 'No title'});
        let response = await prod.getProduct(title)
        return response
        
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 38 ~ getProduct ~ error", error)
        winston.errorLogger.error(error)
    }
}
const deleteProduct=async(title)=>{
    try {
        let deleted = await prod.deleteProd(title)
        console.log("🚀 ~ file: controllerProducts.js ~ line 46 ~ deleteProduct ~ deleted", deleted)
        if(deleted) return deleted
        else return false
    } catch (error) {
        console.log("🚀 ~ file: controllerProducts.js ~ line 46 ~ deleteProduct ~ error", error)
        winston.errorLogger.error("🚀 ~ file: controllerProducts.js ~ line 46 ~ deleteProduct ~ error",error)
    }
}
module.exports={getAllProducts,addProduct,getProduct,deleteProduct,prod}