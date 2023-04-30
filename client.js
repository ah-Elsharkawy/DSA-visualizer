const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server!');
  
  // Send a message to the server
  socket.emit('chat message', 'Hello, server!');
  

});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('chat message', (msg) => {
  console.log(msg);

});

socket.emit('selectionSort', [5,4,3,2,1]);
socket.emit('bubbleSort', [5,4,3,2,1]);
socket.emit('insertionSort', [5,4,3,2,1]);
socket.emit('mergeSort', [5,4,3,2,1]);
