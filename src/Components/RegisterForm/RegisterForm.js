import React, { useRef, useState } from 'react'
import "./RegisterForm.css"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const endpointLinkRegister = 'https://polar-lake-14365.herokuapp.com/api/auth/signup'

export default function SignInForm(){
    const [ createUserSucces, setCreateUserSucces ] = useState(false);
    const [ createUserError, setCreateUserError ] = useState(false);
    const [ loading, toggleLoading ] = useState(false);
    const { register, handleSubmit, errors, watch} = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    async function onSubmit(data){
        toggleLoading(false);
        try{
            const response = await axios.post(endpointLinkRegister, {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmpassword: data.confirmpassword,
                role: ['user'],
            });
            if(response.status === 200){
                setCreateUserSucces(true);
            }
        } catch(e){
            console.error(e);
            //If the error code is 400, then a account with the given username or email is already in use. This will
            //give the user an error message to let him/her know.
            if(e.message.includes('400')){
                setCreateUserError(<span>Username or email is already in use.</span>);
            //If the error code is not 400, but for example 401, 402, etc.. Then this will give the user an error message
            //to let him/her know something went wrong and to try registering again.
            }else{
                setCreateUserError(<span>Something went wrong with submitting, please try again</span>)
            }

        }
        toggleLoading(true);
    }

//Made a variable for the icon so it's easier to reuse.
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

                <button className="sign-up-submit"
                       type="submit"
                       disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {createUserSucces === true && <span>Registered successfully, you can now <Link to="/login">Login here</Link></span>}
                {createUserError}
            </form>
        </div>
    );

}
