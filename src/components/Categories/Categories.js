import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import useExpenses from "../../hooks/useExpenses"
import { useAuth } from "../../contexts/Auth"

import addCategory from "../../redux/actions/addCategory"
import removeCategory from "../../redux/actions/removeCategory"
import resetCategories from "../../redux/actions/resetCategories"
import updateTotal from "../../redux/actions/updateTotal"
import updateAvailable from "../../redux/actions/updateAvailable"
import setSearched from "../../redux/actions/setSearched"

import Category from "./Category"

export default function Categories(props) {
    //const [ currentUser, setCurrentUser ] = useState(null)
    /* const state = useSelector(state => state.categories)
    const totalState = useSelector(state => state.total)
    const searched = useSelector(state => state.searched)
    const loggedIn = useSelector(state => state.login)
    const dispatch = useDispatch() */
    const [total, setTotal] = useState(0)
    const [remaining, setRemaining] = useState(0)

    const { currentUser } = useAuth()
    const { isLoading, data } =  useExpenses('categories')

    /* const [ categories, setCategories ] = useState(null)
    const [ total, setTotal ] = useState(0)
    const [ available, setAvailable ] = useState(0) */

    const navigate = useNavigate()

    useEffect(() => {
        currentUser || navigate("./login")
    }, [currentUser])

    // calculate total and remaining of total budget
    useEffect(() => {
        let total = 0
        let remaining = 0
        if (data) {
            data.forEach(category => {
                total += category.total
                remaining += category.remaining
            });
            setTotal(total)
            setRemaining(remaining)
        }
    }, [data])

    if (!isLoading) {
        return (
            <>
                <h1>Categories</h1>
                <Category name="Total" totalCategory={true} total={total} available={remaining} />
                {data && data.map( category => {
                   return <Category id={category.id} name={category.category_name} totalCategory={false} total={category.total} available={category.remaining} setCategory={props.setCategory}/> 
                })}
                <button className="add-category-button">Add Category</button>
            </>
        )
    } else {
        return (
            <>
                <h1>Categories</h1>
                <p>Loading...</p>
            </>
        )
    }
}