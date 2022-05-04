import WebSocket from 'ws';
import express from "express";

const port = process.env.PORT
const multiplayerWs = process.env.MULTIPLAYER_WS;

if (!port) {
  throw new Error('Must pass PORT');
}

if (!multiplayerWs) {
  throw new Error('Must pass MULTIPLAYER_WS');
}

const socket = new WebSocket(multiplayerWs, {headers: {
  authorization: 'Bearer cloudscript_token'
}});

socket.on('open', () => {
  console.log('connected');
});

const app = express();

const cloudscripts = {
  chat: ({ message }) => {
    console.log(`sending multiplayer message: ${message}`)
    socket.send(message);
  }
}

app.get('/execute/:script', (req, res) => {
  const script = req.params.script;
  const params = req.query;
  console.log(`recieved execture request for script ${script} with params ${params}`)
  
  if (cloudscripts[script]) {
    const result = cloudscripts[script](params);
    res.status(200).send(result);
  } else {
    res.status(404).send({message: `No script: ${script}`});
  }
})

app.listen(port, () => {
  console.log(`server started on port ${port}`);
})
