import React, { useEffect, useState } from 'react';
import './Homepage.css';
import MovieImages from "../../Components/MovieImages/MovieImages";

export default function Homepage() {
    const movies = ['1'];
return(
    <div>
        {movies.map(movie => (
            <MovieImages />
        ))}
    </div>

)

}
