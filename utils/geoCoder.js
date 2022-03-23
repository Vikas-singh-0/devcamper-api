const nodeGeocoder = require('node-geocoder')

const options = {
    provider:process.env.GEOCODER_PROVIDER||"mapquest",
    apiKey:process.env.GEOCODER_API_KEY||"GV66YtRuRxPOqx8e6M8QhEzEjmHYyGCo",
    formatter:null
}

const geocoder = nodeGeocoder(options)

module.exports = geocoder;