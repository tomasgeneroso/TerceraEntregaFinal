const productController=require('../components/products/controllers/controllerProducts.js')
const cartController=require('../components/cart/controller/controllerCart.js')
const userController=require('../components/users/controllers/controllerUsers.js')
let winston = require('../utils/winston.js');
let jwt=require('../components/users/controllers/jwt.js')
let getLogin=async (req, res) => { 
    try {
        res.render('../views/pages/login.ejs')     
    } catch (error) {
        console.log('error en getLogin viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let login=async (req, res) => { 
    try {
        let response=await userController.getUser(req,res)
        let user=response.user
        let token=jwt.generateToken(user)
        if(!token){res.send("access denied, token't")}
        //mandar al header
        if(user){
            res.setHeader('authorization', token)
            res.render('../views/home.ejs',{user})     
        }else{
            res.render('../views/pages/register.ejs')
        }
    } catch (error) {
        console.log('error viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let getRegister=async (req, res) => { 
    try {
        res.render('../views/pages/register.ejs')     
    } catch (error) {
        console.log('error en viewsController, getregister',error)
        winston.errorLogger.error(error)
    }
}
let register=async(req,res)=>{
    try {
        let responseUser=await userController.getUser(req,res)
        
        if(!responseUser){
            let response=await userController.addUser(req,res)
            
            let user={email:response.email}
            let token=jwt.generateToken(user)
            console.log("🚀 ~ file: viewsController.js ~ line 49 ~ register ~ token",token)
            if(!token){res.send("access denied, token't")}
            //mandar response.accessToken al header
            res.setHeader('authorization',token)
            res.render('../views/pages/login.ejs',{response})
        }else{
            res.redirect('/product')
        }
    } catch (error) {
        console.log('error en viewsController, register',error)
        winston.errorLogger.error(error)
    }
}
let getLogout=async(req,res)=>{
    try {
        console.log('user logouts')
        await userController.logOutUser()
        res.render('../views/pages/login.ejs')
    } catch (error) {
        console.log('error en getlogout viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let failRoute=async(req,res)=>{
    try {
        res.send({message:'fail route!'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
let deleteCart=async (req,res)=>{
    try {
        let cart =await cartController.deleteCart(req,res)
        let quantity=0
        let total=0
        req.session.destroy(err=>{
        if(err) console.log('Error trying delete the cart '+err)
        res.render('../views/pages/carro.ejs',{cart,quantity,total})
        })
    } catch (error) {
        console.log('error en deletecart',error)
        winston.errorLogger.error(error)
    }
    
}
let getProductsOnCart=async(req,res)=>{
    try {
        let cartF=await cartController.getProductsOnCart(req,res)
        let quantity=cartF.quantity
        let cart=cartF.items
        let total=cartF.total
        res.render('../views/pages/carro.ejs',{cart,quantity,total})
    } catch (error) {
        console.log('error en getallprodoncart',error)
        winston.errorLogger.error(error)
    }
}
let addProductToCart=async(req,res)=>{
    try {
        let cartF=await cartController.addProductsToCart(req,res)
        let quantity=cart.quantity
        let total=cart.total
        let cart=cartF.items 
        res.render('../views/pages/carro.ejs',{cart,quantity,total})
    } catch (error) {
        console.log('error en addprodtocart',error)
        winston.errorLogger.error(error)
    }
}
let getProds=async(req,res)=>{
    try {
        //luego enviar prods para mostrarlos
        let prods=await productController.getAllProducts()
        let confirmation=false
        res.render('../views/pages/products.ejs',{confirmation,prods})
    } catch (error) {
        console.log('error en getProds viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let addProds=async(req,res)=>{
    try {
        let data = req.body;
        let product=await productController.addProduct(data)
        let confirmation
        if(product){confirmation=true}else{confirmation=false}
        res.render('../views/pages/products.ejs',{confirmation})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
let removeProductsOnCart=async(req,res)=>{
    try {
        //restar quantity y total, luego agregar si total=0 y quantity==0 entonces no mostrar cart
        let cart =await cartController.removeProductsOnCart(req,res)
        console.log('cart es ',cart)
        let quantity=cart.quantity
        let total=cart.total
        console.log('log cart!',cart)
        res.render('../views/pages/carro.ejs',{cart,quantity,total})
    } catch (error) {
        console.log('error en views ',error)
        winston.errorLogger.error(error)
    }
}
let isLogin=async(req,res,next)=>{
    try {
        console.log('ingresa a islogin')
        if(req.session){
            console.log('voy por el islogin')
            next()
        }else{
            
            res.redirect('/product')
        }
    } catch (error) {
        console.log('error en isLogin',error)
        winston.errorLogger.error(error)
    }
    
}

module.exports={isLogin,getLogin,getRegister,login,register,getLogout,failRoute,getProductsOnCart,addProductToCart,getProds,addProds,deleteCart,removeProductsOnCart}