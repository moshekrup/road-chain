const {getInstance} = require('../db/mongodb');

const getRoadDataController = async(req, res, next) => {
    const mongo = await getInstance();
}

module.exports = getRoadDataController;
