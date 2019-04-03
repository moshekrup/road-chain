const WebSocket = require('ws');
const {bigchainWS, wsPort} = require('./config');
const write = require('./writeEvent')

const createWebSocketServer = () => {
    const wsServer = new WebSocket.Server({ port: wsPort });
    const wsbigchain = new WebSocket(bigchainWS);
    
    wsServer.on('connection', ws => {
        ws.on('message', async(message) => {
            const json = JSON.parse(message);
            console.log('received: %s', json);
            const data = await write(json);
            ws.send(JSON.stringify(data));
        });
      
        wsbigchain.on('open', () => {
            console.log("CONNECTED")
        });
        
        wsbigchain.on('message', data => {
            ws.send(JSON.stringify(data));
        });
    });
    
    console.log('Web socket server is listening on port %d', wsPort)
}

module.exports = {createWebSocketServer};
