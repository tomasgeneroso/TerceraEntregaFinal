require('dotenv').config()

let config={
    PORT:process.env.PORT,
    CLUSTER:process.env.CLUSTER,
    DB:process.env.DB,
    SECRET:process.env.SECRET,
    PRIVATE_KEY:process.env.PRIVATE_KEY,
    MEMORY:process.env.MEMORY,
    EXPIRE_TIME:process.env.EXPIRE_TIME,
    EXPIRE_TIME2:process.env.EXPIRE_TIME2,
    USER_MAILER:process.env.USER_MAILER,
    PASS_MAILER:process.env.PASS_MAILER
}

module.exports=config