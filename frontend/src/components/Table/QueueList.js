import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./QueueList.scss";
import QueueListItem from "./QueueListItem";

const QueueList = function(props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState();

  // useEffect(() => {
  //   axios.get("/api/players").then((response) => {
  //     console.log("Response.data: ", response.data.players);
  //     setPlayers(response.data.players);
  //   });
  // }, []);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      const players = response.data.players;
      setPlayers(players);
    });

    const socket = io("http://localhost:3000/");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("connected_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    //initial send to the server
    socket.emit("test", "Hello World");

    //send list of players to the server
    socket.emit("players-list", players);
    console.log("Initial players list", players);

    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);


  // console.log("Players:", players);

  const listPlayers = players.map((player) => {
    return <QueueListItem key={player.id} id={player.id} name={player.name} />;
  });



  return <div className="queue-list">{listPlayers}</div>;
};

export default QueueList;
