const WebSocket = require('ws');
const {bigchainWS, wsPort} = require('./config');
const write = require('./writeEvent')

const createWebSocketServer = () => {
    const wsServer = new WebSocket.Server({ port: wsPort });
    const wsbigchain = new WebSocket(bigchainWS);
    
    wsServer.on('connection', ws => {
        ws.on('message', async(message) => {
            try {
                const json = JSON.parse(message);
                console.log('received');
                console.log(json);
                await write(json);
                console.log('finish write event to blockchain')
            }
            catch (err) {
                console.error(err);
            }
        });

        ws.on('error', (err) => {
            console.error('error in client websocket');
            console.error(err);
        });

        ws.on('close', () => {
            console.log('closing client websocket');
        });
      
        wsbigchain.on('open', () => {
            console.log("bigchain CONNECTED")
        });
        
        wsbigchain.on('message', data => {
            console.log('bigchain message');
            try {
                ws.send(JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        });

        wsbigchain.on('error', (err) => {
            console.error('error in bigchain websocket');
            console.error(err);
        });

        wsbigchain.on('close', () => {
            console.log('closing bigchain websocket');
        });
    });
    
    console.log('Web socket server is listening on port %d', wsPort)
}

module.exports = {createWebSocketServer};
