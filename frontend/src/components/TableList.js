import { useState, useEffect } from "react";
import axios from "axios";

import "./TableList.scss";
import TableListItem from "./TableListItem";

const TableList = function (props) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get("/api/tables").then((response) => {
      console.log("Response.data: ", response.data.tables);
      setTables(response.data.tables);
    });
  }, []);

  console.log("Tables:", tables);

  const listTables = tables.map((table) => {
    return <TableListItem key={table.id} id={table.id} name={table.name} />;
  });

  return <div className="table-list">{listTables}</div>;
};

export default TableList;
