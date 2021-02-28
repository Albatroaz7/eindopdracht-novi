import React, {useEffect, useState} from 'react';
import axios from "axios";
import './MovieSearch.css'


export default function MovieSearch(){
    const [ movies, setMovies] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');

    //function with if statement so it's easier for users to see what rating a movie has.
    const setVoteClass = (vote) => {
        if(vote >= 8){
            return'green';
        } else if(vote >= 6){
            return 'orange';
        } else {
            return 'red';
        }
    }

    //info and params from the api to be able to search all movies and see in which country they are available.
    const options1 = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            query: searchTerm,
            orderby: 'date',
            limit: '56',
            start_year: '2000',
            end_year: '2020',
        },
        headers: {
            'x-rapidapi-key': '144c35bfc8msh6ad5c07734e15a7p15c7acjsn85ca2090551c',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
        }
    };

    //Using the useEffect to get the data from the API the moment the user presses 'enter', by using
    //the searchTerm state in the dependency.
    useEffect(() => {
            async function getMovie() {
                try {
                const response = await axios(options1)
                setMovies(response.data.results)
            }catch(e) {
                    console.error(e);
                }
        }
        getMovie()
    }, [searchTerm])

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

  <div className='movie-container'>
      <div>
          <ul className='movie-compo'>

      {movies?.map((movie) => {
          let countryList = movie?.clist;
          countryList = String(countryList)
          countryList = countryList.replace(new RegExp('"', "g"), '')
          countryList = countryList.replace(new RegExp(":", "g"), ', ')
          countryList = countryList.split(",")

          let mainList = []

          //countrylist in the API gave back alot of unnecessary characters in an array which had to be removed using replace
          //and split. And then use the if statement to only get the 1, 3, 5, etc.. from the array. Because i didn't
          // need the other ones.
          let arrayLength = countryList.length;
          for (let i = 0; i < arrayLength; i++) {
              if(i%2 !== 0) {
                  mainList.push(countryList[i]);
              }
          }
          countryList = mainList.toString()

          return <li className='movie-compo-box'>
              <img src={movie?.img} alt='movie image' key={movie?.id}/>
              <div className='movie-compo-text'>
              <h4>{movie?.title}</h4>
              <h4 className={`tag ${setVoteClass(movie?.imdbrating)}`}>
                  {movie?.imdbrating}
              </h4>
              </div>
                  <br />
              <div className='movie-compo-overlay'>
                  {/*//The +x number of countries is what you get back form the API call. */}
              <h3 id='overview'>Countrylist:</h3>
                  <br />
                  <p>{countryList}</p>
              </div>
          </li>
      })}
      </ul>
  </div>

  </div>
</>

    )
}
