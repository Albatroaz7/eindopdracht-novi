import React, {useEffect, useState} from 'react';
import axios from "axios";
import './MovieImages.css'

export default function MovieImages(){
    const [ movies, setMovies] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            query: searchTerm,
            orderby: 'rating',
            limit: '100',
            type: 'movie',
            countrylist: '67',
            start_year: '2010',
            end_year: '2019',
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

    // the function that is being called upon whenever the user presses 'enter'.
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm)
        // {movies?.map((movie) => {
        //     return <div className='movie-compo'>
        //         <img src={movie?.img}/>
        //         <h3>{movie?.imdbrating}</h3>
        //     </div>
        // })}
    }

    //Changes the state of searchterm with the users input whenever he/she presses 'enter'.
    const handleOnChange = (e) => {
        if(e.charCode === 13) {
            setSearchTerm(e.target.value);
        }
    }

    return(

        //form for the searchbar
  <div className='movie-container'>
      <div className='search-bar-container'>
          <h1>Search</h1>
          <form onSubmit={handleOnSubmit}>
          <input className='search-bar'
              type='text'
              placeholder='Search'
              onKeyPress={handleOnChange}
          />
          </form>
      </div>
      {/*{movies?.map((movie) => {*/}
      {/*    return <div className='movie-compo'>*/}
      {/*        <img src={movie?.img}/>*/}
      {/*        <h3>{movie?.imdbrating}</h3>*/}
      {/*    </div>*/}
      {/*})}*/}
  </div>

    )
}