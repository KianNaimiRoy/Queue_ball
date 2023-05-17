import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./QueueList.scss";
import QueueListItem from "./QueueListItem";

const QueueList = function(props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState([]);
  // const [playerName, setPLayerName] = useState('');

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      const players = response.data.players;
      setPlayers(players);
    });

    const socket = io("http://localhost:3000/");
    setSocket(socket);


    socket.on("connect", () => {
      console.log("Connected", socket.id);
      //initial send to the server
      socket.emit("test", "Hello World");
    });
    socket.on("connected_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("public", (player) => {
      console.log(`Player ${player} just joined the queque!`);
        setPlayers((prev) => [...prev, player]);
    });

    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);

  const listPlayers = players.map((player) => {
    return <QueueListItem key={player.id} id={player.id} name={player.name} />;
  });

  const joinQueue = () => {
    const playerInSession = localStorage.getItem("player-data");
    const playerName = JSON.parse(playerInSession).name;

    socket.emit("player-name", playerName);
    window.location.reload(); 
  };

  return (
    <section>
      <div className="queue-list">
        {listPlayers}
        <div className="queue-list-item">
          <button type="submit" onClick={joinQueue}>Join the Queue</button>
        </div>
      </div>
    </section>
  );
};

export default QueueList;
