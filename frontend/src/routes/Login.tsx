import { useRef } from 'react'
import { Link, Navigate, useNavigation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const { login, currentUser } = useAuth()
    const naviagtion = useNavigation()

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    console.log(naviagtion.state);

    if (!currentUser)
    return (
        // navigation.state !== 'submitting' &&
        <div className="card" >
            <input type="text" ref={usernameRef} name="username" id="username" placeholder='username' />
            <input type="password" ref={passwordRef} name="password" id="password" placeholder='password' />
            <button type="button" onClick={async () => {
                await login(usernameRef.current!.value, passwordRef.current!.value)
            }}>
                login
            </button>
            <Link to={"/signup"}>
                click here to create an account
            </Link>
        </div>
    )
    else return <Navigate to={'/chat'}/>
}

export default Login