require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  path: "/api/socket",
  cors: {
    origin: "http://192.53.120.128:3000"
  }
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

const playerApiRoutes = require("./routes/players-api");
const tableApiRoutes = require("./routes/tables-api");

app.use("/api/players", playerApiRoutes);
app.use("/api/tables", tableApiRoutes);

//socket io connection, front end runs on a different url
io.on("connection", (client) => {
  console.log("Client connected: ", client.id);

  client.on("enqueue", (player) => {
    io.emit("enqueue", player);
  });

  client.on("dequeue", (player) => {
    io.emit("dequeue", player);
  });

  client.on("table-update", (tables) => {
    io.emit("table-update", tables);
  });

  client.on("disconnect", (reason) => {
    console.log("Disconnected: ", reason);
  });
});

server.listen(PORT, (err) => {
  if (err) console.log("Error message: ", err);
  console.log(`Server listening on port: ${PORT}`);
});
