const cartModel=require('./schemaCart.js')
const product=require('../../products/sChema/schemaProducts.js')
let winston = require('../../../utils/winston.js');
class Cart{
    async getCart(idCart){
        try { 
            let cart=await cartModel.findOne({id:idCart})
            if(cart){ //si existe el carro
                console.log('carro existente',cart)
                return cart
            }else{ //si no existe el carro lo crea
                let newcart = new cartModel({id:idCart,items:[]});
                newcart.save(function (err) {
                    console.log(err);
                });
                console.log('carro nuevo creado',newcart)
                return newcart
            }
        } catch (error) {
            console.log('error en getcart',error)
            winston.errorLogger.error(error)
        }
    }
    async addProductsToCart(idCart,idProd){
        try {
            //busca producto 
            let productF=await product.find({title:idProd})
            //let cartF=await this.getCart(idCart)
            let cartF=await cartModel.findOne({id:idCart})
            console.log(productF,cartF)
            //si existe producto y carro
            if(productF && cartF){
                let response=await cartModel.updateOne( { id: idCart }, { $push: { items: productF } });
                return response
            }
            if(!cartF){
                let cartF=await this.getCart(idCart)
                let response=await cartModel.updateOne( { id: idCart }, { $push: { items: productF } });
                return response
                winston.errorLogger.error('product doesn-t exists')
            }
        } catch (error) {
            console.log('error en addproductstocart',error)
            winston.errorLogger.error(error)
        }
    }
    async getProductsOnCart(idCart){
        try {
            let cart=await this.getCart(idCart)
            return cart.items
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async deleteCart(idCart){
        try {
            //busca producto 
            let cartF=await this.getCart(idCart)
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