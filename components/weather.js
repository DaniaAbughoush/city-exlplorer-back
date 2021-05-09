const weather=require('../data/weather.json')
require('dotenv').config()
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const superagent = require('superagent');

const handleWeather=(req,res)=>{
try {
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    console.log(weatherBitUrl);
    superagent.get(weatherBitUrl).then(weatherBitData => {
        const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
        res.send(arrOfData);

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
