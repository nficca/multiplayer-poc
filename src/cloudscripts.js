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

// Simplified cloudscript definitions
const cloudscripts = {
  chat: ({ id, message }) => {
    socket.send(JSON.stringify({ event: 'chat', id, message }));
  }
}

// Initialize socket connection to multiplayer service
const socket = new WebSocket(multiplayerWs, {headers: {
  authorization: 'Bearer cloudscript_token'
}});
socket.on('open', () => {
  console.log('connected to multiplayer service');
});

// Initialize express app
const app = express();

// Handle cloudscript execute request
app.get('/execute/:script', (req, res) => {
  const script = req.params.script;
  const params = req.query;
  
  if (cloudscripts[script]) {
    console.log(`Executing script '${script}'`, params)
    const result = cloudscripts[script](params);
    res.status(200).send(result);
  } else {
    res.status(404).send({message: `No script: ${script}`});
  }
})

app.listen(port, () => {
  console.log(`server started on port ${port}`);
})
