import express, { Router } from 'express';
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
// const PORT = process.env.PORT || 8080;
// const http = require("http");

export async function handler(event, context) {
  
  // const server = http.createServer(app);
  // const io = socketIo(server, {
  //   cors: {
  //     origin: "http://localhost:8080/"
  //   }
  // });
  const app = express();
  
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(cors());
  app.use(bodyParser.json());

  const playerApiRoutes = require("../../backend/routes/players-api");
  const tableApiRoutes = require("../../backend/routes/tables-api");

  app.use("/api/players", playerApiRoutes);
  app.use("/api/tables", tableApiRoutes);

  //socket io connection, front end runs on a different url
  // io.on("connection", (client) => {
  //   console.log("Client connected: ", client.id);

    // client.on("enqueue", (player) => {
    //   console.log(`Player ${player} has joined the queque`);
    //   io.emit("enqueue", player);
    // });

    // client.on("dequeue", (player) => {
    //   console.log(`Backend Dequeue Player: `, player);
    //   io.emit("dequeue", player);
    // });

    // client.on("table-update", (tables) => {
    //   io.emit("table-update", tables);
    // });

    // client.on("disconnect", (reason) => {
    //   console.log("Disconnected: ", reason);
    // });
  // });

  // server.listen(PORT, (err) => {
  //   if (err) console.log("Error message: ", err);
  //   console.log(`Server listening on port: ${PORT}`);
  // });

  return serverless(app)(event, context);
}

