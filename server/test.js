const WebSocket = require('ws');

const testWS = new WebSocket('ws://localhost:9001');

testWS.on('message', message => {
    console.log(message);
})

testWS.on('open', function open() {
    testWS.send(JSON.stringify({
        "type" :"accident",
        "geoJson": {
            "type": "Point", 
            "coordinates":[32.0804808, 34.7805274]
        }
    }));
});
