import Room from './models/Room.js';

export default function handleSocketConnections(io) {
    io.on('connection', async (socket) => {
        const rooms = await Room.find({ users: socket.handshake.query.userId }, { _id: 1 }); 

        console.log('[CONNECTED]   ', socket.id);

        rooms.forEach(room => {
            socket.join(room._id.toString());
        });

        socket.on('message', (data) => {
            console.log(socket.id, ':', data);

            const room = data.room;
            io.to(room).emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('[DISCONNECTED]', socket.id);
        });
    });
}