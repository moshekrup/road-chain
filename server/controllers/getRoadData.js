const {getInstance} = require('../db/mongodb');
const mongoCreds = require('../db/config')().getMongoCredntails()
const tableName = mongoCreds.table
const databaseName = mongoCreds.database

const getRoadDataController = async(req, res, next) => {
    try {
        const mongo = await getInstance();
        const getLocation = req.body.location;
        const distance = req.body.radius;
        console.log("get data for location %j with distance %s", getLocation, distance);
        const database = await mongo.db(databaseName);
        const collection = await database.collection(tableName)
        let query = queryByDistance(getLocation, distance);
        console.log("querying the assets on geoJson %s", query)
        const docs = await collection.find(query).toArray();
        let filteredDocs = docs.map(x => x.data.event || null).filter(x => x !== null);
        res.status(200).send(filteredDocs);
        next();
    } catch (err) {
        next(err);
    }

};

function queryByDistance(location, maxDistance) {
    return {
        'data.event.geoJson': {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: location
                },
                $maxDistance: maxDistance
            }
        }
    }
}

module.exports = getRoadDataController;
