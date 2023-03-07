export default function setupSocketIO(io) {
    io.on('connection', (socket) => {
        const username = socket.handshake.query.username;

        console.log('[CONNECTED]   ', username, socket.id);

        socket.on('message', (data) => {
            console.log(username, socket.id, ':', data);
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('[DISCONNECTED]', username, socket.id);
        });
    });

}