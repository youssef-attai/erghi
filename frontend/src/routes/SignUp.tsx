import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const SignUp = () => {
    const { signUp, currentUser } = useAuth()

    if (!currentUser)
    return (
        <div className="card" >
            <input type="text" name="username" id="username" placeholder='username' />
            <input type="password" name="password" id="password" placeholder='password' />
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='confirm password' />
            <button type="button" onClick={async () => {
                await signUp("youssef", "123", "123")
            }}>
                create account
            </button>
            <Link to={"/login"}>
                already have an account? click here to login
            </Link>
        </div>
    )
    else return <Navigate to={'/chat'}/>
}

export default SignUp