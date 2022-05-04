import {WebSocketServer} from 'ws';
import express from "express";
import { setupSocket as setupClientSocket } from './clientSocket.js';
import { setupSocket as setupCloudscriptSocket } from './cloudscriptSocket.js';

const port = process.env.PORT;

if (!port) {
  throw new Error('Must pass PORT');
}

const wss = new WebSocketServer({ noServer: true });
const app = express();

const server = app.listen(port, () => {
  console.log(`started server on port ${port}`);
})

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, ws => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];

    // Handle client WS connection
    if (token === 'client_token') {
      setupClientSocket(ws, wss);
    } 
    
    // Handle Cloudscript WS connection
    else if (token === 'cloudscript_token') {
      setupCloudscriptSocket(ws, wss);
    } 
    
    // Unexpected WS request, deny
    else {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  })
});

wss.on('close', () => {
  console.log('closed connection')
});
