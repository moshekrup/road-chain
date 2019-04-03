const getAccidentEvent = (pointCoordinate) => {
    return {
        type :'accident',
        datetime: new Date().toString(),
        geoJson: {
            type: 'Point', 
            coordinates: pointCoordinate,
        }
    }
}

module.exports = {
    getAccidentEvent
};