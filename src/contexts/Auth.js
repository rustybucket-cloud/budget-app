import React, { useContext, useEffect } from "react";
import { useLazyQuery, useMutation } from '@apollo/client'
import { accountQueries } from "../server";
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [login, { loading: isLoginLoading, data: currentUser, error: loginError }] = useLazyQuery(accountQueries.login)
    const [signUp, { loading: isSignupLoading, data: createdUser, error: signUpError }] = useMutation(accountQueries.signUp)

    useEffect(() => {
        if (loginError == null && signUpError == null) return
        if (loginError) console.error(loginError)
        if (signUpError) console.error(signUpError)
    }, [loginError, signUpError])

    async function logInUser(email, password) {
        login({ variables: { email, password }})
    }

    async function signUpUser(email, password) {
        signUp({ variables: { email, password }})
    }

    const value = {
        currentUser: currentUser || createdUser || null, 
        logInUser,
        signUpUser,
        loading: isLoginLoading || isSignupLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}