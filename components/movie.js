require('dotenv').config()
const superagent = require('superagent');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
const inMemory={};
const handlerMovie=(req,res)=>{
  const query=req.query.query
  const queryParms={
    api_key:MOVIE_API_KEY,
    query:query
  }
    
    const movieBitUrl = `https://api.themoviedb.org/3/search/movie?limit=8`;

    superagent.get(movieBitUrl).query(queryParms).then(movieBitData => {
      if (inMemory[query]!==undefined) {
        console.log('cache hit movie') 
        res.send(inMemory[query])      
      } else {
        const movieArray = movieBitData.body.results.map(mov => new Movie(mov));
        console.log(`cache miss mmovie`);
        inMemory[query]=movieArray
        res.send(movieArray);
      }
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

