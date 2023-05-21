import classNames from "classnames";
import useTableListItem from "./hooks/useTableListItems";
import QueueListItem from "./Table/QueueListItem";
import Button from "./Button";

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
      return (
        <QueueListItem key={player.id} name={player.name} className="queue" />
      );
    }
  });

  const firstPlayer = listPlayers[0];
  const secondPlayer = listPlayers[1];
  const queue = listPlayers.slice(2);

  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status,
    "table-list__available": props.status,
    "data-fade-in": props.fadeIn
  });

  return (
    <div className={listClass} onClick={props.status ? props.onSelect : null}>
      {props.focused ? (
        <>
          <h1>{props.name}</h1>
          <div className="current-match">
            {firstPlayer}
            {secondPlayer && <h1 id="vs"> VS. </h1>}
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
          <div className="players-at-table">
            <p>{!props.status ? "Unavailable" : props.playerCount}</p>
            <h3>{props.status && "Players at Table"}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default TableListItem;
