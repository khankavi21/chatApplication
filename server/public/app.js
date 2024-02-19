
const socket = new io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput =  document.querySelector('input')

//This line creates a new WebSocket object and establishes a connection to the WebSocket server running on localhost (ws://localhost:3000).
function sendMessage(e){
    e.preventDefault()
    
    if(msgInput.value){
        socket.emit('message',msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()
}

document.querySelector('form').addEventListener('submit',sendMessage)

// Listen for messages
socket.on('message',(data)=>{
    activity.textContent = ""
    const li = document.createElement('li') 
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})
//This code sets up an event listener for the 'message' event on the WebSocket object. When a message is received from the server, it creates a new list item (<li>) element, sets its text content to the received message, and appends it to an unordered list (<ul>) in the HTML document.

msgInput.addEventListener('keypress',()=>{
    socket.emit('activity', socket.id.substring(0,5))
})

let activityTimer
socket.on('activity',(name)=>{
    activity.textContent = `${name} is typing...`
  
    // clear after 3 seconds
    clearTimeout(activityTimer)
    activityTimer = setTimeout(()=>{
        activity.textContent = ""
    },1000)
})