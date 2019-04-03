const BigchainDB = require('bigchaindb-driver');
const getInstance = require('../db/bigchaindb');
const cryptoUtils = require('../utils/crypto');

// const keyPair = new BigchainDB.Ed25519Keypair(cryptoUtils.getWallet())

const getRoadDataController = async(req, res, next) => {
    const dbchain = getInstance();
}

module.exports = getRoadDataController;