import { Form, Navigate, Outlet, useLoaderData } from 'react-router-dom'
import Room from '../components/Room'
import { RefreshAccessTokenFunction, useAuth } from '../contexts/AuthContext'
import User from '../models/User'


export const loader = ({ refreshAccessToken, currentUser}: { refreshAccessToken: RefreshAccessTokenFunction, currentUser: User | undefined }) => async () => {
    if (!currentUser) return await refreshAccessToken()
    else return false
}

const Chat = () => {
    const loaderData = useLoaderData()
    const { logout, currentUser } = useAuth()

    if (currentUser) return (
        <div className='chat-container'>
            <div className="card sidecard">
                <input type="search" name="q" id="q" placeholder='search' />
                <div className="contacts-area">
                    {currentUser.rooms.map((room) => (
                        <Room room={room} key={room.roomId} />
                    ))}
                </div>
                <div className="buttons-area">
                    <button type="button" onClick={async () => {
                        await logout()
                    }}>
                        logout
                    </button>
                </div>
            </div>
            <div className="card maincard">
               <Outlet />
            </div>
        </div>
    )
    else return <Navigate to={'/login'} />
}

export default Chat