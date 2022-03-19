import "./Profile.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../contexts/Auth"

export default function Signup() {
    const [ error, setError] = useState(null)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const { signUpUser } = useAuth()

    const handleChange = ({currentTarget}) => {
        const id = currentTarget.id
        if (id === "signup-email") setEmail(currentTarget.value)
        else if (id === "signup-password") setPassword(currentTarget.value)
        else if (id === "signup-confirm-password") setConfirmPassword(currentTarget.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit')
        if (password !== confirmPassword) {
            setError('Username and password don\'t match.')
            return
        }
        let user
        try {
            user = await signUpUser(email, password)
        } catch (err) {
            console.error(err)
        } finally {
            console.log(user)
        }
    }


    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Email
                    <input id="signup-email" value={email} onChange={handleChange}/>
                </label>
                <label>Password
                    <input type="password" id="signup-password"  value={password} onChange={handleChange}/>
                </label>
                <label>Confirm Password
                    <input type="password" id="signup-confirm-password" value={confirmPassword} onChange={handleChange}/>
                </label>
                <button>Sign Up</button>
            </form>
            <Link to="/login"><p>Already have an account?</p></Link>
        </div>
    )
}