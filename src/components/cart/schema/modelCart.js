const cartModel=require('./schemaCart.js')
const product=require('../../products/sChema/modelProducts.js')
class Cart{
    async getCart(idCart){
        try {
            let cart=cartModel.find({idCart:idCart})
            if(cart){ //si existe el carro
                return cart
            }else{ //si no existe el carro lo crea
                let newCart=cartModel.create({id:idCart,items:[]},function(err){winston.errorLogger.error(err)})
                return newCart
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async addProductsToCart(idCart,idProd){
        try {
            //busca producto 
            let productF=product.getProduct(idProd)
            //si existe
            if(productF){
                let response=cartModel.findOneAndUpdate({id:idCart},{items:items.push(productF)},function(err){winston.errorLogger.error(err)})
                return response
            }else{
                winston.errorLogger.error('product doesn-t exists')
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
    async getProductsOnCart(idCart){
        try {
            let cart=this.getCart(idCart)
            return cart.items
        } catch (error) {
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