import "./Profile.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import login from "../../redux/actions/login";
import logout from "../../redux/actions/logout";

export default function Login() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const loggedIn = useSelector(state => state.login)

    const { currentUser, logInUser } = useAuth()

    // http request to login user
    const handleClick = async (e) => {
        e.preventDefault()
        await logInUser(username, password)
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