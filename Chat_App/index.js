const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const socketIo = require('socket.io')
const io = socketIo(server)
const Filter = require('bad-words')
const { generateMessage, generateLocation } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')





app.use(express.static(path.join(__dirname, '../public')))




io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message', generateMessage('Admin','Welcome')) //Emit to that particular user
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined`)) //Emit to that every user in room

        io.to(user.room).emit('roomData', {
            users: getUsersInRoom(user.room),
            room: user.room,
        })
        callback()
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        if (user) {
            const filter = new Filter();
            if (filter.isProfane(message)) {
                return callback('Profanity is not allowed');
            }
            io.to(user.room).emit('message', generateMessage(user.username,message)); // Emit to everyone in the room
            callback();
        }
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData', {
                users: getUsersInRoom(user.room),
                room: user.room
            })
        }
    })

    socket.on('sendLocation', (data, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message",
            generateMessage(user.username,`<a class="message" href=https://google.com/maps?q=${data.latitude},${data.longitude}> My current Location</a>`))
        callback()
    })

})


server.listen(3000, () => {
    console.log('Listening to port 3000');
})