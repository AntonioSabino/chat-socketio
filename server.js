const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000, () => {
  console.log("Estamos online");
});

app.use(express.static(path.join(__dirname, "public")));

const connectedUsers = [];

io.on("connection", (socket) => {
  console.log("Conectado IO");

  socket.on("join-request", (username) => {
    socket.username = username;
    connectedUsers.push(username);
    console.log(connectedUsers);

    socket.emit("user-ok", connectedUsers);
  });
});
