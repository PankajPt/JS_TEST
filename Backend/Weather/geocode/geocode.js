require('dotenv').config()
const fs = require('node:fs')
const https = require('node:https');
const fetchCoordinates = function (addr, callback){
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
                    const total_results = jsonData.total_results;
                    if (total_results){
                        const response = {
                            Address: jsonData.results[0].formatted,
                            Latitude: jsonData.results[0].geometry.lat,
                            Longitude: jsonData.results[0].geometry.lng,
                            code: jsonData.status.code,
                            message: jsonData.status.message,
                            total_results
                        }
                        callback(undefined, response)//1st argument left undefined
                    } else if ( jsonData.status.message === 'invalid API key'){
                        callback('invalid API key')//2nd argument left undefined
                    } else {
                        const err = {
                            code: jsonData.status.code,
                            message: jsonData.status.message,
                            total_results
                        }
                        callback(undefined, err)//1st argument left undefined
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