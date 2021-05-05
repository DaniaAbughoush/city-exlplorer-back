const express = require('express')
const app = express()
const weather=require('./data/weather.json')
const PORT=process.env.PORT||3030
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.get('/weather', function (req, res) {
  const weatherAraay=weather.data.map(value=> new Forcast(value) )
  res.send(weatherAraay)
})
app.get('/', function (req, res) {
  res.send('hhh')
})

class Forcast{
  constructor(weth){
    this.description=weth.weather.description,
    this.date=weth.valid_date
    
  }
}

 console.log('hhh back end')
app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`);
})