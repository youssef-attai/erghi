import React from 'react'
import { Form, Link } from 'react-router-dom'

type ActionProps = {
    request: Request
}

export async function action({ request }: ActionProps) {
    const formData = await request.formData()

    const result = await fetch(`${import.meta.env.VITE_ERGHI_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=&username=${formData.get('username')}&password=${formData.get('password')}&scope=&client_id=&client_secret`
    })

    // TODO: Return the whole user and store the object in localStorage
    const {access_token: accessToken} = await result.json()
    console.log(accessToken);
    
    // TODO: Redirect react router to the chatting route
    return {}
}

const Login = () => {
    return (
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