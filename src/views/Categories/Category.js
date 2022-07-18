/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@mui/material"
import styles from "./Catetgories.style"
import { useTheme } from "@mui/material"
import { jsx } from "@emotion/react"
import { useFormatCurrency } from "../../hooks"

export default function Category({ available, total, totalCategory, name, setCategory }) {
    const navigate = useNavigate()
    const theme = useTheme()
    const format = useFormatCurrency()

    const [ percentage, setPercentage] = useState()

    useEffect( () => {
        setPercentage(available / total)
    }, [setPercentage, available, total])

    const handleClick = () => {
        if (!totalCategory) {
            setCategory(name)
            navigate(`./expenses/${name}`) 
        }
    }

    return percentage ?  (
        <Card onClick={handleClick} style={{width: "100%"}}>
            <div css={styles.info({ spacer: theme.spacing(2) })}>
                <span>{name}</span>
                <span>{format(total)}</span>
            </div>
            <div css={styles.bar}>
                <div 
                    css={styles.availableBar({ 
                        percentage, 
                        spacer: theme.spacing(2), 
                        color: { green: theme.palette.primary.light, red: theme.palette.red.main } 
                    })}>
                    <p css={styles.availableAmount}>{format(available)}</p>
                </div>
            </div>
        </Card>
    ) : null
}
