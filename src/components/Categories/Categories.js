import { useState, useEffect } from "react"

import Category from "./Category"

export default function Categories(props) {
    const [ categories, setCategories ] = useState(null)
    const [ total, setTotal ] = useState(0)
    const [ available, setAvailable ] = useState(0)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('./categories', {
                method: "POST"
                })
                const data = await response.json()
                setCategories(data.categories)
                data.categories.forEach(category => {
                    setTotal(total => total + category.total)
                    setAvailable(available => available + category.available)
                })
            }
            catch(err) {
                console.error(err)
            }
        }
        getData()
    }, [])

    if (categories) {
        return (
            <div>
                <h1>Categories</h1>
                <Category name="Total" total={total} available={available} />
                {categories.map( category => {
                   return <Category name={category.name} total={category.total} available={category.available} setCategory={props.setCategory}/> 
                })}
            </div>
        )
    }
    else {
        return null
    }
}