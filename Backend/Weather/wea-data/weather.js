const https = require('node:https')
const fs = require('fs')
require('dotenv').config()

const fetchWeatherData = (lat, lng, callback) => {
    https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OW_API_KEY}&units=metric&lang=en`,
        (res) => {
            let data = ''
            res.on('data', (chunk)=>{
                data += chunk;
            })
            res.on('end', ()=>{
                try {
                    const parsedData = JSON.parse(data);
                    fs.appendFileSync('./wea-data/weather.json', JSON.stringify(parsedData, undefined, 2))
                    if (parsedData.cod === 200){
                        const weaData = {
                            description: parsedData.weather[0].description,
                            temperature: parsedData.main.temp,
                            feels_like: parsedData.main.feels_like,
                            humidity: parsedData.main.humidity,
                            wind_speed: parsedData.wind.speed                        
                        }
                        callback(undefined, weaData)
                    } else {
                        callback(`Error Code: ${parsedData.cod}\nMessage: ${parsedData.message}`)
                    }
                } catch (error) {
                    callback(`Error: ${error.message}`)
                }
            })
        }
    ).on('error', (err)=>{
        callback(`Error: ${err.message}`)
    })
}

module.exports.fetchWeatherData = fetchWeatherData;