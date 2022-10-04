const productController=require('../components/products/controllers/controllerProducts.js')
const cartController=require('../components/cart/controller/controllerCart.js')
const userController=require('../components/users/controllers/controllerUsers.js')
let winston = require('../utils/winston.js');
let jwt=require('../components/users/controllers/jwt.js');
let {sendMail}=require('../utils/nodemailer.js')
let {cart}=require('../DAOS/barrel.js')

let home=async(req,res)=>{
    try {
        let user=req.cookies.user
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
        if(response){
            let user=response
            let userE={user:response.email}
            let token = await jwt.signToken(userE) 
            if(!token){res.send("access denied, token't")}
            res.cookie('token', token)
            res.cookie('user',response)
            res.render('../views/home.ejs',{user})    //TODO:REDIRECT O RES.SEND? para mir redirect pero como mandar email
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
            if(!token)res.send("access denied, token't") 
    
            //await sendMail(response.email)

            res.cookie('token', token)
            res.render('../views/pages/login.ejs')
        }else{
            return error
        }
    } catch (error) {
        console.log('error en viewsController, register',error)
        winston.errorLogger.error(error)
    }
}

let getLogout=async(req,res)=>{
    try {
        if(req.cookies.token){
            res.clearCookie('token')
            res.clearCookie('user')
        }
        res.redirect('/') 
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
let deleteProd=async(req,res) => {
    try {    
    let title=req.params.title
    console.log("🚀 ~ file: viewsController.js ~ line 102 ~ deleteProd ~ title", title)
    let deleted=await productController.deleteProduct(title)
    console.log("🚀 ~ file: viewsController.js ~ line 108 ~ deleteProd ~ deleted", deleted)
    if(deleted) res.redirect('/product')
     
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 106 ~ deleteProd ~ error", error)
        winston.errorLogger.error(error)
    }
}
let getProds=async(req,res)=>{
    try {
        //luego enviar prods para mostrarlos
        
        let product=await productController.getAllProducts()
        
        let date= Date.now()
        res.render('../views/pages/product.ejs', {
            title: "Login", //page title
            action: "/login",
            product,
            date, //post action for the form
            fields: [
            {name:'email',type:'text',property:'required'},   //first field for the form
            {name:'password',type:'password',property:'required'}  //another field for the form
            ]
        });
        
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 130 ~ getProds ~ error", error)
        winston.errorLogger.error(error)
    }
}
let addProds=async(req,res)=>{
    try {
        
            let product=req.body
            let added=await productController.addProduct(product)
            if(added) res.redirect('/product')
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 149 ~ addProds ~ error", error)
        winston.errorLogger.error(error)
    }
}
let removeProductsOnCart=async(req,res)=>{
    try {
        //restar quantity y total, luego agregar si total=0 y quantity==0 entonces no mostrar cart
        let cart =await cartController.removeProductsOnCart(req,res)
        console.log('cart es ',cart)
        let quantity=0
        let total=0
        console.log('log cart!',cart)
        res.redirect('/cart')
    } catch (error) {
        console.log('error en views ',error)
        winston.errorLogger.error(error)
    }
}
let deleteCart=async (req,res)=>{
    try {
        let cart =await cartController.deleteCart(req,res)
        if(!cart) return error
        res.redirect('/cart')
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 150 ~ deleteCart ~ error", error)
        
        winston.errorLogger.error(error)
    }
    
}
let getCart=async(req,res)=>{
    try {
        let cartF=await cartController.getCart(req,res)
        //console.log("🚀 ~ file: viewsController.js ~ line 178 ~ getCart ~ cartF", cartF)
        let quantity=cartF.quantity
        let cart=cartF.items
        //console.log("🚀 ~ file: viewsController.js ~ line 180 ~ getCart ~ cart", cart)
        let total=cartF.total
        res.render('../views/pages/carro.ejs',{cart,quantity,total})
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 184 ~ getCart ~ error", error)
        
        winston.errorLogger.error(error)
    }
}
let addProductToCart=async(req,res)=>{
    try {
        let response=await cartController.addProductsToCart(req,res)
        if (response) res.redirect('/cart')
    } catch (error) {
        console.log("🚀 ~ file: viewsController.js ~ line 198 ~ addProductToCart ~ error", error)
        winston.errorLogger.error(error)
    }
}

module.exports={getLogin,getRegister,login,register,getLogout,failRoute,getCart,addProductToCart,getProds,addProds,deleteProd,deleteCart,removeProductsOnCart,home}