import { useState, useEffect } from "react";
import axios from "axios";

import "./QueueList.scss";
import QueueListItem from "./QueueListItem";

const QueueList = function (props) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      console.log("Response.data: ", response.data.players);
      setPlayers(response.data.players);
    });
  }, []);

  console.log("Players:", players);

  const listPlayers = players.map((player) => {
    return <QueueListItem key={player.id} id={player.id} name={player.name} />;
  });

  return <div className="queue-list">{listPlayers}</div>;
};

export default QueueList;
