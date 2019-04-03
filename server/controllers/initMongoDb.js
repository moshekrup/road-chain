const {ensureIndex} = require('../db/mongodb');

const initMongoDbController = async(req, res, next) => {
    try {
        await ensureIndex('coordinates');
        res.sendStatus(200);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    initMongoDbController,
}