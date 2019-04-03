const {getInstance, createTransaction, getKeyPair, signedTransaction} = require('../db/bigchaindb');

const keyPair = getKeyPair();

const writeRoadDataController = async(req, res, next) => {
    try {
        const data = {...req.body, datetime: new Date().toString()};
        const dbchain = getInstance();
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