export const setupSocket = (ws) => {
  ws.type = 'client';

  ws.on('message', (data) => {
    console.error('Do not send data from client')
    ws.close();
  });
}
