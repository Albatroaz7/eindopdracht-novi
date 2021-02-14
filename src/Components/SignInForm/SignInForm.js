import React, { useContext, useEffect, useState } from 'react'
import "./SignInForm.css"
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext, useAuthState } from "../Context/AuthContext";

const endpointLinkSignIn = 'https://polar-lake-14365.herokuapp.com/api/auth/signin';

export default function SignInForm(){
    const [ error, setError] = useState(false);
    const history = useHistory();
    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();
    const { register, handleSubmit, errors} = useForm();


    useEffect(() => {
        if (isAuthenticated === true){
            history.push('/myprofile')
        }
    }, [isAuthenticated])

async function onSubmit(data){
    console.log(data);
    try{
        // It's also possible to only use 'data'. However i rather write it all down, so it's easier to
        // read when you look at it for the first time or after a long while.
        const response = await axios.post(endpointLinkSignIn, {
            username: data.username,
            password: data.password,
            country: data.country,
        });
        login(response.data);
    } catch(e){
        console.error(e);
        setError(true);
    }
}

    const icon = <FontAwesomeIcon icon={faExclamation}/>

    return(
    <div className="sign-in-container">

    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <label htmlFor="userName"/>
        <input
            name="username"
            type="text"
            placeholder="Username"
            ref={register({required: true})}
        />
        <div className="error-message">{errors.username && <p>{icon} Username is required</p>}</div>

        <label htmlFor="password"/>
        <input
            name="password"
            type="password"
            placeholder="Password"
            ref={register({required: true})}
        />
        <div className="error-message">{errors.password && <p>{icon} Password is required</p>}</div>
        <br />
        {error && <span>Failed to log in</span>}

        <input className="sign-in-submit"
            type="submit"
        />
        <span>New user?<Link to="/register">Register here</Link></span>
    </form>
    </div>
    );

}
