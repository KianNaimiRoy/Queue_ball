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
  const [showCurrentlyIn, setShowCurrentlyIn] = useState(false);


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

  const listPlayers = players
    .filter((players) => props.focused === players.table_id)
    .map((player) => {
      return <QueueListItem key={player.id} name={player.name} />;
    });

  const joinQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = props.id;
    localStorage.setItem("player-data", JSON.stringify(playerObj)); // Update table_id in localStorage
    socket.emit("enqueue", playerObj);
    axios.patch("/api/players/enqueued", playerObj).then((response) => {
      socket.emit("table-update", response.data.tables);
      console.log('Front End joinQueue Tables: ', response.data.tables);
      props.updateTables(response.data.tables);
    });

    setShowCurrentlyIn(true);
  };

  const leaveQueue = () => {
    const playerObj = JSON.parse(localStorage.getItem("player-data"));
    playerObj.table_id = null; // Update table_id in localStorage(set it to null)
    localStorage.setItem("player-data", JSON.stringify(playerObj));
    socket.emit("dequeue", playerObj);
    axios.patch("/api/players/dequeued", playerObj)
      .then((response) => {
        socket.emit("table-update", response.data.tables);
        props.updateTables(response.data.tables);
      });
      setShowCurrentlyIn(false);
  };

  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status
  });

  const isTableIdNull = localStorage.getItem("player-data")
    ? JSON.parse(localStorage.getItem("player-data")).table_id === null
    : false;

  return (
    <div className={listClass} onClick={props.onSelect}>
      {props.focused ? (
        <section>
           {showCurrentlyIn ? (
             <h1>You are currently in {props.name}</h1>
             ) : (
              <h1>{props.name}</h1>
          )}
          {listPlayers}
          {isTableIdNull ?
            <div>
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
            </div> :
            <div>

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
            </div>}
        </section>
      ) : (
        <>
        <h1>{props.name}</h1>
        <p>{!props.status ? "Unavailable" : props.playerCount}</p>
        </>
      )}
    </div>
  );
};

export default TableListItem;
