const express = require('express')
const app = express()

require('dotenv').config()

const WEATHER_API_KEY=process.env.WEATHER_API_KEY
const PORT=process.env.PORT||1314;

const weather=require('./data/weather.json')


const cors = require('cors')
app.use(cors());

const superagent = require('superagent');

    
  app.get('/weather', (req, res) => {

    try {
        console.log(req.query);
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
        console.log(weatherBitUrl);
        superagent.get(weatherBitUrl).then(weatherBitData => {
            const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
            res.send(arrOfData);

        });
    } catch (error) {
        const arrOfData = weather.data.map(data => new Weather(data));
        res.send(arrOfData);
    }
   
  
  // console.log(req.query)
  // const weatherAraay=weather.data.map(value=> new Forcast(value) )

})

app.get('/', function (req, res) {
  res.send('welcome to backend')
})

class Weather{
  constructor(weth){
    this.description=weth.weather.description,
    this.date=weth.valid_date
    
  }
}

 
app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`);
})
