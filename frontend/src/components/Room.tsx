import { Link } from 'react-router-dom'
import UserRoom from '../models/Room'

type RoomProps = {
    room: UserRoom
}

const Room = ({ room: { roomName, members, roomId } }: RoomProps) => {
  return (
    <Link to={`/chat/${roomId}`} className='card room-card'>
        {roomName}
    </Link>
  )
}

export default Room