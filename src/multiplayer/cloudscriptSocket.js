export const setupSocket = (ws, wss) => {
  ws.type = 'cloudscript';

  ws.on('message', (data) => {
    console.log(`recieved cloudscript message ${data}`);
    wss.clients.forEach(ws => {
      if (ws.type === 'client') {
        ws.send(data);
      }
    })
  });
}
