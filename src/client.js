import WebSocket from 'ws';
import fetch from 'node-fetch';

const multiplayerWs = process.env.MULTIPLAYER_WS;
const cloudscriptsHost = process.env.CLOUDSCRIPTS_HOST;
const message = process.env.MESSAGE || 'hello';
const silent = process.env.SILENT === 'true';
let id = 'unknown';

if (!multiplayerWs) {
  throw new Error('Must pass MULTIPLAYER_WS');
}

if (!cloudscriptsHost) {
  throw new Error('Must pass CLOUDSCRIPTS_HOST');
}

// Initialize socket connection to multiplayer service
const socket = new WebSocket(multiplayerWs, {headers: {
  authorization: 'Bearer client_token'
}});
socket.on('open', () => {
  console.log('connected');
});
socket.on('message', (data) => {
  const parsed = JSON.parse(data.toString());

  if (parsed.id) {
    id = parsed.id;
  } else {
    console.log(parsed.message);
  }
});

// Make cloudscript execute requests on a loop
if (!silent) {
  setInterval(() => {
    // console.log('requesting cloudscripts/execute/chat', message);
    fetch(`${cloudscriptsHost}/execute/chat?id=${id}&message=${message}`);
  }, 2500);
}
