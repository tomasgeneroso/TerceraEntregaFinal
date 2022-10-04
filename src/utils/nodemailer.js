const {createTransport}=require('nodemailer')
let {PASS_MAILER,USER_MAILER}=require('../config/config.js')
let winston = require('../utils/winston.js');

let transport = createTransport({
    service:'gmail',
    port:2525,
    secure: false,
    auth:{
         user:USER_MAILER,
         pass:PASS_MAILER
    }
})

//cofirm orden

let confirmOrder=async (order)=>{
    try {
        let response=await transport.sendMail({
            from: USER_MAILER,
            to: email, 
            subject: 'New order registered',
            html:order
        });
        return response
    } catch (error) {
        console.log("🚀 ~ file: nodemailer.js ~ line 23 ~ info ~ error", error)
        winston.errorLogger.error(error)
    }
}


//confirm register
let sendMail=async (email) => {
    try{
        let response=await transport.sendMail({
            from: USER_MAILER,
            to: email, 
            subject: 'User registered',
            html:'<h1>USER REGISTERED</h1>'
        });
        return response
    }catch(error){
        console.log("🚀 ~ file: nodemailer.js ~ line 23 ~ info ~ error", error)
        winston.errorLogger.error(error)
    }
}

module.exports={sendMail,confirmOrder}