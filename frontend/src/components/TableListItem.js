import classNames from "classnames";
import QueueListItem from "./Table/QueueListItem";
import Button from "./Button";
import "./TableListItem.scss";
import useTableListItem from "./hooks/useTableListItems";
const TableListItem = function (props) {
  const { players, joinQueue, leaveQueue, isTableIdNull, playerTableNumber } =
    useTableListItem(props);

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
