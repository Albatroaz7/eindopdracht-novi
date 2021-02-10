import React from 'react';
import {useAuthState} from "../../Components/Context/AuthContext";

export default function MyProfile(){
    const { user } = useAuthState();
    return(
        <div>
            <h2>MyProfile</h2>

            {user && (
                <>
                    <p><strong>Username:</strong> {user.username} </p>
                    <p><strong>Email:</strong> {user.email} </p>
                </>
            )}
<br />
<br />

            <h2>Movies in your country:</h2>
        </div>
    )

}
