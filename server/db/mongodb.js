const MongoClient = require('mongodb').MongoClient;
const databaseConfig = require('./config')
const mongoConfig = databaseConfig().getMongoCredntails()
const mongoUrl = mongoConfig.domain + mongoConfig.hostname + ":" + mongoConfig.port + "/" + mongoConfig.table  //"mongodb://localhost:27017/assets"
console.log(mongoUrl)
const getInstance = async() => {
    const db = await MongoClient.connect(mongoUrl,{useNewUrlParser: true});
    let answer = null
    if (!db.isConnected())
        answer = new Error("can't connect to MongoDB")
    else
        answer =  db;
    return answer
}

const ensureIndex = async(field) => {
    const dbInstance = await getInstance();
    dbInstance.db(mongoConfig.database).collection(mongoConfig.table).createIndex({[field]: '2dsphere'});
}

module.exports = {
    getInstance,
    ensureIndex,
};