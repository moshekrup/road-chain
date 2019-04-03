const MongoClient = require('mongodb').MongoClient;
const {mongoUrl} = require('../config');

const getInstance = async() => {
    const db = await MongoClient.connect(mongoUrl);
    return db;
}

module.exports = getInstance;