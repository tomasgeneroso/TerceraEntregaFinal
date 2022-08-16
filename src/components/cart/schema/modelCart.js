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
            console.log('productF es en addProductsToCart ',productF)
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
  
    async removeProductsOnCart(cartF,productF){
        try {
            let response
            // console.log('productF[0] es ',productF)
            //console.log('cartF.id es: ',cartF.id)
            let cartS=await cartModel.findOne({id:cartF.id},'items')
            let itemsS=cartS.items
            
            //arregar filter para que se borre uno solo...
            //buscar index -> sacar con split
            let items=itemsS.filter(e=>{return e.title!=productF.title})
            console.log('filter es ',items)
            await cartModel.updateOne({id:cartF.id},{items:items,quantity:quantity-1,total:total-productF.price})
            response=await cartModel.find({id:cartF.id}) 
           
            return  response[0]
        } catch (error) {
            console.log('error en remove products ',error)
            winston.errorLogger.error(error)
        }
    }
}

module.exports=Cart