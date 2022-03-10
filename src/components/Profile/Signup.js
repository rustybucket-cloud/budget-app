import "./Profile.css"
import { Link } from "react-router-dom"

export default function Signup() {
    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form>
                <label>Username
                    <input />
                </label>
                <label>Email
                    <input />
                </label>
                <label>Password
                    <input type="password" />
                </label>
                <button>Sign Up</button>
            </form>
            <Link to="/login"><p>Already have an account?</p></Link>
        </div>
    )
}