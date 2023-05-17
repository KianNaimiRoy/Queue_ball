// import "./TableListItem.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";

import QueueListItem from "./Table/QueueListItem";

const TableListItem = function (props) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      console.log("Response.data: ", response.data.players);
      setPlayers(response.data.players);
    });
  }, []);

  const listPlayers = players
    .filter((players) => props.focused === players.table_id)
    .sort((a, b) => a.enqueued_at - b.enqueued_at)
    .map((player) => {
      return (
        <QueueListItem key={player.id} id={player.id} name={player.name} />
      );
    });

  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status
  });

  return (
    <div className={listClass} onClick={props.onSelect}>
      <h1>Table {props.id}</h1>
      {props.focused ? (
        <>{listPlayers}</>
      ) : (
        <p>{!props.status ? "Unavailable" : props.count}</p>
      )}
    </div>
  );
};

export default TableListItem;
