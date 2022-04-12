import "./AddExpense.scss"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import addExpense from "../../redux/actions/addExpense"

export default function AddExpense(props) {
    const categoriesState = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const [ categoryList, setCategoryList ] = useState(null)
    const [ selectedCategory, setSelectedCategory ] = useState(null)
    const [ expenseType, setExpenseType ] = useState(null)
    const [ expenseName, setExpenseName ] = useState(null)
    const [ expenseAmount, setExpenseAmount ] = useState(null)
    const [ expenseDate, setExpenseDate ] = useState(null)

    useEffect(() => {
        setCategoryList(categoriesState)
        props.setActive("addExpense") // sets nav wayfinding
    })

    // sets state values
    const handleChange = ({currentTarget}) => {
        switch(currentTarget.id) {
            case "add-expense-category":
                setSelectedCategory(currentTarget.value)
                break
            case "add-expense-type":
                setExpenseType(currentTarget.value)
                break
            case "add-expense-name":
                setExpenseName(currentTarget.value)
                break
            case "add-expense-amount":
                setExpenseAmount(currentTarget.value)
                break
            case "add-expense-date":
                // get user input, change it to string
                const dateToSet = new Date(currentTarget.value)
                const dateToSend = `${dateToSet.getMonth() + 1}/${dateToSet.getDate() + 1}/${dateToSet.getFullYear()}`
                setExpenseDate(dateToSend)
                break
            default:
                console.error("Error in add expense handle change")
        }
    }

    // add expense to redux, create an object with info
    const handleClick = () => {
        dispatch(addExpense({category: selectedCategory, expense: expenseName, date: expenseDate, type: expenseType, amount: parseFloat(expenseAmount)}))
        // reset inputs
        setSelectedCategory("select one")
        setExpenseDate("")
        setExpenseType("select one")
        setExpenseName("")
        setExpenseAmount("")
    }

    if (categoryList) {
        return (
                <form className="AddExpense">
                    <h1>Add Exppense</h1>
                    <label>Category
                        <select id="add-expense-category" onChange={handleChange} value={selectedCategory}>
                            <option value="select one">Select One</option>
                            {categoriesState.map( category => {
                                return <option>{category.name}</option>
                            })}
                        </select>
                    </label>
                    <label>Date
                        <input type="date" id="add-expense-date"  onChange={handleChange} />
                    </label>
                    <label>Expense Type
                        <select id="add-expense-type" onChange={handleChange} value={expenseType}>
                            <option value="select one">Select One</option>
                            <option value="debit">Expense</option>
                            <option value="credit">Income</option>
                        </select>
                    </label>
                    <label>Expense Name
                        <input id="add-expense-name" onChange={handleChange} value={expenseName}/>
                    </label>
                    <label>Expense Amount
                            <input type="number" id="add-expense-amount" onChange={handleChange} value={expenseAmount}/>
                    </label>
                    <button onClick={handleClick}>Add Expense</button>
                </form>
        )
    }
    else return null
}