import WebSocket from 'ws';
import fetch from 'node-fetch';

const multiplayerWs = process.env.MULTIPLAYER_WS;
const cloudscriptsHost = process.env.CLOUDSCRIPTS_HOST;

if (!multiplayerWs) {
  throw new Error('Must pass MULTIPLAYER_WS');
}

if (!cloudscriptsHost) {
  throw new Error('Must pass CLOUDSCRIPTS_HOST');
}

setInterval(() => {
  console.log('requesting cloudscripts/execute/chat');
  fetch(`${cloudscriptsHost}/execute/chat?message=Hello`);
}, 5000);

const socket = new WebSocket(multiplayerWs, {headers: {
  authorization: 'Bearer client_token'
}});

socket.on('open', () => {
  console.log('connected');
});

socket.on('message', (data) => {
  console.log('recieved multiplayer message: ', data);
});
