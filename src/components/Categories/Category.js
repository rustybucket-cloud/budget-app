import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Category(props) {
    const navigate = useNavigate()

    const [ percentage, setPercentage] = useState()

    useEffect( () => {
        setPercentage(props.available / props.total)
    })

    const handleClick = () => {
        if (!props.totalCategory) {
            props.setCategory(props.name)
            navigate("./expenses") 
        }
    }

    return (
        <div className="category" style={styles.category} onClick={handleClick}>
            <div style={styles.info}>
                <p>{props.name}</p>
                <p>{props.total}</p>
            </div>
            <div style={styles.bar}>
                {
                // if percentage is greater than 0 color is green, else it is red 
                }
                <div style={styles.percentageBar, {width: `${percentage * 100}%`, backgroundColor: percentage * 100 > 0 ? "#75E68B" : "#DE3C35", padding: ".25em"}}>
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
        padding: ".5em",
        backgroundColor: "#4CC2BC"
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