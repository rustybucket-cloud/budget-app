/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react"
import LinkButton from "../LinkButton"
import styles from "./Header.style"
import { jsx } from "@emotion/react"
import { useTheme, IconButton } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useLocation } from "react-router-dom"

export default function Header() {
    const theme = useTheme()
    const { pathname } = useLocation()
    const [active, setActive] = useState(null)

    useEffect(() => {
        if (pathname.includes('addexpense')) setActive('addexpense')
        else setActive('categories')
    }, [])

    return (
        <div className="header-container">
            <header css={styles.header(theme.breakpoints.values.xl, theme.spacing(4))}>
                <h1>Budget App</h1>
                <IconButton aria-label="menu" css={styles.menuButton(theme.breakpoints.down('md'))}>
                    <Menu />
                </IconButton>
                <nav css={styles.nav(theme.breakpoints.up('md'))}>
                    <ul css={styles.ul}>
                        <li><LinkButton path="/" color={active === "categories" ? "accent" : "black"}>Categories</LinkButton></li>
                        <li><LinkButton path="/addexpense" color={active === "addexpense" ? "accent" : "black"}>Add Expense</LinkButton></li>
                        <li><LinkButton path="/" color={active === "profile" ? "accent" : "black"}>Profile</LinkButton></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
