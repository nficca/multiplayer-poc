import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
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

server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  proxy.ws(req, socket, head);
});
