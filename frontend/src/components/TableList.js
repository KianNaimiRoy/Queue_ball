import { useState, useEffect } from "react";
import axios from "axios";

import "./TableList.scss";
import TableListItem from "./TableListItem";

const TableList = function (props) {
  const [state, setState] = useState({
    focused: null,
    tables: []
  });

  useEffect(() => {
    if (!state.focused) {
      localStorage.setItem("focused", JSON.stringify(state.focused));
    }
    const focused = JSON.parse(localStorage.getItem("focused"));

    axios.get("/api/players/count").then((response) => {
      console.log("Response.data: ", response.data.count);
      setState({ tables: response.data.count });
    });

    if (focused) {
      setState({ ...state, focused });
    }
    console.log("Local Storage Focused: ", focused);
  }, []);

  const selectTable = function (id) {
    setState((previousState) => ({
      focused: previousState.focused !== null ? null : id
    }));
  };

  console.log("State Tables: ", state.tables);
  console.log("State Focus: ", state.focused);
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
