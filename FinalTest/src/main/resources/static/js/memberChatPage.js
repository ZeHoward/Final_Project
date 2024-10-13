window.onload = () => {
console.log('aaaa');
let socket = new WebSocket("ws://localhost:8080/messageChat");

socket.onmessage = function(event) {
    var chatbox = document.getElementById('chatbox');
    var message = document.createElement('p');
    message.innerText = event.data;
    chatbox.appendChild(message);
};

/*
function sendMessage() {
    var input = document.getElementById('messageInput');
    socket.send("[Page 2] " + input.value);
    input.value = '';
}*/

document.getElementById('sendMessage').addEventListener('click', () => {
	console.log('點擊sendMessage');
	var input = document.getElementById('messageInput');
	console.log('input:' + input.value);
    socket.send("[Page 2] " + input.value);
    input.value = '';
	
})
}