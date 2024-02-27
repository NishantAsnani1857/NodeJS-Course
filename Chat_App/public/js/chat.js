const socket = io()
const form = document.querySelector('form')
const formButton = form.querySelector('button')
let formInput = form.querySelector('input')
const sendLoc = document.querySelector('#send-location')
const messages = document.querySelector('#messages')
const sidebar = document.querySelector('#sidebar')

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

//Options
const autoscroll = () => {
    // New message element
    const newMessage = messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = messages.offsetHeight

    // Height of messages container
    const containerHeight = messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }
}


socket.on('message', (data) => {
    const html =  //Template
        `<div class="message">
            <p>
                <span class="message__name">${data.username}</span>
                <span class="message__meta">${moment(data.createdAt).format('h:mm a')}</span>
            </p>

            <p>${data.text}</p>
        </div>`
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ users, room }) => {
    const userListHTML = users.map(user => `<li>${user.username}</li>`).join('')
    const html =
        `<h2 class="room-title">${room}</h2>
        <h3 class="list-title">Users</h3>
        <ul class="users">
            ${userListHTML}
        </ul>`
    sidebar.innerHTML = html
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    formButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message
    socket.emit("sendMessage", message.value, (error) => {
        if (error) {
            return console.error(error);
        }
        formButton.removeAttribute('disabled', 'disabled')
        formInput.value = ""
        formInput.focus()
    })

})

sendLoc.addEventListener('click', (e) => {
    e.preventDefault()
    sendLoc.setAttribute('disabled', 'disabled')
    if (!navigator.geolocation) {
        return alert("Geolocation not supported")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const positionObj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
        socket.emit("sendLocation", positionObj, () => {
            sendLoc.removeAttribute('disabled', 'disabled')
        })
    })



})


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})