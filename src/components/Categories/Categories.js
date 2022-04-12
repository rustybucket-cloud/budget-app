import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import useExpenses from "../../hooks/useExpenses"
import { useAuth } from "../../contexts/Auth"
import useUpdateData from "../../hooks/useUpdateData"

import Category from "./Category"

export default function Categories(props) {
    const [total, setTotal] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [ isOpenForm, setIsOpenForm ] = useState(false)
    const [ isHidden, setIsHidden ] = useState(true)
    const [ name, setName ]= useState('')
    const [ amount, setAmount ] = useState('')
    const [ dataToFetch, setDataToFetch ] = useState(null)

    const { currentUser } = useAuth()
    const { isLoading, data } =  useExpenses('categories')

    const { isUpdateLoading, status } = useUpdateData('categories', 'POST', dataToFetch)

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

    const showAndHideForm = () => {
        if (isOpenForm) { // hide
            setIsOpenForm(false)
            // delay so animation can run
            setTimeout(() => setIsHidden(true), 1000)
        } else { // show
            setIsHidden(false)
            // delay so animation can run
            setTimeout(() => setIsOpenForm(true), 50)
        }
    }

    const handleClick = () => {
        setDataToFetch({categoryName: name, amount})
    }

    if (!isLoading) {
        return (
            <>
                <h1>Categories</h1>
                <Category name="Total" totalCategory={true} total={total} available={remaining} />
                {data && data.map( (category, i) => {
                   return <Category key={i} id={category.id} name={category.category_name} totalCategory={false} total={category.total} available={category.remaining} setCategory={props.setCategory}/> 
                })}
                <button 
                    className={`btn categories__btn ${isOpenForm ? 'closed' : null} ${ isHidden ? 'hidden' : null }`}
                    onClick={showAndHideForm}
                >
                {!isOpenForm ? 'Add Category' : 'X'}
                </button>
                <form 
                    className={`categories__form form ${isOpenForm ? 'open' : null} ${ isHidden ? 'hidden' : null }`}
                >
                    <label  htmlFor="categoryNameInput">Category Name
                        <input value={name} onChange={({currentTarget}) => setName(currentTarget.value)} type="text" id="categoryNameInput" disabled={isHidden} />
                    </label>
                    <label htmlFor="total">Total
                        <input value={amount} onChange={({currentTarget}) => setAmount(currentTarget.value)} type="number" id="total" disabled={isHidden} />
                    </label>
                    <button className="btn" type="button" onClick={handleClick}>ADD CATEGORY</button>
                </form>
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