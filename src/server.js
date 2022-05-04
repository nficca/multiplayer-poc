import {WebSocketServer} from 'ws';

const port = process.env.PORT;

if (!port) {
  throw new Error('Must pass PORT');
}

const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws) {
  console.log('connection', ws)
});

wss.on('close', function close() {
  console.log('close')
});
