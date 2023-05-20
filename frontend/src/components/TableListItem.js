// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
import classNames from "classnames";
import QueueListItem from "./Table/QueueListItem";
import Button from "./Button";
import "./TableListItem.scss";
import useTableListItem from "./hooks/useTableListItems";
const TableListItem = function (props) {
  const { players, joinQueue, leaveQueue, isTableIdNull, playerTableNumber } =
    useTableListItem(props);

  // const [players, setPlayers] = useState([]);
  // const [socket, setSocket] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/players").then((response) => {
  //     setPlayers(response.data.players);
  //   });

  //   const socket = io("http://localhost:3000/");
  //   setSocket(socket);

  //   socket.on("connect", () => {
  //     console.log("Connected", socket.id);
  //   });
  //   socket.on("connected_error", () => {
  //     setTimeout(() => socket.connect(), 5000);
  //   });

  //   socket.on("enqueue", (player) => {
  //     setPlayers((prev) => [...prev, player]);
  //   });

  //   socket.on("dequeue", (player) => {
  //     setPlayers((prev) => prev.filter((p) => p.name !== player.name));
  //   });

  //   socket.on("table-update", (tables) => {
  //     props.updateTables(tables);
  //   });

  //   //clean up  to prevent memory leak
  //   return () => socket.disconnect();
  // }, []);

  const listPlayers = players.filter(
    (players) => props.focused === players.table_id
  );

  const firstPlayer =
    listPlayers.length > 0 ? (
      <QueueListItem
        key={listPlayers[0].id}
        name={listPlayers[0].name}
        className="player first-player"
      />
    ) : null;

  const secondPlayer =
    listPlayers.length > 1 ? (
      <QueueListItem
        key={listPlayers[1].id}
        name={listPlayers[1].name}
        className="player second-player"
      />
    ) : null;

  const remainingPlayers = listPlayers.length > 2 ? listPlayers.slice(2) : [];
  const remainingPlayerItems = remainingPlayers.map((player) => (
    <QueueListItem key={player.id} name={player.name} />
  ));

  // const joinQueue = () => {
  //   const playerObj = JSON.parse(localStorage.getItem("player-data"));
  //   playerObj.table_id = props.id;
  //   localStorage.setItem("player-data", JSON.stringify(playerObj)); // Update table_id in localStorage
  //   socket.emit("enqueue", playerObj);
  //   axios.patch("/api/players/enqueued", playerObj).then((response) => {
  //     socket.emit("table-update", response.data.tables);
  //     props.updateTables(response.data.tables);
  //   });
  // };

  // const leaveQueue = () => {
  //   const playerObj = JSON.parse(localStorage.getItem("player-data"));
  //   playerObj.table_id = null; // Update table_id in localStorage(set it to null)
  //   localStorage.setItem("player-data", JSON.stringify(playerObj));
  //   socket.emit("dequeue", playerObj);
  //   axios.patch("/api/players/dequeued", playerObj).then((response) => {
  //     socket.emit("table-update", response.data.tables);
  //     props.updateTables(response.data.tables);
  //   });
  // };

  // const isTableIdNull = localStorage.getItem("player-data")
  // ? JSON.parse(localStorage.getItem("player-data")).table_id === null
  // : false;

  // //retrieve the table_id number that a player has joined
  // const playerTableNumber = localStorage.getItem("player-data")
  // ? JSON.parse(localStorage.getItem("player-data")).table_id
  // : null;

  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status
  });

  return (
    <div className={listClass} onClick={props.onSelect}>
      {props.focused ? (
        <>
          <h1>{props.name}</h1>
          <div className="current-match">
            {firstPlayer}
            {secondPlayer}
          </div>
          {remainingPlayerItems}
          {isTableIdNull ? (
            <div>
              <Button
                className="join"
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
            </div>
          ) : (
            <div>
              {props.id !== playerTableNumber && (
                <h1>You are currently enqueued in Table {playerTableNumber}</h1>
              )}
              {props.id === playerTableNumber && ( // check the table id and only render leave the queue button for that table
                <Button
                  leave
                  className="leave"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    leaveQueue();
                  }}
                >
                  Leave the Queue
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <h1>{props.name}</h1>
          <h3>Current Players in the Queue</h3>
          <p>{!props.status ? "Unavailable" : props.playerCount}</p>
        </>
      )}
    </div>
  );
};

export default TableListItem;
