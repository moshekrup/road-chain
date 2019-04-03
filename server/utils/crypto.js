const bip39 = require('bip39')

const getWallet = () => {
    const seed = bip39.mnemonicToSeedSync('seedPhrase');
    return seed.slice(0, 32);
}

module.exports = { getWallet };

