//PASSPORT
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
let user=require('../DAOS/barrel.js').user
passport.use('login',new LocalStrategy(async (username,password,done)=>{
    try {
        let userF=await user.validateLogin(username,password)
        if(!userF)return done(null,false,{message:'user dont found'})
        return done(null,userF,{message:'login successfull'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}))
passport.use('register',new LocalStrategy({passReqToCallback:true},async(req,username,password,done)=>{
    try {
        let data = req.body;
        let userF=await user.getUser(data.username)
        if(userF)return done(null,false,{message:'already exists'})
        await user.addUser(data)
        return done(null,userF) 
    } catch (error) {
        winston.errorLogger.error(error)
        done(error)
    }
}))
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((username, done) => {
    done(null, username);
});