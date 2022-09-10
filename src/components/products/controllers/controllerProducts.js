let winston = require('../../../utils/winston.js')
let {product}=require('../../../DAOS/barrel.js')

const getAllProducts=async ()=>{
    try {
        let data = await product.getAllProducts()
        return data
    } catch (error) {
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
        console.log(error)
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
        winston.errorLogger.error(error)
    }
}
module.exports={getAllProducts,addProduct,getProduct,product}