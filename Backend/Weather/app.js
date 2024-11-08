const geocode = require('./geocode/geocode.js');
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

geocode.fetchCoordinates(encodedAddr, (error, response)=>{
    if (error){
        console.log(`Error: ${error}`)
    } else {
        console.log(JSON.stringify(response, undefined, 2))
    }
});


// https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid={API_KEY}
// https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=your_api_key&units=metric&lang=en
