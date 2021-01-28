import React from 'react'
import "./SignInForm.css"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignInForm(){
    const { register, handleSubmit, errors} = useForm();

function onSubmit(data){
    console.log(data);
}

    return(
    <div className="sign-in-container">

    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <label htmlFor="userName"></label>
        <input
            name="username"
            type="text"
            placeholder="Username"
            ref={register({required: true})}
        />
        {errors.username && <p>Username is required</p>}

        <label htmlFor="password"></label>
        <input
            name="password"
            type="password"
            placeholder="Password"
            ref={register({required: true})}
        />
        {errors.password && <p>Password is required</p>}

        <input className="sign-in-submit"
            type="submit"
        />
        <p>New user?<Link to="/register">Register here</Link></p>
    </form>
    </div>
    )

}
