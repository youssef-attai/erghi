import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import Root, { logoutAction } from './Root'
import Chat, { loader as chatLoader } from './routes/Chat'
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
                {
                    path: 'chat',
                    element: <ProtectedRoute><Chat /></ProtectedRoute>,
                    children: [
                        {
                            path: ':roomId',
                            element: (
                                // Chat room
                                <>
                                    <div className="messages-area"></div>
                                    <input type="text" name="message" id="messsage" placeholder='type your message here' />
                                </>
                            )
                        }
                    ]
                },
                {
                    path: 'logout',
                    action: logoutAction({ logout })
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default App