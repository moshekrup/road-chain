import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:9000');
// function subscribeToEvent(cb) {
//   socket.on('message', message => cb(null, message));
//   socket.emit('subscribeToEvent', 1000);
// }
export { socket };