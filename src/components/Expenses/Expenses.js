import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./Expenses.css"
import Category from "../Categories/Category";
import useExpenses from "../../hooks/useExpenses";

export default function Expenses(props) {
    const { name } = useParams()
    const { data, isLoading } = useExpenses('expenses', name)

    if (!isLoading) {
        return (
            <div className="expenses">
                {/* add animation that moves expenses and returns to categories */}
                <Link to="/"><i className="fas fa-arrow-left"></i></Link>
                <h1>Expenses</h1>
                {data && <Category name={name} total={data.total} available={data.remaining} />}
                <table style={styles.table} cellSpacing="0">
                    <thead>
                        <tr style={styles.header}>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data.expenses.map((expense, i) => {
                        const date = new Date(expense.date)
                        const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
                        return (
                            <tr key={i}>
                                <td style={styles.row}>{expense.expense_name}</td>
                                <td style={styles.row}>{dateString}</td>
                                <td style={{color: expense.amount < 0 ? "#1D4A21" : "#DE3C35", textAlign: "center", padding: ".5em"}}>{`$${expense.amount.toFixed(2)}`}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <>
                <h1>Expenses</h1>
                <p>Loading...</p>
            </>
        )
    }
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