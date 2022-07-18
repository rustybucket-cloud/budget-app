/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useLazyQuery, useMutation } from '@apollo/client'
import categoriesQueries from "../server/categoriesQueries";
import { useAuth } from "./Auth";
import { useAuth0 } from "@auth0/auth0-react"

const CategoriesContext = React.createContext()

export function useCategories() {
    return useContext(CategoriesContext)
}

export function useCreateCategory() {
    const [createCategory, { loading, data }] = useMutation(categoriesQueries.addCategory)
    return {
        createCategory, 
        loading, 
        data
    }
}

export function CategoriesProvider({ children }) {
    const [getCategories, { loading, data }] = useLazyQuery(categoriesQueries.userCategories())
    const { isAuthenticated, user } = useAuth0()
    console.log(data, isAuthenticated)
   // const { currentUser } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user.email)
            try {
                getCategories({ variables: { userId: user.email }})
            } catch(e) {
                console.error(e)
            }
        }
    }, [isAuthenticated, getCategories])
    const value = {
        categories: data?.userCategories,
        loading
    }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}