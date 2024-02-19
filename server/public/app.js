
const socket = new io('ws://localhost:3500')

//This line creates a new WebSocket object and establishes a connection to the WebSocket server running on localhost (ws://localhost:3000).
function sendMessage(e){
    e.preventDefault()
    const input =  document.querySelector('input')
    if(input.value){
        socket.emit('message',input.value)
        input.value = ""
    }
    input.focus()
}

document.querySelector('form').addEventListener('submit',sendMessage)

// Listen for messages
socket.on('message',(data)=>{
    const li = document.createElement('li') 
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})
//This code sets up an event listener for the 'message' event on the WebSocket object. When a message is received from the server, it creates a new list item (<li>) element, sets its text content to the received message, and appends it to an unordered list (<ul>) in the HTML document.