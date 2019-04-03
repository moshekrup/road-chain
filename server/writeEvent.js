const {
    getInstance, 
    createTransaction, 
    getKeyPair, 
    signedTransaction
} = require('./db/bigchaindb');

const keyPair = getKeyPair();

const writeEvent = async(data) => {
    try {
        const enrichData = {...data, datetime: new Date().toString()};
        const dbchain = getInstance();
        const transaction = createTransaction({
            data: enrichData, 
            issuer: keyPair.publicKey, 
            outputOwner: keyPair.publicKey
        });
        const txSigned = signedTransaction(transaction, keyPair.privateKey);
        return await dbchain.postTransactionCommit(txSigned);
    } catch(err) {
        // next(err);
    }
}

module.exports = writeEvent;