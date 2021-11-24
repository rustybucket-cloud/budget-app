import "./Header.css"
import { useState } from 'react'

export default function Header(props) {
    const handleClick = () => {
        props.setNav(!props.nav)
    }

    return (
        <header style={styles.header}>
            <div style={styles.container} className={props.nav ? "slide" : "slideBack"}>
                <h1>Budget App</h1>
                <i className="fas fa-bars" style={styles.i} onClick={handleClick}></i>
            </div>
            <nav className={props.nav ? "open" : null}>
                <ul>
                    <li>Categories</li>
                    <li>Add Expense</li>
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