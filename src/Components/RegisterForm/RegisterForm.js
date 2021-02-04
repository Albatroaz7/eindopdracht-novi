import React, { useRef } from 'react'
import "./RegisterForm.css"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignInForm(){
    const { register, handleSubmit, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    function onSubmit(data){
        console.log(data);
    }

//Variable aangemaakt voor het icoontje om het makkelijker te hergebruiken.
    const icon = <FontAwesomeIcon icon={faExclamation}/>

    return(

        <div className="sign-up-container">

            <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <label htmlFor="userName"/>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    ref={register({
                        required: "Username is required"
                    })}
                />
                <div className="error-message">{errors.username && <p>{icon} Username is required</p>}</div>

                <label htmlFor="email"/>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    ref={register({
                        required: "Email is required"
                    })}
                />
                <div className="error-message">{errors.email && <p>{icon} Email is required</p>}</div>

                <label htmlFor="password"/>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    ref={register({
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters"
                        }
                    })}
                />
                <div className="error-message">{errors.password && <p>{icon} {errors.password.message}</p>}</div>

                <label htmlFor="confirm password"/>
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    ref={register({
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters"
                        },
                        validate: value =>
                            value === password.current || "The passwords do not match"
                    })}
                />
                <div className="error-message" >{errors.confirmPassword && <p>{icon} {errors.confirmPassword.message}</p>}</div>

                <input className="sign-up-submit"
                       type="submit"
                />
                <span>Already have an account?<Link to="/login">Login here</Link></span>
            </form>
        </div>
    )

}
