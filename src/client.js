import WebSocket from 'ws';
import HttpsProxyAgent from 'https-proxy-agent';

const proxyAddress = process.env.PROXY_ADDRESS;
// const wssAddress = process.env.WSS_ADDRESS;

if (!proxyAddress) {
  throw new Error('Must pass PROXY');
}

// if (!wssAddress) {
//   throw new Error('Must pass WSS_ADDRESS');
// }

// // create an instance of the `HttpsProxyAgent` class with the proxy server information
// const agent = new HttpsProxyAgent(proxyAddress);

// finally, initiate the WebSocket connection
const socket = new WebSocket(proxyAddress);

socket.on('open', function () {
  console.log('"open" event!');
  socket.send('hello world');
});

socket.on('message', function (data, flags) {
  console.log('"message" event! %j %j', data, flags);
  socket.close();
});
