import { useState, useEffect } from "react";
import axios from "axios";

import "./TableList.scss";
import TableListItem from "./TableListItem";

const TableList = function (props) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get("/api/players/count").then((response) => {
      console.log("Response.data: ", response.data.count);
      setTables(response.data.count);
    });
  }, []);

  console.log("Tables:", tables);

  const listTables = tables.map((table) => {
    return (
      <TableListItem key={table.table_id} id={table.id} count={table.players} />
    );
  });

  return <div className="table-list">{listTables}</div>;
};

export default TableList;
