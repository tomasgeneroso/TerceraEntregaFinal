let prodModel = require('./schemaProducts.js')
//LOGGER
let winston = require('../../../utils/winston.js')

class Product{
    async getAllProducts(){
        try {
            let response = await prodModel.find({});
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async getProduct(title){
        try {
            let response = await prodModel.find({title:title});
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async addProduct(obj){
        try {
            let {title,description,price,stock}=obj
            
            let response= await new prodModel({title:title,description:description,price:price,stock:stock})
            response.save(el=>{if(el){winston.errorLogger.error(el)}});
            return response
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async reduceStock(title){
        try {
            prod.findOneAndUpdate({title:title},{stock:stock-1},function(err){winston.errorLogger.error(err)})
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
}
module.exports=Product