import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Auth";

export function useFetch(endpoint, method, body) {
    const [ data, setData ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    const { currentUser } = useAuth()

    useEffect(() => {
        const url = `http://localhost:5000/${endpoint}`
        fetch(url, {
            method: method,
            header: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)
            setIsLoading(false)
        })
        .catch(err => console.error(err))
    }, [endpoint, method, body])
    
    return { data, isLoading }
}