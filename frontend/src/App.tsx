import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import Root, { logoutAction } from './Root'
import Root from './Root'
import Login from './routes/Login'
import SignUp from './routes/SignUp'


const App = () => {
    const { refreshAccessToken, currentUser, logout} = useAuth()

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            // loader: chatLoader({ refreshAccessToken, currentUser }),
            children: [
                {
                    index: true,
                    element: currentUser ? <Navigate to={'/chat'} /> : <Navigate to={'/login'} />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'signup',
                    element: <SignUp />
                },
                }
                // TODO: Create and add the chatting route. Make it protected by redirecting to login if no user is stored in localStorage 
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default App