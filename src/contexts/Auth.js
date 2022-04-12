import React, { useContext, useState } from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    async function checkIfLoggedIn() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('/authorize')
                const data = await res.json()
                if (data.status) {
                    setCurrentUser(data.id)
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch(err) {
                reject(err)
            }
        })
    }

    async function logInUser(email, password) {
        console.log('login attempt')
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({email: email, password: password})
            }) 
            const data = await response.json()
            console.log(data)
            setCurrentUser(data)
        } catch(err) {
            console.error(err)
            return
        } 
    }    

    async function signUpUser(email, password) {
        try {
            await fetch("/signup", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({email: email, password: password})
            }) 

        } catch(err) {
            console.error(err)
            return
        } finally {
            const res = await fetch("/userdata", {method: "GET"})
            const data = await res.json()
            console.log(data)
            setCurrentUser(data)
        }
    }

    function logOutUser() {
        setCurrentUser(null)
    }

    const value = {
        currentUser, 
        logInUser,
        signUpUser,
        logOutUser,
        checkIfLoggedIn
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}