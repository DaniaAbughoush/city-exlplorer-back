require('dotenv').config()
const superagent = require('superagent');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

const handlerMovie=(req,res)=>{
    
    const movieBitUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}&limit=8`;

    superagent.get(movieBitUrl).then(movieBitData => {
      const movieArray = movieBitData.body.results.map(mov => new Movie(mov));
      res.send(movieArray);
    }).catch(console.error);
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
  module.exports=handlerMovie

