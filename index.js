const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }
  res.type("txt").send("Not found");
});
let lastData = "";
io.on("connection", (socket) => {
  socket.on("htmlUpdated", (data) => {
    if (data !== lastData) {
      socket.broadcast.emit("htmlUpdated", data);
    }
  });
});
server.listen(80);
