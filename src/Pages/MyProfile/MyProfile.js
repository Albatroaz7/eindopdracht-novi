import React from 'react';
import ExpiringMovies from "../../Components/ExpiringMovies/ExpiringMovies";
import './MyProfile.css';
import {useAuthState} from "../../Components/Context/AuthContext";

export default function MyProfile(){
    const { user } = useAuthState();

    return(
        <div className='my-profile-container'>
            <div className='my-profile-info'>
                <h2>My Profile Information</h2>

                {user && (
                    <>
                        <p><strong>Username:</strong> {user.username} </p>
                        <p><strong>Email:</strong> {user.email} </p>
                        <p><strong>Role:</strong> {user.roles}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                    </>
                )}
                <br />
                <br />

            </div>
            <ExpiringMovies />
        </div>


    )

}
