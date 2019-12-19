function websocket (server) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {
        console.log('New user connected');
    })
}

module.exports = { websocket };