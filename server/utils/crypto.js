const bip39 = require('bip39')

const getWallet = () => {
    return bip39.mnemonicToSeed('seedPhrase').slice(0,32);
}

module.exports = getWallet;

