import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import { useState, useEffect } from "react";

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { currentUser, logInUser, checkIfLoggedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await checkIfLoggedIn()
        }
        check()
    }, [])

    useEffect(() => {
        if (currentUser) navigate("/")
    }, [currentUser])

    // http request to login user
    const handleClick = async (e) => {
        e.preventDefault()
        await logInUser(email, password)
    }

    const handleChange = ({currentTarget}) => {
        if (currentTarget.id === "email") {
            setEmail(currentTarget.value)
        } else if (currentTarget.id === "password") {
            setPassword(currentTarget.value)
        }
    }

    return (
        <div className="background-cover">
            <div className="profile-card">
                <div className="profile-card__header">
                    <h1>Login</h1>
                </div>
                <form>
                    <label>Email
                        <input onChange={handleChange} value={email} id="email" />
                    </label>
                    <label>Password
                        <input type="password" onChange={handleChange} value={password} id="password" />
                    </label>
                    <button type="button" onClick={handleClick}>Login</button>
                </form>
                <p className="profile-card__link">Forgot username of password?</p>
                <Link className="profile-card__link" to="/signup"><p>Don't have an account?</p></Link>
            </div>
        </div>
    )
}