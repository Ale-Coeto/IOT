const http = require('http');
const {Server} = require('socket.io');
const express = require('express');
const app = express();
const cors = require('cors');

// const client = axios.create({
//     baseURL: 'http://localhost:3001',
// })

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.broadcast.emit("mensaje", "Hola");

    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit("receive_message", data);
    })
})


server.listen(3001, () => {
    console.log('server running');
})