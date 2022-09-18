const productController=require('../components/products/controllers/controllerProducts.js')
const cartController=require('../components/cart/controller/controllerCart.js')
const userController=require('../components/users/controllers/controllerUsers.js')
let winston = require('../utils/winston.js');
let jwt=require('../components/users/controllers/jwt.js');
const { prod } = require('../DAOS/barrel.js');

let home=async(req,res)=>{
    try {
        let user=await userController.getUser(req,res)
        console.log("🚀 ~ file: viewsController.js ~ line 10 ~ home ~ user", user)
        if(!user) res.redirect('/')
        res.render('../views/home.ejs',{user})
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 11 ~ home ~ error", error)
        winston.errorLogger.error(error)
    }
}

let getLogin=async (req, res) => { 
    try {
        res.render('../views/pages/login.ejs')     
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 20 ~ getLogin ~ error", error)
        winston.errorLogger.error(error)
    }
}
let login=async (req, res) => { 
    try {
        let response=await userController.getUser(req,res)
        let userE={user:response.email}
        
        let token = await jwt.signToken(userE)
        let refreshToken = await jwt.generateRefreshToken(userE)
        
        if(!token){res.send("access denied, token't")}
        
        if(response){
            let user=response
            res.cookie('token', token)
            res.cookie('refresh_token', refreshToken)
            res.redirect('/home')
            //res.render('../views/home.ejs',{user})    //TODO:REDIRECT O RES.SEND? 
        }else{
            res.redirect('/register')
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
        let response=await userController.addUser(req,res)
        
        if(response){
            let userE={email:response.email}
            
            let token = await jwt.signToken(userE)
            let refreshToken = await jwt.generateRefreshToken(userE)
            console.log("🚀 ~ file: viewsController.js ~ line 49 ~ register ~ token",token)
            if(!token){res.send("access denied, token't")}
            
            res.cookie('token', token)
            res.cookie('refresh_token', refreshToken)
        }
        res.render('../views/pages/login.ejs')
    } catch (error) {
        console.log('error en viewsController, register',error)
        winston.errorLogger.error(error)
    }
}
let getLogout=async(req,res)=>{
    try {
        console.log('user logouts')
        let deleted=await userController.logOutUser(req,res)
        console.log("🚀 ~ file: viewsController.js ~ line 81 ~ getLogout ~ deleted", deleted)
        if(!deleted) return error
        res.clearCookie("token");
        res.clearCookie("refresh_token");
        res.redirect('/login')
    } catch (error) {
        console.log('error en getlogout viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let failRoute=async(req,res)=>{
    try {
        res.send({message:'fail route!'})
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 99 ~ failRoute ~ error", error)
        
        winston.errorLogger.error(error)
    }
}
let deleteProd=async(req,res)=>{
    try {
        let title=req.title
        let product=await productController.getAllProducts()
        
        let date= Date.now()
        let deleted=await productController.deleteProduct(title)
        if(deleted) res.render('../views/pages/product.ejs',{product,date,confirmation})
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 106 ~ deleteProd ~ error", error)
        winston.errorLogger.error(error)
    }
}
let getProds=async(req,res)=>{
    try {
        //luego enviar prods para mostrarlos
        let product=await productController.getAllProducts()
        console.log("🚀 ~ file: viewsController.js ~ line 148 ~ getProds ~ product", JSON.stringify(product))
        let confirmation=false
        let date= Date.now()
        res.render('../views/pages/product.ejs',{product,date,confirmation})
    } catch (error) {
        console.log('error en getProds viewscontroller',error)
        winston.errorLogger.error(error)
    }
}
let addProds=async(req,res)=>{
    try {
        let data = req.body
        let product=await productController.addProduct(data)
        console.log("🚀 ~ file: viewsController.js ~ line 133 ~ addProds ~ product", product)
        if(product) res.redirect('/product')
        else return error
        
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 162 ~ addProds ~ error", error)
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
let deleteCart=async (req,res)=>{
    try {
        let cart =await cartController.deleteCart(req,res)
        let quantity=0
        let total=0
        //TODO:ELIMINAR DE OTRA FORMA
        //req.session.destroy(err=>{
        //if(err) console.log('Error trying delete the cart '+err)
        //
        res.clearCookie("token");
        res.clearCookie("refresh_token");
        res.redirect('/product') //TODO: REVER
        //res.render('../views/pages/carro.ejs',{cart,quantity,total})
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

module.exports={getLogin,getRegister,login,register,getLogout,failRoute,getProductsOnCart,addProductToCart,getProds,addProds,deleteProd,deleteCart,removeProductsOnCart,home}