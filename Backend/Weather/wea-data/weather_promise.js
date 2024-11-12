const https = require('node:https')
const fs = require('fs')
require('dotenv').config()

const fetchWeatherData = (lat, lng) => {
    return new Promise ( (resolve, reject)=>{
        https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OW_API_KEY}&units=metric&lang=en`,
            (res)=> {
                let data = ''
                res.on('data', (chunk)=>{
                    data += chunk
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
                            resolve(weaData);
                        } else {
                            reject(`Error Code: ${parsedData.cod}\nMessage: ${parsedData.message}`)
                        }
                    } catch (error) {
                        reject(`Error: ${error.message}`)
                    }
                })
            }
        ).on('error', (err)=>{
            reject(`Error: ${err}`)
        })
    })
}
module.exports.fetchWeatherData = fetchWeatherData;