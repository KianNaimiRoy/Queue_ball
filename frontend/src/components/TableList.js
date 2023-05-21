import React from "react";
import useTables from "./hooks/useTables";
import TableListItem from "./TableListItem";
import classNames from "classnames";
import "./TableList.scss";

const TableList = function() {
  const { state, selectTable, updateTables } = useTables();

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
      />
    );
  });

  return (
      <div className={tableClasses}>{listTables}</div>
  )
  
};

export default TableList;
