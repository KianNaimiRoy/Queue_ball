import React, { useState } from "react";
import Navigation from "./components/Navigation";
import TableList from "./components/TableList";
import UsernamePrompt from "./components/UsernamePrompt";


import "./App.scss";

const App = function() {
  return (
    <main className="App">
      <UsernamePrompt />
      <Navigation />
      <TableList />
    </main>
  );
};

export default App;
