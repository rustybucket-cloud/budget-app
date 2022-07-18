/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../../contexts/Auth";
import { Card, CardHeader, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material"
import style from "./Login.style"
import { useTheme } from "@mui/system";
import { Button } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react"

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLoginPage, setIsLoginPage ] = useState(true)

    const { loginWithRedirect, user } = useAuth0()

    const theme = useTheme()

   // const { loading, currentUser, logInUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => console.log(user), [user])

    /* useEffect(() => {
        if (currentUser) navigate("/")
    }, [currentUser, navigate])
 
    // http request to login user
    const handleClick = async (e) => {
        e.preventDefault()
        await logInUser(email, password)
    } */
    const handleClick = () => {
        loginWithRedirect()
    }
    const loading = false
    return (
        <div css={style.background(theme.palette.grey.main)}>
            <Card css={style.card}>
                <CardHeader css={style.header(theme.palette.primary.main)} title={isLoginPage ? "Login" : "Sign Up"} />
                <CardContent>
                    <form css={style.form(theme.spacing(3))}>
                        <TextField 
                            label="Email"
                            variant="outlined"
                            onChange={({currentTarget}) => setEmail(currentTarget.value)}
                            value={email}
                        />
                        <TextField 
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={({currentTarget}) => setPassword(currentTarget.value)}
                            value={password}
                        />
                        { !isLoginPage && <TextField label="Confirm Password" variant="outlined" /> }
                        <Button type="button" css={style.button} variant="contained" onClick={handleClick}>
                            {isLoginPage ? 'Login' : 'Sign Up'}
                        </Button>
                    </form>
                    <div css={style.links(theme.spacing(3))}>
                        { isLoginPage && <Button disabled={loading} color="blue">Forgot username or password?</Button> }
                        <Button color="blue" onClick={() => setIsLoginPage((curr) => !curr)}>
                            {isLoginPage ? "Don't" : "Already"} have an account?
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}