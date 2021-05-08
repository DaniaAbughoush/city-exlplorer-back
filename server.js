const express = require('express')
const app = express()

require('dotenv').config()

const WEATHER_API_KEY=process.env.WEATHER_API_KEY
const MOVIE_API_KEY=process.env.MOVIE_API_KEY
const PORT=process.env.PORT||1314;

const weather=require('./data/weather.json')


const cors = require('cors')
app.use(cors());

const superagent = require('superagent');

    
  app.get('/weather', (req, res) => {

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
   
  
  // console.log(req.query)
  // const weatherAraay=weather.data.map(value=> new Forcast(value) )

})

app.get('/movie', function (req, res) {

  const movieBitUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}&limit=8`;

  superagent.get(movieBitUrl).then(movieBitData => {
    const movieArray = movieBitData.body.results.map(mov => new Movie(mov));
    res.send(movieArray);
  }).catch(console.error);

});

app.get('/', function (req, res) {
  res.send('welcome to backend')
})

class Weather{
  constructor(weth){
    this.description=weth.weather.description,
    this.date=weth.valid_date
    
  }
}
class Movie {
  constructor(mov) {
    this.title = mov.title;
    this.poster = mov.poster_path;
    this.overview = mov.overview;
    this.vote_count = mov.vote_count;
    this.release_date = mov.release_date;
  }
}
 
app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`);
})
