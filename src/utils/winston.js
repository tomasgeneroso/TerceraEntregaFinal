const winston = require('winston')
let consoleLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "verbose" })
    ]
})

let warningLogger = winston.createLogger({
    level: "warn",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "warn" }),
        new winston.transports.File({ filename: "warning.log", level: "warn" })
    ]
})


let errorLogger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "error" }),
        new winston.transports.File({ filename: "error.log", level: "error" })
    ]
})

module.exports = {
    consoleLogger,
    warningLogger,
    errorLogger
}