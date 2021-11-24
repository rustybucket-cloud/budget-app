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
                // calculate total buget and remaining money
                data.categories.forEach(category => {
                    // add category credits and subtract debits
                    let availableLeft = 0
                    category.expenses.forEach( expense => {
                        availableLeft += expense.type === "credit" ? expense.amount : -expense.amount
                    })
                    // add to total and available
                    setTotal(total => total + category.total)
                    setAvailable(available => available + availableLeft)
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
                <Category name="Total" totalCategory={true} total={total} available={available} />
                {categories.map( category => {
                    let available = 0
                    category.expenses.forEach( expense => {
                        available += expense.type === "credit" ? expense.amount : -expense.amount
                    })
                   return <Category name={category.name} totalCategory={false} total={category.total} available={available} setCategory={props.setCategory}/> 
                })}
            </div>
        )
    }
    else {
        return null
    }
}