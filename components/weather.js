const weather=require('../data/weather.json')
require('dotenv').config()
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const superagent = require('superagent');

const inMemory={};
const handleWeather=(req,res)=>{
    const lon=req.query.lon;
    const lat=req.query.lat;
    const querParms={
        key:WEATHER_API_KEY,
        lat:lat,
        lon:lon
    }
    try {
        
        
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
    console.log(weatherBitUrl);
    superagent.get(weatherBitUrl).query(querParms).then(weatherBitData => {
        if (inMemory[lat,lon]!==undefined) {
          console.log('cache hit weather')
          res.send(inMemory[lat,lon])  
        } else {
            const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
            inMemory[lat,lon]=arrOfData;
            console.log('cache miss weather')
            res.send(arrOfData);

            
        }

    });
} catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);
}

}
class Weather{
    constructor(weth){
      this.description=weth.weather.description,
      this.date=weth.valid_date
      
    }
  }
  module.exports=handleWeather
