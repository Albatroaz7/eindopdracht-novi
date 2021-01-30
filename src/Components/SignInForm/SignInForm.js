import React from 'react'
import "./SignInForm.css"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SignInForm(){
    const { register, handleSubmit, errors} = useForm();

function onSubmit(data){
    console.log(data);
}

//Variable aangemaakt voor het icoontje om het makkelijker te hergebruiken.
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

        <input className="sign-in-submit"
            type="submit"
        />
        <span>New user?<Link to="/register">Register here</Link></span>
    </form>
    </div>
    )

}
