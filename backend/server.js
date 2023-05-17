require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080/"
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
  const socketID = client.id;

  //initial data received from client
  client.on("test", (data) => {
    console.log(data);
  });

  client.on("player-name", (player) => {
    console.log(`Player ${player} has joined the queque`);
    io.emit("public", player);
  });

  client.on("disconnect", (reason) => {
    console.log("Disconnected: ", reason);
  });
});



server.listen(PORT, (err) => {
  if (err) console.log('Error message: ', err);
  console.log(`Server listening on port: ${PORT}`);
});
