import React, { useContext, useEffect } from 'react';
import {Switch, Link, Route, Redirect, useHistory} from "react-router-dom";
import Homepage from "../../Pages/Homepage/Homepage";
import MyProfile from "../../Pages/MyProfile/MyProfile";
import Trending from "../../Pages/Trending/Trending";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import './Navbar.css';
import { AuthContext, useAuthState} from "../Context/AuthContext";


export default function Navbar(){
    const history = useHistory();
    const { isAuthenticated } = useAuthState();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated === false){
            history.push('/login')
        }
    }, [isAuthenticated])

    return(
<>
        <div className="nav-container">
                <div className="navigation-logo">
                <nav>
                    <img
                        src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49"
                        alt="Netflix logo"
                    />
                    <ul className='navbar-menu'>

                        <li>
                            <Link to="/">Homepage</Link>
                        </li>
                        <li>
                            <Link to="/myprofile">MyProfile</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            {isAuthenticated ? <input
                                    className="log-out-submit"
                                    value="Logout"
                                    type="submit"
                                    onClick={logout}
                                /> : ''}
                        </li>
                    </ul>
                </nav>
                </div>
            </div>
            <div>

                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route path="/myprofile">
                        {isAuthenticated ? <MyProfile /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/trending">
                        <Trending />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <h1>404 not found</h1>
                    </Route>

                </Switch>
            </div>
</>

    )
}
