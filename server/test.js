const WebSocket = require('ws');

const testWS = new WebSocket('ws://localhost:9000');

testWS.on('message', message => {
    console.log(message);
})

testWS.on('open', function open() {
    testWS.send(JSON.stringify({
        "type" :"traffic",
        "geoJson": {
            "type": "Point", 
            "coordinates": [32,5345,646]
        }
    }));
});
