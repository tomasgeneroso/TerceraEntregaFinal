const mongoose=require('mongoose')

const config=require('../config/config.js')
const connect =mongoose.connect(config.DB,{useNewUrlParser:true}).then(db=>console.log('Connected to MongoAtlas')).catch(err=>console.log('error database mongoose',err))
module.exports=connect