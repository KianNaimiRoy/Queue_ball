import { useState, useEffect } from "react";
import axios from "axios";

const useTables = function () {
  const [state, setState] = useState({
    focused: JSON.parse(localStorage.getItem("focused")),
    tables: [],
    tablesFadeIn: true
  });

  useEffect(() => {
    axios.get("/api/players/count").then((response) => {
      setState((prevState) => ({ ...prevState, tables: response.data.tables }));
    });
    const player = JSON.parse(localStorage.getItem("player-data"));
    if (player && !state.tablesFadeIn) {
      setState((prevState) => ({ ...prevState, tablesFadeIn: true }));
    }
  }, []);

  const selectTable = function (id) {
    const newFocused = state.focused !== id ? id : null;
    localStorage.setItem("focused", JSON.stringify(newFocused));
    setState((prevState) => ({
      ...prevState,
      focused: newFocused,
      tablesFadeIn: false
    }));
  };

  const updateTables = function (tables) {
    setState((prevState) => ({ ...prevState, tables: tables }));
  };

  return { state, selectTable, updateTables };
};

export default useTables;
