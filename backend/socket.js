import Room from './models/Room.js';

export default function setupSocketIO(io) {
    io.on('connection', async (socket) => {
        const username = socket.handshake.query.username;
        const rooms = await Room.find({ users: socket.handshake.query.userId }, { _id: 1 }); 

        console.log('[CONNECTED]   ', username, socket.id);

        rooms.forEach(room => {
            socket.join(room._id.toString());
        });

        socket.on('message', (data) => {
            console.log(username, socket.id, ':', data);

            const room = data.room;
            io.to(room).emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('[DISCONNECTED]', username, socket.id);
        });
    });
}