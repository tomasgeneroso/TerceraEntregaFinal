const cartModel=require('./schemaCart.js')

let winston = require('../../../utils/winston.js');
class Cart{
    async getCart(idCart){
        try { 
            let cart=await cartModel.findOne({id:idCart})
            if(cart){ //si existe el carro               
                return cart
            }else{ //si no existe el carro lo crea
                let newcart = new cartModel({id:idCart,items:[],quantity:0,total:0});
                newcart.save(function (err) {console.log(err);});
                return newcart
            }
        } catch (error) {
            console.log('error en getcart',error)
            winston.errorLogger.error(error)
        }
    }
    async addProductsToCart(cartF,productF){
        try {
            let price=productF[0].price+cartF.total
            await cartModel.updateOne( { id: cartF.id }, { $push: { items: productF }, $inc:{quantity:1},$set:{total:price} });
            let response=await cartModel.findOne({id:cartF.id})
            return response
        } catch (error) {
            console.log('error en addproductstocart',error)
            winston.errorLogger.error(error)
        }
    }
    async getProductsOnCart(idCart){
        try {
            let cart=await this.getCart(idCart)    
            return cart
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async deleteCart(idCart){
        try {
            //busca producto 
            let cartF=await cartModel.findOne({id:idCart})
            //si existe
            if(cartF){
                let cartDeleted=await cartModel.deleteOne({id:idCart})
                return cartDeleted
            }else{
                return false
            }
        } catch (error) {
            console.log('error en deletecart',error)
            
            winston.errorLogger.error(error)
        }
    }
    /*
    async removeProductsOnCart(idCart,idProd){
        try {
            //busca producto 
            let productF=product.getProduct(idProd)
            //si existe
            if(productF){
                let newCart
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }*/
}

module.exports=Cart