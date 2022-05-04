import WebSocket from 'ws';

const proxyAddress = process.env.PROXY_ADDRESS;

if (!proxyAddress) {
  throw new Error('Must pass PROXY');
}

const socket = new WebSocket(proxyAddress);

socket.on('open', () => {
  console.log('opened');
  socket.send('hello');
});

socket.on('message', (data, flags) => {
  console.log('recieved message', data, flags);
});
