import { useEffect, useState } from "react";
import "./Expenses.css"

import Category from "../Categories/Category";

export default function Expenses(props) {
    const [ category, setCategory ] = useState(null)
    const [ available, setAvailable ] = useState(0)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('./categoryexpenses', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({category: props.category})
                })
                const data = await response.json()
                setCategory(data)

                let availableLeft = 0
                data.expenses.forEach( expense => {
                    availableLeft += expense.type === "credit" ? expense.amount : -expense.amount
                })
                setAvailable(availableLeft)
            }
            catch(err) {
                console.error(err)
            }
        }
        getData()
    }, [])

    if (category) {
        return (
            <div className="expenses">
                <h1>Expenses</h1>
                <Category name={category.name} total={category.total} available={available} />
                <table style={styles.table} cellSpacing="0">
                    <tr style={styles.header}>
                        <th>Date</th>
                        <th>Expense</th>
                        <th>Amount</th>
                    </tr>
                    {category.expenses.map(expense => {
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