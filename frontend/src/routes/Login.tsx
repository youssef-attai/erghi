import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { LoginProps } from '../contexts/AuthContext'


type ActionProps = {
    request: Request
}

// TIL: Apparently you can not use react hooks here in action handlers...
export const action = ({ login }: LoginProps) => async ({ request }: ActionProps) => {
    // TODO: Handle errors

    const formData = await request.formData()
    
    const username: string = formData.get('username')?.toString()!
    const password: string = formData.get('password')?.toString()!

    await login(username, password)

    return redirect("/chat")
}

const Login = () => {
    // TODO: useAuth, if already authenticated then redirect to /chat
        // TODO: In /chat, useAuth, if not authenticated redirect to here, /login

    // TODO: Display some kind of loading what navigation.state === submitting
    // const navigation = useNavigation()

    return (
        // navigation.state !== 'submitting' &&
        <div className="container">
            <Form className="card" method='post'>
                <input type="text" name="username" id="username" placeholder='username' />
                <input type="password" name="password" id="password" placeholder='password' />
                <button type="submit">
                    login
                </button>
                <Link to={"/signup"}>
                    don't have an account? click here to create one
                </Link>
            </Form>
        </div>
    )
}

export default Login