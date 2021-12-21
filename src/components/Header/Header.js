import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

export default function Header(props) {
    const handleClick = () => {
        props.setNav(!props.nav)
    }

    const handleRedirect = ({ currentTarget }) => {
        console.log(currentTarget.id)
        //navigate(`/${currentTarget.id}`)
    }

    return (
        <header style={styles.header}>
            <div style={styles.container} className={props.nav ? "slide" : "slideBack"}>
                <h1>Budget App</h1>
                <i className="fas fa-bars" style={styles.i} onClick={handleClick}></i>
            </div>
            <nav className={props.nav ? "open" : null}>
                <ul>
                    <li id="categories" className={props.active === "categories" ? "active" : null} onClick={handleClick}><Link to="/">Categories</Link></li>
                    <li id="addexpense" className={props.active === "addExpense" ? "active" : null} onClick={handleClick}><Link to="/addexpense">Add Expense</Link></li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: "#75E68B",
        color: "white",
        padding: "1em"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "960px",
        alignItems: "center",
        margin: "0 auto"
    },
    i: {
        fontSize: "24px"
    }
}