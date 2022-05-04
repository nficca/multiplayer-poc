export const setupSocket = (ws, wss) => {
  ws.type = 'cloudscript';

  ws.on('message', (data) => {
    console.log(`recieved cloudscript message ${data}`);
    const parsed = JSON.parse(data);

    switch (parsed.event) {
      case "chat":
        wss.clients.forEach(client => {
          if (client.type === 'client' && client.id !== parsed.id) {
            client.send(JSON.stringify({
              message: `[${ws.id}] ${parsed.message}`
            }));
          }
        })
        break;
      default:
        console.error('Unknown event', parsed.event)
        break;
    }
  });
}
