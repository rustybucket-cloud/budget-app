import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function useExpenses(request_type, category_name = null) {
    const { currentUser } = useAuth()
    const [ data, setData ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    useEffect(() => {
        if (currentUser) {
            const endPoint = request_type === 'expenses' ? `categoryinfo/${currentUser.id}/${category_name}` : `categories/${currentUser.id}`
            fetch(`http://localhost:5000/${endPoint}`, {
                method: 'get',
                header: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
        }
    }, [currentUser, category_name, request_type])

    return { data, isLoading }
}