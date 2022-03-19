import React, { useContext, useState } from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function logInUser(email, password) {
        try {
            const response = await fetch("https://budget-app-rustybucket.herokuapp.com/login", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({username: email, password: password})
            }) 
            const data = await response.json()
            setCurrentUser(data)
        } catch(err) {
            console.error(err)
            return
        } finally {
            setLoading(false)
        }
    }    

    async function signUpUser(email, password) {
        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({email: email, password: password})
            }) 
            const data = await response.json()
            setCurrentUser(data)
        } catch(err) {
            console.error(err)
            return
        } finally {
            setLoading(false)
        }
    }

    function logOutUser() {
        setCurrentUser(null)
    }

    const value = {
        currentUser, 
        logInUser,
        signUpUser,
        logOutUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}