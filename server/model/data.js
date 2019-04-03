const getAccidentEvent = (pointCoordinate = [15, 20]) => {
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