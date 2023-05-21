import useTables from "./hooks/useTables";
import TableListItem from "./TableListItem";
import classNames from "classnames";
import "./TableList.scss";

const TableList = function () {
  const { state, selectTable, updateTables } = useTables();

  const player = JSON.parse(localStorage.getItem("player-data"));

  const tableClasses = classNames("table-list", {
    "table-list__focused": state.focused
  });

  const listTables = (
    state.focused
      ? state.tables.filter((table) => state.focused === table.id)
      : state.tables
  ).map((table) => {
    return (
      <TableListItem
        key={table.id}
        id={table.id}
        name={table.name}
        playerCount={table.player_count}
        status={table.is_available}
        focused={state.focused}
        onSelect={() => selectTable(table.id)}
        updateTables={updateTables}
        fadeIn={state.tablesFadeIn} // Pass the fade-in state as a prop
      />
    );
  });

  return (
    <>
      <div className={tableClasses}>{player && <>{listTables}</>}</div>
    </>
  );
};

export default TableList;
