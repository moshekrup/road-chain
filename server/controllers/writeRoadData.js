const {getInstance, createTransaction, getKeyPair, signedTransaction} = require('../db/bigchaindb');
const {getAccidentEvent} = require('../model/data');

const keyPair = getKeyPair();

const writeRoadDataController = async(message) => {
    try {
        const dbchain = getInstance();
        const data = getAccidentEvent(message);
        const transaction = createTransaction({data, issuer: keyPair.publicKey, outputOwner: keyPair.publicKey});
        const txSigned = signedTransaction(transaction, keyPair.privateKey);
        return await dbchain.postTransactionCommit(txSigned);
        // res.json({data: transactionId});
        // next();
    } catch(err) {
        // next(err);
    }
}

module.exports = writeRoadDataController;