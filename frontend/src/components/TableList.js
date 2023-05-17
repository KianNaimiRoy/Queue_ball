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
    const focused = JSON.stringify(localStorage.getItem("focused"));

    axios.get("/api/players/count").then((response) => {
      setState((prevState) => ({ ...prevState, tables: response.data.count }));
    });

    if (focused) {
      // localStorage.setItem("focused", JSON.stringify(state.focused));
      setState((prevState) => ({ ...prevState, focused }));
    } else {
      localStorage.setItem("focused", JSON.stringify(state.focused));
    }

    console.log("Local storage focused", focused);
  }, []);

  const selectTable = function (id) {
    setState((prevState) => {
      const newFocused = prevState.focused !== null ? null : id;
      localStorage.setItem("focused", JSON.stringify(newFocused));
      return {
        ...prevState,
        focused: newFocused
      };
    });
    console.log("Focused State: ", state.focused);
  };

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
