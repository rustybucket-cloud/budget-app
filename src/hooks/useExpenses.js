import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function useExpenses(request_type, category_name = null) {
    const { currentUser } = useAuth()
    const [ data, setData ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    useEffect(() => {
        if (currentUser) {
            const endPoint = request_type === 'expenses' ? `/categoryinfo/${category_name}` : `/api/categories/${currentUser.id}`
            fetch(`${endPoint}`)
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