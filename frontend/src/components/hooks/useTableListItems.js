import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const useTableListItem = function (props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState([]);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      setPlayers(response.data.players);
    });

    const socket = io("http://localhost:3000/");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("connected_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("enqueue", (player) => {
      setPlayers((prev) => [...prev, player]);
    });

    socket.on("dequeue", (player) => {
      setPlayers((prev) => prev.filter((p) => p.name !== player.name));
    });

    socket.on("table-update", (tables) => {
      props.updateTables(tables);
    });

    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);

  const joinQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = props.id;
    localStorage.setItem("player-data", JSON.stringify(playerObj)); // Update table_id in localStorage
    socket.emit("enqueue", playerObj);
    axios.patch("/api/players/enqueued", playerObj).then((response) => {
      socket.emit("table-update", response.data.tables);
      props.updateTables(response.data.tables);
    });
  };

  const leaveQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = null; // Update table_id in localStorage(set it to null)
    localStorage.setItem("player-data", JSON.stringify(playerObj));
    socket.emit("dequeue", playerObj);
    axios.patch("/api/players/dequeued", playerObj).then((response) => {
      socket.emit("table-update", response.data.tables);
      props.updateTables(response.data.tables);
    });
  };

  const isTableIdNull = localStorage.getItem("player-data")
    ? JSON.parse(localStorage.getItem("player-data")).table_id === null
    : false;

  //retrieve the table_id number that a player has joined
  const playerTableNumber = localStorage.getItem("player-data")
    ? JSON.parse(localStorage.getItem("player-data")).table_id
    : null;

  return { players, joinQueue, leaveQueue, isTableIdNull, playerTableNumber };
};

export default useTableListItem;
