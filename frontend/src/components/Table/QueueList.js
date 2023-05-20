import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import QueueListItem from "./QueueListItem";

const QueueList = function(props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState([]);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      const players = response.data.players;
      setPlayers(players);
      // console.log('State of Players: ', players)
    });

    const socket = io("http://localhost:3000/");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("connected_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("public", (player) => {
      console.log(`Player ${player} just joined the queue!`);
      setPlayers((prev) => [...prev, player]);
    });
    
    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);
  
  useEffect(() => {
    //render listPlayers?
  console.log("players updated: ", players)
  }, [players])

  const listPlayers = players.map((player) => {
    return <QueueListItem key={player.id} id={player.id} name={player.name} />;
  });

  const joinQueue = () => {
    const playerInSession = localStorage.getItem("player-data");
    const playerName = JSON.parse(playerInSession);
    
    socket.emit("player-name", playerName);
  };

  return (
    <section>
      <div className="queue-list">
        <>{listPlayers}</>
        <h1>
          <button type="submit" onClick={joinQueue}>Join the Queue</button>
        </h1>
      </div>
    </section>
  );
};

export default QueueList;
