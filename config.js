import path from "path"
const env = process.env.NODE_ENV || "development";
const configjson = require(path.join(__dirname, '/', 'config', 'db.json'))[env];

const localConfig = {
    user: configjson.local.user,
    password: configjson.local.password,
    server: configjson.local.server,
    connectionTimeout: 30000,
    database: configjson.local.database,
    port: configjson.local.port,
    options: {
        encrypt: false
    }
}

export {
    localConfig
}