import {WebSocketServer} from 'ws';
import express from "express";

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

    if (token === 'client_token') {
      ws.type = 'client';

      ws.on('message', (data) => {
        console.error('Do not send data from client')
        ws.close();
      })
    } else if (token === 'cloudscript_token') {
      ws.type = 'cloudscript';

      ws.on('message', (data) => {
        console.log(`recieved cloudscript message ${data}`);
        wss.clients.forEach(ws => {
          if (ws.type === 'client') {
            ws.send(data);
          }
        })
      })
    } else {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  })
});

wss.on('close', () => {
  console.log('closed connection')
});
