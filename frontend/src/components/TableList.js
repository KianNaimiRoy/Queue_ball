import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableList.scss";
import TableListItem from "./TableListItem";
import classNames from "classnames";

const TableList = function (props) {
  const [state, setState] = useState({
    focused: JSON.parse(localStorage.getItem("focused")),
    tables: []
  });

  useEffect(() => {
    axios.get("/api/players/count").then((response) => {
      setState((prevState) => ({ ...prevState, tables: response.data.count }));
    });
  }, []);

  const selectTable = function (id) {
    const newFocused = state.focused !== id ? id : null;
    localStorage.setItem("focused", JSON.stringify(newFocused));
    setState((prevState) => ({
      ...prevState,
      focused: newFocused
    }));
  };

  const updateTables = function (tables) {
    setState((prevState) => ({ ...prevState, tables: tables }));
  };

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
        count={table.players}
        status={table.is_available}
        focused={state.focused}
        onSelect={() => selectTable(table.id)}
        updateTables={updateTables}
      />
    );
  });

  return <div className={tableClasses}>{listTables}</div>;
};

export default TableList;
