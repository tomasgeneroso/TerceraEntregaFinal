let winston = require('../../../utils/winston.js')
let User=require('../sChema/modelUsers.js')
let user=new User()
//PASSPORT
const passport = require('passport')
const { Strategy } = require('passport-local')
const LocalStrategy = require('passport-local').Strategy

passport.use('login',new LocalStrategy((username,password,done)=>{
    try {
        let userF= user.validateLogin(username,password)
        if(!userF)return done(null,false)
        return done(null,userF)
    } catch (error) {
        winston.errorLogger.error(error)
    }
}))

passport.use('register',new LocalStrategy({passReqToCallback:true},(req,username,password,done)=>{
    try {
        let data = req.body;
        let userF= user.getUser(data.username)
        if(userF)return done(null,false,{message:'already exists'})
        user.addUser(data)
        return done(null,userF)
    } catch (error) {
        winston.errorLogger.error(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((username, done) => {
    let usuario=user.getUser(username)
    done(null, usuario);
});

const getUser=async (req,res)=>{
    try {
        let data = await user.validateLogin(req.body.email,req.body.password)
        return data
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const addUser=async (req,res)=>{
    try {
        let data=req.body
        if (!data.email || !data.password || !data.name || !data.surname) {
            res.status(400).send({
                message: 'Faltan datos, vuelve atras'
            });
        } else {
            let response = await user.addUser(data)
            return response
        }
    } catch (error) {
        
        winston.errorLogger.error(error)
    }
}
let logOutUser = async (req, res, next) => {
    try {
        req.session.destroy();
        next()
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
let isLogin = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/register");
        }
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
let isNotLogin = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/");
        }
    } catch (error) {
        winston.errorLogger.error(error)
    }
}
module.exports={getUser,addUser,logOutUser,isLogin,isNotLogin}