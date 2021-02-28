import React, { useState, createContext} from 'react';
import MyProfileMovies from "../../Components/MyProfileMovies/MyProfileMovies";
import './MyProfile.css';
import {useAuthState} from "../../Components/Context/AuthContext";
import {useForm} from "react-hook-form";

export const CountryContext = createContext();

export default function MyProfile(){
    const { user } = useAuthState();

    const { register } = useForm();

    const [ countries, setCountries ] = useState('');

    const getCountryData = (e) => {
        setCountries(e.target.value)
    }

    return(
        <>
        <CountryContext.Provider value={countries}>
        <div className='my-profile-container'>
            <div className='my-profile-info'>

                <div className='country-search-bar'>
                    <h1>My Profile Information</h1>

                    {user && (
                        <>
                            <p className='profile-info'><strong>Username:</strong> {user.username} </p>
                            <p className='profile-info'><strong>Email:</strong> {user.email} </p>
                        </>
                    )}
                    <br />
                <h1>Select your country:</h1>
                    <select id='country' className="country" name="country" onChange={getCountryData} ref={register({
                        required: true,
                    })}>
                        <option value="error">select country</option>
                        <option value="AR">Argentina</option>
                        <option value="AU">Australia</option>
                        <option value="BE">Belgium</option>
                        <option value="BR">Brazil</option>
                        <option value="CA">Canada</option>
                        <option value="CO">Colombia</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="GR">Greece</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="LT">Lithuania</option>
                        <option value="MY">Malaysia</option>
                        <option value="MX">Mexico</option>
                        <option value="NL">Netherlands</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="ZA">South Africa</option>
                        <option value="KR">South Korea</option>
                        <option value="ES">Spain</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="TH">Thailand</option>
                        <option value="TR">Turkey</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                    </select>
                </div>
                </div>

                <br />
                <br />

            </div>
            <MyProfileMovies />
        </CountryContext.Provider>
        </>
    );
}

