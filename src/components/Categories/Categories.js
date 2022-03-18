import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import addCategory from "../../redux/actions/addCategory"
import removeCategory from "../../redux/actions/removeCategory"
import resetCategories from "../../redux/actions/resetCategories"
import updateTotal from "../../redux/actions/updateTotal"
import updateAvailable from "../../redux/actions/updateAvailable"
import setSearched from "../../redux/actions/setSearched"

import Category from "./Category"

export default function Categories(props) {
    const [ currentUser, setCurrentUser ] = useState(null)
    const state = useSelector(state => state.categories)
    const totalState = useSelector(state => state.total)
    const searched = useSelector(state => state.searched)
    const loggedIn = useSelector(state => state.login)
    const dispatch = useDispatch()

    const [ categories, setCategories ] = useState(null)
    const [ total, setTotal ] = useState(0)
    const [ available, setAvailable ] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        currentUser || navigate("./login")

        props.setActive("categories") // sets nav wayfinding

        async function getData() {
            try {
                const login = await fetch("./login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: 'email1@email.com', password: '123456'})
                })
                const userInfo = login.json()
                console.log(userInfo)
                const response = await fetch('./categories', {
                method: "POST"
                })
                const data = await response.json()
                setCategories(data.categories)
                // calculate total buget and remaining money
                data.categories.forEach(category => {
                    // add categories to redux state
                    dispatch(addCategory(category))
                    dispatch(updateTotal(category.total))
                    // add category credits and subtract debits
                    let availableLeft = 0
                    category.expenses.forEach( expense => {
                        //availableLeft += expense.type === "credit" ? expense.amount : -expense.amount
                        let addAmount = expense.type === "credit" ? expense.amount : expense.amount * -1
                        dispatch(updateAvailable(addAmount))
                    })
                    
                    // add to total and available
                    setTotal(total => total + category.total)
                    setAvailable(available => available + availableLeft)
                })
                dispatch(setSearched()) 
            }
            catch(err) {
                console.error(err)
            }
        }
        if(!searched) getData()
    }, [])

    if (state) {
        return (
            <>
                <h1>Categories</h1>
                <Category name="Total" totalCategory={true} total={totalState.total} available={totalState.available} />
                {state.map( category => {
                    let available = 0
                    category.expenses.forEach( expense => {
                        available += expense.type === "credit" ? expense.amount : -expense.amount
                    })
                   return <Category name={category.name} totalCategory={false} total={category.total} available={available} setCategory={props.setCategory}/> 
                })}
                <button className="add-category-button">Add Category</button>
            </>
        )
    }
    else {
        return null
    }
}