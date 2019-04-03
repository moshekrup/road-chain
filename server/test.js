const BigchainDB = require('bigchaindb-driver')
const bip39 = require('bip39')

const API_PATH = 'http://localhost:9984/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const seed = bip39.mnemonicToSeedSync('seedPhrase').slice(0,32)
const keyPair = new BigchainDB.Ed25519Keypair(seed)

// const painting = {
//     name: 'Meninas',
//     author: 'Diego Rodríguez de Silva y Velázquez',
//     place: 'Madrid',
//     year: '1656'
// }

const event = {
    type :'accident',
    datetime: new Date().toString(),
    geoJson: {
        type: 'Point', 
        coordinates: [10, 14],
    }
}

function createPaint() {
    // Construct a transaction payload
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        {
            event,
        },
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        {
            datetime: new Date().toString(),
            location: 'Madrid',
            value: {
                value_eur: '25000000€',
                value_btc: '2200',
            }
        },
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(keyPair.publicKey))],
        // Issuers
        keyPair.publicKey
    )
    // The owner of the painting signs the transaction
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        keyPair.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransactionCommit(txSigned)
        .then(res => {
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
            // txSigned.id corresponds to the asset id of the painting
        })
}

module.exports = createPaint;