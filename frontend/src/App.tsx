import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import Root from './Root'
import Login, { action as loginAction } from './routes/Login'
import SignUp from './routes/SignUp'


const App = () => {
    // TODO: get the sign up function
    const { login } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                    action: loginAction({ login })
                },
                {
                    path: "signup",
                    element: <SignUp />
                    // TODO: Add signup action handler that takes the axios signup function
                }
                // TODO: Create and add the chatting route. Make it protected by redirecting to login if no user is stored in localStorage 
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App