import {WebSocketServer} from 'ws';

const port = process.env.PORT;

if (!port) {
  throw new Error('Must pass PORT');
}

const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  console.log('connection', ws)

  ws.on('message', (data) => {
    console.log('received: %s', data);
  });
});

wss.on('close', () => {
  console.log('close')
});
