import { useState, useEffect } from "react";
import axios from "axios";

import "./TableList.scss";
import TableListItem from "./TableListItem";

const TableList = function (props) {
  // const [tables, setTables] = useState([]);

  const [state, setState] = useState({
    focus: null,
    tables: []
  });

  useEffect(() => {
    axios.get("/api/players/count").then((response) => {
      console.log("Response.data: ", response.data.count);
      setState({ tables: response.data.count });
    });
  }, []);

  console.log("Tables:", state.tables);

  const listTables = state.tables.map((table) => {
    return (
      <TableListItem
        key={table.id}
        id={table.id}
        count={table.players}
        status={table.is_available}
      />
    );
  });

  return <div className="table-list">{listTables}</div>;
};

export default TableList;
