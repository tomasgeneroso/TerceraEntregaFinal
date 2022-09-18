let {prodModel} = require('./schemaProducts.js')
//LOGGER
let winston = require('../../../utils/winston.js')

class Product{
    async getAllProducts(){
        try {
            let response = await prodModel.find({},(error,result)=>{
                if (error) return error
                else return response
            });
            console.log("🚀 ~ file: modelProducts.js ~ line 9 ~ Product ~ getAllProducts ~ response", response)
            return response;
        } catch (error) {
            console.log("🚀 ~ file: modelProducts.js ~ line 12 ~ Product ~ getAllProducts ~ error", error)
            winston.errorLogger.error(error)
        }
    }
    async getProduct(title){
        try {
            let response = await prodModel.find({title:title});
            return response;
        } catch (error) {
            console.log("🚀 ~ file: modelProducts.js ~ line 20 ~ Product ~ getProduct ~ error", error)
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
            console.log("🚀 ~ file: modelProducts.js ~ line 31 ~ Product ~ addProduct ~ error", error)
            winston.errorLogger.error(error)
        }
    }

    async deleteProd(title){
        try {
            let prod=await this.getProduct(title)
            if(prod){ 
                let deleted=await prodModel.deleteOne({title:title})
                return deleted
            }else{
                return false
            }

        } catch (error) {
            console.log("🚀 ~ file: modelProducts.js ~ line 39 ~ Product ~ deleteProd ~ error", error)
            winston.errorLogger.error(error)
        }
    }

    async reduceStock(title){
        try {
            prod.findOneAndUpdate({title:title},{stock:stock-1},function(err){winston.errorLogger.error(err)})
        } catch (error) {
            console.log("🚀 ~ file: modelProducts.js ~ line 48 ~ Product ~ reduceStock ~ error", error)
            winston.errorLogger.error(error)
        }
    }
}
let prod=new Product()
module.exports=prod