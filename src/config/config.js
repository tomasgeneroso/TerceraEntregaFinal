require('dotenv').config()

let config={
    PORT:process.env.PORT,
    CLUSTER:process.env.CLUSTER,
    DB:process.env.DB,
    SECRET:process.env.SECRET,
    PRIVATE_KEY:process.env.PRIVATE_KEY,
    MEMORY:process.env.MEMORY,
    EXPIRE_TIME:process.env.EXPIRE_TIME
}

module.exports=config