const MongoClient = require('mongodb').MongoClient;
const {mongoUrl} = require('../config');

const getInstance = async() => {
    const db = await MongoClient.connect(mongoUrl);
    return db;
}

const ensureIndex = async(field) => {
    const dbInstance = await getInstance();
    dbInstance.ensureIndex({[field]: '2d'});
}

module.exports = {
    getInstance,
    ensureIndex,
};