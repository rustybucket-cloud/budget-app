import "./Profile.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import login from "../../redux/actions/login";
import logout from "../../redux/actions/logout";
import e from "express";

export default function Login() {
    const [ username, setUsername ] = useState(null)
    const [ password, setPassword ] = useState(null)

    const loggedIn = useSelector(state => state.login)

    const { currentUser, loginUser } = useAuth()

    // http request to login user
    const handleClick = async (e) => {
        e.preventDefault()
        await loginUser(username, password)
    }

    const handleChange = ({currentTarget}) => {
        if (currentTarget.id === "username") {
            setUsername(currentTarget.value)
        } else if (currentTarget.id === "password") {
            setPassword(currentTarget.value)
        }
    }

    return (
        <div className="login">
            {currentUser && <p>{currentUser.email}</p>}
            <h1>Login</h1>
            <form>
                <label>Username or Email
                    <input onChange={handleChange} value={username} id="username" />
                </label>
                <label>Password
                    <input type="password" onChange={handleChange} value={password} id="password" />
                </label>
                <button type="button" onClick={handleClick}>Login</button>
            </form>
            <p>Forgot username of password?</p>
            <Link to="/signup"><p>Don't have an account?</p></Link>
        </div>
    )
}