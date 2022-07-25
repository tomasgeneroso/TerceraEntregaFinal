const productController=require('../components/products/controllers/controllerProducts.js')
const userController=require('../components/users/controllers/controllerUsers.js')
let prodModel = require('../components/products/sChema/schemaProducts.js')
const config=require('../config/config.js')
let winston = require('../utils/winston.js');

const getLogin=async (req, res) => { 
    try {
       res.render('../views/pages/login.ejs')     
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const login=async (req, res) => { 
    try {

        let user=await userController.getUser(req,res)
        
        if(user){
            res.render('../views/home.ejs',{user})     
        }else{
            res.render('../views/pages/register.ejs')
        }
    } catch (error) {
        console.log('error viewscontroller')
        winston.errorLogger.error(error)
    }
}

const getRegister=async (req, res) => { 
    try {
        res.render('../views/pages/register.ejs')     
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

const register=async(req,res)=>{
    try {
       
        let response=await userController.addUser(req,res)
        if(response){
            
            res.render('../views/pages/login.ejs')
        }else{
            
            res.render('../views/pages/register.ejs')
        }
    } catch (error) {
        
        winston.errorLogger.error(error)
    }
}
const getLogout=async(req,res)=>{
    try {
        await userController.logOutUser()
        res.render('../views/pages/login.ejs')
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const failRoute=async(req,res)=>{
    try {
        res.send({message:'fail route!'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

const deleteCart= ()=>{
    req.session.destroy(err=>{
        if(err) console.log('Error trying delete the cart '+err)
    })
}

const getAllProducts=async(req,res)=>{
    try {
        /*if(req.session.cart){
           let cart= req.session.cart
           res.render('../views/pages/carro.ejs',{cart,deleteCart})
        }else{
            req.session.cart=[]
            let cart =req.session.cart
            res.render('../views/pages/carro.ejs',{cart,deleteCart})
        }*/
        let cart = req.session.cart,
            displayCart = {items: [], total: 0},
            total = 0;
        
        

        //Ready the products for display
        for (let item in cart) {
            displayCart.items.push(cart[item]);
            total += (cart[item].qty * cart[item].price);
        }
        req.session.total = displayCart.total = total.toFixed(2);

        let model ={
            cart: displayCart
        };
        if (!cart) {
            res.render('../views/pages/carro.ejs',{model,deleteCart})
            return;
        }
        res.render('../views/pages/carro.ejs',{model,deleteCart})
    } catch (error) {
        console.log('error en getallpr',error)
        winston.errorLogger.error(error)
    }
}
const addProduct=async(req,res)=>{
    try {
       /* let prod=req.body.title
        let prodF=prodModel.findOne({title:prod})
        console.log(req.session.cart)
        let cart
        if(prodF){
            
            cart=req.session.cart
            cart.push(prodF)
            req.session.cart=cart
        }
        */
        //Load (or initialize) the cart
        req.session.cart = req.session.cart || {};
        let cart = req.session.cart;

        //Read the incoming product data
        let id = req.param('item_id');

        //Locate the product t o be added
        prodModel.findOne({title:prod},function (err, prod){
            if (err) {
                console.log('Error adding product to cart: ', err);
                res.render('../views/pages/carro.ejs',{model,deleteCart})
                return;
            }

            //Add or increase the product quantity in the shopping cart.
            if (cart[id]) {
                cart[id].qty++;
            }
            else {
                cart[id] = {
                    name: prod.name,
                    price: prod.price,
                    prettyPrice: prod.prettyPrice(),
                    qty: 1
                };
            }

            //Display the cart for the user
            res.render('../views/pages/carro.ejs',{model,deleteCart})})
       
        res.render('../views/pages/carro.ejs',{cart,deleteCart})
    } catch (error) {
        console.log('error en addprod',error)
        winston.errorLogger.error(error)
    }
}

const getProds=async(req,res)=>{
    try {
        let confirmation=false
        res.render('../views/pages/products.ejs',{confirmation})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const addProds=async(req,res)=>{
    try {
        let product=await productController.addProduct(req,res)
        let confirmation
        if(product){ confirmation=true}else{ confirmation=false}
        res.render('../views/pages/products.ejs',{confirmation})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

module.exports={getLogin,getRegister,login,register,getLogout,failRoute,getAllProducts,addProduct,getProds,addProds}