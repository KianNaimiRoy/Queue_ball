import classNames from "classnames";
import useTableListItem from "./hooks/useTableListItems";
import QueueListItem from "./Table/QueueListItem";
import Button from "./Button";

import "./TableListItem.scss";

const TableListItem = function(props) {
  const { players, joinQueue, leaveQueue, isTableIdNull, playerTableNumber } =
    useTableListItem(props);

  const filteredPlayers = players.filter(
    (players) => props.focused === players.table_id
  );

  const listPlayers = filteredPlayers.map((player) => {
    if (filteredPlayers.indexOf(player) === 0) {
      return (
        <QueueListItem
          key={player.id}
          name={player.name}
          className="player first-player"
        />
      );
    } else if (filteredPlayers.indexOf(player) === 1) {
      return (
        <QueueListItem
          key={player.id}
          name={player.name}
          className="player second-player"
        />
      );
    } else {
      return <QueueListItem key={player.id} name={player.name} className="queue" />;
    }
  });

  const firstPlayer = listPlayers[0];
  const secondPlayer = listPlayers[1];
  const queue = listPlayers.slice(2);
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
            {secondPlayer &&
              <h1 id="vs"> VS. </h1>}
            {secondPlayer}
          </div>
          {queue}
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
