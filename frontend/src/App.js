import React, { useState } from "react";
import Navigation from "./components/Navigation";
import TableList from "./components/TableList";
import "./App.scss";

const App = function() {
  return (
    <main className="App">
      <Navigation />
      <TableList />
    </main>
  );
};

export default App;
