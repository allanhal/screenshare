const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/emitter", (_, res) => {
  res.sendFile(__dirname + "/public/emitter.html");
});
app.get("/viewer", (_, res) => {
  res.sendFile(__dirname + "/public/viewer.html");
});
let lastData = "";
io.on("connection", (socket) => {
  socket.on("htmlUpdated", (data) => {
    if (data !== lastData) {
      socket.broadcast.emit("htmlUpdated", data);
    }
  });
});
server.listen(3000);
