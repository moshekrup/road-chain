const WebSocket = require('ws');
const {bigchainWS, port} = require('./config');
const write = require('./controllers/writeRoadData')

const wsServer = new WebSocket.Server({ port });
const wsbigchain = new WebSocket(bigchainWS);

wsServer.on('connection', (ws) => {
    ws.on('message', message => {
        const json = JSON.parse(message);
        console.log('received: %s', json);
        const transactionId = write(json);
        ws.send({data: transactionId});
    });
  
    wsbigchain.on('open', () => {
        console.log("CONNECTED")
    });
    
    wsbigchain.on('message', (data) => {
        const json = JSON.parse(data);
        console.log("\nTransactionId: ", json.transaction_id);
        console.log("AssetId: ", json.asset_id);
        console.log("BlockId: ", json.block_id);
        ws.send(json);
    });
});