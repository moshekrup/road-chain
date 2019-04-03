const config  = {
    port: 9000,
    wsPort: 9001,
    isDevelopment: true,
    dbchainhost: 'http://localhost:9984/api/v1/',
    bigchainWS: 'ws://localhost:9985/api/v1/streams/valid_transactions',
};

module.exports = config;