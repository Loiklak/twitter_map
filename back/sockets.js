const server = "localhost:5000"
const io = require("socket.io")(server);

io.on('connection', (socket) => {
    console.log('New user connected'); //On envoie le hashtag pour qu'il soit envoyé au front
    io.emit('message', 'Bienvenue dans le back huehue')
})

const socket = {
    io: io,
    sendMessage: function(message) {
        this.io.emit('message', message)
    }
}

module.exports = { socket };