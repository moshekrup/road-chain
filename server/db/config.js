module.exports = () => {
    let getMongoCredntails = () => {
        return {
            table: 'assets',
            port: 27017,
            domain: 'mongodb://',
            hostname: "localhost",
            database: 'bigchain'
        }
    }

    return {
        getMongoCredntails
    }
}