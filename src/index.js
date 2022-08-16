const express=require('express')
const app=express()
const config=require('./config/config.js')
const PORT=config.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CLUSTER
const cluster=require('cluster')
const numCPUs=require('os').cpus().length
//EJS
const ejs=require('ejs')
app.use(express.static(__dirname+'/views'))
app.set("view engine", "ejs");
app.set("views", __dirname+ "/views");
//DATABASE
const connect=require('./utils/database.js')
//LOGGER
let winston = require('./utils/winston.js')
//ROUTER
const viewsRouter=require('./routes/viewsRouter.js')

//SESSION 
const session=require('express-session')
const cookieParser=require('cookie-parser')
const MongoStore = require('connect-mongo')
app.use(cookieParser())
//Configuracion carrito
app.use(session({
    secret:config.SECRET,
    resave:true,
    rolling: true, 
    saveUninitialized:false,   //crea recien cuando algo es guardado
}))
//PASSPORT 
const passport = require('passport')

app.use(passport.initialize());
app.use(passport.session())

if(config.CLUSTER){
    if (cluster.isMaster) {
        for (let index = 0; index < numCPUs; index++) {
            cluster.fork()
        }
    } else {
        //hacer cosas
        app.use('/',viewsRouter)
        app.listen(PORT,()=>{winston.consoleLogger.info(`Listening port ${PORT} on CLUSTER MODE`) })
    }
}else{
    //hacer cosas
    app.listen(PORT,()=>{winston.consoleLogger.info(`Listening port ${PORT}`) })
}

//si se apaga
const gracefulShutdown= ()=>{mongoose.connection.close()
    .then(()=>{console.log('Mongoose disconnected')})
    .catch(error=>`Error al desconectarse de la bbdd ${error}`)

}