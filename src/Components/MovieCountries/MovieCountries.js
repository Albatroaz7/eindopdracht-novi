import React, { useState, useEffect} from 'react';
import axios from "axios";

export default function MovieCountries(){

    const [ countries, setCountries] = useState();

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/countries',
        headers: {
            'x-rapidapi-key': '144c35bfc8msh6ad5c07734e15a7p15c7acjsn85ca2090551c',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
        }
    };

    useEffect(() => {
        try {
            async function getData() {
                const response = await axios(options)

                setCountries(response.data.results)
            }
            getData();

        } catch(e) {
            console.error(e);
        }

    }, [])
    console.log(countries)

    return(

        <div>
            {countries?.map((country) => {
                console.log("test", country);
            })}
        </div>
    )
}
