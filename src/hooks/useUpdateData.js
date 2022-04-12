import { useState, useEffect } from "react";

export default function useUpdateData(type, method, data) {
    const [ isUpdateLoading, setIsUpdateLoading ] = useState(true)
    const [ status, setStatus ] = useState(null)

    useEffect(() => {
        if (type && method && data) {
            fetch(`/${type}`, {
                method: `${method}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setIsUpdateLoading(false)
                setStatus(data)
            })
        }
    }, [type, method, data])

    return { isUpdateLoading, status }
}