const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    development: {
        username: process.env.MYSQL_ID,
        password: process.env.MYSQL_PASSWORD,
        database: "TWD",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    test: {
        username: process.env.MYSQL_ID,
        password: process.env.MYSQL_PASSWORD,
        database: "TWD",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: process.env.MYSQL_ID,
        password: process.env.MYSQL_PASSWORD,
        database: "TWD",
        host: "127.0.0.1",
        dialect: "mysql",
    },
}
