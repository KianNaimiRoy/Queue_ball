import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./QueueList.scss";
import QueueListItem from "./QueueListItem";
import Form from "../UsernamePrompt/Form";

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
      const players = response.data.players
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


    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);

  const listPlayers = players.map((player) => {
    return <QueueListItem key={player.id} id={player.id} name={player.name} />;
  });

  const joinQueue = () => {
    socket.emit("player-name", players[3].name)
  }

  return (
    <section>
      {/* <div className="queue-list">
        {listPlayers}
      </div> */}
      <div>
        <button type="submit" className="player-name-input" onClick={joinQueue}>Join the Queue</button>
      </div>
    </section>
  );
};

export default QueueList;
