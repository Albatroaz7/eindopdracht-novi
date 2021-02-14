import React, { useRef, useState } from 'react'
import "./RegisterForm.css"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CountrySelect from "../CountrySelect/CountrySelect";

const endpointLinkRegister = 'https://polar-lake-14365.herokuapp.com/api/auth/signup'

export default function SignInForm(props){
    const [ createUserSucces, setCreateUserSucces ] = useState(false);
    const [ createUserError, setCreateUserError ] = useState(false);
    const [ loading, toggleLoading ] = useState(false);
    const { register, handleSubmit, errors, watch} = useForm();

    const numCountry = watch("country", props.country);


    const password = useRef({});
    password.current = watch("password", "");

    async function onSubmit(data){
        console.log(data);
        toggleLoading(false);
        try{
            const response = await axios.post(endpointLinkRegister, {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmpassword: data.confirmpassword,
                country: data.country,
                role: ['user'],
            });
            console.log(response);
            if(response.status === 200){
                setCreateUserSucces(true);
            }
        } catch(e){
            console.log(e);
            if(e.message.includes('400')){
                setCreateUserError(<span>Username or email is already in use.</span>);
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

                {/*<CountrySelect />*/}
                <div>
                    <select className="country" name="country" ref={register({
                        required: true,
                    })}>
                        <option value="error">select country</option>
                        <option value="AO">Angola</option>
                        <option value="AR">Argentina</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BO">Bolivia</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="CA">Canada</option>
                        <option value="CL">Chile</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croatia</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="EE">Estonia</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GT">Guatemala</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="LV">Latvia</option>
                        <option value="LT">Lithuania</option>
                        <option value="MO">Macao</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="MT">Malta</option>
                        <option value="MU">Mauritius</option>
                        <option value="MX">Mexico</option>
                        <option value="MN">Mongolia</option>
                        <option value="MA">Morocco</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NG">Nigeria</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PA">Panama</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="RS">Serbia</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="ZA">South Africa</option>
                        <option value="KR">South Korea</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="TW">Taiwan</option>
                        <option value="TH">Thailand</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TR">Turkey</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Viet Nam</option>
                    </select>
                    {numCountry === 'error' && (
                        <div className="error-message"><p>{icon} Please select a country</p></div>
                    )}
                </div>

                <button className="sign-up-submit"
                       type="submit"
                       disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {createUserSucces === true && <span>Registered successfully, you can now <Link to="/login">Login here</Link></span>}
                {createUserError}
            </form>
        </div>
    )

}
