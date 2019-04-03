const getInstance = require('../db/mongodb');

const writeRoadDataController = async(req, res, next) => {
    const mongo = await getInstance();
}

module.exports = writeRoadDataController;
