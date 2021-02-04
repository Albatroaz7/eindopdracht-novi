import React, {useEffect, useState} from 'react';
import axios from "axios";
import './MovieImages.css'


export default function MovieImages(){
    const [ movies, setMovies] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            orderby: 'rating',
            limit: '9',
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
        try {
            async function getImage() {
                const response = await axios(options)

                setMovies(response.data.results)
            }
            getImage();

        } catch(e) {
            console.error(e);
        }

    }, [])

    console.log(movies)

    return(
        //Mapping over the api to get the key/values out of the object.
  <div className='movie-container'>
      {movies?.map((movie) => {
          return <div className='movie-compo'>
              <img src={movie?.img}/>
              <h3>{movie?.imdbrating}</h3>
          </div>
      })}
  </div>

    )
}
