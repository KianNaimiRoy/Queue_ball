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

  const listBallColours = classNames("players-at-table-count", {
    "player-count-zero": props.playerCount === "0" && props.status,
    "player-count-one": props.playerCount === "1" && props.status,
    "player-count-two": props.playerCount === "2" && props.status,
    "player-count-three": props.playerCount === "3" && props.status,
    "player-count-four": props.playerCount === "4" && props.status,
    "player-count-five": props.playerCount === "5" && props.status,
    "player-count-six": props.playerCount === "6" && props.status,
    "player-count-seven": props.playerCount === "7" && props.status,
    "player-count-eight": props.playerCount === "8" && props.status,
    "default-color": props.playerCount > "8" && props.status 
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
                Join Table
              </Button>
            </div>
          ) : (
            <div>
              {props.id !== playerTableNumber && (
                <h1 className="current-table-enqueued">You are currently at Table {playerTableNumber}</h1>
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
                  Leave Table
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <h1>{props.name}</h1>
          <div className="players-at-table">
            <div className={listBallColours}>
              <div className="inner-ball-circle">
                {!props.status ? "Unavailable" : props.playerCount}
              </div>
            </div>
            <h3>{props.status && "Players at Table"}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default TableListItem;
