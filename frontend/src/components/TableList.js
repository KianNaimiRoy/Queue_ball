import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableList.scss";
import TableListItem from "./TableListItem";

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

  useEffect(() => {
    console.log("Focused State: ", state.focused);
  }, [state.focused]);

  const listTables = state.tables.map((table) => {
    return (
      <TableListItem
        key={table.id}
        id={table.id}
        count={table.players}
        status={table.is_available}
        onSelect={() => selectTable(table.id)}
      />
    );
  });

  return <div className="table-list">{listTables}</div>;
};

export default TableList;
