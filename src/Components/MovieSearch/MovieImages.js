import React, {useEffect, useState} from 'react';
import axios from "axios";
import './MovieImages.css'


export default function MovieImages(){
    const [ movies, setMovies] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');

    const setVoteClass = (vote) => {
        if(vote >= 8){
            return'green';
        } else if(vote >= 6){
            return 'orange';
        } else {
            return 'red';
        }
    }

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            query: searchTerm,
            orderby: 'date',
            limit: '56',
            type: 'movie',
            start_year: '2000',
            end_year: '2020',
        },
        headers: {
            'x-rapidapi-key': '144c35bfc8msh6ad5c07734e15a7p15c7acjsn85ca2090551c',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
        }
    };

    //Using the useEffect to get the data from the API the moment the page loads.
    useEffect(() => {
            async function getMovie() {
                try {
                const response = await axios(options)
                setMovies(response.data.results)
            }catch(e) {
                    console.error(e);
                }
        }
        getMovie()
    }, [searchTerm])

    console.log(movies)

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }


    //Changes the state of searchterm with the users input whenever he/she presses 'enter'.
    const handleOnChange = (e) => {
        if(e.charCode === 13) {
            setSearchTerm(e.target.value);
        }
    }

    return(
<>
  <div className='search-bar-background'>
    <div className='search-bar-container'>
        <form onSubmit={handleOnSubmit}>
            <h2 className='search-bar-title'>Search for your movie:</h2>
            <input className='search-bar'
                   type='text'
                   placeholder='Search'
                   onKeyPress={handleOnChange}
            />
        </form>
    </div>
  </div>
  <div className='movie-container'>\

      <div>
          <ul className='movie-compo'>

      {movies?.map((movie) => {
          return <li className='movie-compo-box'>
              <img src={movie?.img} alt='movie image'/>
              <div className='movie-compo-text'>
              <h4>{movie?.title}</h4>
              <h4 className={`tag ${setVoteClass(movie?.imdbrating)}`}>
                  {movie?.imdbrating}
              </h4>
              </div>
                  <br />
                  <div className='movie-compo-overlay'>
              <h3>Overview:</h3>
                  <br />
              <p>{movie?.synopsis}</p>
              {/*    <br />*/}
              {/*<p>{movie?.clist}</p>*/}
              </div>
          </li>
      })}
      </ul>
  </div>
  </div>
</>

    )
}
