const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {isDevelopment, port} = require('./config');

const app = express();
app.use(bodyParser.json({limit: '10mb'}));
if (isDevelopment) {
    const corsOptions = {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE',
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
    };
    app.use(cors(corsOptions));
}

app.use('/getRoadData', require('./controllers/getRoadData'));
app.use('/writeRoadData', require('./controllers/writeRoadData'));

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(port, () => {
    console.log('Server is listening on port %d', port)
});