console.log(`Initializing weather application...\n`)
const geocode = require('./geocode/geocode_promise.js');
const weather = require('./wea-data/weather_promise.js');
const yargs = require('yargs');
const argv = yargs
    .option('address',
        {
            alias: 'addr',
            demandOption: true,
            type: 'string',
            describe: 'Provide an address to see the weather information.'
        })
    .help()
    .argv;
let encodedAddr = encodeURIComponent(argv.addr)

console.log(`Fetching latitude and longitude for the specified address...`)

geocode.fetchCoordinates(encodedAddr)
        .then((response)=>{
            console.log(`Coordinates located.\nFetching current weather information...\n`)
            console.log(`Address: ${response.Address}`)
            const lat = response.Latitude
            const lng = response.Longitude
            return weather.fetchWeatherData(lat, lng)
        })
        .then ((result)=>{
            console.log(JSON.stringify(result, undefined, 2))
        })
        .catch((error)=>{
            console.log(`Error: ${error}`)  
        })