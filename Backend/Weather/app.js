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

geocode.fetchCoordinates(encodedAddr);
// const data = JSON.parse(fs.readFileSync('sample.json', 'utf-8'));
