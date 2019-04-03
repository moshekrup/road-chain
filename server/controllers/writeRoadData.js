const {getInstance, createTransaction, getKeyPair, signedTransaction} = require('../db/bigchaindb');
const {getAccidentEvent} = require('../model/data');

const keyPair = getKeyPair();

const writeRoadDataController = async(req, res, next) => {
    try {
        const dbchain = getInstance();
        const data = getAccidentEvent();
        const transaction = createTransaction({data, issuer: keyPair.publicKey, outputOwner: keyPair.publicKey});
        const txSigned = signedTransaction(transaction, keyPair.privateKey);
        const transactionId = await dbchain.postTransactionCommit(txSigned);
        res.json({data: transactionId});
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = writeRoadDataController;