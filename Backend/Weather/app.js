console.log(`Initializing weather application...\n`)
const geocode = require('./geocode/geocode.js');
const weather = require('./wea-data/weather.js');
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
geocode.fetchCoordinates(encodedAddr, (error, response)=>{
    if (error){
        console.log(`Error: ${error}`)
    } else {
        if (response.total_results){
            console.log(`Coordinates located.\nFetching current weather information...\n`)
            console.log(`Address: ${response.Address}`)
            const lat = response.Latitude
            const lng = response.Longitude
            weather.fetchWeatherData(lat, lng, (err, res)=>{
                if (err){
                    console.log(err)
                } else {
                    console.log(JSON.stringify(res, undefined, 2))
                }
            })
        } else {
            console.log(`Total Results: ${response.total_results}`)   
        }
    }
});