import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Category(props) {
    const navigate = useNavigate()

    const [ percentage, setPercentage] = useState()

    useEffect( () => {
        setPercentage(props.available / props.total)
    })

    const handleClick = () => {
        props.setCategory(props.name)
        navigate("./expenses")
    }

    return (
        <div className="category" style={styles.category} onClick={handleClick}>
            <div style={styles.info}>
                <p>{props.name}</p>
                <p>{props.total}</p>
            </div>
            <div style={styles.bar}>
                <div style={styles.percentageBar, {width: `${percentage * 100}%`, backgroundColor: "#75E68B", padding: ".25em"}}>
                    <p style={styles.availableAmount}>{props.available}</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    category: {
        boxShadow: "0 0 10px 2px rgba(0, 0, 0, .5)",
        marginTop: ".5em",
        padding: ".5em"
    },
    info: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",  
    },
    bar: {
        width: "100%",
        backgroundColor: "#cdcdcd"
    },
    availableAmount: {
        textAlign: "right"
    }
}