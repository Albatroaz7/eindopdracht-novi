import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import './MyProfileMovies.css';
import {CountryContext} from "../../Pages/MyProfile/MyProfile";

export default function MyProfileMovies(){
    const [ expiringMovies, setExpiringMovies] = useState([]);
    const [ newReleaseMovies, setNewReleaseMovies ] = useState([]);

    const countries = useContext(CountryContext);

    //Getting the data from the api with using useEffect.
    useEffect(() => {
        //info and params from the api to get the movies that have just been released in a country.
        const options3 = {
            method: 'GET',
            url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
            params: {q: `get:new7:${countries}`, p: '1', t: 'ns', st: 'adv'},
            headers: {
                'x-rapidapi-key': '144c35bfc8msh6ad5c07734e15a7p15c7acjsn85ca2090551c',
                'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        };

        async function getMovieNewRelease() {
            try {
                const response = await axios(options3)
                setNewReleaseMovies(response.data.ITEMS)
            }catch(e) {
                console.error(e);
            }
        }
        getMovieNewRelease();
    }, [countries])

    useEffect(() => {
        // info and params from the api to get the expiring movies in a country.
        const options2 = {
            method: 'GET',
            url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
            params: {q: `get:exp:${countries}`, t: 'ns', st: 'adv', p: '1'},
            headers: {
                'x-rapidapi-key': '144c35bfc8msh6ad5c07734e15a7p15c7acjsn85ca2090551c',
                'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        };
        async function getMovieExpire() {
            try {
                const response = await axios(options2)
                setExpiringMovies(response.data.ITEMS)
            }catch(e) {
                console.error(e);
            }
        }
        getMovieExpire();
    }, [countries])

    return(
        <>
        <div className='my-profile-container'>
            <h1 className='my-profile-expiring'>Movies to be expired in your selected country:</h1>
    <div>
        <ul className='movie-compo'>
            {expiringMovies?.map((expireMovie) => {

                return <li className='movie-compo-box'>
                    <img src={expireMovie?.image} alt='movie image' key={expireMovie?.id}/>
                    <h3 className='movie-compo-title'>{expireMovie?.title}</h3>
                    <div className='movie-compo-text'>
                        <h4 className='date-box'>Expiring date: {expireMovie?.unogsdate}</h4>
                    </div>
                    <div className='movie-compo-overlay'>
                        <h3 id='overview'>Overview:</h3>
                        {/*The API gave back weird characters that i had to remove using slice.*/}
                        <p>{expireMovie?.synopsis.slice(0, -32)}</p>
                    </div>
                </li>
            })}
        </ul>
    </div>
            <h1 className='my-profile-added'>Movies recently added in your selected country:</h1>
            <div>
                <ul className='movie-compo'>

                    {newReleaseMovies?.map((newMovie) => {
                        return <li className='movie-compo-box'>
                            <img src={newMovie?.image} alt='movie image' key={newMovie?.id}/>
                            <h3>{newMovie?.title}</h3>
                            <div className='movie-compo-text'>
                                <h4 className='date-box'>Added: {newMovie?.unogsdate}</h4>
                            </div>
                            <div className='movie-compo-overlay'>
                                <h3 id='overview'>Overview:</h3>
                                <br />
                                <p>{newMovie?.synopsis.slice(0, -28)}</p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
    </div>
        </>
    );
}
