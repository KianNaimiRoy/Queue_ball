import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import classNames from "classnames";
import QueueListItem from "./Table/QueueListItem";
import Button from "./Button";
import "./Table/QueueList.scss";

const TableListItem = function(props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState([]);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      console.log("Response.data: ", response.data.players);
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

    socket.on("public", (player) => {
      console.log(`Player ${player.name} just joined the queue!`);
      setPlayers((prev) => [...prev, player]);
    });

    socket.on("dequeue", (player) => {
      console.log(`Player ${player.name} has left the queue!`);
      setPlayers((prev) => prev.filter((p) => p.name !== player.name));
    });

    socket.on("table-update", (tables) => {
      props.updateTables(tables);
    });

    //clean up  to prevent memory leak
    return () => socket.disconnect();
  }, []);

  const listPlayers = players
    .filter((players) => props.focused === players.table_id)
    .map((player) => {
      return <QueueListItem key={player.id} name={player.name} />;
    });

  const joinQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = props.id;
    localStorage.setItem("player-data", JSON.stringify(playerObj)); // Update table_id in localStorage
    socket.emit("player-name", playerObj);
    axios.patch("/api/players/enqueued", playerObj).then((response) => {
      socket.emit("table-count", response.data.count);
      props.updateTables(response.data.count);
    });
  };

  const leaveQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = null; // Update table_id in localStorage(set it to null)
    socket.emit("dequeue", playerObj);
    axios.patch("/api/players/dequeued", playerObj).then((response) => {
      socket.emit("table-count", response.data.count);
      props.updateTables(response.data.count);
      localStorage.setItem("player-data", JSON.stringify(playerObj));
    });
  };

  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status
  });
  
const isTableIdNull = localStorage.getItem("player-data") 
? JSON.parse(localStorage.getItem("player-data")).table_id === null 
: false;

  return (
    <div className={listClass} onClick={props.onSelect}>
      <h1>Table {props.id}</h1>
      {props.focused ? (
        <>
          {listPlayers}
          {isTableIdNull ?
            <h1>
              <Button className="join"
              join
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  joinQueue();
                }}
              >
                Join the Queue
              </Button>
            </h1> :
            <h1>
              <Button className="leave"
              leave
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  leaveQueue();
                }}
              >
                Leave the Queue
              </Button>
            </h1>}
        </>
      ) : (
        <p>{!props.status ? "Unavailable" : props.count}</p>
      )}
    </div>
  );
};

export default TableListItem;
