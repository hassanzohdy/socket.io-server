import { SocketClients, socketClientEvents } from "app/sockets";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const socketClients = new SocketClients();

io.on("connection", socket => {
  socketClients.add(socket);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

socketClientEvents.onConnect(() => {
  console.log("client connected");
});
