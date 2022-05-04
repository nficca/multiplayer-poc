import express from "express";
import httpProxy from "http-proxy";

const port = process.env.PORT
const wss = process.env.WSS

if (!port) {
  throw new Error('Must pass PORT');
}

if (!wss) {
  throw new Error('Must pass WSS');
}

const app = express();
const proxy = httpProxy.createProxyServer({ ws: true, target: wss });

app.use((req, res, next) => {
  console.log(req.headers);
  console.log(req.method);
  next()
})

const server = app.listen(port, () => {
  console.log(`proxy server started on ${port}`);
})

server.on('upgrade', (req, socket, head) => {
  console.log('req', req);
  console.log('socket', socket);
  console.log('head', head);
  
  proxy.ws(req, socket, head);
});
