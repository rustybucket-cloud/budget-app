/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

    useEffect(() => {
        if (!isAuthenticated && !isLoading) loginWithRedirect()
    }, [isAuthenticated, isLoading])

    return children
}