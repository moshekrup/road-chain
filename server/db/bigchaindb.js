const BigchainDB = require('bigchaindb-driver');
const { dbchainhost }  = require('../config');
// const API_PATH = 'https://localhost:9984/api/v1/';
// const conn = new BigchainDB.Connection(API_PATH);
// return conn;

let connection;
const getInstance = () => {
    if (!connection)
        connection = new BigchainDB.Connection(dbchainhost);
    return connection; 
}


module.exports = getInstance;