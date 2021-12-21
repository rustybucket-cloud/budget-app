import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Expenses.css"

import Category from "../Categories/Category";

export default function Expenses(props) {
    const [ available, setAvailable ] = useState(0)
    const [ currentCategory, setCurrentCategory ] = useState(null)

    const categories = useSelector(state => state.categories)

    // find category object that has the same name as selected category
    useEffect(() => {
        let selected = categories.find(cat => cat.name === props.category)
        setCurrentCategory(selected) 
    }, [])

    // calculate available from each expense
    useEffect(() => {
        if (currentCategory) {
            let totalExpenses = 0
            currentCategory.expenses.forEach( expense => {
                totalExpenses += expense.type === "credit" ? expense.amount : -(expense.amount)
            }) 
            setAvailable(totalExpenses)
        }
    }, [currentCategory])

    if (currentCategory) {
        return (
            <div className="expenses">
                {/* add animation that moves expenses and returns to categories */}
                <i className="fas fa-arrow-left"></i>
                <h1>Expenses</h1>
                <Category name={currentCategory.name} total={currentCategory.total} available={available} />
                <table style={styles.table} cellSpacing="0">
                    <tr style={styles.header}>
                        <th>Date</th>
                        <th>Expense</th>
                        <th>Amount</th>
                    </tr>
                    {currentCategory.expenses.map(expense => {
                        return (
                            <tr>
                                <td style={styles.row}>{expense.date}</td>
                                <td style={styles.row}>{expense.expense}</td>
                                <td style={{color: expense.type === "credit" ? "#75E68B" : "#DE3C35", textAlign: "center", padding: ".5em"}}>{`$${expense.amount.toFixed(2)}`}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
    else return null
}

const styles = {
    table: {
        width: "100%",
        marginTop: ".5em"
    },
    row: {
        textAlign: "center",
        padding: ".5em"
    }
}