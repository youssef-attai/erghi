import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'



const SignUp = () => {
    return (
        <div className="container">
            <Form className="card" method='post'>
                <input type="text" name="username" id="username" placeholder='username' />
                <input type="password" name="password" id="password" placeholder='password' />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='confirm password' />
                <button type="submit">
                    create account
                </button>
                <Link to={"/login"}>
                    already have an account? click here to login
                </Link>
            </Form>
        </div>
    )
}

export default SignUp