require('dotenv').config()
const fs = require('node:fs')
const https = require('node:https');
const fetchCoordinates = function (addr){
    https.get(`https://api.opencagedata.com/geocode/v1/json?q=${addr}&key=${process.env.API_KEY}`, 
        (res) => {
            let data = '';
            res.on('data', (chunk)=>{
                data += chunk;
            });
            res.on('end', ()=>{
                try {
                    const jsonData = JSON.parse(data);
                    fs.writeFileSync('./geocode/geocode.json', JSON.stringify(jsonData, undefined, 2))

                    if (jsonData.total_results){
                        console.log(`Coordinates for ${jsonData.results[0].formatted}: \nLatitude: ${jsonData.results[0].geometry.lat}\nLangitude: ${jsonData.results[0].geometry.lng}`)
                    } else if ( jsonData.status.message === 'invalid API key'){
                        console.log('invalid API key')
                    } else {
                        console.log(`Coordinates not found for given address.`)
                    }
                } catch (error) {
                    console.log(`Error: ${error.message}`)
                }
            })
        }
    ).on('error', (err) => {
        console.log(`Error: ${err.message}`)
    });
}

module.exports.fetchCoordinates = fetchCoordinates;