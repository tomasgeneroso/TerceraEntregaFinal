let config=require('../config/config.js')
let connect
let UserDaos;
let cart 
let prod

(async function(){
    switch(config.MEMORY){
    case "mongo":
        // const mongoose=require('mongoose')
        // await mongoose.connect(process.env.DB).then(()=>{console.log(`Connected to MONGODB ATLAS`)}).catch(e=>console.log(`error: ${e}`))
        connect=require('../utils/database.js')
        let {prodDaos}=require('../components/products/sChema/modelProducts.js')//importar instancia de prod como con userdaos
        prod=prodDaos
        
        let {cartDaos}=require('../components/cart/schema/modelCart.js')
        cart=cartDaos
        
        //console.log('Using MONGODB')
    break;
    case "file":
        prodDaos=require('../components/products/sChema/modelProducts.js')//importar instancia de prod como con userdaos
        prod=new prodDaos()
        cartDaos=require('../components/cart/schema/modelCart.js')
        cart=new cartDaos()
        UserDaos=require('../components/users/sChema/modelUsers.js')
        user=new UserDaos()
        console.log('Using FILES')
    break;
    case "memory":
        prodDaos=require('../components/products/sChema/modelProducts.js')//importar instancia de prod como con userdaos
        prod=new prodDaos()
        cartDaos=require('../components/cart/schema/modelCart.js')
        cart=new cartDaos()
        UserDaos=require('../components/users/sChema/modelUsers.js')
        user=new UserDaos()
        
        console.log('Using MEMORY')
    break;
    }
})()

//exporta instancias
module.exports={cart,prod,UserDaos}