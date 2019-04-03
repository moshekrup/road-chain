const BigchainDB = require('bigchaindb-driver');
const { dbchainhost }  = require('../config');
const cryptoUtils = require('../utils/crypto');
// const API_PATH = 'https://localhost:9984/api/v1/';
// const conn = new BigchainDB.Connection(API_PATH);
// return conn;

let connection;
const getInstance = () => {
    if (!connection)
        connection = new BigchainDB.Connection(dbchainhost);
    return connection; 
}

const createTransaction = ({data, metadata, issuer, outputOwner}) => {
    return BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        {
            event: data,
        },
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        null,
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(outputOwner))],
        // Issuers
        issuer
    );  
}

const signedTransaction = (tx, key) => {
    return BigchainDB.Transaction.signTransaction(tx, key);
}

const getKeyPair = () => {
    // return new BigchainDB.Ed25519Keypair()

    return new BigchainDB.Ed25519Keypair(cryptoUtils.getWallet());
}

module.exports = {
    getInstance,
    createTransaction,
    getKeyPair,
    signedTransaction,
};